/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

import { Button, Card, useMediaQuery } from "@mui/material";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import Map from "../../shared/components/UIElements/Map";
import Modal from "../../shared/components/UIElements/Modal";
import { usePlaceShare } from "../../shared/hooks/usePlaceShare";
import "./PlaceItem.css";

const PlaceItem = (props) =>
{
  const { isLoggedIn, deletePlace } = usePlaceShare();
  const responsiveWidth = {
    width: {
      xs: 135, // theme.breakpoints.up('xs')
      sm: 134.785, // theme.breakpoints.up('sm')
      md: 120, // theme.breakpoints.up('md')
      lg: 140, // theme.breakpoints.up('lg')
      xl: 142, // theme.breakpoints.up('xl')
    },
  };

  const navTo = useNavigate();
  const [isHover, setIsHover] = useState({
    viewModalBtn: false,
    editModalBtn: false,
    deleteModalBtn: false,
    deletePlaceBtn: false,
  });
  const [clicked, setClicked] = useState(false);

  const [showModal, setShowModal] = useState(false); //

  const showModalHandler = () =>
  {
    setShowModal(true);
  };
  const closeMapHandler = () =>
  {
    setShowModal(false);
  };
  const setHover = (name) =>
  {
    setIsHover((prevHover) => ({ ...prevHover, [name]: true }));
  };
  const setLeave = (name) =>
  {
    setIsHover((prevHover) => ({ ...prevHover, [name]: false }));
  };

  return (
    <>
      <Modal
        show={showModal}
        onCancel={closeMapHandler}
        onClose={closeMapHandler}
        header={props.address}
        contentClass="place-item-map__modal-content"
        footerClass="place-item-map__modal-actions"
        footer={
          <Button variant="contained" onClick={closeMapHandler}>
            CLOSE
          </Button>
        }
      >
        <div className="map-container">
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={clicked}
        onClose={() => setClicked(false)}
        header="Are you sure?"
        contentClass="place-item-deletion__modal-content"
        footerClass="place-item-deletion__modal-actions"
        footer={
          <div>
            <Button
              color="error"
              variant={isHover.deletePlaceBtn ? "outlined" : "contained"}
              onMouseOver={() => setHover("deletePlaceBtn")}
              onMouseLeave={() => setLeave("deletePlaceBtn")}
              onClick={() =>
              {
                deletePlace(props.id);
                setClicked(false);
              }}
            >
              DELETE
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={() => setClicked(false)}
            >
              CANCEL
            </Button>
          </div>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button
              sx={responsiveWidth}
              color="success"
              variant={isHover.viewModalBtn ? "outlined" : "contained"}
              onMouseOver={() => setHover("viewModalBtn")}
              onMouseLeave={() => setLeave("viewModalBtn")}
              onClick={showModalHandler}
            >
              View on Map
            </Button>
            {isLoggedIn && (
              <Fragment>
                <Button
                  color="primary"
                  variant={isHover.editModalBtn ? "contained" : "outlined"}
                  onMouseOver={() => setHover("editModalBtn")}
                  onMouseLeave={() => setLeave("editModalBtn")}
                  onClick={() => navTo(`/places/${props.id}`)}
                >
                  Edit
                </Button>
                <Button
                  color="error"
                  variant={isHover.deleteModalBtn ? "contained" : "outlined"}
                  onMouseOver={() => setHover("deleteModalBtn")}
                  onMouseLeave={() => setLeave("deleteModalBtn")}
                  onClick={() => setClicked((prevClick) => !prevClick)}
                >
                  Delete
                </Button>
              </Fragment>
            )}
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
