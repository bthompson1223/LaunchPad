import { useSelector, useDispatch } from 'react-redux'
import { useParams, useEffect } from 'react'


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
                        projectId = {project.id}
                        key = {project.id}
                    />
                ))}
            </ul>
        </div>
    )
}


export default ProjectList;