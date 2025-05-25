import FeedItem from "@components/Feeds/FeedItem";
import TopSearchingField from "./components/TopSearchingField";
import UserSearchingResult from "./components/UserSearchingResult";
import _ from "lodash";
import { PATH } from "@constants/path";
import SocialV2Link from "@components/Social-v2-Link";
import Reels from "@components/Reels";

const searchingResult = {
  users: {
    title: 'Users',
    resultCount: 2000,
    userResults: [
      {
        id: 5,
        fullName: 'Nguyễn Quốc Huy',
        avatar: 'https://www.social-v2.com/images/social-v2-1683441388189.jpeg',
        hasUnviewedStories: true,
        userName: 'huy.social-v2',
        followerCount: '1K',
        followed: false
      },
      {
        id: 7,
        fullName: 'Như Quỳnh',
        avatar: 'https://www.social-v2.com/images/social-v2-1683459824486.jpeg',
        hasUnviewedStories: false,
        userName: 'quynhu',
        followerCount: '2K',
        followed: false
      },
      {
        id: 6,
        fullName: 'Ni Luong',
        avatar: 'https://www.social-v2.com/images/social-v2-1682054747706.jpeg',
        hasUnviewedStories: false,
        userName: 'ni.luong',
        followerCount: '2K',
        followed: false
      },
      {
        id: 1,
        fullName: 'Vũ Hoàng Uyên Nhi',
        avatar: 'https://www.social-v2.com/images/social-v2-1676526904519.jpeg',
        hasUnviewedStories: false,
        userName: '__vunhi__',
        followerCount: '2K',
        followed: false
      }
    ]
  }
}


const TopSearchResult = () => {
  return (
    <div>
      {searchingResult.users &&
        <TopSearchingField
          title={searchingResult.users.title}>
          {_.map(searchingResult.users.userResults, (user: any) => (
            <SocialV2Link href={PATH.Profile + user.userName}>
              <UserSearchingResult {...user} />
            </SocialV2Link>
          ))}
        </TopSearchingField>
      }
      <TopSearchingField title="Feeds">
        <FeedItem
          feed={JSON.parse('{ "caption": "Stay with Huy", "owned": true, "feedStyle": "classic.one_square", "album": null, "creator": { "id": 1, "fullName": "Vũ Hoàng Uyên Nhi", "userName": "__vunhi__", "avatar": "https://www.social-v2.com/images/social-v2-1675605713555.jpeg", "followed": null }, "medias": [ { "id": 52, "owned": false, "url": "https://www.social-v2.com/images/social-v2-1675694410785.jpeg", "createAt": "2023-02-06T21:41:27.950778", "mediaType": "image/jpeg", "caption": null, "duration": 0, "views": 0 } ], "id": 61 }')} />
      </TopSearchingField>
      <TopSearchingField title="Reels">
        <Reels />
      </TopSearchingField>
    </div>
  )
}

export default TopSearchResult;