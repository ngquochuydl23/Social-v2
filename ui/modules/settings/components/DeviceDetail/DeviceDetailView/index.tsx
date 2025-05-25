import { DeviceDto } from "services/DeviceService/dtos";
import styles from './deviceDetailView.module.scss';
import { IcAndroid55px, IcDeviceIp, IcDeviceLassAccess, IcDeviceLocation, IcDeviceNotify, IcFirefox55px, IcGoogleChorme55px, IcSafari55px } from "@assets/icons";
import { Stack, Switch, SwitchProps, styled } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { terminateDevice, turnOffNotification } from "services/DeviceService";
import { FilledButton } from "@components/Button";
import { Platform } from "@constants/platform";
import { useIntl } from "react-intl";
import { useTheme } from "next-themes";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ }) => {
  const { theme } = useTheme();
  return ({
    width: 42,
    height: 26,
    zIndex: 10,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: theme === "dark" ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: "var(--SwitchDarkLight)",
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
    },
  })
});

const DetailDeviceView = (device: DeviceDto) => {
  const intl = useIntl();
  const [_turnOffNotification, setTurnOffNotifcation] = useState(device.turnOffNotification);

  const filterByDeviceName = () => {
    const lowerCase = device.deviceName.toLowerCase()
    switch (lowerCase.substring(0, lowerCase.indexOf(' '))) {
      case Platform.Chorme:
        return <IcGoogleChorme55px />
      case Platform.Firefox:
        return <IcFirefox55px />
      case Platform.Safari:
        return <IcSafari55px />
      case Platform.Android:
        return <IcAndroid55px />
      default:
        return <IcGoogleChorme55px />
    }
  }

  return (
    <div className={styles.detailDeviceView}>
      <div className={styles.icFrame}>
        {filterByDeviceName()}
      </div>
      <h4 className={styles.deviceName}>{device.deviceName}</h4>
      <p className={styles.appNameAndVersion}>{device.appName} - {device.appVersion}</p>
      <Stack
        spacing="10px"
        sx={{ marginTop: '20px' }}
        width="100%">
        <div className={styles.attrSection}>
          <IcDeviceLocation />
          <p className={styles.attrName}>{intl.formatMessage({ id: `Location` })}</p>
          <p className={styles.attrValue}>{device.location}</p>
        </div>
        <div className={styles.attrSection}>
          <IcDeviceIp />
          <p className={styles.attrName}>{intl.formatMessage({ id: `IP Address` })}</p>
          <p className={styles.attrValue}>{device.ipAddress}</p>
        </div>
        <div className={styles.attrSection}>
          <IcDeviceLassAccess />
          <p className={styles.attrName}>{intl.formatMessage({ id: `Last Access` })}</p>
          <p className={styles.attrValue}>{moment(device.lastAccess).format("MMM Do YY")}</p>
        </div>
        <div className={styles.attrNotiSection}>
          <IcDeviceNotify />
          <p className={styles.attrName}>{intl.formatMessage({ id: `Notification` })}</p>
          <IOSSwitch
            checked={!_turnOffNotification}
            onChange={() => {
              setTurnOffNotifcation(!_turnOffNotification);
              turnOffNotification(device.id!!, { turnOff: !_turnOffNotification })
                .catch((err) => {
                  setTurnOffNotifcation(!_turnOffNotification);
                  console.log(err)
                })
            }}
          />
        </div>
      </Stack>
      <FilledButton
        className={styles.terminateButton}
        text='Terminate'
        onClick={() => {
          terminateDevice(device.id!!)
            .then((res) => { })
            .catch((err) => {
              console.log(err);
            })
        }}
      // loadingComponent={
      //   <CircularProgress sx={{ padding: '5px' }} />
      // }
      />
    </div>
  )
}

export default DetailDeviceView;