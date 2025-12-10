import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import slugify from '@app/utils/slugify';
import type { Category } from '@db/schema';

import type { CategoryFormInputs } from '../category-form';
import CategoryForm from '../category-form';

interface Props {
  category: Category;
}

function EditCategory({ category }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (data: CategoryFormInputs) => {
      return window.electronAPI.updateCategory({
        id: category.id,
        name: data.name,
        description: data.description,
        slug: slugify(data.name),
      });
    },
    onSuccess: response => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['category-list'] });
      } else {
        toast.error(response.error, { dismissible: false });
      }
    },
  });

  const form = useForm<CategoryFormInputs>({
    defaultValues: async () => {
      return {
        name: category.name,
        description: category.description,
      };
    },
  });

  function onSubmit(data: CategoryFormInputs) {
    mutateAsync(data);
  }
  return (
    <FormProvider {...form}>
      <form
        id="edit-category-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <CategoryForm />
      </form>
    </FormProvider>
  );
}

export default EditCategory;
