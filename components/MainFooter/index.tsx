import _ from 'lodash'
import Link from 'next/link'
import styles from './mainFooter.module.scss'
import { useIntl } from 'react-intl';
import { Environment } from '@constants/globals';

const routes = [
  { title: "About", href: "" },
  { title: "Helps", href: "" },
  { title: "API", href: "" },
  { title: "Jobs", href: "" },
  { title: "Privacy", href: "" },
  { title: "Terms", href: "" },
  { title: "Locations", href: "" },
  { title: "Languages", href: "" },
]

const MainFooter = () => {
  const intl = useIntl();
  return (
    <div className={styles.mainFooter}>
      {_.map(routes, (item: any, index) => {
        return (
          <span>
            <Link href={item.href}>
              {intl.formatMessage({ id: item.title })}
            </Link>
            {" • "}
          </span>
        )
      })}
      <p className={styles.footerLower}>
        {`© 2023 SOCIAL-V2 FROM PGONEVN`}
        {process.env.NODE_ENV !== Environment.Production &&
          <span> ({process.env.NEXT_PUBLIC_NODE_ENV})</span>}
      </p>
    </div>
  )
}

export default MainFooter;