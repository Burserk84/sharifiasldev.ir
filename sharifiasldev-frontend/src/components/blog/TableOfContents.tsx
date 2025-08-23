type TocEntry = {
  id: string;
  text: string;
  level: number;
};

interface TableOfContentsProps {
  toc: TocEntry[];
}

export default function TableOfContents({ toc }: TableOfContentsProps) {
  if (toc.length === 0) return null;

  return (
    <div className="bg-gray-800 p-6 rounded-lg text-right">
      <h3 className="font-bold text-white mb-4 flex justify-between items-center">
        <span>فهرست مطالب</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" /></svg>
      </h3>
      <ul className="space-y-2">
        {toc.map((entry) => (
          <li key={entry.id} className={`
            ${entry.level === 3 ? 'mr-4' : ''}  // Indent h3 headings
          `}>
            <a href={`#${entry.id}`} className="text-gray-400 hover:text-orange-400 transition-colors">
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}