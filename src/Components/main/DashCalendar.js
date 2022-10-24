import {useEffect, useState} from 'react';
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
  align-items: center;
  justify-content: space-around;
  .birthday {
    background: lightpink;
  }
  .holiday {
    background: #ffd7a3;
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
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;

  .date {
    width: 100%;
    padding-left: 8px;
    text-align: left;
  }
  
  .sunday {
    color : red;
  }
  .anotherMonth {
    color: lightgray !important;
  }
  .holiday {
    background: #ffd7a3;
    width: 90%;
    padding-left: 6px;
    font-size: 1vh;
  }
  .birthday {
    background: lightpink;
    width: 90%;
    padding-left: 6px;
    font-size: 1vh;
  }
  .vacation {
    background: lightcyan;
    width: 90%;
    padding-left: 6px;
    font-size: 1vh;
  }
  .Event {
    background: #ffffb5;
    width: 90%;
    padding-left: 6px;
    font-size: 1vh;
  }
  .others {
    background: #bcc5fd;
    width: 90%;
    padding-left: 6px;
    font-size: 1vh;
  }   
`

const DPushTag = (key,
                  loadedMoment,
                  dayClass,
                  isHoliday,
) => {
    const today = loadedMoment.format('YYYYMMDD') === moment().format('YYYYMMDD');

    return (
        <DTableBody id={key} key={key} className={`${today ? 'today' : ''}`}>
            <div className={`date ${dayClass}`}>
                {loadedMoment.format('D')}
            </div>
            <div className="holiday">
                {isHoliday}
            </div>
        </DTableBody>
    )
}

function DashCalendar({
                          onClick,
                          year,
                          month,
                          yearIncreaseButton,
                          yearDecreaseButton,
                          monthIncreaseButton,
                          monthDecreaseButton
    }) {
    const [Holidays, setHolidays] = useState([]);
    const [getMoment, setMoment] = useState(moment())

    //// 나중에 API 받으면 수정해야할 부분
    ////
    ////


    ////
    ////
    //////////////////수정 여기까지

    const today = getMoment;
    // 이번달의 첫번째 주
    const firstWeek = today.clone().startOf('month').week();
    // 이번달의 마지막 주 (만약 마지막 주가 1이 나온다면 53번째 주로 변경)
    const lastWeek = today.clone().endOf('month').week() === 1? 53 : today.clone().endOf('month').week();

    const API_KEY = "E6c3ACjloHKJTdlaQSkPVuUcoZEWV8zH9knCD4EFe7gqpiCWNhNwdX8laJuPFjvAouKFvRsoV%2FruPjl2kz4Yqw%3D%3D"
    let solYear = year;
    let solMonth = month.toString().padStart(2,0);
    const operation = 'getHoliDeInfo';

    let url = `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/${operation}?solYear=${solYear}&solMonth=${solMonth}&ServiceKey=${API_KEY}&_type=json`;

    const getHolidays = async () => {
        let res = await fetch(url);
        let json = await res.json();
        const item = json.response.body.items.item;

        if (item) {
            setHolidays(item?.length ? item : [item]);
        }
    }

    useEffect(() => {
        getHolidays()
    }, [solYear,solMonth]);

    const calendarArr=()=> {
        let result = [];
        let week = firstWeek;
        let event = {};
        if(Holidays){
            Holidays.map((holiday) => {
                let event_year = holiday.locdate.toString().substring(0,4);
                let event_month = holiday.locdate.toString().substring(4,6).padStart(2,0);
                let event_day = holiday.locdate.toString().substring(6,8).padStart(2,0);

                let event_ID = `Date-${event_year}-${event_month}-${event_day}`;
                event[event_ID] = holiday.dateName;
            })
        }
        for (week; week <= lastWeek; week++) {
            for (let day = 0; day < 7; day++) {
                let days = today.clone().startOf('year').week(week).startOf('week').add(day, 'day'); // 'D' 로해도되지만 직관성
                let date = `Date-${days.format('YYYY-MM-DD')}`

                let todayCheck = moment().format('YYYYMMDD') === days.format('YYYYMMDD') ? 'Today' : 'week';
                let dayCheck = day === 0 ? 'sunday' : todayCheck;
                //------------------------------- 날짜 처리하는 구간 -------------------------------//
                // (이번달, !이번달)로 나눠서 처리.
                // 이번달은 글씨를 (평일 : 검정, 주말 : 빨강) 처리.
                if (days.format('MM') === today.format('MM')) {
                    if (date in event) {
                        result.push(DPushTag(date, days, dayCheck, event[date]));
                    } else {
                            result.push(DPushTag(date, days, dayCheck, ''));
                    }
                }
                // 이번달이 아닌 경우 모두 회색처리.
                else {
                    result.push (DPushTag(date, days,"anotherMonth"));
                }
            }
        }
        return result;
    }
    const yearPlusClick =()=> {
        setMoment(getMoment.clone().add(1, 'year'))
        yearIncreaseButton()
    }
    const yearMinusClick=()=> {
        setMoment(getMoment.clone().subtract(1, 'year'))
        yearDecreaseButton()
    }
    const monthPlusClick =()=> {
        setMoment(getMoment.clone().add(1, 'month'))
        monthIncreaseButton()
    }
    const monthMinusClick =()=> {
        setMoment(getMoment.clone().subtract(1, 'month'))
        monthDecreaseButton()
    }

    return (
            <Box style={{flexDirection : "column"}}>
                <DControllerBlock>
                    <DControlButton title="1년전" onClick={yearMinusClick}>«</DControlButton>
                    <DControlButton title="1달전" onClick={monthMinusClick}>‹</DControlButton>
                    <span>{year}년{month}월</span>
                    <DControlButton title="1달후" onClick={monthPlusClick}>›</DControlButton>
                    <DControlButton title="1년후" onClick={yearPlusClick}>»</DControlButton>
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
                {/*<iframe*/}
                {/*    src="https://calendar.google.com/calendar/embed?height=366&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FSeoul&showTitle=0&showPrint=0&showCalendars=0&showTz=0&showTabs=0&showNav=1&src=c29ueXVqZW9uZzE4QGdtYWlsLmNvbQ&src=a28uc291dGhfa29yZWEjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%237986CB&color=%230B8043"*/}
                {/*    style={{border:"solid 1px #777", width:"22.6875rem", height:"22.875rem", position:"relative"}}*/}
                {/*></iframe>*/}
                {/*<div style={{position:"absolute", width:"22.6875rem", height:"22.875rem", background:"black", opacity:"0%"}} onClick={onClick}></div>*/}
            </Box>
    );
}

export default DashCalendar;