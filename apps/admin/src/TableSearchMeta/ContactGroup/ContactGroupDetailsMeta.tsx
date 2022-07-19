import { message } from "antd"
import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderBoolean, renderLink } from "~/packages/components/ResponsiveTable"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { getProfileTaggingFormMeta } from "~/Component/Feature/ContactGroups/FormMeta/ProfileTaggingFormMeta"
import { StudentQueries } from "~/packages/services/Api/Queries/AdminQueries/Students"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { CREATE_SUCCESSFULLY, UPDATE_SUCCESSFULLY } from "~/Constants"
import { ContactGroupQueries } from "~/packages/services/Api/Queries/AdminQueries/ContactGroups"
import { ContactGroupFormMeta } from "~/Component/Feature/ContactGroups/FormMeta/ContactGroupFormMeta"
import { REFRESH_PAGE } from "~/packages/utils/EventBus"
import { IconButton } from "~/packages/components/Form/Buttons/IconButton"

export const getContactGroupDetailsMeta = (contactGroup: { [key: string]: any }): IDetailsMeta => {
  const createProfile = QueryConstructor(((data) => ContactGroupQueries.tagProfile({ ...data, data: { ...data?.data, contact_group: contactGroup.id } }).then(resp => {
    if (resp.success) {
      message.success(CREATE_SUCCESSFULLY)
    }
    return resp
  })), [ContactGroupQueries.tagProfile])

  const updateEntity = QueryConstructor(((data) => ContactGroupQueries.update({ ...data, params: { id: contactGroup.id } }).then(resp => {
    if (resp.success) {
      message.success(UPDATE_SUCCESSFULLY)
    }
    return resp
  })), [ContactGroupQueries.update])

  const summaryInfo: CardContainer = {
    title: `Contact Group Title: ${contactGroup.title}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Contact Group`}
        formMeta={ContactGroupFormMeta}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...contactGroup, store: contactGroup.store.id }}
        buttonLabel={`Update Contact Group`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Store', value: renderLink(`/administration/store/${contactGroup.store.id}`, contactGroup.store.name) },
      { label: 'Title', value: contactGroup.title },
      { label: 'Is Active', value: contactGroup.is_active, render: renderBoolean },
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
      helpKey: "contactGroupSummaryTab"
    },
    {
      tabTitle: "Profiles",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: [
            {
              title: "Name",
              dataIndex: "profile",
              render: (text: any, record: any) => record.profile.id ? renderLink(`/storefront-data/student/${text.id}`, text.name) : text,
              sorter: (a: any, b: any) => a.profile.name - b.profile.name
            },
            {
              title: "Action",
              dataIndex: "id",
              render: (text) => (
                <IconButton
                  iconType="remove"
                  toolTip="Remove"
                  refreshEventName="REFRESH_PROFILE_LIST"
                  onClickRemove={() => ContactGroupQueries.untagProfile({ data: { ids: [text] } })}
                />
              )
            },
          ],
          searchFunc: StudentQueries.getListByContactGroup,
          searchParams: { contact_group__id: contactGroup.id },
          tableName: "ContactGroupProfile",
          refreshEventName: "REFRESH_PROFILE_LIST",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Profile`}
              formMeta={getProfileTaggingFormMeta(contactGroup.id)}
              formSubmitApi={createProfile}
              buttonLabel={`Add Profile`}
              iconType="create"
              refreshEventName={'REFRESH_PROFILE_LIST'}
            />
          ]
        }
      },
      helpKey: "profilesTab"
    },
  ]

  return {
    pageTitle: `Contact Group Title - ${contactGroup.title}`,
    tabs: tabMetas
  }
}
