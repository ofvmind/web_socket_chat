const defaultState = {
  messages: []
};

const NEW_MESSAGE = "NEW_MESSAGE";

export const messageReducer = (state = defaultState, action) => {
  switch(action.type) {
    case NEW_MESSAGE:
      return {...state, messages: [...state.messages, action.payload]};
    default:
      return state;
  }
};

export const newMessageAction = (payload) => ({type: NEW_MESSAGE, payload});