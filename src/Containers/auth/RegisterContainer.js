import React from 'react';
import AuthForm from "../../Components/auth/AuthForm";
import AuthTemplate from "../../Components/auth/AuthTemplate";
import {useNavigate} from "react-router-dom";

function RegisterContainer(props) {

    const navigate = useNavigate();

    const ToMain = () => {
        navigate('/login');
    }

    return (
        <AuthTemplate ToMain={ToMain}>
            <AuthForm type="register" />
        </AuthTemplate>
    );
}

export default RegisterContainer;