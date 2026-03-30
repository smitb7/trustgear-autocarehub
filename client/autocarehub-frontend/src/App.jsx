import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import { Button } from "./components/UI/button";


function App() {
  return (
    <>
      {/* <h1>TEST FROM APP</h1> */}
      <Button />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
