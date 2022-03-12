import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import Header from "./components/Header";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  z-index: 0;
`;

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/movies/:movieId" element={<Home />}></Route>
          </Route>
          <Route path="/tv" element={<Tv />} />
          <Route path="/search" element={<Search />}></Route>
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
