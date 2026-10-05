import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "./actions";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function useMyProfile() {
  const { user, isPending } = useCurrentUserState();
  const query = useQuery({
    queryKey: ["me", user?.id],
    queryFn: () => getMyProfile(),
    enabled: Boolean(user),
  });
  return { user, authPending: isPending, ...query };
}
