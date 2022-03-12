import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

function Tv() {
  return <Wrapper></Wrapper>;
}

export default Tv;
