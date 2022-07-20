import { useEffect, useState } from 'react'
import { Upload, UploadProps } from 'antd'
import { UploadFile, UploadChangeParam } from 'antd/lib/upload/interface'
import { SearchFieldWrapper, IGeneratedField } from "~/packages/components/Form/common"
import { useDependencyValue } from '~/packages/components/Hooks/useDependencyValue';

function getBase64(file: File): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(typeof (reader.result) === 'string' ? reader.result : undefined);
    reader.onerror = error => reject(error);
  });
}

interface IFormFieldProps extends IGeneratedField {
  defaultValue?: UploadFile | UploadFile[] | string | string[]
  multiple?: boolean
  accept?: UploadProps['accept']
}
export const FormFileUpload = (props: IFormFieldProps) => {
  const [files, setFiles] = useState<UploadProps['fileList']>()
  const defaultValue = props.previewKey ? props.formInstance.getFieldValue(props.previewKey) : undefined
  useDependencyValue({ ...props })

  useEffect(() => {
    if (!defaultValue) return
    setFiles((Array.isArray(defaultValue) ? defaultValue : [defaultValue]).map(i => ({ status: 'done', ...typeof i === 'string' ? { name: i, url: i, uid: i } : i })))
  }, [defaultValue])

  useEffect(() => {
    props.formInstance.setFieldsValue({
      [props.fieldName]: files?.reduce((a, c) => {
        if (c.originFileObj) a.push(c.originFileObj)
        return a
      }, [] as UploadFile['originFileObj'][])
    })
  }, [files, props.fieldName, props.formInstance])

  const handleChange = (info: UploadChangeParam) => {
    setFiles(info.fileList)
    return info.fileList.map(i => i.originFileObj)
  }

  const handleRemove = (data: UploadFile) => {
    setFiles((prevValue) => prevValue?.filter((img) => data.uid !== img.uid))
  }

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && file.originFileObj) {
      file.preview = await getBase64(file.originFileObj)
    } else if (file.url) file.preview = file.url

    if (!file.preview) return

    const image = new Image()
    image.src = file.preview
    const imgWindow = window.open(image.src)
    if (imgWindow) imgWindow.document.write(image.outerHTML)
  }

  return (
    <SearchFieldWrapper {...props} getValueFromEvent={handleChange} rules={(!defaultValue || !files?.length) ? props.rules : undefined}>
      <Upload
        accept={props.accept}
        beforeUpload={() => false}
        onRemove={handleRemove}
        fileList={files}
        listType="picture-card"
        multiple={props.multiple}
        onPreview={handlePreview}
        maxCount={props.multiple ? undefined : 1}
      >
        <div>+ Upload</div>
      </Upload>
    </SearchFieldWrapper>
  )
}