import { useState, useEffect } from "react";

const TimeCapsule = ({ targetDate, onSubmitMessage }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState(""); // Inicialmente no hay remitente
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [error, setError] = useState(""); // Error en caso de que no se seleccione un remitente
  const [messages, setMessages] = useState([]); // Para almacenar los mensajes recibidos

  // Contador de cuenta regresiva
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeDifference = targetDate - now; // Diferencia de tiempo en milisegundos

      if (timeDifference <= 0) {
        clearInterval(interval);
        setTimeLeft(0); // Establece el tiempo restante a 0
      } else {
        setTimeLeft(timeDifference); // Actualiza el tiempo restante
      }
    }, 1000); // Se ejecuta cada segundo

    return () => clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
  }, [targetDate]);

  // Función para formatear el tiempo en formato "días, horas, minutos, segundos"
  const formatTime = (timeInMilliseconds) => {
    const totalSeconds = Math.floor(timeInMilliseconds / 1000);

    // Calcular los días, horas, minutos y segundos
    const days = Math.floor(totalSeconds / (3600 * 24)); // Total de días
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600); // Horas restantes
    const minutes = Math.floor((totalSeconds % 3600) / 60); // Minutos restantes
    const seconds = totalSeconds % 60; // Segundos restantes

    // Crear la cadena con los días, horas, minutos y segundos
    let timeString = "";
    if (days > 0) timeString += `${days} día${days > 1 ? "s" : ""} `;
    if (hours > 0 || days > 0)
      timeString += `${hours} hora${hours !== 1 ? "s" : ""} `;
    timeString += `${minutes} minuto${minutes !== 1 ? "s" : ""} `;
    timeString += `${seconds} segundo${seconds !== 1 ? "s" : ""}`;

    return timeString.trim(); // Devolver la cadena formateada
  };

  // Manejar el envío del mensaje
  const handleSubmit = () => {
    if (!sender) {
      setError("Hola andrea, no se te olvide marcar quien eres jaksjds");
      return;
    }

    if (message.trim()) {
      setSubmittedMessage(message); // Guardar el mensaje enviado
      onSubmitMessage(message, sender); // Llamar la función onSubmitMessage para manejar el envío
      setMessage(""); // Limpiar el campo de texto
      setError(""); // Limpiar error
    } else {
      setError("Escribe algo :D");
    }
  };

  // Obtener los mensajes cuando el contador llegue a 0
  useEffect(() => {
    if (timeLeft === 0) {
      fetch("/api/messages") // Realiza la petición GET a la ruta '/api/messages'
        .then((response) => response.json())
        .then((data) => setMessages(data)) // Al recibir la respuesta, guardamos los mensajes en el estado
        .catch((error) => console.error("Error fetching messages:", error));
    }
  }, [timeLeft]);

  return (
    <div className="w-full text-center mt-10 card bg-card-white-purple dark:bg-card-dark-purple ">
      <h2 className="text-2xl font-semibold text-pastel-blue text-text-blaack dark:text-text-whitee ">
        Mini cápsula del Tiempo :3
      </h2>

      <div>
        <p className="text-lg text-text-blaack dark:text-text-whitee mt-4">
          Tiempo restante: {formatTime(timeLeft)}
        </p>
      </div>

      {/* Formulario para el mensaje */}
      <div className="mt-8">
        <h3 className="text-xl text-text-blaack dark:text-text-whitee">😊</h3>
        <textarea
          className="mt-4 p-3 w-full text-text-blaack dark:text-text-whitee card border-2 border-pastel-blue rounded-lg bg-card-white-purple dark:bg-card-dark-purple"
          placeholder="Escribe tu mensaje aquí..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
        ></textarea>

        <div className="flex flex-wrap w-full justify-around sm:flex-nowrap">
          {/* Select para elegir quién es */}
          <div className="mt-4 ">
            <label className="text-text-blaack dark:text-text-whitee  ">
              Soy:
            </label>
            <select
              className="ml-2 p-2 text-text-blaack dark:text-text-whitee bg-card-white-purple dark:bg-card-dark-purple border-2 card border-pastel-blue rounded-lg"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
            >
              <option value="">Hmmmm</option>
              <option value="mateo">Mateo</option>
              <option value="andrea">Andrea</option>
            </select>
          </div>

          {/* Botón para enviar mensaje */}
          <div className="mt-4">
            <button
              className="dark:bg-purple-950/45 bg-purple-400/45 text-text-blaack dark:text-text-whitee p-3 rounded-full shadow-lg hover:bg-pastel-pink"
              onClick={handleSubmit}
            >
              Enviar mensaje
            </button>
          </div>
        </div>
        {error && (
          <p className="text-text-blaack dark:text-text-whitee text-sm mt-2">
            {error}
          </p>
        )}
      </div>

      {/* Mensaje enviado */}
      {submittedMessage && (
        <div className="mt-8 card bg-pastel-pink p-6 rounded-lg shadow-lg">
          <h3 className="text-xl text-text-blaack dark:text-text-whitee">
            Mensaje enviado:
          </h3>
          <div className="text-lg text-text-blaack dark:text-text-whitee">
            Puedes mirar tus mensajes dando click aqui:{" "}
            <a
              href={`/mensajesDe${sender}`}
              className="text-blue-700 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-700"
            >
              {sender}
            </a>
          </div>
        </div>
      )}

      {/* Mostrar todos los mensajes después de que el contador llegue a 0 */}
      {timeLeft === 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-text-blaack dark:text-text-whitee">
            Feliz año nuevoooo :3 aqui estan todos los mensajes:
          </h3>
          <div className="mt-4 space-y-4">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className="dark:bg-purple-950/45 bg-purple-400/45 card p-4 rounded-lg shadow-md"
                >
                  <p className="text-lg text-text-blaack dark:text-text-whitee">
                    {msg.message}
                  </p>
                  <p className="text-sm text-text-blaack dark:text-text-whitee mt-2">
                    Enviado por:{" "}
                    <span className="font-semibold">{msg.sender}</span> el{" "}
                    <span className="font-semibold">
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-lg text-pastel-blue">No hay mensajes aún.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeCapsule;
