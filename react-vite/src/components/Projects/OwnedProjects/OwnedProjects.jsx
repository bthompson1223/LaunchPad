import { useDispatch, useSelector } from "react-redux";
import { ProjectListItem } from "../ProjectListItem/projectListItem";
import { useEffect } from "react";
import { clearUserProjects, thunkUserProjects } from "../../../redux/session";

const OwnedProjects = () => {
  const user = useSelector((state) => state.session.user);
  const projectsObj = useSelector((state) => state.session.user.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkUserProjects());

    return () => dispatch(clearUserProjects());
  }, [dispatch]);

  if (!user) return <h2>You must be logged in to do that!</h2>;

  if (!projectsObj) return <h2>No projects created</h2>;
  const projects = Object.values(projectsObj);

  return (
    <div>
      <h1>{user.first_name}&apos;s Projects</h1>
      {!projects?.length && <h2>No projects created</h2>}
      <ul>
        {projects.map((project) => (
          <ProjectListItem project={project} key={project.id} />
        ))}
      </ul>
    </div>
  );
};

export default OwnedProjects;
