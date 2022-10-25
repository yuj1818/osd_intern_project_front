import React from 'react';
import HeaderContainer from "../Containers/common/HeaderContainer";
import FooterContainer from "../Containers/common/FooterContainer";
import CalendarContainer from "../Containers/Calendar/CalendarContainer"

function CalendarPage(props) {
    return (
        <div>
            <HeaderContainer />
            <CalendarContainer />
            <FooterContainer />
        </div>
    );
}

export default CalendarPage;