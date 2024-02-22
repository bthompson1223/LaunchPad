import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { returnInitial, thunkGetCategoryProjects } from "../../redux/project";
import { NavLink } from "react-router-dom";
import { ProjectListItem } from "../Projects/ProjectListItem/projectListItem";
import Search from "../Search/Search";

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

  const randomChoice = (choiceArr) => {
    const index = Math.floor(Math.random() * choiceArr.length);
    return choiceArr[index];
  };

  const randomProject = randomChoice(projectsArr);

  return (
    <div>
      <div>
        <nav>
          <NavLink to="/categories/all">All</NavLink>
          <NavLink to="/categories/arts">Arts</NavLink>
          <NavLink to="/categories/comics-illustration">
            Comics & Illustration
          </NavLink>
          <NavLink to="/categories/design-tech">Design & Tech</NavLink>
          <NavLink to="/categories/film">Film</NavLink>
          <NavLink to="/categories/food-craft">Food & Craft</NavLink>
          <NavLink to="/categories/games">Games</NavLink>
          <NavLink to="/categories/music">Music</NavLink>
          <NavLink to="/categories/publishing">Publishing</NavLink>
        </nav>
      </div>
      <h1>Bring a creative project to life</h1>
      <div className="splash-stats">
        <div className="on-launchpad">
          <h3>Currently on LaunchPad:</h3>
        </div>
        <div className="stats-bar">
          <div className="projects-funded">
            <div className="projects">{projectsArr.length}</div>
            <div className="stats-text">projects getting funding</div>
          </div>
          <div className="total-funded">
            <div className="funding">${sum}</div>
            <div className="stats-text">Total Funding</div>
          </div>
          <div className="pledges-made">
            <div className="backers">{backers}</div>
            <div className="stats-text">Total pledges</div>
          </div>
        </div>
      </div>
      <div className="random-project">
        <h3>Featured Project:</h3>
        <ProjectListItem project={randomProject} />
      </div>
      <div>
        <Search />
      </div>
    </div>
  );
};

export default SplashPage;
