declare module "genanki-js" {
  export type Field = { name: string };
  export type RequiredField = [number, "all" | "any", number[]];
  export type Template = { name?: string; qfmt: string; afmt: string };
  export type ModelProps = {
    /** a stable id */
    id: string;
    /** name of the model */
    name: string;
    /** model fields */
    flds: Field[];
    /** card templates to be generated from each note */
    tmpls: Template[];
    /** describes which fields are non-empty per template.   */
    req: RequiredField[];
  };
  export type ClozeModelProps = {
    /** a stable id */
    id: string;
    /** name of the model */
    name: string;
    /** model fields */
    flds: Field[];
    /** cloze template to be generated from each note */
    tmpl: Template;
  };
  export class Model {
    constructor(props: ModelProps);
  }
  export class ClozeModel {
    constructor(props: ClozeModelProps);
  }
}
