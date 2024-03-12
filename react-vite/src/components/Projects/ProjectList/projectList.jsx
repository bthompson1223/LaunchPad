import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ProjectListItem } from "../ProjectListItem/projectListItem";
import { useParams } from "react-router-dom";
import {
  thunkGetCategoryProjects,
  returnInitial,
} from "../../../redux/project";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import "./ProjectList.css";

const ProjectList = () => {
  const dispatch = useDispatch();
  const projectsObj = useSelector((state) => state.projects);
  const paginationData = useSelector(state => state.pagination)
  const { category } = useParams();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    dispatch(thunkGetCategoryProjects(category, page, perPage));

    return () => {
      dispatch(returnInitial());
    };
  }, [dispatch, category, page, perPage]);


  const handlePerPageChange = (e) => {
    setPage(1)
    setPerPage(e.target.value)
  }

  if (Object.values(projectsObj).length == 0) return null;

  const projects = Object.values(projectsObj);

  return (
    <div>
      <div className="pagination-div">
        <div className="page-div">
        <span className="pagination-header">Page</span>
        <div className="page-numbers-arrows-div">
        {page > 1 ?
          <button className="arrow-buttons" onClick={() => setPage(page - 1)}><FaAngleLeft /></button> :
          <button className="arrow-buttons disabled-btn" disabled><FaAngleLeft /></button>
        }
        <span>{page} of {paginationData.totalPages}</span>
        {page < paginationData.totalPages ? 
        <button className="arrow-buttons" onClick={() => setPage(page + 1)}><FaAngleRight /></button> :
        <button className="arrow-buttons disabled-btn" disabled><FaAngleRight /></button>}
        </div>
        </div>

        <div className="per-page-div">

        <span className="pagination-header">Projects per Page</span>
        <div>

        <select
          id="per-page-input"
          value={perPage}
          onChange={handlePerPageChange}>
        <option value={1}>1</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
        </select>
        </div>
        </div>
      </div>
      <ul className="project-list">
        {projects.map((project) => (
          <ProjectListItem project={project} key={project.id} />
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
