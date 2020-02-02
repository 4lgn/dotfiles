# Dotfiles
Dot files for my Arch Linux (5.4.15) + i3wm setup used on my Dell XPS 15 9560.

# Screenshots

![Screenshot](https://i.imgur.com/fapJT2j.jpg)
![Screenshot](https://i.imgur.com/GCo2JT6.png)
![Screenshot](https://i.imgur.com/XYJDoKI.png)
![Screenshot](https://i.imgur.com/MqSP16T.png)
![Screenshot](https://i.imgur.com/U634tEQ.jpg)
![Screenshot](https://i.imgur.com/lgGRzTH.png)
![Screenshot](https://i.imgur.com/BREgiaX.jpg)
![Screenshot](https://i.imgur.com/GFbw078.jpg)

## Primary packages

- rofi
- fish
- urxvt
- i3
- dunst
- vim
- polybar
- chromium
- evince
- betterlockscreen
- libinput
  - libinput-gestures
- pywal
- neofetch

## Secondary packages/dependencies

- w3m
- imgur-screenshot
- maim
- KeeWeb
- libsecret
- redshift
- compton
- pulseaudio / -alsa
- `NetworkManager`: 'Networking that just works'
  - `nm-applet`: GTK Applet for NetworkManager
- `pamixer`: Pulseaudio manager
- `gotop`: Beautiful TUI activity monitor
- plug
- `xcwd`: Used to open a new terminal in the same directory as the current focused terminal
- `git-credential-gnome-keyring`: Git credentials helper
- Fonts:
  - Tamzen
  - Terminus
  - FontAwesome
  - Adobe Source Code Pro

## Device/hardware specific settings

Bumblebee to blacklist nvidia GPU for power saving.

/etc/modprobe.d/blacklist.conf:

```
blacklist nouveau
blacklist nvidia
blacklist psmouse
```

### Kernel parameters

Below are the kernel parameters I would pass to all linux installations, mainly based upon some shortcomings and oddities that I have experienced with the Dell XPS 15.

```
add_efi_memmap rw quiet splash i915.modeset=1 nouveau.modeset=0 acpi_rev_override=1
```

- `i915.modeset=1`: Ensure iGPU is loaded early by using KMS. (Might fix boot loader/display manager not being shown)
- `nouveau.modeset=0`: Block nouveau from managing the GPU. (This bundled together with the previous parameter allows X to run entirely on my iGPU, as there are no drivers loaded for the GPU; this drastically improves battery life for obvious reasons)
- `acpi_rev_override=1`: This is the most important setting, as this prevents some freezing issues I had due to the nvidia card not working well with ACPI.
- `quiet` and `splash`: Personal preference to not show every boot message at boot (I'd just remove these if something seems wrong)
- `add_efi_memmap` and `rw`: Probably not needed anymore and `rw` are usually default anyways.
