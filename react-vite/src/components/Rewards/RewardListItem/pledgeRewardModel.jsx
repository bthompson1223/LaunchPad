import { useModal } from "../../../context/Modal"
import { useDispatch } from "react-redux"
import { thunkAddBacking } from '../../../redux/backings'
import { useNavigate } from "react-router-dom"

const PledgeRewardModal = ({reward}) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCancel = (e) => {
        e.preventDefault()
        closeModal()
      }

    const handlePledge = async (e) => {
        e.preventDefault()
        dispatch(thunkAddBacking(reward.id))
        closeModal()
        navigate(`/projects/${reward.project_id}`)
      }

    return (
        <div className='delete-modal-container'>
            <h1>Confirm Pledge</h1>
            <p>Are you sure you want to pledge this Reward</p>
            <button onClick={handlePledge}>Yes (Pledge)</button>
            <button onClick={handleCancel}>No (Cancel Pledge)</button>
        </div>
        
    )
}

export default PledgeRewardModal