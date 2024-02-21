import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneProject } from "../../../redux/project";
import { useEffect } from 'react';
import { useParams } from "react-router-dom";

const CreateReward = () => {
    const dispatch = useDispatch();
    const {projectId} = useParams();
    const user = useSelector((state) => state.session.user);
    const project = useSelector((state) => state.projects[projectId])
    console.log("🚀 ~ CreateReward ~ project :", project )
    
    useEffect(() => {
        dispatch(thunkGetOneProject(projectId))
      }, [dispatch, projectId]) 


    if (!user) {
        return <h2>You must be logged in to create a new reward</h2>;
      }

    if (user?.id != project?.id) {
        return <h2>You must be the project owner to create a new reward</h2>
    }

    

    // if (user.id != project.owner.id) {
    // return <h2>You are not authorized to edit this project</h2>;
    // }

    return (
        <h1>Hello World!</h1>
    )
}

export default CreateReward