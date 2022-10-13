import React from 'react';
import TeamNextWeek from "./TeamNextWeek";
import TeamThisWeek from "./TeamThisWeek";
import styled from "styled-components";
import SelectMenu from "./SelectMenu";
import SelectDay from "./SelectDay";

const TeamBlock = styled.div`
  display: flex;
  justify-content: center;
  padding: 4vmin;
`

const SelectionBlock = styled.div`
  display: flex;
  justify-content: center;
  padding: 4vmin;
`

function SelectionForm(props) {
    return (
        <>
            <TeamBlock>
                <TeamThisWeek />
                <TeamNextWeek />
            </TeamBlock>
            <SelectionBlock>
                <SelectMenu />
                <SelectDay />
            </SelectionBlock>
        </>
    );
}

export default SelectionForm;