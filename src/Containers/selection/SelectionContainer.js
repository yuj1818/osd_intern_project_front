import React, { useState } from 'react';
import SelectionForm from "../../Components/selection/SelectionForm";
import BackgroundForm from "../../Components/common/BackgroundForm";

function SelectionContainer(props) {

    const [like, setLike] = useState(false);
    const [suggestionMenu, setSuggestionMenu] = useState("");
    const [updateMenu, setUpdateMenu] = useState(suggestionMenu);

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
            <SelectionForm like={like} onLike={onLike} suggestionMenu={suggestionMenu} updateMenu={updateMenu} onChange={onChange} onClick={onClick} />
        </div>
    );
}

export default SelectionContainer;