import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 33.7756,
  lng: -84.3963,
};

const locations = [
  { name: "Home", position: { lat: 33.7756, lng: -84.3963 } },
  { name: "Starbucks", position: { lat: 33.7600, lng: -84.3900 } },
];

export default function TaskMap() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCwqZgyj6u7PDcEkib-bCcbX30dffYiW90">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {locations.map((loc, i) => (
          <Marker key={i} position={loc.position} title={loc.name} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
