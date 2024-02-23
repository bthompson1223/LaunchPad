import { useModal } from "../../../context/Modal"
import { useDispatch } from "react-redux"
import { thunkAddBacking } from '../../../redux/backings'
import { useNavigate } from "react-router-dom"
import '../RewardCSS/RewardModal.css'

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
        <div className='pledge-modal-container reward-modal'>
            <h2>Confirm Pledge</h2>
            <p>Are you sure you want to pledge this Reward?</p>
            <button onClick={handlePledge}>Yes (Pledge)</button>
            <button onClick={handleCancel}>No (Cancel)</button>
        </div>
        
    )
}

export default PledgeRewardModal