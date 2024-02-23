import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteBacking } from "../../redux/backings";
import "./DeleteBackingModal.css";

export const DeleteBackingModal = ({ backing }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async (e) => {
    e.preventDefault();
    dispatch(thunkDeleteBacking(backing.id, backing.reward_id));
    closeModal();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className="delete-project-modal">
      <h2 className="confirm-delete">Confirm Delete</h2>
      <p className="delete-confirmation-text">
        Are you sure you want to remove this comment?
      </p>
      <button id="project-delete-yes-btn" onClick={handleDelete}>
        Yes (Delete Backing)
      </button>
      <button id="project-delete-no-btn" onClick={handleCancel}>
        No (Keep Backing)
      </button>
    </div>
  );
};
