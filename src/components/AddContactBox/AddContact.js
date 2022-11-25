import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect , useState } from "react";

export default function FormDialog() {
    const [addContact, setAddContact] = useState({
        name: "",
        phone: "",
        email: "",
      });

const openBox = useSelector((state)=>state.openBox)
const contactList = useSelector((state)=>state.allContacts)

console.log("length" , contactList.length);
let dispatch = useDispatch();
const [open, setOpen] = React.useState(false);




  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (e) =>{
    const {name , value} = e.target;
    console.log(name , value);

    setAddContact({
        ...addContact,
        [name] : value
    })
  }

  const handleSaveContact = ()=>{

    const data = {
        id:contactList.length+1,
        name:addContact.name,
        phone:addContact.phone,
        email:addContact.email,
    }


    console.log("data", data);
    dispatch({
        type:"SAVE",
        payload: data
    })

  }

  const handleClose = () => {
   dispatch({
    type:"CLOSE",
    payload:false
   })
  };
  useEffect(() => {
     setOpen(openBox)
  }, [openBox])
  

  return (
    <div>
  
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Contact</DialogTitle>
        <DialogContent>
         
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
           
            fullWidth
            variant="standard"
            value={addContact.name}
            onChange={handleChange}
          />
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Phone"
            name="phone"
            type="number"
            fullWidth
            variant="standard"
            value={addContact.phone}
            onChange={handleChange}
          />
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email"
            type="email"
            name="email"
            fullWidth
            variant="standard"
            value={addContact.email}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSaveContact}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
