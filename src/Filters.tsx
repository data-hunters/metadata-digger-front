import { Filter } from './types';
import { FC, useState } from 'react';
import React from 'react';

interface FiltersProps {
  appliedFilters: Filter[];
  possibleFilters: Filter[];
  onSubmit: (filterName: string, selected: Set<string>) => Promise<void>;
}

interface FilterProps {
  filter: Filter;
  onSubmit: (filterName: string, selected: Set<string>) => Promise<void>;
}

const FilterForm: FC<FilterProps> = (props) => {
  const selectedValues = props.filter.values.filter((e) => e.is_selected).map((e) => e.name);

  const [selected, setSelected] = useState(new Set<string>(selectedValues));
  const [isSubmitting, setSubmitting] = useState(false);

  const isSelected: (valueName: string) => boolean = (valueName: string) => {
    return selected.has(valueName);
  };

  const select: (valueName: string) => void = (valueName) => {
    console.log(`select ${valueName}`);
    const newState = new Set(selected);
    setSelected(newState.add(valueName));
  };

  const submitForm = () => {
    setSubmitting(true);
    props.onSubmit(props.filter.field, selected).then(() => setSubmitting(false));
  };

  const submitButton = () => {
    if (!isSubmitting)
      return (
        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => submitForm()}>
          Select
        </button>
      );
    else
      return (
        <button type="button" className="btn btn-secondary btn-lg btn-block">
          Select
        </button>
      );
  };

  return (
    <div className="card">
      <article className="card-group-item">
        <header className="card-header">{props.filter.field}</header>
        <div className="filter-content">
          <div className="card-body">
            {props.filter.values.map((value) => {
              return (
                <div className="custom-control custom-checkbox" key={value.name}>
                  <span className="float-right badge badge-light round">{value.entry_count}</span>
                  <label className="custom-control-label">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      checked={isSelected(value.name)}
                      onChange={() => select(value.name)}
                    />
                    {value.name}
                  </label>
                </div>
              );
            })}
            {submitButton()}
          </div>
        </div>
      </article>
    </div>
  );
};

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
