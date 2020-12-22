import React, { FC } from 'react';

interface AppliedFilterProps {
  fieldName: string;
  values: string[];
  onValueRemovedFromFilter: (fieldName: string, value: string) => void;
  onFilterRemoved: (fieldName: string) => void;
}

const AppliedFilterForm: FC<AppliedFilterProps> = (props) => {
  return (
    <div>
      <div>
        <p>{props.fieldName}</p>
        <button type="button" className="btn btn-danger" onClick={() => props.onFilterRemoved(props.fieldName)}>
          Remove
        </button>
      </div>
      <div>
        {props.values.map((value) => {
          return (
            <div key={`${props.fieldName}-${value}`}>
              <p>{value}</p>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => props.onValueRemovedFromFilter(props.fieldName, value)}
              >
                Remove
              </button>
            </div>
          );
        })}
        ;
      </div>
    </div>
  );
};

export default AppliedFilterForm;
