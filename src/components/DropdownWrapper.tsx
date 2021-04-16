import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useAppContext } from '../App';

type Props = {
  filterKey: string;
  title: string;
  options: Issue[] | Gender[] | Other[] | AgeRange[];
  className?: string;
};

const DropdownWrapper: React.FC<Props> = ({ filterKey, title, options, className }) => {
  const { filters, handleFilter } = useAppContext();
  const currentFilter = filters?.find((f) => f.key === filterKey);
  const currentOption = options.find((o) => o.id === currentFilter?.id);

  return (
    <Dropdown className={className}>
      <Dropdown.Toggle
        id="dropdown-basic"
        variant="white"
        className="dropdown-toggle font-weight-bold text-info border-info w-100"
      >
        {currentOption ? currentOption.fields.Name : title}
      </Dropdown.Toggle>
      <Dropdown.Menu className="w-100">
        {options.map((option: Issue | Gender | Other | AgeRange) => (
          <Dropdown.Item
            eventKey={option.id}
            key={option.id}
            active={filters?.some((f) => f.id === option.id) || false}
            onSelect={(id) => {
              if (id && handleFilter) {
                handleFilter({ key: filterKey, id, name: option.fields.Name });
              }
            }}
          >
            {option.fields.Name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownWrapper;
