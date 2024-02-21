import { Link } from 'react-router-dom'
import './BackedListItem.css'

const BackedListItem = ({ project, reward }) => {
  const deliveryDate = new Date(reward.est_delivery_date).toLocaleString('default', { month: 'long', year: 'numeric'})
  
  return (
    <div>
      <Link to={`/projects/${project.id}`}>
        <div className='backed-list-item-project-div'>
          <img id="backed-list-item-project-thumbnail" src={project.coverImage} alt="" />
          <h2>{project.title}</h2>
        </div>
      </Link>
      <div className='backed-list-item-reward-info'>
        <img src={reward.img_url} alt="" />
        <Link to={`/projects/${project.id}/rewards`}>
          <h3>{reward.name}</h3>
        </Link>
        <h3>Amount pledged: ${reward.amount}</h3>
        <h3>Estimated Delivery: {deliveryDate}</h3>
        <p>{reward.description}</p>
      </div>
    </div>
  )
}

export default BackedListItem