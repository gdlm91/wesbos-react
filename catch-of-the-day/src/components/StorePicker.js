import React from "react";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  state = {
    storeName: getFunName()
  };

  handleInputChange = event => {
    this.setState({
      storeName: event.target.value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.props.history.push(`/store/${this.state.storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.handleFormSubmit}>
        <h2>Please Enter a Store</h2>
        <input
          type="text"
          required
          placeholder="Store Name"
          value={this.state.storeName}
          onChange={this.handleInputChange}
        />
        <button type="submit">Visit Store -></button>
      </form>
    );
  }
}

export default StorePicker;
