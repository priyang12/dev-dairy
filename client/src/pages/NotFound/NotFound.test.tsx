import { screen, render } from '../../test-utils';
import NotFound from './index';

it('render The Landing Text', () => {
  const LandingData = {
    heading: 'Dev Dairy',
    subheading: 'Mange your projects and share your knowledge with the world',
  };
  render(
    <NotFound
      data={{
        heading: LandingData.heading,
        subheading: LandingData.subheading,
      }}
    />,
  );
  expect(screen.getByText(LandingData.heading)).toBeInTheDocument();
  expect(screen.getByText(LandingData.subheading)).toBeInTheDocument();
});
