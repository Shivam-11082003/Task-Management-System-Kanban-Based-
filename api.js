const API = "http://localhost:5000/api";

export const register = (data) =>
  fetch(API + "/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

export const login = async (data) => {
  const res = await fetch(API + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const fetchTasks = (token) =>
  fetch(API + "/tasks", { headers: { authorization: token } }).then((res) => res.json());

export const createTask = (data, token) =>
  fetch(API + "/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json", authorization: token },
    body: JSON.stringify(data)
  });

export const updateTask = (id, data, token) =>
  fetch(API + "/tasks/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json", authorization: token },
    body: JSON.stringify(data)
  });

export const deleteTask = (id, token) =>
  fetch(API + "/tasks/" + id, {
    method: "DELETE",
    headers: { authorization: token }
  });

export const updateProfile = (data, token) =>
  fetch(API + "/auth/profile", {
    method: "PUT",
    headers: { "Content-Type": "application/json", authorization: token },
    body: JSON.stringify(data)
  });

export const deleteProfile = (token) =>
  fetch(API + "/auth/profile", { method: "DELETE", headers: { authorization: token } });
