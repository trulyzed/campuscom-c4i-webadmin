import { message } from "antd"
import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { RoleQueries } from "~/packages/services/Api/Queries/AdminQueries/Roles"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "~/packages/utils/EventBus"
import { RoleFormMeta } from '~/Component/Feature/Roles/FormMeta/RoleFormMeta'
import GroupedList from "~/packages/components/DisplayFormatter/GroupedList"
import { HierarchicalList } from "~/packages/components/DisplayFormatter/HierarchicalList"
import { getSidebarMenus, ISidebarMenu } from "~/Component/Layout/SidebarMenus"

export const getRoleDetailsMeta = (role: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => RoleQueries.update({ ...data, params: { id: role.id } }).then(resp => {
    if (resp.success) {
      message.success(UPDATE_SUCCESSFULLY)
    }
    return resp
  })), [RoleQueries.update])

  const getMenuPermissions = (sidebarMenus: ISidebarMenu[] = getSidebarMenus()): ISidebarMenu[] => sidebarMenus.reduce((a, c) => {
    const submenu = getMenuPermissions(c.submenu);
    if (role.menu_permissions?.includes(c.key || '') || submenu.length) a.push({ ...c, submenu })
    return a;
  }, [] as ISidebarMenu[])

  const summaryInfo: CardContainer = {
    title: `Role: ${role.name}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update ${role.name}`}
        formMeta={RoleFormMeta}
        initialFormValue={{ name: role.name, permissions: role.permissions.map((permission: any) => permission.id), menu_permissions: role.menu_permissions }}
        formSubmitApi={updateEntity}
        buttonLabel={`Update Role`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Name', value: role.name },
      { label: 'API Permissions', value: role.permissions, render: () => <GroupedList data={role.permissions} groupKey={'group'} displayKey={'name'} /> },
      {
        label: 'Menu Permissions',
        value: role.permissions,
        render: () => <HierarchicalList data={getMenuPermissions()} fieldNames={{ children: 'submenu' }} />
      }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summaryInfo]
  }

  const tabMetas: IDetailsTabMeta[] = [
    {
      tabTitle: "Summary",
      tabType: "summary",
      tabMeta: summaryMeta,
      helpKey: "roleSummaryTab",
    },
  ]

  return {
    pageTitle: `Role Title - ${role.name}`,
    tabs: tabMetas
  }
}
