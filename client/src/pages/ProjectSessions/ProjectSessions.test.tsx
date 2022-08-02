import { render, screen, waitForElementToBeRemoved } from '../../test-utils';
import { BrowserRouter } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import ProjectSessions from './ProjectSessions';
import {
  MockedProjectWorkSessions,
  SingleProjectResponse,
} from '../../mock/MockedData';
import { toDaysMinutesSeconds } from '../../utils/SecondsToFormate';

const SetUp = async () => {
  render(
    <BrowserRouter>
      <ProjectSessions />
    </BrowserRouter>,
  );
  await waitForElementToBeRemoved(() => screen.getByAltText(/loading/));
  expect(
    screen.getByText(`${SingleProjectResponse.title} 's`),
  ).toBeInTheDocument();
  const DeleteAll = screen.getByRole('button', {
    name: 'Delete All Work Session',
  });
  return { DeleteAll };
};

it('should render without crashing', async () => {
  await SetUp();
  expect(screen.getByText(MockedProjectWorkSessions.Time)).toBeInTheDocument();
  expect(
    screen.getByText(MockedProjectWorkSessions.session.length),
  ).toBeInTheDocument();
  MockedProjectWorkSessions.session.forEach((session) => {
    const Time = toDaysMinutesSeconds(session.Time, 'hh:mm:ss');
    expect(screen.getByText(JSON.stringify(Time))).toBeInTheDocument();
    expect(
      screen.getByText(format(parseISO(session.createdAt), 'yyyy-MM-dd')),
    ).toBeInTheDocument();
  });
});

it('should render Delete All Work Sessions', async () => {
  const { DeleteAll } = await SetUp();

  userEvent.click(DeleteAll);

  await waitForElementToBeRemoved(() => screen.getByText(/Deleting Session/));

  expect(screen.getByText(/Session Deleted/)).toBeInTheDocument();
});
