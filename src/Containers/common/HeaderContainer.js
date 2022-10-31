import React, {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/common/Header";
import { logout } from "../../modules/user";

function HeaderContainer(props) {

    const [visible, setVisible] = useState(false);

    const { user } = useSelector(({user}) => ({ user: user.user }));

    const dispatch = useDispatch();

    const onToggle = () => {
        setVisible(!visible);
    };

    const onLogout = () => {
        dispatch(logout());
    }

    return (
        <Header user={user} onLogout={onLogout} onToggle={onToggle} visible={visible}/>
    );
}

export default HeaderContainer;