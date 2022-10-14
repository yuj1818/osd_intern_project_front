import React from 'react';
import Box from "../common/Box";
import Title from "../common/Title";
import Button from "../common/Button";

function SelectDay(props) {

    const days = [
        "월","화","수","목","금"
    ];

    return (
        <Box style={{flexDirection:"column", justifyContent:"start"}}>
            <Title style={{width:"100%", display:"flex", justifyContent:"flex-start", margin:"3vh 0 5vh 5vw"}}>
                시간 정하기
            </Title>
            <Title style={{width:"100%", display:"flex", justifyContent:"flex-start", fontSize:"1.4vmin", marginLeft:"5vw"}}>
                못 가는 날 고르기
            </Title>
            {days.map((day, idx) => {
                return (
                    <div key={idx} style={{display:"flex"}}>
                        <Box style={{height:"4vh", width:"25vw", margin:"1vh 0.5vw", padding:"1px 2px"}}>
                            {day}
                        </Box>
                        <input type="checkbox" />
                    </div>
                )
            })}
            <Button gray style={{width:"16vw", height:"4vh", marginTop:"4vmin"}}>결정</Button>
        </Box>
    );
}

export default SelectDay;