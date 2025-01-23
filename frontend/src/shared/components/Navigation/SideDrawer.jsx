
import ReactDOM from "react-dom";
import "./SideDrawer.css";
import { CSSTransition } from "react-transition-group";
const SideDrawer = (props) => {
  const { show, children } = props;
  const content = (
    <CSSTransition
      in={show}
      timeout={1000}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={props.onClick}>{children}</aside>
    </CSSTransition>
  );
  return ReactDOM.createPortal(content, document.getElementById("drawer"));
};

export default SideDrawer;
