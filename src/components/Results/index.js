import React from "react";
import "./index.css";

class Results extends React.Component {
  render() {
    return (
      <div className="container">
        <div>
          <h1>{this.props.word}</h1>
          <p>{this.props.error}</p>
        </div>
        <h4>{this.props.pronunciation}</h4>
        <div>
          <ul>
            {this.props.define.map((item, index) => (
              <li key={index}>
                <p>
                  {item.definition} {item.emoji}
                </p>
                <p>
                  <em>{item.type}</em>
                </p>
                <img src={item.image_url} alt="" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Results;
