import { REQUEST_LOCATION, RECEIVE_LOCATION } from '../actions';

const initialState = {};

const location = (state = [], action) => {
  switch (action.type) {
    case REQUEST_LOCATION:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_LOCATION:
      return {
        ...state,
        isFetching: false,
        data: state.location + action.payload
      };
    default:
      return state;
  }
};

export default location;
