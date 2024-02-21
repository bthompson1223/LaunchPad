import { Link } from 'react-router-dom'
import './BackedListItem.css'
import OpenModalButton from '../OpenModalButton'
import { DeleteBackingModal } from './DeleteBackingModal'

const BackedListItem = ({ backing }) => {
  const deliveryDate = new Date(backing.reward.est_delivery_date).toLocaleString('default', { month: 'long', year: 'numeric'})
  
  return (
    <div>
      <Link to={`/projects/${backing.project.id}`}>
        <div className='backed-list-item-project-div'>
          <img id="backed-list-item-project-thumbnail" src={backing.project.coverImage} alt="" />
          <h2>{backing.project.title}</h2>
        </div>
      </Link>
      <div className='backed-list-item-reward-info'>
        <img src={backing.reward.img_url} alt="" />
        <Link to={`/projects/${backing.project.id}/rewards`}>
          <h3>{backing.reward.name}</h3>
        </Link>
        <h3>Amount pledged: ${backing.reward.amount}</h3>
        <h3>Estimated Delivery: {deliveryDate}</h3>
        <p>{backing.reward.description}</p>
        <OpenModalButton 
          buttonText="Delete My Pledge"
          modalComponent={<DeleteBackingModal backing={backing}/>}
        />
      </div>
    </div>
  )
}

export default BackedListItem