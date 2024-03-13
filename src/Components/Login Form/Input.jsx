import React, { useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import httpClient from '../../httpClient';
import { useNavigate } from 'react-router-dom';
import './input.scss'
import invalid from '../../Assets/Images/Invalid File.svg'

const Input = ({ invalidEmailType, setInvalidEmailType, invalidRegisterCredentials, setInvalidRegisterCredentials, setErrorType, setInvalidCredentials, cleanUp, credentials, page, setPage, email, setEmail, password, setPassword, username, setUsername, confirmPassword, setConfirmPassword, loginkey, setLoginkey }) => {

    const navigate = useNavigate();

    const checkPassword = (password) => {
        setPassword(password);

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{8,}$/;
        setInvalidRegisterCredentials(prev => ({
            ...prev,
            invalidPassword: !passwordRegex.test(password)
        }))

    }

    const checkCredentials = async (type) => {

        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (type === 'email') {
            if (pattern.test(email)) {
                setInvalidEmailType(false);
                try {
                    const resp = await httpClient.get('/user/api/v4/emailExist', {
                        params: {
                            'email': email,
                        }
                    })
                    setInvalidRegisterCredentials(prev => ({
                        ...prev,
                        invalidEmail: resp?.data?.content
                    }));
                } catch (error) {
                    console.log(error);
                }
            } else {
                setInvalidEmailType(true);
            }
        } else {
            try {
                const resp = await httpClient.get('/user/api/v4/userExist', {
                    params: {
                        'username': username,
                    }
                })
                setInvalidRegisterCredentials(prev => ({
                    ...prev,
                    invalidUsername: resp?.data?.content
                }));
            } catch (error) {
                console.log(error);
            }
        }
    }

    const login = async (e) => {
        e.preventDefault();
        if (page === "login") {
            try {
                if (loginkey && password) {
                    await httpClient.post(`/user/api/v4/login`, {
                        loginkey, password
                    }, { "Content/Type": "application/json" }
                    ).then((res) => {
                        sessionStorage.setItem('refresh_token', res?.data?.content?.token?.refresh_token);
                        sessionStorage.setItem('token', res?.data?.content?.token?.token);
                        sessionStorage.setItem('username', res?.data?.content?.username);
                        navigate('/home')
                    }).catch((error) => {
                        setInvalidCredentials(true);
                        setErrorType(error?.response?.status);
                    });
                } else {
                    setInvalidCredentials(true)
                    setErrorType('empty');
                }
            } catch (error) {
                setInvalidCredentials(true);
                setErrorType('error');
            }

        } else {
            try {
                if (username && password && email && confirmPassword) {
                    if (!invalidRegisterCredentials.invalidEmail && !invalidRegisterCredentials.invalidUsername && !invalidRegisterCredentials.invalidPassword && !invalidRegisterCredentials.invalidConfirmPassword) {

                        await httpClient.post('/user/api/v4/signup', {
                            username, email, password
                        }, { "Content/Type": "application/json" }
                        ).then((res) => {
                            if (res.status === 200) {
                                cleanUp();
                                const registerRedirect = async () => {

                                    await httpClient.post('/user/api/v4/login', {
                                        'loginkey': username, password
                                    }, { "Content/Type": "application/json" }
                                    ).then((res) => {
                                        sessionStorage.setItem('refresh_token', res?.data?.content?.token?.refresh_token);
                                        sessionStorage.setItem('token', res?.data?.content?.token?.token);
                                        sessionStorage.setItem('username', res?.data?.content?.username);
                                        sessionStorage.setItem('role', res?.data?.content?.role);
                                        navigate('/home')
                                    }).catch((error) => {
                                        console.log(error);
                                    })
                                }
                                registerRedirect();
                            }
                        }).catch((error) => {
                            setInvalidCredentials(true);
                            setErrorType('error');
                        });

                    } else {
                        setInvalidCredentials(true);
                        setErrorType('invalid');
                    }

                } else {
                    setInvalidCredentials(true);
                    setErrorType('empty');
                }
            } catch (error) {
                setInvalidCredentials(true);
                setErrorType('error');
            }

        }
    };

    const [passwordVisibility, setPasswordVisibility] = useState(Array(credentials.length).fill(false));

    const togglePasswordVisibility = (index) => {
        const newVisibility = [...passwordVisibility];
        newVisibility[index] = !newVisibility[index];
        setPasswordVisibility(newVisibility);
    };

    return (
        <form>
            <div className='credentialsTab'>
                {credentials.map((item, index) => (
                    <div key={index}>
                        <p>{item.heading}</p>
                        <div className='inputTag'>
                            <input
                                style={{ border: ((item.name === 'email' && invalidRegisterCredentials.invalidEmail) || (item.name === 'username' && invalidRegisterCredentials.invalidUsername) || (page === 'register' && item.name === 'password' && invalidRegisterCredentials.invalidPassword) || (page === 'register' && item.name === 'email' && invalidEmailType)) && "1px solid red" }}
                                type={item.type === "password" && !passwordVisibility[index] ? "password" : "text"}
                                name={item.name}
                                autoComplete={(page === 'register') ? 'off' : 'on'}
                                id={item.name}
                                placeholder={item.placeholder}
                                value={item.name === "email" ? email : item.name === "password" ? password : item.name === "username" ? username : item.name === "loginkey" ? loginkey : confirmPassword}
                                onChange={(e) => {
                                    switch (item.name) {
                                        case "email":
                                            setEmail(e.target.value);
                                            break;
                                        case "username":
                                            setUsername(e.target.value);
                                            break;
                                        case "password":
                                            checkPassword(e.target.value);
                                            break;
                                        case "confirmPassword":
                                            setConfirmPassword(e.target.value);
                                            if (password === e.target.value) {
                                                setInvalidRegisterCredentials((prev) => ({
                                                    ...prev,
                                                    invalidConfirmPassword: false,
                                                }));
                                            }
                                            break;
                                        case "loginkey":
                                            setLoginkey(e.target.value);
                                            break;
                                        default:
                                            break;
                                    }
                                }}
                                onBlur={(e) => {
                                    switch (item.name) {
                                        case "email":
                                            checkCredentials(item.name);
                                            break;
                                        case "username":
                                            checkCredentials(item.name);
                                            break;
                                        case "confirmPassword":
                                            if (password !== confirmPassword) {
                                                setInvalidRegisterCredentials((prev) => ({
                                                    ...prev,
                                                    invalidConfirmPassword: true,
                                                }));
                                            }
                                            break;
                                        default:
                                            break;
                                    }
                                }}
                                onPaste={(e) => (item.name === 'password' || item.name === 'confirmPassword') && e.preventDefault()}
                            />
                            {item.type === "password" && (
                                <p onClick={() => togglePasswordVisibility(index)} className='eyeIcon'>
                                    {passwordVisibility[index] ? <FaRegEye /> : <FaRegEyeSlash />}
                                </p>
                            )}

                            {page === 'register' && ((item.name === 'email' && invalidRegisterCredentials.invalidEmail) || (item.name === 'username' && invalidRegisterCredentials.invalidUsername) || (item.name === 'password' && invalidRegisterCredentials.invalidPassword) || (item.name === 'confirmPassword' && invalidRegisterCredentials.invalidConfirmPassword)) &&
                                <div className='errorText'>
                                    <img src={invalid} alt="invalid" />
                                    <p className='errorDescription'>{item.name === 'email' ? 'This email already has an account associated with it.' : item.name === 'username' ? 'This user name already exists.' : item.name === 'password' ? 'Please enter a strong password.' : item.name === 'confirmPassword' && "Doesn't match with the password"}</p>
                                </div>
                            }

                            {page === 'register' && ((item.name === 'email' && invalidEmailType)) &&
                                <div className='errorText'>
                                    <img src={invalid} alt="invalid" />
                                    <p className='errorDescription'>Enter a valid email.</p>
                                </div>
                            }

                        </div>
                        {item.for === "login" && <p className='passwordReset'>Forgot password?</p>}
                    </div>
                ))}
                <button type="submit" onClick={login}>{page === "login" ? "Log In" : "Sign Up"}</button>
            </div>
        </form>
    );
};

export default Input;
