import { Entry } from "contentful";
import React from "react";
import { Post } from "../types/interfaces";
import EntryBody from "./EntryBody";

interface Props {
    entry: Entry<Post>;
}

export default function PostTile({ entry }: Props) {
    const publishDate = new Date(entry.sys.createdAt);
    const formatOptions: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
    };

    return (
        <div className="border rounded-lg border-primary my-2 p-4 flex content-center">
            <div className="avatar">
                <div className="w-32 mask mask-hexagon">
                    <img
                        src={
                            "https://picsum.photos/200/200?random=" +
                            publishDate.getTime()
                        }
                        alt={entry.fields.title}
                    />
                </div>
            </div>
            <div className="px-2 self-center">
                <h1 className="text-2xl">{entry.fields.title}</h1>
                <div>
                    Published Date:{" "}
                    {publishDate.toLocaleDateString(undefined, formatOptions)}
                </div>
                <EntryBody entry={entry} />
            </div>
        </div>
    );
}
