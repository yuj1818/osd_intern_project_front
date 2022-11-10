import React, {useEffect} from 'react';
import SelectionForm from "../../Components/selection/SelectionForm";
import BackgroundForm from "../../Components/common/BackgroundForm";
import { useDispatch, useSelector } from "react-redux";
import {getMember, getThisWeekIdx} from "../../modules/team";
import {
    selectDays,
    toggle,
    pickedCheck,
    changeDays,
    getSelectedDays,
    changedCheck,
    getSelectedDay
} from "../../modules/days";
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
import moment from "moment";
import 'moment/locale/ko';

function SelectionContainer(props) {

    const dispatch = useDispatch();

    const { nextTeam, thisTeam,  user, menu, menus, like, pick, input, days, suggested, liked, thisWeekIdx, selectedMenu, checkEmpty, picked, pickedMsg, selectedDays, changed, selectedDay } = useSelector(({team, user, menus, days}) => ({
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
        picked: days.picked,
        selectedDays: days.selectedDays,
        changed: days.changed,
        selectedDay: days.selectedDay,
        pick: menus.pick,
        pickedMsg: menus.pickedMsg,
        menu: menus.menu,
    }))

    const onClick = () => {
        if (input === '') {
            dispatch(emptyCheck(true));
        } else {
            dispatch(suggestMenu({tIndex: user.t_index, mNum: user.m_num, fName: input}));
            window.location.reload();
        }
        dispatch(changeInput(''));
    }

    const onChangeInput = e => {
        dispatch(changeInput(e.target.value));
    };

    const onLike = e => {
        dispatch(likeMenu({tIndex: user.t_index, mNum: user.m_num, fName: e.target.id}));
        dispatch(likeCheck(e.target.id));
    }

    useEffect(() => {
        if(pick) {
            dispatch(getLike({tIndex: user.t_index, mNum: user.m_num}));
        }
    },[pick, dispatch])

    useEffect(() => {
        dispatch(initialize());
    }, [dispatch]);

    useEffect(() => {
        if(user) {
            dispatch(getMember(user.m_num));
            dispatch(getMenus(user.t_index));
            dispatch(getThisWeekIdx(user.m_num));
            dispatch(getSelectedDays({t_index: user.t_index, m_num: user.m_num}));
        }
    }, [user, dispatch])

    useEffect(() => {
        if(menu) {
            dispatch(getMenus(user.t_index));
        }
    },[menu, dispatch])

    useEffect(() => {
        if(pickedMsg) {
            dispatch(getSelectedDays({t_index: user.t_index, m_num: user.m_num}));
        }
    }, [pickedMsg, dispatch]);

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
        if(selectedDays.length !== 0) {
            dispatch(pickedCheck(true))
        }
    }, [selectedDays, dispatch]);

    useEffect(() => {
        if (user) {
            dispatch(getLike({tIndex: user.t_index,mNum: user.m_num}))
        }
    },[liked, user, dispatch])

    const onToggle = e => {
        dispatch(toggle(parseInt(e.target.id)));
    }

    useEffect(() => {
        if(user) {
            dispatch(getSelectedMenu(thisWeekIdx));
            dispatch(getSelectedDay(thisWeekIdx));
        }
    }, [thisWeekIdx, user, dispatch])

    const emptyModalConfirm = () => {
        dispatch(emptyCheck(false));
    };

    const changeModalConfirm = () => {
        dispatch(changedCheck(false));
    };

    const onSubmit = () => {
        dispatch(selectDays({t_index: user.t_index, m_num: user.m_num, days}));
        dispatch(pickedCheck(true))
    }

    const onChangeDay = () => {
        dispatch(changeDays({t_index: user.t_index, m_num: user.m_num, days}));
        dispatch(changedCheck(true));
    }

    const now = moment().week()

    const selectedDayCal = moment().week(now - 1).day(selectedDay + 1).format("MM월 DD일 ddd")

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
                onSubmit = {onSubmit}
                picked={picked}
                onChangeDay={onChangeDay}
                selectedDay={selectedDayCal}
            />
            <AskModal
                visible={checkEmpty}
                title="메뉴 이름 빈칸"
                description="메뉴 이름을 적어주세요. 빈칸으로는 제출할 수 없습니다."
                onConfirm={emptyModalConfirm}
            />
            <AskModal
                visible={changed}
                title="날짜 변경"
                description="날짜 선택을 변경하셨습니다"
                onConfirm={changeModalConfirm}
            />
        </div>
    );
}

export default SelectionContainer;