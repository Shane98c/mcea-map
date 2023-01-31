var ghpages = require("gh-pages");

ghpages.publish(
  "public", // path to public directory
  {
    branch: "gh-pages",
    repo: "https://github.com/sveltejs/template.git",
    user: {
      name: "Shane",
      email: "shane98c@gmail.com",
    },
  },
  () => {
    console.log("Deploy Complete!");
  }
);
