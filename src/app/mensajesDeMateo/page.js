"use client";
import { useState, useEffect } from "react";

export default function MensajesDeMateo() {
  const [messages, setMessages] = useState([]);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch("/api/mateo/messages");
      const data = await response.json();
      setMessages(data || []);
    };

    fetchMessages();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/mateo/messages/${id}`, { method: "DELETE" });
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (error) {
      console.error("Error al eliminar el mensaje:", error);
    }
  };

  const handleEdit = (id, currentMessage) => {
    setEditingMessage(id);
    setEditedContent(currentMessage);
  };

  const handleSaveEdit = async (id) => {
    try {
      await fetch(`/api/mateo/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: editedContent }),
      });
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === id ? { ...msg, message: editedContent } : msg
        )
      );
      setEditingMessage(null);
    } catch (error) {
      console.error("Error al editar el mensaje:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-purple-200 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-5xl font-cursive text-pink-600">
          💌 Mensajes de Mateo
        </h1>
        <p className="mt-4 text-lg text-gray-600 italic">
          Aquí puedes ver tus mensajes. ❤️
        </p>
        <div className="mt-10 space-y-6">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg._id}
                className="p-6 border-l-4 border-pink-400 bg-pink-50 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                {editingMessage === msg._id ? (
                  <div>
                    <textarea
                      className="w-full p-3 border-2 border-pink-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      rows={3}
                    />
                    <div className="flex justify-end mt-4 space-x-2">
                      <button
                        className="bg-green-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-green-600"
                        onClick={() => handleSaveEdit(msg._id)}
                      >
                        Guardar
                      </button>
                      <button
                        className="bg-gray-400 text-white py-2 px-6 rounded-full shadow-lg hover:bg-gray-500"
                        onClick={() => setEditingMessage(null)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-xl text-gray-700 font-cursive">
                      {msg.message}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Enviado el:{" "}
                      <span className="font-semibold">
                        {formatDate(msg.createdAt)}
                      </span>
                    </p>
                    <div className="flex justify-end mt-4 space-x-2">
                      <button
                        className="bg-blue-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-600"
                        onClick={() => handleEdit(msg._id, msg.message)}
                      >
                        Editar
                      </button>
                      <button
                        className="bg-red-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-red-600"
                        onClick={() => handleDelete(msg._id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-500">No hay mensajes aún.</p>
          )}
        </div>
      </div>
    </div>
  );
}
