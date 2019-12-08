import React from "react";
import { IGasStation, IFuel } from "../../models/GasStation";
import { Container } from "./SearchResults.style";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import BuildIcon from "@material-ui/icons/Build";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import LocalCarWashIcon from "@material-ui/icons/LocalCarWash";
import WcIcon from "@material-ui/icons/Wc";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import AlbumIcon from "@material-ui/icons/Album";
import EmailIcon from "@material-ui/icons/Email";
import WifiIcon from "@material-ui/icons/Wifi";
import EvStationIcon from "@material-ui/icons/EvStation";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import LocalLaundryServiceIcon from "@material-ui/icons/LocalLaundryService";
import RvHookupIcon from "@material-ui/icons/RvHookup";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import BathtubIcon from "@material-ui/icons/Bathtub";
import FormatColorResetIcon from "@material-ui/icons/FormatColorReset";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
interface SearchResultsProps {
  results?: IGasStation[];
}

const SearchResults: React.FC<SearchResultsProps> = (
  props: SearchResultsProps
) => (
  <Container>
    <Grid item xs={12}>
      <Paper>
        {props.results && props.results.length > 0 && (
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableCell>Station</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Postcode</TableCell>
              <TableCell>Services</TableCell>
              <TableCell>E10 (SP95)</TableCell>
              <TableCell>E5 (SP95)</TableCell>
              <TableCell>E5 (SP98)</TableCell>
              <TableCell>E85</TableCell>
              <TableCell>Diesel</TableCell>
            </TableHead>
            <TableBody>
              {props.results &&
                props.results.map((gasStation: IGasStation) => (
                  <TableRow key={gasStation.id}>
                    <TableCell>{gasStation.nom}</TableCell>
                    <TableCell>{gasStation.marque}</TableCell>
                    <TableCell>{gasStation.adresse}</TableCell>
                    <TableCell>{gasStation.ville}</TableCell>
                    <TableCell>{gasStation.cp}</TableCell>
                    <TableCell>
                      {gasStation.services.service.map(service => (
                        <Tooltip title={service}>{getService(service)}</Tooltip>
                      ))}
                    </TableCell>
                    <TableCell>
                      {gasStation.prix.map((prix: IFuel) =>
                        prix.nom === "E10" ? prix.valeur : ""
                      )}
                    </TableCell>
                    <TableCell>
                      {gasStation.prix.map((prix: IFuel) =>
                        prix.nom === "SP95" ? prix.valeur : ""
                      )}
                    </TableCell>
                    <TableCell>
                      {gasStation.prix.map((prix: IFuel) =>
                        prix.nom === "SP98" ? prix.valeur : ""
                      )}
                    </TableCell>
                    <TableCell>
                      {gasStation.prix.map((prix: IFuel) =>
                        prix.nom === "E85" ? prix.valeur : ""
                      )}
                    </TableCell>
                    <TableCell>
                      {gasStation.prix.map((prix: IFuel) =>
                        prix.nom === "Gazole" ? prix.valeur : ""
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Grid>
  </Container>
);

const getService: Function = (service: string): JSX.Element => {
  switch (service) {
    case "Carburant additivé":
      return <EvStationIcon />;
    case "Boutique alimentaire":
      return <ShoppingCartIcon />;
    case "Station de gonflage":
      return <AlbumIcon />;
    case "Boutique non alimentaire":
      return <ShoppingCartIcon />;
    case "Services réparation / entretien":
      return <BuildIcon />;
    case "Piste poids lourds":
      return <LocalShippingIcon />;
    case "DAB (Distributeur automatique de billets)":
      return <LocalAtmIcon />;
    case "Lavage automatique":
      return <LocalCarWashIcon />;
    case "Lavage manuel":
      return <LocalCarWashIcon />;
    case "Vente de fioul domestique":
      return <InvertColorsIcon />;
    case "Vente de gaz domestique (Butane, Propane)":
      return <FormatColorResetIcon />;
    case "Toilettes publiques":
      return <WcIcon />;
    case "Location de véhicule":
      return <DirectionsCarIcon />;
    case "GNV":
      return <FormatColorResetIcon />;
    case "Restauration à emporter":
      return <FastfoodIcon />;
    case "Relais colis":
      return <EmailIcon />;
    case "Wifi":
      return <WifiIcon />;
    case "Automate CB 24/24":
      return <LocalAtmIcon />;
    case "Vente d'additifs carburants":
      return <InvertColorsIcon />;
    case "Aire de camping-cars":
      return <RvHookupIcon />;
    case "Restauration sur place":
      return <RestaurantIcon />;
    case "Vente de pétrole lampant":
      return <InvertColorsIcon />;
    case "Laverie":
      return <LocalLaundryServiceIcon />;
    case "Espace bébé":
      return <ChildCareIcon />;
    case "bar":
      return <LocalBarIcon />;
    case "Douches":
      return <BathtubIcon />;
    default:
      return <HelpOutlineIcon />;
  }
};

export default SearchResults;
