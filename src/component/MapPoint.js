import Leaflet from "leaflet";
import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { GestureHandling } from "leaflet-gesture-handling";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import "../App.css";
import pointdata from "../point.json";

Leaflet.Icon.Default.imagePath =
  "//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/";

Leaflet.Map.addInitHook("addHandler", "gestureHandling", GestureHandling);

export default function MapPoint(props) {
  const operation =
    typeof props.operation === "undefined" ? true : props.operation;

  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <Map center={props.data} zoom={props.zoom} gestureHandling={operation}>
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
    </div>
  );
}
