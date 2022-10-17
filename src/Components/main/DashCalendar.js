import {useState} from 'react';
import moment from 'moment';
import styled from "styled-components";
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
  justify-content: space-around;
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
  height: 3vh;
  background: lightgreen;
  text-align: center;
`
const DTableBody = styled.div`
  background: white;
  grid-auto-rows: minmax(15rem, auto);
  width: 100%;
  height: 7vh;
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

\`                
`
const DPushTag = (key, loadedMoment,weekend ,anothorM, today) => {
    return (
        today?
            <DTableBody key={key} style={{background:"#c8ffc8"}}>
                {
                    weekend ?
                        <div id={key} className="date" style={{ color : "red"}}>{loadedMoment.format('D')}</div>
                        :
                        <div id={key} className="date" >{loadedMoment.format('D')}</div>
                }
            </DTableBody>
            :
            <DTableBody key={key} >
                {
                    anothorM ?
                        <div id={key} className="date" style={{color : "lightgray"}}>{loadedMoment.format('D')}</div>
                        :
                        weekend ?
                            <div id={key} className="date" style={{ color : "red"}}>{loadedMoment.format('D')}</div>
                            :
                            <div id={key} className="date" >{loadedMoment.format('D')}</div>
                }
            </DTableBody>
    )
}

function DashCalendar({onClick}) {
    const [getMoment, setMoment] = useState(moment())

    const today = getMoment;
    // 이번달의 첫번째 주
    const firstWeek = today.clone().startOf('month').week();
    // 이번달의 마지막 주 (만약 마지막 주가 1이 나온다면 53번째 주로 변경)
    const lastWeek = today.clone().endOf('month').week() === 1? 53 : today.clone().endOf('month').week();

    const DcalendarArr=()=> {
        let result = [];
        let week = firstWeek;
        for (week; week <= lastWeek; week++) {
            for (let day = 0; day < 7; day++) {
                let days = today.clone().startOf('year').week(week).startOf('week').add(day, 'day'); //d로해도되지만 직관성
                let date = `Date-${days.format('YYYYMMDD')}`
                //------------------------------- 날짜 처리하는 구간 -------------------------------//
                // 크게 3분류(오늘, !이번달, 이번달)로 나눠서 처리.
                // 오늘 날짜 처리
                if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
                    // 일요일 인 날에는 빨간글씨
                    if (day === 0) {
                        result.push(DPushTag(date, days, 1, 0, 1));
                    }
                    // 일요일 아닌 날에는 검정글씨
                    else {
                        result.push(DPushTag(date, days, 0, 0, 1));
                    }
                }
                // !이번달 => 이번 달이 아닌 날들은 글씨를 회색처리.
                else if (days.format('MM') !== today.format('MM')) {
                    result.push(DPushTag(date, days, 0, 1));
                }
                // 이번 달에 속한 날
                else {
                    // 일요일 인 날에는 빨간글씨
                    if (day === 0) {
                        result.push(DPushTag(date, days, 1, 0));
                    }
                    // 일요일 아닌 날에는 검정글씨
                    else {
                        result.push(DPushTag(date, days, 0, 0));
                    }
                }
            }
        }
        return result;
    }
    return (
            <Box style={{flexDirection : "column"}}>
                <DControllerBlock>
                    <DControlButton onClick={()=>{ setMoment(getMoment.clone().subtract(1, 'year')) }}>«</DControlButton>
                    <DControlButton onClick={()=>{ setMoment(getMoment.clone().subtract(1, 'month')) }}>‹</DControlButton>
                    <span>{today.format('YY 년 MM 월')}</span>
                    <DControlButton onClick={()=>{ setMoment(getMoment.clone().add(1, 'month')) }}>›</DControlButton>
                    <DControlButton onClick={()=>{ setMoment(getMoment.clone().add(1, 'year')) }}>»</DControlButton>
                </DControllerBlock>
                <DCalendarBlock>
                    <DCalendarIndex>
                        <DIndexingBar className="birthday"/>생일
                        <DIndexingBar className="vacation"/>휴가
                        <DIndexingBar className="Event"/>행사
                        <DIndexingBar className="etc"/>공휴일
                    </DCalendarIndex>

                    <DCalendarBox>
                        <NaviBox onClick={onClick} />
                        { ['일','월','화','수','목','금','토'].map((day) => {
                            return( <DTableHead key={day} className="tableHead"><div>{day}</div></DTableHead> )
                        })}
                        {DcalendarArr()}
                    </DCalendarBox>

                </DCalendarBlock>
                {/*<iframe*/}
                {/*    src="https://calendar.google.com/calendar/embed?height=366&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FSeoul&showTitle=0&showPrint=0&showCalendars=0&showTz=0&showTabs=0&showNav=1&src=c29ueXVqZW9uZzE4QGdtYWlsLmNvbQ&src=a28uc291dGhfa29yZWEjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%237986CB&color=%230B8043"*/}
                {/*    style={{border:"solid 1px #777", width:"22.6875rem", height:"22.875rem", position:"relative"}}*/}
                {/*></iframe>*/}
                {/*<div style={{position:"absolute", width:"22.6875rem", height:"22.875rem", background:"black", opacity:"0%"}} onClick={onClick}></div>*/}
            </Box>
    );
}

export default DashCalendar;