import styled from "styled-components";
import { PopupSection } from "../App";

export default function Header() {
  const Subheader = styled.div`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    padding: 9px 0;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  `;

  const H1 = styled.h1`
    margin-bottom: 2px;
    margin-top: 6px;
  `;

  return (
    <PopupSection>
      <Subheader>Jobseeker Assistant</Subheader>
    </PopupSection>
  );
}
