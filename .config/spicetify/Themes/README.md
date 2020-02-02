# spicetify community themes

This is a collection of themes for [spicetify](https://github.com/khanhas/spicetify-cli), a command-line tool to customize Spotify; you can add your own theme simply by opening a Pull Requests (more info in the Contributions section).

### **You can find a preview of all the themes in the [wiki](https://github.com/morpheusthewhite/spicetify-themes/wiki/Themes-preview).**

## Installation

(If you use Arch Linux you can find this project on the [AUR](https://aur.archlinux.org/packages/spicetify-themes-git/))

Once you cloned the repository you'll need to put the files into the Themes folder. This varies between operating systems. The example shows the `Themes` directory for Linux. For other operating systems, see the `Themes` folder location [here](https://github.com/khanhas/spicetify-cli/wiki/Customization#themes).

```bash
cd spicetify-themes
cp -r * ~/.config/spicetify/Themes
```



After that you can choose which theme to apply just by running `spicetify config current_theme THEME_NAME`

## Contributions

If you want to add your theme:

- Fork this repository
- Create another folder with your theme name. The theme name should consist of one word starting with an uppercase letter and shouldn't contain `spicetify` or any whitespace in it
- Copy `color.ini` and `user.css` to it
- Create a `README.md` in it with the following structure 
```markdown
# THEME_NAME

## Screenshots

[Put at least one image here]

## More (optional)

[Author name and/or any other info about the theme]

```
- Open a Pull Request

**Thanks to all the contributors.**
