import SettingLayout from '../components/SettingLayout';
import SettingHeader from '../components/SettingHeader';
import styles from './devices.module.scss';
import { IcAndroid27px, IcFirefox, IcGoogleChorme, IcSafari27px } from '@assets/icons';
import { useEffect, useState } from 'react';
import { getAllDevices } from 'services/DeviceService';
import { DeviceDto } from 'services/DeviceService/dtos';
import _ from 'lodash';
import moment from 'moment';
import DeviceDetaiDialog from '../components/DeviceDetail/DetailDeviceDialog';
import { Platform } from '@constants/platform';
import { useIntl } from 'react-intl';

const SettingDevicesPage = () => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useState<DeviceDto[]>([]);

  useEffect(() => {
    setLoading(true);
    getAllDevices()
      .then((res) => {
        setDevices(res.result!)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      })
  }, [])

  const Device = (device: DeviceDto) => {
    const [open, setOpen] = useState(false);

    const filterByDeviceName = () => {
      if (!device || !device.deviceName)
        return null;

      const lowerCase = device.deviceName.toLowerCase()
      switch (lowerCase.substring(0, lowerCase.indexOf(' '))) {
        case Platform.Chorme:
          return <IcGoogleChorme />
        case Platform.Firefox:
          return <IcFirefox />
        case Platform.Safari:
          return <IcSafari27px />
        case Platform.Android:
          return <IcAndroid27px />
        default:
          return <IcGoogleChorme />
      }
    }

    return (
      <>
        <div
          onClick={() => { setOpen(true) }}
          className={styles.device}>
          <div className={styles.icFrame}>
            {filterByDeviceName()}
          </div>
          <div className={styles.info}>
            <h4 className={styles.deviceName}>{device.deviceName}</h4>
            <p className={styles.appVerion}>{device.appName} - v{device.appVersion}</p>
            <p className={styles.location}>{device.location} - {moment(device.lastAccess).format("MMM Do YY")}</p>
          </div>
        </div>
        <DeviceDetaiDialog
          open={open}
          onClose={() => setOpen(false)}
          device={device} />
      </>
    )
  }

  return (
    <SettingLayout>
      <SettingHeader
        title='Devices'
        subtitle='View information about your account, download your data archive, or learn about options to deactivate your account'
      />
      <div className={styles.section}>
        <h4 className={styles.title}>
          {intl.formatMessage({ id: `This device` })}
        </h4>
        <Device
          {...devices[0]} />
      </div>
      {devices.length > 1 &&
        <div className={styles.section}>
          <h4 className={styles.title}>
            {intl.formatMessage({ id: `Active Sessions` })}
          </h4>
          {_.map(devices.slice(1), (item: DeviceDto, key) => (
            <Device key={key} {...item} />
          ))}
        </div>
      }
    </SettingLayout>
  )
}

export default SettingDevicesPage; 
