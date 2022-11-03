import React from 'react';
import Title from "../common/Title";
import Box from "../common/Box";

function TeamThisWeek({thisTeam}) {
    return (
        <Box style={{ display:"flex", height:"10vh", width:"35vw", flexDirection:"column"}}>
            <Title style={{width:"100%", display:"flex", justifyContent:"flex-start", margin:"1vh 0 1vh 5vw"}}>
                이번 주 밥친구
            </Title>
            <Box style={{ height:"5vh", width:"30vw", margin:"0", marginBottom:"2vh", padding:"1vmin"}}>
                {thisTeam.map((member, idx) => {
                    return (
                        <div key={idx} style={{margin: "0 0.3vw"}}>{member.m_name}</div>
                    )
                })}
                <div style={{marginLeft: "0.5vw"}}>
                    mm/dd ㅇ요일
                </div>
            </Box>
        </Box>
    );
}

export default TeamThisWeek;