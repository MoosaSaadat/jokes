import React, {Component} from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css';

const API_URL = "https://deckofcardsapi.com/api/deck/";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [] };
    this.getCard = this.getCard.bind(this);
  }
  async componentDidMount() {
    let deck = await axios.get(`${API_URL}new/shuffle/?deck_count=1`);
    this.setState({deck: deck.data});
    console.log("Done with it!");
  }
  async getCard() {
    let deck_id = this.state.deck.deck_id;
    try {
      let cardUrl = `${API_URL}${deck_id}/draw/?count=1`;
      let cardRes = await axios.get(cardUrl);
      if (!cardRes.data.success) throw new Error("No Cards Remaining!");
      let card = cardRes.data.cards[0];
      this.setState(currState => ({
        drawn: [
          ...currState.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`
          }
        ]
      }));
    } catch (e) {
      alert(e);
    }
  }
  render() {
    const cardDeck = this.state.drawn.map(c => (
      <Card key={c.id} image={c.image} name={c.name} />
    ));
    return (
      <div className="Deck">
        <h1>CARD DEALER</h1>
        <h2>MADE BY A LOT OF PEOPLE</h2>
        <button className="Deck-btn" onClick={this.getCard}>Generate Card</button>
        <div className="Deck-cardarea">
          {cardDeck}
        </div>
      </div>
    );
  }
}

export default Deck;
