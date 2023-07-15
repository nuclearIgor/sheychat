import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {CreateNewChat} from "../../../apicalls/chats.js";
import {SetAllChats, SetSelectedChat} from "../../../redux/userSlice.js";
import toast from "react-hot-toast";
import {HideLoader, ShowLoader} from "../../../redux/loaderSlice.js";
import {hourAndMinuteFormatter} from "../../../utils/dateFormatter.js";

const UsersList = ({searchKey}) => {
    let {allUsers, allChats, user, selectedChat} = useSelector(state => state.userReducer)

    useEffect(() => {
        console.log('chats: \n', allChats)
    }, [allChats])

    allUsers = allUsers?.filter(
        u => u.name.toLowerCase().includes(searchKey.toLowerCase()) ||
        allChats.some(chat => chat.members?.includes(u._id))
    )

    const dispatch = useDispatch()
    const handleCreateChat = async (userId) => {
        try {
            dispatch(ShowLoader())
            const res = await CreateNewChat([user._id, userId])
            dispatch(HideLoader())
            if (res.success) {
                toast.success(res.message)
                const newChat = res.data
                dispatch(SetAllChats([...allChats, newChat]))
            }
        } catch (e) {
            toast.error(e.message)
            dispatch(HideLoader())
        }
    }

    const openChat = (userId) => {
        const chat = allChats.find(chat => chat.members?.map(m => m._id).includes(user._id) && chat.members?.map(m => m._id).includes(userId))

        if(chat) {
            dispatch(SetSelectedChat(chat))
        }
    }

    const getData = () => {
        //   if search key is empty return all chats
        if (searchKey === "") return allChats
        //     else return filtered chats and users
        return allUsers.filter(user => user.name.toLowerCase().includes(searchKey.toLowerCase()))
    }

    const isSelected = (userId) => {
        return selectedChat && selectedChat.members?.map(mem => mem._id).includes(userId)
    }

    const getLastMessage = (userObj) => {
        const chat = allChats.find((chat) =>
            chat.members.map(mem => mem._id).includes(userObj._id)
        )
        if(!chat || !chat.lastMessage) return ""

        const sender = chat.lastMessage.sender === user._id ? "You" : ""
        return (
            <div className={'flex justify-between w-full'}>
                <h1 className={'text-gray-600 text-sm'}>
                    {sender}: {chat.lastMessage.text}
                </h1>

                <h1 className={'text-gray-500 text-sm'}>
                    {hourAndMinuteFormatter(new Date(chat.lastMessage.createdAt))}
                </h1>
            </div>
        )
    }

    const getUnreadMessages = (userObj) => {
        const chat = allChats.find((chat) =>
            chat.members.map(mem => mem._id).includes(userObj._id)
        )
        if(chat && chat.unreadMessages && chat.lastMessage.sender !== user._id) {
            return (
                <div className={'bg-blue-500 text-white text-xs rounded-full p-2 h-5 w-5 flex items-center justify-center'}>
                    {chat.unreadMessages}
                </div>
            )
        }
    }

    return (
        <div className={'flex flex-col gap-3 mt-5'}>
            {getData()?.map(chatOrUserObj => {
                let userObj = chatOrUserObj
                if (chatOrUserObj.members){
                    userObj = chatOrUserObj.members.find(mem => mem._id !== user._id)
                }

                return (
                    <div key={userObj._id} className={`
                        ${ isSelected(userObj._id) ? 'border-2 border-primary' : ''}
                    w-full shadow-sm border p-5 rounded-2xl bg-white flex justify-between items-center cursor-pointer`}
                        onClick={() => openChat(userObj._id)}
                    >
                        <div className={'flex gap-5 items-center w-full'}>
                            {
                                userObj.profilePic ?
                                <img src={userObj.profilePic} alt="profile pic" className={'w-10 h-10 rounded-full'}/>
                                :
                                <div className={'bg-gray-500 rounded-full h-10 w-10 flex justify-center items-center'}>
                                    <h1 className={'uppercase text-white text-2xl font-semibold'}>{userObj.name[0]}</h1>
                                </div>
                            }
                            <div className={'flex flex-col gap-1 w-full'}>
                                <div className={'flex gap-1'}>
                                    <h1>{userObj.name}</h1>
                                    {getUnreadMessages(userObj)}
                                </div>

                              {getLastMessage(userObj)}
                            </div>
                        </div>

                        <div onClick={() => handleCreateChat(userObj._id)}>
                            {allChats?.find(chat => chat.members?.map(mem => mem._id).includes(userObj._id)) ?
                                null
                                :
                                <button className={'bg-white text-primary border border-primary p-2 rounded'}>create chat</button>
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default UsersList;