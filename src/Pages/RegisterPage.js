import React from 'react';
import RegisterContainer from "../Containers/auth/RegisterContainer";
import AuthTemplate from "../Components/auth/AuthTemplate";
import {useNavigate} from "react-router-dom";

function RegisterPage(props) {

    const navigate = useNavigate();

    const ToMain = () => {
        navigate('/login');
    }

    return (
        <AuthTemplate ToMain={ToMain}>
            <RegisterContainer />
        </AuthTemplate>
    );
}

export default RegisterPage;