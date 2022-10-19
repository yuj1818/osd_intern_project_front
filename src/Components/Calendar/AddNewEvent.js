import styled from "styled-components";

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
  box-shadow : 0 0 8px rgba(0, 0, 0, 0.125);
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
    margin-left : 10px;
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
  .NoPick {
    pointer-events: none;
  }
  .NotConfirm {
    margin-left : 1.75rem;
    cursor : not-allowed;
  }
`;

const StyledButton = styled.button`
  height : 2rem;

  & + & {
    margin-left : 1.75rem;
  }
`;

const AddNewEvent = ({
                         visible,       // 해당 이벤트가 보일지 말지 정하는 param / con (bool)
                         onConfirm,     // 확인 버튼을 누를 때 발생할 이벤트
                         onCancel,      // 취소 버튼을 누를 때 발생할 이벤트
                         NoCategory,    // 일정 분류 선택 여부 확인하는 값
                         SelectItem,     // 일정 분류에서 값 변경을 감지하는 함수
                         pickItem,      // 일정 분류에서 선택된 값
                     }) =>

{
    if (!visible) return null;

    return (
        <Fullscreen>
            <AddNewEventBlock>
                <h1>일정추가</h1>
                <label htmlFor="EventTitle">제목 <span style={{fontSize:"15px"}}>(휴가와 생일은 이름을 입력해주세요.)</span></label>
                <input id="EventTitle" placeholder="제목을 입력하세요."></input>
                <label htmlFor="name">작성자</label>
                <input id="name" placeholder="이름을 입력하세요."></input>
                <label htmlFor="EventCategory">일정분류</label>
                <select
                    defaultValue="default"
                    onChange={SelectItem}
                    id="EventCategory"
                >
                    <option value="default" disabled style={{ color: "#ccc" }}>선택</option>
                    <option value="birthday" >생일</option>
                    <option value="Event">OSD 행사</option>
                    <option value="others">출장</option>
                    <option value="others">기타(워크샾 등)</option>
                </select>
                <span style={{marginTop : "10px"}}>
                    <label htmlFor="startDate" style={{marginRight:"123px"}}>{pickItem==="birthday"? "생년월일" : "시작일자"}</label>
                    <label htmlFor="endDate">{pickItem==="birthday"? "　" : "종료일자"}</label>
                </span>
                {
                    NoCategory ?
                        <div style={{marginTop :"4px"}}>
                            <span>
                                <input type="date" disabled={NoCategory} id="startDate" style={{marginTop:"5px" }}></input>
                                <input type="date" disabled={NoCategory} id="endDate"></input>
                            </span>
                            <div className="buttons" style={{justifyContent: "center"}}>
                                <StyledButton onClick={onCancel}>취소</StyledButton>
                                <div className="NotConfirm">
                                    <StyledButton className="NoPick">저장</StyledButton>
                                </div>
                            </div>
                        </div>
                        :
                        pickItem==="birthday"?
                            <div style={{marginTop :"7px"}}>
                                <input type="date" disabled={NoCategory} id="startDate"></input>
                                <div className="buttons" style={{justifyContent: "center"}}>
                                    <StyledButton onClick={onCancel}>취소</StyledButton>
                                    <StyledButton onClick={onConfirm}>저장</StyledButton>
                                </div>
                            </div>
                            :
                            <div style={{marginTop :"4px"}}>
                                <span >
                                    <input type="date" disabled={NoCategory} id="startDate" style={{marginTop:"5px" }}></input>
                                    <input type="date" disabled={NoCategory} id="endDate"></input>
                                </span>
                                <div className="buttons" style={{justifyContent: "center"}}>
                                    <StyledButton onClick={onCancel}>취소</StyledButton>
                                    <StyledButton onClick={onConfirm}>저장</StyledButton>
                                </div>
                            </div>
                }

            </AddNewEventBlock>
        </Fullscreen>
    );
};

export default AddNewEvent;