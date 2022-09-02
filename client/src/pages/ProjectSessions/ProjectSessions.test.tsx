import { Route, Router, Routes } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import userEvent from '@testing-library/user-event';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import ProjectSessions from './ProjectSessions';
import { toDaysMinutesSeconds } from '../../utils/SecondsToFormate';
import { createMemoryHistory } from 'history';
import {
  MockedProjectWorkSessions,
  SingleProjectResponse,
} from '../../mock/MockedData';

const route = `/Project/Sessions/${SingleProjectResponse._id}`;
const History = createMemoryHistory({ initialEntries: [route] });
const SetUp = async () => {
  render(
    <Router navigator={History} location={route}>
      <Routes>
        <Route path="/Project/Sessions/:id" element={<ProjectSessions />} />
      </Routes>
    </Router>,
  );

  await waitForElementToBeRemoved(() => screen.getByAltText(/loading/));
  expect(screen.getByText(SingleProjectResponse.title)).toBeInTheDocument();
};

it('should render without crashing', async () => {
  await SetUp();
  expect(screen.getByText(MockedProjectWorkSessions.Time)).toBeInTheDocument();
  MockedProjectWorkSessions.session.forEach((session) => {
    const Time = toDaysMinutesSeconds(session.Time, 'hh:mm:ss');
    expect(screen.getByText(Time.toString())).toBeInTheDocument();
    expect(
      screen.getByText(format(parseISO(session.createdAt), 'yyyy-MM-dd')),
    ).toBeInTheDocument();
  });
});

it('should render Delete All Work Sessions', async () => {
  await SetUp();

  userEvent.click(screen.getByTestId('delete-all-sessions'));

  await waitFor(() => {
    expect(screen.getByText(/Deleting Session/i)).toBeInTheDocument();
  });
  expect(
    screen.getByText(/Please wait while we delete all sessions/i),
  ).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText(/Session Deleted/i)).toBeInTheDocument();
  });
});

it('Delete Selected Work Sessions', async () => {
  await SetUp();

  const DeleteBtn = screen.getByText('Delete Session');

  userEvent.click(DeleteBtn);

  userEvent.click(screen.getByText('Cancel Delete'));

  expect(screen.queryByText('Cancel Delete')).not.toBeInTheDocument();

  userEvent.click(DeleteBtn);

  const SelectSession1 = screen.getByLabelText(
    `DeleteButton-${MockedProjectWorkSessions.session[0]._id}`,
  );
  const SelectSession2 = screen.getByLabelText(
    `DeleteButton-${MockedProjectWorkSessions.session[1]._id}`,
  );

  // Select Session 1 and 2
  userEvent.click(SelectSession1);
  userEvent.click(SelectSession2);

  // remove from set
  userEvent.click(
    screen.getByLabelText(
      `RemoveDeleteButton-${MockedProjectWorkSessions.session[0]._id}`,
    ),
  );

  const DeleteSelectedBtn = screen.getByText('Delete Selected Sessions');

  userEvent.click(DeleteSelectedBtn);

  // alerts

  await waitFor(() => {
    expect(screen.getByText(/Deleting Sessions/i)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText(/Sessions Removed/i)).toBeInTheDocument();
  });
});

it('Start a New Session', async () => {
  await SetUp();

  userEvent.click(screen.getByText('Start Session'));
  await waitFor(() => {
    expect(
      screen.getByText(
        `WorkSession For ${SingleProjectResponse?.title} is Loaded`,
      ),
    ).toBeInTheDocument();
  });
  userEvent.click(screen.getByText('Start Session'));

  await waitFor(() => {
    expect(
      screen.getByText(/You are already in a session/i),
    ).toBeInTheDocument();
  });
});
