import { FileText, Mail, Map, MessageSquare, PlusSquare, Archive } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const actions = [
  { title: "Generate Report", icon: FileText, detail: "Prepare PDF incident summary", service: "Document workflow" },
  { title: "Notify Team", icon: MessageSquare, detail: "Prepare operational notification", service: "Team messaging" },
  { title: "Update Map", icon: Map, detail: "Create GIS layer update", service: "Mapping workflow" },
  { title: "Create Task", icon: PlusSquare, detail: "Create follow-up action item", service: "Operations queue" },
  { title: "Archive Event", icon: Archive, detail: "Store reviewed intelligence", service: "Event archive" },
];

const services = ["Google Workspace style documents", "Teams / Slack style notifications", "GIS outputs", "Email workflows"];

const IntelligenceActions = () => (
  <section className="container mx-auto px-6 py-8">
    <div className="mb-5 flex flex-col gap-2">
      <Badge variant="secondary" className="w-fit">Preview concept</Badge>
      <h2 className="font-display text-2xl font-bold">Intelligence Actions</h2>
      <p className="max-w-3xl text-sm text-muted-foreground">
        TerraSatch prepares operational outputs from reviewed intelligence. This preview demonstrates workflow concepts and does not send data or connect external services.
      </p>
    </div>
    <div className="grid gap-4 md:grid-cols-5">
      {actions.map((action) => (
        <Card key={action.title}>
          <CardHeader>
            <action.icon className="size-5 text-primary" aria-hidden="true" />
            <CardTitle className="text-sm">{action.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-muted-foreground">
            <p>{action.detail}</p>
            <Badge variant="outline">{action.service}</Badge>
            <Button size="sm" variant="outline" className="w-full">Preview</Button>
          </CardContent>
        </Card>
      ))}
    </div>
    <Card className="mt-5">
      <CardContent className="flex flex-wrap gap-3 p-5 text-sm">
        {services.map((service) => <span key={service} className="rounded border px-3 py-2">{service}</span>)}
        <Mail className="size-4 text-muted-foreground" />
      </CardContent>
    </Card>
  </section>
);

export default IntelligenceActions;
