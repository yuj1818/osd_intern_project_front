import {useEffect, useState} from 'react';
import moment from 'moment';
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Box from "../common/Box";

const DControllerBlock = styled.div`
  margin-top : 5px;
  margin-bottom : 5px;
  display: grid;
  grid-template-columns: 30px 30px 1fr 30px 30px;
  width: 100%;
  height: 4vh;
  min-height: 20px;
  font-size: 2vmin;
  align-items: center;
  justify-items: center;
`
const DControlButton = styled.button`
  border: none;
  text-align: center;
  cursor: pointer;
  margin : 3px
`
const DCalendarBlock = styled.div`
  position: relative;
  width: 100%;
  height: 90%;
  display: grid;
  grid-auto-rows: 3vh 1fr;

`
const DCalendarIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  .birthday {
    background: ${palette.birth};
  }
  .holiday {
    background: ${palette.holi};
  }

  .vacation {
    background: ${palette.vaca};
  }

  .Event {
    background: ${palette.Event};
  }

  .others {
    background: ${palette.others};
  }
`
const DIndexingBar = styled.div`
  width: 3vw;
  height: 3vh;
  min-height: 15px;
  max-height: 25px;
  font-size: 2vh;
`;
const DCalendarBox = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  margin: 3px;
  .today {
    background: #c8ffc8;
  }
`

const NaviBox = styled.div`
  position: absolute;
  color: black;
  width: 98%;
  height: 90%;
  cursor: pointer;
  background: black;
  opacity: 0;
  &:hover {
    opacity: 0.4;
    background-color: lightgray;
  }

`
const DTableHead = styled.div`
  height: 2.5vh;
  background: lightgreen;
  text-align: center;
`
const DTableBody = styled.div`
  background: white;
  grid-auto-rows: minmax(15rem, auto);
  width: 100%;
  height: 7vh;
  text-align: left;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;

  .date {
    width: 100%;
    padding-left: 2px;
    text-align: left;
  }
  
  .sunday {
    color : red;
  }
  .anotherMonth {
    color: lightgray !important;
  }
  .holiday {
    background: ${palette.holi};
    width: 90%;
    font-size: 1vh;
  }
  .birthday {
    background: ${palette.birth};
    width: 90%;
    padding-left: 6px;
    font-size: 1vh;
  }
  .vacation {
    background: ${palette.vaca};
    width: 90%;
    padding-left: 6px;
    font-size: 1vh;
  }
  .Event {
    background: ${palette.Event};
    width: 90%;
    padding-left: 6px;
    font-size: 1vh;
  }
  .others {
    background: ${palette.others};
    width: 90%;
    padding-left: 6px;
    font-size: 1vh;
  }
`

