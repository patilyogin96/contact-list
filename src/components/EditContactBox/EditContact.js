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

const EditContact = () => {
  const [editContact, setEditContact] = useState({
    name: "",
    phone: "",
    email: "",
  });
  let dispatch = useDispatch();
  const [openEdit, setOpenEdit] = React.useState(false);
  const openEditR = useSelector((state) => state);
  console.log("edit", openEditR);

  const handleClose = () => {
    dispatch({
      type: "CLOSE_EDIT_BOX",
    });
  };

  const handleSaveContact = (id) => {
    // making an update call (dummy)

    axios
      .patch("https://jsonplaceholder.typicode.com/posts/1", editContact)

      // updating in store by using redux

      .then((response) => console.log("Update", response));
    dispatch({
      type: "SAVE_EDIT",
      payload: editContact,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditContact({
      ...editContact,
      [name]: value,
    });
  };

  useEffect(() => {
    setEditContact({
      ...editContact,
      id: openEditR?.editState?.id,
      name: openEditR?.editState?.name,
      phone: openEditR?.editState?.phone,
      email: openEditR?.editState?.email,
    });
    setOpenEdit(openEditR.openEdit);
  }, [openEditR.openEdit]);
  return (
    <>
      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle>Edit Contact</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            fullWidth
            variant="standard"
            value={editContact.name}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Phone"
            name="phone"
            // type="number"
            fullWidth
            variant="standard"
            value={editContact.phone}
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
            value={editContact.email}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSaveContact(openEditR?.editState?.id)}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditContact;
