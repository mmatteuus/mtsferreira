import { render, screen } from '@testing-library/react';
import App from '@/App';

describe('App routing and rendering', () => {
  it('renders the Index page with hero heading', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /Engenheiro de Software/i })
    ).toBeInTheDocument();
  });

  it('renders header brand', () => {
    render(<App />);
    const matches = screen.getAllByText(/MtsFerreira/i);
    expect(matches.length).toBeGreaterThan(0);
  });
});
