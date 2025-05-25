import { ProtectedRoute } from "@components/Authentication";
import HomeSideBarItem from "@components/HomeSideBar/HomeSideBarItem";
import MainLayout from "@layouts/MainLayout";
import { Drawer } from "@mui/material";
import { useRouter } from "next/router";
import styles from './search.module.scss'
import TopSearchResult from "./TopSearchResult";
import SearchLayout from "./components/SearchLayout";


const tabs = [
  { label: "Top", tab: "top" },
  { label: "User", tab: "user" },
  { label: "Feeds", tab: "feeds" },
  { label: "Reels", tab: "reels" },
]

const SearchPage = () => {
  const router = useRouter();
  const TabContent = () => {
    switch (router.query.tab) {
      case "top":
        return <TopSearchResult />
      default:
        return null;
    }
  }

  return (
    <SearchLayout>
      {TabContent()}
    </SearchLayout>
  )
}

export default SearchPage;