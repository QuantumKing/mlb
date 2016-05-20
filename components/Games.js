import React, { PropTypes, Component } from 'react'

export default class Games extends Component {
  render() {
    return (
      <ul>
        {this.props.games.map((game, i) =>
          <li key={i}>{post.title}</li>
        )}
      </ul>
    )
  }
}

Posts.propTypes = {
  games: PropTypes.array.isRequired
}
