import React, { useState, useEffect } from "react";
import { NotionRenderer } from "react-notion";
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { Header } from "~/components";
import { Footer } from "~/components/Footer";
import { useRouter } from "next/router";

function BlogPost() {
	const router = useRouter();

	const [recordMap, setRecordmap] = useState<any>(null);

	const getArticles = async () => {
		const request = await fetch(
			`https://notion-api.splitbee.io/v1/page/${router.query.articleId}`,
		).then((res) => res.json());
		setRecordmap(request);
		console.log(request);
	};

	useEffect(() => {
		getArticles();
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			<div className="mt-auto h-full">
				<Header />
				<div className="bg-orange h-px"></div>
				<div className="flex flex-col w-full h-full min-h-screen bg-blue topo items-center pt-14 text-white mp-14">
					<div className="my-14 p-14 w-full md:w-2/3 ">
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