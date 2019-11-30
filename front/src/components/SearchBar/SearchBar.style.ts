import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
  input {
    height: 30px;
    width: 160px;
    margin-right: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
  }
`;

export const Separator = styled.div`
  background-color: gray;
  height: 2px;
  width: 100%;
`;

export const AddressFields = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const GeolocationFields = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;
