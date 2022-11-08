import React, {useEffect} from 'react';
import SelectionForm from "../../Components/selection/SelectionForm";
import BackgroundForm from "../../Components/common/BackgroundForm";
import { useDispatch, useSelector } from "react-redux";
import {getMember, getThisWeekIdx} from "../../modules/team";
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

    const onClick = () => {
        const tIndex = user.t_index;
        const mNum = user.m_num;
        const fName = input;
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
        const tIndex = user.t_index;
        const mNum = user.m_num;
        const fName = e.target.id;
        dispatch(likeMenu({tIndex, mNum, fName}));
        dispatch(likeCheck(fName));
        dispatch(getLike({tIndex, mNum}));
    }

    useEffect(() => {
        dispatch(initialize());
    }, [dispatch]);

    useEffect(() => {
        if(user) {
            dispatch(getMember(user.m_num));
            dispatch(getMenus(user.t_index));
            dispatch(getThisWeekIdx(user.m_num));
        }
    }, [user, dispatch])

    useEffect(() => {
        if(menus.length != 0) {
            if (menus.find(function(menu){return menu.m_num === user.m_num})) {
                dispatch(suggestCheck(true))
            } else {
                dispatch(suggestCheck(false))
            }
        }
    }, [menus, dispatch]);

    useEffect(() => {
        if (user) {
            const tIndex = user.t_index;
            const mNum = user.m_num;
            dispatch(getLike({tIndex,mNum}))
        }
    },[liked, dispatch])

    const onToggle = e => {
        dispatch(toggle(parseInt(e.target.id)));
    }


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
                onToggle={onToggle}
                nextTeam={nextTeam}
                thisTeam={thisTeam}
                menus={menus}
                suggested={suggested}
            />
        </div>
    );
}

export default SelectionContainer;