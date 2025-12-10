import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

import type { LoginPayload } from '@api/login';

function useLoginMutation() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: LoginPayload) => {
      return window.electronAPI.login({
        email: data.email,
        password: data.password,
      });
    },
    onSuccess: response => {
      if (response.success) {
        navigate({ to: '/', replace: true });
      } else {
        toast.error(response.error, {
          dismissible: false,
        });
      }
    },
  });
}

export default useLoginMutation;
