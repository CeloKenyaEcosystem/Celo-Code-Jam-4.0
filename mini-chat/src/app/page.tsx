import { cookies } from 'next/headers';
import { ChatLayout } from '@/components/chat/chat-layout';
import Link from 'next/link';
import ConnectWallet from '@/components/connect-wallet';

export default function Home() {
  const layout = cookies().get('react-resizable-panels:layout');
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  return (
    <main className='flex h-screen flex-col items-center justify-center p-4 md:px-24 pb-24 pt-16 space-y-8 gap-4'>
      <div className='flex justify-between w-full items-center pb-6'>
        <Link href='/' className='text-4xl font-bold text-black'>
          MiniChat
        </Link>
        <ConnectWallet />
      </div>

      <div className='relative z-10 border rounded-lg  w-full h-full text-sm lg:flex'>
        <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
      </div>
    </main>
  );
}
