const BackedListItem = ({ project, reward }) => {
  console.log(reward)

  const deliveryDate = reward.est_delivery_date
  
  return (
    <div>
      <h2>{project.title}</h2>
      <img src={reward.img_url} alt="" />
      <h3>{reward.name}</h3>
      <h3>Amount pledged: ${reward.amount}</h3>
      <h3>Estimated Delivery: {deliveryDate}</h3>
      <p>{reward.description}</p>
    </div>
  )
}

export default BackedListItem