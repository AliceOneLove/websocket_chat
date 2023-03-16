import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Chat.module.css';

const Chat = () => {
    const chatHistory = useSelector(state => state.chat.chatHistory);
    const chatHistoryElements = chatHistory.map(message => {
        return <p className={styles.chatMessage}><b>{message.user}</b>: {message.message}</p>
    });

    return (
    <div className={styles.chatHistory}>
        <h3 className={styles.chatHeader}>Chat:</h3>
        {chatHistoryElements}
    </div>
    );
}

export default Chat;