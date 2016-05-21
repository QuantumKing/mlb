import React, { Component, PropTypes } from 'react'
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment';

export default class DatePicker extends Component {
  constructor(props) {
    super(props)
    this.previousDate = this.previousDate.bind(this)
    this.nextDate = this.nextDate.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  previousDate() {
    var tmp = new Date(this.props.value)
    var newDate = new Date(tmp.setDate(tmp.getDate() - 1))
    this.handleDateChange(newDate)
  }

  nextDate() {
    var tmp = new Date(this.props.value)
    var newDate = new Date(tmp.setDate(tmp.getDate() + 1))
    this.handleDateChange(newDate)
  }

  handleDateChange(nextDate) {
    if (nextDate && nextDate.getTime() !== this.props.value.getTime()) {
      this.props.onChange(nextDate);
    }
  }

  render() {
    const { value, onChange } = this.props

    const segmentStyle = {
      display: 'inline-block',
      margin: '0px 5px',
      cursor: 'pointer'
    }

    return (
      <h3 style={{textAlign: 'center'}}>
        <span style={segmentStyle} onClick={this.previousDate}>&lt;</span>
        <span style={segmentStyle}>
          <ReactDatePicker className='react-datepicker-input'
            selected={moment(value)}
            maxDate={moment()}
            onChange={momentDate => this.handleDateChange(momentDate.toDate())} />
        </span>
        <span style={segmentStyle} onClick={this.nextDate}>&gt;</span>
      </h3>
    )
  }
}

DatePicker.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}
