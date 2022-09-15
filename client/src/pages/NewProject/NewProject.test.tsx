import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { BrowserRouter } from 'react-router-dom';
import API from '../../API';
import server from '../../mock/server';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '../../test-utils';
import NewProject from './NewProject';

function setup() {
  render(
    <BrowserRouter>
      <NewProject />
    </BrowserRouter>,
  );
  return {
    Title: screen.getByLabelText(/Title/),
    Description: screen.getByLabelText(/Description/),
    process: screen.getByLabelText(/Process/),
    Github: screen.getByLabelText(/Github/),
    live: screen.getByLabelText(/Live/),
    Website: screen.getByLabelText(/Website/),
    NewTech: screen.getByLabelText(/Technologies/),
    AddNewTechBtn: screen.getByTestId(/add-tech/),
    RoadMap: screen.getByLabelText(/RoadMap/),
    Color: screen.getByLabelText(/Color/),
    AddRoadMapBtn: screen.getByTestId(/add-RoadMap/),
    CreateProjectBtn: screen.getByText(/Create Project/),
  };
}

it('Render Page', () => {
  const {
    Title,
    Description,
    process,
    Github,
    live,
    Website,
    AddNewTechBtn,
    AddRoadMapBtn,
    Color,
    NewTech,
    RoadMap,
  } = setup();
  screen.getByText('New Project');
  expect(Title).toBeInTheDocument();
  expect(Description).toBeInTheDocument();
  expect(process).toBeInTheDocument();
  expect(Github).toBeInTheDocument();
  expect(live).toBeInTheDocument();
  expect(Website).toBeInTheDocument();
  expect(AddNewTechBtn).toBeInTheDocument();
  expect(AddRoadMapBtn).toBeInTheDocument();
  expect(Color).toBeInTheDocument();
  expect(NewTech).toBeInTheDocument();
  expect(RoadMap).toBeInTheDocument();
});

it('Website Disable and not Disable', async () => {
  const { Website, live } = setup();
  // Check WebSite Input Disabled
  expect(Website).toBeDisabled();
  await userEvent.click(live);
  expect(Website).toBeEnabled();
  await userEvent.type(Website, 'Test Website');
});

it('Check Field Inputs and validation', async () => {
  const {
    Title,
    Description,
    process,
    Github,
    live,
    Website,
    CreateProjectBtn,
  } = setup();

  await userEvent.type(Title, 'asd');
  await userEvent.type(Description, 'as');
  await userEvent.clear(process);
  await userEvent.type(process, '20');
  await userEvent.click(live);
  await userEvent.type(Github, 'Test Github');
  await userEvent.type(Website, 'Test Website');
  await userEvent.click(CreateProjectBtn);

  // check if the validation is working
  expect(
    screen.getByText(/Title must be between 4 and 30 characters/),
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Description must be between 10 and 400 characters/),
  ).toBeInTheDocument();

  expect(screen.getByText(/Enter Valid Github Link/)).toBeInTheDocument();
  expect(screen.getByText(/Enter Valid URL for Website/)).toBeInTheDocument();

  // check for Empty Title Message
  await userEvent.clear(Title);
  await userEvent.clear(Description);
  expect(screen.getByText(/TITLE is required/)).toBeInTheDocument();
  expect(screen.getByText(/DESCRIPTION is required/)).toBeInTheDocument();
});

it('Technology Input and Delete', async () => {
  const { AddNewTechBtn, NewTech } = setup();
  await userEvent.type(NewTech, 'Test Technology');
  expect(NewTech).toHaveValue('Test Technology');
  await userEvent.click(AddNewTechBtn);

  const deleteBtn = screen.getByTestId('delete-tech-0');

  await userEvent.click(deleteBtn);
});

it('RoadMap Input', async () => {
  const { AddRoadMapBtn, RoadMap, Color } = setup();

  await userEvent.type(RoadMap, 'Test RoadMap');
  expect(RoadMap).toHaveValue('Test RoadMap');

  expect(Color).toHaveValue('#000000');

  await userEvent.click(AddRoadMapBtn);

  expect(RoadMap).toHaveValue('');
  expect(Color).toHaveValue('#000000');

  const deleteBtn = screen.getByTestId('delete-roadMap');

  await userEvent.click(deleteBtn);
});

it('Valid Input With Api Call', async () => {
  const {
    Title,
    Description,
    process,
    Github,
    live,
    Website,
    CreateProjectBtn,
  } = setup();

  await userEvent.type(Title, 'Test Title');
  await userEvent.type(Description, 'Test Description');
  await userEvent.clear(process);
  await userEvent.type(process, '20');
  await userEvent.click(live);
  await userEvent.type(Github, 'https://github.com');
  await userEvent.type(Website, 'https://github.com');
  await userEvent.click(CreateProjectBtn);

  await waitForElementToBeRemoved(screen.getByAltText(/loading/));
  await waitFor(() => {
    expect(
      screen.getByText(/Project Created Successfully/),
    ).toBeInTheDocument();
  });
});

it('Server Error Api Repose', async () => {
  server.use(
    rest.post(`${API}/projects`, (req, res, ctx) =>
      res(
        ctx.status(401),
        ctx.json({ message: 'Server Error Project Can not Created' }),
      ),
    ),
  );

  const {
    Title,
    Description,
    process,
    Github,
    live,
    Website,
    CreateProjectBtn,
  } = setup();

  await userEvent.type(Title, 'Test Title');
  await userEvent.type(Description, 'Test Description');
  await userEvent.clear(process);
  await userEvent.type(process, '20');
  await userEvent.click(live);
  await userEvent.type(Github, 'https://github.com');
  await userEvent.type(Website, 'https://github.com');
  await userEvent.click(CreateProjectBtn);

  await waitForElementToBeRemoved(screen.getByAltText(/loading/));
  await waitFor(() => {
    expect(
      screen.getByText(/Server Error Project Can not Created/),
    ).toBeInTheDocument();
  });
});
