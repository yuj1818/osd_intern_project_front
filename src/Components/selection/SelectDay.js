import React from 'react';
import Box from "../common/Box";
import Title from "../common/Title";

function SelectDay(props) {

    const days = [
        "월","화","수","목","금"
    ];

    return (
        <Box style={{flexDirection:"column"}}>
            <Title>
                시간 정하기
            </Title>
            <Title>
                못 가는 날 고르기
            </Title>
            {days.map((day, idx) => {
                return (
                    <div style={{display:"flex"}}>
                        <Box key={idx} style={{height:"4vh", margin:"1vh 0.5vw"}}>
                            {day}
                        </Box>
                        <input type="checkbox" />
                    </div>
                )
            })}
        </Box>
    );
}

export default SelectDay;