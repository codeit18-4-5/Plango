import { devConsoleError } from "@/lib/error";
import { serverFetch } from "@/lib/server/server-fetch";
import { GetUserGroup } from "@/types/group";

const getSSRUserGroups = async (): Promise<GetUserGroup[]> => {
  try {
    return await serverFetch(`/user/groups`, {
      method: "GET",
      cache: "no-store",
    });
  } catch (e) {
    devConsoleError(e);
    throw e;
  }
};

export default getSSRUserGroups;
