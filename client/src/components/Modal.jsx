import ReactDOM from "react-dom"

function Modal() {
  return ReactDOM.createPortal(
    <>
      <div
        className="absolute inset-0 bg-gray-400 bg-opacity-60"
        onClick={handleClick}
      ></div>
    </>,
    document.getElementById("modal-container")
  )
}

export default Modal
