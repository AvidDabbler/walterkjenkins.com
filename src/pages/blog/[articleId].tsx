import React, { useState, useEffect } from "react";
import { NotionRenderer } from "react-notion";
import "prismjs/themes/prism-tomorrow.css";
import { Header } from "~/components";
import { Footer } from "~/components/Footer";
import { useRouter } from "next/router";

function BlogPost() {
  const router = useRouter();
  const [recordMap, setRecordmap] = useState<any>(null);

  const getArticles = async () => {
    const request = await fetch(
      `https://notion-api.splitbee.io/v1/page/${router.query.articleId}`
    ).then((res) => res.json());
    setRecordmap(request);
  };

  useEffect(() => {
    if (router.query.articleId) getArticles();
    // eslint-disable-next-line
  }, [router.query]);

  return (
    <div>
      <div className="mt-auto h-full">
        <Header />
        <div className="bg-orange h-px"></div>
        <div className="bg-blue topo mp-14 flex h-full min-h-screen w-full flex-col items-center pt-14 text-white">
          <div className="my-14 w-full p-14 md:w-2/3">
            {recordMap && (
              <NotionRenderer
                hideHeader={true}
                blockMap={recordMap}
                fullPage={true}
              />
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default BlogPost;
