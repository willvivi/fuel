import React from "react";
import { IGasStation, IFuel } from "../../models/GasStation";
import { Container } from "./SearchResults.style";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

interface SearchResultsProps {
  results?: IGasStation[];
}

const SearchResults: React.FC<SearchResultsProps> = (
  props: SearchResultsProps
) => (
  <Container>
    <Paper>
      {props.results && props.results.length > 0 && (
        <Table>
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
                    <ul>
                      {gasStation.services.service.map(service => (
                        <li>{service}</li>
                      ))}
                    </ul>
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
  </Container>
);

export default SearchResults;
