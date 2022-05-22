import { createClient, Entry, EntryCollection, EntryFields } from "contentful";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import EntryBody from "../../components/EntryBody";
import MainLayout from "../../layouts/MainLayout";
import { Post } from "../../types/interfaces";

interface Props {
    entry: Entry<Post>;
}

const BlogPost: NextPage<Props> = ({ entry }) => {
    if (!entry) {
        return <div>Post not found</div>;
    }
    return (
        <MainLayout>
            <Head>
                <title>{entry.fields.title}</title>
                <meta name="description" content={entry.fields.title} />
            </Head>
            <h1 className="text-center text-6xl">{entry.fields.title}</h1>
            <div className="my-10 text-2xl">
                <EntryBody entry={entry} />
            </div>
        </MainLayout>
    );
};

export default BlogPost;

export async function getStaticProps(context: { params: { slug: string } }) {
    const client = createClient({
        space: process.env.CF_SPACE_ID || "",
        environment: process.env.CF_ENVIRONMENT,
        accessToken: process.env.CF_DELIVERY_API || "",
    });

    let entries = null;
    try {
        entries = await client.getEntries<Post>({
            content_type: "post",
            "fields.slug": context.params.slug,
        });
    } catch (e) {
        return {
            notFound: true,
        };
    }

    if (!entries || entries.total == 0) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            entry: entries.items[0],
        },
    };
}

export async function getStaticPaths() {
    const client = createClient({
        space: process.env.CF_SPACE_ID || "",
        environment: process.env.CF_ENVIRONMENT,
        accessToken: process.env.CF_DELIVERY_API || "",
    });

    const entries: EntryCollection<Post> = await client.getEntries();

    return {
        paths: entries.items.map((item) => ({
            params: {
                slug: item.fields.slug,
            },
        })),
        fallback: true,
    };
}
