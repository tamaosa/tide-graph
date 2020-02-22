import React from "react";
import MyResponsiveLine from "./MyResponsiveLine.js";
import "../App.css";

class TideGrapph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch(`${process.env.PUBLIC_URL}/${this.props.point}.json`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const now = new Date();
      const date = now.toLocaleDateString("ja");
      return (
        <div>
          <h1 class="App-title">
            <span style={{ fontSize: "2em" }}>{items.name}</span>
            のタイトグラフ
          </h1>
          <MyResponsiveLine />
          <p>{date}</p>
          <p>{}</p>
        </div>
      );
    }
  }
}

export default TideGrapph;
