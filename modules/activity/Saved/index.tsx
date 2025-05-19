import ActivityHeader from '../components/ActivityHeader';
import ActivityLayout from '../components/ActivityLayout';
import styles from './saved.module.scss';

const Saved = () => {
  return (
    <ActivityLayout>
      <ActivityHeader
        title="Saved"
        subtitle='View your likes, comments and other interactions'
      />
      
    </ActivityLayout>
  )
}

export default Saved;