import {  Route, Routes } from "react-router-dom";
import Whiteboard from "./Components/whiteBoard";
import LandingPage from "./Components/Landing";
import Auth  from "./Components/Auth";

function App() {
  return(
    <Routes>
       <Route path="/" element={< LandingPage/>} />
       <Route path="/login" element={< Auth/>} />
      <Route path="/whiteboard" element={<Whiteboard />} />
    </Routes>
  )
}

export default App;