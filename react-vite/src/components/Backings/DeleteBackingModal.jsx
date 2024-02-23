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
      <h1 className="confirm-delete">Confirm Delete</h1>
      <h4 className="delete-confirmation-text">
        Are you sure you want to remove this comment?
      </h4>
      <button id="project-delete-yes-btn" onClick={handleDelete}>
        Yes (Delete Backing)
      </button>
      <button id="project-delete-no-btn" onClick={handleCancel}>
        No (Keep Backing)
      </button>
    </div>
  );
};
