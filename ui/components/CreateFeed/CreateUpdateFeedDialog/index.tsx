import BaseDialog, { DialogProps } from '@components/Dialogs/BaseDialog';
import { isMobile } from 'react-device-detect';
import styles from "./createUpdateFeedDialog.module.scss"
import {
  IcPickMedia,
  IcMiniArrow,
  IcPublic,
  IcPickEmoji,
  IcPickUsersTag,
  IcCreateStream,
  IcCheckInFeed,
  IcOnlyTextMode
} from "@assets/icons";
import { AvatarWithoutStory } from "@components/Avatar";
import { useSession } from "context/SessionHook";
import TextareaAutosize from 'react-textarea-autosize';
import { useIntl } from 'react-intl';
import IconWithFrame from '@components/IconWithFrame';
import { useEffect, useState } from 'react';
import { createFeed, updateFeed } from 'services/FeedService';
import { Subject } from 'rxjs';
import { FeedDto, RequestCreateFeed } from 'services/FeedService/dtos';
import _ from 'lodash';
import FeedMedias from '@components/Feeds/FeedMedias';
import { generateFeedStyle } from 'utils/FeedUtils';
import { uploadMedias } from 'services/UploadService';
import { MediaDto } from 'services/MediaService/dtos';
import Backdrop from '@mui/material/Backdrop';
import { CircularProgress } from '@mui/material';
import { UpdatedFlagMedia } from '@constants/globals';

export const createUpdateFeedSubject = new Subject<FeedDto>();

interface CreateUpdateFeedDialogProps extends DialogProps {
  isEdit?: boolean;
  editFeedData?: FeedDto;
}

