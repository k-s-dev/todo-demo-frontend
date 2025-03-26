export default function SelectionText({
  objName,
  workspaceName,
}: {
  objName: string;
  workspaceName?: string;
}) {

  return (
    <>
      <span className="text-muted-foreground text-xs">{`${workspaceName}: `}</span>
      <span>{objName}</span>
    </>
  );
}
