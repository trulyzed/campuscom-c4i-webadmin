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
  const remaining = max && (data.length > max) ? data.length - max : undefined
  return (
    showInTags ?
      <div style={remaining ? { margin: "10px 0", maxWidth: "50rem", display: "flex", flexWrap: "wrap", gap: "5px" } : undefined}>
        {(remaining ? data.slice(0, -remaining) : data).map((d, idx) => {
          const doEmphasize = emphasize?.includes(d)
          return <Tag style={{ margin: 0 }} title={(doEmphasize && emphasizeTitle) ? `${d} ${emphasizeTitle}` : d} key={`${d}__${idx}`} color={doEmphasize ? (emphasizeColor || '#783392') : undefined}>{d}</Tag>
        })}
        {remaining ? <Tag style={{ margin: 0 }} title={`${remaining} more`} color={"#0077B3"}>+{remaining} More</Tag> : null}
      </div>
      : <AntList
        dataSource={data}
        renderItem={item => <AntList.Item>{item}</AntList.Item>}
        size={'small'}
        bordered
      />
  )
}