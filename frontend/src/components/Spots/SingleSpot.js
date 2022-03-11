import { useSelector, useDispatch } from "react-redux";
import { getSpots } from "../../store/spots";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import EditSpotForm from "./EditSpotForm";
import DisplayReservations from "./Reservations/ReservationsTable";
import DisplayReviews from "./Reviews/SingleSpotReviews";
import CreateReservationForm from "./Reservations/CreateReservation";

export default function SingleSpot() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);
  const spots = useSelector((store) => store.spotReducer);
  const spot = spots[spotId];
  // console.log("spot", spot);

  return (
    <>
      <hr />
      <CreateReservationForm spot={spot} />
      <hr />
      <EditSpotForm spot={spot} />
      {/* <h1>I made it to {spot?.title} </h1>
      <ul>
        <li>Host: {spot?.User?.firstName}</li>
        <li>{spot?.description}</li>
        <li>Price per Hour: ${spot?.hrPrice}</li>
        <li>
          Address: {spot?.address} {spot?.city}, {spot?.state} {spot?.zipCode}
        </li>
      </ul> */}
      <hr />
      <DisplayReservations spot={spot} sessionUser={sessionUser} />
      <hr />
      <DisplayReviews spot={spot} />
      <hr />
    </>
  );
}
