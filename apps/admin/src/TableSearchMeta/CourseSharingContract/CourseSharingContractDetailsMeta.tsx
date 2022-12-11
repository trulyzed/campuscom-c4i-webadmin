import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderBoolean, renderDateTime, renderLink } from "@packages/components/lib/ResponsiveTable"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { CourseSharingContractQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CourseSharingContracts"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { getCourseSharingContractFormMeta } from "~/Component/Feature/CourseSharingContracts/FormMeta/CourseSharingContractFormMeta"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { IField } from "@packages/components/lib/Form/common"
import { getCourseSharingContractCourseListTableColumns } from "./CourseSharingContractCourseListTableColumns"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"

export const getCourseSharingContractDetailsMeta = (courseSharingContract: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => CourseSharingContractQueries.update({ ...data, params: { id: courseSharingContract.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [CourseSharingContractQueries.update])

  const summaryInfo: CardContainer = {
    title: `Course Sharing Contract: ${courseSharingContract.course_provider.name} for (${courseSharingContract.store.name})`,
    cardActions: [
      ...courseSharingContract.is_active ? [
        <MetaDrivenFormModalOpenButton
          formTitle={`Update Course Sharing Contract`}
          formMeta={getCourseSharingContractFormMeta().map((i: IField, idx) => ({
            ...i,
            ...idx === 0 && { disabled: true }
          }))}
          formSubmitApi={updateEntity}
          initialFormValue={{ ...courseSharingContract, store: courseSharingContract.store.id, course_provider: courseSharingContract.course_provider.id, }}
          defaultFormValue={{ courseSharingContractId: courseSharingContract.id }}
          buttonLabel={`Update Course Sharing Contract`}
          iconType="edit"
          refreshEventName={REFRESH_PAGE}
        />,
        <ContextAction
          tooltip="Deactivate"
          type="deactivate"
          confirmationType="Deactivate"
          queryService={QueryConstructor(() => CourseSharingContractQueries.deactivate({
            data: { course_sharing_contract: courseSharingContract.id }
          }), [CourseSharingContractQueries.deactivate])}
          successText={"Successfully deactivated"}
          refreshEventName={REFRESH_PAGE}
        />
      ] : [
        <ContextAction
          tooltip="Activate"
          type="start"
          iconColor="success"
          queryService={QueryConstructor(() => CourseSharingContractQueries.update({
            params: { id: courseSharingContract.id },
            data: { is_active: true }
          }), [CourseSharingContractQueries.update])}
          successText={"Successfully activated"}
          refreshEventName={REFRESH_PAGE}
        />
      ],
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Store', value: renderLink(`/administration/store/${courseSharingContract.store.id}`, courseSharingContract.store.name), },
      { label: 'Course Provider', value: renderLink(`/administration/course-provider/${courseSharingContract.course_provider.id}`, courseSharingContract.course_provider.name), },
      { label: 'Contract Date', value: courseSharingContract.contract_datetime, render: renderDateTime },
      { label: 'Is Primary', value: courseSharingContract.is_primary, render: renderBoolean },
      { label: 'Is Active', value: courseSharingContract.is_active, render: renderBoolean },
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
      helpKey: "courseSharingContractSummaryTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: courseSharingContract.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
    {
      tabTitle: "Shared Courses",
      tabType: "table",
      tabMeta: {
        tableProps: {
          ...getCourseSharingContractCourseListTableColumns(),
          searchParams: { course_sharing_contract: courseSharingContract.id },
        }
      },
      helpKey: "sharedCoursesTab"
    },
  ]

  return {
    pageTitle: `Course Sharing Contract Title - ${courseSharingContract.course_provider.name} for (${courseSharingContract.store.name})`,
    tabs: tabMetas
  }
}
