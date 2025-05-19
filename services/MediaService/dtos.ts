export interface MediaDto {
  id?: number;
  owned?: boolean;
  url?: string;
  createAt?: string;
  mediaType?: string;
  caption?: string;
  duration?: number;
  views?: number;
  local?: boolean;
  localUrl?: string;
  localFile?: any;
  updatedFlag?: string
}