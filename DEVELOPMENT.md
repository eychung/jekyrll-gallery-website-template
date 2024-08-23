# Environment Setup
The following instructions are for installing on MacOS.

## Jekyll
Ref: https://jekyllrb.com/docs/installation/macos/

Use `chruby` because of its simplicity.
```
$ brew install chruby ruby-install xz

# Install latest version of Ruby, supported by Jekyll
$ ruby-install ruby 3.1.3

$ echo "source $(brew --prefix)/opt/chruby/share/chruby/chruby.sh" >> ~/.zshrc
$ echo "source $(brew --prefix)/opt/chruby/share/chruby/auto.sh" >> ~/.zshrc
$ echo "chruby ruby-3.1.3" >> ~/.zshrc # run 'chruby' to see actual version

$ gem install jekyll

$ gem install jekyll bundler
```

## Node
Install node, which is used to run thumbnail script:
```
$ brew install node
```

# Edit Site
To create a new post:
1. Create a folder with `YYYY-MM-dd` format in `assets/images` and drop the images into that directory.
2. Create a new `.md` file in `_posts` with format `YYYY-MM-dd-photos.md`, where the `YYYY-MM-dd` matches that in step 1.
3. With the file created in step 2, use the below, replacing `<TITLE>` and `<SUBTITLE>` as well as the `YYYY-MM-dd` from step 1.
4. Replace `<IMAGE_FILE>` with the image file basename; it leverage the folder structure and pull the absolute path based on the date.
```
---
layout: gallery
title: "<TITLE>"
subtitle: "<SUBTITLE>"
date: YYYY-MM-dd
categories: gallery
excerpt: "<EXCERPT>"
cover: <IMAGE_FILE>
---
```

# Building and Deploying Site
The build and deploy process is performed via a GitHub action workflow. Because of 3rd party plugin(s) utilizations, a custom workflow must be written. This includes changing the source to "GitHub Actions" at https://github.com/eychung/eychung.github.io/settings/pages.

# Preview Site
For a basic build without re-mapping image tags:
```
# First cd into docs/
$ bundle exec jekyll serve
```

For a complete build, run the custom rake script:
```
# First cd into docs/
$ bundle exec rake custom_serve
```

View webpage at: http://localhost:4000/

# Plugins
## JavaScript
### PhotoSwipe
https://photoswipe.com/

PhotoSwipe is a JavaScript image gallery and lightbox.

In this project, it is used to showcase the full resolution images in a modal window for gallery-full and gallery-post layouts.

## Jekyll
### jekyll-thumbnail-img
https://github.com/abpaudel/jekyll-thumbnail-img

jekyll-thumbnail-img is a Jekyll plugin to generate image thumbnails with specified width.

In this project, it is used to optimize loading the gallery page as well as the cover photos by building and sourcing thumbnail versions of the full resolution images.
