import React from 'react';

import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarDataTwo = [
  {
    title: 'Home',
    path: '/admin/Navbar',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Appraisals',
    path: '/Appraisals',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  
  {
    title: 'Manage Employee',
    path: '/Employee',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },

  {
    title: 'Report',
    path: '/Report',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  }
 
 
];
