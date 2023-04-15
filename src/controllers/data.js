import { cors_noDate } from './cors';
import repos from '../assets/repos.json';

const fetchedData = async (url) => {
    let response = await fetch(url)
    let data = await response.json()
    return data;
};

const githubData = async (repo, list) => {
    const base = cors_noDate('https://api.github.com/repos/AvidDabbler');
    const full = base + '/' + repo.name;
    const commits = full + '/' + 'commits';
    // add full repo info to repos.json using above function
    // add commits info to repos.json using above function
    repo['commits'] = await fetchedData(commits);
    repo['full'] = await fetchedData(full);
    return repo;
};

let updatedRepos = async () => {
    let list = [];
    repos.forEach(async (el) => {
        list.push(await githubData(el))
    });
    return await list;
};

const blog = async () => {
};

export { githubData, blog, updatedRepos };