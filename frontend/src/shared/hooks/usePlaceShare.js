import { createContext, useContext } from 'react';
const PlaceShareContext = createContext({
  isLoggedIn: false,
  login: () => { },
  logout: () => { },
  users: [],
  places: [],

  addPlace: () => { },
  updatePlace: () => { },
  deletePlace: () => { },

  setPlaces: () => { },
  setUsers: () => { },
});

export const usePlaceShare = () =>
{
  const context = useContext(PlaceShareContext);
  if (!context) {
    throw new Error('usePlaceShare must be used within a PlaceShareContextProvider');
  }
  return context;
}
export default PlaceShareContext;
