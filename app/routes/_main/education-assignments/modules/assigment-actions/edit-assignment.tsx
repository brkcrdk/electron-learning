import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { RowSelectionState } from '@tanstack/react-table';
import { FormProvider, useForm, useFormState } from 'react-hook-form';
import { toast } from 'sonner';

import Skeleton from '@app/components/ui/skeleton';
import queryKeys from '@app/services/query-keys';
import type { EducationAssignmentListItem, MutateEducationPayload } from '@db/schema';

import type { AssignmentFormProps } from '../assignment-form';
import AssignmentForm from '../assignment-form';

interface Props {
  assignment: EducationAssignmentListItem;
}

function EditAssignment({ assignment }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (data: MutateEducationPayload) => {
      return window.electronAPI.updateEducation(data);
    },
    onSuccess: response => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: [queryKeys.educationListQuery] });
      } else {
        toast.error(response.error, { dismissible: false });
      }
    },
  });

  const form = useForm<AssignmentFormProps>({
    defaultValues: async () => {
      const assignees = await window.electronAPI.getEducationAssignmentAssignees(assignment.id);

      console.log('assignees', assignment.id);

      if (assignees.success) {
        const selectedUsers = assignees.data.reduce((acc, assignee) => {
          acc[assignee.id] = true;
          return acc;
        }, {} as RowSelectionState);

        return {
          title: assignment.title,
          description: assignment.description,
          selectedUsers,
          selectedEducation: assignment.education,
        };
      }

      return {
        title: assignment.title,
        description: assignment.description,
        selectedUsers: {},
        selectedEducation: assignment.education,
      };
    },
  });

  const onSubmit = (data: AssignmentFormProps) => {
    if (!data.selectedEducation) return;
    console.log(data);
    // mutateAsync({
    //   id: education.id,
    //   name: data.name,
    //   description: data.description,
    //   categoryId: data.category.id,
    //   educationMaterial: data.educationMaterial.value,
    //   coverImageId: data.coverImage?.id ?? null,
    // });
  };

  const { isLoading } = useFormState({ control: form.control });

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <FormProvider {...form}>
      <form
        id="edit-assignment-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <AssignmentForm />
      </form>
    </FormProvider>
  );
}

export default EditAssignment;
