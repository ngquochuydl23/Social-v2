export interface FollowingDto {
  id?: number;
  destUserId?: number;
  userName?: string;
  fullName?: string;
  avatar?: string;
  followed: boolean;
  owned?: string;
}

export interface FollowerDto {
  id?: number;
  creatorId?: number;
  userName?: string;
  fullName?: string;
  avatar?: string;
  followed: boolean;
  owned?: string;
}

