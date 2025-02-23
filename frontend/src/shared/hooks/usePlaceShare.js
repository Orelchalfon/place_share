import { createContext, useContext } from 'react';
const PlaceShareContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  login: () => { },
  logout: () => { }



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
