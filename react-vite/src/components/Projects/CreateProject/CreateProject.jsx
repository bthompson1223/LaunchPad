import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { thunkCreateProject } from "../../../redux/project";
import "./CreateEditProject.css";

const CreateProject = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("placeholder");
  const [location, setLocation] = useState("");
  const [story, setStory] = useState("");
  const [risks, setRisks] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [fundingGoal, setFundingGoal] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errors, setErrors] = useState({});
  const [imageLoading, setImageLoading] = useState(false);
  const maxFileError = "Image exceeds the maximum file size of 5Mb";
  
  if (!user) {
    return <h2>You must be logged in to create a new project</h2>;
  }
  
  const fileWrap = (e) => {
    const file = e.target.files[0];
    if (file.size > 5000000) {
      setCoverImage(maxFileError);
      e.target.value = null;
      return;
    }

    setCoverImage(file);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = {};

    if (!title) validationErrors.title = "Title is required";
    if (!subTitle) validationErrors.subTitle = "Subtitle is required";
    if (category === "placeholder")
      validationErrors.category = "Category is required";
    if (!location) validationErrors.location = "Location is required";
    if (!story) validationErrors.story = "Story is required";
    if (!risks) validationErrors.risks = "Risks is required";
    if (!coverImage) validationErrors.coverImage = "CoverImage is required";
    if (!fundingGoal) validationErrors.fundingGoal = "FundingGoal is required";
    if (fundingGoal < 1)
      validationErrors.fundingGoal = "FundingGoal must be a positive figure";
    if (!endDate) validationErrors.endDate = "EndDate is required";
    if (new Date(endDate).getTime() <= new Date().getTime())
      validationErrors.endDate =
        "The last day of your project can not be today or in the past";

    if (Object.values(validationErrors).length) {
      setErrors(validationErrors);
    } else {

      const categoryNum = parseInt(category);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subTitle);
      formData.append("category_id", categoryNum);
      formData.append("location", location);
      formData.append("story", story);
      formData.append("risks", risks);
      formData.append("cover_image", coverImage);
      formData.append("funding_goal", fundingGoal);
      formData.append("end_date", endDate);

      setImageLoading(true);

      await dispatch(thunkCreateProject(formData))
        .then((createdProject) => {
          navigate(`/projects/${createdProject.id}`);
        })
        .catch(async (res) => {
          console.log("Inside errors catch =>", res);
        });
    }
  };

  return (
    <div className="project-add-edit">
      <h1>Create a New Project!</h1>
      <form
        className="create-project-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className="project-input-div">
          <h3>What&apos;s the name of your project?</h3>
          <label htmlFor="title">
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project Name"
              className="input-create"
            />
          </label>
          <div className="project-errors">
            {"title" in errors && <p >{errors.title}</p>}
          </div>
        </div>

        <div className="project-input-div">
          <h3>Subtitle</h3>
          <label htmlFor="subtitle">
            <input
              type="text"
              name="subtitle"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              placeholder="Enter a cool subtitle"
              className="input-create"
            />
          </label>
          <div className="project-errors">
            {"subTitle" in errors && (
              <p >{errors.subTitle}</p>
            )}
          </div>
        </div>

        <div className="project-input-div">
          <h3>Category</h3>
          <label htmlFor="category">
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-create"
            >
              <option disabled value={"placeholder"}>
                Select a Category
              </option>
              <option value="1">Arts</option>
              <option value="2">Comics & Illustrations</option>
              <option value="3">Design & Tech</option>
              <option value="4">Film</option>
              <option value="5">Food & Craft</option>
              <option value="6">Games</option>
              <option value="7">Music</option>
              <option value="8">Publishing</option>
            </select>
          </label>
          <div className="project-errors">
            {"category" in errors && (
              <p >{errors.category}</p>
            )}
          </div>
        </div>

        <div className="project-input-div">
          <h3>Location</h3>
          <label htmlFor="location">
            <input
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where's your project located?"
              className="input-create"
            />
          </label>
          <div className="project-errors">
            {"location" in errors && (
              <p >{errors.location}</p>
            )}
          </div>
        </div>

        <div className="project-input-div">
          <h3>Story</h3>
          <label htmlFor="story">
            <textarea
              name="story"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Tell us a story about your project"
              className="input-create desc"
            />
          </label>
          <div className="project-errors">
            {"story" in errors && <p >{errors.story}</p>}
          </div>
        </div>

        <div className="project-input-div">
          <h3>Risks</h3>
          <label htmlFor="risks">
            <textarea
              name="risks"
              value={risks}
              onChange={(e) => setRisks(e.target.value)}
              placeholder="What is this project risking for you?"
              className="input-create desc"
            />
          </label>
          <div className="project-errors">
            {"risks" in errors && <p >{errors.risks}</p>}
          </div>
        </div>

     

        <div className="project-input-div">
          <h3>What&apos;s Your Funding Goal?</h3>
          <label htmlFor="fundingGoal">
            <input
              type="number"
              name="fundingGoal"
              value={fundingGoal}
              onChange={(e) => setFundingGoal(e.target.value)}
              placeholder="How much funding do you need?"
              className="input-create fund-input"
            />
          </label>
          <div className="project-errors">
            {"fundingGoal" in errors && (
              <p >{errors.fundingGoal}</p>
            )}
          </div>
        </div>

        <div className="project-input-div">
          <h3>What&apos;s the Last Day of Funding?</h3>
          <label htmlFor="endDate">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input-create"
            />
          </label>
          <div className="project-errors">
            {"endDate" in errors && <p >{errors.endDate}</p>}
          </div>
        </div>

        <div className="project-input-div">
          <h3>Select a Project Image</h3>
          <label htmlFor="coverImage">
            <input
              type="file"
              accept="image/*"
              onChange={fileWrap}
              className="input-create"
            />
          </label>
          <div className="project-errors">
            {coverImage === maxFileError && (
              <p>{coverImage}</p>
            )}
            {"coverImage" in errors && (
              <p>{errors.coverImage}</p>
            )}
          </div>
        </div>

        <button type="submit" className="create-a-project-button">
          Create a Project
        </button>

        {imageLoading && <p>Loading...</p>}
      </form>
    </div>
  );
};

export default CreateProject;
