import React from 'react';
import MessageInput from './message-input';

interface MessageComposerProps {
  msgTxt: string;
  setMsgTxt: (msgTxt: string) => void;
  sendNewMessage: any;
  sendMessage: any;
}
const MessageComposer = ({
  msgTxt,
  setMsgTxt,
  sendNewMessage,
  sendMessage,
}: MessageComposerProps) => {
  return (
    <div className='flex'>
      <MessageInput
        setNewValue={setMsgTxt}
        placeholder='Write a message'
        value={msgTxt}
        sendNewMessage={sendNewMessage}
      />
      <br />
    </div>
  );
};

export default MessageComposer;
