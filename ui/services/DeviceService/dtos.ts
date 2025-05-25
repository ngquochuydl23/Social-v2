

export interface DeviceDto {
  id?: number;
  deviceName: string;
  platform: string;
  turnOffNotification: boolean;
  lastAccess: string;
  location: string;
  appName?: string;
  appVersion?: string;
  ipAddress: string;
}

export interface RequestSetupNotification {
  fcmToken: string;
}

export interface RequestTurnOnOffNotification {
  turnOff: boolean;
}