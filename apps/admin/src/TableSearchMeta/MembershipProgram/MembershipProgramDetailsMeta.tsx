import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { MembershipProgramQueries } from "@packages/services/lib/Api/Queries/AdminQueries/MembershipPrograms"
import { CREATE_SUCCESSFULLY, UPDATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { getDiscountTaggingFormMeta } from "~/Component/Feature/MembershipPrograms/FormMeta/DiscountTaggingFormMeta"
import { MembershipProgramFormMeta } from "~/Component/Feature/MembershipPrograms/FormMeta/MembershipProgramFormMeta"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { renderBoolean, renderDateTime, renderLink } from "@packages/components/lib/ResponsiveTable"
import { DiscountProgramQueries } from "@packages/services/lib/Api/Queries/AdminQueries/DiscountPrograms"
import { StudentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Students"
import { renderHtml } from "@packages/components/lib/ResponsiveTable/tableUtils"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"

export const getMembershipProgramDetailsMeta = (membershipProgram: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => MembershipProgramQueries.update({ ...data, params: { id: membershipProgram.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [MembershipProgramQueries.update])

  const addMembershipDiscount = QueryConstructor(((data) => MembershipProgramQueries.tagDiscountProgram({ ...data, data: { ...data?.data, membership_program: membershipProgram.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
    }
    return resp
  })), [MembershipProgramQueries.tagDiscountProgram])

  const summaryInfo: CardContainer = {
    title: `Membership Program: ${membershipProgram.title}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Membership Program`}
        formMeta={MembershipProgramFormMeta}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...membershipProgram, store: membershipProgram.store.id }}
        defaultFormValue={{ membershipProgramId: membershipProgram.id }}
        buttonLabel={`Update Membership Program`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      <ContextAction
        tooltip="Delete Membership Program"
        type="delete"
        queryService={QueryConstructor(() => MembershipProgramQueries.delete({ data: { ids: [membershipProgram.id] } }), [MembershipProgramQueries.delete])}
        redirectTo={'/administration/membership-program?pagination=1'}
      />
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Store', value: renderLink(`/administration/store/${membershipProgram.store.id}`, membershipProgram.store.name) },
      { label: 'Title', value: membershipProgram.title },
      { label: 'Membership Type', value: membershipProgram.membership_type },
      { label: 'Duration', value: membershipProgram.duration ? `${membershipProgram.duration} day(s)` : undefined },
      { label: 'Start Date', value: membershipProgram.start_date, render: renderDateTime },
      { label: 'End Date', value: membershipProgram.end_date, render: renderDateTime },
      { label: 'Fee', value: membershipProgram.fee },
      { label: 'Description', value: membershipProgram.description, render: renderHtml },
      { label: 'Is Published', value: membershipProgram.is_published, render: renderBoolean },
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
      helpKey: "membershipProgramSummaryTab"
    },
    {
      tabTitle: "Discounts",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: [
            {
              title: "Discount Program",
              dataIndex: "discount_program",
              render: (text: any) => renderLink(`/administration/discount-program/${text.id}`, text.title)
            },
            {
              title: "Action",
              dataIndex: "id",
              render: (text) => (
                <ContextAction
                  tooltip="Remove"
                  type="delete"
                  refreshEventName="REFRESH_DISCOUNTS_TAB"
                  queryService={QueryConstructor(() => MembershipProgramQueries.untagDiscountProgram({ data: { ids: [text] } }), [MembershipProgramQueries.untagDiscountProgram])}
                />
              )
            },
          ],
          searchFunc: DiscountProgramQueries.getListByMembershipProgram,
          searchParams: { membership_program: membershipProgram.id },
          refreshEventName: "REFRESH_DISCOUNTS_TAB",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Create Identity Provider`}
              formMeta={getDiscountTaggingFormMeta(membershipProgram.id)}
              formSubmitApi={addMembershipDiscount}
              buttonLabel={`Create Discount`}
              iconType="create"
              refreshEventName={'REFRESH_DISCOUNTS_TAB'}
            />
          ]
        }
      },
      helpKey: "discountTab"
    },
    {
      tabTitle: "Participants",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: [
            {
              title: "Name",
              dataIndex: "profile",
              render: (text: any) => renderLink(`/storefront-data/student/${text.id}`, `${text.first_name} ${text.last_name}`)
            },
            {
              title: "Email",
              dataIndex: "profile",
              render: (text: any) => text.primary_email
            },
            {
              title: "Membership Since",
              dataIndex: "start_date",
              render: renderDateTime
            },
            {
              title: "Membership Ends",
              dataIndex: "end_date",
              render: renderDateTime
            },
          ],
          searchFunc: StudentQueries.getListByMembershipProgram,
          searchParams: { membership_program: membershipProgram.id },
        }
      },
      helpKey: "participantTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: membershipProgram.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Membership Program Title - ${membershipProgram.title}`,
    tabs: tabMetas
  }
}
