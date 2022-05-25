import { message } from "antd"
import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { RoleQueries } from "~/packages/services/Api/Queries/AdminQueries/Roles"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "~/packages/utils/EventBus"
import { RoleFormMeta } from '~/Component/Feature/Roles/FormMeta/RoleFormMeta'
import GroupedList from "~/packages/components/Page/DetailsPage/GroupedList"
import HierarchicalList from "~/packages/components/Page/DetailsPage/HierarchicalList"
import isArray from "lodash/isArray"
import mergeWith from "lodash/mergeWith"


export const getRoleDetailsMeta = (role: { [key: string]: any }): IDetailsMeta => {

  const updateEntity = QueryConstructor(((data) => RoleQueries.update({ ...data, params: { id: role.id } }).then(resp => {
    if (resp.success) {
      message.success(UPDATE_SUCCESSFULLY)
    }
    return resp
  })), [RoleQueries.update])

  const permittedMenuList = () => {
    return role.menu_permissions.reduce((m: any[], item: string, index: number) => {
      function customizer(objValue: any, srcValue: any) {
        if (isArray(objValue)) {
          return objValue.concat(srcValue);
        }
      }
      const dataItem = item
      const itemSplit: string[] = dataItem.split('__')
      const dataMap: { title: string, key: string, children: { [key: string]: any }[] }[] = itemSplit.map((x, i) => ({ title: x, key: itemSplit.slice(0, i + 1).join('__'), children: [] }))
      const dataNest = dataMap.reduce((accumulator, currentValue) => {
        accumulator.children.push(currentValue)
        return accumulator
      })
      const matchedIndex = m.findIndex(i => i.title === dataNest.title)
      if (matchedIndex > -1) {
        const target = m[matchedIndex]
        const mergedObj = mergeWith(target, dataNest, customizer)
        m[matchedIndex] = mergedObj
      } else {
        m.push(dataNest)
      }
      return m
    }, [])
  }
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
        render: () => <HierarchicalList data={permittedMenuList()} />
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
