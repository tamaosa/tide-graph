import React from "react";
import MapPoint from "../component/MapPoint.js";

const FullMap = () => (
  <div
    style={{
      width: "100%",
      height: "100vh",
    }}
  >
    <MapPoint data={[36, 138]} zoom={5} operation={false} />
  </div>
);

export default FullMap;
