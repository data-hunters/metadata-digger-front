import { Filter } from './types';
import { FC, useState } from 'react';
import React from 'react';
import FilterForm from './FilterForm';

interface FiltersProps {
  appliedFilters: Filter[];
  possibleFilters: Filter[];
  onSubmit: (filterName: string, selected: Set<string>) => Promise<void>;
}

const Filters: FC<FiltersProps> = (props) => {
  return (
    <div>
      <div>
        {props.appliedFilters.map((f) => (
          <FilterForm filter={f} onSubmit={props.onSubmit} key={`applied-${f.field}`} />
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
