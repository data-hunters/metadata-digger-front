import React from 'react';
import { render } from '@testing-library/react';
import FilterForm from './FilterForm';

describe('submit button', () => {
  test('it submits the form with selected elements', () => {
    const toBeReturned: Promise<void> = new Promise((resolve) => {
      setTimeout(() => resolve(), 100);
    });

    const filter = {
      field: 'field',
      values: [
        { name: 'value1', entry_count: 2, is_selected: false },
        { name: 'selected_value', entry_count: 3, is_selected: true },
      ],
    };

    const mockOnSubmit = jest.fn((calledFilterName: string, calledSelectedValues: Set<string>) => toBeReturned);
    const { getByText, getAllByTestId } = render(<FilterForm filter={filter} onSubmit={mockOnSubmit} />);

    expect(getByText(/value1/i)).toBeInTheDocument();
    getAllByTestId('field-select-enabled').every((c) => c.click());
    expect(mockOnSubmit.mock.calls.length).toEqual(1);
    expect(mockOnSubmit.mock.calls).toEqual([['field', new Set(['selected_value'])]]);
  });
});

class OnSubmitWrapper {
  _filterName: string | null = null;
  selected: Set<string> | null = null;
  toBeReturned: Promise<void>;

  public constructor(toBeReturned: Promise<void>) {
    this.toBeReturned = toBeReturned;
  }

  set filterName(value: string) {
    this._filterName = value;
  }

  get filterName() {
    return this._filterName!;
  }
  public mockOnSubmit(calledFilterName: string, calledSelected: Set<string>): Promise<void> {
    this.filterName = calledFilterName;
    this.selected = calledSelected;
    return this.toBeReturned;
  }
}
