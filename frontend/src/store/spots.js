import { csrfFetch } from "./csrf";

/* ----- ACTIONS ------ */
const LOAD_SPOTS = "spots/LOAD_SPOTS";
export const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots,
  };
};

const ADD_SPOT = "spots/ADD_SPOT";
export const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot,
  };
};

const ADD_BOOKING = "spots/bookings/ADD_BOOKING";
export const addBooking = (booking) => {
  return {
    type: ADD_BOOKING,
    booking,
  };
};

const ADD_REVIEW = "spots/reviews/ADD_REVIEW";
export const addReview = (review) => {
  return {
    type: ADD_REVIEW,
    review,
  };
};

const DELETE_SPOT = "spots/DELETE_SPOT";
export const deleteSpot = (spot) => {
  return {
    type: DELETE_SPOT,
    spot,
  };
};

const DELETE_BOOKING = "spots/bookings/DELETE_BOOKING";
export const deleteBooking = (booking) => {
  return {
    type: DELETE_BOOKING,
    booking,
  };
};

const DELETE_REVIEW = "spots/reviews/DELETE_REVIEW";
export const deleteReview = (review) => {
  return {
    type: DELETE_REVIEW,
    review,
  };
};

/* ----- THUNK ------ (communicates to backend api and retrieves it) */
export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`);

  if (response.ok) {
    const spots = await response.json();
    dispatch(loadSpots(spots)); // this is the action that is passed into the reduces
  }
};

export const createSpot = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addSpot(data));
    return data; // or return null
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const updateSpot = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addSpot(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const removeSpot = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${payload.id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteSpot(data));
  }
};

export const createBooking = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${payload.spotId}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addBooking(data));
    return data; // or return null
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const updateBooking = (payload) => async (dispatch) => {
  const response = await csrfFetch(
    `/api/spots/${payload.spotId}/bookings/${payload.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (response.ok) {
    const data = await response.json();
    dispatch(addBooking(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const removeBooking = (payload) => async (dispatch) => {
  const response = await csrfFetch(
    `/api/spots/${payload.spotId}/bookings/${payload.id}`,
    {
      method: "DELETE",
    }
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteBooking(data));
  }
};

export const createReview = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${payload.spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addReview(data));
    return data; // or return null
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const updateReview = (payload) => async (dispatch) => {
  const response = await csrfFetch(
    `/api/spots/${payload.spotId}/reviews/${payload.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (response.ok) {
    const data = await response.json();
    dispatch(addReview(data));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const removeReview = (payload) => async (dispatch) => {
  const response = await csrfFetch(
    `/api/spots/${payload.spotId}/reviews/${payload.id}`,
    {
      method: "DELETE",
    }
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteReview(data));
  }
};

/* ------ REDUCER ------ */
export default function spotReducer(state = {}, action) {
  let newState = {};
  switch (action.type) {
    case LOAD_SPOTS: {
      // console.log('Bookings in action', action.spots[0].Bookings)
      action.spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    }
    case ADD_SPOT: {
      return (newState = { ...state, [action.spot.id]: action.spot });
    }
    case ADD_BOOKING: {
      newState = { ...state };
      newState[action.booking.spotId].Bookings.forEach((bk, i) => {
        // for Edit Booking
        if (action.booking.id === bk.id) {
          delete newState[action.booking.spotId].Bookings[i];
        }
      });
      newState[action.booking.spotId].Bookings.push(action.booking);
      return newState;
    }
    case ADD_REVIEW: {
      newState = { ...state };
      newState[action.review.spotId].Reviews.forEach((rv, i) => {
        // for Edit Review
        if (action.review.id === rv.id) {
          delete newState[action.review.spotId].Reviews[i];
        }
      });
      newState[action.review.spotId].Reviews.push(action.review);
      return newState;
    }
    case DELETE_SPOT: {
      newState = { ...state };
      delete newState[action.spot];
      return newState;
    }
    case DELETE_BOOKING: {
      newState = { ...state };
      newState[action.booking.spotId].Bookings.forEach((bk, i) => {
        if (action.booking.id === bk.id) {
          delete newState[action.booking.spotId].Bookings[i];
        }
      });
      return newState;
    }
    case DELETE_REVIEW: {
      newState = { ...state };
      newState[action.review.spotId].Reviews.forEach((rv, i) => {
        if (action.review.id === rv.id) {
          delete newState[action.review.spotId].Reviews[i];
        }
      });
      return newState;
    }
    default:
      return state;
  }
}
