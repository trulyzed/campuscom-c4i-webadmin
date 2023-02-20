import { List as AntList, Tag } from 'antd'

interface IListProps {
  data: string[]
  showInTags?: boolean
  max?: number
  emphasize?: string[]
  emphasizeColor?: string
  emphasizeTitle?: string
}

export const List = ({ data, showInTags, emphasize, max, emphasizeColor, emphasizeTitle }: IListProps) => {
  const remaining = max ? data.length - max : undefined
  return (
    showInTags ?
      <div>
        {(max ? data.slice(0, max) : data).map((d, idx) => {
          const doEmphasize = emphasize?.includes(d)
          return <Tag title={(doEmphasize && emphasizeTitle) ? `${d} ${emphasizeTitle}` : d} key={`${d}__${idx}`} color={doEmphasize ? (emphasizeColor || '#783392') : undefined}>{d}</Tag>
        })}
        {remaining ? <Tag title={`${remaining} more`}>+{remaining} More</Tag> : null}
      </div>
      : <AntList
        dataSource={data}
        renderItem={item => <AntList.Item>{item}</AntList.Item>}
        size={'small'}
        bordered
      />
  )
}