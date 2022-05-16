import { MapContainer, Tooltip } from "react-leaflet";
import styled from "styled-components";

export const Container = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

export const StyledMapContainer = styled(MapContainer)`
  height: 300px;
`;
export const StyledTooltip = styled(Tooltip)`
  display: flex;
  flex-direction: column;
`;

export const StyledPopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
