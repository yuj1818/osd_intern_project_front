import React from 'react';
import Box from "../common/Box";
import Title from "../common/Title";
import Button from "../common/Button";

function SelectDay({days, onToggle, onSubmit, picked, onChangeDay}) {

    return (
        <Box style={{flexDirection:"column", justifyContent:"start", height:"55vh"}}>
            <Title style={{width:"100%", display:"flex", justifyContent:"flex-start", margin:"3vh 0 3vh 5vw"}}>
                시간 정하기
            </Title>
            <Title style={{width:"100%", display:"flex", justifyContent:"flex-start", fontSize:"1.4vmin", marginLeft:"5vw"}}>
                갈 수 있는 날 고르기
            </Title>
            {days.map((day) => {
                return (
                    <div key={day.id} style={{display:"flex", height:"7vh"}}>
                        <Box style={{height:"4vh", width:"25vw", margin:"1vh 0.5vw", padding:"1px 2px"}}>
                            {day.text}
                        </Box>
                        <input id={day.id} type="checkbox" checked={day.checked} onChange={onToggle} style={{cursor:"pointer"}} />
                    </div>
                )
            })}
            {picked ?
                <Button gray onClick={onChangeDay} style={{width:"16vw", height:"4vh", marginTop:"2vmin"}}>수정</Button>:
                <Button gray onClick={onSubmit} style={{width:"16vw", height:"4vh", marginTop:"2vmin"}}>결정</Button>
            }
        </Box>
    );
}

export default SelectDay;