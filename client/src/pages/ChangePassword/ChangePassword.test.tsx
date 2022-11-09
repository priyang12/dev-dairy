import { render, screen } from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import ChangePassword from './ChangePassword';
 
    it('should render without crashing', () => {
        render(<ChangePassword />);
    });
