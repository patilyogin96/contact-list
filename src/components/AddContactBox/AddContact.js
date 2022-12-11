import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FormDialog() {
  const [addContact, setAddContact] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [validationsName, setValidationsName] = useState(false);
  const [validationsPhone, setValidationsPhone] = useState(false);
  const [validationsEmail, setValidationsEmail] = useState(false);

  const openBox = useSelector((state) => state.openBox);
  const contactList = useSelector((state) => state.allContacts);

  console.log("length", contactList.length);
  let dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    if (addContact.name !== "") {
      setValidationsName(false);
    }

    setAddContact({
      ...addContact,
      [name]: value,
    });
  };

  const handleSaveContact = () => {
    let greenLight = true;

    // setting validations to add contact form

    if (addContact.name === "") {
      greenLight = false;
      setValidationsName(true);
    }
    if (addContact.phone === "") {
      greenLight = false;
      setValidationsPhone(true);
    }
    if (addContact.email === "") {
      greenLight = false;
      setValidationsEmail(true);
    }

    const data = {
      id: contactList.length + 1,
      name: addContact.name,
      phone: addContact.phone,
      email: addContact.email,
    };

    if (greenLight === true) {

      axios.post("https://jsonplaceholder.typicode.com/posts" , data)
      .then((res)=>{
        console.log("Post Response" , res);
        dispatch({
          type: "SAVE",
          payload: res.data,
        });
      })
      .catch((err)=>console.log(err))
      console.log("data", data);
    
    } else {
      return;
    }
  };

  const handleClose = () => {

    setValidationsName(false)
    setValidationsPhone(false)
    setValidationsEmail(false)
    dispatch({
      type: "CLOSE",
      payload: false,
    });
  };
  useEffect(() => {
    setOpen(openBox);
  }, [openBox]);

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
            error={validationsName}
            helperText={validationsName ? "Please Enter Name" : ""}
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
            error={validationsPhone}
            helperText={validationsPhone ? "Please Enter Phone NUmber" : ""}
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
            error={validationsEmail}
            helperText={validationsEmail ? "Please Enter Email" : ""}
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
