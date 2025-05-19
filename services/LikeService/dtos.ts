import { FeedCreatorDto } from "services/FeedService/dtos";

export interface LikeDto {
  id?: number;
  owned?: boolean;
  feedId?: number;
  creator?: LikeCreatorDto;
}

export interface LikeCreatorDto {
  id?: number;
  userName: string;
  fullName?: string;
  avatar?: string;
  followed: boolean | null;
}

export interface LikeActivityDto {
  id?: number;
  createAt?: string;
  feed?: {
    id?: number;
    creator?: FeedCreatorDto;
    description?: string;
  };
}

export interface FeedLikeTimelineDto {
  createAt?: string;
  likes?: Array<LikeActivityDto>;
}
