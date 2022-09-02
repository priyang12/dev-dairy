import type { AuthUserResponse } from '../API/interface';

export const AuthResponse: AuthUserResponse = {
  user: {
    _id: '627bcea32b463cb2da6853b7',
    username: 'test',
    email: 'Priyang@gmail.com',
    date: '2022-05-11T14:56:35.637Z',
  },
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjdiY2VhMzJiNDYzY2IyZGE2ODUzYjciLCJleHAiOjE2NTgxMjYxMTYuMjM4LCJpYXQiOjE2NTI5NDIxMTZ9.KWtkAeLVsedOa-D68AJ15j6R_DIVRTHBtNDWZr9sfcc',
};

export const NewPostResponse = {
  result: true,
  message: 'Post Created Successfully',
  post: {
    _id: '628516b50552452738sadf73c',
    title: 'New Created Post the Post',
    description: 'New Post asdsad as asdihasd description',
    project: '628515d405524527385df72a',
    status: 'In-Process',
    roadMap: '6285167905524527385df72f',
    user: '62812edf18f5ba45b7667f2e',
    date: '2022-05-18T15:54:29.864Z',
  },
};

export const PostsResponse = [
  {
    _id: '63120a6bd0b5d60009aec8ec',
    title: 'Fix Timer',
    description: 'Fix Session Timer with date.now() .',
    project: {
      process: 70,
      _id: '629f7af89a22599fb1f22655',
      title: 'Dev dairy',
    },
    status: 'Not Started',
    roadMap: '62a747c7f0ab536463dc8bfb',
    user: '629e4fe71955ed7307c64a90',
    date: '2022-09-02T13:51:39.292Z',
    __v: 0,
  },
  {
    _id: '63112235a7ee7000096a56e2',
    title: 'Finish Backgroud Blog',
    description:
      'Blog about background and gradients for styling the element in part of the CSS series. Done But need to create another blog about gradients.',
    project: {
      process: 10,
      _id: '62ffd9be67ce870010667ea0',
      title: 'Blogs',
    },
    status: 'Done',
    roadMap: '62ffd9be67ce870010667ea4',
    user: '629e4fe71955ed7307c64a90',
    date: '2022-09-01T21:20:53.488Z',
    __v: 0,
  },
  {
    _id: '63112141a7ee7000096a56d8',
    title: 'Alert',
    description: 'Show Alert for operations for any change happens.',
    project: {
      process: 88,
      _id: '629e544058b8f274fe786dd0',
      title: 'Ecommerce',
    },
    status: 'Not Started',
    roadMap: '6310aa726b5e740009ca4fa4',
    user: '629e4fe71955ed7307c64a90',
    date: '2022-09-01T21:16:49.681Z',
    __v: 0,
  },
  {
    _id: '6310f8867612c60009bf4b9b',
    title: 'Timers',
    description: 'Make Timer Better.',
    project: {
      process: 25,
      _id: '62a498033fea6300092ced84',
      title: 'component',
    },
    status: 'Started',
    roadMap: '62a498933fea6300092ced92',
    user: '629e4fe71955ed7307c64a90',
    date: '2022-09-01T18:23:02.918Z',
    __v: 0,
  },
  {
    _id: '630e7c6ef6b35a00090c8cc6',
    title: 'Fix deplotment',
    description:
      'Fix Dev Dairy deployment. Done by removeing agenda route. need to lookg more into agenda.',
    project: {
      process: 70,
      _id: '629f7af89a22599fb1f22655',
      title: 'Dev dairy',
    },
    status: 'Done',
    roadMap: '629f7b869a22599fb1f22666',
    user: '629e4fe71955ed7307c64a90',
    date: '2022-08-30T21:09:02.853Z',
    __v: 0,
  },
  {
    _id: '630c3f875322fb00097ba034',
    title: 'Media Session',
    description:
      'Media Session Api in react. Need to fix Song Image Url currently Blob looks like not working. Add more Controllers.',
    project: {
      process: 70,
      _id: '629f7af89a22599fb1f22655',
      title: 'Dev dairy',
    },
    status: 'Done',
    roadMap: '62a747c7f0ab536463dc8bfb',
    user: '629e4fe71955ed7307c64a90',
    date: '2022-08-29T04:24:39.570Z',
    __v: 0,
  },
  {
    _id: '630beb7cfc57d4000997d36d',
    title: 'React Music',
    description:
      'Add Seek fn to fast forward songs and removed controller if there is no song in playlist',
    project: {
      process: 70,
      _id: '629f7af89a22599fb1f22655',
      title: 'Dev dairy',
    },
    status: 'Done',
    roadMap: '62a747c7f0ab536463dc8bfb',
    user: '629e4fe71955ed7307c64a90',
    date: '2022-08-28T22:26:04.629Z',
    __v: 0,
  },
  {
    _id: '630bdbdc189f8f0009c86822',
    title: 'Youtube Player',
    description: 'Create Youtube Playlist and Player.',
    project: {
      process: 70,
      _id: '629f7af89a22599fb1f22655',
      title: 'Dev dairy',
    },
    status: 'Done',
    roadMap: '62a747c7f0ab536463dc8bfb',
    user: '629e4fe71955ed7307c64a90',
    date: '2022-08-28T21:19:24.519Z',
    __v: 0,
  },
  {
    _id: '630bce8ded538c0009e5a888',
    title: 'css Position',
    description:
      'Blog about element positions. Blog is done.CodePen Link: https://codepen.io/Wolfie12/pen/dymExKo?editors=1100',
    project: {
      process: 10,
      _id: '62ffd9be67ce870010667ea0',
      title: 'Blogs',
    },
    status: 'Done',
    roadMap: '62ffd9be67ce870010667ea4',
    user: '629e4fe71955ed7307c64a90',
    date: '2022-08-28T20:22:37.347Z',
    __v: 0,
  },
  {
    _id: '630bca9f3287ac0009c1b390',
    title: 'Create Project',
    description:
      'Make New Project add Tech more accessible and better. and remove text value input.',
    project: {
      process: 70,
      _id: '629f7af89a22599fb1f22655',
      title: 'Dev dairy',
    },
    status: 'Done',
    roadMap: '62a747c7f0ab536463dc8bfb',
    user: '629e4fe71955ed7307c64a90',
    date: '2022-08-28T20:05:51.597Z',
    __v: 0,
  },
];

