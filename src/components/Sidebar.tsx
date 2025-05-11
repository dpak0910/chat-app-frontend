import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, Badge, Switch } from "@heroui/react";
import useAuthStore from "@/store/useAuthStore";
import useChatStore from "@/store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = () => {
  const [showOnlineOnly, setShowOnlineOnly] = useState<boolean>(false);
  const { onlineUsers } = useAuthStore();
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  let noUsersMessage = null;
  if (users.length === 0) {
    noUsersMessage = "No active users";
  } else if (showOnlineOnly && onlineUsers.length <= 1) {
    noUsersMessage = "No Online Users";
  }

  if (isUsersLoading) return <SidebarSkeleton />;
  return (
    <aside className="h-full w-fit lg:w-72 border-r border-default-300 flex flex-col transition-all duration-200 items-center">
      <div className="border-b border-default-300 w-fit lg:w-full p-5">
        <div className="flex items-center gap-2">
          <User className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>

        <div className="mt-3 hidden lg:flex flex-col items-start justify-center">
          <Switch
            color="success"
            size="sm"
            isSelected={showOnlineOnly}
            onValueChange={setShowOnlineOnly}
          >
            Show online only
          </Switch>
          {users.length !== 0 && (
            <span className="tex-xs text-zinc-500">
              ({onlineUsers.length - 1} online)
            </span>
          )}
        </div>
      </div>
      <div className="overflow-y-auto flex flex-col w-full">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className={`cursor-pointer flex w-full space-x-3 py-2 px-4 hover:bg-default-200 items-center ${
              selectedUser?._id === user._id ? "bg-default-200" : ""
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <Badge
              color="success"
              placement="bottom-right"
              shape="circle"
              content=""
              isInvisible={!onlineUsers.includes(user._id)}
            >
              <Avatar isBordered={true} src={user.profilePic} showFallback />
            </Badge>
            <div className="hidden lg:block text-left">
              <div className="font-medium text-default-700">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </div>
        ))}
        <div className="text-center text-zinc-500 py-4">{noUsersMessage}</div>
      </div>
    </aside>
  );
};

export default Sidebar;
