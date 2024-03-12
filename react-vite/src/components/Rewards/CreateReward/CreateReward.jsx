import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneProject } from "../../../redux/project";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { thunkCreateReward } from "../../../redux/reward";
import '../RewardCSS/rewardEditCreate.css'

const CreateReward = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {projectId} = useParams();
    const user = useSelector((state) => state.session.user);
    const project = useSelector((state) => state.projects[projectId])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [estDeliveryDate, setEstDeliveryDate] = useState("")
    const [quantity, setQuantity] = useState("")
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({});
    
    useEffect(() => {
        dispatch(thunkGetOneProject(projectId))
      }, [dispatch, projectId]) 


    if (!user) {
        return <h2>You must be logged in to create a new reward</h2>;
      }

    if (user?.id != project?.owner.id) {
        return <h2>You must be the project owner to create a new reward</h2>
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});
      const validationErrors = {};

      if (!name) validationErrors.name = "Name is required";
      if (!description) validationErrors.description = "Description is required";
      if (!amount) validationErrors.amount = "Pledge amount is required";
      if (amount < 1) validationErrors.amount = "Pledge amount must be a positive figure";
      if (!estDeliveryDate) validationErrors.estDeliveryDate = "Estimated Delivery Date is required";
      if (new Date(estDeliveryDate).getTime() <= new Date().getTime())
      validationErrors.estDeliveryDate =
        "The estimated delivery date can not be today or in the past";
      if (!quantity) validationErrors.quantity = "Quantity is required";
      if (quantity < 1) validationErrors.quantity = "Reward quantity must be a positive figure";
      if (!image) validationErrors.image = "Reward image is required"

      if (Object.values(validationErrors).length) {
        setErrors(validationErrors)

      } else {
        
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("img_url", image);
        formData.append("amount", amount);
        formData.append("est_delivery_date", estDeliveryDate);
        formData.append("quantity", quantity);

        setImageLoading(true);

        await dispatch(thunkCreateReward(formData, projectId))
          .then(() => {
              navigate(`/projects/${projectId}/rewards`)
          })
          .catch(async (res) => {
            console.log("Inside errors catch =>", res);
          });
      }
    }

    return (
        <div className="reward-add-edit">
            <h1>Create a New Reward!</h1>
            <form className="reward-add-edit-form" onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="reward-input-div">
                  <h3>Name of your Reward</h3>
                  <label htmlFor="name">
                    <input 
                      type="text"
                      name = "name"
                      value = {name} 
                      onChange={(e) => setName(e.target.value)}
                      placeholder = "Reward Name"
                    />
                  </label>
                  <div className="reward-errors">
                      {"name" in errors && <p>{errors.name}</p> }
                  </div>
              </div>

              <div className="reward-input-div">
                  <h3>Description</h3>
                  <label htmlFor="description">
                    <textarea 
                      name = "description"
                      value = {description} 
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder = "Description"
                    />
                  </label>
                  <div className="reward-errors">
                      {"description" in errors && <p>{errors.description}</p> }
                  </div>
              </div>

              <div className="reward-input-div">
                  <h3>$Pledge Amount</h3>
                  <label htmlFor="amount">
                    <input 
                      type = "number"
                      name = "amount"
                      value = {amount} 
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder = "$Pledge Amount"
                    />
                  </label>
                  <div className="reward-errors">
                      {"amount" in errors && <p>{errors.amount}</p> }
                  </div>
              </div>

              <div className="reward-input-div">
                  <h3>Reward Quantity</h3>
                  <label htmlFor="quantity">
                    <input 
                      type = "number"
                      name = "quantity"
                      value = {quantity} 
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder = "Reward quantity"
                    />
                  </label>
                  <div className="reward-errors">
                      {"quantity" in errors && <p>{errors.quantity}</p> }
                  </div>
              </div>

              <div className="reward-input-div">
                  <h3>Estimated Delivery Date</h3>
                  <label htmlFor="estDeliveryDate">
                    <input 
                      type = "date"
                      name = "estDeliveryDate"
                      value = {estDeliveryDate} 
                      onChange={(e) => setEstDeliveryDate(e.target.value)}
                      placeholder = "Estimated Delivery Date"
                    />
                  </label>
                  <div className="reward-errors">
                      {"estDeliveryDate" in errors && <p>{errors.estDeliveryDate}</p> }
                  </div>
              </div>

              <div className="reward-input-div">
                  <h3>Upload a Reward Image</h3>
                  <label htmlFor="image">
                    <input 
                      type = "file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </label>
                  <div className="reward-errors">
                      {"image" in errors && <p>{errors.image}</p> }
                  </div>
                  {imageLoading && <p>Loading...</p>}
              </div>
              
              <button type="submit">Create a Reward</button>
             
            </form>
        </div>
    )
}

export default CreateReward