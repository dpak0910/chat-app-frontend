import { Socket } from "socket.io-client";

export interface AuthUser {
  _id: string;
  email: string;
  fullName: string;
  profilePic: string;
  createdAt: number;
  updatedAt: number;
}

export interface SignUpDataTypes {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginDataTypes {
  email: string;
  password: string;
}

export interface updateProfileDataTypes {
  profilePic: string | ArrayBuffer | null;
}

export interface AuthStoreTypes {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;
  isUpdatingProfile: boolean;
  onlineUsers: string[];
  socket: Socket | null;

  checkAuth: () => Promise<void>;
  signup: (data: SignUpDataTypes) => Promise<void>;
  login: (data: LoginDataTypes) => Promise<void>;
  logout: () => void;
  updateProfile: (data: updateProfileDataTypes) => Promise<void>;
  connectSocket: () => Promise<void>;
  disconnectSocket: () => void;
}

export interface UserTypes {
  _id: string;
  email: string;
  fullName: string;
  profilePic?: string;
}

export interface MessagesTypes {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  image: string;
  createdAt: number;
  updatedAt: number;
}

export interface SendMessageData {
  text?: string;
  image?: string | ArrayBuffer | null;
}

export interface ChatStoreTypes {
  users: UserTypes[];
  messages: MessagesTypes[];
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  selectedUser: UserTypes | null;

  setSelectedUser: (selectedUser: UserTypes | null) => void;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (messageData: SendMessageData) => Promise<void>;
  subscribeToMessages: () => void;
  unSubscribeFromMessages: () => void;
}
