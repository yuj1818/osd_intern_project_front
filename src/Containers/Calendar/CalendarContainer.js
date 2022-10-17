import React, {useState} from 'react';
import Calendar from "../../Components/Calendar/Calendar";
import AddNewEvent from "../../Components/Calendar/AddNewEvent";



function CalendarContainer(props) {

    let [NewEvent, setNewEvent] = useState(false);
    const AddEventClick = () => {
        setNewEvent(true);
    };
    const CancelClick = () => {
        setNewEvent(false);
    };
    const ConfirmClick = () => {
        setNewEvent(false);
        // 여기에 저장하는 코드 입력해야함
    };
    return (
        <div>
            <Calendar AddEventClick={AddEventClick} />
            <AddNewEvent
                visible={NewEvent}
                onCancel={CancelClick}
                onConfirm={ConfirmClick}
            />
        </div>
    );
}

export default CalendarContainer;