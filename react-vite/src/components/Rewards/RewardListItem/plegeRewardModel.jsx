import { useModal } from "../../../context/Modal"
import { useDispatch } from "react-redux"
import { thunkAddBacking } from '../../../redux/backings'

const PledgeRewardModal = ({rewardId}) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()

    const handleCancel = (e) => {
        e.preventDefault()
        closeModal()
      }

    const handlePledge = async (e) => {
        e.preventDefault()
        dispatch(thunkAddBacking(rewardId))
        closeModal()
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