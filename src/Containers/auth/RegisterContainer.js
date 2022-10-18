import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm } from "../../modules/auth";
import AuthForm from "../../Components/auth/AuthForm";
import { useNavigate } from "react-router-dom";

function RegisterContainer(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { form } = useSelector(({ auth }) => ({
        form: auth.register,
    }));

    const onChange = e => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'register',
                key: name,
                value
            })
        );
    };

    const onSubmit = e => {
        e.preventDefault();
        const { userId, password, passwordConfirm } = form;
        if (localStorage.getItem(userId)) {
            return alert('이미 존재하는 아이디 입니다.')
        }
        if (password !== passwordConfirm) {
            return alert('비밀번호가 일치하지 않습니다.');
        }
        localStorage.setItem(userId, password)
        navigate('/login')
        console.log('회원가입 성공')
    };

    useEffect(() => {
        dispatch(initializeForm('register'))
    }, [dispatch]);

    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
        />
    );
}

export default RegisterContainer;