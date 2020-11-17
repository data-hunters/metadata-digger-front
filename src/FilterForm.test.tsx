import React from 'react';
import { render, Matcher } from '@testing-library/react';
import FilterForm from './FilterForm';
import { Filter } from './types';

describe('submit button', () => {
  test('it submits the form with selected elements', () => {
    const filter = defaultFilter;

    const mockOnSubmit = newMockOnSubmit();
    const { getByText, getAllByTestId } = render(<FilterForm filter={filter} onSubmit={mockOnSubmit} />);

    const testFixture = new Fixture(filter, getByText, getAllByTestId);

    testFixture.submit();
    expect(mockOnSubmit.mock.calls).toEqual([['field', new Set(['selected_value'])]]);
  });

  test('it allows selecting and deselecting elements', () => {
    const filter: Filter = defaultFilter;

    const mockOnSubmit = newMockOnSubmit();
    const { getByText, getAllByTestId } = render(<FilterForm filter={filter} onSubmit={mockOnSubmit} />);
    const fixture = new Fixture(filter, getByText, getAllByTestId);

    fixture.clickOnInput('value1');
    fixture.clickOnInput('selected_value');
    fixture.submit();
    expect(mockOnSubmit.mock.calls).toEqual([['field', new Set(['value1'])]]);
  });
});

const newMockOnSubmit = () => {
  const toBeReturned: Promise<void> = new Promise((resolve) => {
    resolve();
  });

  return jest.fn((calledFilterName: string, calledSelectedValues: Set<string>) => toBeReturned);
};

const defaultFilter: Filter = {
  field: 'field',
  values: [
    { name: 'value1', entry_count: 2, is_selected: false },
    { name: 'selected_value', entry_count: 3, is_selected: true },
  ],
};

class Fixture {
  private filter: Filter;
  private getByText: (text: Matcher) => HTMLElement;
  private getAllByTestId: (text: Matcher) => HTMLElement[];

  constructor(
    filter: Filter,
    getByText: (text: Matcher) => HTMLElement,
    getAllByTestId: (text: Matcher) => HTMLElement[],
  ) {
    this.filter = filter;
    this.getByText = getByText;
    this.getAllByTestId = getAllByTestId;
  }

  clickOnInput(inputName: string): void {
    this.getAllByTestId(`filter-form-input-${this.filter.field}-value-${inputName}`).every((c) => c.click());
  }

  submit(): void {
    this.getAllByTestId(`filter-form-${this.filter.field}-select-enabled`).every((c) => c.click());
  }
}
