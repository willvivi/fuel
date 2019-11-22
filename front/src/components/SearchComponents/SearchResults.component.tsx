import React from "react";
import { IGasStation, IFuel } from "../../models/GasStation";
import {
  Results,
  GasStation,
  Price,
  GasStationName,
  GasStationPrices,
  Container,
  GasStationDetails,
  GasStationAddress,
} from "./SearchResults.style";

interface SearchResultsProps {
  results: IGasStation[];
}

const SearchResults: React.FC<SearchResultsProps> = (
  props: SearchResultsProps
) => (
  <Container>
    <Results>
      {props.results.map((gasStation: IGasStation) => {
        return (
          <GasStation>
            <GasStationDetails>
              <GasStationName>
                {gasStation.nom && gasStation.nom}
              </GasStationName>
              <GasStationAddress>
                {gasStation.adresse} - {gasStation.cp} {gasStation.ville}
              </GasStationAddress>
            </GasStationDetails>
            <GasStationPrices>
              {gasStation.prix.map((price: IFuel) => {
                return (
                  <Price>
                    {price.nom} - {price.valeur}€
                  </Price>
                );
              })}
            </GasStationPrices>
          </GasStation>
        );
      })}
    </Results>
  </Container>
);

export default SearchResults;
