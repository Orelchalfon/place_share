import PropTypes from "prop-types";
import { GridLoader } from "react-spinners";
const LoadingGridLayer = ({ asOverlay }) => (
  <div className={`center ${asOverlay && "loading-spinner__overlay"}`}>
    <GridLoader color="#f50057" size={50} />
  </div>
);
LoadingGridLayer.propTypes = {
  asOverlay: PropTypes.bool,
};
export default LoadingGridLayer;