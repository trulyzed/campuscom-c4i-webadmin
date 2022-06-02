import { useCallback, useState } from 'react'
import { Spin } from 'antd'
import { AttachmentQueries } from '~/packages/services/Api/Queries/AdminQueries/Attachments'

interface IDownloadableLinkProps {
  link: string | string[]
  className?: string
}

const DownloadableLink = ({
  link,
  className = '',
}: IDownloadableLinkProps) => {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleClick = useCallback(async (e, link) => {
    e.preventDefault()
    if (isDownloading) return

    setIsDownloading(true)
    try {
      await AttachmentQueries.download({ params: { filename: `${link}` } })
    } catch (error) {

    } finally {
      setIsDownloading(false)
    }
  }, [isDownloading])

  if (Array.isArray(link)) {
    return (
      <>
        {link.map((i, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
            <span>{idx + 1}.</span>
            <DownloadableLink
              link={i}
              className={className} />
          </div>
        ))}
      </>
    )
  } else return (link ?
    <span
      className='ant-btn ant-btn-link'
      onClick={isDownloading ? undefined : (e) => handleClick(e, link)}
      onKeyDown={isDownloading ? undefined : (e) => handleClick(e, link)}>
      {link}
      {isDownloading && <Spin style={{ marginLeft: '10px' }} />}
    </span>
    : null
  )
}

export default DownloadableLink