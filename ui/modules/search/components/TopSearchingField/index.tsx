import styles from './topSearchingField.module.scss'

interface TopSearchingFieldProps {
  onViewMore?: () => any;
  title?: string;
  children?: any;
}

const TopSearchingField: React.FC<TopSearchingFieldProps> = ({
  onViewMore,
  title,
  children
}) => {
  return (
    <div className={styles.topSearchingField}>
      <div className={styles.header}>
        <p className={styles.title}>{title}</p>
        <span className={styles.viewMoreButton}>{'View more'}</span>
      </div>
      <div className={styles.children}>
        {children}
      </div>
    </div>
  )
}

export default TopSearchingField;