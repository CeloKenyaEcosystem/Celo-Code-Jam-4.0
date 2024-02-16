import React from 'react';
import Messages from '../Messages';


export function ChatList() {
 

  return (
    <div className='w-full overflow-y-auto overflow-x-hidden h-full flex flex-col'>
      <Messages />
    </div>
  );
}
