import React, {useState} from 'react';
import Header from "../../Components/common/Header";
import { useNavigate } from "react-router-dom";

function HeaderContainer(props) {

    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();

    const onToggle = () => {
        setVisible(!visible);
    };

    const onLogin = () => {
        navigate('/login');
    };

    const onRegister = () => {
        navigate('/register');
    };

    return (
        <Header onLogin={onLogin} onRegister={onRegister} onToggle={onToggle} visible={visible}/>
    );
}

export default HeaderContainer;