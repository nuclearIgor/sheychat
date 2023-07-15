import React, {useEffect, useState} from 'react';
import UserSearch from "./components/UserSearch.jsx";
import ChatArea from "./components/ChatArea.jsx";
import UsersList from "./components/UsersList.jsx";
import {useSelector} from "react-redux";

import { io } from 'socket.io-client'
const socket = io("http://localhost:3000")

const Home = () => {

    const [searchKey, setSearchKey] = useState("")
    const { selectedChat, user } = useSelector(state => state.userReducer)

    useEffect(() => {
        // join the room
        if(user) {
            socket.emit('join-room', user._id)
        }

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