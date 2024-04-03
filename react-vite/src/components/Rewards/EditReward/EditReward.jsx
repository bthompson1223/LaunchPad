import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneReward } from "../../../redux/reward";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { thunkUpdateReward } from "../../../redux/reward"; //to be update
import '../RewardCSS/rewardEditCreate.css'

const EditReward = () => {
    // to convert est_delivery_date to "YYYY-MM-DD" format so it can be populated 
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {projectId, rewardId} = useParams();
    const user = useSelector((state) => state.session.user);
    const reward = useSelector((state) => state.rewards[rewardId])
    
    // User can update the following:
    const [name, setName] = useState(reward?.name)
    const [description, setDescription] = useState(reward?.description)
    const [amount, setAmount] = useState(reward?.amount)
    const [estDeliveryDate, setEstDeliveryDate] = useState(formatDate(reward?.est_delivery_date
        ))
    const [quantity, setQuantity] = useState(reward?.quantity)
    const [image, setImage] = useState(reward?.img_url)
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const maxFileError = "Image exceeds the maximum file size of 5Mb";
    
    useEffect(() => {
        dispatch(thunkGetOneReward(rewardId))
      }, [dispatch, rewardId]) 

    if (!user) {
        return <h2>You must be logged in to create a new reward</h2>;
      }

    if (user?.id != reward?.owner_id) {
        return <h2>You must be the project owner to update a reward</h2>
    }

    const fileWrap = (e) => {
      const file = e.target.files[0];
      if (file.size > 5000000) {
        setImage(maxFileError);
        e.target.value = null;
        return;
      }
  
      setImage(file);
    };

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

        await dispatch(thunkUpdateReward(formData, rewardId))
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
            <h1>Update Your Reward</h1>
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
                  <div className="errors">
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
                  <div>
                    <img src={image} alt="" />
                  </div>
                  <label htmlFor="image">
                    <input 
                      type = "file"
                      accept="image/*"
                      onChange={fileWrap}
                    />
                  </label>
                  <div className="reward-errors">
                      {image === maxFileError && (
                        <p>{image}</p>
                      )}
                      {"image" in errors && <p>{errors.image}</p> }
                  </div>
                  {imageLoading && <p>Loading...</p>}
              </div>
              
              <button type="submit">Update Reward</button>
             
            </form>
        </div>
    )
}

export default EditReward;