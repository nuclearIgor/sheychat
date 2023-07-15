import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {GetMessages, SendMessage} from "../../../apicalls/messages.js";
import {HideLoader, ShowLoader} from "../../../redux/loaderSlice.js";
import toast from "react-hot-toast";
import {ClearChatMessages} from "../../../apicalls/chats.js";
import {SetAllChats} from "../../../redux/userSlice.js";

const ChatArea = ({socket}) => {
    const [newMessage, setNewMessage] = useState('')

    const { selectedChat, user, allChats } = useSelector(state => state.userReducer)
    const recipientUser = selectedChat?.members.find(mem => mem._id !== user._id)

    const dispatch = useDispatch()
    const handleMessageSend = async () => {
        try {
            dispatch(ShowLoader())

            const message = {
                chat: selectedChat._id,
                sender: user._id,
                text: newMessage
            }

            const res = await SendMessage(message)

            dispatch(HideLoader())

            if(res.success) {
                setNewMessage("")
            }

        } catch (e) {
            dispatch(HideLoader())
            toast.error(e.message)
        }
    }

    const [messages, setMessages] = useState([])

    const getMessages = async () => {
        try {
            dispatch(ShowLoader())
            const res = await GetMessages(selectedChat._id)
            dispatch(HideLoader())

            if(res.success) {
                setMessages(res.data)
            }
        } catch (e) {
            dispatch(HideLoader())
            toast.error(e.message)
        }
    }

    const clearUnreadMessages = async () => {
        try {
            dispatch(ShowLoader())
            const res = await ClearChatMessages(selectedChat._id)
            dispatch(HideLoader())

            if(res.success) {
                const updatedChats = allChats.map(chat => {
                    if (chat._id === selectedChat._id) {
                        return res.data
                    }
                    return chat
                })
                dispatch(SetAllChats(updatedChats))
            }

        } catch (e) {
            dispatch(HideLoader())
            toast.error(e.message)
        }
    }

    useEffect(() => {
        getMessages()

        if (selectedChat?.lastMessage?.sender !== user._id) {
            clearUnreadMessages()
        }

    }, [selectedChat])

    return (
        <div className={'bg-white h-[82vh] border rounded-2xl w-full flex flex-col justify-between p-5'}>
            {/*{selectedChat ? <h1>{selectedChat._id}</h1>  : <h1>sem chat</h1>}*/}

            <div>
                <div className={'flex gap-5 items-center mb-2'}>
                    {recipientUser.profilePic ? <img src={recipientUser.profilePic} alt="profile pic" className={'w-10 h-10 rounded-full'}/>
                        :
                        <div className={'bg-gray-500 rounded-full h-10 w-10 flex justify-center items-center'}>
                            <h1 className={'uppercase text-white text-2xl font-semibold'}>{recipientUser.name[0]}</h1>
                        </div>}
                    <h1 className={'uppercase'}>{recipientUser.name}</h1>
                </div>
                <hr/>
            </div>

            {/*MESSAGES*/}
            <div className={'h-[50vh] overflow-y-scroll'}>
                <div className={'flex flex-col gap-2'}>
                    {messages.map((message) => {

                        const isMe = message.sender === user._id

                        return (
                            <div key={message._id} className={`flex ${ isMe ? 'justify-end' : ''}`}>
                                <div className={'flex flex-col gap-1'}>
                                    <h1 className={`${isMe ? 'bg-primary text-white' : 'bg-gray-300 text-primary'}
                                        p-2 rounded-xl rounded-bl-none
                                    `}>
                                        {message.text}
                                    </h1>
                                    <h1 className={'text-gray-500 text-sm'}>{message.createdAt}</h1>
                                </div>
                                {isMe ? <i className={`${message.read ? "text-green-700" : "text-gray-500"} p-1 text-lg ri-check-double-line`}></i> : null}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div>
                <div className={'h-16 rounded-xl border-gray-300 shadow border flex justify-between items-center p-2'}>
                    <input type="text" placeholder={'message'}
                        className={'w-[90%] border-0 h-full rounded-xl focus:border-none'}
                           onChange={(e) => setNewMessage(e.target.value)}
                           value={newMessage}
                    />
                    <button className={'bg-primary text-white py-1 px-5 rounded h-max'} onClick={handleMessageSend}>
                        {/*<i className="ri-send-plane-line text-white"></i>*/}
                        <i className="ri-send-plane-2-line text-white"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatArea;