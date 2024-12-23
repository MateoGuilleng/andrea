// src/app/api/[sender]/messages/[id]/route.js

import connect from "@/utils/db"; // Asegúrate de tener la conexión a la base de datos configurada
import Message from "@/models/message"; // Importa tu modelo de mensaje
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
  const { id, sender } = params; // Obtenemos el ID del mensaje y el remitente desde los parámetros
  await connect();

  try {
    const { message } = await request.json(); // Obtener el nuevo contenido del mensaje
    if (!message) {
      return new NextResponse("El mensaje no puede estar vacío", { status: 400 });
    }

    // Buscar y actualizar el mensaje por ID
    const updatedMessage = await Message.findOneAndUpdate(
      { _id: id, sender }, // Buscar por ID y remitente
      { message }, // Actualizar el contenido
      { new: true } // Devolver el documento actualizado
    );

    if (!updatedMessage) {
      return new NextResponse("Mensaje no encontrado", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedMessage), { status: 200 });
  } catch (error) {
    console.error("Error al actualizar el mensaje:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id, sender } = params; // Obtenemos el ID del mensaje y el remitente desde los parámetros
  await connect();

  try {
    // Buscar y eliminar el mensaje por ID y remitente
    const deletedMessage = await Message.findOneAndDelete({ _id: id, sender });

    if (!deletedMessage) {
      return new NextResponse("Mensaje no encontrado", { status: 404 });
    }

    return new NextResponse("Mensaje eliminado correctamente", { status: 200 });
  } catch (error) {
    console.error("Error al eliminar el mensaje:", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
};
