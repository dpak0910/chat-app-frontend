import { MessageSquare } from "lucide-react";

const EmptyChatBox = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary flex items-center
           justify-center animate-bounce"
            >
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold">Welcome to Chatterbox!</h2>
        <p className="text-base">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default EmptyChatBox;
