import { AppliedFilter, Filter } from './types';
import React, { FC } from 'react';
import FilterForm from './FilterForm';
import * as _ from 'lodash';

interface FiltersProps {
  appliedFilters: AppliedFilter[];
  possibleFilters: Filter[];
  requestInProgress: boolean;
  onSubmit: (filterName: string, selected: Set<string>) => void;
}

const Filters: FC<FiltersProps> = (props) => {
  const sortedPossibleFilters = _.sortBy(props.possibleFilters, [(f) => f.field]);

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
        {sortedPossibleFilters.map((f) => (
          <FilterForm
            filter={f}
            onSubmit={props.onSubmit}
            key={`possilbe-${f.field}`}
            isSubmitting={props.requestInProgress}
          />
        ))}
      </div>
    </div>
  );
};

export default Filters;
