import type { ComponentProps } from 'react';

import Field from '../ui/field';
import FileUpload from '../ui/file-upload';

interface Props extends ComponentProps<typeof FileUpload> {
  error?: string;
  label: string;
  inputId: string;
}

function FileUploadField({ error, inputId, label, ...props }: Props) {
  return (
    <Field>
      <Field.Label htmlFor={inputId}>{label}</Field.Label>
      <FileUpload {...props} />
      {error && <Field.Error>{error}</Field.Error>}
    </Field>
  );
}

export default FileUploadField;
