import React, { useEffect, useContext, Fragment } from "react";
import { Article } from ".";
import { ArticleType } from "../../types";
import { Header } from ".";

export const ArticlesList = ({ articles }: { articles: any[] }) => {
  return (
    <Fragment>
      {articles.map((el: ArticleType, i: number) => (
        <Article key={i} article={el} />
      ))}
    </Fragment>
  );
};

interface NotionItem {
  id: string;
  publish_date: string;
  tags: string[];
  published: boolean;
  name: string;
}

const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export function Articles() {
  const { articles, setArticles } = useContext(appContext);
  const getArticles = async () => {
    const request = (
      await fetch(
        "https://notion-api.splitbee.io/v1/table/beba8785230d43b3ab8916d63ae0e360"
      )
        .then((res) => res.json())
        .catch((e) => console.error(e))
    )
      .filter((item: any) => item.published)
      .sort((a: NotionItem, b: NotionItem) => {
        return (
          new Date(b.publish_date).getTime() -
          new Date(a.publish_date).getTime()
        );
      })
      .reduce((acc: { [k: string]: NotionItem[] }, cur: NotionItem) => {
        const date = new Date(cur.publish_date);
        const month = date.getMonth();
        const yearMonth = `${months[month]} ${date.getFullYear()}`;
        if (!acc[yearMonth]) {
          acc[yearMonth] = [cur];
        } else {
          acc[yearMonth] = [...acc[yearMonth], cur];
        }
        return acc;
      }, {});
    console.log({ request });
    setArticles(request);
  };

  useEffect(() => {
    getArticles();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="my-auto h-full">
      <div className="bg-orange h-px"></div>
      <Header />
      <div className="bg-blue topo mp-14 flex h-full min-h-screen w-full flex-col items-center pt-14 text-white">
        <div className="my-14">
          <h1 className="text-3xl">Blog</h1>
          {!articles
            ? "loading..."
            : Object.keys(articles).map((yearMonth: any) => {
                return (
                  <Fragment>
                    <h2 className=" mb-3 mt-10 text-xl font-bold">
                      {yearMonth}
                    </h2>
                    <ArticlesList articles={articles[yearMonth]} />
                  </Fragment>
                );
              })}
        </div>
      </div>
    </div>
  );
}
