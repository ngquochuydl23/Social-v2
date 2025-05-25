
export interface RoomDto {
  _id: string;
  members: Array<ChatMemberDto>,
  lastMsg: ChatMessageDto,
  isPrivate: boolean,
  createdAt: string,
}

export interface ChatMemberDto {
  userId: number;
  userName: string;
  fullName: string;
  avatar: string,
}

export interface ChatMessageDto {
  type: string;
  content: string;
  createdAt: string,
  creator: ChatMemberDto,
}