import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

const Home = () => {

    const [listUsers, setListUsers] = useState([]);
    const [msg, setMsg] = useState('');
    const { state } = useLocation();

    useEffect(() => {
        async function fetchData() {
            let result = await axios('http://localhost:3001/user');
            setListUsers(result.data);
        }
        fetchData();
        if (state) {
            setMsg(state.msg);
        }
    }, []);


    const handleDelete = async (id) => {
        // if (confirm('Bạn có chắc muốn xóa ?')) {
        //     await axios({
        //         method: "DELETE",
        //         url: `http://localhost:3001/book/${id}`,
        //     });
        // }
        // let result = await axios('http://localhost:3001/book');
        // setListBooks(result.data);
        // setMsg('Đã xóa thành công!');
    }

    return (
        <div className="login agile">
            <div className="w3agile-border">
                <h2>Trang quản trị viên | VinaEnter Edu</h2>
                <div className="login-main login-agileits">

                    <h1>Danh sách người dùng</h1>
                    <button><a href="dangky.html">Đăng ký</a></button>
                    <table className="index-user" border="1" width="500px" align="center">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Email</th>
                                <th>Fullname</th>
                                <th>Chức năng</th>
                            </tr>
                        </thead>

                        <tbody>
                            {listUsers.map((user, idx) =>
                                <tr key={idx}>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.fullname}</td>
                                    <td>
                                        <button><Link to={'/update/' + user.id}>Sửa</Link></button>
                                        <button onClick={() => handleDelete(user.id)}>Xóa</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Home;