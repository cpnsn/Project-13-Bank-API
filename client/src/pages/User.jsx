import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserProfile, logout, updateUserProfile } from "../redux/authSlice";

export default function User() {
  useEffect(() => {
    document.title = "Argent Bank | Your Profile";
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");

  useEffect(() => {
    if (!user && token) {
      dispatch(fetchUserProfile());
    }
  }, [user, token, dispatch]);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleSave = () => {
    dispatch(updateUserProfile({ firstName, lastName }));
    setIsEditing(false);
  };

  return (
    <div>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src="./img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link className="main-nav-item" to="/user">
            <i className="fa fa-user-circle"></i>
            {user?.firstName || "User"}
          </Link>
          <button
            className="main-nav-item"
            onClick={handleLogout}
            style={{ backgroundColor: "white", fontWeight: "bold", color: "#2c3e50" }}
          >
            <i className="fa fa-sign-out"></i>
            Sign Out
          </button>
        </div>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          <h2 style={{ fontSize: "3.2rem" }}>
            Welcome back
            <br />
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            ) : (
              `${user?.firstName} ${user?.lastName}!`
            )}
          </h2>
          {isEditing ? (
            <button className="edit-button" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Name
            </button>
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
}
