export interface LessonType {
	id:              string;
	tags:            string[];
	link:            string;
	technology:      string[];
	experience:      string;
	author:          string[];
	file_under:    string;
	path: string[];
	name:            string;
}

export interface ArticleType {
	id: string;
	tags: string[];
	link: string;
	technology: string[];
	experience: string;
	author: string[];
	file_under: string;
	publish_date: string;
	path: string[];
	name: string;
}

export interface SelectOption {
	value: string | number;
	label: string | number;
	color: string;
}

export interface BlogPostType {
	id: string;
}

export interface LessonType {
	id:              string;
	tags:            string[];
	link:            string;
	technology:      string[];
	experience:      string;
	author:          string[];
	file_under:    string;
	path: string[];
	name:            string;
}

export interface ArticleType {
	id: string;
	tags: string[];
	link: string;
	technology: string[];
	experience: string;
	author: string[];
	file_under: string;
	publish_date: string;
	path: string[];
	name: string;
}

export interface SelectOption {
	value: string | number;
	label: string | number;
	color: string;
}

export interface BlogPostType {
	id: string;
}

export type Author = {
  name: string
  picture: string
}

export type Post = {
  slug: string
  title: string
  date: string
  coverImage: string
  author: Author
  excerpt: string
	tags: string[]
  ogImage:  string
  content: string
}

