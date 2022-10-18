import React, {useState} from 'react';
import Calendar from "../../Components/Calendar/Calendar";
import AddNewEvent from "../../Components/Calendar/AddNewEvent";

function CalendarContainer(props) {

    // 일정추가 창 보여주것을 정하는 State
    const [NewEvent, setNewEvent] = useState(false);
    // 일정분류 선택지 정보를 담는 State
    const [pickItem, setPickItem] = useState()

    const AddEventClick = () => {
        setNewEvent(true);
    };
    const CancelClick = () => {
        setNewEvent(false);
        setPickItem("default")
    };
    const ConfirmClick = () => {
        setNewEvent(false);
        let startDay = document.getElementById('startDate').value;
        //let endDay = document.getElementById('endDate').value;
        let title = document.getElementById('EventTitle').value;

        let seletedDays = document.getElementById(`Date-${startDay}`);
        let new_EventTag = document.createElement('div');
        new_EventTag.setAttribute('class',`${pickItem}`);
        new_EventTag.innerHTML = `${title}`;

        seletedDays.appendChild(new_EventTag)
        setPickItem("default")

        //console.log(startDay) 형식 : 2022-10-17 과 같이 나타남

    };
    const SelectItem = () => {
        let selectItem = document.getElementById("EventCategory").value;
        setPickItem(selectItem)
    }

    return (
        <div>
            <Calendar AddEventClick={AddEventClick} />
            <AddNewEvent
                visible={NewEvent}
                onCancel={CancelClick}
                onConfirm={ConfirmClick}
                pickItem={pickItem}
                SelectItem={SelectItem}
            />
        </div>
    );
}

export default CalendarContainer;