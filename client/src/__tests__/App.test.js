import React from 'react';
import { render } from '@testing-library/react';
import App from '../app/App';

test('renders learn react link', () => {
    const { container } = render(<App />);
    const linkElement = container.querySelector('.main-container');
    expect(linkElement).toBeInTheDocument();
});
