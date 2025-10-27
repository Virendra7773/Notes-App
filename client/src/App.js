import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://notes-app-dcrd.onrender.com/";


function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  // ✅ Fetch Notes from Backend
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(API_URL);
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Add or Update Note
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingNote) {
        // Update existing note
        await axios.put(`${API_URL}/${editingNote._id}`, {
          title,
          content,
        });
        setEditingNote(null);
      } else {
        // Create new note
        await axios.post(API_URL, { title, content });
      }

      setTitle("");
      setContent("");
      fetchNotes();
    } catch (err) {
      console.error("Error saving note:", err);
    }
  };

  // ✅ Delete Note
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  // ✅ Edit Note
  const handleEdit = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  return (
    <div className="app-container">
      <h1>📝 My Notes App</h1>

      <form className="note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Enter content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">
          {editingNote ? "Update Note" : "Add Note"}
        </button>
      </form>

      <div className="notes-container">
        {notes.map((note) => (
          <div key={note._id} className="note-card">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                style={{
                  backgroundColor: "#44bd32",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                onClick={() => handleEdit(note)}
              >
                Edit
              </button>
              <button
                style={{
                  backgroundColor: "#e84118",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(note._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
