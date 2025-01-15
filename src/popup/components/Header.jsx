import styled from "styled-components";

export default function Header() {
  const Subheader = styled.div`
    font-size: 14px;
    color: rgba(0, 0, 0, 0.6);
    padding: 6px 0;
  `;

  const H1 = styled.h1`
    margin-bottom: 2px;
    margin-top: 6px;
  `;

  return (
    <>
      <H1>TARS</H1>
      <Subheader>(Jobseeker Assistant)</Subheader>
    </>
  );
}
