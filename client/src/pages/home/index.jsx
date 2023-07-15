import React, {useEffect, useState} from 'react';
import UserSearch from "./components/UserSearch.jsx";
import ChatArea from "./components/ChatArea.jsx";
import UsersList from "./components/UsersList.jsx";
import {useSelector} from "react-redux";

import { io } from 'socket.io-client'

const Home = () => {
    const socket = io("http://localhost:3000")

    const [searchKey, setSearchKey] = useState("")
    const { selectedChat, user } = useSelector(state => state.userReducer)

    useEffect(() => {
        // join the room
        if(user) {
            socket.emit('join-room', user._id)

        //     send new message to receiver (user 3)
            socket.emit('send-message', {
                text: "hi user 3. I am user 2.",
                sender: user._id,
                recipient: "64b225c10744d210ee9301df"
            })

        //     receive message as user 3
            socket.on('receive-message', (data) => {
                console.log('msgdata: ', data)
            })

        }

        socket.on('new-message-from-server', (data) => {
            console.log(data)
        })
    }, [user])

    return (
        <div className={'flex gap-5'}>
            <div className={'w-96'}>
                <UserSearch searchKey={searchKey} setSearchKey={setSearchKey}/>
                <UsersList searchKey={searchKey}/>
            </div>

            <div className={'w-full'}>
                {selectedChat ? <ChatArea socket={socket}/> : null}
            </div>

        </div>
    );
};

export default Home;