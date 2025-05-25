import Link from "next/link"
import styles from './socialv2-link.module.scss'
import classNames from "classnames";


interface SocialV2LinkProps {
  href: any;
  className?: string;
  children?: any;
  replace?: boolean
  as?: string;
  underlineHover?: boolean;
  legacyBehavior?: boolean;
}

const SocialV2Link: React.FC<SocialV2LinkProps> = ({
  className, href, children, replace = false, as, legacyBehavior = false
}) => {
  return (
    <Link
      prefetch
      legacyBehavior={legacyBehavior}
      as={as}
      replace={replace}
      className={classNames(styles.link, className)}
      href={href}>
      {children}
    </Link>
  )
}

export default SocialV2Link;