import React, {useState} from 'react';
import Calendar from "../../Components/Calendar/Calendar";
import AddNewEvent from "../../Components/Calendar/AddNewEvent";
import Holiday from "../../Components/Calendar/Holiday";

function CalendarContainer(props) {

    // 일정추가 창 보여주것을 정하는 State
    const [NewEvent, setNewEvent] = useState(false);
    // 일정분류 선택지 정보를 담는 State
    const [pickItem, setPickItem] = useState();
    // 카테고리 미선택 확인
    const [NoCategory, setNoCategory] = useState(true);

    function inputDataCheck (e) {

    }


    const AddEventClick = () => {
        setNewEvent(true);
    };
    const CancelClick = () => {
        setNoCategory(true);
        setNewEvent(false);
        setPickItem(undefined)
    };
    const ConfirmClick = (e) => {
        if(document.getElementById('EventTitle').value == ''){
            e.preventDefault() //제출완료 페이지로 넘어가는 것 방지
            alert('제목을 입력하세요')
        }
        else if(document.getElementById('startDate').value == ''){
            e.preventDefault()
            alert('날짜를 입력하세요')
        }
        // else if(document.getElementById('endDate').value == ''){
        //     e.preventDefault()
        //     alert('날짜를 입력하세요')
        // }
        else {
            setNoCategory(true);
            setNewEvent(false);
            let startDay = document.getElementById('startDate').value;
            //let endDay = document.getElementById('endDate').value;
            let title = document.getElementById('EventTitle').value;

            let selectedDays = document.getElementById(`Date-${startDay}`);
            let new_EventTag = document.createElement('div');
            new_EventTag.setAttribute('class',`${pickItem}`);
            new_EventTag.innerHTML = `${title}`;

            selectedDays.appendChild(new_EventTag)
            setPickItem(undefined)

            //console.log(startDay) 형식 : 2022-10-17 과 같이 나타남
        }

    };
    const SelectItem = () => {
        let selectItem = document.getElementById("EventCategory").value;
        setNoCategory(false);
        setPickItem(selectItem);
    }

    return (
        <div>
            <Calendar AddEventClick={AddEventClick} />
            <AddNewEvent
                visible={NewEvent}
                onCancel={CancelClick}
                onConfirm={ConfirmClick}
                NoCategory={NoCategory}
                pickItem={pickItem}
                SelectItem={SelectItem}
            />
            <Holiday />
        </div>
    );
}

export default CalendarContainer;