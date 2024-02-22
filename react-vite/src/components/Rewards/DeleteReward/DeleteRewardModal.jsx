import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkDeleteReward } from "../../../redux/reward";

const DeleteRewardModal = ({rewardId}) => {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDelete = async (e) => {
        e.preventDefault()
        dispatch(thunkDeleteReward(rewardId))
        closeModal()
      }
    
    const handleCancel = (e) => {
        e.preventDefault()
        closeModal()
      }

    return (
        <div className='delete-reward-modal'>
            <h1>Confirm Delete</h1>
            <h4>Are you sure you want to delete this reward?</h4>
            <button id='reward-delete-yes-btn' onClick={handleDelete}>Yes (Delete Reward)</button>
            <button id='reward-delete-no-btn' onClick={handleCancel}>No (Keep Reward)</button>
      </div>
    )
}

export default DeleteRewardModal;