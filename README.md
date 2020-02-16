# I3WM .files

Dot files for my Arch Linux (5.5.2) + i3wm setup used on my Dell XPS 15 9560.

(NOTE: These are the i3wm dotfiles, my bspwm setup is located in the [bspwm branch](https://github.com/Alexrazz/dotfiles/tree/bspwm))

## Table of contents

<!--ts-->
   * [Screenshots](#screenshots)
   * [Packages](#packages)
      * [Primary](#primary)
      * [Secondary](#secondary)
   * [Installation](#installation)
   * [Device/hardware specific settings](#devicehardware-specific-settings)
      * [Disabled modules](#disabled-modules)
      * [Disabling turbo boost](#disabling-turbo-boost)
      * [Enable powertop auto tune](#enable-powertop-auto-tune)
      * [Kernel parameters](#kernel-parameters)
   
   
<!--te-->


## Screenshots

![Screenshot](https://i.imgur.com/QGGdn0f.jpg)

## Packages

### Primary

- `rofi`: Application launcher
- `fish`: Shell
- `urxvt`: Terminal emulator
- `i3`: Window manager
- `dunst`: Notification daemon
- `vim`: Editor
- `vim-plug`: Vim Plugin Manager
- `polybar`: Status bar
- `chromium`: Browser
- `evince`: PDF reader
- `betterlockscreen`: Lock screen
- `libinput`: Touch pad driver
  - `libinput-gestures`: Custom touchpad gestures
- `pywal`: Automatic theming
- `neofetch`: System info
- `ranger`: File explorer

### Secondary

- `w3m`: Used to display images in ranger
- `imgur-screenshot`: Screenclip to imgur
- `maim`: Screenclip to clipboard
- `KeeWeb`: Password manager
- `libsecret`: Github credentials helper (Use gnome-keyring instead though)
- `git-credential-gnome-keyring`: Git credentials helper
- `redshift`: F.lux alternative (tints your screen to make it easier on your eyes)
- `picom`: Compositor
- `pulseaudio / -alsa`: Audio driver
- `Spicetify`: Spotify theming CLI tool
- `NetworkManager`: 'Networking that just works'
  - `nm-applet`: GTK Applet for NetworkManager
- `pamixer`: Pulseaudio manager
- `gotop`: Beautiful TUI activity monitor
- plug
- `xcwd`: Used to open a new terminal in the same directory as the current focused terminal
- Fonts:
  - Tamzen
  - Terminus
  - FontAwesome
  - Adobe Source Code Pro


## Installation

Check out the [Installation](https://github.com/Alexrazz/dotfiles/tree/i3wm/Installation) folder, it includes a installation guide and some setup scripts to assist with installing Arch Linux as fast as possible.


## Device/hardware specific settings

These are some of the tweaks I've made for my specific setup, most of them are to optimize battery lifetime

### Disabled modules

```
/etc/modprobe.d/blacklist.conf

blacklist nouveau
blacklist nvidia
blacklist psmouse
```
### Disabling turbo boost

```
/etc/systemd/system/disable-turbo-boost.service

[Unit]
Description=Disable Turbo Bost on Intel CPU

[Service]
ExecStart=/bin/sh -c "/usr/bin/echo 1 > /sys/devices/system/cpu/intel_pstate/no_turbo"      
ExecStop=/bin/sh -c "/usr/bin/echo 1 > /sys/devices/system/cpu/intel_pstate/no_turbo"      

[Install]
WantedBy=sysinit.target
```

### Enable powertop auto tune

*TLP can be used instead of this if you want a less aggressive power tuning.*

```
/etc/systemd/system/powertop.service

[Unit]
Description=Powertop tunings

[Service]
ExecStart=/usr/bin/powertop --auto-tune
RemainAfterExit=true

[Install]
WantedBy=multi-user.target
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

