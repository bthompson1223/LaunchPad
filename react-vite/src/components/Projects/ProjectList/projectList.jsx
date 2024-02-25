import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
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
  const [ page, setPage ] = useState(1)
  const [ perPage, setPerPage ] = useState(5)

  useEffect(() => {
    dispatch(thunkGetCategoryProjects(category, page, perPage));
    return () => {
      dispatch(returnInitial());
    };
  }, [dispatch, category, page, perPage]);

  if (Object.values(projectsObj).length == 0) return null;

  const projects = Object.values(projectsObj);

  return (
    <div>
      <form>
      <span>Page</span>
      <input type="number" value={page} onChange={e => setPage(e.target.value)}/>
      <span>Projects per Page</span><input type="number" value={perPage} onChange={e => setPerPage(e.target.value)}/>
      </form>
      <ul>
        {projects.map((project) => (
          <ProjectListItem project={project} key={project.id} />
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
