#!/usr/bin/env fish

# Command color - #4
set -U fish_color_command (sed '5q;d' ~/.cache/wal/colors)

set -U fish_color_param (sed '4q;d' ~/.cache/wal/colors)

set -U fish_color_quote (sed '3q;d' ~/.cache/wal/colors)

set -U fish_color_redirection (sed '6q;d' ~/.cache/wal/colors)

set -U fish_color_error (sed '2q;d' ~/.cache/wal/colors)

set -U fish_color_comment (sed '8q;d' ~/.cache/wal/colors)

set -U fish_color_autosuggestion (sed '7q;d' ~/.cache/wal/colors)

# ~/Scripts/qutebrowser_reload.py
