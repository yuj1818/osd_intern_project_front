import React, {useCallback, useState} from 'react';
import SelectionForm from "../../Components/selection/SelectionForm";
import BackgroundForm from "../../Components/common/BackgroundForm";
import { connect } from "react-redux";
import { changeInput, insert, menuLike } from "../../modules/menus";
import { toggle } from "../../modules/days";

function SelectionContainer({input, text, like, changeInput, insert, menuLike, days, toggle}) {

    return (
        <div>
            <BackgroundForm />
            <SelectionForm like={like} input={input} text={text} onChangeInput={changeInput} onInsert={insert} onLike={menuLike} days={days} onToggle={toggle} />
        </div>
    );
}

export default connect(
    ({menus, days}) => ({
        input: menus.input,
        text: menus.text,
        like: menus.like,
        days: days.days,
    }),
    {
        changeInput,
        insert,
        menuLike,
        toggle,
    },
)(SelectionContainer);