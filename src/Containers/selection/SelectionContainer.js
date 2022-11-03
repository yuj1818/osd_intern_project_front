import React, {useEffect} from 'react';
import SelectionForm from "../../Components/selection/SelectionForm";
import BackgroundForm from "../../Components/common/BackgroundForm";
import { connect } from "react-redux";
import { changeInput, insert, menuLike } from "../../modules/menus";
import { toggle } from "../../modules/days";
import {getNextMember, getThisMember} from "../../modules/team";
import { useDispatch, useSelector } from "react-redux";

function SelectionContainer({input, text, like, changeInput, insert, menuLike, days, toggle}) {

    const dispatch = useDispatch();

    const { nextTeam, thisTeam,  user } = useSelector(({team, user}) => ({
        nextTeam: team.nextMember,
        thisTeam: team.thisMember,
        user: user.user,
    }))

    useEffect(() => {
        if(user) {
            dispatch(getThisMember(user.m_num))
            dispatch(getNextMember(user.m_num));
        }
    }, [user, dispatch])

    return (
        <div>
            <BackgroundForm />
            <SelectionForm
                like={like}
                input={input}
                text={text}
                onChangeInput={changeInput}
                onInsert={insert}
                onLike={menuLike}
                days={days}
                onToggle={toggle}
                nextTeam={nextTeam}
                thisTeam={thisTeam}
            />
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