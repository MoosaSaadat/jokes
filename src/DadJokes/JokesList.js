import React, {Component} from 'react';
import axios from 'axios';
import Joke from './Joke'
import './JokesList.css';

class JokesList extends Component {
  static defaultProps = {
    jokesToFetch: 10,
  }
  constructor (props) {
    super(props);
    this.state = {
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
      isLoading: false
    }
    this.existingJokes = new Set(this.state.jokes.map(j => j.id));
    this.handleClick = this.handleClick.bind(this);
    this.handleVotes = this.handleVotes.bind(this);
  }
  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.setState({isLoading: true});
      this.getNewJokes();
    }
  }
  async getNewJokes () {
    try {
      let jokes = [];
      while (jokes.length < this.props.jokesToFetch) {
        let res = await axios.get("https://icanhazdadjoke.com/", {headers:
          { Accept: "application/json"}
        });
        res.data = {...res.data, votes: 0};
        if (!this.existingJokes.has(res.data.id)) {
          jokes.push(res.data);
          this.existingJokes.add(res.data.id);
        }
      }
      this.setState(st => ({ isLoading: false, jokes: [...st.jokes, ...jokes]}),
      () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)));
    } catch (e) {
      this.setState({isLoading: false});
      alert(e);
    }
  }
  handleClick () {
    this.setState({isLoading: true}, this.getNewJokes);
  }
  handleVotes (id, add) {
    this.setState(st => ({
      jokes: st.jokes.map(j =>
          j.id === id ? {...j, votes: j.votes + add} : j)
    }),
    () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)));
  }
  render() {
    const jokes = this.state.jokes.map(c => {
      return <Joke key={c.id}
                  id={c.id}
                  votes={c.votes}
                  joke={c.joke}
                  handleVotes={this.handleVotes} />
    });
    return (
      <div className="JokesList">
        <div className="JokesList-header">
          <span role="img" aria-label="emoji" className="JokesList-emoji">&#128514;</span>
          <h1 className="JokesList-title">Jokes List</h1>
          <h3 className="JokesList-title subtitle">
            You don't need to read the best jokes to smile...
          </h3>
        </div>
        <div className="JokesList-list">
          <table>
            <tbody>
              {jokes}
            </tbody>
          </table>
          {
            this.state.isLoading
            ? (<i className="far fa-2x fa-laugh fa-spin loader" />)
            : (
              <button className="btn" onClick={this.handleClick}>
                Get More Jokes?
              </button>
            )
          }
        </div>
      </div>
    )
  }
}

export default JokesList;
