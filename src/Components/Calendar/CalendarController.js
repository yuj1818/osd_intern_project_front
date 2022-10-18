import styled from "styled-components";

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

function CalendarController ({
                                 AddEventClick,
                                 setMoment,
                                 getMoment,
                                 today
                             })
{
    return(
        <div>
            <CalendarControllerBlock>
                <button><i className="fas fa-redo fa-fw me-1" /></button>
                <Spacer style={{gridColumn:"2/4",gridRow : "1"}}></Spacer>
                <button style={{gridColumn:"4/6",gridRow : "1"}} onClick={AddEventClick}>일정추가</button>
                <ControlButton onClick={()=>{ setMoment(getMoment.clone().subtract(1, 'year')) }}>«</ControlButton>
                <ControlButton onClick={()=>{ setMoment(getMoment.clone().subtract(1, 'month')) }}>‹</ControlButton>
                <span style={{gridColumn:"3",gridRow : "1/3", fontSize:"25px"}}>{today.format('YY 년 MM 월')}</span>
                <ControlButton onClick={()=>{ setMoment(getMoment.clone().add(1, 'month')) }}>›</ControlButton>
                <ControlButton onClick={()=>{ setMoment(getMoment.clone().add(1, 'year')) }}>»</ControlButton>
            </CalendarControllerBlock>
        </div>
    )
}

export default CalendarController;