import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const demoUser = () => {
    setEmail("guest_services@launchpad.io");
    setPassword("password");
  };

  return (
    <div className="main">
      <h1 className="login-signup">Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your registered email"
            className="credential-input"
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className="password-input"
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit" className="login-button">
          Log In
        </button>
        <button className="demo-button" onClick={demoUser}>
          Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
