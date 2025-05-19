import React from "react";
import { PATH } from '@constants/path';
import DropDownMenu, { BaseDropDownMenuProps } from '../BaseDropDownMenu'
import { IcCreateLiveVideos, IcHelp, IcCreateStories, IcCreateReels, IcSetting, IcCreateFeeds } from '@assets/icons';
import UploadDDItem from './UploadDDItem';

const UploadDropDown = (props: BaseDropDownMenuProps) => {
  return (
    <DropDownMenu {...props}>
      <UploadDDItem text='Feeds'>
        <IcCreateFeeds
          width={20}
          height={20} />
      </UploadDDItem>
      <UploadDDItem
        href={PATH.Settings}
        text='Stories'>
        <IcCreateStories
          width={20}
          height={20} />
      </UploadDDItem>
      <UploadDDItem
        text='Reels'>
        <IcCreateReels
          width={20}
          height={20} />
      </UploadDDItem>
      <UploadDDItem
        text='Livestream'>
        <IcCreateLiveVideos
          width={20}
          height={20} />
      </UploadDDItem>
    </DropDownMenu>
  )
};

export default UploadDropDown;