import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@aws-spulse/api";

export const trpc = createTRPCReact<AppRouter>();
