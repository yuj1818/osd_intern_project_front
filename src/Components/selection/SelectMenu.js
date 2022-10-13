import React from 'react';
import Box from "../common/Box";
import Title from "../common/Title";
import Button from "../common/Button";

function SelectMenu(props) {
    return (
        <Box style={{flexDirection:"column"}}>
            <Title style={{width:"100%", display:"flex", justifyContent:"flex-start", marginLeft:"4vw", marginBottom:"2vh"}}>
                메뉴 선정
            </Title>
            <div style={{display:"flex", flexDirection:"row"}}>
                <input type="text" style={{margin:"2vh 1vw", width:"25vmin"}} />
                <Button style={{border:"solid black"}}>추가</Button>
            </div>
        </Box>
    );
}

export default SelectMenu;