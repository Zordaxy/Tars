import styled from "styled-components";

export const STATUSES = {
  NOT_STARTED: "not started",
  RUNNING: "running...",
  STOPPPED: "stopped",
};

export default function Status({ status }) {
  const Status = styled.div`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    padding: 6px 0;
  `;

  return (
    <Status>
      <b>Status:</b> {status}
    </Status>
  );
}
