import { ProfileProps, TAIL } from "@/constants";
import { cls, generateImageUrl } from "@/utils";
import client from "@/libs/server/client";
import { getServerActionSession } from "@/libs/server/session";
import Image from "next/image";
import Link from "next/link";
import Tweet from "@/components/Tweet";
import { Fragment } from "react";
import { unstable_noStore as noStore } from "next/cache";

const Page = async () => {
  noStore();
  const session = await getServerActionSession();
  const user = await client.user.findUnique({
    where: { id: +session.user.id },
    include: {
      tweets: {
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          text: true,
          likes: true,
          image: true,
          createdAt: true,
        },
      },
      likes: {
        take: 10,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          tweet: {
            select: {
              id: true,
              text: true,
              likes: true,
              image: true,
              createdAt: true,
              author: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return (
    <section>
      <h1 className={cls(TAIL.pageTitle)}>Profile</h1>
      <h2>
        {user?.username}({user?.email})
        {user?.avatar && (
          <figure>
            <Image
              src={generateImageUrl(user.avatar, "profileImage")}
              alt={`${user.username}'s Avatar`}
              {...ProfileProps}
            />
          </figure>
        )}
      </h2>
      {user?.profile && <p>{user?.profile}</p>}
      <aside>
        <Link href="/profile/edit" className={cls(TAIL.textLink)}>
          Profile Edit
        </Link>

        <Link href="/profile/password" className={cls(TAIL.textLink)}>
          Password Edit
        </Link>
      </aside>

      {(user?.tweets?.length as number) > 0 && (
        <article>
          <h3>My tweets</h3>
          <ul>
            {user?.tweets.map((tweet) => (
              <Tweet key={tweet.id} tweet={tweet} />
            ))}
          </ul>
        </article>
      )}

      {(user?.likes.length as number) > 0 && (
        <article>
          <h3>Like Tweets</h3>
          <ul>
            {user?.likes.map((like) => (
              <Fragment key={like.id}>
                <Tweet key={like.tweetId} tweet={like.tweet} />
              </Fragment>
            ))}
          </ul>
        </article>
      )}
    </section>
  );
};

export default Page;
