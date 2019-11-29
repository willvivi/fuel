import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Results = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

export const GasStation = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  padding: 10px;
  border: 1px gray solid;
`;

export const GasStationDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
`;
export const GasStationName = styled.div`
  font-weight: bold;
`;
export const GasStationAddress = styled.div`
  font-size: 0.9em;
`;
export const GasStationPrices = styled.div`
  width: 130px;
`;

export const Price = styled.div``;
