import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import { DateTime } from "luxon";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyVitePlugin);

  // Vite resolves /assets/... from Eleventy's output, so the files must be copied there
  eleventyConfig.addPassthroughCopy("src/assets");

  // Luxon date filter
  eleventyConfig.addFilter("date", (date, format = "yyyy-MM-dd") => {
    if (!date) return "";

    let dateTime;

    if (date instanceof Date) {
      dateTime = DateTime.fromJSDate(date, { zone: "utc" });
    } else if (typeof date === "string") {
      dateTime = DateTime.fromISO(date, { zone: "utc" });
    } else if (typeof date === "number") {
      dateTime = DateTime.fromMillis(date, { zone: "utc" });
    }

    return dateTime?.isValid ? dateTime.toFormat(format) : "";
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}