import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { ProjectListItem } from "../ProjectListItem/projectListItem";
import { useParams } from "react-router-dom";
import {
  thunkGetCategoryProjects,
  returnInitial,
} from "../../../redux/project";
import './ProjectList.css'

const ProjectList = () => {
  const dispatch = useDispatch();
  const projectsObj = useSelector((state) => state.projects);
  const { category } = useParams();

  useEffect(() => {
    dispatch(thunkGetCategoryProjects(category));
    return () => {
      dispatch(returnInitial());
    };
  }, [dispatch, category]);

  if (Object.values(projectsObj).length == 0) return null;

  const projects = Object.values(projectsObj);

  return (
    <div>
      <ul className="project-list">
        {projects.map((project) => (
          <ProjectListItem project={project} key={project.id} />
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
