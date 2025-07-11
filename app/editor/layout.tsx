import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editor | GitBook Manual Site",
  description: "Markdown editor for creating and editing documentation",
};

export default function EditorPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      {children}
    </div>
  );
}
