import { render } from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import ProjectSessions from './ProjectSessions';

it('should render without crashing', () => {
  render(<ProjectSessions />);
});
