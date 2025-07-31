import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router, Routes, Route } from 'react-router-dom';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import RoadMap from './RoadMap';
import { MockedRoadMap } from '../../mock/MockedData';
import server from '../../mock/server';
import { HttpResponse, http as rest } from 'msw';
import API from '../../API';

const ProjectId = '132';

const route = `/RoadMap/${ProjectId}`;
const History = createMemoryHistory({ initialEntries: [route] });

const Render = () =>
  render(
    <Router location={route} navigator={History}>
      <Routes>
        <Route path="/RoadMap/:id" element={<RoadMap />} />
      </Routes>
    </Router>,
  );

const setup = async () => {
  Render();
  await waitForElementToBeRemoved(screen.getByAltText(/loading/));
  expect(screen.getByText(/Road Maps/)).toBeInTheDocument();
  const AddRoadMap = screen.getByRole('button', { name: 'Add New RoadMap' });

  await userEvent.click(AddRoadMap);

  const CloseModelButton = screen.getByTestId('CloseModelButton');

  const RoadMapName = screen.getByLabelText('RoadMap Name');
  const SubmitRoadMap = screen.getByRole('button', {
    name: 'Submit RoadMap',
  });

  await userEvent.click(CloseModelButton);

  return {
    AddRoadMap,
    RoadMapName,
    SubmitRoadMap,
  };
};

it('should render without crashing and create roadMap', async () => {
  const { AddRoadMap, RoadMapName, SubmitRoadMap } = await setup();

  await userEvent.click(AddRoadMap);

  // Empty RoadMapName
  await userEvent.clear(RoadMapName);

  await userEvent.click(SubmitRoadMap);

  expect(screen.getByText(/Please enter a RoadMap name/)).toBeInTheDocument();

  await userEvent.type(RoadMapName, 'Test RoadMap');

  await userEvent.click(SubmitRoadMap);

  await waitForElementToBeRemoved(screen.getByText('Adding RoadMap'));
  expect(screen.getByText(/Road Maps/)).toBeInTheDocument();
  await waitFor(() => {
    expect(
      screen.getByText(/RoadMap created successfully/),
    ).toBeInTheDocument();
  });
});

it('Server Error while creating RoadMap', async () => {
  server.use(
    rest.put(`${API}/projects/${ProjectId}/roadMap`, ({ request: req }) =>
      HttpResponse.json(
        {
          message: 'Server Error While Creating RoadMap',
        },
        {
          status: 500,
        },
      ),
    ),
  );

  const { AddRoadMap, RoadMapName, SubmitRoadMap } = await setup();

  await userEvent.click(AddRoadMap);

  await userEvent.type(RoadMapName, 'Test RoadMap');

  await userEvent.click(SubmitRoadMap);

  await waitForElementToBeRemoved(screen.getByText('Adding RoadMap'));

  await waitFor(() => {
    expect(
      screen.getByText('Server Error While Creating RoadMap'),
    ).toBeInTheDocument();
  });
});

it('Delete RoadMap', async () => {
  await setup();

  await userEvent.click(screen.getByText(MockedRoadMap[0].name.toUpperCase()));

  const RoadMapDelete = screen.getByRole('button', {
    name: `Delete ${MockedRoadMap[0].name}`,
  });

  await userEvent.click(RoadMapDelete);

  expect(
    screen.queryByText(MockedRoadMap[0].name.toUpperCase()),
  ).not.toBeInTheDocument();

  await waitFor(() => {
    expect(
      screen.getByText(/RoadMap Deleted Successfully/),
    ).toBeInTheDocument();
  });
});

it('Delete RoadMap Server Error', async () => {
  server.use(
    rest.delete(`${API}/projects/${ProjectId}/roadMap`, ({ request: req }) =>
      HttpResponse.json(
        {
          message: 'Delete RoadMap Server Error',
        },
        {
          status: 500,
        },
      ),
    ),
  );

  await setup();

  await userEvent.click(screen.getByText(MockedRoadMap[0].name.toUpperCase()));

  const RoadMapDelete = screen.getByRole('button', {
    name: `Delete ${MockedRoadMap[0].name}`,
  });

  await userEvent.click(RoadMapDelete);

  expect(
    screen.queryByText(MockedRoadMap[0].name.toUpperCase()),
  ).not.toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/Delete RoadMap Server Error/)).toBeInTheDocument();
  });
});

it('Edit RoadMap', async () => {
  await setup();

  await userEvent.click(screen.getByText(MockedRoadMap[0].name.toUpperCase()));

  const RoadMapEdit = screen.getByRole('button', {
    name: `Edit ${MockedRoadMap[0].name}`,
  });

  await userEvent.click(RoadMapEdit);

  expect(screen.getByText(/Edit RoadMap/)).toBeInTheDocument();

  const RoadMapName = screen.getByDisplayValue(MockedRoadMap[0].name);
  // const Process = screen.getByTestId('Process-Id');
  const UpdateRoadMap = screen.getByRole('button', {
    name: 'Update RoadMap',
  });

  const NewValue = {
    name: 'Updated RoadMap',
    progress: '50',
  };
  await userEvent.clear(RoadMapName);

  // Empty RoadMapName

  await userEvent.click(UpdateRoadMap);
  expect(screen.getByText(/Please enter a RoadMap name/)).toBeInTheDocument();

  await userEvent.type(RoadMapName, NewValue.name);
  // await userEvent.click(Process);

  await userEvent.click(UpdateRoadMap);

  await waitForElementToBeRemoved(screen.getByText('Updating RoadMap'), {
    timeout: 3000,
  });

  await waitFor(() => {
    expect(screen.getByText(/RoadMap Edited successfully/)).toBeInTheDocument();
  });
});

it('Edit RoadMap Server Error', async () => {
  server.use(
    rest.patch(`${API}/projects/${ProjectId}/roadMap`, ({ request: req }) =>
      HttpResponse.json(
        {
          message: 'Edit RoadMap Server Error',
        },
        {
          status: 500,
        },
      ),
    ),
  );

  await setup();

  await userEvent.click(screen.getByText(MockedRoadMap[0].name.toUpperCase()));

  const RoadMapEdit = screen.getByRole('button', {
    name: `Edit ${MockedRoadMap[0].name}`,
  });

  await userEvent.click(RoadMapEdit);

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
  await userEvent.clear(RoadMapName);

  await userEvent.type(RoadMapName, NewValue.name);
  await userEvent.click(Process);

  await userEvent.click(UpdateRoadMap);

  expect(screen.getByText(NewValue.name.toUpperCase())).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/Edit RoadMap Server Error/)).toBeInTheDocument();
  });
});
