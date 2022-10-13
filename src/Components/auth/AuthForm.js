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

function AuthForm({type}) {
    const text = textMap[type];
    return (
        <AuthFormBlock>
            <div className="title">{text}</div>
            <form>
                <div style={{display:"flex", marginTop:"1.2rem", justifyContent:"right"}}>
                    <Title style={{width:"7rem", fontSize:"1rem", fontWeight:"bold", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"0", marginRight:"0.5rem"}}>ID</Title>
                    <StyledInput autoComplete="username" name="username" placeholder="아이디를 입력해주세요" />
                </div>
                <div style={{display:"flex", marginTop:"1.2rem", justifyContent:"right"}}>
                    <Title style={{width:"7rem", fontSize:"1rem", fontWeight:"bold", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"0", marginRight:"0.5rem"}}>PW</Title>
                    <StyledInput
                        autoComplete="new-password"
                        name="password"
                        placeholder="비밀번호를 입력해주세요"
                        type="password"
                    />
                </div>
                {type === 'register' && (
                    <div style={{display:"flex", marginTop:"1.2rem", justifyContent:"right"}}>
                        <Title style={{width:"7rem", fontSize:"1rem", fontWeight:"bold", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"0", marginRight:"0.5rem"}}>PW 재확인</Title>
                        <StyledInput
                            autoComplete="new-password"
                            name="password"
                            placeholder="비밀번호 확인"
                            type="password"
                        />
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