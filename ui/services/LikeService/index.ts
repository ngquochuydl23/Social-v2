import { HttpResult } from "services/https/dtos";
import { http } from "../https";
import { FeedLikeTimelineDto, LikeDto } from "./dtos";

export const getFeedLikes = (feedId?: number): Promise<HttpResult<LikeDto[]>> =>
  http.get("/Like/Feed", { params: { feedId: feedId } });

export const deleteLike = (feedId?: number): Promise<HttpResult<string>> =>
  http.delete("/Like/Feed", { params: { feedId: feedId } });

export const createLike = (feedId?: number): Promise<HttpResult<LikeDto>> =>
  http.post("/Like/Feed?feedId=" + feedId);

export const getLikes = (): Promise<HttpResult<FeedLikeTimelineDto[]>> =>
  http.get("/Like");
