import React from "react";
import { formatPrice } from "../helpers";

class Order extends React.Component {
  render() {
    const { fishes, order } = this.props;
    const orderIds = Object.keys(order);
    const total = orderIds.reduce((total, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === "available";
      if (isAvailable) {
        return total + count * fish.price;
      }

      return total;
    }, 0);

    return (
      <div className="order">
        <h2>Your Order</h2>
        <ul className="order">{orderIds.map(this.renderOrder)}</ul>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }

  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === "available";

    // Case when the fishes are available in localStorage roder but the list is loading from Firebase
    if (!fish) return null;

    if (!isAvailable) {
      return (
        <li key={key}>
          Sorry {fish ? fish.name : "fish"} is no longer available
        </li>
      );
    }

    return (
      <li key={key}>
        {count} lbs {fish.name}
        {formatPrice(count * fish.price)}
      </li>
    );
  };
}

export default Order;
