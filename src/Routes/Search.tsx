import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useQuery } from "react-query";
import { Navigate, useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getSearchMovies, getSearchTvs, IGetSearchMovies } from "../api";
import Box from "../components/Box";
import { makeImage } from "../utils";

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchList = styled.div`
  margin-top: 100px;
`;

const MovieList = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
`;

const TvList = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
`;

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

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const id = new URLSearchParams(location.search).get("id");
  const { data: movieData, isLoading: movieLoading } =
    useQuery<IGetSearchMovies>(["searchMovies", keyword], () =>
      getSearchMovies(String(keyword))
    );
  const { data: tvData, isLoading: tvLoading } = useQuery<IGetSearchMovies>(
    ["searchTvs", keyword],
    () => getSearchTvs(String(keyword))
  );
  const bigMovieMatch = useMatch(`/search?keyword=${keyword}&id=${id}`);
  const navigate = useNavigate();
  const { scrollY } = useViewportScroll();
  const clickMovie = movieData?.results.find(
    (movie) => String(movie.id) === id
  );
  const clickTv = tvData?.results.find((movie) => String(movie.id) === id);
  const onOverlayClick = () => {
    navigate(`/search?keyword=${keyword}`);
  };
  return (
    <>
      {movieLoading && tvLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <SearchList>
          <h2>Movie</h2>
          <MovieList>
            {movieData?.results.map((movie) =>
              movie.backdrop_path ? (
                <Box
                  key={movie.id}
                  movie={movie}
                  setUrl={`/search?keyword=${keyword}&id=`}
                />
              ) : null
            )}
          </MovieList>
          <h2>TV</h2>
          <TvList>
            {tvData?.results.map((tv) =>
              tv.backdrop_path ? (
                <Box
                  key={tv.id}
                  movie={tv}
                  setUrl={`/search?keyword=${keyword}&id=`}
                />
              ) : null
            )}
          </TvList>
        </SearchList>
      )}
      <AnimatePresence>
        {id ? (
          <>
            <Overlay onClick={onOverlayClick} />
            <BigMovie layoutId={id} style={{ top: scrollY.get() + 100 }}>
              {clickMovie ? (
                <>
                  <BigCover src={makeImage(clickMovie.backdrop_path, "w500")} />
                  <BigTitle>{clickMovie.title}</BigTitle>
                  <BigOverview>{clickMovie.overview}</BigOverview>
                </>
              ) : (
                clickTv && (
                  <>
                    <BigCover src={makeImage(clickTv.backdrop_path, "w500")} />
                    <BigTitle>{clickTv.name}</BigTitle>
                    <BigOverview>{clickTv.overview}</BigOverview>
                  </>
                )
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Search;
