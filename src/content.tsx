import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import { useState } from "react"
import PromptBox from "~features/promptbox"
import openprom from "./icons/openprom.png"

export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () => {
  const messageForm = document.querySelector(".msg-form__contenteditable");
  if (messageForm) {
    return {
      element: messageForm,
      insertPosition: "beforeend" 
    };
  }
  console.error("Target element not found.");
  return null;
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  const [showPrompt, setShowPrompt] = useState(false)
  const togglePrompt = () => setShowPrompt(true);
  const hidePrompt = () => setShowPrompt(false);

  return (
    <>
    <div className="absolute z-50 flex w-8 right-0 bottom-0">
    <button onClick={togglePrompt}>
      <img src={openprom} alt="" />
    </button>
    </div>
    {showPrompt && <PromptBox onHide={hidePrompt} />}
    </>
  )
}

export default PlasmoOverlay
