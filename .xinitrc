# Loads Xresources dotfile on boot, mainly for URxvt transparency etc.
xrdb -load ~/.Xresources &

# -R restores the last colorscheme that was in use.
wal -R

# Initiates i3wm
exec i3

setxkbmap -layout 'us,dk' -option '' -option 'grp:alt_shift_toggle' -option 'caps:escape'
