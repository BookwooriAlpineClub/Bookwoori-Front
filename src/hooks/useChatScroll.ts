import { useRef, useEffect } from 'react';
import type { ChannelMessage } from '@src/types/channel';

const useChatScroll = (messages: ChannelMessage[]) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAtBottomRef = useRef(true);

  // 새 메세지 도착시 스크롤 위치 업데이트
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    isAtBottomRef.current = scrollTop + clientHeight >= scrollHeight - 10; // 맨 아래 근처인지 확인
  };

  // dependency: messages
  useEffect(() => {
    if (isAtBottomRef.current) {
      scrollToBottom();
    }
  }, [messages]);

  // 스크롤 이벤트 등록
  useEffect(() => {
    const ref = scrollRef.current;
    if (!ref) return;
    ref.addEventListener('scroll', handleScroll);
    
    return () => {
      ref.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollRef;
};

export default useChatScroll;
