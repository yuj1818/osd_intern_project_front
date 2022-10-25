import {useEffect, useState} from 'react';
import moment from 'moment';
import palette from "../../lib/styles/palette";
import styled from "styled-components";

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
const IndexingBar = styled.div`
  margin: 7px;
  width: 5vw;
  max-width: 50px ;
  height: 3vh;
  min-height: 15px;
  max-height: 25px;
  font-size: 2vh;
`;
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
  font-size: 15px;
  text-align: center;
  cursor: pointer;
`
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
    background: ${palette.holi};
    width: 90%;
  }
  .birthday {
    background: ${palette.birth};
    width: 90%;
  }
  .vacation {
    background: ${palette.vaca};
    width: 90%;
  }
  .Event {
    background: ${palette.Event};
    width: 90%;
  }
  .others {
    background: ${palette.others};
    width: 90%;
  }
`
const PushTag = (
    key,
    loadedMoment,
    dayClass,
    isHoliday,
    isEvent,
    eventTitle
) => {
    const today = loadedMoment.format('YYYYMMDD') === moment().format('YYYYMMDD');

    return (
        <TableBody id={key} key={key} className={`${today ? 'today' : ''}`}>
            <div className={`date ${dayClass}`}>
                {loadedMoment.format('D')}
            </div>
            <div className="holiday">
                {isHoliday}
            </div>
            <div className={isEvent}>
                {eventTitle}
            </div>

        </TableBody>
    )

}

function Calendar ({
                       AddEventClick,
                       confirm,
                       startDate,
                       pickItem,
                       eventTitle,
                       onReload,
                       monthDecreaseButton,
                       monthIncreaseButton,
                       yearDecreaseButton,
                       yearIncreaseButton, 
                       momentValue,                     
    }) {

    const [Holidays, setHolidays] = useState([]);
  
    // 이번달의 첫번째 주
    const firstWeek = momentValue.clone().startOf('month').week();
    // 이번달의 마지막 주 (만약 마지막 주가 1이 나온다면 53번째 주로 변경)
    const lastWeek = momentValue.clone().endOf('month').week() === 1? 53 : momentValue.clone().endOf('month').week();

    const API_KEY = "E6c3ACjloHKJTdlaQSkPVuUcoZEWV8zH9knCD4EFe7gqpiCWNhNwdX8laJuPFjvAouKFvRsoV%2FruPjl2kz4Yqw%3D%3D"
    let solYear = momentValue.format('YYYY');
    let solMonth = momentValue.format('MM');
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

    const calendarArr=()=>{
        let result = [];
        let week = firstWeek;
        let event = {};
        if(!loadingHoliday && Holidays){
            Holidays.map((holiday) => {
                let event_year = holiday.locdate.toString().substring(0,4);
                let event_month = holiday.locdate.toString().substring(4,6).padStart(2,0);
                let event_day = holiday.locdate.toString().substring(6,8).padStart(2,0);

                let event_ID = `Date-${event_year}-${event_month}-${event_day}`;
                event[event_ID] = holiday.dateName;
            })
        }

        for ( week; week <= lastWeek; week++) {
            // day = [ 일,월,화,수,목,금,토 ]
            for ( let day=0 ; day < 7 ; day ++ ) {
                // 'days' : Moment 값
                // 'date' : ID 값을 넣기 위함.
                let days = momentValue.clone().startOf('year').week(week).startOf('week').add(day, 'day'); // 'D' 로해도되지만 직관성
                let date = `Date-${days.format('YYYY-MM-DD')}`

                let todayCheck = moment().format('YYYYMMDD') === days.format('YYYYMMDD') ? 'Today' : 'week';
                let dayCheck = day === 0 ? 'sunday' : todayCheck;
                //------------------------------- 날짜 처리하는 구간 -------------------------------//
                // (이번달, !이번달)로 나눠서 처리.
                // 이번달은 글씨를 (평일 : 검정, 주말 : 빨강) 처리.
                if (days.format('MM') === momentValue.format('MM')) {
                    if (date in event) {
                        if (date === `Date-${startDate}` && confirm) {
                            result.push(PushTag(date, days, dayCheck, event[date], pickItem, eventTitle));
                        } else {
                            result.push(PushTag(date, days, dayCheck, event[date], '', ''));
                        }
                    } else {
                        if (date === `Date-${startDate}` && confirm) {
                            result.push(PushTag(date, days, dayCheck, '', pickItem, eventTitle));
                        } else {
                            result.push(PushTag(date, days, dayCheck, '', '', ''));
                        }
                    }
                }
                // 이번달이 아닌 경우 모두 회색처리.
                else {
                    result.push(PushTag(date, days, "anotherMonth"));
                }
            }
        }
        return result;
    }

    return(
        <div>
            <CalTotalBlock>
                <CalendarControllerBlock>
                    <button title="새로고침" onClick={onReload}><i className="fas fa-redo fa-fw me-1" /></button>
                    <Spacer style={{gridColumn:"2/4",gridRow : "1"}}></Spacer>
                    <button style={{gridColumn:"4/6",gridRow : "1"}} onClick={AddEventClick}>일정추가</button>                    
                    <ControlButton title="1년전" onClick={yearDecreaseButton}>«</ControlButton>
                    <ControlButton title="1달전" onClick={monthDecreaseButton}>‹</ControlButton>
                    <span style={{gridColumn:"3", fontSize:"25px"}}>{momentValue.format('YYYY 년 MM 월')}</span>
                    <ControlButton title="1달후"  onClick={monthIncreaseButton}>›</ControlButton>
                    <ControlButton title="1년후"  onClick={yearIncreaseButton}>»</ControlButton>
                </CalendarControllerBlock>
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