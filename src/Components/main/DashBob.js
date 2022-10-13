import React from 'react';
import Box from "../common/Box";
import Title from "../common/Title";
import Button from "../common/Button";

function DashBob(props) {
    return (
        <div style={{display:"block"}}>
            <Box style={{flexDirection:"column"}}>
                <Title>
                    이번 주 밥친구
                </Title>
                <Box style={{width:"27vw", height:"7vh", flexDirection:"column", marginBottom:"6vh", marginRight:"0", marginLeft:"0" }}>
                    <div style={{width:"100%", display:"flex", justifyContent:"flex-start", paddingLeft:"4vmin"}}>mm/dd d요일 - 지곡 회관</div>
                    <div>ㅇㅇㅇ,ㅇㅇㅇ,ㅇㅇㅇ,ㅇㅇㅇ</div>
                </Box>
                <Title>
                    다음 주 밥친구
                </Title>
                <Box style={{width:"27vw", height:"4vh", marginBottom:"8vh", marginRight:"0", marginLeft:"0"}}>
                    ㅇㅇㅇ,ㅇㅇㅇ,ㅇㅇㅇ,ㅇㅇㅇ
                </Box>
                <Button to="/selection" style={{width:"16vw", height:"4vh"}}>
                    시간/메뉴 정하기
                </Button>
            </Box>
        </div>
    );
}

export default DashBob;