import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import TodoForm from "./components/TodoForm";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

function App() {
  const handleSignupPage = () => {
    return <Navigate to="/" replace={true} />;
  };
  const handleLoginPage = () => {
    return <Navigate to="/login" replace={true} />;
  };
  return (
    <>
      <h1 className="text-center mt-16 font-medium text-xl">
        #task-management
      </h1>

      {/* <Signup /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/task-management" element={<TodoForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