export const Page2PostsResponse = [
  {
    _id: '628516b505524527385f7e3c',
    title: 'Second Post the Post',
    description: 'New Post as asdihasd description',
    project: {
      process: 50,

      _id: '62d454a40e8927017f86a454',
      title: 'Dev-Dairy',
    },
    status: 'Done',
    roadMap: '6285167905524527385df72f',
    user: '62812edf18f5ba45b7667f2e',
    date: '2022-03-18T15:54:29.864Z',
    __v: 0,
  },
];

export const NewProjectResponse = {
  result: true,
  message: 'Project Created Successfully',
  project: {
    technologies: ['React', 'Node.js', 'Monogo', 'Express'],
    process: 20,
    _id: '128515d405524527385df72a',
    title: 'New Project',
    description: "MERN stack prototype for dev's personal dairy",
    user: '62812edf18f5ba45b7667f2e',
    date: '2022-05-19T15:50:44.201Z',
    __v: 0,
  },
};

export const ProjectsResponse = [
  {
    technologies: ['react', 'node.js', 'express.js'],
    process: 88,
    _id: '629e544058b8f274fe786dd0',
    title: 'Ecommerce',
    description: 'Ecommcer Web App with MERN stack',
    github: '',
    live: true,
    website: '',
    user: '629e4fe71955ed7307c64a90',
    roadMap: [
      {
        color: '#ff0000',
        progress: 100,
        _id: '629e555f58b8f274fe786dde',
        name: 'Frontend',
      },
      {
        color: '#43ff0f',
        progress: 100,
        _id: '62a0be5dc2312a0009d64f25',
        name: 'Backend',
      },
      {
        color: '#1b2ebb',
        progress: 92,
        _id: '62bf7945d00c830009e1f109',
        name: 'Testing',
      },
      {
        color: '#000000',
        progress: 100,
        _id: '62c81ff6878f5f000a8d65ca',
        name: 'System',
      },
      {
        color: '#ffd500',
        progress: 0,
        _id: '6310aa726b5e740009ca4fa4',
        name: 'Admin',
      },
    ],
    date: '2022-06-06T19:23:44.637Z',
  },
  {
    technologies: ['node.js'],
    process: 70,
    _id: '629f7af89a22599fb1f22655',
    title: 'Dev dairy',
    description: 'Dev dairy to keep track of progress',
    github: '',
    live: false,
    website: '',
    user: '629e4fe71955ed7307c64a90',
    roadMap: [
      {
        color: '#0033ff',
        progress: 61,
        _id: '62a747c7f0ab536463dc8bfb',
        name: 'FrontEnd',
      },
      {
        color: '#4caf50',
        progress: 0,
        _id: '62a7a6b48e0cbf6bc430120e',
        name: 'Backend',
      },
      {
        color: '#333',
        progress: 0,
        _id: '629f7b869a22599fb1f22666',
        name: 'Deployment',
      },
    ],
    date: '2022-06-07T16:21:12.434Z',
  },
  {
    technologies: ['react', 'storybook', 'scss'],
    process: 25,
    _id: '62a498033fea6300092ced84',
    title: 'component',
    description: 'component lib using storybook react scss.',
    github: '',
    live: false,
    website: '',
    user: '629e4fe71955ed7307c64a90',
    roadMap: [
      {
        color: '#28276d',
        progress: 0,
        _id: '62a4988d3fea6300092ced8f',
        name: 'module',
      },
      {
        color: '#000000',
        progress: 0,
        _id: '62a498933fea6300092ced92',
        name: 'Atoms',
      },
      {
        color: '#ff1414',
        progress: 0,
        _id: '62a498f625898300090adc95',
        name: 'sad',
      },
      {
        color: '#6d2eff',
        progress: 0,
        _id: '62b0b68ba28a0d0009d00469',
        name: 'System',
      },
    ],
    date: '2022-06-11T13:26:27.484Z',
  },
  {
    technologies: ['React', 'Remix'],
    process: 22,
    _id: '62f8f57b103f32001092b4d2',
    title: 'Portfolio',
    description: 'A portfolio website with SSR using remix. ',
    github: '',
    live: false,
    website: '',
    roadMap: [
      {
        color: '#293d6b',
        progress: 0,
        _id: '62f8f57b103f32001092b4d3',
        name: 'FrontEnd',
      },
      {
        color: '#1abc9c',
        progress: 0,
        _id: '62f8f57b103f32001092b4d4',
        name: 'CMS',
      },
    ],
    user: '629e4fe71955ed7307c64a90',
    date: '2022-08-14T13:15:39.278Z',
  },
  {
    technologies: ['Obsidian'],
    process: 10,
    _id: '62ffd9be67ce870010667ea0',
    title: 'Blogs',
    description: 'Project about Creating Blogs',
    github: '',
    live: false,
    website: '',
    roadMap: [
      {
        color: '#3884ff',
        progress: 0,
        _id: '62ffd9be67ce870010667ea1',
        name: 'Three.js',
      },
      {
        color: '#14fbff',
        progress: 0,
        _id: '62ffd9be67ce870010667ea2',
        name: 'React',
      },
      {
        color: '#000000',
        progress: 0,
        _id: '62ffd9be67ce870010667ea3',
        name: 'Git',
      },
      {
        color: '#5062f2',
        progress: 0,
        _id: '62ffd9be67ce870010667ea4',
        name: 'Css',
      },
    ],
    user: '629e4fe71955ed7307c64a90',
    date: '2022-08-19T18:43:10.491Z',
  },
  {
    technologies: ['Three.js', 'React'],
    process: 5,
    _id: '630bcc3716d757000945603a',
    title: 'Three js',
    description: 'Leraning and Building projects in Three.js',
    github: '',
    live: false,
    website: '',
    roadMap: [
      {
        color: '#0b18cb',
        progress: 0,
        _id: '630bcc3716d757000945603b',
        name: 'Documention',
      },
      {
        color: '#0b92cb',
        progress: 0,
        _id: '630bcc3716d757000945603c',
        name: 'SubOptimal',
      },
    ],
    user: '629e4fe71955ed7307c64a90',
    date: '2022-08-28T20:12:39.742Z',
  },
];

