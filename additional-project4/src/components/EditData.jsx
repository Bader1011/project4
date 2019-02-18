import React, { Component } from "react";
class EditData extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
      name: "",
      email: "",
      phone: 0,
      password: ""
    };
  }

  handleChange(event) {
    const Name = event.target.name;
    const Value = event.target.value;

    this.setState({
      [Name]: Value,
      id: this.props.user.id
    });
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateData(this.state);
  }
  
  

  render() {
    console.log(this.props.user);
    return (
      <div><br/> <br/> 
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            onChange={this.handleChange.bind(this)}
            placeholder={this.props.user.name}
          /> <br/><br/>
          
          <label>Email:</label>
          <input
            type="text"
            name="email"
            onChange={this.handleChange.bind(this)}
            placeholder={this.props.user.email}
          /> <br/><br/>
          
          <label>Phone:</label>
          <input
            type="number"
            name="phone"
            onChange={this.handleChange.bind(this)}
            placeholder={this.props.user.phone}
          /> <br/> <br/>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={this.handleChange.bind(this)}
            placeholder={this.props.user.password}
          /> <br/> <br/>
          <button className="submit">Submit</button>
        
        </form>
        <hr /> 
      </div>
    );
  }
}

export default EditData;
