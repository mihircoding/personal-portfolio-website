My personal portfolio website showing some of my favorite projects and interests. 

Website Design Forked from https://github.com/machadop1407/react-tailwind-personal-portfolio/tree/main 
## Blog

Each page under `/blog/` comes from one Markdown file in `posts/`.

1. Copy `posts/_template.md` to `posts/YYYY-MM-DD-short-name.md`.
2. Fill in `title`, `date`, `tags` (`cpp`, `os`, `apps`) and `summary`, then write the page below the `---`.
3. Commit and push to `main`. The page goes live at `/blog/short-name/`.

`draft: true` keeps a page out of the deployed site; it still shows in `npm run dev`. `npm test` checks the blog generator.
