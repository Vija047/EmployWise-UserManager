import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UsersList from "./pages/Userlist";
import EditUser from "./pages/Edituser";
import Deleteuser from "./pages/deleteuser";
import { AuthProvider } from "./context/authcontext";


function App() {
  return (
    <AuthProvider> {/* ✅ Wrap the whole app with AuthProvider */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/edit/:id" element={<EditUser />} />
          <Route path="/Delete" element ={<Deleteuser/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
