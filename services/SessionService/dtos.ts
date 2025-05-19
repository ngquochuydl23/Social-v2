export interface UserDto {
  id: number;
  userName: string;
  avatar?: string | null;
  bio?: string;
  cover?: string;
  birthday?: string;
  phoneNumber?: string | null;
  email?: string | null;
  fullname?: string | null;
  gender?: string;
  followingCount?: number;
  followerCount?: number;
  followed?: string;
  numberOfNotify?: number;
  numberOfMessage?: number;
}
interface BaseRequestLogin {
  appName: string;
  appVersion: string;
  platform: string;
  deviceName: string;
}

export interface RequestLoginModel extends BaseRequestLogin {
  username: string;
  password: string;
}

export interface RequestLoginViaGoogle extends BaseRequestLogin {
  accessToken: string;
}

export interface ResponseLoginModel {
  id: number
  token: string
}

export interface CurrentSessionDto {
  clientState: {
    isDarkMode: boolean;
    language: string;
  },
  user: UserSessionDto,
  notiBadges: number,
  messageBadges: number
}

export interface UserSessionDto {
  id: number,
  userName: string,
  fullname: string,
  firstName: string,
  lastName: string,
  avatar: string,
  bio: string,
  cover: string,
  gender: string,
  followingCount?: number;
  followerCount?: number;
  feedCount?: number,
  reelCount?: number,
}