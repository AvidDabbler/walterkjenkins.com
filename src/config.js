export const pburl =
	"https://www.metrostlouis.org/RealTimeData/StlRealTimeVehicles.pb?cacheBust=" +
	new Date().valueOf();
export const mbAccessToken = process.env.NEXT_PUBLIC_MB_ACCESS_TOKEN;

export const notionApiUrl =
	"https://notion-api.splitbee.io/v1/table/093530426e944244b78b868a3738ab42";

export const links = {
	github: "https://github.com/AvidDabbler/",
	linkedin: "https://www.linkedin.com/in/walter-k-jenkins/",
	emailList: "http://www.geostack.xyz/",
};

export const paths = {
	home: "/",
	projects: "/projects",
	blog: "/blog",
	blogArticle: "/blog/:id",
	contact: "/contact",
};
