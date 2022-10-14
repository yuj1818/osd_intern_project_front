import {useState} from 'react';
import moment from 'moment';
import styled from "styled-components";

const CalTotalBlock = styled.div`
  width: 100%;
  min-width: 650px;
  height: 100%;
  margin: 1px;
  display: grid;
  align-items: center;
  justify-items: center;
`
const CalendarControllerBlock = styled.div`
  display: grid;
  grid-template-columns: 50px 30px 1fr 30px 50px;
  width: 95vw;
  min-width: 640px;
  height: 60px;
  margin-top : 10px;
  align-items: center;
  justify-items: center;
`
const Spacer = styled.div`
`
const ControlButton = styled.button`
  border: none;
  text-align: center;
  cursor: pointer;
`
const CalendarBlock = styled.div`
  width: 95vw;
  min-width: 640px;
  height: 80vh;
  min-height: 490px;
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

  .vacation {
    background: lightcyan;
  }

  .Event {
    background: #ffffb5;
  }

  .etc {
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
`
const TableHead = styled.div`
  background: lightgreen;
`
const TableBody = styled.div`
  background: white;
  grid-auto-rows: minmax(10rem, auto);
  width: 100%;
  min-width: 90px;
  height: auto;
  min-height: 90px;
  text-align: left;
  .date {
    padding-left: 8px;
  }
  .birthday {
    background: lightpink;
    width: 90%;
    padding-left: 6px;
  }
  .vacation {
    background: lightcyan;
    width: 90%;
    padding-left: 6px;
  }
  .Event {
    background: #ffffb5;
    width: 90%;
    padding-left: 6px;
  }
  .etc {
    background: #bcc5fd;
    width: 90%;
    padding-left: 6px;
  }
`
const PushTag = (key, loadedMoment,weekend ,anothorM, today) => {
    return (
        today?
            <TableBody key={key} style={{background:"#c8ffc8"}}>
                {
                    weekend ?
                        <div id={key} className="date" style={{ color : "red"}}>{loadedMoment.format('D')} Today ! </div>
                        :
                        <div id={key} className="date" >{loadedMoment.format('D')} Today ! </div>
                }
            </TableBody>
            :
            <TableBody key={key} >
                {
                    anothorM ?
                        <div id={key} className="date" style={{color : "lightgray"}}>{loadedMoment.format('D')}</div>
                        :
                        weekend ?
                            <div id={key} className="date" style={{ color : "red"}}>{loadedMoment.format('D')}</div>
                            :
                            <div id={key} className="date" >{loadedMoment.format('D')}</div>
                }
            </TableBody>
    )
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
            for ( let day=0 ; day < 7 ; day ++ ) {
                let days = today.clone().startOf('year').week(week).startOf('week').add(day, 'day'); //d로해도되지만 직관성
                let date = `Date-${days.format('YYYYMMDD')}`
                //------------------------------- 날짜 처리하는 구간 -------------------------------//
                // 크게 3분류(오늘, !이번달, 이번달)로 나눠서 처리.
                // 오늘 날짜 처리
                if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
                    // 일요일 인 날에는 빨간글씨
                    if(day === 0) {
                        result.push(PushTag(date, days, 1,0,1));
                    }
                    // 일요일 아닌 날에는 검정글씨
                    else {
                        result.push(PushTag(date, days, 0,0,1));
                    }
                }
                // !이번달 => 이번 달이 아닌 날들은 글씨를 회색처리.
                else if(days.format('MM') !== today.format('MM')){
                    result.push (PushTag(date, days,0,1));
                }
                // 이번 달에 속한 날
                else {
                    // 일요일 인 날에는 빨간글씨
                    if (day === 0) {
                        result.push (PushTag(date, days, 1,0));
                    }
                    // 일요일 아닌 날에는 검정글씨
                    else {
                        result.push (PushTag(date, days, 0, 0));
                    }
                }
            }
        }
        return result;
    }

    return(
        <div>
            <CalTotalBlock>
                <CalendarControllerBlock>
                    <button><i className="fas fa-redo fa-fw me-1" /></button>
                    <Spacer style={{gridColumn:"2/4",gridRow : "1"}}></Spacer>
                    <button style={{gridColumn:"4/6",gridRow : "1"}} onClick={AddEventClick}>일정추가</button>
                    <ControlButton onClick={()=>{ setMoment(getMoment.clone().subtract(1, 'year')) }}>«</ControlButton>
                    <ControlButton onClick={()=>{ setMoment(getMoment.clone().subtract(1, 'month')) }}>‹</ControlButton>
                    <span>{today.format('YY 년 MM 월')}</span>
                    <ControlButton onClick={()=>{ setMoment(getMoment.clone().add(1, 'month')) }}>›</ControlButton>
                    <ControlButton onClick={()=>{ setMoment(getMoment.clone().add(1, 'year')) }}>»</ControlButton>
                </CalendarControllerBlock>
                <CalendarBlock>
                    <CalendarIndex>
                        <IndexingBar className="birthday"/>생일
                        <IndexingBar className="vacation"/>휴가
                        <IndexingBar className="Event"/>행사
                        <IndexingBar className="etc"/>공휴일
                    </CalendarIndex>
                    <CalendarBox>
                        { ['일','월','화','수','목','금','토'].map((day) => {
                            return( <TableHead key={day}>{day}</TableHead> )
                        })}
                        {calendarArr()}

                    </CalendarBox>
                </CalendarBlock>
            </CalTotalBlock>
        </div>
    )
}

export default Calendar;