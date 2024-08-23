# Prerequisite
To build the template and run your website, you will need:
- MacOS
- GitHub account
- Programs:
  - (Recommended) Git
  - (Recommended) Code editor (ex. VS Code, vim, etc.)

For advanced usage of the template such as customization, you may need to learn the following languages:
- CSS
- HTML
- [Liquid](https://shopify.github.io/liquid/)
- [Markdown](https://www.markdownguide.org/)
- [JavaScript](https://www.javascript.com/)

# Setup Instructions
The below instructions are intended for those without a (or with a minimal) programming background who want to simply use the template with a close to out-of-box experience. Note, this will still require you to setup your development environment as you will need to run tag indexing with JavaScript (via node) and thumbnail generation with Ruby (gem).

## Use Template
1. When you are logged in, click on the "Use this template button" at https://github.com/eychung/jekyrll-gallery-website-template and click the "Create a new repository" selection.
2. On the "Crate a new repository" page, enter your own repository name and then, click the "Create repository" button.

## Update Repository Settings
1. In your newly created repository, click the "Settings" tab in the header bar.
2. On the right side under "Code and automation" section, click on "Pages" link.
3. On the new left side section under "Build and deployment" section, change Source from "Deploy from a branch" to the "GitHub Actions" selection. This will enable the custom workflow defined in `.github/workflows/jekyll-custom.xml` by default, and will be used for CICD (continuous integration and continuous delivery).

## Setup Environment
Follow the "Environment Setup" section in `DEVELOPMENT.md`.

# Edit Site
The template mainly leverages both **folder structure** and **dates** to construct posts. All images will be posted into the main gallery by default, so no additional steps are needed on top of creating

## Preparing Images (Optional)
If you will like filtering enabled in the main gallery, you will need to tag the photos. Because the (metadata) key used in different tagging systems vary betweeen OS and/or software, I would recommend tagging them via Windows' default file management. The instructions for tagging on Windows are as follows:
1. Right click on the image(s) and select Properties.
2. Go to the Details tab and click Tags.
3. Type your tag. If you have multiple tags, separate each tag with a semicolon.
4. Click Apply to save changes.

If you do not have a Windows machine, you can use any software that can inject (image) metadata. Make sure the key is "Subject" and that the tags are semicolon delimited.

You can view/modify existing filters in the `docs/assets/filters.xml` file. The value must match the tag in order to register the filter.

## Create New Post
To create a new post:
1. Create a folder with `YYYY-MM-dd` format in `docs/assets/images` and drop the images into that corresponding date subdirectory.
2. Create a new `.md` file under `docs/_posts` with format `YYYY-MM-dd-photos.md`, where the `YYYY-MM-dd` matches that in step 1.
3. With the file created in step 2, copy and paste in the below code snippet.
    ```
    ---
    layout: gallery
    title: <TITLE>
    subtitle: <SUBTITLE>
    date: <YYYY-MM-dd>
    categories: gallery
    excerpt: <EXCERPT>
    cover: <IMAGE_FILE>
    ---
    ```
5. Replace the items in brackets:
   1. **title:** Title for post.
   2. **date:** Use the `YYYY-MM-dd` from step 1.
   3. **subtitle (Optional):** Subtitle for post.
   4. **excerpt (Optional):** Intro or summary of post.
   5. **cover (Optional):** Image file basename (ex. `20190422_144255.jpg`). This file must exist in the corresponding `docs/assets/images/<YYYY-MM-dd>/` directory.

## Publish Changes
If you are using Git (CLI), you can stage the changes, add a commit message, and push the change. In short, the commands are:
```bash
# Adds all files in current directory (ideally be at repository root dir)
$ git add -A .

# Replace <YOUR_COMMIT_MESSAGE> with a meaningful message (ex. Upload US photos)
$ git commit -m "<YOUR_COMMIT_MESSAGE>"

# Publish changes into the repository
$ git push
```

Alternatively, you can perform the modifications on the GitHub website and commit/push changes directly there too.

# Development
For more information on development for customization, please view the `DEVELOPMENT.md` file to learn how to set up your environment, running a local instance before publishing, and information on 3rd party plugins.
