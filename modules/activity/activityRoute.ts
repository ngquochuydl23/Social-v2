import {
  IcCheckInTabActive, 
  IcCheckInTabInactive,
  IcMediasTabActive, 
  IcMediasTabInactive,
  IcSavedTabActive, 
  IcSavedTabInactive, 
  IcStoriesTabActive, 
  IcStoriesTabInactive,
  IcInteractionTabActive,
  IcInteractionTabInactive
} from "@assets/icons";

const activityRoute = [
  {
    path: '/activity/interaction',
    title: 'Interaction',
    activeIcon: IcInteractionTabActive,
    inactiveIcon: IcInteractionTabInactive
  },
  {
    path: '/activity/saved',
    title: 'Saved',
    activeIcon: IcSavedTabActive,
    inactiveIcon: IcSavedTabInactive
  },
  {
    path: '/activity/medias',
    title: 'Medias',
    activeIcon: IcMediasTabActive,
    inactiveIcon: IcMediasTabInactive
  },
  {
    path: '/activity/stories',
    title: 'Stories',
    activeIcon: IcStoriesTabActive,
    inactiveIcon: IcStoriesTabInactive
  },
  {
    path: '/activity/check-in',
    title: 'Check-in',
    activeIcon: IcCheckInTabActive,
    inactiveIcon: IcCheckInTabInactive
  }
]

export default activityRoute;