import styled from "styled-components";
import { TextField } from "@material-ui/core";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const StyledTextField = styled(TextField)`
  width: 160px;
  margin: 10px !important;
  border-radius: 5px;
`;

export const AddressFields = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const GeolocationFields = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;
