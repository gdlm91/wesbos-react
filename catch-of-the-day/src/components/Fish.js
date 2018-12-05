import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

export const FishType = PropTypes.shape({
  image: PropTypes.string,
  name: PropTypes.string,
  desc: PropTypes.string,
  price: PropTypes.number,
  status: PropTypes.string
});

class Fish extends React.Component {
  static propTypes = {
    details: FishType.isRequired,
    addToOrder: PropTypes.func.isRequired
  };

  handleAddToCartClick = () => {
    this.props.addToOrder(this.props.index);
  };

  render() {
    const { image, name, desc, price, status } = this.props.details;
    const isAvailable = status === "available";

    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={this.handleAddToCartClick}>
          {isAvailable ? "Add to Cart" : "Sold Out"}
        </button>
      </li>
    );
  }
}

export default Fish;
