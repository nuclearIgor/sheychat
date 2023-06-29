import {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {LoginUser } from "../../apicalls/users.js";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {HideLoader, ShowLoader} from "../../redux/loaderSlice.js";

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const login = async () => {
        try {
            dispatch(ShowLoader())
            const res = await LoginUser(user)
            dispatch(HideLoader())
            if (res.success) {
                toast.success(res.message)
                localStorage.setItem('token', res.token)
                navigate('/')
            } else {
                toast.error(res.message)
            }
        } catch (e) {
            toast.error(e.message)
            dispatch(HideLoader())
        }
    }

    return (
        <div className={'h-screen bg-primary flex items-center justify-center'}>
            <div className={'bg-white shadow-md p-5 flex flex-col gap-5 w-96'}>
                <h1 className={'text-2xl uppercase font-semibold'}>seychat login</h1>
                <hr/>
                <input type="text"
                       placeholder={'enter your email'}
                       value={user.email}
                       onChange={e => setUser({...user, email: e.target.value})}
                />
                <input type="password"
                       placeholder={'enter your password'}
                       value={user.password}
                       onChange={e => setUser({...user, password: e.target.value})}
                />
                <button className={'contained-btn'} onClick={login}>Login</button>

                <Link to={'/register'} className={'underline'}>don't have an account? Register</Link>
            </div>
        </div>
    );
};

export default Login;