import React from 'react';
import Box from "../common/Box";
import Title from "../common/Title";
import Button from "../common/Button";
import likeOut from "../img/like_outline.png";
import likeFill from "../img/like_filled.png";

function SelectMenu({like, onLike,suggestionMenu ,updateMenu, onChange, onClick}) {

    return (
        <Box style={{flexDirection:"column", justifyContent:"start"}}>
            <Title style={{width:"100%", display:"flex", justifyContent:"flex-start", margin:"3vh 0 8vh 5vw"}}>
                메뉴 선정
            </Title>
            <div style={{display:"flex", alignItems:"center", justifyContent:"center", width:"100%", height:"7vh"}}>
                <input id="suggest_menu" onChange={onChange} value={suggestionMenu} type="text" style={{border:"0.15vmin solid black", margin:"1vh 0.5vw", fontSize:"1.5vmin", height:"4vh",width:"20vw"}} />
                <div style={{height:"100%", width:"5vw", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <Button gray style={{height:"4vh", margin:"0 0.3vw"}} onClick={onClick}>추가</Button>
                </div>
            </div>
            {updateMenu &&
                <div style={{display:"flex", alignItems:"center", justifyContent:"center", width:"100%", height:"7vh"}}>
                    <Box style={{height:"4vh", width:"20vw", margin:"1vh 0.5vw", padding:"1px 2px", fontSize:"1.5vmin"}}>
                        {updateMenu}
                    </Box>
                    <div style={{height:"100%", width:"5vw", display:"flex", alignItems:"center", justifyContent:"center"}}>
                        <img className="like" src={like? likeFill : likeOut} onClick={onLike} style={{height:"4vh"}}/>
                    </div>
                </div>
            }
        </Box>
    );
}

export default SelectMenu;