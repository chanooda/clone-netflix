import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImage } from "../utils";

const BoxContainer = styled(motion.div)`
  flex: 1;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }

  &:nth-child(6n) {
    transform-origin: center right;
  }
  img {
    display: block;
    margin: 0;
    width: 100%;
  }
`;

const Info = styled(motion.div)`
  width: 100%;
  background-color: ${(props) => props.theme.bgColor};
  opacity: 0;
  margin: 0;
  h4 {
    text-align: center;
    margin: 0;
    font-size: 1.2vw;
    padding: 20px 0;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: 50,
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.2,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    zIndex: 50,
    opacity: 1,
    transition: {
      delay: 0.2,
    },
  },
};

function Box(props: any) {
  const navigate = useNavigate();
  const onBoxClicked = (movieId: number) => {
    navigate(props.setUrl && `${props.setUrl}${movieId}`);
  };
  return (
    <BoxContainer
      key={props.movie.id}
      layoutId={props.movie.id + ""}
      variants={boxVariants}
      whileHover="hover"
      initial="normal"
      transition={{ type: "tween" }}
      onClick={() => onBoxClicked(props.movie.id)}
    >
      <img src={makeImage(props.movie.backdrop_path, "w500")} alt="" />
      <Info variants={infoVariants}>
        <h4>{props.movie.title || props.movie.name}</h4>
      </Info>
    </BoxContainer>
  );
}

export default Box;