function DashCalendar({
                          onClick,
                          momentValue,
                          yearIncreaseButton,
                          yearDecreaseButton,
                          monthIncreaseButton,
                          monthDecreaseButton,
                          Holidays,
                          newEventList,
                          newVacationList,
                          loadingHoliday,
                          loadingEvents,
                          loadingVacation,
                      }) {
    // 이번달의 첫번째 주
    const firstWeek = momentValue.clone().startOf('month').week();
    // 이번달의 마지막 주 (만약 마지막 주가 1이 나온다면 53번째 주로 변경)
    const lastWeek = momentValue.clone().endOf('month').week() === 1? 53 : momentValue.clone().endOf('month').week();

    const calendarArr=()=> {
        let holidaylist = {};
        if(!loadingHoliday && Holidays){
            Holidays.map((holiday) => {

                let holiday_year = holiday.locdate.toString().substring(0,4);
                let holiday_month = holiday.locdate.toString().substring(4,6).padStart(2,0);
                let holiday_day = holiday.locdate.toString().substring(6,8).padStart(2,0);

                let holiday_ID = `Date-${holiday_year}-${holiday_month}-${holiday_day}`;
                holidaylist[holiday_ID] = holiday.dateName;
            })
        }
        let result = [];
        let week = firstWeek;

        for (week; week <= lastWeek; week++) {
            for (let day = 0; day < 7; day++) {
                let currentMoment = momentValue.clone().startOf('year').week(week).startOf('week').add(day, 'day'); // 'D' 로해도되지만 직관성
                let date = currentMoment.format('YYYY-MM-DD')
                let dateID = `Date-${date}`

                // 해당 날짜에 class 값 넣기위한 조건처리.
                let todayCheck = currentMoment.format('YYYYMMDD') === moment().format('YYYYMMDD')  ? 'Today' : 'week';
                let dayCheck = day === 0 ? 'sunday' : todayCheck;
                //------------------------------- 날짜 처리하는 구간 -------------------------------//
                // (이번달, !이번달)로 나눠서 처리.
                // 이번달은 글씨를 (평일 : 검정, 주말 : 빨강) 처리.
                if (currentMoment.format('MM') === momentValue.format('MM')) {
                    if (dateID in holidaylist) {
                        result.push(DPushTag(currentMoment, dateID, dayCheck, holidaylist[dateID]));
                    } else {
                        result.push(DPushTag(currentMoment, dateID, dayCheck, ''));
                    }
                }
                // 이번달이 아닌 경우 모두 회색처리.
                else {
                    result.push (DPushTag(currentMoment, dateID,"anotherMonth",''));
                }
            }
        }
        return result;
    }

    const DPushTag = (currentMoment, dateID, dayClass, HolidayTitle) => {
        const today = currentMoment.format('YYYYMMDD') === moment().format('YYYYMMDD');

        return (
            <DTableBody id={dateID} key={currentMoment.format('MM-DD')} className={`${today ? 'today' : ''}`}>
                <span>
                    <span className={HolidayTitle === ''? `date ${dayClass}`: `date sunday`}>
                        {currentMoment.format('D')}
                    </span>
                    <span className="holiday">
                        {HolidayTitle}
                    </span>
                </span>
                {!loadingVacation && dayClass !=="anotherMonth" ?
                    <div className="vacation">{oneDayData(currentMoment.format('YYYY-MM-DD'))}</div>
                    :
                    ''
                }
                {!loadingEvents && dayClass!=="anotherMonth" ?
                    PostEventsList(currentMoment.format('YYYY-MM-DD') ,newEventList).map((foundEvent) => {
                        return (
                            <div key={foundEvent.inputKey} id={foundEvent.inputKey} className={foundEvent.category}>
                                {foundEvent.title}
                            </div>)})  :
                    ''

                }
            </DTableBody>
        )
    }

    const PostEventsList = ( eventDate, newEventList ) => {
        let foundEvents =  newEventList.filter(e => e.date === eventDate);
        return foundEvents;
    }

    const oneDayData = (eventDate) => {
        if(!loadingVacation && newVacationList){
            const oneDayFilter = newVacationList.filter(e => e.date === eventDate)
            if(oneDayFilter.length > 1 ) {
                return `${oneDayFilter[0].title}외 ${oneDayFilter.length-1}명`
            }
            else if (oneDayFilter.length === 1) {
                return oneDayFilter[0].title
            }
            else { return ''}
        }
    }


    return (
            <Box style={{flexDirection : "column"}}>
                <DControllerBlock>
                    <DControlButton title="1년전" onClick={yearDecreaseButton}>«</DControlButton>
                    <DControlButton title="1달전" onClick={monthDecreaseButton}>‹</DControlButton>
                    <span>{momentValue.format('YYYY 년 MM 월')}</span>
                    <DControlButton title="1달후" onClick={monthIncreaseButton}>›</DControlButton>
                    <DControlButton title="1년후" onClick={yearIncreaseButton}>»</DControlButton>
                </DControllerBlock>
                <DCalendarBlock>
                    <DCalendarIndex>
                        <DIndexingBar className="birthday"/>생일
                        <DIndexingBar className="holiday"/>공휴일
                        <DIndexingBar className="Event"/>행사
                        <DIndexingBar className="vacation"/>휴가
                        <DIndexingBar className="others"/>기타
                    </DCalendarIndex>

                    <DCalendarBox>
                        <NaviBox onClick={onClick} />
                        { ['일','월','화','수','목','금','토'].map((day) => {
                            return( <DTableHead key={day} className="tableHead"><div>{day}</div></DTableHead> )
                        })}
                        {calendarArr()}
                    </DCalendarBox>
                </DCalendarBlock>

            </Box>
    );
}

export default DashCalendar;