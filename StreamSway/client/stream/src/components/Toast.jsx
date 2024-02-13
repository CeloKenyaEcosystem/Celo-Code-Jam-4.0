
import { Toast } from 'flowbite-react';
import { HiCheck, HiX, HiExclamation } from 'react-icons/hi';

export default function Tosts({message}) {
  return (
    <div className="flex flex-col  bg-black h-1/3 justify-center items-center m-10">
      <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-400 text-green-500 dark:bg-green-800 dark:text-green-400">
          <HiCheck className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal text-gray 400">
          {message}
        </div>
        <Toast.Toggle />
      </Toast>
      

    </div>
  )
}


