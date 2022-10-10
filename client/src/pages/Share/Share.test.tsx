import { MockedSharedProjectResponse } from '../../mock/Handlers/SharedProjectHandler';
import { render, screen, waitForElementToBeRemoved } from '../../test-utils';
import Share from './Share';

const Setup = async () => {
  render(<Share />);
  await waitForElementToBeRemoved(screen.getByAltText('loading...'));
};

it('Render Shared Project', async () => {
  await Setup();
  expect(
    screen.getByText(`Project Title : ${MockedSharedProjectResponse.title}`),
  ).toBeInTheDocument();

  expect(
    screen.getByText(
      `Project Description : ${MockedSharedProjectResponse.description}`,
    ),
  ).toBeInTheDocument();

  MockedSharedProjectResponse.technologies.forEach((tech: any) => {
    expect(screen.getAllByText(tech)[0]).toBeInTheDocument();
  });

  expect(
    screen.getByText(
      MockedSharedProjectResponse.live ? 'Deployed : Yes' : 'Not Yet Deployed',
    ),
  ).toBeInTheDocument();

  expect(
    screen.getByText(`${MockedSharedProjectResponse.website}`),
  ).toBeInTheDocument();

  expect(
    screen.getByText(`${MockedSharedProjectResponse.github}`),
  ).toBeInTheDocument();

  expect(
    screen.getByText(`RoadMap : ${MockedSharedProjectResponse.roadMap.length}`),
  ).toBeInTheDocument();

  MockedSharedProjectResponse.roadMap.forEach((roadMap) => {
    expect(screen.getByText(roadMap.name.toUpperCase())).toBeInTheDocument();
  });
});
