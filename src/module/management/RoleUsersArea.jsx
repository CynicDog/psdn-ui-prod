// import Area from "../../component/Area";
// import Span from "../../component/Span";
// import {useLanguage} from "../../context/Language";
// import DraggableBadge from "../../component/DraggableBadge";
//
// const RoleUsersArea = ({ users }) => {
//
//     const { t } = useLanguage();
//
//     return (
//         <Area border rounded shadow="sm" p="3" my="3">
//             <Area mb="3">
//                 <Span fontSize="3" fontWeight="lighter" underline>
//                     {t('components.role_unassigned_users')}
//                 </Span>
//             </Area>
//             <Area>
//                 {users.map((user, index) => (
//                     <DraggableBadge itemId={user.id} key={index} badge="light" m="1" noSelect>
//                         {user.displayName}
//                     </DraggableBadge>
//                 ))}
//             </Area>
//         </Area>
//     )
// }
// export default RoleUsersArea;