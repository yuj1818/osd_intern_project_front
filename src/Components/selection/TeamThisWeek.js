import React from 'react';
import Title from "../common/Title";
import Box from "../common/Box";

function TeamThisWeek({thisTeam, selectedMenu, selectedDay}) {
    return (
        <Box style={{ height:"15vh", width:"35vw", flexDirection:"column"}}>
            <Title style={{width:"100%", display:"flex", justifyContent:"flex-start", margin:"1vh 0 1vh 5vw"}}>
                이번 주 밥친구
            </Title>
            <Box style={{ flexDirection:"column" ,height:"5vh", width:"30vw", margin:"0", marginBottom:"2vh", padding:"1vmin"}}>
                {thisTeam.length > 0 &&
                    <div style={{marginBottom:"0.5vh" , fontSize: "1.2vh"}}>
                        {selectedDay} - {selectedMenu.length !== 0 && selectedMenu[0].f_name}
                    </div>
                }
                <div style={{display:"flex"}}>
                    {thisTeam && thisTeam.map((member, idx) => {
                        return (
                            <div key={idx} style={{margin: "0 0.3vw"}}>{member.m_name}</div>
                        )
                    })}
                </div>
                {thisTeam.length === 0 &&
                    <div style={{color:"gray"}}>아직 팀이 만들어지지 않았습니다.</div>
                }
            </Box>
        </Box>
    );
}

export default TeamThisWeek;