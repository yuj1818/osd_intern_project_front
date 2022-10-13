import React from 'react';
import Box from "../common/Box";
import Title from "../common/Title";
import Button from "../common/Button";

function DashBob(props) {
    return (
        <div style={{display:"block"}}>
            <Title>
                밥친구
            </Title>
            <Box style={{flexDirection:"column"}}>
                <Title>
                    이번 주 밥친구
                </Title>
                <Box style={{width:"21.8125rem", height:"4rem", flexDirection:"column", marginBottom:"2rem"}}>
                    <div style={{marginRight:"35%"}}>mm/dd d요일 - 지곡 회관</div>
                    <div>ㅇㅇㅇ,ㅇㅇㅇ,ㅇㅇㅇ,ㅇㅇㅇ</div>
                </Box>
                <Title>
                    다음 주 밥친구
                </Title>
                <Box style={{width:"21.8125rem", height:"2.375rem", marginBottom:"4rem"}}>
                    ㅇㅇㅇ,ㅇㅇㅇ,ㅇㅇㅇ,ㅇㅇㅇ
                </Box>
                <Button to="/selection" style={{width:"13.25rem", height:"3.625rem"}}>
                    시간/메뉴 정하기
                </Button>
            </Box>
        </div>
    );
}

export default DashBob;