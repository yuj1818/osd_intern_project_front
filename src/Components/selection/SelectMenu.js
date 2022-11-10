import React from 'react';
import Box from "../common/Box";
import Title from "../common/Title";
import Button from "../common/Button";
import likeOut from "../img/like_outline.png";
import likeFill from "../img/like_filled.png";
import styled from 'styled-components';

//style={{border:"0.15vmin solid black", margin:"1vh 0.5vw", fontSize:"1.5vmin", height:"4vh",width:"20vw"}}
const StyledInput = styled.input`
  border: 0.15vmin solid black;
  margin: 1vh 0.5vw;
  font-size: 1.5vmin;
  height: 4vh;
  width: 20vw;
  &:hover {
    &:disabled{
      cursor: not-allowed;
    }
  }
  &:disabled{
    border: 0.15vmin solid lightgray;
    background: #D9D9D9;
  }
`

function SelectMenu({like, onLike, input, onChangeInput, onClick, menus, suggested}) {

    return (
        <Box style={{flexDirection:"column", justifyContent:"start", height:"55vh"}}>
            <Title style={{width:"100%", display:"flex", justifyContent:"flex-start", margin:"3vh 0 6vh 5vw"}}>
                메뉴 선정
            </Title>

            <div style={{display:"flex", alignItems:"center", justifyContent:"center", width:"100%", height:"7vh"}}>
                <StyledInput id="suggest_menu" placeholder={suggested? '' : '메뉴는 1개만 제안 가능'} disabled={suggested} onChange={onChangeInput} value={input} type="text" />
                <div style={{height:"100%", width:"5vw", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <Button gray disabled={suggested} style={{height:"4vh", width:"4vw", margin:"0 0.3vw", padding:"0"}} onClick={onClick}>추가</Button>
                </div>
            </div>
            {menus &&
                menus.map((menu, idx) => {
                    return (
                        <div key={idx} style={{display:"flex", alignItems:"center", justifyContent:"center", width:"100%", height:"7vh"}}>
                            <Box style={{height:"4vh", width:"20vw", margin:"1vh 0.5vw", padding:"1px 2px", fontSize:"1.5vmin"}}>
                                {menu.f_name}
                            </Box>
                            <div style={{height:"100%", width:"5vw", display:"flex", alignItems:"center", justifyContent:"center"}}>
                                <img id={menu.f_name} className="like" src={like === menu.f_name? likeFill : likeOut} onClick={onLike} style={{height:"4vh", cursor:"pointer"}}/>
                            </div>
                        </div>
                    )
                })
            }
        </Box>
    );
}

export default SelectMenu;