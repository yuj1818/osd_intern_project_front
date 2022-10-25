import React, {useState, useEffect} from 'react';
import Calendar from "../../Components/Calendar/Calendar";
import AddNewEvent from "../../Components/Calendar/AddNewEvent";

function CalendarContainer(props) {

    // 일정추가 창 보여주것을 정하는 State
    const [NewEvent, setNewEvent] = useState(false);
    // 일정분류 선택지 정보를 담는 State
    const [pickItem, setPickItem] = useState();
    // 카테고리 미선택 확인
    const [NoCategory, setNoCategory] = useState(true);

    const [confirm, setConfirm] = useState(false);

    const [input, setInput] = useState({
        eventTitle: '',
        writer: '',
        startDate: '',
        endDate: '',
    })

    const [nEvent, setNEvent] = useState({});

    const [category, setCategory] = useState('');

    const { eventTitle, writer, startDate, endDate } = input;

    const onChangeInput = e => {
        const {name, value} = e.target
        const nextInput = {
            ...input,
            [name]: value,
        }
        setInput(nextInput)
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
        if(input.eventTitle === ''){
            e.preventDefault() //제출완료 페이지로 넘어가는 것 방지
            alert('제목을 입력하세요')
        }
        else if(input.startDate === ''){
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
            setConfirm(true)

            setNEvent(input)

            setCategory(pickItem)

            setPickItem(undefined)

            setInput({
                eventTitle: '',
                writer: '',
                startDate: '',
                endDate: '',
            })

            //console.log(startDay) 형식 : 2022-10-17 과 같이 나타남
        }

    };
    const SelectItem = e => {
        let selectItem = e.target.value;
        setNoCategory(false);
        setPickItem(selectItem);
    }

    const onReload = () => {
        window.location.reload();
    }

    ////////////// Redux 구간

    const { momentValue } = useSelector(state => ({
        momentValue: state.momenter.momentValue,
    }));

    const dispatch = useDispatch();

    const yearIncreaseButton = () => dispatch(yearIncrease());
    const yearDecreaseButton = () => dispatch(yearDecrease());
    const monthIncreaseButton = () => dispatch(monthIncrease());
    const monthDecreaseButton = () => dispatch(monthDecrease());
    const getHoliday = () => dispatch(getHoliday())


    useEffect(() => {
        getHoliday(momentValue.format('YYYY'), momentValue.format('MM'));
    }, [momentValue]);

    return (
        <div>
            <Calendar
                AddEventClick={AddEventClick}
                confirm={confirm}
                startDate={nEvent.startDate}
                pickItem={category}
                eventTitle={nEvent.eventTitle}
                onReload={onReload}
                momentValue={momentValue}
                yearIncreaseButton={yearIncreaseButton}
                yearDecreaseButton={yearDecreaseButton}
                monthIncreaseButton={monthIncreaseButton}
                monthDecreaseButton={monthDecreaseButton}
                loadingHoliday={loadingHoliday}
                Holidays={holiday}
            />
            <AddNewEvent
                visible={NewEvent}
                onCancel={CancelClick}
                onConfirm={ConfirmClick}
                NoCategory={NoCategory}
                pickItem={pickItem}
                SelectItem={SelectItem}
                eventTitle={eventTitle}
                writer={writer}
                startDate={startDate}
                endDate={endDate}
                onChangeInput={onChangeInput}
            />
        </div>
    );
}
