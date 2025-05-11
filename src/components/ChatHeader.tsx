import { User } from "@heroui/react";
import { CircleX } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";
import useChatStore from "@/store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  return (
    <div className="p-3 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <User
            avatarProps={{
              src: selectedUser?.profilePic,
              showFallback:true,
            }}
            description={
              selectedUser && onlineUsers.includes(selectedUser._id)
                ? "Online"
                : "Offline"
            }
            name={selectedUser?.fullName}
          />
        </div>
        <button onClick={() => setSelectedUser(null)}>
          <CircleX />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
