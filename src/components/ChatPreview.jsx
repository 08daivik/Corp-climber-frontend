import React from 'react';

const ChatPreview = ({ messages }) => (
  <div className="bg-gray-100 border p-4 rounded max-h-64 overflow-y-auto">
    <h2 className="text-lg font-semibold mb-2">Chat Preview</h2>
    <ul className="space-y-2">
      {messages.map((msg, i) => (
        <li key={i} className="bg-white p-2 rounded shadow-sm">
          {msg.text}
        </li>
      ))}
    </ul>
  </div>
);

export default ChatPreview;
