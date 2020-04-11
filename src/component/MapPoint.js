import Leaflet from "leaflet";
import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import "../App.css";
import pointdata from "../point.json";

Leaflet.Icon.Default.imagePath =
  "//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/";

function isPC() {
  if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)) {
    return false;
  } else {
    return true;
  }
}

export default function MapPoint(props) {
  return (
    <div>
      <Map
        center={props.data}
        zoom={props.zoom}
        scrollWheelZoom={isPC()}
        dragging={isPC()}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {pointdata.list.map((city) => (
            <div key={city}>
              <Marker position={[pointdata[city].lat, pointdata[city].lon]}>
                <Popup>
                  <Link href={`/${pointdata[city].point}`} color="inherit">
                    <Typography>{city}</Typography>
                  </Link>
                </Popup>
              </Marker>
            </div>
          ))}
        </MarkerClusterGroup>
      </Map>
      {!isPC() && (
        <p style={{ fontSize: "0.5em" }}>
          地図を操作するには2本指を使用して下さい
        </p>
      )}
    </div>
  );
}
