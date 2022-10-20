import {useState} from 'react';
import moment from 'moment';
import styled from "styled-components";
import CalendarController from "./CalendarController";

const CalTotalBlock = styled.div`
  width: 100%;
  min-width: 650px;
  height: 90%;
  margin: 1px;
  display: grid;
  align-items: center;
  justify-items: center;
`

const CalendarBlock = styled.div`
  width: 95vw;
  min-width: 640px;
  height: 72vh;
  min-height: 600px;
`
const CalendarIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8px;

  height: 30px;
  .birthday {
    background: lightpink;
  }
  .holiday {
    background: #ffd7a3;
    width: 90%;
  }

  .vacation {
    background: lightcyan;
  }

  .Event {
    background: #ffffb5;
  }
  .others {
    background: #bcc5fd;
  }
`
const IndexingBar = styled.div`
  margin: 7px;
  width: 5vw;
  max-width: 50px ;
  height: 3vh;
  min-height: 15px;
  max-height: 25px;
  font-size: 2vh;
`;
const CalendarBox = styled.div`
  margin: 2px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  text-align: center;
  .today {
    background: #c8ffc8;
  }
`
const TableHead = styled.div`
  background: lightgreen;

`
const TableBody = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-auto-rows: minmax(10rem, auto);
  width: 100%;
  min-width: 90px;
  height: auto;
  min-height: 90px;
  text-align: left;

  .date {
    width: 90%;
    padding-left: 8px;
    text-align: left;
  }

  .sunday {
    color: red;
  }

  .anotherMonth {
    color: lightgray !important;
  }

  .holiday {
    background: #ffd7a3;
    width: 90%;
  }

  .birthday {
    background: lightpink;
    width: 90%;
  }

  .vacation {
    background: lightcyan;
    width: 90%;
  }

  .Event {
    background: #ffffb5;
    width: 90%;
  }

  .others {
    background: #bcc5fd;
    width: 90%;
  }
`
const PushTag = (
    key,
    loadedMoment,
    dayClass
) => {
    // 다른 달의 경우 모두 회색으로 처리
    if (dayClass === "anotherMonth"
    ) {
        return (
            <TableBody id={key} key={key}>
                <div className="date anotherMonth"> {loadedMoment.format('D')} </div>
            </TableBody>
        )
    }
    // 이번 달의 경우 (오늘,평일,주말) 각각 따로 처리
    else {
        // 오늘의 경우
        if (dayClass === "Today") {
            return (
                <TableBody id={key} key={key} className="today">
                    <div className="date"> {loadedMoment.format('D')} </div>
                </TableBody>
            )
        }
        else {
            return(
                <TableBody id={key} key={key}>
                    {
                        dayClass === "week" ?
                            // 평일일 경우 날짜를 검정색으로
                            <div className="date"> {loadedMoment.format('D')} </div>
                            :
                            // 주말일 경우 날짜를 빨간색으로
                            <div className="date sunday"> {loadedMoment.format('D')} </div>
                    }
                </TableBody>)
        }
    }
}

function Calendar ( {AddEventClick} ) {

    const [getMoment, setMoment] = useState(moment())

    const today = getMoment;
    // 이번달의 첫번째 주
    const firstWeek = today.clone().startOf('month').week();
    // 이번달의 마지막 주 (만약 마지막 주가 1이 나온다면 53번째 주로 변경)
    const lastWeek = today.clone().endOf('month').week() === 1? 53 : today.clone().endOf('month').week();

    const calendarArr=()=>{
        let result = [];
        let week = firstWeek;
        for ( week; week <= lastWeek; week++) {
            // day = [ 일,월,화,수,목,금,토 ]
            for ( let day=0 ; day < 7 ; day ++ ) {
                // 'days' : Moment 값
                // 'date' : ID 값을 넣기 위함.
                let days = today.clone().startOf('year').week(week).startOf('week').add(day, 'day'); // 'D' 로해도되지만 직관성
                let date = `Date-${days.format('YYYY-MM-DD')}`
                //------------------------------- 날짜 처리하는 구간 -------------------------------//
                // (이번달, !이번달)로 나눠서 처리.
                // 이번달은 글씨를 (평일 : 검정, 주말 : 빨강) 처리.
                if(days.format('MM') === today.format('MM')){
                    // 오늘 날짜 처리
                    if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
                        result.push(PushTag(date, days, "Today"));
                    }
                    // 일요일 인 날에는 빨간글씨
                    else if (day === 0) {
                        result.push (PushTag(date, days, "sunday"));
                    }
                    // 일요일 아닌 날에는 검정글씨
                    else {
                        result.push (PushTag(date, days, "week"));
                    }

                }
                // 이번달이 아닌 경우 모두 회색처리.
                else {
                    result.push (PushTag(date, days,"anotherMonth"));
                }
            }
        }
        return result;
    }

    return(
        <div>
            <CalTotalBlock>
                <CalendarController
                    AddEventClick={AddEventClick}
                    setMoment={setMoment}
                    getMoment={getMoment}
                    today={today}
                />
                <CalendarBlock>
                    <CalendarIndex>
                        <IndexingBar className="birthday"/>생일
                        <IndexingBar className="holiday"/>공휴일
                        <IndexingBar className="Event"/>행사
                        <IndexingBar className="vacation"/>휴가
                        <IndexingBar className="others"/>기타
                    </CalendarIndex>
                    <CalendarBox>
                        { ['일','월','화','수','목','금','토'].map((day) => {
                            return( <TableHead key={day} className="tableHead">{day}</TableHead> )
                        })}
                        {calendarArr()}

                    </CalendarBox>
                </CalendarBlock>
            </CalTotalBlock>
        </div>
    )
}

export default Calendar;