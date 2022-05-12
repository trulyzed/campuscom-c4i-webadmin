import { getSidebarMenus } from "~/Component/Layout/SidebarMenus"
import { IField, MULTI_SELECT_GROUP_CHECKBOX, TEXT, } from "~/packages/components/Form/common"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { RoleQueries } from "~/packages/services/Api/Queries/AdminQueries/Roles"

const processSubmenuList = (data: any)=>{
  return data.map((element: any) => ({...element, value:element.url.substring(1).replaceAll('/', '__')}));
}
const processGroupedList = (data: any)=>{
  return data.map((element: any) => ({...element, options:element.permissions}));
}
const menus = getSidebarMenus().map(menu=> ({...menu, group:menu.title, options:processSubmenuList(menu.submenu)}));

export const getRoleUpdateFormMeta = (roleId: string): IField[] => {
  return [
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
      inputType: MULTI_SELECT_GROUP_CHECKBOX,
      fieldName: "menu_permissions",
      options: menus,
      displayKey2: "title",
      valueKey2: "value",
      rules: [{ required: true, message: "This field is required!" }]
    },
  ]
}