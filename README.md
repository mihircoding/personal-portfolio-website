My personal portfolio website showing some of my favorite projects and interests. 

Website Design Forked from https://github.com/machadop1407/react-tailwind-personal-portfolio/tree/main 
## Blog

Each page under `/blog/` comes from one Markdown file in `posts/`.

1. Copy `posts/_template.md` to `posts/YYYY-MM-DD-short-name.md`.
2. Fill in `title`, `date`, `tags` (`cpp`, `os`) and `summary`, then write the page below the `---`.
3. Commit and push to `main`. The page goes live at `/blog/short-name/`.

Leave out `date` for notes that don't belong to a day (they show as "Earlier notes" after all the days, e.g. `posts/ostep-notes.md`).

Diagrams: put an SVG in `posts/figures/` and add a fenced block whose language is `figure`. The first line is the file name without `.svg`, the rest is the caption:

````md
```figure
fifo
FIFO with one long job. Based on OSTEP Figure 7.2.
```
````

Shapes can use the classes in `src/index.css` (`.fg`, `.mu`, `.ja`–`.jd`, ...) so they follow light and dark mode.

`draft: true` keeps a page out of the deployed site; it still shows in `npm run dev`. `npm test` checks the blog generator.
