import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { ProjectListItem } from '../ProjectListItem/projectListItem';
import { useParams } from 'react-router-dom';
import {thunkGetCategoryProjects, returnInitial} from '../../../redux/project'

const ProjectList = () => {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects);
    const {category} = useParams();

    console.log("***************************", projects)
    useEffect(() => {
        dispatch(thunkGetCategoryProjects(category));
        return () => {dispatch(returnInitial())}
    }, [dispatch])
    
    if (!projects) return null;
    
    
    return (
        <div>
            <ul>
                {projects.map(project => (
                    <ProjectListItem 
                        project = {project}
                        key = {project.id}
                    />
                ))}
            </ul>
        </div>
    )
}


export default ProjectList;