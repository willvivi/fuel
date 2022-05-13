import styled from "styled-components";
import { TextField } from "@mui/material";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  max-width: 90%;
  user-select: none;
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
  align-items: center;
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const GeolocationFields = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  @media (max-width: 500px) {
    align-items: center;
  }
`;

export const SettingsFields = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
