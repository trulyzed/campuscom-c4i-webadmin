import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IGeneratedField, SearchFieldWrapper } from "./common"

const toolbarConfig = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ size: ['small', false, 'large', 'huge'] }],
  ['link', 'image'],
  [{ color: [] }, { background: [] }],
  ['blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ align: [] }],
  ['clean']
]

interface IFormEditorInputProps extends IGeneratedField {

}

export const FormEditorInput = (props: IFormEditorInputProps) => {
  const handleChange: React.ComponentPropsWithRef<typeof ReactQuill>['onChange'] = (content, delta, source, editor) => {
    return editor.getText().trim() ? content : ""
  }

  return (
    <SearchFieldWrapper {...props} getValueFromEvent={handleChange} initialValue={""}>
      <ReactQuill
        modules={{
          toolbar: toolbarConfig
        }}
      />
    </SearchFieldWrapper>
  )
}
