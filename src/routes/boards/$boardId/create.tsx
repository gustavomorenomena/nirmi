import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/boards/$boardId/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <form>
      <FieldSet>
        <FieldLegend>Nouvelle Annonce</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title-input">Titre*</FieldLabel>
            <Input
              id="title-input"
              required
              name="title"
              placeholder="🏃 Sortie running en group"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="link-input">Lien</FieldLabel>
            <Input id="link-input" name="link" placeholder="https://..." />
            <FieldDescription>
              Liens vers groupe whatsapp, page insta, page web....
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="content-input">
              Contenu de l'annonce
            </FieldLabel>
            <Textarea
              id="content-input"
              placeholder="Court descriptif de l'annonce"
            />
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
