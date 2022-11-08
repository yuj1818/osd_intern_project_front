import React, {useState, useEffect} from 'react';
import BackgroundForm from "../../Components/common/BackgroundForm";
import Main from "../../Components/main/Main";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    monthDecrease,
    monthIncrease,
    yearDecrease,
    yearIncrease,
    getEvent,
    getVacation
} from "../../modules/calendar/momenter";
import { getHoliday } from "../../modules/calendar/momenter";
import useActions from "../../lib/useActions";
import moment from "moment/moment";
import {getMember, getThisWeekIdx} from "../../modules/team";


function MainContainer(props) {

    const navigate = useNavigate();

    const CalendarClick = () => {
        navigate('/calendar');
    };

    const { momentValue, holiday, events, vacation, loadingHoliday, loadingEvents, loadingVacation } = useSelector(state => ({
        momentValue : state.momenter.momentValue,
        holiday: state.momenter.holiday,
        events : state.momenter.event,
        vacation : state.momenter.vacation,
        loadingHoliday: state.momenter.loading.GET_HOLIDAY,
        loadingEvents : state.momenter.loading.GET_EVENT,
        loadingVacation : state.momenter.loading.GET_VACATION,
    }));

    const { nextTeam, thisTeam, user } = useSelector(({team, user}) => ({
        nextTeam: team.nextMember,
        thisTeam: team.thisMember,
        user: user.user
    }))

    const dispatch = useDispatch();

    const [
        yearIncreaseButton,
        yearDecreaseButton,
        monthIncreaseButton,
        monthDecreaseButton,
    ] = useActions(
        [
            yearIncrease,
            yearDecrease,
            monthIncrease,
            monthDecrease,
        ],[]
    );

    useEffect(() => {
        //로그인 하지 않았을때는 공휴일 정보 받아오지 않도록
        if(user){
            dispatch(getHoliday(momentValue));
            dispatch(getEvent(momentValue));
            dispatch(getVacation(momentValue));
        }
    }, [momentValue]);

    ////////////// 이벤트리스트 처리 구간 /////////////////////////////////////////////////
    /// 받아온 이벤트 리스트 시작날짜 종료날짜를 풀어줌. ///
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
                        date : moment(currentDate).format('YYYY-MM-DD')
                    })
                    currentDate = moment(currentDate).add(1,"days");
                }
            })
        }
        return newVArr
    }
    ///////////////////////////////////

    useEffect(() => {
        if(user){
            dispatch(getMember(user.m_num));
            dispatch(getThisWeekIdx(user.m_num));
        }
    }, [user, dispatch])

    return (
        <div>
            <BackgroundForm />
            {user &&
                <div>
                    <Main
                        onClick={CalendarClick}
                        momentValue={momentValue}
                        yearIncreaseButton={yearIncreaseButton}
                        yearDecreaseButton={yearDecreaseButton}
                        monthIncreaseButton={monthIncreaseButton}
                        monthDecreaseButton={monthDecreaseButton}
                        Holidays={holiday}
                        newEventList={newEventList}
                        newVacationList={newVacationList}
                        loadingHoliday={loadingHoliday}
                        loadingEvents ={loadingEvents}
                        loadingVacation={loadingVacation}
                        nextTeam={nextTeam}
                        thisTeam={thisTeam}
                    />
                </div>
            }
        </div>
    );
}

export default React.memo(MainContainer);