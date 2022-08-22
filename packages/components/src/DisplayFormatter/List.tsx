import { List as AntList, Tag } from 'antd'

interface IListProps {
  data: string[]
  showInTags?: boolean
}

export const List = ({ data, showInTags }: IListProps) => {
  return (
    showInTags ?
      <div>
        {data.map((d, idx) => (
          <Tag key={`${d}__${idx}`}>{d}</Tag>
        ))}
      </div>
      : <AntList
        dataSource={data}
        renderItem={item => <AntList.Item>{item}</AntList.Item>}
        size={'small'}
        bordered
      />
  )
}