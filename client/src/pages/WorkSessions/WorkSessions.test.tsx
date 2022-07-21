import userEvent from '@testing-library/user-event';
import { MockedAllWorkSessions } from '../../mock/MockedData';
import { render, screen, waitForElementToBeRemoved } from '../../test-utils';
import WorkSessions from './WorkSessions';

const StepUp = () => render(<WorkSessions />);

it('Render WorkSessions', async () => {
  StepUp();
  await waitForElementToBeRemoved(() => screen.getByAltText('loading...'));
  expect(screen.getByText('Work Sessions')).toBeInTheDocument();
  MockedAllWorkSessions.forEach((session) => {
    expect(screen.getByText(session.project.title)).toBeInTheDocument();
    expect(screen.getByText(session.project.description)).toBeInTheDocument();
  });
});

it('Delete All WorkSessions', async () => {
  StepUp();
  await waitForElementToBeRemoved(() => screen.getByAltText('loading...'));
  userEvent.click(screen.getByText('Delete All Sessions'));

  expect(
    screen.getByText('Are you sure you want to delete all sessions?'),
  ).toBeInTheDocument();
  expect(
    screen.queryByText('Are you sure you want to delete all sessions?'),
  ).not.toBeInTheDocument();
  userEvent.click(screen.getByText('Delete'));

  await waitForElementToBeRemoved(() => screen.getByText(/Deleting/));

  expect(screen.findByText('No WorkSessions')).toBeInTheDocument();
});
