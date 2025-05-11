"use client";

import { Toaster } from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import NavigationBar from "./Navbar";

const publicRoutes = ["/signup", "/login"];

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const isPublic = publicRoutes.includes(pathname);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isCheckingAuth) {
      if (!authUser && !isPublic) {
        router.replace("/login");
      } else if (authUser && isPublic) {
        router.replace("/");
      }
    }
  }, [isPublic, authUser, isCheckingAuth, router, pathname]);
  if (isCheckingAuth || (!authUser && !isPublic)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="animate-spin duration-300 transition-all" />
      </div>
    );
  }

  return (
    <>
      {!isPublic && <NavigationBar />}
      <main className={!isPublic ? "pt-16 h-screen" : ""}>{children}</main>
      <Toaster />
    </>
  );
};

export default AuthLayout;
