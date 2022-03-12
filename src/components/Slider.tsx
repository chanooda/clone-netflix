import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import Box from "./Box";

const Line = styled.div`
  box-sizing: border-box;
  z-index: 10;
  position: relative;
  width: 100%;
  margin-top: 15vw;
  &:first-child {
    margin: 3vw 0;
  }
  > h3 {
    font-size: 1.2vw;
    z-index: 5;
    padding: 0 4%;

    margin-bottom: 20px;
    @media screen and (min-width: 1500px) {
      padding: 0 60px;
    }
    @media screen and (max-width: 950px) {
      font-size: 1.5vw;
    }
  }
`;
const Row = styled(motion.div)`
  z-index: 15;
  position: absolute;
  margin: 0;
  padding: 0 4%;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.2vw;
  @media screen and (min-width: 1500px) {
    padding: 0 60px;
  }
`;

const Next = styled.span`
  position: absolute;
  width: 4%;
  height: 100%;
  top: 0;
  right: 0;
  color: #fff;
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(20, 20, 20, 0.5);
  span {
    font-size: 3vw;
    cursor: pointer;
  }
  @media screen and (min-width: 1500px) {
    width: 60px;
  }
`;

const rowVariants = {
  hidden: { x: window.innerWidth },
  visible: { x: 0 },
  exit: { x: -window.innerWidth },
};

const offset = 6;

function Sliders({ currentData }: any) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (leaving) return;
    toggleLeaving();
    const totalMovies = currentData.length - 1;
    const maxIndex = Math.floor(totalMovies / offset) - 1;
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };
  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };
  return (
    <>
      <Line>
        <h3>Current Showing</h3>
        <AnimatePresence onExitComplete={toggleLeaving} initial={false}>
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {currentData
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie: any) => (
                <Box key={movie.id} movie={movie} setUrl="/movies/" />
              ))}
            <Next onClick={increaseIndex}>
              <span>{`>`}</span>
            </Next>
          </Row>
        </AnimatePresence>
      </Line>
    </>
  );
}

export default Sliders;
