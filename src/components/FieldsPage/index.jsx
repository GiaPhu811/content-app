import React, { Component } from 'react';
import { observer } from 'mobx-react';

const FieldsPage = observer(
  class FieldsPage extends Component {
    constructor(props) {
      super(props);
      console.log(props);
    }
    render() {
      return <div></div>;
    }
  }
);

export default FieldsPage;
