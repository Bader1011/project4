import React, { Component } from "react";
import { getUser, logout } from "./services/authService";
import NavBar from "./components/NavBar";
import Auth from "./components/AuthForm";
import "./App.css";
import ShowVolunteer from './components/ShowVolunteer';
import ShowUsers from './components/ShowUsers';
import ShowOrganisation from './components/ShowOrganisation ';
import { setJwt, getJwt } from "./services/authService";
import EditData from './components/EditData';
import ShowLessons from "./components/ShowLessons";
//import VideoCall from './VideoCall';


class App extends Component {
  constructor() {
    super();
    this.state = {
      users: null,
      organization: [],
      activeShow: '',
      edit: false,
      EditData: null,
      form: "signup",
    };
  }

  activeShow = (activeShow) => {

    console.log("\n\n\n\n &&&&&&&&& \n\n\n your are in ", activeShow)
    this.setState({ activeShow })
  }


  checkForUser() {
    const user = getUser();
    if (user) {
      this.setState({ user });
    }
  }


  login = () => {
    const user = getUser();
    this.setState({ user });
  };

  logout = () => {
    logout();
    this.setState({ user: null });
  };

  changeForm = type => {
    console.log(type);
    this.setState({
      form: type
    });
  };

  componentDidMount() {
    this.checkForUser();
    this.getData();
    this.getDataOrganization();


  }



  getData() {
    const url = 'http://localhost:3000/volunteer/'
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ users: data })
        //this.login();
      })
      .catch(error => {
        console.log(error);
      })
  }

  getDataOrganization() {
    const url = 'http://localhost:3000/volunteer/organization'
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ organization: data })
        // this.login();
      })
      .catch(error => {
        console.error(error)
        // console.log(error);
      })
  }

  delete(id) {
    const url = `http://localhost:3000/volunteer/users/${id}`
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
      })
      .catch(error => {
        console.log(error)
      })
  }

  usersData() {
    const user = this.state.users.map(el => {
      if (el.is_volunteer === false) {
        return <ShowUsers delete={this.delete.bind(this)} editeData={this.editeData.bind(this)} user={el} key={el.id} />
      }
    })
    return user
  }

  volunteerData() {
    const volunteer = this.state.users.map(el => {
      if (el.is_volunteer === true) {
        return <ShowVolunteer delete={this.delete.bind(this)} editeData={this.editeData.bind(this)} volunteer={el} key={el.id} />
      }
    })
    return volunteer
  }

  organizationData() {
    const organization = this.state.organization.map(el => {
      return <ShowOrganisation organization={el} key={el.id} />
    })
    return organization
  }




  editeData(data) {
    this.setState({ edit: true, editeData: data })
    console.log(data)
    //return <EditData updateData={this.updateData.bind(this)} user={data}/>
  }

  updateData(data) {
    console.log(data)
    const url = `http://localhost:3000/volunteer/users/${data.id}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": getJwt()
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setJwt(data.token);
        this.login();

        this.setState({ user: data.user })
      })
      .catch(error => {
        console.log(error)
      })
  }


  getProducts = () => { };

  // renderShow() {
  //   if (this.state.activeShow === 'users') {
  //     return this.usersData()
  //   } else if (this.state.activeShow === 'volunteer') {
  //     return this.volunteerData()
  //   } else if (this.state.activeShow === 'organization') {
  //     return this.organizationData()

  //   } else if (this.state.activeShow === 'lessons') {
  //     return <ShowLessons />
  //   } else if (this.state.user === null) {
  //     return (
  //       <div>
  //         <Auth form={this.state.form} onLogin={this.login} />
  //       </div>
  //     )
  //   }
  // }

  renderShow() {
    if (this.state.activeShow === 'users') {
      console.log(this.state.user)
      return this.usersData()

    } else if (this.state.activeShow === 'volunteer') {
      return this.volunteerData()

    } else if (this.state.activeShow === 'organization') {
      return this.organizationData()
    } else if (this.state.activeShow === 'lessons') {
      return <ShowLessons />
    }else if (this.state.user === null) {
      return (
        <div>
          <Auth form={this.state.form} onLogin={this.login} />
        </div>
      )
    }
}

  render() {
    return (
      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <header>

          <NavBar
            user={this.state.user}
            changeForm={this.changeForm}
            logout={this.logout}
            getProducts={this.getProducts}
            activeShow={this.activeShow}
          />
        </header>
        <div className="home">
{this.state.editeData ?<EditData updateData={this.updateData.bind(this)} user={this.state.editeData}/> : false }
          <div className="container">
          <Auth form={this.state.form} onLogin={this.login} />
            {this.state ? this.renderShow() : <Auth form={this.state.form} onLogin={this.login} />}
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
