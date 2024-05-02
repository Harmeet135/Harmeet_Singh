import React, { useState, useRef, useEffect } from 'react';
import sendIcon from "../icons/sendIcon.png"
import regenIcon from "../icons/regenIcon.png"
import downarrow from "../icons/downarrow.png";

const PromptBox =({ onHide })=> {
  const [promptText, setPromptText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [generated , setGenerated] = useState(false);
  const promptBoxRef = useRef(null);

  const handleGenerate = () => {
    if (!generated && promptText) {
      const newText = { userText: promptText, generatedText: "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask." };
      setChatHistory([...chatHistory, newText]);
      setPromptText(''); 
      setGenerated(true);
    }
  };
  const handleInsertClick = () => {
    const latestGenerated = chatHistory[0]?.generatedText;
    if (latestGenerated) {
      // Use 'as HTMLElement' to assert the correct type
      const messageBox = document.querySelector(".msg-form__contenteditable") as HTMLElement;
      if (messageBox) {
        // Clear existing content
        messageBox.innerHTML = '';  // Optional: clear existing content
  
        // Create a new <p> element and set its text
        const newParagraph = document.createElement('p');
        newParagraph.innerText = latestGenerated;
  
        // Append the new <p> element to the message box
        messageBox.appendChild(newParagraph);
  
        // Dispatch an 'input' event to notify any handlers of the change
        const event = new Event('input', { bubbles: true });
        messageBox.dispatchEvent(event);
      }
    }
  };
  
  useEffect(() => {
    function handleClickOutside(event) {

      if (!event.target.closest("plasmo-csui")) {
        onHide();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onHide]);
  
  const handleInputChange = (e) => {
    e.stopPropagation();
    setPromptText(e.target.value);
  };
  return (
    <div ref={promptBoxRef} className='fixed w-full max-w-[500px] flex justify-center items-center dynamic-right lg:right-custom-right bottom-[28rem] z-50'>
    <div  className=' flex flex-col bg-[#F9FAFB] rounded-lg p-4 w-full mx-4  gap-4 items-center shadow-md'>
        <div className="w-full overflow-y-auto max-h-[300px] mb-4">
          {chatHistory.map((entry, index) => (
            <div key={index} className="flex flex-col w-full justify-between px-4 py-2 gap-4">
              <p className="bg-[#DFE1E7] rounded-md px-4 py-2 max-w-[75%] text-right ml-auto text-[#666D80]">{entry.userText}</p>
              <p className="bg-[#DBEAFE] rounded-md px-4 py-2 max-w-[75%] text-left mr-auto text-[#666D80]">{entry.generatedText}</p>
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col items-end px-4 gap-4">
          <input 
            className='border-grey-200 text-black border-2 w-full px-2 py-1' 
            type="text" 
            placeholder='Your Prompt'
            value={promptText}
            onChange={handleInputChange}
          />
          <div className='flex gap-5'>
            {generated && (
              <button 
                className='flex gap-2 items-center border-[2px] border-[#666D80] text-[#666D80] rounded-md px-4' 
                onClick={handleInsertClick}
              >
                <img className='h-[12px]' src={downarrow} alt="Insert" />
                Insert
              </button>
            )}
            <button 
              className='flex gap-2 items-center bg-[#3B82F6] text-white rounded-md px-4 py-2' 
              onClick={handleGenerate}
            >
              {generated ?  <img className='h-[12px]' src={regenIcon} alt="Regenerate" /> : <img className='h-[12px]' src={sendIcon} alt="Generate" />}
              {generated ? "Regenerate" : "Generate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromptBox;