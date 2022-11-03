import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function (SpecificComponent, option = null) {
    function AuthenticationCheck(props) {
        const navigate = useNavigate();
        let user = useSelector(state => state.user);

        useEffect(() => {
            if(localStorage.getItem('user')) {
                if(option === false) {
                    navigate('/')
                }
            } else {
                if(option) {
                    navigate('/login')
                }
            }
        }, []);

        return (
            <SpecificComponent {...props} user={user} />
        )
    }

    return AuthenticationCheck
}