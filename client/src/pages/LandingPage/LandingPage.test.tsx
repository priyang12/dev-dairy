import { screen, render } from '../../test-utils';
import LandingPage from './index';

it('render The Landing Text', () => {
  const LandingData = {
    heading: 'Dev Dairy',
    subheading: 'Mange your projects and share your knowledge with the world',
  };
  render(
    <LandingPage
      heading={LandingData.heading}
      subheading={LandingData.subheading}
    />,
  );

  expect(
    screen.getByText(
      'Mange your projects and share your knowledge with the world',
    ),
  ).toBeInTheDocument();
});
