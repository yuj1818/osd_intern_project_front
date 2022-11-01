import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    yearDecrease,
    yearIncrease,
    monthIncrease,
    monthDecrease,
} from "../../modules/calendar/momenter";
import {
    initialize,
    changeField,
    selectID,
    newEventDBWrite,
    newEventDBDelete,
    newEventDBUpdate,
    newEventCRUD,
} from "../../modules/calendar/newEventCRUD"
import Calendar from "../../Components/Calendar/Calendar";
import AddNewEvent from "../../Components/Calendar/AddNewEvent";
import {getHoliday, getEvent} from "../../modules/calendar/momenter";
import moment from "moment";
import useActions from "../../lib/useActions";

function CalendarContainer(props) {
    ////////////// Redux 구간 /////////////////////////////////////////////////

    const { momentValue, holiday, events, loadingHoliday, loadingEvents, newEventData, eventID} = useSelector(state => ({
        momentValue: state.momenter.momentValue,
        holiday: state.momenter.holiday,
        loadingEvents : state.momenter.loading.GET_EVENT,
        events : state.momenter.event,
        loadingHoliday: state.momenter.loading.GET_HOLIDAY,
        newEventData : state.newEventCRUD.newEventData,
        eventID : state.newEventCRUD.postID
    }));
    const dispatch = useDispatch();

    const [
        yearIncreaseButton,
        yearDecreaseButton,
        monthIncreaseButton,
        monthDecreaseButton,
        makeE_initialize
    ] = useActions(
        [
            yearIncrease,
            yearDecrease,
            monthIncrease,
            monthDecrease,
            initialize
        ],[]
    );

    const changeE_title = e => dispatch(changeField({_key:'title', _value : e.target.value}))
    const changeE_category = e => {
        dispatch(changeField({_key:'startDate', _value : moment().format('YYYY-MM-DD')}));
        dispatch(changeField({_key:'endDate', _value :moment().format('YYYY-MM-DD')}));
        dispatch(changeField({_key:'category', _value : e.target.value}));
    }
    const changeE_startDate = e => dispatch(changeField({_key:'startDate', _value : e.target.value}));
    const changeE_endDate = e => dispatch(changeField({_key:'endDate', _value : e.target.value}));

    useEffect(() => {
        dispatch(getHoliday(momentValue));
        dispatch(getEvent(momentValue));
    }, [momentValue]);

    ////////////////////////////////////////////////////////////////////////////



    ////////////// 이벤트리스트 처리 구간 /////////////////////////////////////////////////
    const [newEventList, setNewEventList] = useState([])
    useEffect( () => {
        setNewEventList(spreadEventList(events))
    }, [events])
    let spreadEventList = ( EventList ) => {
        const newEventList = [];
        if (!loadingEvents && EventList) {
            EventList.map((oneEvent) => {
                let currentDate = moment(oneEvent.cal_start_day);
                let stopDate = moment(oneEvent.cal_end_day);
                while (currentDate <= stopDate) {
                    newEventList.push({
                        title : oneEvent.cal_title,
                        category : oneEvent.cal_category,
                        date : moment(currentDate).format('YYYY-MM-DD'),
                        inputKey : oneEvent.cal_index
                    })
                    currentDate = moment(currentDate).add(1, "days");
                }
            })
        }

        return newEventList
    }

    ////////////// 이벤트 추가 구간 /////////////////////////////////////////////////

    // 일정추가 창 보여주것을 정하는 State
    const [NewEvent, setNewEvent] = useState('NoPopUp');

    let noDataCheck;
    if ( !loadingEvents ) {
        if (newEventData.title !== '' && newEventData.category !== '') {
            noDataCheck = false
        }
    }
    else { noDataCheck = true }

    const AddEventClick = () => {
        setNewEvent('createEvent');
    };
    const CancelClick = () => {
        setNewEvent('NoPopUp');
        makeE_initialize()
    };
    const onDelete = () => {
        setNewEvent('NoPopUp');
        console.log(eventID, "삭제")
        dispatch(newEventDBDelete(eventID));
    };
    const ConfirmClick = (e) => {
        if(newEventData.title === ''){
            e.preventDefault() //제출완료 페이지로 넘어가는 것 방지
            alert('제목을 입력하세요')
        }
        else if(newEventData.category === ''){
            e.preventDefault()
            alert('일정분류를 선택하세요')
        }
        else {
            setNewEvent('NoPopUp');
            if (newEventData.category === 'birthday') {
                dispatch(newEventDBWrite({
                    title : newEventData.title,
                    category : newEventData.category,
                    startDate: newEventData.startDate,
                    endDate: newEventData.startDate
                }))
            }
            else {
                dispatch(newEventDBWrite({
                    title: newEventData.title,
                    category: newEventData.category,
                    startDate: newEventData.startDate,
                    endDate: newEventData.endDate
                }))
            }
            makeE_initialize()
        }
    };

    const onUpdateEvent = e => {
        if(newEventData.title === ''){
            e.preventDefault() //제출완료 페이지로 넘어가는 것 방지
            alert('제목을 입력하세요')
        }
        else if(newEventData.category === ''){
            e.preventDefault()
            alert('일정분류를 선택하세요')
        }
        else {
            setNewEvent('NoPopUp');
            if (newEventData.category === 'birthday') {
                dispatch(newEventDBUpdate({
                    _id : eventID,
                    title : newEventData.title,
                    category : newEventData.category,
                    startDate: newEventData.startDate,
                    endDate: newEventData.startDate
                }))
            }
            else {
                dispatch(newEventDBUpdate({
                    _id : eventID,
                    title: newEventData.title,
                    category: newEventData.category,
                    startDate: newEventData.startDate,
                    endDate: newEventData.endDate
                }))
            }
        }
    }

    ////////////// 캘린더 구간 /////////////////////////////////////////////////

    const onReload = () => {
        monthIncreaseButton();
        monthDecreaseButton();
    }
    const onEventClick = e => {
        setNewEvent('changeEvent');
        dispatch(selectID(e.target.id))
        dispatch(changeField({_key:'title', _value : e.target.innerText}))
    }
    return (
        <div>
            <Calendar
                AddEventClick={AddEventClick}   // 일정추가 클릭
                onReload={onReload}             // 새로고침
                momentValue={momentValue}       // 현재 보고있는 모멘트 값
                yearIncreaseButton={yearIncreaseButton}
                yearDecreaseButton={yearDecreaseButton}
                monthIncreaseButton={monthIncreaseButton}
                monthDecreaseButton={monthDecreaseButton}
                loadingHoliday={loadingHoliday} // 공휴일 정보 로딩 확인
                Holidays={holiday}              // 공휴일 정보
                loadingEvents ={loadingEvents}  // 이벤트 정보 로딩 확인
                newEventList={newEventList}     // 이벤트 정보
                onEventClick={onEventClick}
            />
            <AddNewEvent
                visible={NewEvent}
                onCancel={CancelClick}
                onConfirm={ConfirmClick}
                newEventData={newEventData}
                noDataCheck={noDataCheck}
                changeE_title={changeE_title}
                changeE_category={changeE_category}
                changeE_startDate={changeE_startDate}
                changeE_endDate={changeE_endDate}
                onUpdateEvent={onUpdateEvent}
                onDelete={onDelete}
            />
        </div>
    );
}

export default React.memo(CalendarContainer);