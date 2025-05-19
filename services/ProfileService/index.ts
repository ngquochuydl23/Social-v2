import { HttpResult } from "services/https/dtos";
import { http } from "../https";
import { ProfileDto } from "./dtos";
import { MediaDto } from "services/MediaService/dtos";

export const getProfile = (
  userName?: string | null
): Promise<HttpResult<ProfileDto>> =>
  http.get("/Profile", {
    params: { userName },
  });

export const getMedias = (
  userName?: string | null
): Promise<HttpResult<MediaDto[]>> =>
  http.get("/Profile/Images", {
    params: { userName },
  });
