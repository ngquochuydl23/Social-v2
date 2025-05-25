
import { Snackbar, SnackbarContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from './notiToast.module.scss'
import SocialV2Link from "@components/Social-v2-Link";

interface NotiToastProps {
  open: boolean;
  onClose: () => any;
  data?: any;
  children?: any;
}

const BaseNotiToast = (props: NotiToastProps) => {
  return <Snackbar
    open={props.open}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    autoHideDuration={6000}
    onClose={props.onClose}>
    <div className={styles.notiToast}>
      <div className={styles.header}>
        <h5>Social-v2</h5>
        <span onClick={props.onClose}>&times;</span>
      </div>
      {props.children}
    </div>
  </Snackbar>
}

const NotiToast = {
  RequestFollow: (props: NotiToastProps) => {
    return (
      <BaseNotiToast {...props}>
        <div className={styles.requestFollow}>
          <img src="http://localhost:3000/_next/image?url=https%3A%2F%2Fwww.social-v2.com%2Fimages%2Fsocial-v2-1684067877301.jpeg&w=1920&q=75" />
          <p>
            <SocialV2Link
              className={styles.username}
              href="">
              12.18_xox
            </SocialV2Link>
            {` has requested to follow you. Accept her to follow you.`}
          </p>
        </div>
      </BaseNotiToast >
    )
  }
}

export default NotiToast