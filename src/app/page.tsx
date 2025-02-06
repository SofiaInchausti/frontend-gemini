'use client'; // Ensures this component runs on the client side in a Next.js application.

import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import Loading from './loading';
import sendRequest from './functions';
import GeminiResponse from './types';

export default function Home() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // State for storing user menssages and Gemini responses
  const [messages, setMessages] = useState<
    { user: string; content: null | GeminiResponse }[]
  >([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // This effect ensures the chat scrolls to the bottom every time a new message is added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length >= 225) {
      setError('The text should no be more than 225 characters');
      return;
    }
    setError('');
    setInput(e.target.value);
  };

  // Handles form submission and sends the user input
  const handleSubmit = async () => {
    if (input.trim().length < 5) {
      setError('The text must be at least 5 characters.');
      return;
    }
    setError('');
    setIsLoading(true);
    // New user message with null response until gemini response
    const userMessage = { user: input, content: null };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      let inputText;

      // If there are previous messages, accumulate incomplete ones
      if (messages.length > 0) {
        let accumulatedInput = input;
        let i = messages.length - 1;

        while (i >= 0 && messages[i]?.content?.complete === false) {
          accumulatedInput = messages[i].user + ' ' + accumulatedInput;
          i--;
        }
        inputText = { input: accumulatedInput };
      } else {
        inputText = { input };
      }

      setInput('');

      // Send request to the API
      const response = await sendRequest(inputText);

      // Update the last message with the received response
      setMessages((prevMessages) => {
        if (prevMessages.length === 0) return prevMessages;
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1].content =
          response || 'No response received';
        return updatedMessages;
      });
    } catch (error) {
      setError('There was an error processing your request.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-12 h-screen">
      {/* Sidebar with instructions */}
      <div className="col-span-4 flex flex-col bg-[#F4F6F9] p-9 items-center">
        <h3 className="text-xl font-semibold mb-9">Welcome!</h3>
        <p className="font-medium mb-2">
          You can describe an accident or an event, and I will extract relevant
          information such as:
          <strong>
            {' '}
            Date, Location, Description, Injuries, Ownership status,
          </strong>{' '}
          and <strong>Completion status.</strong>
          <br />
          <br />
          Guidelines: Your input must be between 5 and 500 characters. If your
          description is incomplete, I will ask for the missing details to
          ensure a complete understanding of the context.
        </p>
        <p>
          Here’s an example: &quot;My car was involved in a collision on Avenida
          Corrientes yesterday afternoon. No injuries were reported.&quot;
          <br />
          Once you provide the information, I&apos;ll process it and give you a
          detailed response. Feel free to ask questions if you need
          clarification!
        </p>
      </div>

      {/* Main chat section */}
      <div className="col-span-8 flex flex-col justify-end px-8 overflow-y-hidden">
        <div ref={chatContainerRef} className="overflow-y-auto mb-8">
          {messages &&
            messages.map((message, index) => (
              <div key={index} className="py-6">
                {/* User message */}
                <div className="grid grid-cols-12 py-5 shadow-lg mb-8 px-4 rounded-[18px]">
                  <div className="pr-2 col-span-4">User</div>
                  <div className="col-span-6">{message.user}</div>
                </div>

                {/* AI response */}
                <div className="grid grid-cols-12 pb-4  px-4">
                  <div className="pr-2 col-span-4">Gemini Response</div>
                  {isLoading && message.content === null ? (
                    <Loading />
                  ) : (
                    <div className="col-span-6">
                      <p>Date: {message.content?.date || ''}</p>
                      <p>Description: {message.content?.description}</p>
                      <p>
                        Injuries: {message.content?.injuries ? 'true' : 'false'}
                      </p>
                      <p>Location: {message.content?.location || ''}</p>
                      <p>Owner:{message.content?.owner ? 'true' : 'false'}</p>
                      <p>
                        Complete:{message.content?.complete ? 'true' : 'false'}
                      </p>
                      <p>Question:{message.content?.question}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* Input area */}
        <div className="relative">
          <label htmlFor="textArea"></label>
          <textarea
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // Evita el salto de línea
                handleSubmit();
              }
            }}
            onChange={handleChange}
            value={input}
            id="textArea"
            placeholder="Type your incident"
            className="border-2 rounded-3xl border-[#452966] overflow-y-auto resize-none whitespace-pre-wrap w-full pl-4 pr-8 content-center"
          ></textarea>
          <div className="absolute right-2 top-[17%] flex items-center">
            <button
              disabled={isLoading}
              onClick={handleSubmit}
              className="bg-[#9F58FF] p-1 rounded-full h-9 w-9 transition-transform duration-300 hover:bg-[#452966]  flex flex-col justify-center items-center overflow-y-hidden;"
            >
              <span className="hover:transform  hover:duration-300 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10 16.6667V3.33334"
                    stroke="#F4F3F3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M4.16602 9.16668L9.99935 3.33334L15.8327 9.16668"
                    stroke="#F4F3F3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && <div className="text-red-400 font-medium py-1">{error}</div>}
      </div>
    </div>
  );
}
