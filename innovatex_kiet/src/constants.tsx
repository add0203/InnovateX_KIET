import { Icon } from '@iconify/react';
import { useRouter } from 'next/router'; 
import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Feeds',
    path: '/user/feeds',
    icon: <Icon icon="lucide:home" width="24" height="24" />,

    isBottom: false,

  },
  {
    title: 'Profile',
// <<<<<<< HEAD
    path: '/users/profile',
// =======
//     path: '/user/profile',
// >>>>>>> amit_fork/Amit_Contributes
    icon: <Icon icon="lucide:user" width="24" height="24" />,
    isBottom: false,
  },
  {
    title: 'Messages',
    path: '/user/messages',
    icon: <Icon icon="lucide:mail" width="24" height="24" />,

    isBottom: false,

  },
  {
    title: 'Notification',
    path: '/user/notification',

    icon: <Icon icon="lucide:bell" width="24" height="24" />,
    isBottom: false,
  },  

  {
    title: 'Settings',
    path: '/user/settings',
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [

      { title: 'Account', path: '/settings/account', isBottom: true},
      { title: 'Privacy', path: '/settings/privacy' ,isBottom: true},
    ],
    isBottom: true,

  },
  {
    title: 'About',
    path: '/user/about',

    icon: <Icon icon="lucide:info" width="24" height="24" />,
    isBottom: true,
  },

  // {
  //   title: 'Logout',
  //   path: '/users/login',
  //   icon: <Icon icon="lucide:log-out" width="24" height="24" />,
  //   isBottom: true,
  // }

   {
    title: 'Logout',
// <<<<<<< HEAD
    // Set path as null or remove it since we will handle the logout separately
    path: "/users/logout",
// =======
//     path: '/user/logout',
// >>>>>>> amit_fork/Amit_Contributes
    icon: <Icon icon="lucide:log-out" width="24" height="24" />,
    isBottom: true,
    
  },
];

