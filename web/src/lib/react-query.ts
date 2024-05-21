import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(
        `An error occurred: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(
        `An error occurred: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    },
  }),
});
