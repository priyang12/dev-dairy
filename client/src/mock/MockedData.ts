export const AuthResponse = {
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
  message: 'Project Created Successfully',
};

export const PostsResponse = [
  {
    _id: '628516b505524527385df73c',
    title: 'Second Post the Post',
    description: 'New Post asdsad as asdihasd description',
    project: {
      process: 'in-progress',
      _id: '628515d405524527385df72a',
      title: 'Dev-Dairy',
    },
    status: 'In-Process',
    roadMap: '6285167905524527385df72f',
    user: '62812edf18f5ba45b7667f2e',
    date: '2022-05-18T15:54:29.864Z',
    __v: 0,
  },
  {
    _id: '628516d105524527385df73f',
    title: 'FrontEnd Progress Post the Post',
    description: 'New Post asdsad as asdihasd description',
    project: {
      process: 'in-progress',
      _id: '628515d405524527385df72a',
      title: 'Dev-Dairy',
    },
    status: 'In-Process',
    roadMap: '6285168e05524527385df734',
    user: '62812edf18f5ba45b7667f2e',
    date: '2022-05-18T15:54:57.604Z',
    __v: 0,
  },
  {
    _id: '6285e63bb2870148f0b43c0b',
    title: 'New Post',
    description: 'New Post asdsad as asdihasd description',
    project: {
      process: 'in-progress',
      _id: '628515d405524527385df72a',
      title: 'Dev-Dairy',
    },
    status: 'In-Process',
    roadMap: '6285168e05524527385df734',
    user: '62812edf18f5ba45b7667f2e',
    date: '2022-05-19T06:39:55.948Z',
    __v: 0,
  },
];

export const ProjectsResponse = [
  {
    technologies: ['React', 'Node.js', 'Monogo', 'Express'],
    process: 'in-progress',
    _id: '628515d405524527385df72a',
    title: 'Dev-Dairy',
    description: "MERN stack prototype for maintaing dev's personal dairy",
    user: '62812edf18f5ba45b7667f2e',
    roadMap: [
      {
        color: '#fff',
        progress: 0,
        _id: '6285167905524527385df72f',
        name: 'backend',
      },
      {
        color: '#fff',
        progress: 0,
        _id: '6285168e05524527385df734',
        name: 'frontEnd',
      },
    ],
    date: '2022-05-18T15:50:44.201Z',
    __v: 0,
  },
  {
    technologies: ['React', 'Node.js', 'Monogo', 'Express'],
    process: 'in-progress',
    _id: '628515d405524527385dsdf2a',
    title: 'Dev-Dairy',
    description: "Next stack prototype for maintaing dev's personal dairy",
    user: '62812edf18f5ba45b7667f2e',
    date: '2022-05-18T15:50:44.201Z',
    __v: 0,
  },
];

export default AuthResponse;
