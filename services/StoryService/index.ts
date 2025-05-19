
import { HttpResult } from "services/https/dtos";
import { CreateStoryDto, StoryInDayDto, Story } from "./dtos";
import { http } from "services/https";

export const getStoriesInDay = ():
  Promise<HttpResult<Array<StoryInDayDto>>> => http.get('/Story/InDay')

export const createStory = (model: CreateStoryDto):
  Promise<HttpResult<Array<StoryInDayDto>>> => http.post('/Story', model)

export const getAllStoryInArchive = ():
  Promise<HttpResult<Array<Story>>> => http.get('Story')
