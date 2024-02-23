import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { returnInitial, thunkGetCategoryProjects } from "../../redux/project";
import "./splashPage.css";
import CategoriesNav from "../Categories/CategoriesNav";
import { FeaturedProject } from "../Projects/FeaturedProject/FeaturedProject";

const SplashPage = () => {
  const projectsObj = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetCategoryProjects("all"));

    return () => dispatch(returnInitial());
  }, [dispatch]);

  if (!projectsObj) return null;

  const projectsArr = Object.values(projectsObj);

  if (!projectsArr.length) return null;

  let sum = 0;
  let backers = 0;
  for (let project of projectsArr) {
    sum += parseInt(project.totalFunded);
    backers += parseInt(project.numOfBackers);
  }

  const formattedSum = sum.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  const randomChoice = (choiceArr) => {
    const index = Math.floor(Math.random() * choiceArr.length);
    return choiceArr[index];
  };

  const randomProject1 = randomChoice(projectsArr);
  const randomProject2 = randomChoice(projectsArr);
  const randomProject3 = randomChoice(projectsArr);

  return (
    <div className="splash-container">
      <div className="categories-container">
        <CategoriesNav />
      </div>
      <h1 className="splash-title">Bring a creative project to life</h1>
      <div className="splash-stats">
        <div className="on-launchpad">
          <p>Currently on LaunchPad:</p>
        </div>
        <div className="stats-bar">
          <div className="projects-funded">
            <div className="projects">{projectsArr.length}</div>
            <div className="stats-text">projects getting funding</div>
          </div>
          <div className="bar"> </div>
          <div className="total-funded">
            <div className="funding">{formattedSum}</div>
            <div className="stats-text">Total Funding</div>
          </div>
          <div className="bar"></div>
          <div className="pledges-made">
            <div className="backers">{backers}</div>
            <div className="stats-text">Total pledges</div>
          </div>
        </div>
      </div>
      <div className="random-project">
        <h3>Featured Projects</h3>
        <ul className="featured">
          <li>
            <FeaturedProject className='featured-project' project={randomProject1} />
          </li>
          <li>
            <FeaturedProject className='featured-project' project={randomProject2} />
          </li>
          <li>
            <FeaturedProject className='featured-project' project={randomProject3} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SplashPage;
