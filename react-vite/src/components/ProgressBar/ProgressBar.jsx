import './ProgressBar.css'

const ProgressBar = ({project}) => {

  const spanStyle = {
    width: `${project.totalFunded / project.fundingGoal}%`
    // width: "80%"
  }

  return (
    <div className="progress-bar">
      <span style={spanStyle}></span>
    </div>
  )
}

export default ProgressBar