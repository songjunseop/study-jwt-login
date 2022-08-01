import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initializeForm, login } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { check } from "../../modules/user";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const LoginForm = ({ history }) => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { form, auth, authError } = useSelector(({ auth }) => ({
        form: auth.login,
        auth: auth.auth,
        authError: auth.authError,
        user: auth.user,
    }));

    const onChange = (e) => {
        const { value, name } = e.target;
        dispatch(
            changeField({
                form: 'login',
                key: name,
                value,
            }),
        );
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { identifier, password } = form;
        dispatch(login({ identifier, password }));
    };

    useEffect(() => {
        dispatch(initializeForm('login'));
    }, [dispatch]);

    useEffect(() => {
        if(authError) {
            console.log('오류발생')
            console.log(authError);
            setError('로그인 실패');
            return;
        }
        if (auth) {
            console.log('로그인 성공');
            localStorage.setItem('auth', JSON.stringify(auth));
            dispatch(check());
        }
    }, [auth, authError, dispatch]);

    useEffect(() => {
        if (auth) {
            navigate('/');
            try {
                localStorage.setItem('auth', JSON.stringify(auth));
                // localStorage.setItem('auth', JSON.stringify(auth.user.username))
            } catch (e) {
                console.log('localStorage is not working');
            }
        }
    }, [navigate, auth]);

    // useEffect(() => {
    //     axios.get('http://localhost:1337/users')
    //         .then(res => console.log(res.data))
    // }, [])

    return (
        <AuthForm
            type='login'
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
        />
    );
};

export default LoginForm;