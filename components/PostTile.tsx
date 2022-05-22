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
    const publishDate = new Date(entry.sys.createdAt);
    const formatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
    };

    return (
        <div className="border border-primary my-2 p-4 flex content-center">
            <div className="avatar">
                <div className="w-32 mask mask-hexagon">
                    <img
                        src={
                            "https://picsum.photos/200/200?random=" +
                            publishDate.getTime()
                        }
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

function EntryBody({ entry }: { entry: Entry<Post> }) {
    return (
        <div className="">
            {entry.fields.body.content.map((content, index) => {
                return (
                    <div key={index}>
                        {content.content?.map((subContent, subIndex) => {
                            return <div key={subIndex}>{subContent.value}</div>;
                        })}
                    </div>
                );
            })}
        </div>
    );
}
