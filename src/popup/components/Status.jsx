import styled from "styled-components";
import { PopupSection } from "../App";

export const STATUSES = {
  NOT_STARTED: "not started",
  RUNNING: "running...",
  STOPPPED: "stopped",
};

export default function Status({ status }) {
  const Status = styled.div`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    padding: 10px 0px 4px 0px;
  `;

  return (
    <PopupSection>
      <Status>
        <b>Status:</b> {status}
      </Status>
    </PopupSection>
  );
}
