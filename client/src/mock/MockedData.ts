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
    _id: '628516b505524527385df73c',
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
  {
    _id: '628516d105524527385df73f',
    title: 'FrontEnd Progress Post the Post',
    description: 'New Post 2 asdsad as asdihasd description',
    project: {
      process: 20,
      _id: '62d454a40e8927017f86a454',
      title: 'Dev-Dairy',
    },
    status: 'In-Process',
    roadMap: '6285168e05524527385df734',
    user: '62812edf18f5ba45b7667f2e',
    date: '2022-02-18T15:54:57.604Z',
    __v: 0,
  },
  {
    _id: '6285e63bb2870148f0b43c0b',
    title: 'New Post',
    description: 'New Post 3 asdsad as asdihasd description',
    project: {
      process: 20,
      _id: '62d454a40e8927017f86a454',
      title: 'Dev-Dairy',
    },
    status: 'In-Process',
    roadMap: '6285168e05524527385df734',
    user: '62812edf18f5ba45b7667f2e',
    date: '2022-05-19T06:39:55.948Z',
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
    technologies: ['React', 'Node.js', 'Monogo', 'Express'],
    process: 1,
    _id: '62d454a40e8927017f86a454',
    title: 'New sda',
    description: "MERN stack prototype for dev's personal dairy",
    date: '2022-07-17T18:27:48.013Z',
  },
  {
    technologies: ['Diffrent'],
    process: 1,
    _id: '62d458b9bb0be104192d297e',
    title: 'New asdsf',
    description: "MERN stack  for maintaing dev's personal dairy",
    date: '2022-02-17T18:45:13.079Z',
  },
  {
    technologies: ['asd', 'asdas'],
    process: 1,
    _id: '62d458dcbb0be104192d298b',
    title: 'New Projectg',
    description: "MERN stack prototype for maintaing dev's personal dairy",
    date: '2022-03-17T18:45:48.519Z',
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
