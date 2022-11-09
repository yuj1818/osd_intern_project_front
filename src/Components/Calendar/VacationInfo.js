import React from 'react';
import styled from "styled-components";

const Fullscreen = styled.div`
  position : fixed;
  z-index : 30;
  top : 0;
  left : 0;
  width : 100%;
  height : 100%;
  background : rgba(0, 0, 0, 0.25);
  display : flex;
  justify-content : center;
  align-items : center;
`;
const VacationInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  background : white;
  align-items: center;
  width: 300px;
  border-radius: 15px;
  text-align: center;
`
const VacationItemBlock = styled.div`
  width: 95%;
  padding: 2px;
  margin: 0px 5px 10px 5px;
  border-radius: 10px;
  background: #091579;
`
const VacationItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 3px;
  border-radius : 15px;

  :nth-child(odd) {
    background: #afdafd;
  }

  :nth-child(even) {
    background: #ebf5ff;
  }
`

function VacationInfo({
                          visible,
                          VacationOutClick,
                          newVacationList,
                          PickedId
}) {
    const matchCategory = (pair) => {
        if (pair ==='PMVACATION'){ return '오후반차'}
        else if (pair ==='AMVACATION'){ return '오후반차'}
        else if (pair ==='ANNUAL'){ return '연차'}
        else if (pair ==='TRAINING'){ return '훈련'}
    }

    if (!visible) {return <></>}
    else {
        return (
            <Fullscreen onClick={VacationOutClick}>
                <VacationInfoBlock>
                    <h2>{PickedId} 휴가명단</h2>
                    <VacationItemBlock>
                    {newVacationList.filter(e => e.date === PickedId).map((data,idx) => {
                        return (
                            <VacationItem key={idx}>
                                <span>{data.title} </span>
                                <span>{matchCategory(data.category)}</span>
                            </VacationItem>)
                    } )}
                    </VacationItemBlock>
                </VacationInfoBlock>
            </Fullscreen>
        )};
    };

export default VacationInfo;