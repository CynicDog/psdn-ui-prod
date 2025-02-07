import TableHeader from "../component/TableHeader";
import ConfigTableFilters from "./ConfigTableFilters";

const FilteredTableHeader = ({ children }) => {
    return (
        <TableHeader>
            {children}
        </TableHeader>
    );
};

export default FilteredTableHeader;
