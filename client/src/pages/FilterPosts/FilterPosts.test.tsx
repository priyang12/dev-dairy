import { render } from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import FilterPosts from './FilterPosts';

it('should render without crashing', () => {
  render(<FilterPosts />);
});
