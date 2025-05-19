import styles from './mediaPlaceholder.module.scss';
import { useIntl } from "react-intl";
import { IcAddMedia } from "@assets/icons";
import { FilledButton, OutlineButton } from "@components/Button";
import _ from "lodash";
import { useDropzone } from 'react-dropzone'
import { useCallback } from 'react';

interface MediaPlaceholderProps {
  onReceiveMediaFile: (file: any) => any;
}

const MediaPlaceholder: React.FC<MediaPlaceholderProps> = ({ onReceiveMediaFile }) => {
  const intl = useIntl();

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
    if (acceptedFiles[0]) {
      onReceiveMediaFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop
  })

  return (
    <div
      {...getRootProps()}
      id='clipboard'
      className={styles.uploadFrame}>
      <IcAddMedia />
      <input
        id="uploadFromPc"
        style={{ display: 'none' }}
        type="file"
        accept="image/*, video/*"
        onChange={(event) => {
          const file = event.target.files!![0];
          onReceiveMediaFile(file);
        }} />
      <input
        style={{ display: 'none' }}
        id="fromDrag"
        type="file"
        accept="image/*, video/*"
        {...getInputProps()} />
      <p className={styles.description}>
        {intl.formatMessage({ id: "Drag your image or video to here" })}
      </p>
      <FilledButton
        text="Upload from PC"
        // onClick={() => { document.getElementById("uploadFromPc")?.click() }}
        className={styles.uploadFromPcButton}
      />
      <div className={styles.orText}>
        <div className={styles.stroke} />
        <p>{"\n" + intl.formatMessage({ id: "Or" }) + "\n"}</p>
        <div className={styles.stroke} />
      </div>
      <OutlineButton
        text="Create a story text"
        className={styles.createStoryText}
      />
    </div >
  )
}

export default MediaPlaceholder;