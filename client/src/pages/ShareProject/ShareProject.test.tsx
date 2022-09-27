import { render, screen } from '../../test-utils';
import '@testing-library/jest-dom/extend-expect';
import ShareProject from './ShareProject';
 
    it('should render without crashing', () => {
        render(<ShareProject />);
    });
