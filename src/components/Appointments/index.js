import {Component} from 'react'

import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

const appointmentsList = JSON.parse(localStorage.getItem('appointment'))

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentList: appointmentsList !== null ? appointmentsList : [],
    filterApplied: false,
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: dateInput,
      isStarred: false,
    }
    localStorage.setItem(
      'appointment',
      appointmentsList !== null
        ? JSON.stringify([...appointmentsList, newAppointment])
        : JSON.stringify([newAppointment]),
    )
    this.setState(prevState => ({
      titleInput: '',
      dateInput: '',
      appointmentList: [...prevState.appointmentList, newAppointment],
    }))
  }

  toggleIsStarred = id => {
    const storedAppointmentsList = JSON.parse(
      localStorage.getItem('appointment'),
    )
    if (storedAppointmentsList !== null) {
      const updatedAppList = storedAppointmentsList.map(eachApp => {
        if (id === eachApp.id) {
          return {...eachApp, isStarred: !eachApp.isStarred}
        }
        return eachApp
      })
      localStorage.setItem('appointment', JSON.stringify(updatedAppList))
    }
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachApp => {
        if (id === eachApp.id) {
          return {...eachApp, isStarred: !eachApp.isStarred}
        }
        return eachApp
      }),
    }))
  }

  onClickStarredBtn = () => {
    this.setState(prevState => ({
      filterApplied: !prevState.filterApplied,
    }))
  }

  getFilteredList = () => {
    const {appointmentList, filterApplied} = this.state
    if (filterApplied) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput, filterApplied} = this.state
    const filteredBg = !filterApplied ? 'star-bg' : ''
    const filteredAppointmentList = this.getFilteredList()
    return (
      <div className="bg-container">
        <div className="card">
          <div className="app-container">
            <div className="app-content-container">
              <h1 className="main-heading">Add Appointment</h1>
              <form className="form-container" onSubmit={this.onAddAppointment}>
                <label className="label" htmlFor="titleInput">
                  TITLE
                </label>
                <input
                  type="text"
                  id="titleInput"
                  value={titleInput}
                  className="input"
                  placeholder="Title"
                  onChange={this.onChangeTitleInput}
                />
                <label className="label" htmlFor="dateInput">
                  DATE
                </label>
                <input
                  type="date"
                  value={dateInput}
                  className="input"
                  id="dateInput"
                  onChange={this.onChangeDateInput}
                  placeholder="dd/mm/yyyy"
                />
                <button className="add-button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </div>
          <hr className="line" />
          <div className="btm-app-container">
            <h1 className="app-heading">Appointments</h1>
            <button
              className={`starred-btn ${filteredBg}`}
              type="button"
              onClick={this.onClickStarredBtn}
            >
              {filterApplied ? `Show All` : `Starred`}
            </button>
          </div>
          <ul className="app-list-container">
            {filteredAppointmentList.map(eachApp => (
              <AppointmentItem
                key={eachApp.id}
                appDetails={eachApp}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
