import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./app.css";
import AddPage from "./pages/AddPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { logoutUser } from "./redux-store/features/userSlice";

function App() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <BrowserRouter>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <div className="main-nav">
          <nav className="nav container">
            <Link to="/" className="logo">
              LOGO
            </Link>
            <div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <div>
                  {!user ? (
                    <Link className="btn" to="/login">
                      Login
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  {user && <p style={{ color: "#111" }}>{user.name}</p>}
                </div>
                <div>
                  {user && (
                    <Link to="/add" style={{ textDecoration: "none" }}>
                      Create Invoice
                    </Link>
                  )}
                </div>
                <div>
                  {user && (
                    <button className="btn" onClick={logoutHandler}>
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="add" element={<AddPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
        <footer className="container" style={{ color: "#777", height: "2rem" }}>
          All Right Reserved by Prime Shop
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
