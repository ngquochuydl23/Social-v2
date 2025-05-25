import { FeedCreatorDto } from "services/FeedService/dtos";

export interface CommentDto {
  id?: number;
  owned: boolean;
  content?: string;
  mediaUrl?: string;
  mediaType?: string;
  createAt?: string;
  lastUpdate?: string;
  likeCount?: number;
  replyCount?: number;
  feedId?: number;
  parentId?: number;
  creator?: CommentCreatorDto;
  childs?: CommentDto[];
}

export interface CommentCreatorDto {
  id?: number;
  userName: string;
  fullName?: string;
  avatar?: string;
  followed?: boolean;
}

export interface RequestCreateComment {
  content?: string | null;
  mediaUrl?: string | null;
}

export interface CommentActivityDto {
  id?: number;
  createAt?: string;
  feed?: {
    id?: number;
    creator?: FeedCreatorDto;
    commentContent?: string;
  };
}

export interface CommentTimelineDto {
  createAt?: string;
  comments?: Array<CommentActivityDto>;
}
