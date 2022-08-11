import { List as AntList } from 'antd'

interface IListProps {
  data: string[]
}

export const List = ({ data }: IListProps) => {
  return (
    <AntList
      dataSource={data}
      renderItem={item => <AntList.Item>{item}</AntList.Item>}
      size={'small'}
      bordered
    />
  )
}