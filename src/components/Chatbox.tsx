import { useEffect, useRef } from "react";
import { Avatar, Card, Image } from "@heroui/react";
import dayjs from "dayjs";
import ChatHeader from "./ChatHeader";
import useAuthStore from "@/store/useAuthStore";
import useChatStore from "@/store/useChatStore";
import MessageInputArea from "./MessageInput";
import MessagesSkeleton from "./skeletons/MessageSkeleton";

const ChatContainer = () => {
  const {
    messages,
    selectedUser,
    getMessages,
    isMessagesLoading,
    subscribeToMessages,
    unSubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
    subscribeToMessages();

    return () => unSubscribeFromMessages();
  }, [
    selectedUser,
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unSubscribeFromMessages,
  ]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
    return () => clearTimeout(timeout);
  }, [messages]);

  useEffect(() => {
    if (!messageEndRef.current) return;
    const observer = new ResizeObserver(() => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    observer.observe(messageEndRef.current);
    return () => observer.disconnect();
  }, []);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessagesSkeleton />
        <MessageInputArea />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${
              message.senderId === authUser?._id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={
                message.senderId === authUser?._id
                  ? "flex flex-row-reverse items-start space-x-2 space-x-reverse"
                  : " flex items-start space-x-2"
              }
            >
              <Avatar
                src={
                  message.senderId === authUser?._id
                    ? authUser?.profilePic
                    : selectedUser?.profilePic
                }
                showFallback
              />
              <Card
                radius="sm"
                className={`${message.text && "py-1 px-2"}   ${
                  message.senderId === authUser?._id && "bg-primary-200"
                }`}
                shadow="sm"
              >
                {message.image && (
                  <Image
                    src={message.image}
                    alt="attachment"
                    className="sm:max-w-[240px] rounded-md"
                  />
                )}
                {message.text && <p>{message.text}</p>}
                <time
                  className={`text-xs opacity-50 ${
                    message.senderId === authUser?._id && "place-self-end"
                  }`}
                >
                  {dayjs.unix(message.createdAt).format("hh:mm a")}
                </time>
              </Card>
            </div>
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>
      <MessageInputArea />
    </div>
  );
};

export default ChatContainer;
