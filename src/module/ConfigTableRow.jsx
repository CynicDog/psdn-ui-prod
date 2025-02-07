// import TableRow from "../component/TableRow";
// import TableRowCell from "../component/TableRowCell";
// import Area from "../component/Area";
// import CheckBox from "../component/CheckBox";
// import Span from "../component/Span";
// import Button from "../component/Button";
//
// const ConfigTableRow = ({ row, columnNames, selectedRowNames, toggleRowSelection }) => {
//     return (
//         <TableRow
//             className={selectedRowNames.includes(row.COL_NAME) ? "table-active" : ""}
//             onClick={() => toggleRowSelection(row, !selectedRowNames.includes(row.COL_NAME))}
//             style={{ cursor: "pointer", verticalAlign: row.RULES.length > 0 ? "" : "middle" }}
//         >
//             <TableRowCell>
//                 <Area flex justifyContent="center" >
//                     <CheckBox
//                         type="checkbox"
//                         checked={selectedRowNames.includes(row.COL_NAME)}
//                         onChange={(e) => toggleRowSelection(row, e.target.checked)}
//                     />
//                 </Area>
//             </TableRowCell>
//
//             {Object.keys(columnNames).map((colKey) => (
//                 <TableRowCell key={colKey}>
//                     {colKey === "APPT_YN" ? (
//                         <Area flex justifyContent="center">
//                             <CheckBox
//                                 type="checkbox"
//                                 checked={row[colKey] === 1} />
//                         </Area>
//                     ) : colKey === "RULES" ? (
//                         <Area>
//                             {row[colKey].map((rule, index) => (
//                                 <Area border rounded="2" shadow="sm" my="2" p="2">
//                                     <Area flex justifyContent="between">
//                                         <Area className="badge-warning">{rule.RULE_ID}</Area>
//                                         <Area
//                                             className="badge-danger"
//                                             onClick={(e) => {
//                                                 e.stopPropagation();
//                                                 // handleDeleteRule(row.COL_NAME, rule.RULE_ID);
//                                             }}
//                                         >
//                                             delete
//                                         </Area>
//                                     </Area>
//                                 </Area>
//                             ))}
//                         </Area>
//                     ) : (
//                         <Span>{row[colKey] || ""}</Span>
//                     )}
//                 </TableRowCell>
//             ))}
//
//             <TableRowCell>
//                 <Area flex justifyContent="center">
//                     <Button size="sm">
//                         <i className="bi bi-box-arrow-up-right"></i>
//                     </Button>
//                 </Area>
//             </TableRowCell>
//         </TableRow>
//     );
// };
//
// export default ConfigTableRow;
