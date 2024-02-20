import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateProject = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [location, setLocation] = useState("");
  const [story, setStory] = useState("");
  const [risks, setRisks] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [fundingGoal, setFundingGoal] = useState(0.0);
  const [endDate, setEndDate] = useState(new Date());
  const [errors, setErrors] = useState({});

  return (
    <div>
      <h1>Create a New Project!</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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

        <label htmlFor="coverImage">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
          />
        </label>

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
          {"funding" in errors && <p>{errors.funding}</p>}
        </div>

        <label htmlFor="endDate">
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button type="submit">Create a Project</button>
      </form>
    </div>
  );
};
