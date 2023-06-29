import React, {useState} from 'react';
import UserSearch from "./components/UserSearch.jsx";
import ChatArea from "./components/ChatArea.jsx";
import UsersList from "./components/UsersList.jsx";
import {useSelector} from "react-redux";

const Home = () => {
    const [searchKey, setSearchKey] = useState("")
    const { selectedChat } = useSelector(state => state.userReducer)

    return (
        <div className={'flex gap-5'}>
            <div className={'w-96'}>
                <UserSearch searchKey={searchKey} setSearchKey={setSearchKey}/>
                <UsersList searchKey={searchKey}/>
            </div>

            <div className={'w-full'}>
                {selectedChat ? <ChatArea/> : null}
            </div>

        </div>
    );
};

export default Home;