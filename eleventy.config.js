import EleventyVitePlugin from '@11ty/eleventy-plugin-vite';

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyVitePlugin);

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: '_site',
    },
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
}