import AuthorCard from "./AuthorCard";
import CtaCard from "./CtaCard";
import SearchCard from "./SearchCard";
import TableOfContents from "./TableOfContents";

type TocEntry = {
  id: string;
  text: string;
  level: number;
};

export default function Sidebar({ toc }: { toc: TocEntry[] }) {
  return (
    <aside className="sticky top-24 flex flex-col gap-6">
      <TableOfContents toc={toc} />
      <SearchCard />
      <AuthorCard />
      <CtaCard />
    </aside>
  );
}
