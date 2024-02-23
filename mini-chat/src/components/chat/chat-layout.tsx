'use client';

import React, { useEffect, useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { cn } from '@/lib/utils';
import { Sidebar } from '../sidebar';
import { Chat } from './chat';

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function ChatLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
  navCollapsedSize,
}: ChatLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [isMobile, setIsMobile] = useState(false);

  
useEffect(() => {
  const checkScreenWidth = () => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth <= 768);
    }
  };

  // Initial check
  checkScreenWidth();

  // Event listener for screen width changes
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', checkScreenWidth);
  }

  // Cleanup the event listener on component unmount
  return () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', checkScreenWidth);
    }
  };
}, []);


  return (
    <ResizablePanelGroup
      direction='horizontal'
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`;
      }}
      className='h-full items-stretch'
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={isMobile ? 0 : 24}
        maxSize={isMobile ? 8 : 30}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true
          )}`;
        }}
        onExpand={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false
          )}`;
        }}
        className={cn(
          isCollapsed &&
            'min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out'
        )}
      >
        <Sidebar isCollapsed={isCollapsed || isMobile} isMobile={isMobile} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <Chat />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
