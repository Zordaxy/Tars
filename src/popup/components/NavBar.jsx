import { Button } from "@mui/material";
import styled from "styled-components";

function NavBar({ startBot, stopBot, loading }) {
  const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 10px;
    gap: 10px;
  `;

  return (
    <Nav>
      <Button variant="contained" onClick={startBot} disabled={loading}>
        {loading ? "Processing..." : "Start bot"}
      </Button>
      <Button variant="contained" onClick={stopBot}>
        Stop bot
      </Button>
    </Nav>
  );
}

export default NavBar;
