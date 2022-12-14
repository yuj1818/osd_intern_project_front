import React from 'react';
import TeamNextWeek from "./TeamNextWeek";
import TeamThisWeek from "./TeamThisWeek";
import styled from "styled-components";
import SelectMenu from "./SelectMenu";
import SelectDay from "./SelectDay";

const TeamBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6vh 0 1vh 0;
`

const SelectionBlock = styled.div`
  display: flex;
  justify-content: center;
  padding: 4vmin;
`

function SelectionForm({
                           like,
                           input,
                           onChangeInput,
                           onLike, days,
                           onToggle,
                           nextTeam,
                           thisTeam,
                           onClick,
                           menus,
                           suggested,
                           liked,
                           selectedMenu,
                           onSubmit,
                           picked,
                           onChangeDay,
                           selectedDay,
}) {
    return (
        <>
            <TeamBlock>
                <TeamThisWeek thisTeam={thisTeam} selectedMenu={selectedMenu} selectedDay={selectedDay} days={days}/>
                <TeamNextWeek nextTeam={nextTeam}/>
            </TeamBlock>
            <SelectionBlock>
                <SelectMenu like={like} onLike={onLike} input={input} onChangeInput={onChangeInput} onClick={onClick} menus={menus} suggested={suggested} liked={liked}/>
                <SelectDay days={days} onToggle={onToggle} onSubmit={onSubmit} picked={picked} onChangeDay={onChangeDay}/>
            </SelectionBlock>
        </>
    );
}

export default SelectionForm;