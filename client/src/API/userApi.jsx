import API from "./axios";

// register user
export const registerUser = (data) => API.post("/sign-up", data);

// login user
export const loginUser = (data) => API.post("/login", data);

// logout
export const logoutUser = () => API.post("/logout");

// get all users
export const getUsers = () => API.get("/");

// get user by id
export const getUserById = (id) => API.get(`/${id}`);