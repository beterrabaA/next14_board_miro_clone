import { useState } from "react";
import { useMutation } from "convex/react";

export const useApiMutation = (api: any) => {
  const [loading, setLoading] = useState(false);
  const apiMutation = useMutation(api);

  const mutate = (payload: any) => {
    setLoading(true);
    return apiMutation(payload)
      .finally(() => setLoading(false))
      .then((res: any) => res)
      .catch((err: any) => err);
  };

  return { mutate, loading };
};