export const SingleProjectResponse = {
  technologies: ['React', 'Node.js'],
  process: 40,
  github: 'https://github.com/',
  _id: '628515d405524527385dsdf2a',
  title: 'New Project',
  description: 'Des for Project',
  user: '627bcea32b463cb2da6853b7',
  roadMap: [
    {
      color: '#139f57',
      progress: 20,
      _id: '627fa6043f711612ba80bd7d',
      name: 'backend',
    },
    {
      // Random Color
      color: '#131a9f',
      progress: 40,
      _id: '627fa6043sd711612ba80bd7d',
      name: 'Frontend',
    },
    {
      color: '#2e1747',
      progress: 80,
      _id: '627fas6043f711612ba80bd7d',
      name: 'CI/CD',
    },
  ],
  date: '2022-05-14T12:31:18.431Z',
  live: true,
  website: 'https://www.google.com',
};

export const MockedRoadMap = [
  {
    color: '#139f57',
    progress: 20,
    _id: '627fa6043f711612ba80bd7d',
    name: 'backend',
  },
  {
    // Random Color
    color: '#131a9f',
    progress: 40,
    _id: '627fa6043sd711612ba80bd7d',
    name: 'Frontend',
  },
];

export const MockedRoadMapResponse = {
  result: true,
  message: 'RoadMap Created Successfully',
  roadmap: {
    color: '#2e1747',
    progress: 80,
    _id: '627fas6043f711612ba80bd7d',
    name: 'New RoadMap',
  },
};

