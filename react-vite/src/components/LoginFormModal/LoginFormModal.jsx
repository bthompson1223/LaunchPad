import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "../SignupFormModal/SignupForm.css";

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
    <div className="login-signup-container">
      <h1 className="login-signup">Log In</h1>
      <form className="login-signup-form" onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your registered email"
          />
        </label>
        {errors.email && <p className="input-errors">{errors.email}</p>}
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </label>
        {errors.password && <p className="input-errors">{errors.password}</p>}
        <button className="login-button" type="submit">
          Log In
        </button>
        <div className="demo-user" onClick={demoUser}>
          Demo User
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
