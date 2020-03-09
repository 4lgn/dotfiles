#!/bin/sh

# ====================================
# Install packages
# ====================================

read -p 'Install virtualbox additions? (y/N): ' choice

if [ "$choice" = "y" ]; then
    sudo pacman -S xf86-video-vmware virtualbox-guest-utils virtualbox-guest-modules-arch --noconfirm
fi

sudo pacman -S xorg xorg-xinit feh rofi ranger bspwm sxhkd dunst vim neofetch python3 zsh noto-fonts noto-f    onts-emoji chromium ttf-font-awesome otf-font-awesome pulseaudio pulseaudio-alsa pamixer wget unzip firefox     picom wget make --noconfirm --needed


rm -rf yay
git clone https://aur.archlinux.org/yay.git
cd yay
makepkg -si --noconfirm


yay -S polybar rxvt-unicode-256xresources spicetify-cli ttf-iosevka python-ueberzug spotify betterlockscree    n --needed --removemake --nocleanmenu --nodiffmenu --noeditmenu --noconfirm


# ====================================
# Download background
# ====================================

curl https://i.imgur.com/XCaXGFB.png > ~/Wallpapers/gruvbox.png

# ====================================
# Polybar font
# ====================================

curl https://raw.githubusercontent.com/adi1090x/polybar-themes/master/polybar-8/fonts/icomoon-feather.ttf >     icomoon-feather.ttf
mkdir ~/.local/share/fonts
mv icomoon-feather.ttf ~/.local/share/fonts/
fc-cache -vf ~/.local/share/fonts/

# ====================================
# Polybar arrow fix
# ====================================

wget https://github.com/powerline/powerline/raw/develop/font/PowerlineSymbols.otf
wget https://github.com/powerline/powerline/raw/develop/font/10-powerline-symbols.conf
mv PowerlineSymbols.otf ~/.local/share/fonts/
fc-cache -vf ~/.local/share/fonts/
mkdir ~/.config/fontconfig
mkdir ~/.config/fontconfig/conf.d
mv 10-powerline-symbols.conf ~/.config/fontconfig/conf.d/


# Make pacman display colored output
sudo sed -i 's/#Color/Color/g' /etc/pacman.conf


# =========================================
# Install oh my zsh and zsh-autosuggestions
# =========================================

sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh) --unattended --keep-zshrc"
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions


echo "=============="
echo "==== DONE ===="
echo "=============="
echo "$ chsh -s /bin/zsh"
echo "$ startx"
echo "$ feh --bg-fill ~/wallpaper.png"

# Change to zsh
zsh
