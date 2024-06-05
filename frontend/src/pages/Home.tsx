import React, { useEffect, useState } from "react";
import Note from "../components/Note";
import api from "../api";

function home() {
  const [notes, setNotes] = useState<any>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      await api
        .get("/api/notes")
        .then((res) => res.data)
        .then((data) => {
          setNotes(data);
        });
    } catch (error) {
      alert(error);
    }
  }
    const deleteNote =  (id: any) => {
      try {
         api.delete(`api/notes/delete/${id}/`).then((res) => {
          if (res.status === 204) {
            alert("Note deleted");
          } else {
            alert("Failed to delete Note");
          }
          getNotes();
        });
      } catch (error) {
        alert(error);
      }
    };
  

  const createNote = async (e: any) => {
    e.preventDefault();
    try {
      await api.post("api/notes/", { title, content }).then((res) => {
        if (res.status == 201) {
          alert("Notes cretaed");
        } else {
          alert("Failed to create Note");
        }
      });
      getNotes();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      {notes.map((note: any) => {
        <Note note={note} onDelete={deleteNote} key={note.id} />;
      })}
      <form action="submit" onSubmit={createNote}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default home;
