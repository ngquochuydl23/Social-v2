import HistorySearchItem from '../HistorySearchItem';
import styles from './hisorySearchView.module.scss'

const HisorySearchView = () => {
  return (
    <div className={styles.searchView}>
      <div className={styles.historyWrap}>
        <div className={styles.header}>
          <p className={styles.title}> {`History`}</p>
        </div>
        <HistorySearchItem type='hashtag' />
        <HistorySearchItem type='user' />
        <HistorySearchItem type='user' />
      </div>
    </div>
  )
}

export default HisorySearchView;