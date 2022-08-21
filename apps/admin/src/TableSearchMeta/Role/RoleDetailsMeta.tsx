import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { RoleQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Roles"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { RoleFormMeta } from '~/Component/Feature/Roles/FormMeta/RoleFormMeta'
import GroupedList from "@packages/components/lib/DisplayFormatter/GroupedList"
import { List } from "@packages/components/lib/DisplayFormatter/List"
import { HierarchicalList } from "@packages/components/lib/DisplayFormatter/HierarchicalList"
import { getSidebarMenus } from "~/Component/Layout/SidebarMenus"
import { ISidebarMenu } from "@packages/components/lib/SidebarNavigation/Sidebar"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"

export const getRoleDetailsMeta = (role: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => RoleQueries.update({ ...data, params: { id: role.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
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
        initialFormValue={{ name: role.name, app_permissions: role.app_permissions, permissions: role.permissions.map((permission: any) => permission.id), menu_permissions: role.menu_permissions }}
        formSubmitApi={updateEntity}
        buttonLabel={`Update Role`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Name', value: role.name },
      { label: 'App Permissions', value: role.app_permissions, render: () => <List data={role.app_permissions} /> },
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
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: role.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Role Title - ${role.name}`,
    tabs: tabMetas
  }
}
