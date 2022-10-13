import React from 'react';
import AuthTemplate from "../Components/auth/AuthTemplate";
import AuthForm from "../Components/auth/AuthForm";

function RegisterPage(props) {
    return (
        <AuthTemplate>
            <AuthForm type="register" />
        </AuthTemplate>
    );
}

export default RegisterPage;