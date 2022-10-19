import React, {useCallback, useState} from 'react';
import SelectionForm from "../../Components/selection/SelectionForm";
import BackgroundForm from "../../Components/common/BackgroundForm";

function SelectionContainer(props) {

    const [like, setLike] = useState(false);
    const [suggestionMenu, setSuggestionMenu] = useState("");
    const [updateMenu, setUpdateMenu] = useState(suggestionMenu);
    const [days, setDays] = useState([
        {
            id: 1,
            text: "월요일",
            checked: true,
        },
        {
            id: 2,
            text: "화요일",
            checked: true,
        },
        {
            id: 3,
            text: "수요일",
            checked: true,
        },
        {
            id: 4,
            text: "목요일",
            checked: true,
        },
        {
            id: 5,
            text: "금요일",
            checked: true,
        }
    ]);

    const changeCheck = useCallback(
        id => {
            setDays(
                days.map(day =>
                    day.id === id ? { ...day, checked: !day.checked } : day,
                ),
            );
        },
        [days],
    );

    const onLike = () => {
        setLike(!like)
    }

    const onChange = (event) => {
        setSuggestionMenu(event.target.value);
    }

    const onClick = (event) => {
        setUpdateMenu(suggestionMenu)
        setSuggestionMenu("")
    }

    return (
        <div>
            <BackgroundForm />
            <SelectionForm like={like} onLike={onLike} suggestionMenu={suggestionMenu} updateMenu={updateMenu} onChange={onChange} onClick={onClick} days={days} changeCheck={changeCheck} />
        </div>
    );
}

export default SelectionContainer;