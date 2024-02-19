import { useSelector, useDispatch } from 'react-redux'
import { useParams, useEffect } from 'react'
import { ProjectListItem } from '../ProjectListItem/projectListItem';

const ProjectList = () => {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects);
    const {category} = useParams();

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