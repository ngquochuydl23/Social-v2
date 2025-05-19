import React from "react";
import Container from '@mui/material/Container';
import styles from "./authLayout.module.scss";
import Footer from "./Footer";
import { CssBaseline } from "@mui/material";
import { BaseLayoutProps } from "@layouts/BaseLayoutProps";

const AuthLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className={styles.authLayout}>
      <CssBaseline />
      <Container
        disableGutters
        className={styles.authContainer}
        maxWidth="xs">
        {children}
      </Container >
      {/* <Footer /> */}
    </div >
  );
};

export default AuthLayout;