import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import styles from './footer.module.scss'
import _ from 'lodash'
import Link from 'next/link';

const footerData = [
  {
    title: "Company",
    items: [
      { name: "Social-v2 Inc.", route: "" },
      { name: "Careers", route: "" },
      { name: "News", route: "" },
    ]
  },
  {
    title: "Community",
    items: [
      { name: "Support", route: "" },
      { name: "Community Guidelines", route: "" },
      { name: "Safety Center", route: "" },
    ]
  },
  {
    title: "Advertising",
    items: [
      { name: "Buy Ads", route: "" },
      { name: "Advertising Policies", route: "" },
      { name: "Political Ads Library", route: "" },
      { name: "Brand Guidelines", route: "" },
      { name: "Promotions Rules", route: "" },
    ]
  },
  {
    title: "Legal",
    items: [
      { name: "Privacy Center", route: "" },
      { name: "Cookie Policy", route: "" },
      { name: "Report Infringement", route: "" },
      { name: "Custom Creative Tools Terms", route: "" },
      { name: "Community Geofilter Terms", route: "" },
      { name: "Lens Studio Terms", route: "" },
    ]
  }
]


interface ColumnItemsProps {
  title: string;
  items: [];
}
const Footer = () => {
  const ColumnItems: React.FC<ColumnItemsProps> = ({
    title, items
  }) => {
    return (
      <Grid item xs={12} lg={3} sm={6} md={4}>
        <h4 className={styles.columnTitle}>
          {title}
        </h4>
        <ul>
          {_.map(items, (item: any) => {
            return (
              <Link href={item.route}>
                <li>{item.name}</li>
              </Link>
            )
          })}
        </ul>
      </Grid>
    )
  }

  return (
    <div className={styles.footer}>
      <Container
        fixed>
        <Grid container spacing={2}>
          {_.map(footerData, (item: any) => {
            return <ColumnItems key={item} {...item} />
          })}
        </Grid>
      </Container >
    </div>
  )
}

export default Footer;