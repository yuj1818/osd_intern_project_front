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
                  today,
                  onIncreaseYear,
                  onDecreaseYear,
                  onIncreaseMonth,
                  onDecreaseMonth,
                  loadingHoliday,
                  Holidays,
}) {
    return (
        <>
            <Dashboard>
                <DashCalendar
                    onClick={onClick}
                    today={today}
                    onIncreaseYear={onIncreaseYear}
                    onDecreaseYear={onDecreaseYear}
                    onIncreaseMonth={onIncreaseMonth}
                    onDecreaseMonth={onDecreaseMonth}
                    loadingHoliday={loadingHoliday}
                    Holidays={Holidays}
                />
                <DashBob />
            </Dashboard>
        </>
    );
}

export default Main;