import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router, Routes, Route } from 'react-router-dom';
import { render, screen, waitForElementToBeRemoved } from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import RoadMap from './RoadMap';
import { MockedRoadMap } from '../../mock/MockedData';

const route = '/EditProject/132';
const History = createMemoryHistory({ initialEntries: [route] });

const setup = () =>
  render(
    <Router location={route} navigator={History}>
      <Routes>
        <Route path="/EditProject/:id" element={<RoadMap />} />
      </Routes>
    </Router>,
  );

it('should render without crashing', async () => {
  setup();
  await waitForElementToBeRemoved(screen.getByAltText(/loading/));
  expect(screen.getByText(/Road Maps/)).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'Add New RoadMap' }));

  const RoadMapName = screen.getByLabelText('RoadMap Name');
  // Empty RoadMapName
  userEvent.type(RoadMapName, '');

  const SubmitRoadmap = screen.getByRole('button', {
    name: 'Submit RoadMap',
  });
  userEvent.click(SubmitRoadmap);

  expect(screen.getByText(/Please enter a RoadMap name/)).toBeInTheDocument();

  userEvent.type(RoadMapName, 'Test RoadMap');

  userEvent.click(SubmitRoadmap);

  await waitForElementToBeRemoved(screen.getByText('Adding RoadMap'));

  // Add Alert
});

it('Delete RoadMap', async () => {
  setup();
  await waitForElementToBeRemoved(screen.getByAltText(/loading/));
  expect(screen.getByText(/Road Maps/)).toBeInTheDocument();

  userEvent.click(screen.getByText(MockedRoadMap[0].name.toUpperCase()));

  const RoadMapDelete = screen.getByRole('button', {
    name: `Delete ${MockedRoadMap[0].name}`,
  });

  userEvent.click(RoadMapDelete);

  expect(
    screen.queryByText(MockedRoadMap[0].name.toUpperCase()),
  ).not.toBeInTheDocument();

  // Add Alert
});

it('Edit RoadMap', async () => {
  setup();
  await waitForElementToBeRemoved(screen.getByAltText(/loading/));
  expect(screen.getByText(/Road Maps/)).toBeInTheDocument();

  userEvent.click(screen.getByText(MockedRoadMap[0].name.toUpperCase()));

  const RoadMapEdit = screen.getByRole('button', {
    name: `Edit ${MockedRoadMap[0].name}`,
  });

  userEvent.click(RoadMapEdit);

  expect(screen.getByText(/Edit RoadMap/)).toBeInTheDocument();

  const RoadMapName = screen.getByDisplayValue(MockedRoadMap[0].name);
  const Process = screen.getByTestId('Process-Id');
  const UpdateRoadMap = screen.getByRole('button', {
    name: 'Update RoadMap',
  });

  const NewValue = {
    name: 'Updated RoadMap',
    progress: '50',
  };
  userEvent.clear(RoadMapName);

  // Empty RoadMapName

  userEvent.click(UpdateRoadMap);
  expect(screen.getByText(/Please enter a RoadMap name/)).toBeInTheDocument();

  userEvent.type(RoadMapName, NewValue.name);
  userEvent.click(Process);

  // userEvent.(Process, NewValue.progress);
  userEvent.click(UpdateRoadMap);

  await waitForElementToBeRemoved(screen.getByText('Updating RoadMap'), {
    timeout: 2000,
  });

  expect(screen.getByText(NewValue.name.toUpperCase())).toBeInTheDocument();

  // Add Alert
});
