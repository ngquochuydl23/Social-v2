import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import styles from './avatar.module.scss'
//import _Avatar from 'react-avatar';
import _Avatar from '@mui/material/Avatar';
import { stringAvatar } from 'utils/AvatarUtils';

interface AvatarProps {
  url?: string | any;
  href?: string;
  onClick?: () => any;
  imageClassName?: any;
  fullName?: string;
  variant?: 'circular' | 'rounded' | 'square';
}

interface AvatarWithStoryProps extends AvatarProps {
  hasUnViewStories?: boolean;
  avatarStoryCN?: string;
}

export const AvatarWithoutStory: React.FC<AvatarProps> = ({
  url, href, onClick, imageClassName, fullName, variant
}) => {

  const Avatar = ({ onAvatarClick }: { onAvatarClick?: () => any }) => (
    <div
      className={classNames(styles.avatar, imageClassName)}
      onClick={onAvatarClick}>
      {url
        ? <Image fill alt={''} src={url} />
        : <_Avatar
          {...stringAvatar(fullName!)}
          className={styles.avatarWithName}
          variant={variant}
          alt={fullName} />
      }
    </div>
  )
  if (Boolean(href)) {
    return (
      <Link
        className={styles.hrefAvatar}
        href={href!}>
        <Avatar />
      </Link>
    )
  }
  return <Avatar onAvatarClick={onClick} />
}

export const AvatarWithStory: React.FC<AvatarWithStoryProps> = ({
  url,
  hasUnViewStories = false,
  href,
  onClick,
  imageClassName,
  avatarStoryCN,
  fullName
}) => {
  return (
    <div className={classNames(
      styles.avatarWithStories, avatarStoryCN,
      hasUnViewStories ? styles.unViewStory : styles.viewStory
    )}>
      <AvatarWithoutStory
        imageClassName={styles.avatarInside}
        href={!hasUnViewStories ? href : ""}
        onClick={onClick}
        fullName={fullName}
        url={url} />
    </div>
  )
}
