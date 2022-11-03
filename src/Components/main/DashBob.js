import React from 'react';
import Box from "../common/Box";
import Title from "../common/Title";
import Button from "../common/Button";

function DashBob({nextTeam,thisTeam}) {
    return (
        <div style={{display:"block"}}>
            <Box style={{flexDirection:"column"}}>
                <Title>
                    이번 주 밥친구
                </Title>
                <Box style={{width:"27vw", height:"7vh", flexDirection:"column", marginBottom:"6vh", marginRight:"0", marginLeft:"0" }}>
                    <div style={{width:"100%", display:"flex", justifyContent:"flex-start", paddingLeft:"4vmin", marginBottom:"0.5vmin"}}>mm/dd d요일 - 도시락</div>
                    <div style={{display:"flex"}}>
                        {thisTeam && thisTeam.map((member, idx) => {
                            return (
                                <div key={idx} style={{margin: "0 0.3vw"}}>{member.m_name}</div>
                            )
                        })}
                    </div>
                </Box>
                <Title>
                    다음 주 밥친구
                </Title>
                <Box style={{width:"27vw", height:"4vh", marginBottom:"8vh", marginRight:"0", marginLeft:"0"}}>
                    {nextTeam && nextTeam.map((member, idx) => {
                        return (
                            <div key={idx} style={{margin: "0 0.3vw"}}>{member.m_name}</div>
                        )
                    })}
                </Box>
                <Button gray to="/selection" style={{width:"16vw", height:"4vh"}}>
                    시간/메뉴 정하기
                </Button>
            </Box>
        </div>
    );
}

export default DashBob;