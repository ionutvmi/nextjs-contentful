import { Entry, EntryFields } from "contentful";
import React from "react";

interface Post {
    title: string;
    body: EntryFields.RichText;
}

interface Props {
    entry: Entry<Post>;
}

export default function PostTile({ entry }: Props) {
    return (
        <div className="border my-2 p-4">
            <h1 className="text-2xl">{entry.fields.title}</h1>
            <div>
                {entry.fields.body.content.map((content, index) => {
                    return (
                        <div key={index}>
                            {content.content?.map((subContent, subIndex) => {
                                return (
                                    <div key={subIndex}>{subContent.value}</div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
