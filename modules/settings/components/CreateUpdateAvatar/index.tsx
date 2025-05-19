import { AvatarWithoutStory } from '@components/Avatar';
import { useState } from 'react';
import styles from './createUpdateAvatar.module.scss'
import { FilledButton } from '@components/Button';
import ChangeAvatarDialog from '../ChangeAvatarDialog';
import { useSession } from 'context/SessionHook';

const CreateUpdateAvatar = () => {
  const { session } = useSession();
  const [file, setFile] = useState<any>();
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const onReceiveAvatar = (event: any) => {
    const file = event.target.files[0];
    if (Boolean(file)) {
      setFile(file);
      setOpenDialog(true);
    }
  }
  return (
    <div className={styles.createUpdateAvatar}>
      <AvatarWithoutStory
        imageClassName={styles.avatar}
        fullName={session?.user.fullname}
        url={session?.user.avatar}
      />
      <input
        id='avatar'
        type="file"
        accept="image/*"
        onChange={onReceiveAvatar} />
      <div className={styles.right}>
        <h4>Upload new avatar</h4>
        <p>The maximum file size allowed is 200KB</p>
        <div className={styles.buttonGroup}>
          <FilledButton
            onClick={() => document?.getElementById('avatar')?.click()}
            className={styles.changeAvatarButton}
            text='Change avatar' />
          <FilledButton
            className={styles.removeAvatarButton}
            text='Remove' />
        </div>
      </div>
      <ChangeAvatarDialog
        open={openDialog}
        avatarFile={file}
        onClose={() => setOpenDialog(false)} />
    </div>
  )
}

export default CreateUpdateAvatar;