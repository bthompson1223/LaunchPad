import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { thunkCreateProject, thunkGetOneProject } from "../../../redux/project";

const UpdateProject = () => {
  const { projectId } = useParams()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const project = useSelector((state) => state.projects[projectId])
  const navigate = useNavigate();
  const [title, setTitle] = useState(project.title);
  const [subTitle, setSubTitle] = useState(project.subtitle);
  const [category, setCategory] = useState(project.category_id)
  const [location, setLocation] = useState(project.location);
  const [story, setStory] = useState(project.story);
  const [risks, setRisks] = useState(project.risks);
  const [coverImage, setCoverImage] = useState(project.coverImage);
  const [fundingGoal, setFundingGoal] = useState(project.fundingGoal);
  const [endDate, setEndDate] = useState(project.end_date);
  const [errors, setErrors] = useState({});
  const [imageLoading, setImageLoading] = useState(false);
  
  useEffect(() => {
    dispatch(thunkGetOneProject(projectId))
  }, [dispatch, projectId])

  
  if (!user) {
    return <h2>You must be logged in to edit a new project</h2>;
  }
  
  if (!project) {
    return null;
  }
  
  if (user.id != project.owner.id) {
    return <h2>You are not authorized to edit this project</h2>;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = {};

    if (!title) validationErrors.title = "Title is required";
    if (!subTitle) validationErrors.subTitle = "Subtitle is required";
    if (!category) validationErrors.category = "Category is required";
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
      // console.log(typeof category)
      // console.log(typeof parseInt(category))
      const categoryNum = parseInt(category)

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
          navigate(`/projects/${projectId}`);
        })
        .catch(async (res) => {
          console.log("Inside errors catch =>", res);
        });
    }
  };

  return (
    <div>
      <h1>Update Your Project!</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="input-div">
          <h2>What&apos;s the name of your project?</h2>
          <label htmlFor="title">
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Project Name"
            />
          </label>
          <div className="errors">
            {"title" in errors && <p>{errors.title}</p>}
          </div>
        </div>

        <div className="input-div">
          <h2>Subtitle</h2>
          <label htmlFor="subtitle">
            <input
              type="text"
              name="subtitle"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              placeholder="Enter a cool subtitle"
            />
          </label>
          <div className="errors">
            {"subtitle" in errors && <p>{errors.subtitle}</p>}
          </div>
        </div>

        <div className="input-div">
          <h2>Category</h2>
          <label htmlFor="category">
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option disabled value={"placeholder"}>Select a Category</option>
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
          <div className="errors">
            {"category" in errors && <p>{errors.category}</p>}
          </div>
        </div>

        <div className="input-div">
          <h2>Location</h2>
          <label htmlFor="location">
            <input
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where's your project located?"
            />
          </label>
          <div className="errors">
            {"location" in errors && <p>{errors.location}</p>}
          </div>
        </div>

        <div className="input-div">
          <h2>Story</h2>
          <label htmlFor="story">
            <input
              type="text"
              name="story"
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Tell us a story about your project"
            />
          </label>
          <div className="errors">
            {"story" in errors && <p>{errors.story}</p>}
          </div>
        </div>

        <div className="input-div">
          <h2>Risks</h2>
          <label htmlFor="risks">
            <input
              type="text"
              name="risks"
              value={risks}
              onChange={(e) => setRisks(e.target.value)}
              placeholder="What is this project risking for you?"
            />
          </label>
          <div className="errors">
            {"risks" in errors && <p>{errors.risks}</p>}
          </div>
        </div>

        <div className="input-div">
          <h2>Select a Project Image</h2>
          <div>
            <img src={coverImage} alt="" />
          </div>
          <label htmlFor="coverImage">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files[0])}
            />
          </label>
          <div className="errors">
            {"coverImage" in errors && <p>{errors.coverImage}</p>}
          </div>
        </div>

        <div className="input-div">
          <h2>What&apos;s Your Funding Goal?</h2>
          <label htmlFor="fundingGoal">
            <input
              type="number"
              name="fundingGoal"
              value={fundingGoal}
              onChange={(e) => setFundingGoal(e.target.value)}
              placeholder="How much funding do you need?"
            />
          </label>
          <div className="errors">
            {"fundingGoal" in errors && <p>{errors.fundingGoal}</p>}
          </div>
        </div>

        <div className="input-div">
          <h2>What&apos;s the Last Day of Funding?</h2>
          <label htmlFor="endDate">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
          <div className="errors">
            {"endDate" in errors && <p>{errors.endDate}</p>}
          </div>
        </div>

        <button type="submit">Create a Project</button>

        {imageLoading && <p>Loading...</p>}
      </form>
    </div>
  );
};

export default UpdateProject;
