import { Range } from 'react-range';
import styles from './selectThumbnailVideo.module.scss';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { generateVideoThumbnails } from '@rajesh896/video-thumbnails-generator';


interface SelectThumbnailVideoProps {
  videoFile: any;
  onSelect: () => any;
}

const SelectThumbnailVideo: React.FC<SelectThumbnailVideoProps> = ({
  videoFile,
  onSelect
}) => {

  const [seek, setSeek] = useState([50]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  useEffect(() => {
    if (videoFile) {
      generateVideoThumbnails(videoFile, 5, '')
      .then((thumbs) => {
        setThumbnails(thumbs);
      });
    }
  }, [videoFile])


  const ThumbnailSet = () => {
    return (
      <div>

      </div>
    )
  }

  return (
    <div className={styles.thumbnailRange}>
      <Range
        step={0.1}
        min={0}
        max={100}
        values={seek}
        onChange={(values) => setSeek(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              position: 'relative',
              ...props.style,
              height: '100px',
              width: '100%',
            }}>
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '42px',
              width: '42px',
              backgroundColor: '#999'
            }}
          />
        )}
      />
    </div>
  )
}

export default SelectThumbnailVideo;