
var React = require('react');
var connect = require('react-redux').connect;

var Header = require('./header');
var GameForm = require('./game-form');
var GuessCountAndList = require('./guess-and-count-list');

var actions = require('../actions');

class Game extends React.Component{
  constructor(props){
    super(props);

  }
  componentWillMount(){
  }
  render() {
    return (
      <section className="game">
        <h2 id='feedback'>{this.props.feedback}</h2>
        <GameForm />
        <GuessCountAndList guessCount={this.props.guessCount} guessArray={this.props.guessArray}
          fewestGuesses={this.props.fewestGuesses} />
      </section>
    );
  }
}

var mapStateToProps = function(state, props){
  console.log('state count ', state.guessCount)
  return {
    feedback: state.feedback,
    guessArray: state.guessArray,
    guessCount: state.guessCount,
    fewestGuesses: state.fewestGuesses
  };
};

var Container = connect(mapStateToProps)(Game);

module.exports = Container;