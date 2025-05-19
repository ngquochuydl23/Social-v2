import ActivityHeader from '../components/ActivityHeader';
import ActivityLayout from '../components/ActivityLayout';
import styles from './checkIn.module.scss';

const CheckIn = () => {
  return (
    <ActivityLayout>
      <ActivityHeader
        title="Check-in"
        subtitle='View your likes, comments and other interactions'
      />
    </ActivityLayout>
  )
}

export default CheckIn;