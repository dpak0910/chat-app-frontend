"use client";

import { Image, Input } from "@heroui/react";
import React, { useState } from "react";
import { Camera, Mail, User } from "lucide-react";
import dayjs from "dayjs";
import useAuthStore from "@/store/useAuthStore";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState<string | undefined>(undefined);
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      if (typeof base64Image === "string") {
        setSelectedImg(base64Image);
        await updateProfile({ profilePic: base64Image });
      }
    };
  };
  return (
    <div className="h-full">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-default-100 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Image
                width={150}
                height={150}
                radius="full"
                src={
                  selectedImg ||
                  authUser?.profilePic ||
                  process.env.NEXT_PUBLIC_AVATARIMAGE
                }
                alt="Profile"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }
                `}
              >
                <Camera className="w-5 h-5 z-50 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="flex flex-col items-center space-y-10">
            <Input
              type="text"
              disabled
              value={authUser?.fullName}
              variant="bordered"
              label="Name"
              labelPlacement="outside"
              startContent={<User className="w-4 h-4" />}
            />
            <Input
              type="email"
              disabled
              value={authUser?.email}
              variant="bordered"
              label="Email Address"
              labelPlacement="outside"
              startContent={<Mail className="w-4 h-4" />}
            />
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                {authUser && (
                  <span>
                    {dayjs.unix(authUser?.createdAt).format("DD-MM-YYYY")}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
