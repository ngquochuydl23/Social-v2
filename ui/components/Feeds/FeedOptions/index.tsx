import { IcBookMarkOption, IcDeletePost, IcEditFeed } from '@assets/icons';
import styles from './feedOptions.module.scss';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { FeedDto } from 'services/FeedService/dtos';
import { isMobile } from 'react-device-detect';

interface FeedOptionItemProps {
  title: string;
  subtitle?: string;
  icon?: any;
  className?: string;
  onClick: () => any;
}

interface FeedOptionsProps {
  feed?: FeedDto;
  onDeleteFeedClick: () => any;
  onUpdateFeedClick: () => any;
}

const FeedOptions: React.FC<FeedOptionsProps> = ({
  feed,
  onDeleteFeedClick, 
  onUpdateFeedClick,
}) => {
  const intl = useIntl();
  const FeedOptionItem: React.FC<FeedOptionItemProps> = ({
    title, subtitle, icon, className, onClick
  }) => {
    return (
      <div
        className={classNames(
          styles.feedOptionItem,
          className,
          isMobile && styles.isMobile
        )}
        onClick={onClick}>
        {icon}
        <div>
          <p className={styles.feedOptionTitle}>
            {intl.formatMessage({ id: title })}
          </p>
          {subtitle &&
            <p className={styles.feedOptionSubtitle}>
              {intl.formatMessage({ id: subtitle })}
            </p>
          }
        </div>
      </div>
    )
  }

  return (
    <div>
      <FeedOptionItem
        icon={<IcBookMarkOption />}
        title="Save"
        subtitle="Add this to you saved items"
        onClick={() => {

        }}
      />
      {feed?.owned &&
        <div>
          <FeedOptionItem
            icon={<IcEditFeed />}
            title="Edit"
            subtitle="Remove permanently this post"
            onClick={onUpdateFeedClick}
          />
          <FeedOptionItem
            icon={<IcDeletePost />}
            title="Delete"
            subtitle="Remove permanently this post"
            onClick={onDeleteFeedClick}
          />
        </div>
      }
    </div>
  )
}

export default FeedOptions;