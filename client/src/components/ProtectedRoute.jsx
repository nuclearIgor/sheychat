import {useEffect, useState} from "react";
import {GetAllUsers, GetCurrentUser} from "../apicalls/users.js";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {HideLoader, ShowLoader} from "../redux/loaderSlice.js";
import {SetAllChats, SetAllUsers, SetUser} from "../redux/userSlice.js";
import {GetAllChats} from "../apicalls/chats.js";

const ProtectedRoute = ({children}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector(state => state.userReducer)

    const getCurrentUser = async () => {
        const token = localStorage.getItem('token')
        console.log(token)
        if(!token) {
            navigate('/login')
            return
        }

        try {
            dispatch(ShowLoader())
            const res = await GetCurrentUser()

            const allUsersRes = await GetAllUsers()

            const allChatsRes = await GetAllChats()

            dispatch(HideLoader())
            if(res.success){
                dispatch(SetUser(res.data))
                dispatch(SetAllUsers(allUsersRes.data))
                dispatch(SetAllChats(allChatsRes.data))
                return true
            }
            navigate('/login')
            return false
        } catch (e) {
            navigate('/login')
            dispatch(HideLoader())
        }
    }

    useEffect(() => {
        getCurrentUser()
    }, [])

    return (
        <div className={'h-screen w-screen bg-gray-100 p-2'}>

            <div className={'flex justify-between p-5 bg-primary rounded'}>
                <div className={'flex items-center gap-1 text-2xl'}>
                    <i className="ri-chat-1-line"></i>
                    <h1 className={'text-primary text-2xl uppercase font-semibold text-white'}>papafrete</h1>
                </div>

                <div className={'flex gap-1 text-md items-center text-white'}>
                    <i className="ri-user-line"></i>

                    <h1 className={'underline text-white'}>{user?.name}</h1>

                    <i className="ri-logout-circle-r-line ml-5 text-xl cursor-pointer"
                        onClick={() => {
                            localStorage.removeItem('token')
                            navigate('/login')
                        }}
                    ></i>
                </div>
            </div>


            <div className={'p-5'}>

            {children}
            </div>
        </div>
    );
};

export default ProtectedRoute;