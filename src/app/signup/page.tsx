"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@heroui/react";
import { SignUpDataTypes } from "@/types";
import { Eye, EyeOff, Key, Mail, MessageSquare, User } from "lucide-react";
import Link from "next/link";
import useAuthStore from "@/store/useAuthStore";
import AuthImagePattern from "@/components/AuthImagePattern";

const SignUpPage = () => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpDataTypes>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { isSigningUp, signup } = useAuthStore();
  const router = useRouter();
  const handleSignUp = async (data: SignUpDataTypes) => {
    await signup(data);
    router.push("/login");
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
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
            onSubmit={handleSubmit(handleSignUp)}
            className="w-full flex flex-col items-center space-y-8"
          >
            <Input
              type="text"
              radius="sm"
              label="Full Name"
              isRequired={true}
              labelPlacement="inside"
              placeholder="Enter your name.."
              value={watch("fullName")}
              startContent={
                <User className="size-5 text-base-content/40 z-10" />
              }
              {...register("fullName", { required: "Full name is required" })}
              isInvalid={!!errors.fullName}
              errorMessage={errors.fullName?.message}
            />
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
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Input
              type={showPassword ? "text" : "password"}
              radius="sm"
              label="Password"
              isRequired={true}
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
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
            <Button
              type="submit"
              color="primary"
              className="w-full mx-auto"
              radius="sm"
              disabled={isSigningUp}
              isLoading={isSigningUp}
            >
              {isSigningUp ? "Signing Up" : "Sign Up"}
            </Button>
          </form>
          <div className="text-center">
            <p className="text-base-content/60">
              Already created an account?&nbsp;
              <Link href="/login" className="text-blue-700 underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends."
      />
    </div>
  );
};

export default SignUpPage;
