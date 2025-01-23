/* eslint-disable react/prop-types */
import PlaceItem from "./PlaceItem";

import { Card } from "@mui/material";

import { useContext, useState } from "react";
import Button from "../../shared/components/UIElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import { PlaceShareContext } from "../../shared/context/PlaceShareContextProvider";
import "./PlaceItemList.css";

const PlaceItemList = (props) => {
  const { isLoggedIn } = useContext(PlaceShareContext);
  const [showModal, setShowModal] = useState(false);
  const openModalHandler = () => setShowModal(true);
  const closeModalHandler = () => setShowModal(false);
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <>
          <Modal
            show={showModal}
            onCancel={closeModalHandler}
            header="Sign In Required"
            contentClass="place-items__modal-content"
            headerClass="place-items__modal-header"
            footerClass="place-items__modal-actions"
            footer={
              <div>
                <Button to="/final-proj/places/new" inverse onClick={closeModalHandler}>
                  Close
                </Button>
                <Button to="/final-proj/auth">Sign-In</Button>
              </div>
            }
          >
            <h2>You need to sign in to share a place.</h2>
          </Modal>
          <Card sx={{ padding: ".75rem" }}>
            <h2>No places found. Maybe create one?</h2>
            {isLoggedIn && <Button to="/place/new">Share Place</Button>}
            {!isLoggedIn && (
              <Button onClick={openModalHandler}>Share Place</Button>
            )}
          </Card>
        </>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceItemList;
