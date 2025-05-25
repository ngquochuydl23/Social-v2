import HomeLayout from "@layouts/HomeLayout";
import RightSideBar from "modules/home/components/RightSideBar";
import ReelList from "@components/Reels";
import ReelWatchings from "@components/ReelWatchings";

const reels = [{
  //caption: "안녕하세요",
  caption:
  "This is how we make local dating easy for expats… 🌎 \n ✔️​ Leading Vietnamese dating site with a HUGE member base of over 1.5 million singles.\n✔️​ Instant translation tool for ANY language, getting to know someone has never been easier\n✔️​ Unique opportunity to view, like and message ANY profile.\nWe have helped thousands of expats meet locals.\nNow it is your turn, sign up now.",
  creator: {
    id: 1,
    userName: "xooxee",
    fullname: "Han So Hee",
    avatar: "https://iili.io/HRS7yRs.jpg",
  },
  video: {
    thumbnail: "https://iili.io/HRS7yRs.jpg",
    url: "https://firebasestorage.googleapis.com/v0/b/netfilm-5ba5f.appspot.com/o/images%2Fphoto_2022-12-20_22-03-48.jpg?alt=media&token=b01af286-3bdc-48e7-9032-38a924d3ab3f",
  },
  likeCount: 281,
  commentCount: 30,
  shareCount: 52,
}, {
  caption:
  "This is how we make local dating easy for expats… 🌎 \n ✔️​ Leading Vietnamese dating site with a HUGE member base of over 1.5 million singles.\n✔️​ Instant translation tool for ANY language, getting to know someone has never been easier\n✔️​ Unique opportunity to view, like and message ANY profile.\nWe have helped thousands of expats meet locals.\nNow it is your turn, sign up now.",
  creator: {
    id: 1,
    userName: "xooxee",
    fullname: "Xiong Xiao Nuo",
    avatar: "https://iili.io/HRS7yRs.jpg",
  },
  video: {
    thumbnail: "https://iili.io/HRoWH12.webp",
    url: "https://iili.io/HRoWH12.webp",
  },
  likeCount: 281,
  commentCount: 30,
  shareCount: 52,
},
{
  caption:
    "This is how we make local dating easy for expats… 🌎 \n ✔️​ Leading Vietnamese dating site with a HUGE member base of over 1.5 million singles.\n✔️​ Instant translation tool for ANY language, getting to know someone has never been easier\n✔️​ Unique opportunity to view, like and message ANY profile.\nWe have helped thousands of expats meet locals.\nNow it is your turn, sign up now.",
  creator: {
    id: 1,
    userName: "xooxee",
    fullname: "Vũ Hoàng Uyên Nhi",
    avatar: "https://firebasestorage.googleapis.com/v0/b/netfilm-5ba5f.appspot.com/o/images%2Fphoto_2022-12-20_22-03-48.jpg?alt=media&token=b01af286-3bdc-48e7-9032-38a924d3ab3f",
  },
  video: {
    thumbnail: "https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539__340.jpg",
    url: "https://iili.io/HRoWH12.webp",
  },
  likeCount: 281,
  commentCount: 30,
  shareCount: 52,
}]

const ReelsPage = () => {
  return (
    <HomeLayout rightSideBar={<RightSideBar />}>
      <ReelWatchings reels={reels} />
    </HomeLayout>
  );
};

export default ReelsPage;
