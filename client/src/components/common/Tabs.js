import React, { Component } from "react";

export default class componentName extends Component {
  render() {
    return (
      <div className="bd-example bd-example-tabs">
        <nav className="nav nav-tabs" id="nav-tab" role="tablist">
          <a
            className="nav-item nav-link active"
            id="nav-home-tab"
            data-toggle="tab"
            href="#nav-home"
            role="tab"
            aria-controls="home"
            aria-expanded="true"
          >
            Home
          </a>
          <a
            className="nav-item nav-link"
            id="nav-profile-tab"
            data-toggle="tab"
            href="#nav-profile"
            role="tab"
            aria-controls="profile"
            aria-expanded="false"
          >
            Profile
          </a>
        </nav>
        <div className="tab-content" id="nav-tabContent">
          <div
            className="tab-pane fade active show"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
            aria-expanded="true"
          >
            <p>
              Et et consectetur ipsum labore excepteur est proident excepteur ad
              velit occaecat qui minim occaecat veniam. Fugiat veniam incididunt
              anim aliqua enim pariatur veniam sunt est aute sit dolor anim.
              Velit non irure adipisicing aliqua ullamco irure incididunt irure
              non esse consectetur nostrud minim non minim occaecat. Amet duis
              do nisi duis veniam non est eiusmod tempor incididunt tempor dolor
              ipsum in qui sit. Exercitation mollit sit culpa nisi culpa non
              adipisicing reprehenderit do dolore. Duis reprehenderit occaecat
              anim ullamco ad duis occaecat ex.
            </p>
          </div>
          <div
            className="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
            aria-expanded="false"
          >
            <p>
              Nulla est ullamco ut irure incididunt nulla Lorem Lorem minim
              irure officia enim reprehenderit. Magna duis labore cillum sint
              adipisicing exercitation ipsum. Nostrud ut anim non exercitation
              velit laboris fugiat cupidatat. Commodo esse dolore fugiat sint
              velit ullamco magna consequat voluptate minim amet aliquip ipsum
              aute laboris nisi. Labore labore veniam irure irure ipsum pariatur
              mollit magna in cupidatat dolore magna irure esse tempor ad
              mollit. Dolore commodo nulla minim amet ipsum officia consectetur
              amet ullamco voluptate nisi commodo ea sit eu.
            </p>
          </div>
          <div
            className="tab-pane fade"
            id="nav-dropdown1"
            role="tabpanel"
            aria-labelledby="nav-dropdown1-tab"
          >
            <p>Sint</p>
          </div>
          <div
            className="tab-pane fade"
            id="nav-dropdown2"
            role="tabpanel"
            aria-labelledby="nav-dropdown2-tab"
          >
            <p>
              Proident incididunt esse qui ea nisi ullamco aliquip nostrud velit
              sint duis. Aute culpa aute cillum sit consectetur mollit minim non
              reprehenderit tempor. Occaecat amet consectetur aute esse ad
              ullamco ad commodo mollit reprehenderit esse in consequat. Mollit
              minim do consectetur pariatur irure non id ea dolore occaecat
              adipisicing consectetur est aute magna non.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
