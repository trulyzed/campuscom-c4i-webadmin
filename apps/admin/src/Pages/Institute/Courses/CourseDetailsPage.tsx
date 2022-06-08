import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/packages/components/Page/DetailsPage/DetailsPage"
import { getCourseDetailsMeta } from "~/TableSearchMeta/Course/CourseDetailsMeta"
import { CourseQueries } from "~/packages/services/Api/Queries/AdminQueries/Courses"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { CareerQueries } from "~/packages/services/Api/Queries/AdminQueries/Careers"

export function CourseDetailsPage(props: RouteComponentProps<{ courseID?: string }>) {
  const CourseID = props?.match?.params?.courseID

  const courseDetailsQuery = QueryConstructor(() => {
    return Promise.all([CourseQueries.getSingle({ params: { id: CourseID } }), CareerQueries.getCareersAndSkillsByCourse({ params: { course_id: CourseID } })]).then(responses => {
      const [resp1, resp2] = responses
      return {
        ...resp1,
        ...resp2,
        data: {
          ...resp1.data,
          tagged_careers: resp2.data.careers,
          tagged_skills: resp2.data.skills
        }
      }
    })
  }, [CourseQueries.getSingle, CareerQueries.getCareersAndSkillsByCourse])


  return <DetailsPage getMeta={getCourseDetailsMeta} getDetailsPageContent={courseDetailsQuery} entityType="course" entityID={CourseID} titleKey="name" />
}