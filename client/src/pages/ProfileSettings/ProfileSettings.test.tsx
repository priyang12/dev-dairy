import { render, screen } from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import ProfileSettings from './ProfileSettings';
 
    it('should render without crashing', () => {
        render(<ProfileSettings />);
    });
