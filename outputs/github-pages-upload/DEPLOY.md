# Public URL Publishing

This project can be published as a static website because each daily report is a standalone HTML file.

## Recommended Option: GitHub Pages

Use this when you want a public URL such as:

`https://YOUR_ID.github.io/people-impact-explorer/데일리_인사시사점리포트_YYYYMMDD.html`

## One-Time Setup

1. Create a GitHub repository named `people-impact-explorer`.
2. Upload this project folder to that repository.
3. In the GitHub repository, open `Settings > Pages`.
4. Set the source to the main branch and the root folder.
5. After GitHub Pages is enabled, open the generated site URL.

## Daily Output Rule

Daily reports should continue to be generated under:

`outputs/데일리_인사시사점리포트_YYYYMMDD.html`

If GitHub Pages publishes from the repository root, the daily report URL will usually be:

`https://YOUR_ID.github.io/people-impact-explorer/outputs/데일리_인사시사점리포트_YYYYMMDD.html`

## Automation Change Needed

After the GitHub repository is connected, the daily automation should do three things:

1. Generate the daily HTML report.
2. Publish or push the updated `outputs/` file to GitHub.
3. Send the final GitHub Pages URL to the user.

## Notes

- Do not publish private or internal company information.
- Use only public news, public reports, and public source URLs.
- Keep `outputs/template.html` unchanged.
