// src/app/api/messages/route.js

import connect from "@/utils/db";
import Message from "@/models/message";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect(); // Conectar a la base de datos
    const messages = await Message.find().sort({ createdAt: 1 }); // Obtener mensajes ordenados cronológicamente (de más antiguo a más reciente)
    
    return NextResponse.json(messages); // Devuelve los mensajes como respuesta JSON
  } catch (error) {
    return NextResponse.error(); // Si hay un error, devuelve un error
  }
}
