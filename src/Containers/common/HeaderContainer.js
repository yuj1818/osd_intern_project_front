import React, {useState} from 'react';
import Header from "../../Components/common/Header";

function HeaderContainer(props) {

    const [visible, setVisible] = useState(false);

    const onToggle = () => {
        setVisible(!visible);
    };

    const onLogout = () => {
        localStorage.removeItem('onLoginUser');
        window.location.reload();
    }

    return (
        <Header onLogout={onLogout} onToggle={onToggle} visible={visible}/>
    );
}

export default HeaderContainer;