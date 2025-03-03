import { Avatar, Card } from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import "./UserItem.css";
const UserItem = (user) =>
{
  console.log(`UserItem:`, user);
  return (
    //the error message appears to be the animatedTime props
    <motion.li
      className="user-item"
      variants={{
        hidden: { x: -100, y: 100, opacity: 0, scale: 0.35 },
        visible: { x: 0, y: 0, opacity: 1, scale: 1 },
      }}
      transition={{ type: "spring", stiffness: 20 }}
    >
      <Card className="user-item__content">
        <Link to={`/${user.id}/places`}>
          <div className="user-item__img">
            <Avatar
              sx={{ width: 100, height: 100 }}
              src={`${import.meta.env.VITE_ASSETS_URL} /${user.imgUrl}`}
              alt={user.name}
            />
          </div>
          <div className="user-item__info">
            <h2>{user.name}</h2>
            <h3>
              {(user.count < 1 && "No") || user.count}{" "}
              {user.count === 0 || user.count > 1 ? "Places" : "Place"}
            </h3>
          </div>
        </Link>
      </Card>
    </motion.li>
  );
};
export default UserItem;
