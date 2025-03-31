import FeatureCard from "./FeatureCard";

const cardContent = (
  <ul className="list-disc">
    <li>There can be multiple categories</li>
    <li>Can contain projects</li>
    <li>Can contain tasks without project</li>
  </ul>
);

const cardData = {
  title: "Category",
  description: "Second level organizer for tasks.",
  content: cardContent,
};

export default function CategoryCard() {
  return <FeatureCard cardData={cardData} />;
}
