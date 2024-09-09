import React, { useState } from "react";
import SideBar from "../Components/Sidebar";

const VoiceRecorder = () => {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [response, setresponse] = useState("");

  // Check for browser compatibility
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US"; // Set language as per your requirement

  // Function to handle speech result
  recognition.onresult = (event) => {
    const speechToText = event.results[0][0].transcript;
    setText(speechToText);
    handleAIresponse();
    readMessage();
  };

  recognition.onerror = (event) => {
    console.error("Error occurred in recognition: " + event.error);
  };

  // Start recording when button is clicked
  const startRecording = () => {
    setIsRecording(true);
    recognition.start();
  };

  // Stop recording after recognizing the speech
  recognition.onend = () => {
    setIsRecording(false);
  };

  // Function to read the message aloud
  const readMessage = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(response);
    synth.speak(utterance);
  };

  const handleAIresponse = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/dashboard/airesponse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: text,
          }),
        }
      );

      const responseData = await response.json();
      setresponse(responseData.aiResponse);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(text);
  return (
    <>
      <SideBar />
      <div className="container-full flex min-h-[100vh] bg-[url('index_background.jpg')] bg-top pt-24 md:pt-0 flex-col text-center ">
        <div className="m-auto">
          <h1 className="text-3xl font-mono font-bold md:text-4xl">AlleyBot</h1>

          <button
            onClick={startRecording}
            disabled={isRecording}
            className="bg-[#f0f8ff30] border border-white backdrop-blur shadow-2xl rounded-full my-2 w-72 h-72 sm:w-96 sm:h-96 md:w-[55vh] md:h-[55vh] text-xl"
            title="Start Recording"
          >
            {isRecording ? "Listening..." : "Click to Speak"}
          </button>

          <div className="text-lg">You: {text}</div>
          <p className="px-3 text-lg">
            {response ? response : "AI Response will appear here..."}
          </p>
        </div>
      </div>
    </>
  );
};

export default VoiceRecorder;
