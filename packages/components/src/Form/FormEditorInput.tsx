import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDependencyValue } from '~/Hooks/useDependencyValue';
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
  useDependencyValue({ ...props })
  const handleChange: React.ComponentPropsWithRef<typeof ReactQuill>['onChange'] = (content, delta, source, editor) => {
    return editor.getText().trim() ? content : ""
  }

  return (
    <SearchFieldWrapper {...props} getValueFromEvent={handleChange} initialValue={props.initialValue === undefined ? "" : props.initialValue}>
      <ReactQuill
        modules={{
          toolbar: toolbarConfig
        }}
        style={{ height: "25rem", display: "flex", flexDirection: "column" }}
      />
    </SearchFieldWrapper>
  )
}
