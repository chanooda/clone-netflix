import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMovieResult } from "../api";
import BannerComponent from "../components/Banner";
import Slider from "../components/Slider";
import { makeImage } from "../utils";

const Wrapper = styled.div`
  position: relative;
  margin-top: -70px;
  height: 200vw;
  background-color: ${(props) => props.theme.bgColor};
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Sliders = styled.div``;

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 80;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  max-width: 900px;
  width: 80%;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 100;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
`;

const BigCover = styled.img`
  border-radius: 15px;
  width: 100%;
  background: linear-gradient(0deg, black white);
`;

const BigTitle = styled.h2`
  text-align: center;
  font-size: 50px;
`;

const BigOverview = styled.p`
  padding: 20px;
  font-size: 23px;
  word-break: break-all;
`;

function Home() {
  const { data, isLoading } = useQuery<IGetMovieResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/movies/:movieId");
  const { scrollY } = useViewportScroll();
  const clickMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => String(movie.id) === bigMovieMatch.params.movieId
    );
  const onOverlayClick = () => {
    navigate("/");
  };
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading..</Loader>
      ) : (
        <>
          <BannerComponent
            BannerImage={data?.results[0].backdrop_path || ""}
            BannerTitle={data?.results[0].title || ""}
            BannerOverview={data?.results[0].overview || ""}
          />
          <Sliders>
            <Slider currentData={data?.results} />
          </Sliders>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay onClick={onOverlayClick} />
                <BigMovie
                  layoutId={bigMovieMatch.params.movieId}
                  style={{ top: scrollY.get() + 100 }}
                >
                  {clickMovie && (
                    <>
                      <BigCover
                        src={makeImage(clickMovie.backdrop_path, "w500")}
                      />
                      <BigTitle>{clickMovie.title}</BigTitle>
                      <BigOverview>{clickMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
