import { Button } from "@/components/ui/button";
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
import { isLogged } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/boards/$boardId/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as {
      title: string;
      email: string;
      content: string;
      link: string;
    };
    console.log({ data });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>Nouvelle Annonce</FieldLegend>
          <FieldDescription>
            Une fois votre annonce valider, elle sera visible dans la page
            d'annonces.
          </FieldDescription>
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
                name="content"
                placeholder="Court descriptif de l'annonce"
                className="h-30"
              />
            </Field>
            {!isLogged() && (
              <Field>
                <FieldLabel htmlFor="email-input">Email*</FieldLabel>
                <Input type="email" required id="email-input" />
                <FieldDescription>
                  Un email est nécessaire pour la création d'une annonce.
                </FieldDescription>
              </Field>
            )}
          </FieldGroup>
          <Field>
            <Button type="submit">Valider</Button>
          </Field>
        </FieldSet>
      </FieldGroup>
    </form>
  );
}
