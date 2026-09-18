import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { WorkspaceModules } from '@/components/WorkspaceModules';
import { STARTER_MODULES } from '@/lib/workspace';

describe('personal workspace modules', () => {
  it('removes only the selected view and can restore the field starter template', () => {
    const save = vi.fn();
    render(<WorkspaceModules modules={STARTER_MODULES} busy={false} onSave={save} />);
    fireEvent.click(screen.getByText('Customize your workspace'));
    fireEvent.click(screen.getByRole('checkbox', { name: /Radio Log/ }));
    expect(save).toHaveBeenLastCalledWith(['Map', 'Observations', 'Satchy']);
    fireEvent.click(screen.getByRole('button', { name: 'Use field starter template' }));
    expect(save).toHaveBeenLastCalledWith(STARTER_MODULES);
    expect(screen.getByText(/preserves all records and connections/)).toBeInTheDocument();
  });
});
