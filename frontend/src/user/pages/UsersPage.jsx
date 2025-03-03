import { Paper } from "@mui/material";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LoadingGridLayer from "../../shared/components/UIElements/LoadingGrid";
import useHttpClient from "../../shared/hooks/http-hook";
import UsersItemList from "../components/UsersItemList";

export default function UsersPage()
{
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState([]);
  useEffect(() =>
  {
    const fetchUsers = async () =>
    {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/users`
        );
        setLoadedUsers(responseData.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();

  }, [sendRequest]);

  useEffect(() =>
  {

    if (loadedUsers.length > 50) {
      window.location.reload();
    }
    if (loadedUsers.length === 0) {
      window.location.reload();
    }
  }, [loadedUsers])

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
      {
        (isLoading || !loadedUsers) && <LoadingGridLayer asOverlay />
      }
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        style={{ width: "100%", height: "100%" }}
      >

        {
          !isLoading && loadedUsers && <UsersItemList users={loadedUsers} />
        }

      </motion.div>

    </Paper >
  );
}
