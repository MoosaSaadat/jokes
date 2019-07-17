import React, {Component} from 'react';
import './Joke.css';

class Joke extends Component {
  constructor(props) {
    super(props);
    this.handleUpvote = this.handleUpvote.bind(this);
    this.handleDownvote = this.handleDownvote.bind(this);
  }
  handleUpvote () {
    this.props.handleVotes(this.props.id, 1);
  }
  handleDownvote () {
    this.props.handleVotes(this.props.id, -1);
  }
  getEmoji() {
    if (this.props.votes >= 15) return "😂";
    else if (this.props.votes >= 12) return "😁";
    else if (this.props.votes >= 9) return "😃";
    else if (this.props.votes >= 6) return "😎";
    else if (this.props.votes >= 3) return "😊";
    else if (this.props.votes >= 0) return "😕";
    else return "😠";
  }
  getColor() {
    if (this.props.votes >= 15) return "#4CAF50";
    else if (this.props.votes >= 12) return "#8BC34A";
    else if (this.props.votes >= 9) return "#CDDC39";
    else if (this.props.votes >= 6) return "#FFEB3B";
    else if (this.props.votes >= 3) return "#FFC107";
    else if (this.props.votes >= 0) return "#FF9800";
    else return "#F44336";
  }
  render () {
    return (
      <tr className="Joke">
        <td>
          <div className="Joke-points">
            <button className="fas fa-arrow-up" onClick={this.handleUpvote} />
            <h3 style={{color: this.getColor(),
                        borderBottom: `2px solid ${this.getColor()}`}}>
              {this.props.votes}
            </h3>
            <button className="fas fa-arrow-down" onClick={this.handleDownvote} />
          </div>
        </td>
        <td>
          {this.props.joke}
        </td>
        <td>
          <span>
            {this.getEmoji()}
          </span>
        </td>
      </tr>
    );
  }
}

export default Joke;
