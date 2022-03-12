import styled from "styled-components";
import { makeImage } from "../utils";

const Banner = styled.div``;
const SetBanner = styled.div`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  margin-bottom: 20px;
  background-color: #000;
  padding-bottom: 40%;
`;
const BackImage = styled.div`
  position: absolute;
  background-color: #000;
  width: 100%;
  height: 56.25vw;
  z-index: 0;
  .imageBox {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    > img {
      position: absolute;
      background-position: center center;
      background-size: cover;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      opacity: 1;
      z-index: 5;
    }
    .leftShadow {
      background: linear-gradient(
        77deg,
        rgba(0, 0, 0, 0.6) 0,
        rgba(0, 0, 0, 0) 85%
      );
      position: absolute;
      top: 0;
      left: 0;
      right: 26.09%;
      bottom: 0;
      opacity: 1;
      z-index: 8;
    }
    .bottomShadow {
      background-image: linear-gradient(
        to bottom,
        rgba(20, 20, 20, 0) 0,
        rgba(20, 20, 20, 0.15) 15%,
        rgba(20, 20, 20, 0.35) 29%,
        rgba(20, 20, 20, 0.58) 44%,
        #141414 68%,
        #141414 100%
      );
      background-size: 100% 100%;
      background-position: 0 top;
      background-repeat: repeat-x;
      background-color: transparent;
      width: 100%;
      height: 14.7vw;
      top: auto;
      bottom: -1px;
      opacity: 1;
      z-index: 8;
      position: absolute;
      left: 0;
      right: 0;
    }
  }
  .textBox {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: absolute;
    height: 100%;
    width: 100%;
    > div {
      position: absolute;
      top: 0;
      bottom: 35%;
      left: 4%;
      width: 36%;
      z-index: 10;
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      @media screen and (min-width: 1500px) {
        left: 60px;
      }
    }
  }
`;
const Title = styled.div`
  width: 100%;
  min-height: 13.2vw;
  position: relative;
  margin-bottom: 1.2vw;
  h2 {
    font-size: 2vw;
    display: block;
    width: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    text-shadow: 2px 2px 4px rgb(0 0 0 / 100%);
  }
`;
const Overview = styled.div`
  margin: 0.5vw 0 0 0;
  color: #fff;
  font-weight: 400;
  line-height: normal;
  width: 100%;
  font-size: 1.4vw;
  text-shadow: 2px 2px 4px rgb(0 0 0 / 100%);
`;

interface IBannerData {
  BannerImage: string;
  BannerTitle: string;
  BannerOverview: string;
}

function BannerComponent({
  BannerImage,
  BannerTitle,
  BannerOverview,
}: IBannerData) {
  return (
    <Banner>
      <SetBanner>
        <BackImage>
          <div className="imageBox">
            <img src={makeImage(BannerImage)} />
            <div className="leftShadow"></div>
            <div className="bottomShadow"></div>
          </div>
          <div className="textBox">
            <div>
              <Title>
                <h2>{BannerTitle}</h2>
              </Title>
              <Overview>{BannerOverview}</Overview>
            </div>
          </div>
        </BackImage>
      </SetBanner>
    </Banner>
  );
}

export default BannerComponent;
