# Simple arch installation walkthrough

Installing arch is easy.. use these small scripts and this guide to get you up and running with a usable setup based off of my dotfiles within 10 min. (depending on your internet connection)

If something goes wrong, please consult the Arch Wiki and their installation guide; you will find your answers there.

Right.. let's get started

## Partitioning

If the following directory exists `/sys/firmware/efi`, you have booted in UEFI mode, otherwise you're in BIOS.

### UEFI

If you are in UEFI mode, you should probably partition your disk using GPT by using `gdisk`.

Check if you have an EFI System Partition (ESP) (if you are dual booting, you most likely will). Determine whether you want to use this as your ESP or create a new one (pref. with ~550MiB); use gdisk code `ef00`, and format it as FAT-32.


### BIOS

If you are dual-booting with Windows and you're in BIOS mode, you should use MBR (hopefully this is not the case)

Otherwise, feel free to convert your disk to GPT (you can run `gdisk` and it will notify you if it's not possible)

### Partition scheme and formatting

In the following section you should **NOT** just copy the commands and make all the shown partitions. Please only create/format/mount the partitions **YOU** need. Change the partition numbers accordingly to match yours!

Since you're following this guide, let's not bother with having a separate /home partition, thus the partition scheme will look like the following:

| Partition   | Mount      | Type   | Size    | When?                                                                          |
|-------------|------------|--------|---------|--------------------------------------------------------------------------------|
| `/dev/sdX1` | `[BOOT]`   | `ef02` | 1MiB    | If you are using GRUB with BIOS/GPT                                            |
| `/dev/sdX2` | `/mnt/efi` | `ef00` | 512MiB  | If you are using UEFI                                                          |
| `/dev/sdX3` | `[SWAP]`   | `8200` | 2G      | Allocate at least your amount of RAM if you want hibernation (suspend to disk) |
| `/dev/sdX4` | `/mnt`     | `8300` | MAX     | Allocate rest of the available space to your root partition.                   |

Now format your partitions as needed

```
$ mkfs.ext4 /dev/sdX4
$ mkswap /dev/sdX3
$ swapon /dev/sdX3
$ mkfs.fat -F 32 /dev/sdX2
```

Now mount your partitions

```
$ mount /dev/sdX4 /mnt
$ mount /dev/sdX2 /mnt/efi
```

## Strap it up

Now we want to download the packages we are going to need for our very barebones basic linux system. Here's a list of the packages I usually like to install asap.

Protip: doublecheck your `/etc/pacman.d/mirrorlist` and make sure servers that are close to you are prioritized over slow mirrors.

```
$ pacstrap /mnt base base-devel linux linux-firmware linux-headers linux-lts-headers git man-db networkmanager sudo vim
```

## Fstab

Generate your fstab file for the partitions you created; feel free to double-check that all partitions look correct.

```
$ genfstab -U /mnt >> /mnt/etc/fstab
```

## Chroot

Let's check out the system!

```
$ arch-chroot /mnt
```

When you have changed root into your system, run the `chroot_syssetup.sh` script and following the prompts; this will setup a bunch of generic settings for your system.

## Install a boot loader

This is the only step that you can easily mess up, you might want to go read up on the Wiki if you haven't done this before.

## Rebooting

```
$ exit
$ umount -R /mnt
$ reboot
```

Remember to cross your fingers that you didn't fuck up your boot loader installation.

## Copying dotfiles

If you want a quick-start on your new Arch install, feel free to run the `init_install.sh` script to bootstrap your system with my setup.
