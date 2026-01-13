import { useState } from "react";
import { updateProfile, deleteProfile } from "../api";

export default function Profile() {
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({ name: "", email: "" });

  const update = async () => {
    await updateProfile(form, token);
    alert("Profile Updated");
  };

  const del = async () => {
    await deleteProfile(token);
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div>
      <h2>Profile</h2>
      <input placeholder="New Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="New Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <button onClick={update}>Update</button>
      <button onClick={del}>Delete Profile</button>
    </div>
  );
}
