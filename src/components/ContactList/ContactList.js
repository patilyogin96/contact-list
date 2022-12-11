import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import styles from "./contact.module.css";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import EditContact from "../EditContactBox/EditContact";

const ContactList = () => {
  var state = useSelector((state) => state);
  var allContacts = useSelector((state) => state.allContacts);
  const addNew = useSelector((state) => state.addnew);
  console.log("State", addNew);

  const dispatch = useDispatch();

  const createData = () => {};

  const rowHeads = ["Sr No", "Name", "Number", "Email", "Actions"];

  const getContactList = async () => {
    const response = await axios
      .get("https://jsonplaceholder.typicode.com/users")
      .catch((err) => {
        console.log("Error", err);
      });
    // console.log("response" , response.data);
    dispatch({
      type: "FETCH_ALL",
      payload: response.data,
    });
  };

  const getUpdatedList = () => {
    allContacts = allContacts;
  };

  const handleDelete = (id) => {
    axios.delete("https://jsonplaceholder.typicode.com/posts/1", id);
    dispatch({
      type: "DELETE",
      payload: id,
    });
  };

  const handleEditContact = (contact) => {
    dispatch({
      type: "OPEN_EDIT",
      payload: {
        check: true,
        contact: contact,
      },
    });
    console.log("Dispatched");
  };

  useEffect(() => {
    getContactList();
  }, []);

  useEffect(() => {
    console.log("Called");
    getUpdatedList();
    // window.scrollTo(0, document.body.scrollHeight);
  }, [addNew]);

  // useEffect(() => {
  //   console.log("Called");
  //   getUpdatedList();
  //   window.scrollTo(0, document.body.scrollHeight);
  // }, [state.updatedContactCheck]);

  return (
    <>
      <div className={styles.contactMainContainer}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {rowHeads.map((item, i) => {
                  return (
                    <TableCell sx={{ fontWeight: "bold" , fontSize:"22px" }} key={i}>
                      {item}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {allContacts.map((contact, i) => {
                return (
                  <TableRow>
                    <TableCell sx={{fontSize:"20px"}}>{i + 1}</TableCell>
                    <TableCell sx={{fontSize:"20px"}}>{contact.name}</TableCell>
                    <TableCell sx={{fontSize:"20px"}}>{contact.phone}</TableCell>
                    <TableCell sx={{fontSize:"20px"}}>{contact.email}</TableCell>
                    <TableCell sx={{fontSize:"20px"}}>
                      <div className={styles.buttonGaps}>
                        <Button
                           variant="contained"
                          onClick={() => handleEditContact(contact)}
                        >
                          Edit
                        </Button>
                        <Button
                           variant="contained"
                          onClick={() => handleDelete(contact.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <EditContact />
    </>
  );
};

export default ContactList;
