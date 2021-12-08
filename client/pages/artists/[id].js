import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { ArrowDownward } from "@material-ui/icons";
import { createMedia } from "@artsy/fresnel";
import apiUrl from "../../lib/api";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 720,
    lg: 1024,
    xl: 1192,
  },
});

function Artist() {
  const [artistInfo, setArtistInfo] = useState("");
  const [progressValue, setProgressValue] = useState("0.33");
  const [currTab, setCurrTab] = useState("About");

  const router = useRouter();
  const params = router.query.id;

  const handleClickTab = (tab) => {
    setCurrTab(tab);
    if (tab === "About") {
      setProgressValue("0.33");
    } else if (tab === "Life") {
      setProgressValue("0.58");
    } else {
      setProgressValue("1");
    }
  };

  const content = (
    <>
      {" "}
      {artistInfo && (
        <>
          <Media greaterThanOrEqual="md">
            <div>
              {currTab === "About" && (
                <AboutContainer>
                  <p>Years: {artistInfo.year}</p>
                  <p>Genre: {artistInfo.genre}</p>
                  <p>Nationality: {artistInfo.nation}</p>
                  <p>{artistInfo.desc_simple}</p>
                </AboutContainer>
              )}
              {currTab === "Life" && (
                <LifeContainer>
                  <p>{artistInfo.desc_detail}</p>
                </LifeContainer>
              )}
              {currTab === "Paintings" && (
                <ImagesWrapper>
                  {artistInfo.images.slice(1, 7).map((painting) => (
                    <PaintingImageWrapper>
                      <PaintingImage
                        src={`${apiUrl}${painting}`}
                        key={painting}
                      />
                    </PaintingImageWrapper>
                  ))}
                </ImagesWrapper>
              )}
            </div>
          </Media>
          <Media lessThan="md">
            <div>
              <AboutContainer>
                <p>Years: {artistInfo.year}</p>
                <p>Genre: {artistInfo.genre}</p>
                <p>Nationality: {artistInfo.nation}</p>
                <p>{artistInfo.desc_simple}</p>
              </AboutContainer>
              <LifeContainer>
                <p>{artistInfo.desc_detail}</p>
              </LifeContainer>
              <ImagesWrapper>
                {artistInfo.images.slice(1, 7).map((painting) => (
                  <PaintingImage src={`${apiUrl}${painting}`} key={painting} />
                ))}
              </ImagesWrapper>
            </div>
          </Media>
        </>
      )}
    </>
  );

  const getArtistInfo = useCallback(async () => {
    if (params) {
      try {
        const response = await axios.get(`api/artist/detail/${params}`);
        console.log(response.data);
        setArtistInfo(response.data);
        console.log(response.data.images[0]);
      } catch (e) {
        console.log(e.response);
      }
    }
  });
  useEffect(() => {
    getArtistInfo();
  }, [params]);

  const navList = ["About", "Life", "Paintings"];

  return (
    <Container>
      {artistInfo && (
        <InfoWrapper>
          <GridRow>
            <MobileName>{artistInfo.name}</MobileName>
            <ImageWrapper>
              <ArtistImage>
                <Image
                  src={`${apiUrl}${artistInfo.images[0]}`}
                  alt="artistImage"
                />
              </ArtistImage>
            </ImageWrapper>
            <ArtistInfo>
              <DesktopName>{artistInfo.name}</DesktopName>
              <GridContainer>
                <NavItems>
                  {navList.map((nav) => (
                    <NavItem key={nav}>
                      <NavButton onClick={() => handleClickTab(nav)}>
                        {nav}
                        <ArrowWrapper>
                          <ArrowDownward />
                        </ArrowWrapper>
                      </NavButton>
                    </NavItem>
                  ))}
                </NavItems>
                <Progress value={progressValue} />
                <Hr />
              </GridContainer>
              {content}
            </ArtistInfo>
          </GridRow>
        </InfoWrapper>
      )}
    </Container>
  );
}

export default function ArtistInformation() {
  return (
    <MediaContextProvider>
      <Artist />
    </MediaContextProvider>
  );
}

const Container = styled.main`
  padding: 10rem 0;
  height: 60vh;
  object-fit: scale-down;
  @media only screen and (max-width: 45rem) {
    height: 100%;
  }
`;

const InfoWrapper = styled.section`
  padding-bottom: 3.75rem;
  margin: 0 calc(8% - 20px) 0px;
  @media only screen and (max-width: 45rem) {
    margin: 0 calc(12% - 20px) 0px;
  }
`;

