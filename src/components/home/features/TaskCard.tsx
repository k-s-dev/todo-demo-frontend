import FeatureCard from "./FeatureCard";

const cardContent = (
  <ul className="list-disc">
    <li>Can be nested</li>
    <li>Can be independent or assigned to a project</li>
    <li>
      Mandatory fields:
      <span className="text-lime-800 font-bold">Title</span>,
      <span className="text-lime-800 font-bold">Workspace</span>,
      <span className="text-lime-800 font-bold">Category</span>,
      <span className="text-lime-800 font-bold">Visibility</span>,
    </li>
    <li>
      Optional configuration
      <ul className="list-disc list-inside">
        <li>
          <span className="text-lime-800 font-bold">Project</span>: assign to a
          project
        </li>
        <li>
          <span className="text-lime-800 font-bold">Description</span>: for
          notes
        </li>
        <li>
          <span className="text-lime-800 font-bold">Status</span>: e.g. todo,
          done, in-progress
        </li>
        <li>
          <span className="text-lime-800 font-bold">Priority</span>: e.g.
          urgent, medium, low
        </li>
        <li>
          <span className="text-lime-800 font-bold">Tags</span>: e.g. learn,
          work, ...
        </li>
        <li>
          <span className="text-lime-800 font-bold">Comments</span>: for logging
        </li>
        <li>
          <span className="text-lime-800 font-bold">Dates</span>: estimated
          start/end, actual start/end
        </li>
      </ul>
    </li>
  </ul>
);

const cardData = {
  title: "Task",
  description: "The core.",
  content: cardContent,
};

export default function WorkspaceCard() {
  return <FeatureCard cardData={cardData} />;
}
