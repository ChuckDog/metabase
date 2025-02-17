import { isSyncCompleted } from "metabase/lib/syncing";
import { Dashboard, Database } from "./types";

export const createCandidatesQuery = (
  databases: Database[] = [],
  dashboards: Dashboard[] | undefined,
  showXrays: boolean,
  enableXrays: boolean,
) => {
  const sampleDatabase = databases.find(d => d.is_sample && isSyncCompleted(d));
  const userDatabase = databases.find(d => !d.is_sample && isSyncCompleted(d));

  if (!dashboards || dashboards.length || !showXrays || !enableXrays) {
    return;
  } else if (userDatabase) {
    return { id: userDatabase.id };
  } else if (sampleDatabase) {
    return { id: sampleDatabase.id };
  }
};
