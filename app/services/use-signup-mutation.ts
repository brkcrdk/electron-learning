import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import type { NewUserPayload } from '@db/schema';

function useSignupMutation() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: NewUserPayload) => {
      return window.electronAPI.createSuperAdmin({
        email: data.email,
        password: data.password,
        name: data.name,
      });
    },
    onSuccess: () => {
      navigate({ to: '/', replace: true });
    },
  });
}

export default useSignupMutation;
