import React, { useState } from "react";
import axios from "axios";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (userMessage.trim() === "") return;

    // Crea el nuevo mensaje
    const newMessages = [...messages, { role: "user", parts: [userMessage] }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await axios.post('https://gaiavet-back.onrender.com/chat', {
        question: userMessage,
        history: newMessages.map(msg => ({
        role: msg.role,
        parts: msg.parts,
        })), // Asegúrate de que el historial esté en el formato correcto
      });

      // Asegúrate de que la respuesta contenga un historial correcto
      const botMessages = response.data.history || [];
      setMessages([...newMessages, ...botMessages.map(msg => ({ role: msg.role, parts: msg.parts }))]);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setMessages([...newMessages, { role: "bot", parts: ["Error en la conexión."] }]);
    } finally {
      setUserMessage("");
      setLoading(false);
    }
  };

  return (
    <div className="w-full mt-10 max-w-md p-4 bg-gray-100 shadow-md rounded-lg">
      <div className="h-[40rem] overflow-y-auto bg-white p-4 rounded">
        {Array.isArray(messages) && messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-2 rounded-lg ${msg.role === "user" ? "bg-blue-200 text-right" : "bg-gray-200 text-left"}`}
          >
            {msg.parts.join(" ")}
          </div>
        ))}
        {loading && (
          <div className="my-2 p-2 rounded-lg bg-gray-200 text-left">
            El bot está respondiendo...
          </div>
        )}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l-lg focus:outline-none"
          placeholder="Escribe un mensaje..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} // Enviar con Enter
        />
        <button
          onClick={handleSendMessage}
          className="bg-teal-300 text-black p-2 rounded-r-lg hover:bg-teal-400"
          disabled={loading} // Desactivar mientras se está cargando
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
