import React, {useState} from 'react';
import Header from "../../Components/common/Header";

function HeaderContainer(props) {

    const [visible, setVisible] = useState(false);

    const onToggle = () => {
        setVisible(!visible);
    };

    return (
        <Header onToggle={onToggle} visible={visible}/>
    );
}

export default HeaderContainer;