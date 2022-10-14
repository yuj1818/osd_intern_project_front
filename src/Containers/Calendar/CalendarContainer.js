import React from 'react';
import BackgroundForm from "../../Components/common/BackgroundForm";
import Calendar from "../../Components/Calendar/Calendar";
import AskModal from "../../Components/common/AskModal";



function CalendarContainer(props) {

    let modalvisible = false
    const AddEventClick = () => {
        modalvisible = true
    };
    return (
        <div>
            <Calendar onClick={AddEventClick} />
            <AskModal visible={modalvisible}/>
        </div>
    );
}

export default CalendarContainer;