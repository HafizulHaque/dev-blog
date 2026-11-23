export default {
  eleventyComputed: {
    permalink: (data) =>
      data.draft ? false : `/articles/${data.page.fileSlug}/index.html`,
    eleventyExcludeFromCollections: (data) => Boolean(data.draft),
  },
};
