import { useEffect, useState } from "react";
import Note from "../components/Note";
import api from "../api";
import "../style/Home.css";

function Home() {
  const [notes, setNotes] = useState<any>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log("The Data ", notes);
      })
      .catch((error) => alert(error));
  };
  const deleteNote = (id: any) => {
   
      api.delete(`/api/notes/delete/${id}/`).then((res) => {
        if (res.status === 204) {
          alert("Note deleted");
        } else {
          alert("Failed to delete Note");
        }
        getNotes();
      }).catch((error)=>alert(error));
      
  };

  const createNote = (e: any) => {
    e.preventDefault();

    api
      .post("/api/notes/", { title, content })
      .then((res) => {
        if (res.status === 201) {
          alert("Notes created");
          setTitle("")
          setContent("")
        } else {
          alert("Failed to create Note");
        }
        getNotes();
      })
      .catch((error) => alert(error));
  };
  return (
      <div>
        <div>
          <h2>Notes</h2>

          {notes.map((note: any) => (
            <Note note={note} onDelete={deleteNote} key={note.id} />
          ))}
        </div>
        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
          <label htmlFor="title">Title:</label>
          <br />
          <input type="text" id="title" name="title" required value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="content">Content:</label>
          <br />
          <textarea
          id="content"
          name="content"
          required
            value={content}
            onChange={(e) => 
              setContent(e.target.value)
            }
          ></textarea>

         <input type="submit" value="Submit" />
        </form>
      </div>
  );
}

export default Home;
