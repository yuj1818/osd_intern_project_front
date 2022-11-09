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
    initialize,
    suggestCheck,
    getLike,
    likeMenu,
    likeCheck,
    getSelectedMenu,
    emptyCheck
} from "../../modules/menus";
import AskModal from "../../Components/common/AskModal";

function SelectionContainer(props) {

    const dispatch = useDispatch();

    const { nextTeam, thisTeam,  user, menus, like, input, days, suggested, liked, thisWeekIdx, selectedMenu, checkEmpty } = useSelector(({team, user, menus, days}) => ({
        nextTeam: team.nextMember,
        thisTeam: team.thisMember,
        user: user.user,
        menus: menus.menus,
        like: menus.like,
        input: menus.input,
        days: days.days,
        suggested: menus.suggested,
        liked: menus.liked,
        thisWeekIdx: team.thisWeekIdx,
        selectedMenu: menus.selectedMenu,
        checkEmpty: menus.checkEmpty,
    }))

    const onClick = () => {
        const tIndex = user.t_index;
        const mNum = user.m_num;
        const fName = input;
        if (input === '') {
            dispatch(emptyCheck(true));
        } else {
            dispatch(suggestMenu({tIndex, mNum, fName}));
            window.location.reload();
        }
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
        if(menus.length !== 0 && user) {
            if (menus.find(function(menu){return menu.m_num === user.m_num})) {
                dispatch(suggestCheck(true))
            } else {
                dispatch(suggestCheck(false))
            }
        }
    }, [menus, user, dispatch]);

    useEffect(() => {
        if (user) {
            const tIndex = user.t_index;
            const mNum = user.m_num;
            dispatch(getLike({tIndex,mNum}))
        }
    },[liked, user, dispatch])

    const onToggle = e => {
        dispatch(toggle(parseInt(e.target.id)));
    }

    useEffect(() => {
        if(user) {
            dispatch(getSelectedMenu(thisWeekIdx));
        }
    }, [thisWeekIdx, user, dispatch])

    const modalConfirm = () => {
        dispatch(emptyCheck(false));
    };

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
                selectedMenu={selectedMenu}
            />
            <AskModal
                visible={checkEmpty}
                title="메뉴 이름 빈칸"
                description="메뉴 이름을 적어주세요. 빈칸으로는 제출할 수 없습니다."
                onConfirm={modalConfirm}
            />
        </div>
    );
}

export default SelectionContainer;