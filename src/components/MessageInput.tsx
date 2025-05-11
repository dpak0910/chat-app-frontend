import { Button, Image, Input } from "@heroui/react";
import { CircleX, ImagePlus, Send } from "lucide-react";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import useChatStore from "@/store/useChatStore";
import { SubmitHandler, useForm } from "react-hook-form";

interface MessageInputType {
  text: string;
  image: string | null;
}

const MessageInputArea = () => {
  const { register, setValue, handleSubmit, watch, reset } =
    useForm<MessageInputType>({
      defaultValues: {
        text: "",
        image: "",
      },
    });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const text = watch("text");
  const image = watch("image");

  const { sendMessage } = useChatStore();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (!files || files?.length === 0) {
      toast.error("No file selected");
      return;
    }

    const file = files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        // setImagePreview(reader.result);
        setValue("image", reader.result);
      } else {
        toast.error("Failed to load image preview");
      }
    };
    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    // setImagePreview(null);
    setValue("image", null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleSendMessage: SubmitHandler<MessageInputType> = async (data) => {
    // e.preventDefault();
    if (!data.text.trim() && !data.image) return;

    try {
      await sendMessage({
        text: data.text.trim(),
        image: data.image,
      });
      reset();
      // setText("");
      // setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <div className="p-4 w-full">
      {image && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <Image
              src={image}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <CircleX className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(handleSendMessage)}
        className="flex items-center gap-2"
      >
        <div className="flex-1 flex gap-2">
          <Input
            type="text"
            radius="sm"
            variant="bordered"
            className="w-full"
            placeholder="Type a message..."
            value={text}
            {...register("text")}
            // onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <Button
            type="button"
            isIconOnly
            variant="ghost"
            className={`flex ${image ? "text-emerald-500" : "text-zinc-400"}`}
            onPress={() => fileInputRef.current?.click()}
          >
            <ImagePlus size={20} />
          </Button>
        </div>
        <Button
          type="submit"
          isIconOnly
          variant="flat"
          disabled={!text.trim() && !image}
          className="cursor-pointer"
        >
          <Send size={22} />
        </Button>
      </form>
    </div>
  );
};

export default MessageInputArea;
