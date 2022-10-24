import {useState, useEffect} from "react";
import styled from "styled-components";

//// API  //////////////////////////////////////////////////////////////////////////
//  필수 입력값들
// API_KEY : 인증키값
// solYear & solMonth : 검색할 연도와 월
// 오퍼레이션 : { getHoliDeInfo : 국경일 , getRestDeInfo : 공휴일,
//         getAnniversaryInfo : 기념일 , get24DivisionsInfo : 24절기, getSundryDayInfo : 잡절 ]
//
//  참고
// 배포 페이지 : https://www.data.go.kr/dataset/15012690/openapi.do
// 예시 : https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=2019&solMonth=05&ServiceKey=E6c3ACjloHKJTdlaQSkPVuUcoZEWV8zH9knCD4EFe7gqpiCWNhNwdX8laJuPFjvAouKFvRsoV%2FruPjl2kz4Yqw%3D%3D&_type=json
//
////////////////////////////////////////////////////////////////////////////////////////////////

// function HolidayList () {
//
//
//     // const MakeEvent = ( Data ) => {
//     //     let event_year = Data.Data.locdate.toString().substring(0,4);
//     //     let event_month = Data.Data.locdate.toString().substring(4,6).padStart(2,0);
//     //     let event_day = Data.Data.locdate.toString().substring(6,8).padStart(2,0);
//     //
//     //     let event_ID = `Date-${event_year}-${event_month}-${event_day}`;
//     //     let selected_Day = document.getElementById(`${event_ID}`);
//     //
//     //     let new_EventTag = document.createElement('div');
//     //     new_EventTag.setAttribute('class',`holiday`);
//     //     new_EventTag.innerHTML = `${Data.Data.dateName}`;
//     //
//     //     selected_Day.appendChild(new_EventTag);
//     // }
//
//
//     //console.log(Holidays)
//
//     return Holidays;
// }
//
// export default HolidayList;