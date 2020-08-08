import React from "react";
import "./index.css";
import RandomIcon from "./randomicon.png";
import SearchIcon from "./searchicon.png";

class Search extends React.Component {
  render() {
    return (
      <div className="search">
        <form onSubmit={this.props.searchValue}>
          <input type="text" id="inputValue"></input>
          <img
            onClick={this.props.search}
            src={SearchIcon}
            alt="randomizer icon, curved arrows"
          />
          <img
            id="randomizer"
            onClick={this.props.random}
            src={RandomIcon}
            alt="randomizer icon, curved arrows"
          />
        </form>
      </div>
    );
  }
}

export default Search;
