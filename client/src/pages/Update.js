import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from "react-router-dom";

const Update = () => {

    const { id } = useParams();
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [avatar, setAvatar] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                var result = await axios(`http://localhost:3001/user/${id}`);
                setEmail(result.data.email);
                setFullname(result.data.fullname);
                setAvatar(result.data.avatar);
            } catch (error) {
                setError('Xảy ra lỗi khi lấy dữ liệu để sửa!');
            }
        }
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                method: "PUT",
                url: "http://localhost:3001/user/update",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });

            //handle success
            // console.log('results: ', results);
            navigate('/', { state: { msg: 'Đã sửa thành công!' } });
        } catch (error) {
            setError('Xảy ra lỗi khi sửa!');
        }
    }

    return (
        <div className="login agile">
            <div className="w3agile-border">
                <h2>TRANG QUẢN TRỊ VIÊN | CẬP NHẬT THÔNG TIN NGƯỜI DÙNG</h2>
                <div className="login-main login-agileits">
                    <p style={{
                        color: 'red',
                        backgroundColor: 'yellow',
                        fontStyle: 'italic'
                    }}>{error}</p>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input type="hidden" name="id" value={id} />
                        <table className="update-user" border="1" width="500px" align="center">
                            <tbody>
                                <tr align="center">
                                    <td>Email</td>
                                    <td colSpan="2">
                                        <input type="text" name="email" value={email}
                                            onChange={(e) => { setEmail(e.target.value) }} />
                                    </td>
                                </tr>

                                <tr align="center">
                                    <td>Fullname</td>
                                    <td colSpan="2">
                                        <input type="text" name="fullname" value={fullname}
                                            onChange={(e) => { setFullname(e.target.value) }} />
                                    </td>
                                </tr>

                                <tr align="center">
                                    <td>Avatar</td>
                                    <td><img id="avatar" src={"../avatar/" + avatar}
                                        alt="Không có hình ảnh" width="100px" height="100px" /></td>
                                    <td>
                                        <input type="file" />
                                    </td>
                                </tr>

                                <tr align="center">
                                    <td>&nbsp;</td>
                                    <td colSpan="2"><button>Cập nhật thông tin</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <button><Link to='/'>Home</Link></button>
                </div>
            </div>
        </div>
    )
}

export default Update;