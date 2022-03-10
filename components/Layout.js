import React from "react";
import Head from "next/head";
import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Real Estate</title>
      </Head>

      <Box maxWidth={"1280px"} m="auto">
        <header>
          <Navbar/>
        </header>
        <main>{children}</main>

        <footer>FOOTER COMPONENT</footer>
      </Box>
    </React.Fragment>
  );
};

export default Layout;
