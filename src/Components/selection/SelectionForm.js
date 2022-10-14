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

function SelectionForm({like, onLike, suggestionMenu, updateMenu, onChange, onClick}) {
    return (
        <>
            <TeamBlock>
                <TeamThisWeek />
                <TeamNextWeek />
            </TeamBlock>
            <SelectionBlock>
                <SelectMenu like={like} onLike={onLike} suggestionMenu={suggestionMenu} updateMenu={updateMenu} onChange={onChange} onClick={onClick}/>
                <SelectDay />
            </SelectionBlock>
        </>
    );
}

export default SelectionForm;