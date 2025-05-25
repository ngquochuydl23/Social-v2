import BaseDialog, {
  BaseDialogHeader,
  DialogProps
} from '@components/Dialogs/BaseDialog';
import styles from './changeCoverDialog.module.scss';
import { useIntl } from 'react-intl';
import Cropper, { Area } from 'react-easy-crop'
import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FilledButton } from '@components/Button';
import getCroppedImg from '../../../../utils/cropImageUtils';
import { uploadMedia } from 'services/UploadService';
import { changeAvatar, changeCover } from 'services/SettingService';
import { UserSessionDto } from 'services/SessionService/dtos';
import { useSession } from 'context/SessionHook';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface ChangeCoverDialogProps extends DialogProps {
  coverFile?: any
}

const ChangeCoverDialog: React.FC<ChangeCoverDialogProps> = ({
  open,
  onClose,
  coverFile
}) => {
  const intl = useIntl();
  const { updateUserSession } = useSession();
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [dimension, setDimension] = useState({ height: 0, width: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const [loading, setLoading] = useState(false);
  const [shareFeed, setShareFeed] = useState(false);
  const [caption, setCaption] = useState("");

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCheckShareFeed = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShareFeed(event.target.checked);
  };

  const cropImage = async () => {
    try {
      return await getCroppedImg(
        URL.createObjectURL(coverFile),
        croppedAreaPixels,
        rotation
      );
    } catch (error) {
      console.error(error);
    }
  };

  const uploadAvatar = () => {
    setLoading(true);
    cropImage()
      .then(({ file }) => {
        setLoading(true);
        uploadMedia(file)
          .then((res) => {
            const cover = res.result?.medias[0]
            changeCover({
              caption: caption,
              hasShareFeed: shareFeed,
              mediaType: cover?.mediaType,
              coverUrl: cover?.url
            })
              .then((res) => {
                updateUserSession({ cover: res.result?.cover } as UserSessionDto)
                onClose();
              })
              .catch(err => console.log(err))
              .finally(() => setLoading(false))
          })
          .catch(err => console.error(err))
          .finally(() => setLoading(false))
      })
      .catch(err => console.log(err))
  }

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      dialogHeaderProps={{
        text: 'Change Cover'
      }}
      isPadding={false}>
      <div className={styles.changeCover}>
        <div
          className={styles.body}>
          {coverFile
            ?
            <div
              className={styles.cover}
              style={{ aspectRatio: 3/2}}
              >
              <Cropper
                classes={{
                  containerClassName: styles.cropContaner,
                  mediaClassName: styles.media,
                  cropAreaClassName: styles.cropArea,
                }}
                image={URL.createObjectURL(coverFile)}
                crop={crop}
                objectFit='horizontal-cover'
                cropShape='rect'
                aspect={3}
                zoomWithScroll={false}
                showGrid={false}
                rotation={rotation}
                onRotationChange={setRotation}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                onMediaLoaded={(mediaSize) => {
                  setDimension({
                    width: mediaSize.naturalWidth,
                    height: mediaSize.naturalHeight,
                  })
                }}
              />
            </div>
            : null
          }
          <TextareaAutosize
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className={styles.captionInput}
            placeholder={intl.formatMessage({ id: "What’s on your mind?" })} />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={shareFeed}
                  onChange={onCheckShareFeed} />
              }
              label={
                <p className={styles.shareFeedTitle}>
                  {intl.formatMessage({ id: "Share yours update to new feeds" })}
                </p>
              } />
          </FormGroup>
          <FilledButton
            className={styles.updateCoverButton}
            text='Change Cover'
            onClick={uploadAvatar}
          />
        </div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </BaseDialog>
  )
}

export default ChangeCoverDialog;