import styles from "./more.module.scss";
import HomeLayout from "@layouts/HomeLayout";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ProfileDto } from "services/ProfileService/dtos";
import { getProfile } from "services/ProfileService";
import MoreHeader from "./components/MoreHeader";
import MoreAccountInfo from "./components/MoreAccountInfo";
import MoreFeatureTab from "./components/MoreFeatureTab";
import MoreSupportTab from "./components/MoreSupportTab";

const MoreMobileTab = () => {
  return (
    <HomeLayout showMobileHeader={false}>
      <MoreHeader />
      <MoreAccountInfo />
      <MoreFeatureTab />
      {/* <MoreSupportTab /> */}
    </HomeLayout>
  );
};

export default MoreMobileTab;
