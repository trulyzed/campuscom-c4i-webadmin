import { useCallback } from "react"
import Text from "antd/lib/typography/Text"
import { showDeleteConfirm } from "~/packages/components/Modal/Confirmation"
import { IQuery } from "~/packages/services/Api/Queries/AdminQueries/Proxy/types"

interface ITextActionProps {
  text: React.ReactNode
  queryService?: IQuery
  type: 'delete'
}

export const TextAction = ({ text, queryService, type }: ITextActionProps) => {
  const handleClick = useCallback(() => {
    if (type === 'delete' && queryService) showDeleteConfirm(queryService)
  }, [queryService, type])

  return (
    <Text className="cursor-pointer" strong type="danger" onClick={handleClick}>{text}</Text>
  )
}