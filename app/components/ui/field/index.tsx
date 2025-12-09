import type { ComponentProps } from 'react';

import cn from '@app/utils/cn';

import FieldContent from './field-content';
import FieldDescription from './field-description';
import FieldError from './field-error';
import FieldGroup from './field-group';
import FieldLabel from './field-label';
import FieldLegend from './field-legend';
import FieldSeparator from './field-separator';
import FieldSet from './field-set';
import FieldTitle from './field-title';
import fieldVariants, { type FieldVariants } from './field-variants';

type Props = ComponentProps<'div'> & FieldVariants;
function Field({ className, orientation = 'vertical', ...props }: Props) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
}

Field.Group = FieldGroup;
Field.Legend = FieldLegend;
Field.Separator = FieldSeparator;
Field.Set = FieldSet;
Field.Error = FieldError;
Field.Content = FieldContent;
Field.Description = FieldDescription;
Field.Title = FieldTitle;
Field.Label = FieldLabel;
export default Field;
