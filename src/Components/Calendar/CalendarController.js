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



function CalendarController ({
                                 AddEventClick,
                                 onReload,
                             })
{


    return(
        <div>
            <CalendarControllerBlock>
                <button title="새로고침" onClick={onReload}><i className="fas fa-redo fa-fw me-1" /></button>
                <Spacer style={{gridColumn:"2/4",gridRow : "1"}}></Spacer>
                <button style={{gridColumn:"4/6",gridRow : "1"}} onClick={AddEventClick}>일정추가</button>
            </CalendarControllerBlock>
        </div>
    )
}

export default CalendarController;