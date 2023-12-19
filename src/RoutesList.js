import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ListingsList from "./ListingsList";
import Home from "./Home";
import PhotoForm from "./PhotoForm";
import ListingForm from "./ListingForm";
import ListingDetail from "./ListingDetail";


/** RoutesList: All routes.
 *
 */

function RoutesList({ login, signup, currUser }) {
  return (
    <Routes>
      <Route path='/' element={<Home currUser={currUser} />} />
      {!currUser && (
        <>
          <Route path='/login' element={<LoginForm login={login} />} />
          <Route path='/signup' element={<SignUpForm signup={signup} />} />
        </>
      )}
      {currUser && (
        <>
          <Route path='/listings' element={<ListingsList />} />
          <Route path='/listings/:id' element={<ListingDetail />} />
          <Route path='/listings/add' element={<ListingForm currUser={currUser} />} />
          <Route path='/listings/:listing_id/photos' element={<PhotoForm />} />
        </>
      )}

      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}

export default RoutesList;