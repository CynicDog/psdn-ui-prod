// import ConfigTableRow from "./ConfigTableRow";
// import TableRow from "../component/TableRow";
// import TableRowCell from "../component/TableRowCell";
//
// const FilteredTableBody = () => {
//
//     return (
//         <>
//             {data.length > 0 ? (
//                 data.map((row) => (
//                     <ConfigTableRow
//                         key={row.COL_NAME}
//                         row={row}
//                         columnNames={columnNames}
//                         selectedRowNames={selectedRowNames}
//                         toggleRowSelection={toggleRowSelection}
//                     />
//                 ))
//             ) : (
//                 <TableRow>
//                     <TableRowCell colSpan={Object.keys(columnNames).length + 1} className="text-center">
//                         No records found
//                     </TableRowCell>
//                 </TableRow>
//             )}
//         </>
//     )
// }
//
// export default FilteredTableBody;