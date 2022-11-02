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
  .good {
    margin-left: 1.75rem;
  }
`;

const StyledButton = styled.button`
  background: #c02424;
  color: white;
  margin: 3px;
  :hover {
    filter: brightness(85%);
  }
`;

const ErrorMessage = styled.span`
  margin-left: 10px;
  font-size: 12px;
  color: red;
`
const AddNewEvent = ({
                         visible,       // 해당 이벤트가 보일지 말지 정하는 param /
                         onCancel,      // 취소 버튼을 누를 때 발생할 이벤트
                         onConfirm,
                         onChangeInput,
                         changeE_category,
                         newEventData,
                         noDataCheck,
                         changeE_title,
                         changeE_startDate,
                         changeE_endDate,
                         onUpdateEvent,
                         onDelete,
                     }) =>

{
    if (visible ==='NoPopUp') return null;
    return (
        <Fullscreen>
            <AddNewEventBlock>
                <h1>{ visible === 'createEvent' ? '일정추가' : '일정변경'}</h1>

                <label htmlFor="EventTitle">제목 <span style={{fontSize:"15px"}}>(휴가와 생일은 이름을 입력해주세요.)</span></label>
                <span>
                    <input id="EventTitle"
                           name="eventTitle"
                           placeholder="제목을 입력하세요."
                           value={newEventData.title}
                           onChange={changeE_title}
                    >
                    </input>
                    <ErrorMessage>{newEventData.title===''?'제목을 작성해주세요.':''} </ErrorMessage>
                </span>

                <label htmlFor="name">작성자</label>
                <span>
                    <input id="name" name="writer" placeholder="이름을 입력하세요." value={newEventData.writer} onChange={onChangeInput}></input>
                </span>
                <label htmlFor="EventCategory">일정분류</label>
                <span>
                     { visible === 'changeEvent'? newEventData.category === ''?
                             <>{visible}{newEventData.category}</>
                             :
                             <select
                                 defaultValue={newEventData.category}
                                 onChange={changeE_category}
                                 id="EventCategory"
                             >
                                 <option value="default" disabled style={{ color: "#ccc" }}>선택</option>
                                 <option value="birthday" >생일</option>
                                 <option value="Event">OSD 행사</option>
                                 <option value="others">기타(워크샾 등)</option>
                             </select>
                         :
                         <select
                             defaultValue="default"
                             onChange={changeE_category}
                             id="EventCategory"
                         >
                             <option value="default" disabled style={{ color: "#ccc" }}>선택</option>
                             <option value="birthday" >생일</option>
                             <option value="Event">OSD 행사</option>
                             <option value="others">기타(워크샾 등)</option>
                         </select>
                     }
                    <ErrorMessage>{newEventData.category===''?'일정분류를 선택해주세요.':''} </ErrorMessage>
                </span>
                <span style={{marginTop : "10px"}}>
                    <label htmlFor="startDate" style={{marginRight:"123px"}}>{newEventData.category ==="birthday"? "생년월일" : "시작일자"}</label>
                    <label htmlFor="endDate">{newEventData.category==="birthday"? "　" : "종료일자"}</label>
                </span>
                <span style={{marginTop:"5px" }}>
                    <input type="date" disabled={newEventData.category? false:true} id="startDate" name="startDate" value={newEventData.startDate} onChange={changeE_startDate}></input>
                    { newEventData.category ==="birthday"?
                        <></>
                        :
                        <input type="date" disabled={newEventData.category? false:true} id="endDate" name="endDate" value={newEventData.endDate} onChange={changeE_endDate}></input>
                    }
                </span>

                <div className="buttons" style={{justifyContent: "center"}}>
                    <button onClick={onCancel}>취소</button>
                    {visible==='changeEvent' ?
                        <button className={noDataCheck? 'NotConfirm':'good'} onClick={onUpdateEvent}>변경</button>
                        :
                        <button style={{marginLeft : "1.75rem"}} className={noDataCheck? 'NotConfirm':'good'} onClick={onConfirm}>확인</button>
                    }

                </div>
                {visible==='changeEvent' ?
                    <StyledButton onClick={onDelete}>삭제</StyledButton>
                    :
                    ""
                }
            </AddNewEventBlock>
        </Fullscreen>
    );
};

export default AddNewEvent;