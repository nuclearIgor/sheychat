import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {RegisterUser} from "../../apicalls/users.js";
import toast from "react-hot-toast";
import {HideLoader, ShowLoader} from "../../redux/loaderSlice.js";
import {useDispatch} from "react-redux";

const Register = () => {
    const dispatch = useDispatch()
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    })

    const registerUser = async () => {
        try {
            dispatch(ShowLoader())
            const res = await RegisterUser(user)
            dispatch(HideLoader())
            if (res.success) {
                toast.success(res.message)
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
                <h1 className={'text-2xl uppercase font-semibold'}>seychat register</h1>
                <hr/>
                <input type="text"
                       placeholder={'enter your name'}
                    value={user.name}
                   onChange={e => setUser({...user, name: e.target.value})}
                />
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
                <button className={'contained-btn'} onClick={registerUser}>Register</button>

                <Link to={'/login'} className={'underline'}>Already have an account? Login</Link>
            </div>
        </div>
    );
};

export default Register;