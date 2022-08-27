import { render } from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import PreferenceSettings from './PreferenceSettings';

it('should render without crashing', () => {
  render(<PreferenceSettings />);
});
