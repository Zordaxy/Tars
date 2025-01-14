import { Button } from "@mui/material";
import styled from "styled-components";

function NavBar({ startBot, stopBot, loading }) {
  const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 10px;
    gap: 10px;
    width: 56%;
  `;

  return (
    <Nav>
      <Button variant="contained" onClick={startBot} disabled={loading}>
        {loading ? "Processing..." : "Start"}
      </Button>
      <Button variant="contained" onClick={stopBot}>
        Stop
      </Button>
    </Nav>
  );
}

export default NavBar;
