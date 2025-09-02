import { render, screen, fireEvent } from '@testing-library/react';
import App from '@/App';
import { vi } from 'vitest';

describe('UI interactions', () => {
  it('clicks Serviços and scrolls to #servicos', () => {
    const el = {
      scrollIntoView: vi.fn(),
    } as unknown as HTMLElement;
    const spy = vi.spyOn(document, 'getElementById').mockReturnValueOnce(el);

    render(<App />);
    const btn = screen.getByRole('button', { name: /Serviços/i });
    fireEvent.click(btn);

    expect(spy).toHaveBeenCalledWith('servicos');
    expect(el.scrollIntoView).toHaveBeenCalled();
  });

  it('clicks Ver projetos and scrolls to #contato', () => {
    const el = {
      scrollIntoView: vi.fn(),
    } as unknown as HTMLElement;
    const spy = vi.spyOn(document, 'getElementById').mockReturnValueOnce(el);

    render(<App />);
    const btn = screen.getByRole('button', { name: /Ver projetos/i });
    fireEvent.click(btn);

    expect(spy).toHaveBeenCalledWith('contato');
    expect(el.scrollIntoView).toHaveBeenCalled();
  });

  it('clicks WhatsApp and opens a new tab', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<App />);
    const btn = screen.getByRole('button', { name: /Peça um orçamento/i });
    fireEvent.click(btn);
    expect(openSpy).toHaveBeenCalled();
  });

  it('toggles theme without errors', () => {
    render(<App />);
    const toggle = screen.getByRole('button', { name: /Alternar tema/i });
    fireEvent.click(toggle);
    // no assertion on theme value; just ensure button remains
    expect(toggle).toBeInTheDocument();
  });
});
