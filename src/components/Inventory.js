import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from "../base";
import firebase from 'firebase';

class Inventory extends React.Component{
  static propTypes = {
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    fishes: PropTypes.object
  };

  state = {
    uid: null,
    owner: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.authHandler({user});
      }
    })
  }

  authHandler = async (authData) => {
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    if(!store.owner){
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    }

    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    })
  };

  authenticate = (provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({uid: null});
  };


  render() {
    const logout = <button onClick={this.logout}>Logout</button>;

    //Check if the user is logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate}/>;
    }

    //Check if they are the owner of the store
    if(this.state.uid !== this.state.owner){
      return (
        <div>
          <p>Sorry you are the not the owner</p>
          {logout}
        </div>
      );
    }

    //They are the owner of the account, render the inventory
    return (
      <div className="inventory">
        {logout}
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(key => <EditFishForm key={key} index={key} fish={this.props.fishes[key]}
                                                                 updateFish={this.props.updateFish}
                                                                 deleteFish={this.props.deleteFish}/>)
        }
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory;