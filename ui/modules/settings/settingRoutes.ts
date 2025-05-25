import { IcDeviceTabActive, IcDeviceTabInactive, IcLanguagesTabActive, IcLanguagesTabInactive, IcNotifyTabInactive } from "@assets/icons";
import {
  IcEditAccActive,
  IcEditAccInactive,
  IcNotifyTabActive,
  IcSecurityPrivacyActive,
  IcSecurityPrivacyInactive
} from "@assets/icons";

const settingRoutes = [
  {
    path: '/settings/manage-account',
    title: 'Manage Account',
    activeIcon: IcEditAccActive,
    inactiveIcon: IcEditAccInactive
  },
  {
    path: '/settings/security-and-privacy',
    title: 'Security and Privacy',
    activeIcon: IcSecurityPrivacyActive,
    inactiveIcon: IcSecurityPrivacyInactive
  },
  {
    path: '/settings/notifications',
    title: 'Notifications',
    activeIcon: IcNotifyTabActive,
    inactiveIcon: IcNotifyTabInactive
  },
  {
    path: '/settings/languages',
    title: 'Languages',
    activeIcon: IcLanguagesTabActive,
    inactiveIcon: IcLanguagesTabInactive
  },
  {
    path: '/settings/devices',
    title: 'Devices',
    activeIcon: IcDeviceTabActive,
    inactiveIcon: IcDeviceTabInactive
  }
]

export default settingRoutes;