import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm, useFormState } from 'react-hook-form';
import { toast } from 'sonner';

import Skeleton from '@app/components/ui/skeleton';
import queryKeys from '@app/services/query-keys';
import slugify from '@app/utils/slugify';
import type { Category, MutateCategoryPayload } from '@db/schema';

import type { CategoryFormInputs } from '../category-form';
import CategoryForm from '../category-form';

interface Props {
  category: Category;
}

function EditCategory({ category }: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (data: MutateCategoryPayload) => {
      return window.electronAPI.updateCategory(data);
    },
    onSuccess: response => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: [queryKeys.categoryListQuery] });
      } else {
        toast.error(response.error, { dismissible: false });
      }
    },
  });

  const form = useForm<CategoryFormInputs>({
    defaultValues: async () => {
      if (category.parentId) {
        const categoryDetail = await window.electronAPI.getCategoryDetail(category.parentId);
        return {
          name: category.name,
          description: category.description,
          categoryParent: categoryDetail.success ? categoryDetail.data : null,
          slug: category.slug,
        };
      }
      return {
        name: category.name,
        description: category.description,
        categoryParent: null,
        slug: category.slug,
      };
    },
  });

  function onSubmit(data: CategoryFormInputs) {
    mutateAsync({
      id: category.id,
      name: data.name,
      description: data.description,
      slug: slugify(data.name),
      parentId: data.categoryParent ? data.categoryParent.id : null,
    });
  }

  const { isLoading } = useFormState({ control: form.control });

  if (isLoading) {
    return <Skeleton />;
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
