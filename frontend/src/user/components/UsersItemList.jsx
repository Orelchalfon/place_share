/* eslint-disable react/prop-types */
import { Card } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import Button from "../../shared/components/UIElements/Button";
import { usePlaceShare } from "../../shared/hooks/usePlaceShare";
import UserItem from "./UserItem";
import "./UsersItemList.css";

const UsersItemList = ({ users }) =>
{
  const { isLoggedIn } = usePlaceShare();
  const navigate = useNavigate();
  const navigaToAuthWithState = () =>
  {
    navigate('/auth', { state: { from: '/users', isLogin: users.length, } });
  }
  if (!isLoggedIn && users.length === 0) return (
    <Card sx={{
      width: "clamp(250px, 70vw, 400px)",
      padding: ".75rem",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",

    }}>
      <h2>
        No users found🥲.<br />
        Maybe create one?
      </h2>

      <Button onClick={navigaToAuthWithState} style={{
        alignSelf: "flex-end",
      }}>Sign Up</Button>
    </Card>
  )
  console.log(users);
  const usersList = users.map((user) =>
  {

    return (
      <UserItem
        key={user.id}
        id={user.id}
        name={user.name}
        email={user.email}
        imgUrl={user.image}
        count={user.places.length}
      />
    );
  });
  return (
    <motion.ul
      className="users-list"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.15,
            type: "spring",
          },
        },
      }}
    >
      {usersList}
    </motion.ul>
  );
};
export default UsersItemList;
