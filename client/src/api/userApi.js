import API from "./axios";

// register user
export const registerUser = (data) => API.post("/users/sign-up", data);

// login user
export const loginUser = (data) => API.post("/users/login", data);

// logout
export const logoutUser = () => API.post("/users/logout");

// get all users
export const getUsers = () => API.get("/users");

// get user by id
export const getUserById = (id) => API.get(`/users/${id}`);


