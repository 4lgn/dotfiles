#!/bin/bash
sudo pacman -S xorg xorg-xinit feh rofi ranger rxvt-unicode i3-wm dunst vim neofetch python3 fish python-pip imagemagick terminus-font ttf-font-awesome adobe-source-code-pro-fonts noto-fonts noto-fonts-cjk noto-fonts-emoji noto-fonts-extra --noconfirm


read -p 'Install virtualbox additions? (y/N): ' choice

if [ "$choice" = "y" ]; then
    sudo pacman -S xf86-video-vmware virtualbox-guest-utils virtualbox-guest-modules-arch --noconfirm
fi


git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si --noconfirm


yay -S tamzen-font polybar --removemake --nocleanmenu --nodiffmenu --noeditmenu

sudo pip3 install pywal

cp -rT ~/dotfilesv2 ~

curl https://images.wallpaperscraft.com/image/lupine_flowers_blue_159513_7360x4912.jpg > ~/wallpaper.jpg

echo "=============="
echo "==== DONE ===="
echo "=============="
echo "$ xstart"
echo "$ feh --bg-fill ~/wallpaper.jpg"
echo "$ wal -i ~/wallpaper.jpg"
