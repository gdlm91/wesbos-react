import React from "react";
import PropTypes from "prop-types";
import { FishType } from "./Fish";

class EditFishForm extends React.Component {
  static propTypes = {
    fish: FishType.isRequired,
    index: PropTypes.string.isRequired,
    updateFish: PropTypes.func.isRequired
  }

  handleOnChange = event => {
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value
    };
    this.props.updateFish(this.props.index, updatedFish);
  };

  render() {
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          value={this.props.fish.name}
          onChange={this.handleOnChange}
        />
        <input
          type="text"
          name="price"
          value={this.props.fish.price}
          onChange={this.handleOnChange}
        />
        <select
          name="status"
          value={this.props.fish.status}
          onChange={this.handleOnChange}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          value={this.props.fish.desc}
          onChange={this.handleOnChange}
        />
        <input
          type="text"
          name="image"
          value={this.props.fish.image}
          onChange={this.handleOnChange}
        />
        <button
          type="button"
          onClick={() => this.props.deleteFish(this.props.index)}
        >
          Delete Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;
