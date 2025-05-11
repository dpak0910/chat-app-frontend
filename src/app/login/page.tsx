"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { LoginDataTypes } from "@/types";
import { Eye, EyeOff, Key, Mail, MessageSquare } from "lucide-react";
import Link from "next/link";
import useAuthStore from "@/store/useAuthStore";
import AuthImagePattern from "@/components/AuthImagePattern";

const LoginPage = () => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataTypes>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { isLoggingIn, login } = useAuthStore();
  const handleLogin = (data: LoginDataTypes) => {
    login(data);
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">
                Login to your account to continue
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(handleLogin)}
            className="w-full flex flex-col items-center space-y-8"
          >
            <Input
              type="email"
              radius="sm"
              label="Email"
              isRequired={true}
              labelPlacement="inside"
              placeholder="you@example.com"
              value={watch("email")}
              startContent={
                <Mail className="size-5 text-base-content/40 z-10" />
              }
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-sm text-red-400">
                {errors.email.message}
              </span>
            )}
            <Input
              type={showPassword ? "text" : "password"}
              radius="sm"
              isRequired={true}
              label="Password"
              labelPlacement="inside"
              placeholder="Enter your password"
              value={watch("password")}
              startContent={
                <Key className="size-5 text-base-content/40 z-10" />
              }
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-sm text-red-400">
                {errors.password.message}
              </span>
            )}
            <Button
              type="submit"
              color="primary"
              className="w-full mx-auto"
              radius="sm"
              disabled={isLoggingIn}
              isLoading={isLoggingIn}
            >
              {isLoggingIn ? "Logging in" : "Login"}
            </Button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?&nbsp;
              <Link href="/signup" className="text-blue-700 underline">
                Signup here
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends."
      />
    </div>
  );
};

export default LoginPage;
