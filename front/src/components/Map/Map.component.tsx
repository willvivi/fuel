import React, { useState, useEffect } from "react";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import { Container, StyledMapContainer, StyledTooltip } from "./Map.style";
import { LatLngExpression, map } from "leaflet";
import IGasStation from "../../models/GasStation";

interface MapProps {
  results: IGasStation[];
}

const Map: React.FC<MapProps> = (props: MapProps) => {
  const defaultPosition: LatLngExpression = props.results[0].location
    ?.coordinates as LatLngExpression;

  useEffect(() => {
    console.log("lel");
  }, [props.results]);

  return (
    <Container>
      <StyledMapContainer center={defaultPosition} zoom={12}>
        {props.results.map((result: IGasStation) => (
          <Marker
            key={result.id}
            position={result.location?.coordinates as LatLngExpression} // 👈
            eventHandlers={{
              click: () => {
                window
                  .open(
                    `https://www.google.com/maps/dir/?api=1&destination=${result.location?.coordinates[0]}%2C${result.location?.coordinates[1]}`,
                    "_blank"
                  )
                  ?.focus();
              },
            }}
          >
            <StyledTooltip>
              <div>
                {result.marque || result.nom
                  ? `${result.marque} - ${result.nom}`
                  : "Inconnu"}
              </div>
              <ul>
                {result.sp95 > 0 && <li>SP95: {result.sp95}€/L</li>}
                {result.sp95E10 > 0 && <li>SP95-E10: {result.sp95E10}€/L</li>}
                {result.sp98 > 0 && <li>SP98: {result.sp98}€/L</li>}
                {result.gnv > 0 && <li>GPL: {result.gnv}€/L</li>}
                {result.e85 > 0 && <li>E85: {result.e85}€/L</li>}
              </ul>
            </StyledTooltip>
          </Marker>
        ))}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </StyledMapContainer>
    </Container>
  );
};

export default Map;
