import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorFullname, setErrorFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let check = true;
        if (!email) {
            setErrorEmail('Vui lòng nhập email!');
            check = false;
        }
        if (!password) {
            setErrorPassword('Vui lòng nhập mật khẩu!');
            check = false;
        }
        if (!fullname) {
            setErrorFullname('Vui lòng nhập họ tên!');
            check = false;
        }

        function generateUuid() {
            return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
                let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        if (check) {
            const formData = new FormData();
            for (const el of e.target) {
                if (el.files) {
                    formData.append("file", el.files[0]);
                } else if (el.name) {
                    formData.append(el.name, el.value);
                }
            }

            try {
                var results = await axios({
                    method: "POST",
                    url: "http://localhost:3001/user/register",
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                });

                //handle success
                // console.log('results: ', results);
                navigate('/', { state: { msg: 'Đã thêm thành công!' } });
            } catch (error) {

            }
        }
    }

    const handleBlur = (e) => {
        if (e.target.name == 'email') {
            if (!e.target.value) {
                setErrorEmail('Vui lòng nhập email!');
            }
        } else if (e.target.name == 'password') {
            if (!e.target.value) {
                setErrorPassword('Vui lòng nhập mật khẩu!');
            }
        } else if (e.target.name == 'fullname') {
            if (!e.target.value) {
                setErrorFullname('Vui lòng nhập họ tên!');
            }
        }
    }

    const handleInput = (e) => {
        if (e.target.name == 'email') {
            setErrorEmail('');
        } else if (e.target.name == 'password') {
            setErrorPassword('');
        } else if (e.target.name == 'fullname') {
            setErrorFullname('');
        }
    }

    return (
        <div class="login agile">
            <div class="w3agile-border">
                <h2>Register Form | VinaEnter Edu</h2>
                <div class="login-main login-agileits">
                    <p style={{ display: 'none' }} id="error"></p>
                    <h1>Register</h1>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label>Email (*)</label>
                            <input onBlur={e => handleBlur(e)} onInput={e => handleInput(e)} type="text"
                                name="email" className={errorEmail && 'invalid'} value={email}
                                onChange={(e) => { setEmail(e.target.value) }} />
                            <span style={{
                                color: 'red',
                                fontStyle: 'italic'
                            }}>{errorEmail}</span>
                        </div>
                        <div>
                            <label>Password (*)</label>
                            <input onBlur={e => handleBlur(e)} onInput={e => handleInput(e)} type="text"
                                name="password" className={errorPassword && 'invalid'} value={password}
                                onChange={(e) => { setPassword(e.target.value) }} />
                            <span style={{
                                color: 'red',
                                fontStyle: 'italic'
                            }}>{errorPassword}</span>
                        </div>
                        <div>
                            <label>Fullname</label>
                            <input onBlur={e => handleBlur(e)} onInput={e => handleInput(e)} type="text"
                                name="fullname" className={errorFullname && 'invalid'} value={fullname}
                                onChange={(e) => { setFullname(e.target.value) }} />
                            <span style={{
                                color: 'red',
                                fontStyle: 'italic'
                            }}>{errorFullname}</span>
                        </div>
                        <div>
                            <label>Avatar</label>
                            <input type="file" />
                        </div>

                        <input type="submit" value="Register" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;