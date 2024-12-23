import Message from "@/models/message";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request, { params }) => {
  const { sender } = params;
  const validSenders = ["mateo", "andrea"];

  if (!validSenders.includes(sender)) {
    return new NextResponse("Invalid sender", { status: 400 });
  }

  const { message } = await request.json();
  if (!message) {
    return new NextResponse("Message cannot be empty", { status: 400 });
  }

  try {
    await connect();

    const newMessage = new Message({ sender, message });
    await newMessage.save();

    return new NextResponse(JSON.stringify(newMessage), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
  }
};

export const GET = async (request, { params }) => {
  const { sender } = params;
  const validSenders = ["mateo", "andrea"];

  if (!validSenders.includes(sender)) {
    return new NextResponse("Invalid sender", { status: 400 });
  }

  try {
    await connect();

    const messages = await Message.find({ sender }).sort({ createdAt: -1 });
    return new NextResponse(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: error.message }), { status: 500 });
  }
};
