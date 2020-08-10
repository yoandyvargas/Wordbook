import React from "react";
import Results from "../src/components/Results";
import Search from "../src/components/Search";
//owlbot dictionary free public API, https://owlbot.info , installed via npm //
var Owlbot = require("owlbot-js");
var client = Owlbot("cc79e2f4add1dac1bdd8949cbfb560bd3bc12ba5");
//List of words.json from https://github.com/dwyl/english-words/blob/master/words_dictionary.json //
var wordsData = require("./words.json");

class App extends React.Component {
  constructor(props) {
    super(props);
    //States that hold information, words = actual word, pronunciation = self, define array includes type of word, definition of word, related emojis and images//
    this.state = {
      words: "",
      pronunciation: "",
      define: [],
      hasError: "",
    };
  }
  //On page load, randomly pull up a word //
  componentDidMount() {
    window.addEventListener("load", this.randomizer);
  }

  componentWillUnmount() {
    window.removeEventListener("load", this.randomizer);
  }
  //Provided words.json() list of words totalling 2466, generator a random word based off that json file and replace the "input" value to that word
  randomizer = () => {
    let result = Math.floor(Math.random() * 2466);
    const newWord = wordsData.data[`${result}`];
    let input = newWord;
    //fetch OWLBOT dictionary API for previous randomly generated word "input"
    client
      .define(`${input}`)
      .then((res) => {
        return res;
      })
      .then(
        (results) => {
          this.setState({
            words: results.word,
            pronunciation: results.pronunciation,
            define: results.definitions,
            hasError: "",
          });
        },
        (error) => {
          if (error) {
            this.setState({
              hasError: "Word could not be found, try another.",
              words: "",
              pronunciation: "",
              define: [],
            });
          }
        }
      );
  };
  //Search function
  searcher = (event) => {
    event.preventDefault();

    let validateInput = document.getElementById("inputValue");

    if (validateInput.value === "") {
      this.setState({
        hasError:
          "Text field is blank. Please type a word to define or hit the random word button.",
        words: "",
        pronunciation: "",
        define: [],
      });
    } else {
      //Get input from input text and remove symbols from any string inputs
      let input = document
        .getElementById("inputValue")
        .value.replace(/[^a-zA-Z ]/g, "");

      client
        .define(`${input}`)
        .then((res) => {
          return res;
        })
        .then(
          (results) => {
            this.setState({
              words: results.word,
              pronunciation: results.pronunciation,
              define: results.definitions,
              hasError: "",
            });
          },
          (error) => {
            if (error) {
              this.setState({
                hasError: "Word could not be found, try another.",
                words: "",
                pronunciation: "",
                define: [],
              });
            }
          }
        );
    }
  };
  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Wordbook</h1>
        </div>
        <div className="app-container">
          <div className="header-elements">
            <h1>Learn a word or two.</h1>
            <p>
              Search for the definition of a word, or hit shuffle to learn some
              new ones.
            </p>
            <Search
              className="main-1"
              searchValue={this.searcher}
              random={this.randomizer}
              search={this.searcher}
            />
          </div>
          <Results
            className="main-2"
            word={this.state.words}
            error={this.state.hasError}
            pronunciation={this.state.pronunciation}
            define={this.state.define}
          />
        </div>
      </div>
    );
  }
}

export default App;
