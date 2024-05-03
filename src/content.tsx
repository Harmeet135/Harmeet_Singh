import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import { useState } from "react"
import PromptBox from "~features/promptbox"
import openprom from "./icons/openprom.png"

// Configuration for the Plasmo content script, specifying URL patterns
export const config: PlasmoCSConfig = {
  matches: ["https://*.linkedin.com/*"]
}

// Function to determine where to inject the component in the DOM
export const getInlineAnchor: PlasmoGetInlineAnchor = () => {
  const messageForm = document.querySelector(
    ".msg-form__contenteditable"
  ) as HTMLElement | null
  if (messageForm) {
    return {
      element: messageForm,
      insertPosition: "beforeend" // Specify the insertion position
    }
  }
  console.error("Target element not found.")
  return null
}

// Function to create a style element with custom CSS for the component
export const getStyle = (): HTMLStyleElement => {
  const style = document.createElement("style")
  style.textContent = cssText 
  return style
}

// Main React Functional Component for the overlay
const PlasmoOverlay: React.FC = () => {
  // State to control visibility of the prompt box
  const [showPrompt, setShowPrompt] = useState<boolean>(false)

  // Function to toggle the visibility of the prompt box
  const togglePrompt = () => setShowPrompt((prev) => !prev)

  return (
    <>
      {!showPrompt ? (
        // Button to open the prompt box
        <div className="absolute z-50 flex w-8 right-0 bottom-[-2rem]">
          <button onClick={togglePrompt}>
            <img src={openprom} alt="Open prompt" />
          </button>
        </div>
      ) : (
        // Render the PromptBox component with onHide handler
        <PromptBox onHide={() => setShowPrompt(false)} />
      )}
    </>
  )
}

export default PlasmoOverlay
