"use client";

import Sidebar from "@/components/Sidebar";
import EmptyChatBox from "@/components/EmptyChatbox";
import ChatContainer from "@/components/Chatbox";
import useChatStore from "@/store/useChatStore";

export const dynamic = "force-dynamic";

export default function Home() {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-full bg-default-200">
      <div className="flex h-full items-center md:items-start justify-center sm:px-4 lg:py-4">
        <div className="bg-default-100 rounded-lg shadow-md w-full max-w-6xl h-full lg:h-[90%]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <EmptyChatBox /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
}
