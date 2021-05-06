import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaTimes, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from '../App';

type Props = {
  filterKey: string;
  options?: Issue[] | Gender[] | Other[] | AgeRange[];
  className?: string;
  multiSelect?: boolean;
};

const DropdownWrapper: React.FC<Props> = ({ filterKey, options, className, multiSelect }) => {
  const { filters, handleFilter } = useAppContext();
  const currentFilters = filters?.filter((f) => f.key === filterKey);

  return (
    <Dropdown className={className}>
      <Dropdown.Toggle
        id="dropdown-basic"
        variant="white"
        className="font-weight-bold text-info border-info w-100 d-flex align-items-center justify-content-between"
      >
        <span className="text-truncate">
          {currentFilters && currentFilters.length > 0
            ? currentFilters.map((f) => f.name).join(', ')
            : 'None'}
        </span>
        <FaCaretDown />
      </Dropdown.Toggle>
      <Dropdown.Menu className="w-100">
        {options?.map((option: Issue | Gender | Other | AgeRange) => {
          const active = filters?.some((f) => f.id === option.id) || false;

          return (
            <Dropdown.Item
              className="d-flex align-items-center justify-content-between"
              eventKey={option.id}
              key={option.id}
              active={active}
              onSelect={(id) => {
                if (id && handleFilter) {
                  handleFilter({ key: filterKey, id, name: option.fields.Name });
                }
              }}
            >
              {option.fields.Name}
              {active && multiSelect && <FaTimes title="Remove" />}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownWrapper;
