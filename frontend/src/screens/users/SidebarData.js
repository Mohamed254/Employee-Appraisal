import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/user/Navbar',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Appraisal',
    path: '/RegisteredAppraisal',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
 
 
  {
    title: 'Feedback',
    path: '/Feedback',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  
];
