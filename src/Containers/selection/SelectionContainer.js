import React, {useEffect} from 'react';
import SelectionForm from "../../Components/selection/SelectionForm";
import BackgroundForm from "../../Components/common/BackgroundForm";
import { useDispatch, useSelector } from "react-redux";
import { getMember } from "../../modules/team";
import { toggle } from "../../modules/days";
import {
    changeInput,
    getMenus,
    suggestMenu,
    updateMenu,
    initialize,
    suggestCheck,
    getLike, likeMenu, likeCheck
} from "../../modules/menus";

function SelectionContainer(props) {

    const dispatch = useDispatch();

    const { nextTeam, thisTeam,  user, menus, like, input, days, suggested, liked} = useSelector(({team, user, menus, days}) => ({
        nextTeam: team.nextMember,
        thisTeam: team.thisMember,
        user: user.user,
        menus: menus.menus,
        like: menus.like,
        input: menus.input,
        days: days.days,
        suggested: menus.suggested,
        liked: menus.liked
    }))

    const tIndex = user.t_index;
    const mNum = user.m_num;
    const fName = input;

    const onClick = () => {
        if(suggested) {
            dispatch(updateMenu({tIndex, mNum, fName}))
        } else {
            dispatch(suggestMenu({tIndex, mNum, fName}));
        }
        window.location.reload();
        dispatch(changeInput(''));
    }

    const onChangeInput = e => {
        dispatch(changeInput(e.target.value));
    };

    const onLike = e => {
        const fName = e.target.id;
        dispatch(likeMenu({tIndex, mNum, fName}));
        dispatch(likeCheck(fName));
    }

    useEffect(() => {
        dispatch(initialize());
    }, [dispatch]);

    useEffect(() => {
        if(user) {
            dispatch(getMember(mNum));
            dispatch(getMenus(tIndex));
            dispatch(getLike({tIndex, mNum}));
        }
    }, [user, dispatch])

    useEffect(() => {
        if(menus.length != 0) {
            console.log(menus.find(function(menu){return menu.m_num === user.m_num }))
            if (menus.find(function(menu){return menu.m_num === user.m_num})) {
                dispatch(suggestCheck(true))
            } else {
                dispatch(suggestCheck(false))
            }
        }
    }, [menus, dispatch]);


    return (
        <div>
            <BackgroundForm />
            <SelectionForm
                like={like}
                input={input}
                onChangeInput={onChangeInput}
                onClick={onClick}
                onLike={onLike}
                days={days}
                onToggle={toggle}
                nextTeam={nextTeam}
                thisTeam={thisTeam}
                menus={menus}
                suggested={suggested}
                liked={liked}
            />
        </div>
    );
}

export default SelectionContainer;