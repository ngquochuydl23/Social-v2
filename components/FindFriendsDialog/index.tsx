import BaseDialog, { BaseDialogHeader, DialogProps } from "@components/Dialogs/BaseDialog";
import styles from './findFriendsDialog.module.scss'
import { Stack } from "@mui/material";
import _ from "lodash";
import SocialV2Link from "@components/Social-v2-Link";
import { AvatarWithoutStory } from "@components/Avatar";
import { FilledButton } from "@components/Button";
import classNames from "classnames";
import { useIntl } from "react-intl";

const people = new Array<any>(6).fill({})
const creator = {
  userName: "huy.social-v2",
  fullName: "Nguyễn Quốc Huy",
  avatar: "https://www.social-v2.com/images/social-v2-1686645866125.png"
}

const FindFriendsDialog: React.FC<DialogProps> = ({ open, onClose }) => {
  const intl = useIntl();
  // const FollowButton = () => {
  //   if (state.followed === null)
  //     return null;

  //   if (state.followed === true) {
  //     return <OutlineButton
  //       onClick={() => setState({ followed: false, fetched: false })}
  //       className={classNames(styles.buttonWrapper, styles.followed)}
  //       text='Following' />
  //   }
  //   return <FilledButton
  //     onClick={() => setState({ followed: true, fetched: false })}
  //     className={classNames(styles.buttonWrapper, styles.noFollow)}
  //     text='Follow' />
  // }

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      showBaseHeader={false}
      isPadding={false}>
      <div className={styles.findFriends}>
        <BaseDialogHeader
          textRightButton='Cancel'
          rightButtonClick={onClose}
          text='Find Friends'
          onButtonClose={onClose} />
        <div className={styles.body}>
          <Stack spacing={2}>
            {_.map(people, (item, key) => {
              return (
                <div
                  key={key}
                  className={styles.likeItem}>
                  <SocialV2Link
                    href={"/profile/" + `${creator?.userName}`}
                    className={styles.infoCreator}>
                    <AvatarWithoutStory
                      href={"/profile/" + `${creator?.userName}`}
                      fullName={creator?.fullName}
                      url={creator?.avatar}
                    />
                    <div className={styles.info}>
                      <p className={styles.fullName}>{creator?.fullName}</p>
                      <p className={styles.username}>@{creator?.userName}</p>
                      <p className={styles.followers}><span>1M</span> {intl.formatMessage({ id: "Followers" })}</p>
                    </div>
                  </SocialV2Link>
                  <FilledButton
                    // onClick={() => setState({ followed: true, fetched: false })}
                    className={styles.button}
                    text='Follow' />
                </div>
              )
            })}
          </Stack>
        </div>
      </div>
    </BaseDialog>
  )
}

export default FindFriendsDialog;