export const MockedAllWorkSessions = [
  {
    _id: '62d8186d61a71c7c2abe4075',
    Time: 0,
    user: '62d4548c0e8927017f86a450',
    project: {
      _id: '62d458dcbb0be104192d298b',
      process: 1,
      title: 'New Project 1',
      description: " stack prototype for maintaing dev's personal dairy 1",
    },
    session: [
      {
        Time: 5000,
        _id: '62d814b6fced6d7b83652db1',
        updatedAt: '2022-07-20T14:44:06.009Z',
        createdAt: '2022-07-20T14:44:06.009Z',
      },
      {
        Time: 5000,
        _id: '62d814c3fced6d7b83652db4',
        updatedAt: '2022-07-20T14:44:19.750Z',
        createdAt: '2022-07-20T14:44:19.750Z',
      },
    ],
    date: '2022-07-20T14:59:57.319Z',
    __v: 0,
  },
  {
    _id: '62d98918010440a82de1780f',
    Time: 0,
    user: '62d4548c0e8927017f86a450',
    project: {
      _id: '62d454a40e8927017f86a454',
      process: 1,
      title: 'New Project 2',
      description: "MERN stack prototype for maintaing dev's personal dairy 2",
    },
    session: [],
    date: '2022-07-21T17:12:56.809Z',
    __v: 0,
  },
];

export const MockedCreateWorkSession = {
  Time: 0,
  _id: '62d8186d61a71c7c2abe4075',
  user: '62d4548c0e8927017f86a450',
  project: '62d458dcbb0be104192d298b',
  session: [],
  date: '2022-07-20T14:59:57.319Z',
  __v: 0,
};

export const MockedProjectWorkSessions = {
  _id: '62d8186d61a71c7c2abe4075',
  Time: 0,
  user: '62d4548c0e8927017f86a450',
  project: '62d458dcbb0be104192d298b',
  session: [
    {
      Time: 7500,
      _id: '62d818ae61a71c7c2abe4088',
      updatedAt: '2022-07-20T15:01:02.791Z',
      createdAt: '2022-07-22T15:01:02.791Z',
    },
    {
      Time: 5000,
      _id: '62d818b161a71c7c2abe408b',
      updatedAt: '2022-08-20T15:01:05.627Z',
      createdAt: '2022-08-20T15:01:05.627Z',
    },
  ],
  date: '2022-07-20T14:59:57.319Z',
  __v: 0,
};

export const MockPushWorkSession = {
  _id: '62d8186d61a71c7c2abe4075',
  session: [
    {
      Time: 5000,
      _id: '62d818ae61a71c7c2abe4088',
      updatedAt: '2022-07-20T15:01:02.791Z',
      createdAt: '2022-07-20T15:01:02.791Z',
    },
    {
      Time: 5000,
      _id: '62d818b161a71c7c2abe408b',
      updatedAt: '2022-08-20T15:01:05.627Z',
      createdAt: '2022-08-20T15:01:05.627Z',
    },
    {
      Time: 545000,
      _id: '626818b161a71c7c2abe408b',
      updatedAt: '2022-09-20T15:01:05.627Z',
      createdAt: '2022-09-20T15:01:05.627Z',
    },
  ],
};

export const MockPullWorkSession = {
  _id: '62d8186d61a71c7c2abe4075',
  session: [],
};
