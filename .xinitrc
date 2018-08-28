# Loads Xresources dotfile on boot, mainly for URxvt transparency etc.
xrdb -load ~/.Xresources &

# -R restores the last colorscheme that was in use.
wal -R

# Initiates i3wm
exec i3
