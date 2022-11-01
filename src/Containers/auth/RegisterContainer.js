import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { changeField, initializeForm, register } from "../../modules/auth";
import AuthForm from "../../Components/auth/AuthForm";
import { useNavigate } from "react-router-dom";

function RegisterContainer(props) {

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { form, auth, authError } = useSelector(({ auth }) => ({
        form: auth.register,
        auth: auth.auth,
        authError: auth.authError,
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
        const { m_id, m_name, m_dept, m_password, passwordConfirm } = form;
        if ([m_id, m_name, m_dept, m_password, passwordConfirm].includes('')){
            setError('빈 칸을 모두 입력하세요');
            return;
        }
        if (m_password !== passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다');
            dispatch(changeField({ form: 'register', key: 'm_password', value: ''}));
            dispatch(
                changeField({ form: 'register', key: 'passwordConfirm', value:''}),
            );
            return;
        }
        dispatch(register({ m_id, m_password, m_name, m_dept }));
    };

    useEffect(() => {
        dispatch(initializeForm('register'))
    }, [dispatch]);

    useEffect(() => {
        if (authError) {
            console.log(authError)
            if (authError.response.status === 409) {
                setError(authError.response.data);
                return;
            }
            setError('회원가입 실패');
            return;
        }

        if (auth) {
            console.log('회원가입 성공');
            console.log(auth);
            navigate('/login')
        }
    }, [auth, authError, dispatch]);

    return (
        <AuthForm
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
}

export default RegisterContainer;