const CreateUpdateFeedDialog: React.FC<CreateUpdateFeedDialogProps> = ({
  open,
  onClose,
  editFeedData,
  isEdit = false
}) => {
  const intl = useIntl();
  const { session } = useSession();
  const [loading, setLoading] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const [model, setModel] = useState<RequestCreateFeed | null>({
    albumId: null,
    caption: null,
    medias: null,
    feedStyle: null
  });

  useEffect(() => {
    if (editFeedData && isEdit) {
      setModel(editFeedData)
    }
  }, [editFeedData, isEdit])

  const _createFeed = (uploadedMedias?: MediaDto[] | null) => {
    createFeed({ ...model, medias: uploadedMedias })
      .then((res) => {

        createUpdateFeedSubject.next(res.result!)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        onClose();
        setModel(null);
      })
  }

  const _updateFeed = (uploadedMedias?: MediaDto[] | null) => {
    updateFeed(editFeedData?.id!, { ...model, medias: uploadedMedias })
      .then((res) => createUpdateFeedSubject.next(res.result!))
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        onClose();
        setModel(null);
      })
  }

  const onHeaderClose = () => {
    // If confirm discard
    setModel(null);
    setLoading(false);
    setShowPlaceholder(false);
    onClose();
  }

  const getFilesToUpload = (medias?: MediaDto[] | null) => {
    return _.filter(medias, (item: MediaDto) =>
      item.updatedFlag === UpdatedFlagMedia.Added);
  }

  const deleteMedia = async (media: MediaDto) => {
    const idx = _.findIndex(model?.medias, media);
    const newMedias = [...model?.medias!]
    newMedias?.splice(idx, 1);
    setModel({
      ...model,
      medias: newMedias,
      feedStyle: await generateFeedStyle(newMedias)
    })
  }

  const postFeed = () => {
    setLoading(true);
    var filesToUpload = getFilesToUpload(model?.medias);

    if (filesToUpload && filesToUpload.length > 0) {
      uploadMedias(filesToUpload)
        .then((res) => _createFeed(res.result?.medias))
        .catch((err) => console.log(err));
    }
    else _createFeed(null)
  }

  const putFeed = () => {
    setLoading(true);
    var filesToUpload = getFilesToUpload(model?.medias);
    if (filesToUpload && filesToUpload.length > 0) {
      uploadMedias(filesToUpload)
        .then((res) => {
          const mediasResult = res.result?.medias!;
          var idx = 0;
          const newUpdatedMedias = _.map(model?.medias, (item: MediaDto) => {
            if (item.updatedFlag === UpdatedFlagMedia.Added && idx < mediasResult.length) {
              const newItem: MediaDto = {
                ...item,
                ...mediasResult[idx]
              }
              idx++;
              return newItem;
            }
            return item;
          });
          _updateFeed(newUpdatedMedias);
        })
        .catch((err) => console.log(err));
    } else {
      _updateFeed(model?.medias);
    }
  }

  const onReceiveMedias = async (event: any) => {
    const files = event.target.files;

    if (files) {
      setShowPlaceholder(false);
      // The map array below is to create a local list by 
      // setting from the files that user has picked.
      const mediasFromPicker = _.map(files, (file: any) => {
        return {
          local: true,
          localUrl: URL.createObjectURL(file),
          localFile: file,
          mediaType: file.type,
          updatedFlag: UpdatedFlagMedia.Added
        }
      })
      let localMedias: MediaDto[];
      if (!model?.medias)
        localMedias = mediasFromPicker;
      else
        localMedias = model.medias.concat(mediasFromPicker)

      setModel({
        ...model,
        medias: localMedias!,
        feedStyle: await generateFeedStyle(localMedias!)
      })
    }
  };

  return (
    <BaseDialog
      open={open}
      fullScreen={isMobile}
      dialogHeaderProps={{
        text: (isEdit && editFeedData) ? "Edit Feed" : "Create Feed",
        textRightButton: (isEdit && editFeedData) ? 'Update' : "Create",
        onButtonClose: onHeaderClose,
        rightButtonClick: (isEdit && editFeedData) ? putFeed : postFeed
      }}
      onClose={onClose}>
      <div
        className={styles.createUpdateFeed}>
        <div className={styles.body}>
          <div className={styles.bodyWrap}>
            <div className={styles.creatorContain}>
              <AvatarWithoutStory
                fullName={session?.user.fullname}
                imageClassName={styles.avatar}
                url={session?.user.avatar} />
              <div className={styles.nameAndButtons}>
                <p className={styles.userNameOrFullName}>
                  {session?.user.fullname || session?.user?.userName}
                </p>
                <div className={styles.selectPrivacyAndAlbum}>
                  <div className={styles.selectButton}>
                    <IcPublic />
                    <p>{`Public`}</p>
                    <IcMiniArrow />
                  </div>
                  <div className={styles.selectButton}>
                    <p>{`+ Album`}</p>
                    <IcMiniArrow />
                  </div>
                </div>
              </div>
            </div>
            <TextareaAutosize
              className={styles.captionInput}
              value={model?.caption!}
              onChange={(e) => setModel({ ...model, caption: e.target.value })}
              placeholder={intl.formatMessage({ id: "What’s on your mind?" })} />
            {(showPlaceholder && (!model?.medias || (model?.medias!.length === 0))) &&
              <div
                className={styles.mediaPlaceHolder}
                onClick={() => {
                  document?.getElementById("pickFeedMedias")?.click()
                }}>
                <h3>Add photos/videos</h3>
                <h4>or drag and drop</h4>
              </div>
            }
            {(model?.medias) &&
              <FeedMedias
                addOrUpdate
                onAddMediasClick={() => {
                  document?.getElementById("pickFeedMedias")?.click()
                }}
                onEditMediaClick={() => {

                }}
                onRemoveMedia={deleteMedia}
                medias={model.medias}
                feedStyle={model.feedStyle!} />
            }
          </div>
          <div className={styles.menu}>
            <IconWithFrame
              className={styles.icFrame}
              onClick={() => setShowPlaceholder(true)}>
              <IcPickMedia />
            </IconWithFrame>
            <IconWithFrame className={styles.icFrame}>
              <IcPickEmoji />
            </IconWithFrame >
            <IconWithFrame className={styles.icFrame}>
              <IcPickUsersTag />
            </IconWithFrame>
            <IconWithFrame className={styles.icFrame}>
              <IcCreateStream />
            </IconWithFrame>
            <IconWithFrame className={styles.icFrame}>
              <IcCheckInFeed />
            </IconWithFrame>
            <IconWithFrame className={styles.icFrame}>
              <IcOnlyTextMode />
            </IconWithFrame>
          </div>
        </div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <input
          id="pickFeedMedias"
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={onReceiveMedias}
        />
      </div>
    </BaseDialog>
  )
}

export default CreateUpdateFeedDialog;

