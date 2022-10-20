import React from 'react';
import BackgroundForm from "../../Components/common/BackgroundForm";
import Main from "../../Components/main/Main";
import { useNavigate } from "react-router-dom";
import Holiday from "../../Components/Calendar/Holiday";

function MainContainer(props) {

    const navigate = useNavigate();

    const onClick = () => {
        navigate('/calendar');
    };

    return (
        <div>
            <BackgroundForm />
            {localStorage.getItem('onLoginUser') &&
                <div>
                    <Main onClick={onClick}/>
                    <Holiday />
                </div>
            }
        </div>
    );
}

export default MainContainer;