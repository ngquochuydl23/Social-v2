import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Box, Grid, Skeleton, Stack } from "@mui/material";
import styles from "./imagesTab.module.scss";
import _ from "lodash";
import { getMedias } from "services/ProfileService";
import { MediaDto } from "services/MediaService/dtos";
import SocialV2Link from "@components/Social-v2-Link";
import { getAlbumDetail, getAllAlbums } from "services/AlbumService";
import { AlbumDto } from "services/AlbumService/dtos";
import Lottie from "lottie-react";
import { Loading } from "@assets/lotties";
import { useSession } from "context/SessionHook";

const ImagesTab = () => {
  const albumDetailRef = useRef(null);
  const albumsRef = useRef(null);

  const { query } = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [medias, setMedias] = useState<Array<MediaDto> | [] | null>();
  const [albums, setAlbums] = useState<Array<AlbumDto> | [] | null>();
  const [albumDetail, setAlbumDetail] = useState<AlbumDto | null>();
  const { session } = useSession();

  useEffect(() => {
    const getAlbumsAndMedias = async () => {
      setLoading(true);
      ((albumsRef.current as any)?.scrollIntoView({ behavior: 'smooth' }))
      try {
        if (query && query.userName) {

          const username: any = query.userName !== 'me'
            ? query.userName
            : session?.user.userName
            
          setMedias((await getMedias(username as string)).result);
          setAlbums((await getAllAlbums(username as string)).result);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getAlbumsAndMedias();
  }, []);

  useEffect(() => {
    if (query && query.albumId && Number(query.albumId)) {
      ((albumDetailRef.current as any)?.scrollIntoView())

      getAlbumDetail(Number(query.albumId))
        .then((res) => { setAlbumDetail(res.result) })
        .catch((err) => console.log(err))

    } else if (query.albumId === undefined) {
      ((albumsRef.current as any)?.scrollIntoView())
      setAlbumDetail(undefined);
    }
  }, [query.albumId])

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 70px)',
        marginTop: "10px",
        borderRadius: "10px",
        backgroundColor: "var(--BgPrimaryColor)",
      }}>
      {query.albumId
        ?
        <div
          ref={albumDetailRef}
          className={styles.albumDetail}>
          <div className={styles.header}>
            <div className={styles.info}>
              <h4>{albumDetail?.name}</h4>
              <p>{`Yesterday at 22:44`}</p>
            </div>
          </div>
          <p className={styles.description}>
            {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`}
          </p>
          <Grid
            container
            spacing="5px">
            {_.map(albumDetail?.medias, (item: MediaDto) => (
              <Grid item lg={2} sm={3} md={2.4} xs={4}>
                <div className={styles.media}>
                  <img alt="" src={item.url} />
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
        : (
          loading
            ?
            <div className={styles.loading}>
              <Skeleton
                variant="text"
                sx={{ fontSize: '16px', width: '100px' }} />
              <Stack spacing="10px" direction="row" sx={{ marginY: '10px' }}>
                <Skeleton variant="rounded" sx={{ borderRadius: '7.5px' }} width="120px" height="120px" />
                <Skeleton variant="rounded" sx={{ borderRadius: '7.5px' }} width="120px" height="120px" />
              </Stack>
              <Skeleton
                variant="text"
                sx={{ fontSize: '16px', width: '100px' }} />
              <Grid container spacing="5px" sx={{ marginY: '7.5px' }}>
                <Grid item lg={2} sm={3} md={2.4} xs={4}>
                  <Skeleton
                    variant="rectangular"
                    sx={{ borderRadius: '7.5px', aspectRatio: 1, width: '100%', height: '100%' }} />
                </Grid>
                <Grid item lg={2} sm={3} md={2.4} xs={4}>
                  <Skeleton
                    variant="rectangular"
                    sx={{ borderRadius: '7.5px', aspectRatio: 1, width: '100%', height: '100%' }} />
                </Grid>
                <Grid item lg={2} sm={3} md={2.4} xs={4}>
                  <Skeleton
                    variant="rectangular"
                    sx={{ borderRadius: '7.5px', aspectRatio: 1, width: '100%', height: '100%' }} />
                </Grid>
              </Grid>
            </div>
            : <>
              <div
                style={{ scrollMargin: '̃70px' }}
                ref={albumsRef}
                className={styles.section}>
                <h4 className={styles.title}>{`Albums`}</h4>
                <Stack spacing="10px" direction="row">
                  {_.map(albums, (item: AlbumDto) => (
                    <Grid item lg={2} sm={3} md={2.4} xs={4}>
                      <SocialV2Link
                        href={{
                          pathname: './' + query.userName,
                          query: { tab: 'images', albumId: item.id }
                        }}>
                        <div className={styles.album}>
                          {item.thumbnail
                            ? <img alt="" src={item.thumbnail} />
                            : <div>

                            </div>
                          }
                          <div className={styles.onImage}>
                            <h4 className={styles.albumName}>{item.name}</h4>
                            <p className={styles.nOfPhotos}>
                              {item.count || 0} {`Photos`}
                            </p>
                          </div>
                        </div>
                      </SocialV2Link>
                    </Grid>
                  ))}
                </Stack>
              </div>
              <div className={styles.section}>
                <h4 className={styles.title}>{`All Medias`}</h4>
                <Grid container spacing="5px">
                  {_.map(medias, (item: any) => (
                    <Grid item lg={2} sm={3} md={2.4} xs={4}>
                      <div className={styles.media}>
                        <img alt="" src={item.url} />
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </>
        )
      }
    </Box >
  );
};

export default ImagesTab;
