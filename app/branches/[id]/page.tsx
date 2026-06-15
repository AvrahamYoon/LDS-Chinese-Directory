import { notFound } from "next/navigation";
import { BranchDetail } from "@/components/BranchDetail";
import { branches } from "@/data/branches";

type BranchPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return branches.map((branch) => ({ id: branch.id }));
}

export default async function BranchPage({ params }: BranchPageProps) {
  const { id } = await params;
  const branch = branches.find((item) => item.id === id);

  if (!branch) {
    notFound();
  }

  return <BranchDetail branch={branch} />;
}
