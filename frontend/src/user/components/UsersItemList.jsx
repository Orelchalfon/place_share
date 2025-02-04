/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import UserItem from "./UserItem";
import "./UsersItemList.css";

const UsersItemList = ({ users }) =>
{
  if (users && users.length === 0) return <div style={{ textAlign: "center" }}>UsersNotFound</div>;
  const usersList = users.map((user) =>
  {
    const userPlaces = user.places.filter((place) => place.creator === user.id);
    return (
      <UserItem
        key={user._id}
        id={user._id}
        name={user.name}
        email={user.email}
        imgUrl={user.imgUrl}
        count={userPlaces?.length}
      />
    );
  });
  return (
    <motion.ul
      className="users-list"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {usersList}
    </motion.ul>
  );
};
export default UsersItemList;
