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
      _id: '628515d405524527385df72a',
      title: 'Dev-Dairy',
    },
    status: 'Done',
    roadMap: '6285167905524527385df72f',
    user: '62812edf18f5ba45b7667f2e',
    date: '2022-05-18T15:54:29.864Z',
    __v: 0,
  },
  {
    _id: '628516d105524527385df73f',
    title: 'FrontEnd Progress Post the Post',
    description: 'New Post 2 asdsad as asdihasd description',
    project: {
      process: 20,
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
    description: 'New Post 3 asdsad as asdihasd description',
    project: {
      process: 20,
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
    process: 20,
    _id: '628515d405524527385df72a',
    title: 'Dev-Dairy 2',
    description: "MERN stack prototype for dev's personal dairy",
    user: '62812edf18f5ba45b7667f2e',
    date: '2022-05-19T15:50:44.201Z',
    __v: 0,
  },
  {
    technologies: ['Next.js', 'Tailwind'],
    process: 50,
    _id: '628515d405524527385dsdf2a',
    title: 'Dev-Dairy',
    description: "Next stack prototype for maintaing dev's personal dairy",
    user: '62812edf18f5ba45b7667f2e',
    date: '2022-05-18T15:50:44.201Z',
    __v: 0,
  },
];

export const SingleProjectResponse = {
  technologies: [
    'React',
    'Node.js',
    'React',
    'Node.js',
    'React',
    'Node.js',
    'React',
    'Node.js',
    'React',
    'Node.js',
    'React',
    'Node.js',
  ],
  process: 40,
  github: 'https://github.com/',
  _id: '628515d405524527385dsdf2a',
  title: 'New Project',
  description: 'Des for Project',
  user: '627bcea32b463cb2da6853b7',
  roadMap: [
    {
      color: '#ffc107',
      progress: 20,
      _id: '627fa6043f711612ba80bd7d',
      name: 'backend',
    },
    {
      // Random Color
      color: '#cec0e0',
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
};

export default AuthResponse;
