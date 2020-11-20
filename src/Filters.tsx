import { AppliedFilter, Filter } from './types';
import React, { FC } from 'react';
import FilterForm from './FilterForm';

interface FiltersProps {
  appliedFilters: AppliedFilter[];
  possibleFilters: Filter[];
  onSubmit: (filterName: string, selected: Set<string>) => void;
}

const Filters: FC<FiltersProps> = (props) => {
  return (
    <div>
      <div>
        {props.appliedFilters.map((f) => (
          <div key={`applied-filter-${f.field_name}`}>
            <p>{f.field_name}</p>
            <p>selected ${f.selected_values.join(' ')}</p>
          </div>
        ))}
      </div>
      <div>
        {props.possibleFilters.map((f) => (
          <FilterForm filter={f} onSubmit={props.onSubmit} key={`possilbe-${f.field}`} />
        ))}
      </div>
    </div>
  );
};

export default Filters;
