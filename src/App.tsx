import { TodoProvider } from "./context/TodoContext";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoutes";
import { Login } from "./components/Login";
import { TodoContainer } from "./components/TodoContainer";
import { AuthProvider } from "./context/AuthContext";

export const App = () => {
  return (
    <AuthProvider>
      <TodoProvider>
        <div className="App">
          <Router>
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute />}>
                <Route path="/todo" element={<TodoContainer />} />
              </Route>
            </Routes>
          </Router>
        </div>
      </TodoProvider>
    </AuthProvider>
  );
};
