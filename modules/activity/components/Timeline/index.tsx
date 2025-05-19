import moment from 'moment';
import styles from './timeline.module.scss'

interface TimelineProps {
  children: any;
  createAt?: string;
  isEmpty: boolean
}

const Timeline: React.FC<TimelineProps> = ({ children, createAt, isEmpty }) => {
  if (isEmpty) {
    return null;
  }
  return (
    <div className={styles.timeline}>
      <p className={styles.day}>{moment(createAt).format('MMMM DD, YYYY')}</p>
      {children}
    </div>
  );
};

export default Timeline;
