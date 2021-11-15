import React from "react";
import { CgProfile } from "react-icons/cg";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props;
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }
  toggleDropdown(e) {
    let dropDown = document.getElementsByClassName("drop-down-profile");
    dropDown.addEvenListener("click", function () {
      let result = classes.toggle("c");
      if (result) {
        span.textContent = `'c' added; classList is now "${classes}".`;
      } else {
        span.textContent = `'c' removed; classList is now "${classes}".`;
      }
    });
  }
  render() {
    return (
      <div style={{ position: "relative" }}>
        <CgProfile />
        <div
          className="drop-down-profile"
          style={{
            width: 300,
            height: 400,
            background: "white",
            position: "absolute",
            left: 0,
            top: "25px",
          }}
        >
          <p>Day la hang dau</p>
          <p>Day la hang t2</p>
          <p>Day la hang t3</p>
          <p>Day la hang t4</p>
        </div>
      </div>
    );
  }
}

export default Profile;
