import { HttpResponse, http as rest } from 'msw';
import API from '../API';
import { SeedHandler } from './Handlers/SeedHandler';
import { MockedSharedProject } from './Handlers/SharedProjectHandler';
import { WorkSessions } from './Handlers/WorkSessionHandler';
import {
  AuthResponse,
  MockedRoadMap,
  MockedRoadMapResponse,
  NewPostResponse,
  NewProjectResponse,
  PostsResponse,
  ProjectsResponse,
  SingleProjectResponse,
  Page2PostsResponse,
} from './MockedData';

const handlers = [
  rest.post(`${API}/login`, ({}) => HttpResponse.json(AuthResponse)),

  rest.post(`${API}/register`, () =>
    HttpResponse.json(
      {},
      // AuthResponse
      { status: 401 },
    ),
  ),

  rest.post(`${API}/reset`, () =>
    HttpResponse.json({ message: 'Token is Send' }),
  ),

  rest.get(`${API}/user/me`, () => HttpResponse.json(AuthResponse.user)),

  // Posts
  rest.get(`${API}/posts`, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    const status = url.searchParams.get('status');
    const title = url.searchParams.get('title');
    const project = url.searchParams.get('project');

    if (page === '1' || !page) {
      return HttpResponse.json(PostsResponse, { status: 201 });
    }

    if (status || title || project) {
      const FilteredPosts = PostsResponse.filter(
        (post) =>
          (status && post.status === status) ||
          (title && post.title.includes(title)) ||
          (project && post.project._id === project),
      );
      return HttpResponse.json(FilteredPosts);
    }

    return HttpResponse.json(Page2PostsResponse, { status: 201 });
  }),

  rest.post(`${API}/posts`, () => HttpResponse.json(NewPostResponse)),

  rest.get(`${API}/posts/:id`, () => HttpResponse.json(PostsResponse[0])),

  rest.put(`${API}/posts/:id`, () =>
    HttpResponse.json({
      result: true,
      message: 'Post Updated Successfully',
    }),
  ),

  rest.delete(`${API}/posts/:id`, () =>
    HttpResponse.json({
      result: true,
      message: 'Post Deleted Successfully',
    }),
  ),

  rest.get(`${API}/projects`, () => HttpResponse.json(ProjectsResponse)),

  rest.get(`${API}/projects/:id`, () =>
    HttpResponse.json(SingleProjectResponse),
  ),

  rest.post(`${API}/projects`, () => HttpResponse.json(NewProjectResponse)),

  rest.put(`${API}/projects/:id`, () =>
    HttpResponse.json({
      result: true,
      message: 'Project Updated Successfully',
    }),
  ),

  rest.delete(`${API}/projects/:id`, () =>
    HttpResponse.json({
      result: true,
      message: 'Project Deleted Successfully',
    }),
  ),

  rest.get(`${API}/projects/:id/roadMap`, () =>
    HttpResponse.json(MockedRoadMap),
  ),

  rest.put(`${API}/projects/:id/roadMap`, () =>
    HttpResponse.json(MockedRoadMapResponse),
  ),

  rest.patch(`${API}/projects/:id/roadMap`, () =>
    HttpResponse.json({
      result: true,
      message: 'RoadMap Updated',
    }),
  ),

  rest.delete(`${API}/projects/:id/roadMap`, () =>
    HttpResponse.json({
      result: true,
      message: 'Roadmap from New Project is deleted',
    }),
  ),

  // Add modular handlers
  ...WorkSessions,
  ...MockedSharedProject,
  ...SeedHandler,
];

export default handlers;
