import cssText from "data-text:~style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import { CountButton } from "~features/CountButton"

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
  return (
    <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
      <CountButton />
    </div>
  )
}

export default PlasmoOverlay
