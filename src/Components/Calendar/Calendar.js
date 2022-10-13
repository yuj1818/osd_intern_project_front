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
  border: 1px solid black;
`
const CalendarIndex = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 8px;
`
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
    background: lightyellow;
    width: 90%;
    padding-left: 6px;
  }
`

const exampleDay =() => {
    let days = [];
    for ( let i = 1; i <= 32; i++) {
        days.push(i)
    }
    return days;
} ;
function Calendar () {
    return(
        <div>
            <CalTotalBlock>
                <CalendarControllerBlock>
                    <button><i className="fas fa-redo fa-fw me-1" /></button>
                    <Spacer style={{gridColumn:"2/4",gridRow : "1"}}></Spacer>
                    <button style={{gridColumn:"4/6",gridRow : "1"}}>일정추가</button>
                    <ControlButton>«</ControlButton>
                    <ControlButton>‹</ControlButton>
                    <span>날짜</span>
                    <ControlButton>›</ControlButton>
                    <ControlButton>»</ControlButton>
                </CalendarControllerBlock>
                <CalendarBlock>
                    <CalendarIndex>
                        Index
                    </CalendarIndex>
                    <CalendarBox>
                        { ['일','월','화','수','목','금','토'].map((day) => {
                            return( <TableHead key={day}>{day}</TableHead> )
                        })}
                        { exampleDay().map((day) => {
                            return(
                                <TableBody key={day}>
                                    <div className="date" >{day}</div>
                                    <div className="birthday">생일</div>
                                    <div className="vacation">휴가</div>
                                    <div className="Event">행사</div>
                                </TableBody>)
                        }) }
                    </CalendarBox>
                </CalendarBlock>
            </CalTotalBlock>
        </div>
    )
}

export default Calendar;