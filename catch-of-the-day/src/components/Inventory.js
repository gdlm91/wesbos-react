import React from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import { FishType } from "./Fish";
import Login from "./Login";
import base, { firebaseApp } from "../base";

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.objectOf(FishType),
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired
  };

  state = {
    uid: null,
    owner: null
  };

  componentDidMount() {
    // Auto login
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  authHandler = async authData => {
    const store = await base.fetch(this.props.storeId, { context: this });

    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }

    this.setState({
      uid: authData.user.uid,
      owner: store.ownser || authData.user.uid
    });
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  render() {
    const { addFish, loadSampleFishes, fishes } = this.props;

    const logout = <button onClick={this.logout}>Log Out!</button>;

    // Not logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // Not the owner
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          Sorry, you are not the owner
          {logout}
        </div>
      );
    }

    // Owner
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
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
