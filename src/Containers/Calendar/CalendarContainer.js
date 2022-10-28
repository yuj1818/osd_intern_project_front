import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    yearDecrease,
    yearIncrease,
    monthIncrease,
    monthDecrease, getEvent,
} from "../../modules/calendar/momenter";
import {changeField, initialize, newEventWrite} from "../../modules/calendar/newEventCRUD";
import Calendar from "../../Components/Calendar/Calendar";
import AddNewEvent from "../../Components/Calendar/AddNewEvent";
import {getHoliday} from "../../modules/calendar/momenter";
import moment from "moment";
import useActions from "../../lib/useActions";


function CalendarContainer(props) {

    ////////////// Redux 구간 /////////////////////////////////////////////////

    const { momentValue, holiday, loadingHoliday, newEventData} = useSelector(state => ({
        momentValue: state.momenter.momentValue,
        holiday: state.momenter.holiday,
        loadingHoliday: state.momenter.loading.GET_HOLIDAY,
        newEventData : state.newEventCRUD.newEventData
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

    // 일정추가 창 보여주것을 정하는 State
    const [NewEvent, setNewEvent] = useState(false);

    let noDataCheck;
    if (newEventData.title !=='' && newEventData.category !=='')
    {noDataCheck = false}
    else { noDataCheck = true }

    const AddEventClick = () => {
        setNewEvent(true);
    };
    const CancelClick = () => {
        setNewEvent(false);
        makeE_initialize()
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
            setNewEvent(false);
            dispatch(newEventWrite({
                title : newEventData.title,
                category : newEventData.category,
                startDate: newEventData.startDate,
                endDate: newEventData.endDate
            }))
            makeE_initialize()
        }
    };

    const onReload = () => {
        window.location.reload();
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
                newEventData={newEventData}
                changeE_title={changeE_title}
                changeE_category={changeE_category}
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
            />
        </div>
    );
}

export default React.memo(CalendarContainer);