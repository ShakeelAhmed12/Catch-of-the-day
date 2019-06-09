import React from 'react';
import { getFunName } from "../helpers";
import PropTypes from 'prop-types';
class StorePicker extends React.Component {
  myInput = React.createRef();

  static propTypes = {
    history: PropTypes.object
  };

  goToStore = event => {
      event.preventDefault();
      const storeName = this.myInput.current.value;
      // console.log(this.myInput.current.value);
      this.props.history.push(`/store/${storeName}`)
  };

  render() {
    return(
      <form className="store-selector" onSubmit={this.goToStore}>
        { /* comment */ }
        <h2>Please Enter A Store</h2>
        <input type="text"
               ref={this.myInput}
               placeholder="Store Name"
               required
               defaultValue={getFunName()}/>
        <button type="submit">Visit Store ></button>
      </form>
    );
  }
}

export default StorePicker;