import React from 'react';
import BackgroundForm from "../../Components/common/BackgroundForm";
import Main from "../../Components/main/Main";
import { useNavigate } from "react-router-dom";

function MainContainer(props) {

    const navigate = useNavigate();

    const onClick = () => {
        navigate('/calendar');
    };

    return (
        <div>
            <BackgroundForm />
            <Main onClick={onClick}/>
        </div>
    );
}

export default MainContainer;