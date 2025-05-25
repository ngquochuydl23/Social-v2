export interface Story {
  likeCount: number | 0;
  commentCount: number | 0;
  duration: number | 0;
  mediaUrl?: string | null;
  mediaType?: string;
  createAt?: string;
  lastUpdate?: string;
  viewerCount?: number | 0;
  thumbnail?: string;
  owned?: boolean | false;
  id?: number;
}

export interface StoryInDayDto {
  storyCount: number | 0;
  lastThumbnail?: string;
  lastAdded?: string;
  stories?: Array<Story>;
  owned?: boolean | false;
  creator?: CreatorDto;
}

export interface CreatorDto {
  id?: number;
  userName: string;
  fullName?: string;
  avatar?: string;
  followed?: boolean;
}

export interface CreateStoryDto {
  mediaUrl?: string;
  mediaType?: string;
  audienceType?: string;
  duration?: number;
  turnOffCommenting?: boolean;
  thumbnail?: string;
}

