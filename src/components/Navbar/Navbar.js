import { Button } from "@mui/material";
import React from "react";
import styles from "./navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";
import AddContact from '../AddContactBox/AddContact.js'

const Navbar = () => {


  let dispatch = useDispatch();

  const handleAddContact = (check) => {
    // const addResponse = await axios.post()

    // e.preventDefault();
    console.log("reached");
    dispatch({
      type:"ADD",
      payload:check
    })
  };
  return (
    <>
      <div className={styles.navbarMain}>
        <div>
          <p style={{fontSize:"24px" , fontWeight:"bold"}}>Yogin's Contact List</p>
        </div>
        <div>
          <Button  variant="contained" onClick={(e)=>handleAddContact(true)}>
            Add Contact
          </Button>
        </div>
      </div>
      <AddContact/>
      
    </>
  );
};

export default Navbar;
