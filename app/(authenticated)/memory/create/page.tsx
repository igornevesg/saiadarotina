import {
  getCreateMemoryInitialData,
  presentCreateMemory,
} from "@/features/relationship/memory/public";

import { CreateMemoryPage } from "@/features/relationship/memory/ui/createMemoryPage/createMemoryPage";

type Props = {
  searchParams: Promise<{
    origin?: string | string[];
    id?: string | string[];
  }>;
};

export default async function CreateMemoryPageRoute({ searchParams }: Props) {
  const params = await searchParams;

  const data = getCreateMemoryInitialData(params);

  const presentation = presentCreateMemory(
    data.sourceMoment,
    data.memoryContext
  );

  return <CreateMemoryPage presentation={presentation} />;
}