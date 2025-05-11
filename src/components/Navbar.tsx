"use client";

import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button, Tooltip } from "@heroui/react";
import { LogOutIcon, MessageSquare, Settings, User } from "lucide-react";
import Link from "next/link";
import useAuthStore from "@/store/useAuthStore";
import toast from "react-hot-toast";

const NavigationBar = () => {
  const { logout, authUser } = useAuthStore();
  return (
    <header className="bg-default-100 border-b border-default-300 fixed w-full top-0 z-40 backdrop-blur-lg">
      <div className="w-full max-w-7xl mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary-400 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold">ChatterBox</h1>
            </Link>
          </div>
          <div className="md:hidden flex items-center space-x-4">
            <Tooltip content="Settings" className="hidden">
              <Button
                color="default"
                className="hidden"
                variant="light"
                isIconOnly
                size="sm"
                radius="sm"
                onPress={() => toast("Settings page in development")}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </Tooltip>

            {authUser && (
              <>
                <Tooltip content="Profile">
                  <Button
                    as={Link}
                    color="default"
                    href="/profile"
                    variant="light"
                    isIconOnly
                    size="sm"
                    radius="sm"
                  >
                    <User className="w-4 h-4" />
                  </Button>
                </Tooltip>
                <Tooltip content="Logout">
                  <Button
                    isIconOnly
                    size="sm"
                    radius="sm"
                    onPress={logout}
                    variant="light"
                    color="danger"
                  >
                    <LogOutIcon className="w-4 h-4" />
                  </Button>
                </Tooltip>
              </>
            )}
            <ThemeSwitcher />
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button
              color="default"
              className="hidden"
              variant="faded"
              startContent={<Settings className="w-4 h-4" />}
              size="sm"
              radius="sm"
              onPress={() => toast("Settings page in development")}
            >
              Settings
            </Button>

            {authUser && (
              <>
                <Button
                  as={Link}
                  color="default"
                  href="/profile"
                  variant="faded"
                  startContent={<User className="w-4 h-4" />}
                  size="sm"
                  radius="sm"
                >
                  Profile
                </Button>
                <Button
                  size="sm"
                  radius="sm"
                  onPress={logout}
                  variant="faded"
                  color="danger"
                  startContent={<LogOutIcon className="w-4 h-4" />}
                >
                  Logout
                </Button>
              </>
            )}
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
