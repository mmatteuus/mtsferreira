import { render, screen, fireEvent } from '@testing-library/react';
import App from '@/App';
import { vi } from 'vitest';

describe('Header mobile menu and nav actions', () => {
  it('toggles mobile menu visibility', () => {
    render(<App />);
    expect(screen.queryByTestId('mobile-nav')).toBeNull();

    const toggle = screen.getByTestId('menu-toggle');
    fireEvent.click(toggle);
    expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();

    fireEvent.click(toggle);
    expect(screen.queryByTestId('mobile-nav')).toBeNull();
  });

  it('clicking "Pesquisar O.S" tries to scroll to #pesquisar-os', () => {
    const spy = vi.spyOn(document, 'getElementById').mockReturnValueOnce(null);
    render(<App />);
    const btn = screen.getByRole('button', { name: /Pesquisar O\.S/i });
    fireEvent.click(btn);
    expect(spy).toHaveBeenCalledWith('pesquisar-os');
  });
});

