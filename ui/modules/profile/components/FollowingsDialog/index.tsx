import BaseDialog, { BaseDialogHeader, DialogProps } from "@components/Dialogs/BaseDialog";
import styles from './followingDialog.module.scss';
import { Box, Skeleton, Stack } from "@mui/material";
import { getFollowings } from "services/FollowingService";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "context/SessionHook";
import { FollowingDto } from "services/FollowingService/dtos";
import _ from "lodash";
import SocialV2Link from "@components/Social-v2-Link";
import { AvatarWithoutStory } from "@components/Avatar";
import { FilledButton, OutlineButton } from "@components/Button";
import classNames from "classnames";
import { isMobile } from "react-device-detect";


const FollowingItem = (following: FollowingDto) => {
  const [followed, setFollowed] = useState<boolean>();
  useEffect(() => {
    setFollowed(following.followed);
  }, [following])

  return (
    <div
      key={following.id}
      className={styles.likeItem}>
      <div className={styles.container}>
        <div className={styles.item}>
          <SocialV2Link
            href={"/profile/[userName]"}
            as={"/profile/" + `${following?.userName}`}
            className={styles.infoCreator}>
            <AvatarWithoutStory
              href={"/profile/" + `${following?.userName}`}
              fullName={following?.fullName}
              url={following?.avatar}
            />
            <div className={styles.name}>
              <p className={styles.fullName}>{following?.fullName}</p>
              <p className={styles.username}>@{following?.userName}</p>
            </div>
          </SocialV2Link>
          {followed
            ? <OutlineButton
              onClick={() => setFollowed(false)}
              className={classNames(styles.buttonWrapper, styles.followed)}
              text='Following' />
            : <FilledButton
              onClick={() => setFollowed(true)}
              className={classNames(styles.buttonWrapper, styles.noFollow)}
              text='Follow' />
          }
        </div>
      </div>
    </div>
  )
}


const FollowingsDialog: React.FC<DialogProps> = ({ open, onClose }) => {
  const { query } = useRouter();
  const { session } = useSession();

  const [loading, setLoading] = useState(false);
  const [followings, setFollowings] = useState<FollowingDto[]>();

  useEffect(() => {
    if (query && query.userName && open) {
      const username: any = query.userName !== 'me'
        ? query.userName
        : session?.user.userName

      setLoading(true);
      getFollowings(username)
        .then((res) => {
          setFollowings(res.result)
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        })
    }
  }, [open])

  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullScreen={isMobile}
      showBaseHeader={false}
      isPadding={false}>
      <div style={{ borderRadius: '20px' }}>
        <BaseDialogHeader
          textRightButton='Cancel'
          rightButtonClick={onClose}
          text="Following"
          onButtonClose={onClose} />
        {!loading
          ?
          <Stack spacing="10px" sx={{ paddingBottom: '10px' }}>
            {_.map(followings, (item: FollowingDto) => (
              <FollowingItem {...item} />
            ))}
          </Stack>
          :
          <Stack
            sx={{ marginX: '10px' }}
            direction="column">
            <Box sx={{
              padding: '10px',
              display: 'flex',
              flexDirection: 'row'
            }}>
              <Skeleton
                sx={{ bgcolor: 'var(--SkeletonColor)' }}
                variant="circular"
                width='50px'
                height='50px' />
              <Box sx={{ marginLeft: '15px' }}>
                <Skeleton variant="text" sx={{ fontSize: '18px', width: '150px', bgcolor: 'var(--SkeletonColor)' }} />
                <Skeleton variant="text" sx={{ fontSize: '15px', width: '100px', bgcolor: 'var(--SkeletonColor)' }} />
              </Box>
            </Box>
            <Box sx={{
              padding: '10px',
              display: 'flex',
              flexDirection: 'row'
            }}>
              <Skeleton
                sx={{ bgcolor: 'var(--SkeletonColor)' }}
                variant="circular"
                width='50px'
                height='50px' />
              <Box sx={{ marginLeft: '15px' }}>
                <Skeleton variant="text" sx={{ fontSize: '18px', width: '150px', bgcolor: 'var(--SkeletonColor)' }} />
                <Skeleton variant="text" sx={{ fontSize: '15px', width: '100px', bgcolor: 'var(--SkeletonColor)' }} />
              </Box>
            </Box>
            <Box sx={{
              padding: '10px',
              display: 'flex',
              flexDirection: 'row'
            }}>
              <Skeleton
                sx={{ bgcolor: 'var(--SkeletonColor)' }}
                variant="circular"
                width='50px'
                height='50px' />
              <Box sx={{ marginLeft: '15px' }}>
                <Skeleton variant="text" sx={{ fontSize: '18px', width: '150px', bgcolor: 'var(--SkeletonColor)' }} />
                <Skeleton variant="text" sx={{ fontSize: '15px', width: '100px', bgcolor: 'var(--SkeletonColor)' }} />
              </Box>
            </Box>
          </Stack>
        }

      </div>
    </BaseDialog>
  )
}

export default FollowingsDialog;