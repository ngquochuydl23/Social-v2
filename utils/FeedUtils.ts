import { MediaDto } from "services/MediaService/dtos";
import { getImageSize } from 'react-image-size';
import { FeedStyle } from "@constants/globals";
import _ from "lodash";

export const feedLayoutSize = (width: number, height: number) => {
  if (height / width === 2.22222222222) {
    return width * 4 / 3
  }
  return height;
}

export const generateFeedStyle = async (medias: MediaDto[]) => {
  if (!medias || medias.length === 0)
    return null;

  const isPortrait = async (media: MediaDto) => {
    const { width, height } = await getImageSize(!media?.local ? media?.url! : media?.localUrl!);
    const aspectRatio = width / height;
    return aspectRatio < 1
  }

  const isSquare = async (media: MediaDto) => {
    const { width, height } = await getImageSize(!media?.local ? media?.url! : media?.localUrl!);
    const aspectRatio = width / height;
    return aspectRatio === 1
  }

  switch (medias.length) {
    case 1:
      const media = medias[0];
      if (await isSquare(media))
        return FeedStyle.ClassicOneSquare;
      else if (await isPortrait(media))
        return FeedStyle.ClassicOnePortrait
      return FeedStyle.ClassicOneLandscape
    case 2:
      if (_.every(medias, x => isPortrait(x))) {
        return FeedStyle.ClassTwoPortrait
      }

    default:
      return null;
  }
}