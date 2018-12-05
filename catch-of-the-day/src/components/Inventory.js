import React from "react";
import PropTypes from "prop-types";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import { FishType } from "./Fish";

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.objectOf(FishType),
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired
  };

  render() {
    const { addFish, loadSampleFishes, fishes } = this.props;

    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {Object.keys(fishes).map(key => (
          <EditFishForm
            key={key}
            index={key}
            fish={this.props.fishes[key]}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={addFish} />
        <button onClick={loadSampleFishes}>Load sample fishes</button>
      </div>
    );
  }
}

export default Inventory;
