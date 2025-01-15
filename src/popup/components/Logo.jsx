import styled from "styled-components";

export default function Logo() {
  const Logo = styled.img`
    width: 60%;
    height: auto;
    margin: 10px;
    object-fit: cover; /* Ensures the image fits the container without distortion */
  `;

  return <Logo src={"/logo.png"} alt="Logo" />;
}
