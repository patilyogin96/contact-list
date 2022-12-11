const initialState = {
  allContacts: [],
  openBox: false,
  addnew: false,
  openEdit: false,
  updatedContactCheck: false,
  editState: {},
};
const contactReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "FETCH_ALL":
      return { ...state, allContacts: payload };

    case "SAVE":
      state.allContacts.push(payload);

      return { ...state, addnew: true, openBox: false };

    case "ADD":
      return { ...state, openBox: payload, addnew: false };

    case "OPEN_EDIT":
      return { ...state, openEdit: payload.check, editState: payload.contact };

    case "SAVE_EDIT":
      state.allContacts.forEach((item, index) => {
        if (item.id == payload.id) {
          state.allContacts[index] = payload;
        }
      });

      return { ...state, updatedContactCheck: true, openEdit: false };

    case "DELETE":
      const filteredArray = state.allContacts.filter((item) => {
        return item.id != payload;
      });
      return { ...state, allContacts: filteredArray, addnew: false };

      case "CLOSE_EDIT_BOX":
        return {...state ,openEdit:false }

    case "CLOSE":
      return {
        ...state,
        openBox: payload,
        addnew: false,
      };

    default:
      return state;
  }
};

export default contactReducer;
