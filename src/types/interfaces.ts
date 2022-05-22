import { EntryFields } from "contentful";

export interface Post {
    title: string;
    body: EntryFields.RichText;
    slug: string;
}
