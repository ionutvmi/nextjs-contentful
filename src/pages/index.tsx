import type { NextPage } from "next";
import { createClient, Entry, EntryFields } from "contentful";
import PostTile from "../components/PostTile";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import { Post } from "../types/interfaces";
import MainLayout from "../layouts/MainLayout";
import Link from "next/link";

interface Props {
    items: Entry<Post>[];
}

const Home: NextPage<Props> = ({ items }) => {
    useEffect(() => {
        themeChange(false);
    }, []);

    return (
        <MainLayout>
            {items.map((entry, index) => {
                return (
                    <Link key={index} href={"/posts/" + entry.fields.slug}>
                        <a>
                            <PostTile entry={entry} />
                        </a>
                    </Link>
                );
            })}
        </MainLayout>
    );
};

export async function getStaticProps() {
    const client = createClient({
        space: process.env.CF_SPACE_ID || "",
        environment: process.env.CF_ENVIRONMENT,
        accessToken: process.env.CF_DELIVERY_API || "",
    });

    let entries = await client.getEntries();

    return {
        props: {
            items: entries.items,
        },
    };
}

export default Home;
