import { CommentDto } from "services/CommentService/dtos";
import { MediaDto } from "services/MediaService/dtos";

export interface FeedDto {
  id?: number;
  owned: boolean;
  feedStyle?: string;
  medias?: MediaDto[];
  creator?: FeedCreatorDto;
  caption?: string;
  createAt?: string;
  likeCount?: number;
  shareCount?: number;
  commentCount?: number;
  liked?: boolean;
  mostRelativeComments?: CommentDto[];
}

export interface FeedCreatorDto {
  id?: number;
  userName: string;
  fullName?: string;
  avatar?: string;
  followed?: boolean;
}

export interface RequestCreateFeed {
  caption?: string | null;
  medias?: MediaDto[] | null;
  albumId?: number | null;
  feedStyle?: string | null;
}