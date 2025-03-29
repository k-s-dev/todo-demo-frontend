import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface FeatureCartData {
  title: string;
  description: string;
  content: React.ReactNode;
}

export default function FeatureCard({
  cardData,
}: {
  cardData: FeatureCartData;
}) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-lime-800 text-xl">{cardData.title}</CardTitle>
        <CardDescription>{cardData.description}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>{cardData.content}</CardContent>
    </Card>
  );
}
