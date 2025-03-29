import FeatureCard from "./FeatureCard";

const cardContent = (
  <ul className="list-disc">
    <li>
      A central space to configure
      <ul className="list-disc list-inside">
        <li><b>Category</b>, <b>Status</b>, <b>Priority</b> and <b>Tag</b> options</li>
      </ul>
    </li>
    <li>There can be multiple workspaces</li>
    <li>There has to be 1 default workspace</li>
    <li>Cannot be nested</li>
    <li>Categories are direct children of a workspace</li>
      <ul className="list-disc list-inside">
        <li>There has to be atleast 1 category to be able to create tasks</li>
      </ul>
  </ul>
);

const cardData = {
  title: "Workspace",
  description: "Root level organizer for tasks and settings.",
  content: cardContent,
};

export default function WorkspaceCard() {
  return <FeatureCard cardData={cardData} />;
}
