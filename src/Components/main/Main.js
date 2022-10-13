import React from 'react';
import styled from "styled-components";
import DashCalendar from "./DashCalendar";
import DashBob from "./DashBob";

const Dashboard = styled.div`
  position: absolute;
  top: 6.25rem;
  bottom: 6.25rem;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
`

function Main({onClick}) {
    return (
        <>
            <Dashboard>
                <DashCalendar onClick={onClick}/>
                <DashBob />
            </Dashboard>
        </>
    );
}

export default Main;