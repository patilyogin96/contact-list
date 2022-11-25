const initialState = {
  allContacts: [],
  openBox: false,
  addnew: false,
};
const contactReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "FETCH_ALL":
      return { ...state, allContacts: payload };

    case "SAVE":
      state.allContacts.push(payload);

      return { ...state , addnew:true ,openBox:false };

    case "ADD":
      return { ...state, openBox: payload ,addnew:false };

    case "DELETE":
        console.log("pay", payload);
        const filteredArray = state.allContacts.filter((item)=>{

          return item.id != payload
        })
        return { ...state , allContacts:filteredArray ,addnew:false };

    case "CLOSE":
      return {
        ...state,
        openBox: payload,
        addnew:false,
      };

    default:
      return state;
  }
};

export default contactReducer;
