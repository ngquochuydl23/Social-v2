export interface ProfileDto {
  id: number;
  userName: string;
  avatar?: string | null;
  bio?: string | null;
  cover?: string | null;
  email?: string | null;
  fullName?: string | null;
  gender?: string;
  followingCount?: number;
  followerCount?: number;
  followed?: boolean;
  owned: boolean;
}

export interface AlbumDto {
  id: number;
  name: string;
  description?: string | null;
  canRemove: boolean;
}
