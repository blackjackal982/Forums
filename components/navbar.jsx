import React, { Component } from "react";

class NavBar extends Component {
  handleClick = (e)=>
  {
    console.log("started search");
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-light" style={{fontSize:"30px",fontWeight:"bold",color:"aliceblue"}}>FORUMS</a>
        <form className="form-inline">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{fontSize:"20px"}}/>

        </form>
        </nav>
        </div>
    );
  }
}

export default NavBar;
