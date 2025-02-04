import { Paper } from "@mui/material";

import { motion } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import { GridLoader } from "react-spinners";
import useHttpClient from "../../shared/hooks/http-hook";
import { usePlaceShare } from "../../shared/hooks/usePlaceShare";
import UsersItemList from "../components/UsersItemList";

export default function UsersPage()
{
  const { isLoading, sendRequest } = useHttpClient();
  const { places } = usePlaceShare()
  const [loadedUsers, setLoadedUsers] = useState();
  useEffect(() =>
  {
    const fetchUsers = async () =>
    {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/users'
        );
        setLoadedUsers(responseData.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [sendRequest]);

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
      <Suspense fallback={<div className="center">
        <GridLoader color="#f50057" loading={isLoading} size={50} />
      </div>}
      >
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
      </Suspense>
    </Paper >
  );
}
