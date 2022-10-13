import React from 'react';
import Title from "../common/Title";
import Box from "../common/Box";

function TeamThisWeek(props) {
    return (
        <Box style={{ display:"flex", height:"10vh", width:"35vw", flexDirection:"column"}}>
            <Title style={{width:"100%", display:"flex", justifyContent:"flex-start", padding:"1vh 0", paddingLeft:"5vw"}}>
                이번 주 밥친구
            </Title>
            <Box style={{ height:"5vh", width:"30vw", margin:"0", marginBottom:"2vh"}}>
                ㅇㅇㅇ,ㅇㅇㅇ,ㅇㅇㅇ,ㅇㅇㅇ mm/dd ㅇ요일
            </Box>
        </Box>
    );
}

export default TeamThisWeek;