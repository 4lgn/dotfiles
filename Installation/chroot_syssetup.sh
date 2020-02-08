#!/bin/bash
read -p 'Region: ' region
read -p 'City: ' city
read -p 'Hostname: ' hostname
read -p 'Username: ' username


timedatectl set-ntp true
timedatectl set-timezone "${region}/${city}"
ln -sf /usr/share/zoneinfo/${region}/${city} /etc/localtime
hwclock --systohc



sed -i 's/#en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/g' /etc/locale.gen
locale-gen

echo "LANG=en_US.UTF-8" > /etc/locale.conf


echo "${hostname}" > /etc/hostname

printf "127.0.0.1\tlocalhost\n::1\t\tlocalhost\n127.0.1.1\t${hostname}.localdomain\t${hostname}\n" > /etc/hosts

systemctl enable NetworkManager.service
systemctl start NetworkManager.service

sed -i 's/# %wheel ALL=(ALL) ALL/%wheel ALL=(ALL) ALL/g' /etc/sudoers
useradd -m -G wheel -s /bin/bash ${username}


echo "=================================="
echo "========== FINAL STEPS ==========="
echo "=================================="
echo ""
echo ""
echo "========== SET ROOT PASSWORD =========="
echo "$ passwd"
echo ""
echo "========== MAKE USER =========="
echo "$ passwd ${username}"
echo ""
echo "========== INSTALL BOOT LOADER =========="
echo "$ grub-install --target=i386-pc /dev/sdX"
echo "$ grub-mkconfig -o /boot/grub/grub.cfg"
echo ""
echo ""
echo "========== DONE =========="
echo "$ exit"
echo "$ umount -R /mnt"
echo "$ reboot"
