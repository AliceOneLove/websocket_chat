import React from 'react';
import {setMessage} from '../../features/chat/chatSlice';
import {useSelector, useDispatch} from 'react-redux';
import styles from './ChatInputs.module.css';

const ChatInputs = ({sendMessage}) => {
    const message = useSelector(state => state.chat.message);
    const user = useSelector(state => state.chat.user);
    const dispatch = useDispatch();
    console.log(sendMessage)
    return (
        <div className={styles.inputsContainer}>
            <p 
            className={styles.nickname + ' ' + styles.containerChild}
            >
            {user + " - thats you!"}
            </p>
            <textarea 
            rows={10}
            className={styles.messageTextArea + ' ' + styles.containerChild}
            placeholder='Message...' 
            value={message} 
            onChange={(e) => dispatch(setMessage(e.target.value))} 
            />
            <button 
            className={styles.sendButton + ' ' + styles.containerChild}
            onClick={() => {
                sendMessage();
                dispatch(setMessage(""));
            }} 
            disabled={message === '' ? true : false}
            >
            Send Message
            </button>
        </div>
    );
}

export default ChatInputs;