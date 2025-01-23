import { Paper } from "@mui/material";

import { motion } from "framer-motion";
import { usePlaceShare } from "../../shared/hooks/usePlaceShare";
import UsersItemList from "../components/UsersItemList";

export default function UsersPage()
{
  const { users, places } = usePlaceShare()
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "inherit",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBlock: "1rem",
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        style={{ width: "100%", height: "100%" }}
      >
        <UsersItemList users={users} places={places} />
      </motion.div>
    </Paper>
  );
}
