import React, { Component, PropTypes } from 'react'

export default class DatePicker extends Component {
  render() {
    const { value, onChange } = this.props

    return (
      <span>
        <h1>{value.toLocaleDateString()}</h1>
      </span>
    )
  }
}

DatePicker.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
}
