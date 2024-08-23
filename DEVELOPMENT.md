# Environment Setup
The following instructions are for installing on MacOS.

## Jekyll
Ref: https://jekyllrb.com/docs/installation/macos/

Jekyll is programmed in Ruby, so we will need to install Ruby and its respective gems. It is recommended to use `chruby` as the Ruby version manager because of its simplicity for changing Ruby versions.
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
Install node, which is used to run thumbnail JS script:
```
$ brew install node
```

# Preview Site (Locally)
For a basic build without re-mapping image tags:
```
$ bundle exec jekyll serve
```

For a complete build, run the custom rake script:
```
$ bundle exec rake custom_serve
```

View webpage at: http://localhost:4000/

# Building and Deploying Site
## GitHub Actions
The build and deploy process is performed via a GitHub action workflow. Because of 3rd party plugin(s) utilizations, a custom workflow must be written. In this repository, the workflow is defined in `.github/workflows/jekyll-custom.yml`. This includes changing the source to "GitHub Actions" at the Pages section of the Settings tab.

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
