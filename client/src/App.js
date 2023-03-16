import './App.css';
import io from 'socket.io-client';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessageToHistory, setUser } from './features/chat/chatSlice';
import Chat from './components/Chat/Chat';
import ChatInputs from './components/ChatInputs/ChatInputs';

const socket = io.connect('http://localhost:5000');

function App() {
  const message = useSelector(state => state.chat.message);
  const user = useSelector(state => state.chat.user);
  const dispatch = useDispatch();

  const sendMessage = () => {
    socket.emit('send_message', {user, message});
    dispatch(addMessageToHistory({user, message}));
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      dispatch(addMessageToHistory(data));
    });
    socket.on('meet_user', (data) => {
      dispatch(addMessageToHistory({user: 'INFO', message:data.text}));
    });
    socket.on('set_nickname', (data) => {
      dispatch(setUser(data.user));
    });
  }, [dispatch]);
  
  return (
    <div className="App">
      <Chat/>
      <ChatInputs sendMessage={sendMessage}/>
    </div>
  );
}

export default App;
