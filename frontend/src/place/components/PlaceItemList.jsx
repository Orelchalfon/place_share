/* eslint-disable react/prop-types */
import PlaceItem from "./PlaceItem";

import { Card } from "@mui/material";

import { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../shared/components/UIElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import { usePlaceShare } from "../../shared/hooks/usePlaceShare";
import "./PlaceItemList.css";

const PlaceItemList = (props) =>
{
  const navigaTo = useNavigate();
  const { isLoggedIn, userId } = usePlaceShare();
  const { uId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const openModalHandler = () =>
  {
    if (!isLoggedIn) {
      setShowModal(true);
    }
    else {
      navigaTo("/places/new");
    }
  }
  const closeModalHandler = () => setShowModal(false);

  if (props.items.length === 0) {
    return (
      <div className="center">
        <Fragment>
          <Modal
            show={showModal}
            onCancel={closeModalHandler}
            header="Sign In Required"
            contentClass="place-items__modal-content"
            headerClass="place-items__modal-header"
            footerClass="place-items__modal-actions"
            footer={
              <div>
                <Button to="/places/new" inverse onClick={closeModalHandler}>
                  Close
                </Button>
                <Button to="/auth">Sign-In</Button>
              </div>
            }
          >
            <h2>You need to sign in to share a place.</h2>
          </Modal>
          <Card sx={{ padding: ".75rem", width: `clamp('250px', "70vw", '500px')` }}>

            <h2>
              No places found🥲.
            </h2>
            <h3>
              {uId !== userId && isLoggedIn && "Notify the user ?"}
            </h3>

            {
              uId === userId && isLoggedIn && <Button onClick={openModalHandler} style={{ alignSelf: "flex-end" }}>Share Place</Button>
            }
          </Card>
        </Fragment>
      </div >
    );
  }
  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}

          creatorId={place.creator}
          coordinates={place.location}
          onDelete={props.onDeletePlace}

        />
      ))}
    </ul>
  );
};

export default PlaceItemList;
