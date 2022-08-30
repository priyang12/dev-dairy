import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { MockedAllWorkSessions } from '../../mock/MockedData';
import { render, screen, waitForElementToBeRemoved } from '../../test-utils';
import WorkSessions from './WorkSessions';

const StepUp = async () => {
  render(
    <BrowserRouter>
      <WorkSessions />
    </BrowserRouter>,
  );
  await waitForElementToBeRemoved(() => screen.getByAltText(/loading/));
  expect(screen.getByText('Work Sessions')).toBeInTheDocument();
  const DeleteAll = screen.getByRole('button', {
    name: 'Delete All Work Session',
  });
  return { DeleteAll };
};

it('Render WorkSessions', async () => {
  await StepUp();
  MockedAllWorkSessions.forEach((session) => {
    expect(screen.getByText(session.project.title)).toBeInTheDocument();
  });
});

it('Delete All WorkSessions', async () => {
  const { DeleteAll } = await StepUp();
  userEvent.click(DeleteAll);
  expect(
    screen.getByText(/Are you sure you want to delete/),
  ).toBeInTheDocument();
  const Confirm = screen.getByPlaceholderText('Type Sure');
  const ConfirmButton = screen.getByRole('button', {
    name: 'Delete',
  });
  userEvent.type(Confirm, 'Sure');
  userEvent.click(ConfirmButton);
});
