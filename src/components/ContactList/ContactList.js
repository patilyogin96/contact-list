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
import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const ContactList = () => {
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

  const handleDelete = (id) =>{
    dispatch({
        type:"DELETE",
        payload:id
    })

  }

  useEffect(() => {
    getContactList();
  }, []);

  useEffect(() => {
    console.log("Called");
    getUpdatedList();
  }, [addNew]);

  return (
    <>
      <div className={styles.contactMainContainer}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {rowHeads.map((item, i) => {
                  return <TableCell key={i}>{item}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {allContacts.map((contact, i) => {
                return (
                  <TableRow>
                    <TableCell>{contact.id}</TableCell>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>
                      <div>
                        <Button variant="outlined">Edit</Button>
                        <Button variant="outlined" onClick={()=>handleDelete(contact.id)} >Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default ContactList;
