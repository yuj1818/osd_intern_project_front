import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import Title from "../common/Title";

const AuthFormBlock = styled.div`
  .title {
    font-size: 1.2rem;
    text-align: center;
    margin: 0;
    color: black;
    margin-bottom: 1rem;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  padding: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    border: 1px solid black;
  }
`;

const styledOption = styled.option`
  font-size: 1rem;
  border: none;
  padding: 0.5rem;
  outline: none;
  width: 100%;
`

const Register = styled.div`
  font-size: 0.85rem;
  margin-top: 1.5rem;
  text-align: center;
  a {
    color: black;
    text-decoration: underline;
    &:hover{
      color: lightslategray;
    }
  }
`;

const textMap = {
    login: '로그인',
    register: '회원가입',
};

const deptOptions = [
    {value: 1, label: "원소프트다임"},
    {value: 2, label: "기획마케팅팀"},
    {value: 3, label: "연구개발팀"},
    {value: 4, label: "연구기획팀"},
]

function AuthForm({type, form, onChange, onSubmit, error}) {
    const text = textMap[type];
    return (
        <AuthFormBlock>
            <div className="title">{text}</div>
            <form onSubmit={onSubmit}>
                <div style={{display:"flex", marginTop:"1.2rem", justifyContent:"right"}}>
                    <Title style={{width:"7rem", fontSize:"1rem", fontWeight:"bold", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"0", marginRight:"0.5rem"}}>ID</Title>
                    <StyledInput
                        autoComplete="m_id"
                        name="m_id"
                        placeholder="아이디를 입력해주세요"
                        onChange={onChange}
                        value={form.m_id}
                    />
                </div>
                <div style={{display:"flex", marginTop:"1.2rem", justifyContent:"right"}}>
                    <Title style={{width:"7rem", fontSize:"1rem", fontWeight:"bold", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"0", marginRight:"0.5rem"}}>PW</Title>
                    <StyledInput
                        autoComplete="new-password"
                        name="m_password"
                        placeholder="비밀번호를 입력해주세요"
                        type="password"
                        onChange={onChange}
                        value={form.m_password}
                    />
                </div>
                {type === 'register' && (
                    <div style={{display:"flex", marginTop:"1.2rem", justifyContent:"right"}}>
                        <Title style={{width:"7rem", fontSize:"1rem", fontWeight:"bold", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"0", marginRight:"0.5rem"}}>PW 재확인</Title>
                        <StyledInput
                            autoComplete="new-password"
                            name="passwordConfirm"
                            placeholder="비밀번호 확인"
                            type="password"
                            onChange={onChange}
                            value={form.passwordConfirm}
                        />
                    </div>
                )}
                {type === 'register' && (
                    <div style={{display:"flex", marginTop:"1.2rem", justifyContent:"right"}}>
                        <Title style={{width:"7rem", fontSize:"1rem", fontWeight:"bold", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"0", marginRight:"0.5rem"}}>이름</Title>
                        <StyledInput
                            autoComplete="m_name"
                            name="m_name"
                            placeholder="이름을 입력해주세요"
                            onChange={onChange}
                            value={form.m_name}
                        />
                    </div>
                )}
                {type === 'register' && (
                    <div style={{display:"flex", marginTop:"1.2rem", justifyContent:"right"}}>
                        <Title style={{width:"7rem", fontSize:"1rem", fontWeight:"bold", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"0", marginRight:"0.5rem"}}>부서</Title>
                        <select onChange={onChange} name="m_dept" style={{width:"100%"}}>
                            {deptOptions.map((dept, index) => (
                                <option key={index} value={dept.value}>{dept.label}</option>
                            ))}
                        </select>
                    </div>
                )}

                <Button style={{marginTop: "1.2rem", width:"100%"}}>{text}</Button>
            </form>
            <Register>
                {type === 'login' ? (
                    <Link to="/register">회원가입</Link>
                ) : (
                    <Link to="/login">로그인</Link>
                )}
            </Register>
        </AuthFormBlock>
    );
}

export default AuthForm;