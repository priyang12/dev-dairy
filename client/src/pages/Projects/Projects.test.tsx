import { rest } from 'msw';
import { createMemoryHistory } from 'history';
import { format, parseISO } from 'date-fns';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { render, screen, waitForElementToBeRemoved } from '../../test-utils';
import { ProjectsResponse } from '../../mock/MockedData';
import Projects from './Projects';
import server from '../../mock/server';

import API from '../../API';

const history = createMemoryHistory();
const setup = (): any => {
  history.push = jest.fn();

  render(
    <Router location={history.location} navigator={history}>
      <Projects />
    </Router>,
  );
};

it('render Projects', async () => {
  setup();
  expect(screen.getByAltText('loading...')).toBeInTheDocument();
  await waitForElementToBeRemoved(screen.getByAltText('loading...'));
  expect(
    screen.getByText(`Total Projects ${ProjectsResponse.length}`),
  ).toBeInTheDocument();
  ProjectsResponse.forEach((project) => {
    expect(screen.getByText(project.title)).toBeInTheDocument();
    expect(
      screen.getByText(format(parseISO(project.date), "yyyy-MM-dd'T'HH:mm")),
    ).toBeInTheDocument();
    project.technologies.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });

    expect(
      screen.getByTestId(`progress-bar-${project._id}`).firstChild,
    ).toHaveStyle({
      width: `${project.process}%`,
    });
  });
});
it('render Projects with no projects', async () => {
  server.use(
    // Projects
    rest.get(`${API}/projects`, (req, res, ctx) => res(ctx.json([]))),
  );
  setup();
  await waitForElementToBeRemoved(screen.getByAltText('loading...'));
  expect(screen.getByText('No Projects')).toBeInTheDocument();
});

it('Redirect On Single Project Page', async () => {
  setup();
  await waitForElementToBeRemoved(screen.getByAltText('loading...'));
  const NextPage = screen.getAllByRole('link', {
    name: 'More',
  });
  userEvent.click(NextPage[0]);
  expect(history.push).toHaveBeenCalledWith(
    {
      hash: '',
      pathname: `/Projects/${ProjectsResponse[0]._id}`,
      search: '',
    },
    undefined,
  );
});
