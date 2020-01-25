import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";

import IGasStation from "../../models/GasStation";

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
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { IToggles } from "../../models/Search";

interface SearchResultsProps {
  toggles: IToggles;
  results: IGasStation[];
}

function desc<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

type Order = "asc" | "desc";

function getSorting<K extends keyof any>(
  order: Order,
  orderBy: K
): (
  a: { [key in K]: number | string },
  b: { [key in K]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

interface HeadCell {
  id: string;
  label: string;
  show: boolean;
}

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  toggles: IToggles;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: string) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  const headCells: HeadCell[] = [
    {
      id: "nom",
      label: "Station",
      show: true,
    },
    { id: "gazole", label: "Gazole", show: props.toggles.Gazole },

    { id: "sp95E10", label: "E10 (SP95)", show: props.toggles.SP95E10 },
    { id: "sp95", label: "E5 (SP95)", show: props.toggles.SP95 },
    { id: "sp98", label: "E5 (SP98)", show: props.toggles.SP98 },
    { id: "e85", label: "E85", show: props.toggles.E85 },
    { id: "gnv", label: "GPL", show: props.toggles.GNV },
    {
      id: "cp",
      label: "Adresse / CP",
      show: true,
    },
    { id: "services", label: "Services", show: true },
  ];

  return (
    <TableHead>
      <TableRow>
        {headCells.map(
          headCell =>
            headCell.show && (
              <TableCell
                key={headCell.id}
                align="left"
                padding="default"
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={order}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )
        )}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    unavailable: {
      backgroundColor: "#E3E2E2",
    },
    root: {
      width: "100%",
      overflowX: "scroll",
    },
    paper: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
      maxWidth: 1500,
    },
    tableWrapper: {
      overflowX: "auto",
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

const SearchResults: React.FC<SearchResultsProps> = (
  props: SearchResultsProps
) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("gazole");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={props.results.length}
              toggles={props.toggles}
            />
            <TableBody>
              {stableSort<any>(
                props.results,
                getSorting<string>(order, orderBy)
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((gasStation: IGasStation) => {
                  return (
                    <TableRow key={gasStation.id}>
                      <TableCell>
                        {gasStation.nom ? (
                          gasStation.nom
                        ) : (
                          <span style={{ fontStyle: "italic" }}>Inconnu</span>
                        )}{" "}
                        {gasStation.marque &&
                          gasStation.nom &&
                          gasStation.marque !== gasStation.nom &&
                          " - " + gasStation.marque}
                      </TableCell>
                      {props.toggles.Gazole && (
                        <TableCell
                          className={
                            gasStation.gazole === 0 ? classes.unavailable : ""
                          }
                        >
                          {gasStation.gazole > 0 ? (
                            gasStation.gazole
                          ) : (
                            <span style={{ fontStyle: "italic" }}>
                              Carburant indisp.
                            </span>
                          )}
                        </TableCell>
                      )}
                      {props.toggles.SP95E10 && (
                        <TableCell
                          className={
                            gasStation.sp95E10 === 0 ? classes.unavailable : ""
                          }
                        >
                          {gasStation.sp95E10 > 0 ? (
                            gasStation.sp95E10
                          ) : (
                            <span style={{ fontStyle: "italic" }}>
                              Carburant indisp.
                            </span>
                          )}
                        </TableCell>
                      )}
                      {props.toggles.SP95 && (
                        <TableCell
                          className={
                            gasStation.sp95 === 0 ? classes.unavailable : ""
                          }
                        >
                          {gasStation.sp95 > 0 ? (
                            gasStation.sp95
                          ) : (
                            <span style={{ fontStyle: "italic" }}>
                              Carburant indisp.
                            </span>
                          )}
                        </TableCell>
                      )}
                      {props.toggles.SP98 && (
                        <TableCell
                          className={
                            gasStation.sp98 === 0 ? classes.unavailable : ""
                          }
                        >
                          {gasStation.sp98 > 0 ? (
                            gasStation.sp98
                          ) : (
                            <span style={{ fontStyle: "italic" }}>
                              Carburant indisp.
                            </span>
                          )}
                        </TableCell>
                      )}
                      {props.toggles.E85 && (
                        <TableCell
                          className={
                            gasStation.e85 === 0 ? classes.unavailable : ""
                          }
                        >
                          {gasStation.e85 > 0 ? (
                            gasStation.e85
                          ) : (
                            <span style={{ fontStyle: "italic" }}>
                              Carburant indisp.
                            </span>
                          )}
                        </TableCell>
                      )}
                      {props.toggles.GNV && (
                        <TableCell
                          className={
                            gasStation.gnv === 0 ? classes.unavailable : ""
                          }
                        >
                          {gasStation.gnv > 0 ? (
                            gasStation.gnv
                          ) : (
                            <span style={{ fontStyle: "italic" }}>
                              Carburant indisp.
                            </span>
                          )}
                        </TableCell>
                      )}
                      <TableCell>
                        <a
                          rel="noopener noreferrer"
                          href={`https://www.google.com/maps/place/${gasStation.adresse.replace(
                            " ",
                            "+"
                          )}+${gasStation.ville.replace(" ", "+")}+${
                            gasStation.cp
                          }`}
                          target="_blank"
                          style={{ color: "black" }}
                        >
                          {gasStation.adresse}
                        </a>{" "}
                        {gasStation.ville} {gasStation.cp}
                      </TableCell>
                      <TableCell>
                        {gasStation.services.service.map(service => (
                          <Tooltip title={service}>
                            {getService(service)}
                          </Tooltip>
                        ))}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </Paper>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100, 500]}
        component="div"
        count={props.results.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default SearchResults;

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
