import React from 'react';
import LoginContainer from "../Containers/auth/LoginContainer";
import {useNavigate} from "react-router-dom";
import AuthTemplate from "../Components/auth/AuthTemplate";

function LoginPage(props) {
    const navigate = useNavigate();

    const ToMain = () => {
        navigate('/');
    }
    return (
        <AuthTemplate ToMain={ToMain}>
            <LoginContainer />
        </AuthTemplate>
    );
}

export default LoginPage;