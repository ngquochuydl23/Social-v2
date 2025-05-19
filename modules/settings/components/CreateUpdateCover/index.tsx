import { useState, useEffect } from 'react';
import styles from './createUpdateCover.module.scss'
import { useSession } from 'context/SessionHook';
import { IcAddCover } from '@assets/icons';
import { FilledButton } from '@components/Button';
import ChangeCoverDialog from '../ChangeCoverDialog';
import { useIntl } from 'react-intl';

const CreateUpdateCover = () => {
  const { session } = useSession();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [file, setFile] = useState<any>();
  const intl = useIntl();

  const onReceiveCover = (event: any) => {
    const file = event.target.files[0];
    if (Boolean(file)) {
      setFile(file);
      setOpenDialog(true);
    }
  }
  return (
    <div className={styles.createUpdateCover}>
      {session?.user.cover
        ? <img
          alt="cover"
          src={session?.user.cover}
          onClick={() => document?.getElementById('cover')?.click()} />
        : <div
          className={styles.coverFrame}
          onClick={() => document?.getElementById('cover')?.click()}>
          <IcAddCover width={50} height={50} />
        </div>
      }
      <h4>Upload new cover</h4>
      <p>{intl.formatMessage({ id: "JPEG, PNG, or GIF and less then 10MB. Recommended 1200x480" })}</p>
      <div className={styles.buttonGroup}>
        <FilledButton
          onClick={() => document?.getElementById('cover')?.click()}
          className={styles.changeCoverButton}
          text='Change Cover' />
        <FilledButton
          className={styles.removeCoverButton}
          text='Remove' />
      </div>
      <input
        id='cover'
        type="file"
        accept="image/*"
        onChange={onReceiveCover} />

      <ChangeCoverDialog
        open={openDialog}
        coverFile={file}
        onClose={() => setOpenDialog(false)} />
    </div>
  )
}

export default CreateUpdateCover;