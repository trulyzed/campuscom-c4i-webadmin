import { HIERARCHIALL_MULTIPLE_CHECKBOX, IField, MULTI_SELECT_GROUP_CHECKBOX, TEXT, } from "~/packages/components/Form/common"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { RoleQueries } from "~/packages/services/Api/Queries/AdminQueries/Roles"
import { getSidebarMenus } from "~/Component/Layout/SidebarMenus"

const processGroupedList = (data: any)=>{
  return data.map((element: any) => ({...element, options:element.permissions}));
}
const menus = getSidebarMenus()

export const RoleFormMeta: IField[] = [
  {
    label: "Name",
    inputType: TEXT,
    fieldName: "name",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "API Permissions",
    inputType: MULTI_SELECT_GROUP_CHECKBOX,
    fieldName: "permissions",
    refLookupService:
      QueryConstructor(()=>
        RoleQueries.getPermissionList()
        .then(resp => resp.success ? ({...resp, data: processGroupedList(resp.data)}) : resp)
        ,[RoleQueries.getList]
      ),
    displayKey2: "name",
    valueKey2: "id",
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    label: "Menu Permissions",
    inputType: HIERARCHIALL_MULTIPLE_CHECKBOX,
    fieldName: "menu_permissions",
    rules: [{ required: true, message: "This field is required!" }],
    treeData: menus
  },
]