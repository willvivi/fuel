import React from "react";
import { createStyles, makeStyles } from "@mui/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  Tooltip,
} from "@mui/material";

import { Theme } from "@mui/material/styles";

import IGasStation from "../../models/GasStation";

import {
  ShoppingCart,
  ChildCare,
  Build,
  LocalShipping,
  LocalAtm,
  LocalCarWash,
  Wc,
  DirectionsCar,
  Fastfood,
  Album,
  Email,
  Wifi,
  EvStation,
  InvertColors,
  LocalLaundryService,
  RvHookup,
  Restaurant,
  LocalBar,
  Bathtub,
  FormatColorReset,
  HelpOutline,
  Place,
} from "@mui/icons-material";

import { IToggles } from "../../models/Search";

import { format } from "date-fns";
import { TableFooter } from "@mui/material";

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
  return stabilizedThis.map((el) => el[0]);
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
  label: string | JSX.Element;
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
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  const headCells: HeadCell[] = [
    {
      id: "nom",
      label: "Station",
      show: true,
    },
    { id: "distance", label: <Place />, show: props.toggles.distance },
    { id: "gazole", label: "Gazole", show: props.toggles.Gazole },
    { id: "sp95E10", label: "SP95-E10", show: props.toggles.SP95E10 },
    { id: "sp95", label: "SP95", show: props.toggles.SP95 },
    { id: "sp98", label: "SP98", show: props.toggles.SP98 },
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
          (headCell) =>
            headCell.show && (
              <TableCell
                key={headCell.id}
                align="left"
                padding="normal"
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
            {stableSort<any>(props.results, getSorting<string>(order, orderBy))
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
                    {props.toggles.distance && gasStation.distance && (
                      <TableCell>
                        {gasStation.distance.toFixed(2) + " km"}
                      </TableCell>
                    )}
                    {props.toggles.Gazole && (
                      <TableCell
                        className={
                          gasStation.gazole === 0 ? classes.unavailable : ""
                        }
                      >
                        {gasStation.gazole > 0 ? (
                          gasStation.gazole + " €/L"
                        ) : (
                          <span style={{ fontStyle: "italic" }}>
                            Indisponible
                          </span>
                        )}
                        {gasStation.lastUpdate.gazole &&
                          getFormattedDate(gasStation.lastUpdate.gazole)}
                      </TableCell>
                    )}
                    {props.toggles.SP95E10 && (
                      <TableCell
                        className={
                          gasStation.sp95E10 === 0 ? classes.unavailable : ""
                        }
                      >
                        {gasStation.sp95E10 > 0 ? (
                          gasStation.sp95E10 + " €/L"
                        ) : (
                          <span style={{ fontStyle: "italic" }}>
                            Indisponible
                          </span>
                        )}
                        {gasStation.lastUpdate.sp95E10 &&
                          getFormattedDate(gasStation.lastUpdate.sp95E10)}
                      </TableCell>
                    )}
                    {props.toggles.SP95 && (
                      <TableCell
                        className={
                          gasStation.sp95 === 0 ? classes.unavailable : ""
                        }
                      >
                        {gasStation.sp95 > 0 ? (
                          gasStation.sp95 + " €/L"
                        ) : (
                          <span style={{ fontStyle: "italic" }}>
                            Indisponible
                          </span>
                        )}
                        {gasStation.lastUpdate.sp95 &&
                          getFormattedDate(gasStation.lastUpdate.sp95)}
                      </TableCell>
                    )}
                    {props.toggles.SP98 && (
                      <TableCell
                        className={
                          gasStation.sp98 === 0 ? classes.unavailable : ""
                        }
                      >
                        {gasStation.sp98 > 0 ? (
                          gasStation.sp98 + " €/L"
                        ) : (
                          <span style={{ fontStyle: "italic" }}>
                            Indisponible
                          </span>
                        )}
                        {gasStation.lastUpdate.sp98 &&
                          getFormattedDate(gasStation.lastUpdate.sp98)}
                      </TableCell>
                    )}
                    {props.toggles.E85 && (
                      <TableCell
                        className={
                          gasStation.e85 === 0 ? classes.unavailable : ""
                        }
                      >
                        {gasStation.e85 > 0 ? (
                          gasStation.e85 + " €/L"
                        ) : (
                          <span style={{ fontStyle: "italic" }}>
                            Indisponible
                          </span>
                        )}
                        {gasStation.lastUpdate.e85 &&
                          getFormattedDate(gasStation.lastUpdate.e85)}
                      </TableCell>
                    )}
                    {props.toggles.GNV && (
                      <TableCell
                        className={
                          gasStation.gnv === 0 ? classes.unavailable : ""
                        }
                      >
                        {gasStation.gnv > 0 ? (
                          gasStation.gnv + " €/L"
                        ) : (
                          <span style={{ fontStyle: "italic" }}>
                            Indisponible
                          </span>
                        )}
                        {gasStation.lastUpdate.gnv &&
                          getFormattedDate(gasStation.lastUpdate.gnv)}
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
                        {formattedCapitalize(gasStation.adresse)}
                        {", "}
                        {gasStation.cp} {formattedCapitalize(gasStation.ville)}
                      </a>
                    </TableCell>
                    <TableCell>
                      {gasStation.services.service.map((service) => (
                        <Tooltip key={service} title={service}>
                          {getService(service)}
                        </Tooltip>
                      ))}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                align="left"
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={12}
                count={props.results.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                // ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </Paper>
  );
};

const getFormattedDate: Function = (ISODate: string): JSX.Element => (
  <div style={{ fontSize: "0.8em", fontStyle: "italic" }}>
    {format(new Date(ISODate), "dd/MM/yy' à 'kk:mm")}
  </div>
);

const formattedCapitalize: Function = (stringToFormat: string): string =>
  stringToFormat
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ")
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join("-");

const getService: Function = (service: string): JSX.Element => {
  switch (service) {
    case "Carburant additivé":
      return <EvStation />;
    case "Boutique alimentaire":
      return <ShoppingCart />;
    case "Station de gonflage":
      return <Album />;
    case "Boutique non alimentaire":
      return <ShoppingCart />;
    case "Services réparation / entretien":
      return <Build />;
    case "Piste poids lourds":
      return <LocalShipping />;
    case "DAB (Distributeur automatique de billets)":
      return <LocalAtm />;
    case "Lavage automatique":
      return <LocalCarWash />;
    case "Lavage manuel":
      return <LocalCarWash />;
    case "Vente de fioul domestique":
      return <InvertColors />;
    case "Vente de gaz domestique (Butane, Propane)":
      return <FormatColorReset />;
    case "Toilettes publiques":
      return <Wc />;
    case "Location de véhicule":
      return <DirectionsCar />;
    case "GNV":
      return <FormatColorReset />;
    case "Restauration à emporter":
      return <Fastfood />;
    case "Relais colis":
      return <Email />;
    case "Wifi":
      return <Wifi />;
    case "Automate CB 24/24":
      return <LocalAtm />;
    case "Vente d'additifs carburants":
      return <InvertColors />;
    case "Aire de camping-cars":
      return <RvHookup />;
    case "Restauration sur place":
      return <Restaurant />;
    case "Vente de pétrole lampant":
      return <InvertColors />;
    case "Laverie":
      return <LocalLaundryService />;
    case "Espace bébé":
      return <ChildCare />;
    case "bar":
      return <LocalBar />;
    case "Douches":
      return <Bathtub />;
    default:
      return <HelpOutline />;
  }
};

export default SearchResults;
