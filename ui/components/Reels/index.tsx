import Grid from '@mui/material/Grid';
import Reel from './Reel';
import styles from './reels.module.scss'
import _ from "lodash";

const reels = new Array<any>(6).fill({})
const Reels = () => {
  return (
    <div className={styles.reels}>
      <Grid container spacing={1}>
        {_.map(reels, (item: any) => (
          <Grid item lg={4} sm={3}>
            <Reel />
          </Grid>
        ))}
      </Grid>
      <div className={styles.endOfReels}>

      </div>
    </div>
  )
}

export default Reels;