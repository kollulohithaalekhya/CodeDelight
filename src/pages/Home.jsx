import React from "react";
import Body from "../components/Body";
import Header from "../components/HeaderSection";
import Footer from "../components/FooterSection";
function Home({ setPage }) {
  return (
  <>
  <Header></Header>
  <Body setPage={setPage} />
  <Footer></Footer>
  </>);

}

export default Home;
