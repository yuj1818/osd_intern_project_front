import React from 'react';
import styled from "styled-components";
import DashCalendar from "./DashCalendar";
import DashBob from "./DashBob";

const Dashboard = styled.div`
  position: absolute;
  top: 8vh;
  bottom: 4vh;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
`

function Main({
                  onClick,
                  momentValue,
                  yearIncreaseButton,
                  yearDecreaseButton,
                  monthDecreaseButton,
                  monthIncreaseButton,
                  Holidays,
                  newEventList,
                  newVacationList,
                  loadingHoliday,
                  loadingEvents,
                  loadingVacation,
                  nextTeam,
                  thisTeam,
}) {
    return (
        <>
            <Dashboard>
                <DashCalendar
                    onClick={onClick}
                    momentValue={momentValue}
                    yearIncreaseButton={yearIncreaseButton}
                    yearDecreaseButton={yearDecreaseButton}
                    monthDecreaseButton={monthDecreaseButton}
                    monthIncreaseButton={monthIncreaseButton}
                    Holidays={Holidays}
                    newEventList={newEventList}
                    newVacationList={newVacationList}
                    loadingHoliday={loadingHoliday}
                    loadingEvents={loadingEvents}
                    loadingVacation={loadingVacation}
                />
                <DashBob nextTeam={nextTeam} thisTeam={thisTeam}/>
            </Dashboard>
        </>
    );
}

export default Main;