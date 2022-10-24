import {useEffect, useState} from 'react';
import moment from 'moment';
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
    background: #ffd7a3;
    width: 97%;
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
    dayClass,
    isHoliday,
    isEvent,
    eventTitle
) => {
    // 다른 달의 경우 모두 회색으로 처리
    // if (dayClass === "anotherMonth"
    // ) {
    //     return (
    //         <TableBody id={key} key={key}>
    //             <div className="date anotherMonth"> {loadedMoment.format('D')} </div>
    //         </TableBody>
    //     )
    // }
    // // 이번 달의 경우 (오늘,평일,주말) 각각 따로 처리
    // else {
    //     if (isHoliday) {
    //         if (isEvent) {
    //             // 오늘의 경우
    //             if (dayClass === "Today") {
    //                 return (
    //                     <TableBody id={key} key={key} className="today">
    //                         <div className="date">
    //                             {loadedMoment.format('D')}
    //                             <div className="holiday">
    //                                 {isHoliday}
    //                             </div>
    //                             <div className={isEvent}>
    //                                 {eventTitle}
    //                             </div>
    //                         </div>
    //                     </TableBody>
    //                 )
    //             }
    //             else {
    //                 return(
    //                     <TableBody id={key} key={key}>
    //                         {
    //                             dayClass === "week" ?
    //                                 // 평일일 경우 날짜를 검정색으로
    //                                 <div className="date">
    //                                     {loadedMoment.format('D')}
    //                                     <div className="holiday">
    //                                         {isHoliday}
    //                                     </div>
    //                                     <div className={isEvent}>
    //                                         {eventTitle}
    //                                     </div>
    //                                 </div>
    //                                 :
    //                                 // 주말일 경우 날짜를 빨간색으로
    //                                 <div className="date sunday">
    //                                     {loadedMoment.format('D')}
    //                                     <div className="holiday">
    //                                         {isHoliday}
    //                                     </div>
    //                                     <div className={isEvent}>
    //                                         {eventTitle}
    //                                     </div>
    //                                 </div>
    //                         }
    //                     </TableBody>)
    //             }
    //         }
    //         else {
    //             // 오늘의 경우
    //             if (dayClass === "Today") {
    //                 return (
    //                     <TableBody id={key} key={key} className="today">
    //                         <div className="date">
    //                             {loadedMoment.format('D')}
    //                             <div className="holiday">
    //                                 {isHoliday}
    //                             </div>
    //                         </div>
    //                     </TableBody>
    //                 )
    //             }
    //             else {
    //                 return(
    //                     <TableBody id={key} key={key}>
    //                         {
    //                             dayClass === "week" ?
    //                                 // 평일일 경우 날짜를 검정색으로
    //                                 <div className="date">
    //                                     {loadedMoment.format('D')}
    //                                     <div className="holiday">
    //                                         {isHoliday}
    //                                     </div>
    //                                 </div>
    //                                 :
    //                                 // 주말일 경우 날짜를 빨간색으로
    //                                 <div className="date sunday">
    //                                     {loadedMoment.format('D')}
    //                                     <div className="holiday">
    //                                         {isHoliday}
    //                                     </div>
    //                                 </div>
    //                         }
    //                     </TableBody>)
    //             }
    //         }
    //     }
    //     else {
    //         if (isEvent) {
    //             if (dayClass === "Today") {
    //                 return (
    //                     <TableBody id={key} key={key} className="today">
    //                         <div className="date">
    //                             {loadedMoment.format('D')}
    //                             <div className={isEvent}>
    //                                 {eventTitle}
    //                             </div>
    //                         </div>
    //                     </TableBody>
    //                 )
    //             }
    //             else {
    //                 return(
    //                     <TableBody id={key} key={key}>
    //                         {
    //                             dayClass === "week" ?
    //                                 // 평일일 경우 날짜를 검정색으로
    //                                 <div className="date">
    //                                     {loadedMoment.format('D')}
    //                                     <div className={isEvent}>
    //                                         {eventTitle}
    //                                     </div>
    //                                 </div>
    //                                 :
    //                                 // 주말일 경우 날짜를 빨간색으로
    //                                 <div className="date sunday">
    //                                     {loadedMoment.format('D')}
    //                                     <div className={isEvent}>
    //                                         {eventTitle}
    //                                     </div>
    //                                 </div>
    //                         }
    //                     </TableBody>)
    //             }
    //         }
    //         else {
    //             if (dayClass === "Today") {
    //                 return (
    //                     <TableBody id={key} key={key} className="today">
    //                         <div className="date">
    //                             {loadedMoment.format('D')}
    //                         </div>
    //                     </TableBody>
    //                 )
    //             }
    //             else {
    //                 return(
    //                     <TableBody id={key} key={key}>
    //                         {
    //                             dayClass === "week" ?
    //                                 // 평일일 경우 날짜를 검정색으로
    //                                 <div className="date">
    //                                     {loadedMoment.format('D')}
    //                                 </div>
    //                                 :
    //                                 // 주말일 경우 날짜를 빨간색으로
    //                                 <div className="date sunday">
    //                                     {loadedMoment.format('D')}
    //                                 </div>
    //                         }
    //                     </TableBody>)
    //             }
    //         }
    //     }
    //
    // }
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
                       year,
                       month
    }) {

    const [Holidays, setHolidays] = useState([]);
    const [getMoment, setMoment] = useState(moment())

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

    // const getHolidays = async() => {
    //     let res = await fetch(url);
    //     let json = await res.json();
    //     //console.log("res :" ,res ,"json :", json)
    //     if(json.response.body.items.item){
    //         if (json.response.body.items.item.length) {
    //             setHolidays(json.response.body.items.item)
    //         } else {
    //             setHolidays([json.response.body.items.item])
    //         }
    //     }
    // }

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
        if(Holidays){
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
                let days = today.clone().startOf('year').week(week).startOf('week').add(day, 'day'); // 'D' 로해도되지만 직관성
                let date = `Date-${days.format('YYYY-MM-DD')}`

                let todayCheck = moment().format('YYYYMMDD') === days.format('YYYYMMDD') ? 'Today' : 'week';
                let dayCheck = day === 0 ? 'sunday' : todayCheck;
                //------------------------------- 날짜 처리하는 구간 -------------------------------//
                // (이번달, !이번달)로 나눠서 처리.
                // 이번달은 글씨를 (평일 : 검정, 주말 : 빨강) 처리.
                if (days.format('MM') === today.format('MM')) {
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
                // //------------------------------- 날짜 처리하는 구간 -------------------------------//
                // // (이번달, !이번달)로 나눠서 처리.
                // // 이번달은 글씨를 (평일 : 검정, 주말 : 빨강) 처리.
                // if(days.format('MM') === today.format('MM')){
                //     if (date in event) {
                //         if (date === `Date-${startDate}` && confirm) {
                //             // 오늘 날짜 처리
                //             if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
                //                 result.push(PushTag(date, days, "Today", event[date], pickItem, eventTitle));
                //             }
                //             // 일요일 인 날에는 빨간글씨
                //             else if (day === 0) {
                //                 result.push (PushTag(date, days, "sunday", event[date], pickItem, eventTitle));
                //             }
                //             // 일요일 아닌 날에는 검정글씨
                //             else {
                //                 result.push (PushTag(date, days, "week", event[date], pickItem, eventTitle));
                //             }
                //         }
                //         else {
                //             if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
                //                 result.push(PushTag(date, days, "Today", event[date], '', ''));
                //             }
                //             // 일요일 인 날에는 빨간글씨
                //             else if (day === 0) {
                //                 result.push (PushTag(date, days, "sunday", event[date], '', ''));
                //             }
                //             // 일요일 아닌 날에는 검정글씨
                //             else {
                //                 result.push (PushTag(date, days, "week", event[date], '', ''));
                //             }
                //         }
                //
                //     }
                //     else {
                //         if(date === `Date-${startDate}` && confirm) {
                //             // 오늘 날짜 처리
                //             if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
                //                 result.push(PushTag(date, days, "Today", '', pickItem, eventTitle));
                //             }
                //             // 일요일 인 날에는 빨간글씨
                //             else if (day === 0) {
                //                 result.push (PushTag(date, days, "sunday", '', pickItem, eventTitle));
                //             }
                //             // 일요일 아닌 날에는 검정글씨
                //             else {
                //                 result.push (PushTag(date, days, "week", '', pickItem, eventTitle));
                //             }
                //         }
                //         else {
                //             // 오늘 날짜 처리
                //             if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
                //                 result.push(PushTag(date, days, "Today", '', '', ''));
                //             }
                //             // 일요일 인 날에는 빨간글씨
                //             else if (day === 0) {
                //                 result.push (PushTag(date, days, "sunday", '', '', ''));
                //             }
                //             // 일요일 아닌 날에는 검정글씨
                //             else {
                //                 result.push (PushTag(date, days, "week", '', '', ''));
                //             }
                //         }
                //
                //     }
                // }
                // // 이번달이 아닌 경우 모두 회색처리.
                // else {
                //     result.push (PushTag(date, days,"anotherMonth"));
                // }
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

    return(
        <div>
            <CalTotalBlock>
                <CalendarControllerBlock>
                    <button title="새로고침" onClick={onReload}><i className="fas fa-redo fa-fw me-1" /></button>
                    <Spacer style={{gridColumn:"2/4",gridRow : "1"}}></Spacer>
                    <button style={{gridColumn:"4/6",gridRow : "1"}} onClick={AddEventClick}>일정추가</button>
                    <ControlButton title="1년전" onClick={yearMinusClick}>«</ControlButton>
                    <ControlButton title="1달전" onClick={monthMinusClick}>‹</ControlButton>
                    <span style={{gridColumn:"3", fontSize:"25px"}}>{year}년 {month.toString().padStart(2,0)}월</span>
                    <ControlButton title="1달후"  onClick={monthPlusClick}>›</ControlButton>
                    <ControlButton title="1년후"  onClick={yearPlusClick}>»</ControlButton>
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