import { findSectionRoster } from "~/ApiServices/BizApi/Faculty/facultyif"
import { TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { SectionGradeAssignFormModalOpenButton } from "~/TableSearchMeta/Section/SectionGradeAssignFormModalOpenButton"
import { getUser } from "@packages/api/lib/utils/TokenStore"

export const getSectionGradeTableColumns = (isModal = false): ITableMeta => {
  const Faculty: any = getUser()
  const columns: TableColumnType = [
    {
      title: "Student ID",
      dataIndex: "StudentSerialNum"
    },
    {
      title: "Student Name",
      dataIndex: "StudentName"
    },
    {
      title: "Email Address",
      dataIndex: "EmailAddress"
    },
    {
      title: "Grade Scale",
      dataIndex: "GradeScale"
    },
    {
      title: "Attendance Expected",
      dataIndex: "AttendanceExpected"
    },
    {
      title: "Current Grade",
      dataIndex: "CurrentGrade"
    },
    {
      title: "Attendance Actual",
      dataIndex: "AttendanceActual"
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) =>
        record.CurrentGrade || record.AttendanceActual ? (
          ""
        ) : (
          <SectionGradeAssignFormModalOpenButton initialFormValue={{ SectionID: record.SectionID, StudentID: record.StudentID, FacultyID: Faculty.FacultyID }} />
        )
    }
  ]

  return { columns, searchFunc: findSectionRoster, tableName: "SectionGradeTableColumns" }
}
