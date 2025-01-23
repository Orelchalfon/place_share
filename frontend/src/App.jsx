import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import MainNavigation from "./shared/components/Navigation/MainNavigation";

import { Fragment, useContext, useEffect } from "react";
import NewPlacePage from "./place/pages/NewPlacePage";
import UpdatePlacePage from "./place/pages/UpdatePlacePage";
import UsersPlacesPage from "./place/pages/UsersPlacesPage";
import { PlaceShareContext } from "./shared/context/PlaceShareContextProvider";
import AuthenticatePage from "./user/pages/AuthenticatePage";
import UsersPage from "./user/pages/UsersPage";
function App()
{

  const { isLoggedIn } = useContext(PlaceShareContext);
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/auth");
  //   }
  // }, [navigate]);
  //
  useEffect(() =>
  {
    // Load Google Maps script dynamically

    const script = document.getElementById('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&callback=initMap`;




  }, []);
  let routes;
  if (isLoggedIn) {
    routes = (
      <Fragment>
        <Route path="/final-proj/" element={<UsersPage />} exact />
        <Route path="/final-proj/places/new" element={<NewPlacePage />} exact />
        <Route path="/final-proj/:uId/places" element={<UsersPlacesPage />} exact />
        <Route path="/final-proj/places/:placeId" element={<UpdatePlacePage />} exact />

        <Route path="/final-proj/auth" element={<AuthenticatePage />} exact />


      </Fragment>
    );
  } else {
    routes = (
      <Fragment>
        <Route path="/final-proj/" element={<UsersPage />} exact />
        <Route path="/final-proj/places/new" element={<NewPlacePage />} exact />
        <Route path="/final-proj/:uId/places" element={<UsersPlacesPage />} exact />

        <Route path="/final-proj/places/:placeId" element={<UpdatePlacePage />} exact />
        <Route path="/final-proj/auth" element={<AuthenticatePage />} exact />

      </Fragment>
    );

    console.log(`isLoggedIn: ${isLoggedIn}`);
  }
  return (
    <>
      <MainNavigation />
      <main>
        {
          <Routes>
            {routes}
            <Route path="*" element={<Navigate to="/final-proj/" replace />} />

          </Routes>
        }
      </main>
    </>
  );
}

export default App;
