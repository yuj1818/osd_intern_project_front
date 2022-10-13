import React from 'react';
import {useNavigate} from "react-router-dom";
import AuthForm from "../../Components/auth/AuthForm";
import AuthTemplate from "../../Components/auth/AuthTemplate";

function LoginContainer(props) {

    const navigate = useNavigate();

    const ToMain = () => {
        navigate(-1);
    }

    return (
        <AuthTemplate ToMain={ToMain} >
            <AuthForm type="login"/>
        </AuthTemplate>
    );
}

export default LoginContainer;