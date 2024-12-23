import { useState, useEffect } from "react";
import ThemeToggleButton from "@/components/ThemeToggleButton";

export default function MensajesDeAndrea() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch("/api/andrea/messages");
      const data = await response.json();
      setMessages(data || []);
    };

    fetchMessages();
  }, []);

  return (
    <div className="w-full p-10 text-center">
      <ThemeToggleButton className="z-30"/>
      <h1 className="text-2xl font-bold">Mensajes de Andrea</h1>
      <div className="mt-5">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md mt-3">
              {msg.message}
            </div>
          ))
        ) : (
          <p>No hay mensajes aún.</p>
        )}
      </div>
    </div>
  );
}
