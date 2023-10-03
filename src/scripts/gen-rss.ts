import { generateRssFeed } from "../utils/blog";

const update = async () => {
try {
  console.log("Starting to generate RSS feed");
    await generateRssFeed();
    console.log("Updated rss feed");
  } catch (e) {
    console.error(e);
  }
};

update();