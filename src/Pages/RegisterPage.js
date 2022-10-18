import React from 'react';
import RegisterContainer from "../Containers/auth/RegisterContainer";
import AuthTemplate from "../Components/auth/AuthTemplate";

function RegisterPage(props) {
    return (
        <AuthTemplate>
            <RegisterContainer />
        </AuthTemplate>
    );
}

export default RegisterPage;