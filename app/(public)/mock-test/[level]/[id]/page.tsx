import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Info } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

export default async function MockTestDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="container mx-auto">
      <div className="">Mock test detail {id} </div>
      <SectionQuestion />
    </div>
  );
}

const SectionQuestion = () => (
  <div className="">

    

    <p className="rounded-lg border p-6">
      ＿＿の　ことばは　ひらがなで　どう　かきますか。１・２・３・４から　いちばん　いい　ものを　ひとつ　えらんで　ください。
    </p>

    <div className="space-y-2">
      <Card>
        <CardHeader>
          <CardTitle>Câu 1</CardTitle>
          <CardAction>
            <Info />
          </CardAction>
        </CardHeader>
        <CardContent>
          <h5 className="mb-5">
            おふろに入ってすこし休んでから、べんきょうします。
          </h5>
          <RadioGroup defaultValue="comfortable">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1">はって</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">はいって</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="compact" id="r3" />
              <Label htmlFor="r3">いって</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="compacta" id="r4" />
              <Label htmlFor="r4">いれって</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Câu 1</CardTitle>
          <CardAction>
            <Info />
          </CardAction>
        </CardHeader>
        <CardContent>
          <audio controls className="mb-5">
            <source src="horse.ogg" type="audio/ogg" />
            <source src="horse.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <RadioGroup defaultValue="comfortable">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1">はって</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">はいって</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="compact" id="r3" />
              <Label htmlFor="r3">いって</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="compacta" id="r4" />
              <Label htmlFor="r4">いれって</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>

    <div className="space-x-2 mt-2 flex justify-self-end">
      <Button disabled>Trang trước</Button>
      <Button>Trang sau</Button>
    </div>
  </div>
);

const Question = () => <div></div>;
