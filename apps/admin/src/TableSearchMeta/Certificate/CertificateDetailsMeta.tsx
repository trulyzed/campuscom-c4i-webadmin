import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { CertificateQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Certificates"
import { getCertificateFormMeta } from "~/Component/Feature/Certificates/FormMeta/CertificateFormMeta"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { renderBoolean, renderLink } from "@packages/components/lib/ResponsiveTable"
import { ADDED_SUCCESSFULLY, CREATE_SUCCESSFULLY, UPDATE_SUCCESSFULLY } from "~/Constants"
import { renderActiveStatus, renderHtml, renderThumb } from "@packages/components/lib/ResponsiveTable/tableUtils"
import { getCareerListTableColumns } from "~/TableSearchMeta/Career/CareerListTableColumns"
import { getCareerTaggingFormMeta } from "~/Component/Feature/Courses/FormMeta/CareerTaggingFormMeta"
import { CareerQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Careers"
import { getSkillListTableColumns } from "~/TableSearchMeta/Career/SkillListTableColumns"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { getCourseListTableColumns } from "~/TableSearchMeta/Course/CourseListTableColumns"
import { CourseQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Courses"
import { getCourseTaggingFormMeta } from "~/Component/Feature/Certificates/FormMeta/CourseTaggingFormMeta"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"

export const getCertificateDetailsMeta = (certificate: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => CertificateQueries.update({ ...data, params: { id: certificate.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [CertificateQueries.update])

  const addCourse = QueryConstructor(((data) => CertificateQueries.tagCourse({ ...data, data: { ...data?.data, certificate: certificate.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: ADDED_SUCCESSFULLY })
    }
    return resp
  })), [CertificateQueries.tagCourse])

  const tagCareer = QueryConstructor(((data) => CertificateQueries.tagCareer({ ...data, data: { ...data?.data }, params: { certificate_id: certificate.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
    }
    return resp
  })), [CertificateQueries.tagCareer, CareerQueries.getCareersAndSkillsByCertificate])

  const taggedCareersAndSkillQuery = QueryConstructor(() => {
    return CareerQueries.getCareersAndSkillsByCertificate({ params: { certificate_id: certificate.id } }).then(resp => {
      return {
        ...resp,
        data: {
          ...resp.data,
          careers: resp.data.careers.map((i: any) => i.id),
          skills: resp.data.skills.map((i: any) => i.id)
        }
      }
    })
  }, [CareerQueries.getCareersAndSkillsByCertificate])

  const summary: CardContainer = {
    title: certificate.title,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Certificate`}
        formMeta={getCertificateFormMeta(certificate)}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...certificate, provider: certificate.provider.id }}
        defaultFormValue={{ certificateId: certificate.id }}
        buttonLabel={`Update Certificate`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Active Status', value: certificate.active_status, render: renderActiveStatus },
      { label: "Title", value: certificate.title, render: undefined },
      { label: "Code", value: certificate.code, render: undefined },
      { label: 'Inquiry URL', value: certificate.inquiry_url },
      { label: 'Course Provider', value: renderLink(`/administration/course-provider/${certificate.provider.id}`, certificate.provider.name) },
      { label: 'External ID', value: certificate.external_id },
      { label: 'External URL', value: certificate.external_url },
      { label: 'Slug', value: certificate.slug },
      { label: 'Level', value: certificate.level },
      { label: 'Summary', value: certificate.summary },
      { label: 'Description', value: renderHtml(certificate.description) },
      { label: 'Learning Outcome', value: renderHtml(certificate.learning_outcome) },
      { label: 'Image', value: renderThumb(certificate.certificate_image_uri, "Certificate's photo") },
      { label: 'Syllabus URL', value: certificate.syllabus_url },
      { label: 'Price', value: certificate.price },
      { label: 'Content Ready', value: certificate.content_ready, render: renderBoolean },
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summary]
  }

  const tabMetas: IDetailsTabMeta[] = [
    {
      tabTitle: "Summary",
      tabType: "summary",
      tabMeta: summaryMeta,
      helpKey: "certificateSummaryTab"
    },
    {
      tabTitle: "Courses",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: [...getCourseListTableColumns().columns.map(i => (i.dataIndex === 'course_provider' ? {
            title: "Course Provider",
            dataIndex: "provider",
            render: (text: any, record: any) =>
              renderLink(`/administration/course-provider/${text.id}`, text.name),
            sorter: (a: any, b: any) => {
              if (a.provider.name - b.provider.name) {
                return a.provider.name.length - b.provider.name.length
              }
              return 0
            }
          } : i.dataIndex === 'title' ? {
            title: "Title",
            dataIndex: "title",
            render: (text: any, record: any) => renderLink(`/course-provider/course/${record.course_id}`, text),
            sorter: (a: any, b: any) => a.title - b.title
          } : i)), {
            title: "Action",
            dataIndex: 'action',
            render: (_, record: any) => (
              <ContextAction
                type="delete"
                tooltip="Delete Course"
                queryService={QueryConstructor(() => CertificateQueries.untagCourse({ data: { ids: [record.id] } }), [CertificateQueries.untagCourse])}
                refreshEventName="REFRESH_COURSE_LIST"
              />
            )
          }],
          searchFunc: CourseQueries.getListByCertificate,
          searchParams: { certificate__id: certificate.id },
          refreshEventName: "REFRESH_COURSE_LIST",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Course`}
              formMeta={getCourseTaggingFormMeta()}
              formSubmitApi={addCourse}
              buttonLabel={`Add Course`}
              refreshEventName={'REFRESH_COURSE_LIST'}
            />
          ]
        }
      },
      helpKey: "coursesTab"
    },
    {
      tabTitle: "Careers",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          ...getCareerListTableColumns(),
          searchFunc: CareerQueries.getListByCertificate,
          searchParams: { id: certificate.id },
          refreshEventName: "REFRESH_CAREER_LIST",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Career`}
              formMeta={getCareerTaggingFormMeta()}
              formSubmitApi={tagCareer}
              buttonLabel={`Add Career`}
              refreshEventName={'REFRESH_CAREER_LIST'}
              initialFormValueApi={taggedCareersAndSkillQuery}
            />
          ]
        }
      },
      helpKey: "careersTab"
    },
    {
      tabTitle: "Skills",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          ...getSkillListTableColumns(),
          searchParams: { id: certificate.id },
          refreshEventName: "REFRESH_SKILL_LIST",
        }
      },
      helpKey: "skillsTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: certificate.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Certificate Title - ${certificate.title}`,
    tabs: tabMetas
  }
}
