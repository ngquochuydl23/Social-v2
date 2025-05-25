import { PATH } from "@constants/path";
import IconWithFrame from "@components/IconWithFrame";
import React, { useState } from "react";
import Link from "next/link";
import { useIntl } from "react-intl";
import styles from "./header.module.scss";
import Badge from "@mui/material/Badge";
import AccountDropDown from "@components/DropDown/AccountDropDown";
import { IcChat, IcNotification, IcSearch, IcUpload } from "@assets/icons";
import UploadDropDown from "@components/DropDown/UploadDropDown";
import { AvatarWithoutStory } from "@components/Avatar";
import { useSession } from "context/SessionHook";
import BaseContainer from "@components/BaseContainer";
import { NotificationDropDown } from "modules/notifications";
import { SearchDropDown } from "modules/HistorySearch";
import { useRouter } from "next/router";

const CreateButton = () => {
  const intl = useIntl();
  const [openDropDown, setOpenDropDown] = React.useState(false);
  return (
    <div
      className={styles.createButton}
      onClick={() => setOpenDropDown(!openDropDown)}
    >
      <IcUpload width={24} height={24} />
      <h4 className={styles.buttonText}>
        {intl.formatMessage({ id: "Create" })}
      </h4>
      <UploadDropDown open={openDropDown} />
    </div>
  );
};

interface AccountButtonProps {
  avatar?: string | null;
  fullName?: string;
}

const AccountButton: React.FC<AccountButtonProps> = ({ avatar, fullName }) => {
  const [openDropDown, setOpenDropDown] = React.useState(false);
  return (
    <div className={styles.avatarContain}>
      <AvatarWithoutStory
        imageClassName={styles.avatar}
        url={avatar}
        fullName={fullName}
        onClick={() => setOpenDropDown(!openDropDown)}
      />
      <AccountDropDown open={openDropDown} />
    </div>
  );
};

const NotficationButton = ({
  numberOfNotify,
}: {
  numberOfNotify: number | undefined;
}) => {
  const [openDropDown, setOpenDropDown] = React.useState(false);
  return (
    <div className={styles.notifications}>
      <Badge
        className={styles.navItem}
        badgeContent={numberOfNotify}
        overlap="circular">
        <IconWithFrame onClick={() => setOpenDropDown(!openDropDown)}>
          <IcNotification width={24} height={24} />
        </IconWithFrame>
        <NotificationDropDown open={openDropDown} />
      </Badge>
    </div>
  );
};

const SearchBox = () => {
  const router = useRouter();
  const [isFocused, setIsFocused] = React.useState(false);
  const [text, setText] = useState('');
  return (
    <div className={styles.searchBox}>
      <IcSearch />
      <input
        value={text}
        className={styles.searchInput}
        type="text"
        onKeyPress={e => {
          if (e.key === 'Enter' && text !== '') {
            router.push(`search?keyword=${text}&tab=top`, undefined, { shallow: true })
          }
        }}
        onChange={(e) => setText(e.target.value)}
        placeholder="Searching account or videos"
        onBlur={(event) => setIsFocused(false)}
        onFocus={(event) => setIsFocused(true)} />
      <SearchDropDown open={isFocused} />
    </div>
  )
}

const Header = ({ fullWidth = false }: {
  fullWidth?: boolean;
}) => {
  const { session } = useSession();
  return (
    <header className={styles.headerContainer}>
      <BaseContainer
        fullWidth={fullWidth}
        className={styles.overwriteContainer}>
        <div className={styles.header}>
          <Link href={PATH.home}>
            <div className={styles.logoApp}>SOCIAL-V2</div>
          </Link>
          <SearchBox />
          {Boolean(session) ? (
            <div className={styles.rightContain}>
              {/* <CreateButton /> */}
              <NotficationButton numberOfNotify={session!.notiBadges} />
              <Link href={PATH.Chat}>
                <Badge
                  className={styles.navItem}
                  badgeContent={session!.messageBadges}
                  overlap="circular">
                  <IconWithFrame>
                    <IcChat width={22} height={24} />
                  </IconWithFrame>
                </Badge>
              </Link>
              <AccountButton
                avatar={session!.user.avatar}
                fullName={session!.user.fullname}
              />
            </div>
          ) : (
            <div>Sign In</div>
          )}
        </div>
      </BaseContainer>
    </header>
  );
};

export default Header;
