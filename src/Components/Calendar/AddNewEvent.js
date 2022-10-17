import styled from "styled-components";
import {useState} from "react";

const Fullscreen = styled.div`
  position : fixed;
  z-index : 30;
  top : 0;
  left : 0;
  width : 100%;
  height : 100%;
  background : rgba(0, 0, 0, 0.25);
  display : flex;
  justify-content : center;
  align-items : center;
`;

const AddNewEventBlock = styled.div`
  display: flex;
  flex-direction: column;
  width : 460px;
  background : white;
  box-shadow : 0px 0px 8px rgba(0, 0, 0, 0.125);
  h1 {
    margin-top: 0;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 10px;
    background: #001448;
    color : white;
    font-size: 25px;
  }
  h2 {
    margin: 10px;
  }
  label {
    margin-top : 13px;
    margin-bottom: 5px;
    margin-left : 10px;
    font-size: 20px;
    font-weight: bold;
  }
  input {
    margin-left : 15px;
    width: 200px;
  }
  select {
    margin-left : 10px;
    width: 200px;
  }
  .DateCell {
    width: 70px;
  }
  p {
    margin-bottom : 3rem;
  }
  .description {
    font-size: 15px;
  }
  .buttons {
    display : flex;
    margin-top: 20px;
    margin-bottom: 15px;
  }
`;


const StyledButton = styled.button`
  height : 2rem;
  & + & {
    margin-left : 1.75rem;
  }
`;

const AddNewEvent = ( { visible, onConfirm, onCancel }) => {
    const [pickItem, setPickItem] = useState()

    if (!visible) return null;

    const selectItem = () => {
        let selectedItem = document.getElementById("EventCategory").value;
        setPickItem(selectedItem)
    }

    return (
        <Fullscreen>
            <AddNewEventBlock>
                <h1>일정추가</h1>
                <label htmlFor="title">제목 <span style={{fontSize:"15px"}}>(휴가와 생일은 이름을 입력해주세요.)</span></label>
                <input id="title" placeholder="제목을 입력하세요."></input>
                <label htmlFor="name">이름</label>
                <input id="name" placeholder="이름을 입력하세요."></input>
                <label htmlFor="EventCategory">일정 분류</label>
                <select onChange={selectItem} id="EventCategory">
                    <option value="" disabled hidden>선택</option>
                    <option value="Business">출장</option>
                    <option value="BirthDay" >생일</option>
                    <option value="OSD_Party">OSD행사</option>
                    <option value="others">기타(워크샾 등)</option>
                </select>
                {
                    pickItem === "BirthDay" ?
                        <div style={{marginTop :"11px"}}>
                            <label>생일</label>
                            <div>
                            <span>
                                 <select className="DateCell" id="birthMonth" >
                                    <option value="01">1</option>
                                    <option value="02">2</option>
                                    <option value="03">3</option>
                                    <option value="04">4</option>
                                    <option value="05">5</option>
                                    <option value="06">6</option>
                                    <option value="07">7</option>
                                    <option value="08">8</option>
                                    <option value="09">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                 </select>
                            </span> 월
                                <span>
                                 <select className="DateCell" id="birthDay">
                                      <option value="01">1</option>
                                      <option value="02">2</option>
                                      <option value="03">3</option>
                                      <option value="04">4</option>
                                      <option value="05">5</option>
                                      <option value="06">6</option>
                                      <option value="07">7</option>
                                      <option value="08">8</option>
                                      <option value="09">9</option>
                                      <option value="10">10</option>
                                      <option value="11">11</option>
                                      <option value="12">12</option>
                                      <option value="13">13</option>
                                      <option value="14">14</option>
                                      <option value="15">15</option>
                                      <option value="16">16</option>
                                      <option value="17">17</option>
                                      <option value="18">18</option>
                                      <option value="19">19</option>
                                      <option value="20">20</option>
                                      <option value="21">21</option>
                                      <option value="22">22</option>
                                      <option value="23">23</option>
                                      <option value="24">24</option>
                                      <option value="25">25</option>
                                      <option value="26">26</option>
                                      <option value="27">27</option>
                                      <option value="28">28</option>
                                      <option value="29">29</option>
                                      <option value="30">30</option>
                                      <option value="31">31</option>
                                 </select>
                            </span> 일
                            </div>
                        </div>
                        :
                        <span style={{marginTop :"10px"}}>
                        <label htmlFor="startDate" style={{marginRight:"120px"}}>시작 일자</label>
                        <label htmlFor="endDate">종료 일자</label>
                        <input type="date" id="startDate"></input>
                        <input type="date" id="endDate"></input>
                    </span>
                }


                <div className="buttons" style={{justifyContent:"center"}}>
                    <StyledButton onClick={onCancel}>취소</StyledButton>
                    <StyledButton onClick={onConfirm}>저장</StyledButton>
                </div>
            </AddNewEventBlock>
        </Fullscreen>
    );
};

export default AddNewEvent;