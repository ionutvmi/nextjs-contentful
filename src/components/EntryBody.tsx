import { Entry } from "contentful";
import { Post } from "../types/interfaces";

export default function EntryBody({ entry }: { entry: Entry<Post> }) {
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
