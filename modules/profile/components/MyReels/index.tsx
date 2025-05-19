import Grid from "@mui/material/Grid";
import MyReelItem from "./MyReelItem";
import styles from "./myReels.module.scss";
import _ from "lodash";

const reels = new Array<any>(20).fill({});
const MyReels = () => {
  return (
    <div className={styles.myReels}>
      <Grid container spacing={1}>
        {_.map(reels, (item: any) => (
          <Grid item lg={2} sm={3} md={2.4} xs={4}>
            <MyReelItem />
          </Grid>
        ))}
      </Grid>
      <div className={styles.endOfMyReels}></div>
    </div>
  );
};

export default MyReels;
