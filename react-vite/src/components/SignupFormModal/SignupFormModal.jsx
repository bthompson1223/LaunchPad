import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})

    const validationErrors = {}
    if (!email) validationErrors.email = "Email is required"
    if (!username) validationErrors.username = "Username is required"
    if (!firstName) validationErrors.firstName = "First name is required"
    if (!lastName) validationErrors.lastName = "Last name is required"
    if (!password) validationErrors.password = "Password is required"
    if (password.length < 6) validationErrors.password = "Password must be at least 6 characters"
    if (password !== confirmPassword) validationErrors.confirmPassword = "Confirm Password field must be the same as the Password field"
    
    if (Object.values(validationErrors).length) {
      setErrors(validationErrors)
    } else {

      const formData = new FormData()
      formData.append("email", email)
      formData.append("username", username)
      formData.append("password", password)
      formData.append("first_name", firstName)
      formData.append("last_name", lastName)
      formData.append("profile_img", profileImg)
  
      const serverResponse = await dispatch(
        thunkSignup(formData)
      );
  
      if (serverResponse) {
        setErrors(serverResponse);
      } else {
        closeModal();
      }
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.first_name && <p>{errors.first_name}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.last_name && <p>{errors.last_name}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <label>
          Profile Image (Optional)
          <input 
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImg(e.target.files[0])}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
