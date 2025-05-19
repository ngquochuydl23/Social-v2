import { Stack } from "@mui/material";
import styles from './createStoryDialog.module.scss';
import BaseDialog, { BaseDialogHeader, DialogProps } from "@components/Dialogs/BaseDialog";
import {  useMemo, useState } from "react";
import _ from "lodash";
import PreviewStoryMedia from "./PreviewStoryMedia";
import MediaPlaceholder from "./MediaPlaceholder";
import StoryPrivacy from "./StoryPrivacy";
import { CreateStoryDto } from "services/StoryService/dtos";
import { uploadMedias } from "services/UploadService";
import { ResponseUploadMediaDto } from "services/UploadService/dtos";
import { createStory } from "services/StoryService";
import CircularProgress from '@mui/material/CircularProgress';
import { useIntl } from "react-intl";
import { isFileImage, isFileVideo } from "utils/mediaType";

const CreateStoryDialog: React.FC<DialogProps> = ({
  open, onClose
}) => {
  const intl = useIntl();
  const [thumbnail, setThumbnail] = useState<any>();
  const [file, setFile] = useState<any>();
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [privacy, setPrivacy] = useState<any>({
    audienceType: undefined,
    turnOffCommenting: undefined
  });


  const onReceiveMediaFile = (file: any) => {
    if (Boolean(file)) {
      setLoadingMedia(true);
      setFile(file);
    }
  }

  const onCloseDialog = () => {

    setFile(undefined);
    setThumbnail(undefined);
    setPrivacy(null);
    setLoadingMedia(false);
    onClose();
  }

  const onPost = async () => {
    if (Boolean(file) && ((isFileVideo(file) && Boolean(thumbnail) || isFileImage(file)))) {

      var result: any = (await uploadMedias(isFileVideo(file) ? [file, thumbnail] : [file])).result

      const uploadedMedia = result.medias[0];

      if (uploadedMedia) {

        const model: CreateStoryDto = {
          audienceType: privacy.audienceType,
          mediaUrl: uploadedMedia.url,
          mediaType: uploadedMedia.mediaType,
          duration: 15,
          thumbnail: !isFileVideo(file) ? undefined : result.medias[1].url,
          turnOffCommenting: privacy.turnOffCommenting
        }

        createStory(model)
          .then((res) => {
            console.log(res);
            onClose();
          })
          .catch(err => console.log(err))
          .finally(() => { })
      } else console.log("Upload media faild")
    }
  }

  const onReceiveThumbnail = (file: any) => {
    setThumbnail(file);
  }

  const memoizedValue = useMemo(() => (
    <PreviewStoryMedia
      file={file}
      onReceiveThumbnail={onReceiveThumbnail}
    />
  ), [file]);

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      maxWidth={Boolean(file) ? "md" : "xs"}
      showBaseHeader={false}
      isPadding={false}>
      <div>
        <BaseDialogHeader
          textRightButton='Post'
          rightButtonClick={onPost}
          text='Add Story'
          disableRightButton={!(Boolean(file) && ((isFileVideo(file) && Boolean(thumbnail) || isFileImage(file))))}
          onButtonClose={onCloseDialog} />
        <div className={styles.body} style={{ padding: Boolean(file) ? "10px" : "0px" }}>
          {file
            ? <Stack
              spacing="15px"
              paddingX="15px"
              paddingBottom="15px"
              direction="row">
              <div className={styles.previewLayout}>
                {memoizedValue}
                <div className={styles.videoNameAndChange}>
                  <p>xiaoxiongnuo.mp4</p>
                  <span
                    onClick={() => document.getElementById("changeOtherFile")?.click()}
                  >{intl.formatMessage({ id: "Change" })}</span>
                </div>
                <input
                  id="changeOtherFile"
                  style={{ display: 'none' }}
                  type="file"
                  accept="image/*, video/*"
                  onChange={onReceiveMediaFile} />
              </div>
              <StoryPrivacy
                onChange={(turnOffCommenting, audienceType) =>
                  setPrivacy({ audienceType, turnOffCommenting })} />
            </Stack>
            : <MediaPlaceholder onReceiveMediaFile={onReceiveMediaFile} />
          }
        </div>
      </div>
    </BaseDialog>
  )
}

export default CreateStoryDialog;
