import React from 'react';
import AuthTemplate from "../Components/auth/AuthTemplate";
import AuthForm from "../Components/auth/AuthForm";

function LoginPage(props) {
    return (
        <AuthTemplate>
            <AuthForm type="login"/>
        </AuthTemplate>
    );
}

export default LoginPage;