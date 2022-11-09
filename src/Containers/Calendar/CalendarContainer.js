import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    yearDecrease,
    yearIncrease,
    monthIncrease,
    monthDecrease, getVacation,
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
import AskModal from "../../Components/common/AskModal";
import {getOneEventData} from "../../lib/api";
import VacationInfo from "../../Components/Calendar/VacationInfo";

function CalendarContainer(props) {
    ////////////// Redux 구간 /////////////////////////////////////////////////

    const { momentValue, holiday, events, vacation, loadingHoliday, loadingEvents, loadingVacation, newEventData, eventID} = useSelector(state => ({
        momentValue: state.momenter.momentValue,
        newEventData : state.newEventCRUD.newEventData,
        eventID : state.newEventCRUD.postID,
        holiday: state.momenter.holiday,
        events : state.momenter.event,
        vacation : state.momenter.vacation,
        loadingHoliday: state.momenter.loading.GET_HOLIDAY,
        loadingEvents : state.momenter.loading.GET_EVENT,
        loadingVacation : state.momenter.loading.GET_VACATION,
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
        if (newEventData.startDate === '') {
            dispatch(changeField({_key: 'startDate', _value: moment().format('YYYY-MM-DD')}));
            dispatch(changeField({_key: 'endDate', _value: moment().format('YYYY-MM-DD')}));
            dispatch(changeField({_key: 'category', _value: e.target.value}));
        }
        else {
            dispatch(changeField({_key: 'category', _value: e.target.value}));
        }
    }
    const changeE_startDate = e => dispatch(changeField({_key:'startDate', _value : e.target.value}));
    const changeE_endDate = e => dispatch(changeField({_key:'endDate', _value : e.target.value}));

    useEffect(() => {
        dispatch(getHoliday(momentValue));
        dispatch(getEvent(momentValue));
        dispatch(getVacation(momentValue));
    }, [momentValue]);

    ////////////////////////////////////////////////////////////////////////////



    ////////////// 받아온 API DATA 처리 구간 /////////////////////////////////////////////////
    /// 받아온 DATA 의 시작날짜 종료날짜 사이의 값 만큼을 생성. ///
    const [newEventList, setNewEventList] = useState([])
    const [newVacationList, setNewVacationList] = useState([])
    useEffect( () => {
        setNewEventList(spreadEventList(events))
    }, [events])

    useEffect( () => {
        setNewVacationList(spreadVacationList())
    }, [vacation])

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

    const spreadVacationList = () => {
        let newVArr = [];
        if(!loadingVacation && vacation) {
            vacation.map((oneDayInfo) => {
                let currentDate = moment(oneDayInfo.strdt);
                let stopDate = ''
                if(oneDayInfo.enddte === null) {
                    stopDate = moment(oneDayInfo.strdt)

                } else {
                    stopDate = moment(oneDayInfo.enddte)
                }
                while (currentDate <= stopDate) {
                    newVArr.push({
                        title : oneDayInfo.mnm,
                        date : moment(currentDate).format('YYYY-MM-DD'),
                        category : oneDayInfo.v_type
                    })
                    currentDate = moment(currentDate).add(1,"days");
                }
            })
        }
        return newVArr
    }

    ////////////// 이벤트 추가 구간 /////////////////////////////////////////////////

    // 일정추가 창 보여주것을 정하는 State
    const [NewEvent, setNewEvent] = useState('NoPopUp');
    const [checkConfirm, setCheckConfirm] = useState(false);

    let noDataCheck;
    if ( !loadingEvents ) {
        if (newEventData.title !== '' && newEventData.category !== '') {
            noDataCheck = false
        }
    }
    else { noDataCheck = true }

    const dataCheck = () => {
        if(newEventData.title === ''){
            alert('제목을 입력하세요')
            return false
        }
        else if(newEventData.category === ''){
            alert('일정분류를 선택하세요')
            return false
        }
        else if(newEventData.startDate > newEventData.endDate) {
            alert('일자를 확인하세요')
            return false
        }
        else return true
    };
    const AddEventClick = () => {
        setNewEvent('createEvent');
    };
    const CancelClick = () => {
        setNewEvent('NoPopUp');
        makeE_initialize()
    };
    const onDelete = () => {
        // 모달창에서 재확인.
        setCheckConfirm(true)
    };
    const modalConfirm = () => {
        alert('삭제되었습니다');
        setCheckConfirm(false);
        setNewEvent('NoPopUp');
        dispatch(newEventDBDelete(eventID));
        makeE_initialize();
    };
    const modalCancel = () => {
        setCheckConfirm(false)
    };
    const ConfirmClick = (e) => {
        if (dataCheck() === true) {
            setNewEvent('NoPopUp');
            if (newEventData.category === 'birthday') {
                alert('일정이 추가되었습니다.')
                dispatch(newEventDBWrite({
                    title : newEventData.title,
                    category : newEventData.category,
                    startDate: newEventData.startDate,
                    endDate: newEventData.startDate
                }))
            }
            else {
                alert('일정이 추가되었습니다.')
                dispatch(newEventDBWrite({
                    title: newEventData.title,
                    category: newEventData.category,
                    startDate: newEventData.startDate,
                    endDate: newEventData.endDate
                }))
            }
            makeE_initialize()
        }
        else {
            e.preventDefault()
        }
    };
    const onUpdateEvent = e => {
        if (dataCheck() === true) {
            setNewEvent('NoPopUp');
            if (newEventData.category === 'birthday') {
                alert('일정이 변경되었습니다.')
                dispatch(newEventDBUpdate({
                    _id : eventID,
                    title : newEventData.title,
                    category : newEventData.category,
                    startDate: newEventData.startDate,
                    endDate: newEventData.startDate
                }))
                makeE_initialize()
            }
            else {
                alert('일정이 변경되었습니다.')
                dispatch(newEventDBUpdate({
                    _id : eventID,
                    title: newEventData.title,
                    category: newEventData.category,
                    startDate: newEventData.startDate,
                    endDate: newEventData.endDate
                }))
                makeE_initialize()
            }
        } else {
            e.preventDefault()
        }
    };

    ////////////// 캘린더 구간 /////////////////////////////////////////////////
    const [vacationPopUp, setVacationPopUp] = useState(false);

    const onReload = () => {
        monthIncreaseButton();
        monthDecreaseButton();
    }

    const onEventClick = async e => {
        setNewEvent('changeEvent');
        dispatch(selectID(e.target.id))
        const getData = await getOneEventData(e.target.id).then(res => {return res.data[0]});
        dispatch(changeField({_key:'title', _value : getData.cal_title}))
        dispatch(changeField({_key:'category', _value : getData.cal_category}))
        dispatch(changeField({_key:'startDate', _value : getData.cal_start_day}))
        dispatch(changeField({_key:'endDate', _value : getData.cal_end_day}))
    }
    const onVacationClick = (e) => {
        setVacationPopUp(true)
        dispatch(selectID(e.target.id))
    }
    const VacationOutClick = () => {
        setVacationPopUp(false)
        dispatch(selectID(null))
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
                loadingVacation={loadingVacation}// 휴가 정보 로딩 확인
                newVacationList={newVacationList}// 휴가 정보
                onEventClick={onEventClick}
                onVacationClick={onVacationClick}
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
            <AskModal
                visible={checkConfirm}
                title="일정 삭제"
                description="해당 일정을 정말로 삭제하시겠습니까?"
                onConfirm={modalConfirm}
                onCancel={modalCancel}
            />
            <VacationInfo
                visible={vacationPopUp}
                PickedId={eventID}
                newVacationList={newVacationList}
                VacationOutClick={VacationOutClick}
            />
        </div>
    );
}

export default React.memo(CalendarContainer);