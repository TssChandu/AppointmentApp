import './index.css'

import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appDetails
  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  console.log(date)
  const onClickStarBtn = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="list-container">
      <div className="star-container">
        <p className="title-name">{title}</p>
        <button
          data-testid="star"
          type="button"
          className="star-btn"
          onClick={onClickStarBtn}
        >
          <img src={starImage} alt="star" className="star-img" />
        </button>
      </div>
      <p className="date-input">
        {format(new Date(date), 'dd MMMM yyyy, EEEE')}
      </p>
    </li>
  )
}

export default AppointmentItem
