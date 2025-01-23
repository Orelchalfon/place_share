import ReactDOM from "react-dom";
import "./BackDrop.css";
const BackDrop = ({ onClick }) => {
  return ReactDOM.createPortal(
    <div onClick={onClick} className="backdrop"></div>,
    document.getElementById("back_drop")
  );
};

export default BackDrop;
