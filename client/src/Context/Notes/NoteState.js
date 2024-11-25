import React, { useState } from "react";
import Notecontext from "./NoteContext";


export default function NoteState(props) {
  let host = process.env.REACT_APP_BACKEND_URL;
  const initialNotes=[]
  const [notes, setnotes] = useState(initialNotes);


  // get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setnotes(json);
  };
  

  // ADD note// ADD note// ADD note// ADD note// ADD note// ADD note// ADD note// ADD note// ADD note// ADD note// ADD note// ADD note// ADD note// ADD note// ADD note// ADD note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const data = await response.json();
    setnotes(notes.concat(data));
  };
  


  // Delete Note// Delete Note// Delete Note// Delete Note// Delete Note// Delete Note// Delete Note
  const DeleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const newnotes = notes.filter((note) => note._id !== id);
    setnotes(newnotes);
  };
  

  // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note // Edit Note
  const EditNote = async (title, description, tag, id) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
  
    const json = await response.json();
    console.log(json);
  
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
  };
  



  return (
    <Notecontext.Provider
      value={{ notes, setnotes, addNote, DeleteNote, EditNote,getNotes}}>
      {props.children}
    </Notecontext.Provider>
  );
}

