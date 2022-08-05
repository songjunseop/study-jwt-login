import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initializeForm, login } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";
import { check } from "../../modules/user";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const LoginForm = ({ }) => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { form, auth, authError } = useSelector(({ auth }) => ({
        form: auth.login,
        auth: auth.auth,
        jwt: auth.jwt,
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
            navigate('/');
            console.log('로그인 성공');
            localStorage.setItem('auth', JSON.stringify(auth));
            dispatch(check());
        }
    }, [auth, authError, dispatch, navigate]);

    // useEffect(() => {
    //     if (auth) {
    //         navigate('/');
    //         try {
    //             localStorage.setItem('auth', JSON.stringify(auth));
    //             // localStorage.setItem('auth', JSON.stringify(auth.user.username))
    //         } catch (e) {
    //             console.log('localStorage is not working');
    //         }
    //     }
    // }, [navigate, auth]);

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