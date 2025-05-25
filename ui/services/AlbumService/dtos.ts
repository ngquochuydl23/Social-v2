import { MediaDto } from "services/MediaService/dtos";

export interface AlbumDto {
  id: string;
  name: string;
  description?: string | null;
  createAt: string;
  removable: boolean;
  thumbnail?: string | null;
  count: number;
  owned: boolean;
  medias: MediaDto[];
}