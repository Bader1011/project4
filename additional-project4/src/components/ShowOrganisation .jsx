import React, { Component } from "react";

class ShowOrganisation extends Component {
  render() {
    return (
      <div className="o">
        <h1> Name: {this.props.organization.name}</h1>
        <h1> Volunteer member name: {this.props.organization.username} </h1> <br/><br/>
      </div>
    );
  }
}

export default ShowOrganisation;
