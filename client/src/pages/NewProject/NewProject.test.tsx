import userEvent from '@testing-library/user-event';
import { render, screen } from '../../test-utils';
import NewProject from './NewProject';

const setup = () => {
  render(<NewProject />);
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
};

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

it('Website Disable and not Disable', () => {
  const { Website, live } = setup();
  // Check WebSite Input Disabled
  expect(Website).toBeDisabled();
  userEvent.click(live);
  expect(Website).toBeEnabled();
  userEvent.type(Website, 'Test Website');
});

it('Check Field Inputs and validation', () => {
  const {
    Title,
    Description,
    process,
    Github,
    live,
    Website,
    CreateProjectBtn,
  } = setup();

  userEvent.type(Title, 'asd');
  userEvent.type(Description, 'as');
  userEvent.clear(process);
  userEvent.type(process, '20');
  userEvent.click(live);
  userEvent.type(Github, 'Test Github');
  userEvent.type(Website, 'Test Website');
  userEvent.click(CreateProjectBtn);

  // check if the validation is working
  expect(
    screen.getByText(/Title must be between 4 and 10 characters/),
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Description must be between 10 and 100 characters/),
  ).toBeInTheDocument();

  expect(screen.getByText(/Enter Valid Github Link/)).toBeInTheDocument();
  expect(screen.getByText(/Enter Valid URL for Website/)).toBeInTheDocument();

  // check for Empty Title Message
  userEvent.clear(Title);
  userEvent.clear(Description);
  expect(screen.getByText(/TITLE is required/)).toBeInTheDocument();
  expect(screen.getByText(/DESCRIPTION is required/)).toBeInTheDocument();
});
it('Valid Input With Api Call', () => {
  const {
    Title,
    Description,
    process,
    Github,
    live,
    Website,
    CreateProjectBtn,
  } = setup();

  userEvent.type(Title, 'Test Title');
  userEvent.type(Description, 'Test Description');
  userEvent.clear(process);
  userEvent.type(process, '20');
  userEvent.click(live);
  userEvent.type(Github, 'https://github.com');
  userEvent.type(Website, 'https://github.com');
  userEvent.click(CreateProjectBtn);
});
