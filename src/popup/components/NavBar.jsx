import { Button } from "@mui/material";
import styled from "styled-components";
import { STATUSES } from "../components/Status";

function NavBar({ startBot, stopBot, loading, status }) {
  const Nav = styled.nav`
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 10px;
    gap: 10px; */
    width: 100%;
  `;

  const StyledButton = styled(Button)`
    width: 100%;
  `;

  return (
    <Nav>
      {status === STATUSES.RUNNING ? (
        <StyledButton variant="contained" onClick={stopBot}>
          Stop
        </StyledButton>
      ) : (
        <StyledButton variant="contained" onClick={startBot} disabled={loading}>
          Start
        </StyledButton>
      )}
    </Nav>
  );
}

export default NavBar;
