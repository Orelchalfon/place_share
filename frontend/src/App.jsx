import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import MainNavigation from "./shared/components/Navigation/MainNavigation";

import { Fragment } from "react";
import NewPlacePage from "./place/pages/NewPlacePage";
import UpdatePlacePage from "./place/pages/UpdatePlacePage";
import UsersPlacesPage from "./place/pages/UsersPlacesPage";
import { usePlaceShare } from "./shared/hooks/usePlaceShare";
import AuthenticatePage from "./user/pages/AuthenticatePage";
import UsersPage from "./user/pages/UsersPage";
function App()
{
  const { isLoggedIn } = usePlaceShare();
  console.log(import.meta.env.VITE_BACKEND_URL);
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/auth");
  //   }
  // }, [navigate]);
  //
  // useEffect(() =>
  // {
  //   // Load Google Maps script dynamically

  //   const script = document.getElementById('script');
  //   script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;




  // });
  let routes;
  if (isLoggedIn) {
    routes = (
      <Fragment>

        <Route path="/" element={<UsersPage />} exact />

        <Route path="/:uId/places" element={<UsersPlacesPage />} exact />

        <Route path="/places/new" element={<NewPlacePage />} exact />

        <Route path="/places/:placeId" element={<UpdatePlacePage />} exact />

      </Fragment>
    );
  } else {
    routes = (
      <Fragment>

        <Route path="/" element={<UsersPage />} exact />

        <Route path="/:uId/places" element={<UsersPlacesPage />} exact />

        <Route path="/auth" element={<AuthenticatePage />} exact />

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
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        }
      </main>
    </>
  );
}

export default App;
