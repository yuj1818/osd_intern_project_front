import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm } from "../../modules/auth";
import AuthForm from "../../Components/auth/AuthForm";
import { useNavigate } from "react-router-dom";

function LoginContainer(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { form } = useSelector(({ auth }) => ({
        form: auth.login
    }));

    const onChange = e => {
        const {value, name} = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value
            })
        );
    };

    const onSubmit = e => {
        e.preventDefault();
        const { userId, password } = form;
        if (localStorage.getItem(userId) === null){
            return alert('존재하지 않는 아이디입니다.')
        }
        if (localStorage.getItem(userId) === password) {
            console.log('로그인 성공')
            localStorage.setItem('onLoginUser',userId)
            navigate('/')
        } else {
            return alert('비밀번호가 맞지 않습니다.')
        }
    };

    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    return (
        <AuthForm
            type="login"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
}

export default LoginContainer;