const GridRow = styled.div`
  display: grid;
  align-content: flex-start;
  align-items: flex-start;
  grid-template-columns: repeat(24, 1fr);
  @media only screen and (max-width: 45rem) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const ArtistImage = styled.figure`
  position: relative;
  width: 100%;
  height: 100%;
  will-change: transform;
  transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
`;

const ImageWrapper = styled.div`
  grid-column: 1 / span 10;
  overflow: hidden;
  max-height: 70vh;
  :hover {
    cursor: pointer;
    ${ArtistImage} {
      transform: scale(1.1);
    }
  }
`;

const Image = styled.img`
  width: 100%;
  max-height: 100%;
  object-fit: fill;
  position: relative;
  margin: 0;
  padding: 0;
`;

const ArtistInfo = styled.article`
  grid-column: 12 / span 23;
`;

const MobileName = styled.h1`
  font-size: 10vw;
  justify-content: center;
  text-align: center;
  @media only screen and (min-width: 45rem) {
    display: none;
  }
`;

const DesktopName = styled.h1`
  grid-column: 1 / span 16;
  font-size: 5vw;
  line-height: 1.05;
  @media only screen and (max-width: 45rem) {
    display: none;
  }
`;

const GridContainer = styled.div`
  width: 100%;
  margin-bottom: 5vw;
  display: block;
  transition: background-color 0.6s linear, opacity 0.2s linear;
  position: sticky;
  top: 0;
  padding: 0;
  @media only screen and (min-width: 64em) {
    font-weight: 500;
    font-size: 1rem;
  }
`;

const NavItems = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  @media only screen and (max-width: 45rem) {
    display: none;
  }
`;

const Hr = styled.hr`
  display: block;
  background-color: rgba(0, 0, 0, 1);
  width: 100%;
  height: 3px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  margin: 1rem 0;
  @media only screen and (min-width: 45rem) {
    display: none;
  }
`;

const Progress = styled.progress`
  display: block;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 3px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  ::-webkit-progress-bar {
    background-color: grey;
    width: 100%;
  }
  ::-webkit-progress-value {
    background-color: rgba(0, 0, 0, 1);
    -webkit-transition: width 1s ease;
    -moz-transition: width 1s ease;
    -o-transition: width 1s ease;
    transition: width 1s ease;
  }
  @media only screen and (max-width: 45rem) {
    display: none;
  }
`;

const ArrowWrapper = styled.div`
  line-height: 0;
  margin-left: 0.5rem;
  z-index: -1;
  visibility: hidden;
`;

const NavItem = styled.li`
  position: relative;
  display: flex;
  flex: 1 1 auto;
  display: inline-flex;
  align-items: center;
  :hover {
    ${ArrowWrapper} {
      visibility: visible;
      animation: bounce;
      animation-duration: 500ms;
      animation-iteration-count: infinite;
    }
    @keyframes bounce {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(5px);
      }
      100% {
        transform: translateY(0);
      }
    }
  }
`;

const NavButton = styled.div`
  flex: 1 1 auto;
  padding: 1rem 0;
  margin: -1rem 0;
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  color: #000;
  text-decoration: none;
  :hover {
    cursor: pointer;
  }
`;

const ImagesWrapper = styled.figure`
  /* width: 100%; */
  height: 30vw;
  position: relative;
  object-fit: contain;
  overflow-y: hidden;
  display: grid;
  grid-template-columns: repeat(6, minmax(25%, auto));
  /* grid-template-rows: repeat(1, minmax(25%, auto)); */
  /* display: flex; */
  grid-gap: 1em;
  overflow-x: scroll;
  @media only screen and (max-width: 45rem) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 1em;
    /* overflow-x: visible; */
    height: 100%;
    justify-content: center;
    align-items: center;
  }
`;

const PaintingImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const PaintingImage = styled.img`
  /* width: 100%; */
  height: 100%;
  object-fit: cover;
  /* max-height: 40vh; */
  /* object-fit: fill; */
`;

const AboutContainer = styled.div`
  font-size: 2vw;
  font-weight: 700;
  margin-bottom: 1rem;
`;
const LifeContainer = styled.div`
  font-size: 1.25vw;
  margin-bottom: 1rem;
  @media only screen and (max-width: 45rem) {
    font-size: 2vw;
  }
`;
