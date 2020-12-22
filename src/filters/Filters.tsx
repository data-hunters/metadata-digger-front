import { AppliedFilter, Filter } from '../types';
import React, { FC } from 'react';
import FilterForm from './FilterForm';
import * as _ from 'lodash';
import AppliedFilterForm from './AppliedFilterForm';

interface FiltersProps {
  appliedFilters: AppliedFilter[];
  possibleFilters: Filter[];
  requestInProgress: boolean;
  onSubmit: (filterName: string, selected: Set<string>) => void;
  onValueValueRemovedFromFilter: (fieldName: string, value: string) => void;
  onFilterRemoved: (fieldName: string) => void;
}
const FILTERS_PER_ROW = 4;

const Filters: FC<FiltersProps> = (props) => {
  const sortedPossibleFilters = _.sortBy(props.possibleFilters, [(f) => f.field]);
  const rows = _.chunk(sortedPossibleFilters, FILTERS_PER_ROW);

  return (
    <div>
      <div>
        {props.appliedFilters.map((f) => (
          <div key={`applied-${f.field_name}`}>
            <AppliedFilterForm
              fieldName={f.field_name}
              values={f.selected_values}
              onValueRemovedFromFilter={props.onValueValueRemovedFromFilter}
              onFilterRemoved={props.onFilterRemoved}
            />
          </div>
        ))}
      </div>
      <div>
        {rows.map((row, index) => (
          <div className="row" key={`possible-row-${index}`}>
            {row.map((el) => (
              <div className="col" key={`possilbe-${el.field}`}>
                <FilterForm filter={el} onSubmit={props.onSubmit} isSubmitting={props.requestInProgress} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filters;
