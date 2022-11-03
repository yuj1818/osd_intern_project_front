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

function SelectionForm({like, input, text, onInsert, onChangeInput, onLike, days, onToggle, nextTeam, thisTeam}) {
    return (
        <>
            <TeamBlock>
                <TeamThisWeek thisTeam={thisTeam}/>
                <TeamNextWeek nextTeam={nextTeam}/>
            </TeamBlock>
            <SelectionBlock>
                <SelectMenu like={like} onLike={onLike} input={input} text={text} onInsert={onInsert} onChangeInput={onChangeInput} />
                <SelectDay days={days} onToggle={onToggle}/>
            </SelectionBlock>
        </>
    );
}

export default SelectionForm;