export interface SecurityAndPrivacyDto {
  email?: string;
  verifiedEmail: boolean;
  phoneNumber?: string;
  verifiedPhoneNumber: boolean;
}

export interface RequestChangeAvatar {
  avatarUrl?: string;
  caption?: string;
  mediaType?: string;
  hasShareFeed: boolean;
}

export interface RequestChangeCover {
  coverUrl?: string;
  caption?: string;
  mediaType?: string;
  hasShareFeed: boolean;
}

export interface ResponseChangeAvatar {
  avatar?: string;
  feedId?: number;
}

export interface ResponseChangeCover {
  cover?: string;
  feedId?: number;
}