import styled from "styled-components";

export default function Logo() {
  const Logo = styled.img`
    width: 30%;
    height: auto;
    margin: 0 10px;
    object-fit: cover; /* Ensures the image fits the container without distortion */
  `;

  return <Logo src={"/logo.png"} alt="Logo" />;
}
