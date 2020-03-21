import Leaflet from "leaflet";
import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import "leaflet/dist/leaflet.css";
import "../App.css";
import pointdata from "../point.json";

Leaflet.Icon.Default.imagePath =
  "//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/";

export default function MapPoint(props) {
  return (
    <Map center={props.data} zoom={props.zoom}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pointdata.list.map(city => (
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
    </Map>
  );
}
