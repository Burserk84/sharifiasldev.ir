"use client";

import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

export default function ContentRenderer({
  content,
}: {
  content: BlocksContent;
}) {
  if (!content) return null;

  return (
    <BlocksRenderer
      content={content}
      blocks={{
        // The custom heading function is now defined and used within the same Client Component
        heading: ({ children, level, id }) => {
          const Tag = `h${level}` as keyof JSX.IntrinsicElements;
          // The 'id' is passed in from the server page's processing
          return <Tag id={id}>{children}</Tag>;
        },
      }}
    />
  );
}
