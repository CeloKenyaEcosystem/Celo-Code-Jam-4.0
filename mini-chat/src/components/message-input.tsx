import React from 'react';
import { Tooltip } from 'antd';
import { Button, buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { InfoIcon, SendHorizontal } from 'lucide-react';

const text = (
  <span>
    How to send Money : <br /> /pay amount cusd
  </span>
);
interface MessageInputProps {
  onInputBlur?: () => void;
  value: string;
  setNewValue: (newValue: string) => void;
  placeholder: string;
  sendNewMessage: () => void;
}

const MessageInput = ({
  onInputBlur,
  value,
  setNewValue,
  placeholder,
  sendNewMessage,
}: MessageInputProps) => {
  const handleSubmit = (event: any) => {
    event.preventDefault();

    console.log('form submitted ✅');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex justify-center items-center w-full space-x-2 bg-background dark:bg-muted-foreground p-2 rounded-md shadow-md dark:shadow-none'
    >
      <Tooltip placement='top' title={text}>
        <InfoIcon className='h-4 w-4' />
      </Tooltip>
      <input
        value={value}
        onChange={(e) => {
          setNewValue(e.target.value);
        }}
        type='text'
        onBlur={onInputBlur}
        className=' w-full border rounded-lg flex items-center h-9 p-3 resize-none overflow-hidden bg-background'
        placeholder={placeholder}
      />
      <Button
        type='submit'
        variant="default"
        onClick={sendNewMessage}
      >
        <SendHorizontal className='text-white w-full h-full' />
      </Button>
    </form>
  );
};

export default MessageInput;
