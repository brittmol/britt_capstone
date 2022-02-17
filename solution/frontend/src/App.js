import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import Spots from "./components/Spots/AllSpots";
import SingleSpot from "./components/Spots/SingleSpot";
import CreateSpotForm from "./components/Spots/CreateSpotForm";
// import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { Modal } from "./context/Modal";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <button onClick={() => setShowModal(true)}>Modal</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>Hello I am a Modal</h1>
        </Modal>
      )}
      {isLoaded && (
        <Switch>
          {/* <Route path="/login" >
            <LoginFormPage />
          </Route> */}
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/spots">
            <Spots />
          </Route>
          <Route path="/spots/:spotId">
            <SingleSpot />
          </Route>
          <Route path="/create">
            <CreateSpotForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
