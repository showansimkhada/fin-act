# Linux Installation on MacBook pro with T2 chip

## Introduction
This guide provides an instructions to install the Linux on the Mac system using the partition to boot to the Linux OS.

## Table of Contents
1. [Disable security, download Linux and Create Partitions](#disable-security-download-linux-and-create-partitions)
2. [Install brew and QEMU](#install-brew-and-qemu)
3. [Create a LIVE ISO boot partition](#create-a-live-iso-boot-partition)
4. [Edit the grub configuration file](#edit-the-grub-configuration-file)
5. [Boot into the LIVE ISO and connect to WLAN](#boot-into-the-live-iso-and-connect-to-wlan)
6. [Follow the guides for the your specific Linux Distros until to reboot your system](https://wiki.t2linux.org/distributions/overview/)
7. [Copy the network files](#copy-the-network-files)

## Disable security, download Linux and Create Partitions
If your are in your MacOS system now go to the setting and go to the privacy and security and turn off the File Vault and Encryption.

Download the ISO file for you Linux Distribution as I have done this for Arch Linux. Rename that file to "Linux" or "Arch".

Create a partition for the EFI BOOT drive and give it a size of around 2.5 GB. Now format that drive to a Fat system or run the below command in terminal:
sudo diskutil eraseVolume FAT32 "BOOT" /dev/XXXXXX

Copy the ISO image file to the boot directory.

Create a root partition for the Linux system and format it with ExFat system.

[Go to table of contents](#table-of-contents)

## Install brew and QEMU
We are installing the QEMU VM for macOS which I think was the most effective but later I think you can choose any one of the VM that you are used to.

Lauch the VM with the disk image and pass the boot disk only.

The command to run for the QEMU is
sudo qemu-system-x86_64 \
-accel hvf \
-cpu Penryn \
-m 4G \
-smp 4 \
-boot d \
-drive file=/users/showansimkhada/downloads/name,media=cdrom \
-drive file=/dev/XXXX,if=virtio,format=raw \
-drive file=/usr/local/opt/qemu/share/qemu/edk2-x86_64-code.fd,if=pflash,readonly=on \
-vga std

[Go to table of contents](#table-of-contents)

## Create a Live ISO boot partition
Once you are in the installation process run the following commands
loadkeys us
timedatectl list-timezones
timedatectl set-timezone "Your time zone from above"
lsblk -l
mount /dev/XXXXX /mnt
ls /mnt  # to track what's there
mkdir /mnt/iso
sudo mount -o loop /path/to/file /mnt/iso
cp -r /mnt/iso/* /mnt/
ls -l /mnt  #verify all files are copied

[Go to table of contents](#table-of-contents)

## Edit the grub configuration file
vim /mnt/boot/boot/grub/grub.cfg
i # to edit the configuration file

Go to the menuentry section and look for the word with search now make sure all are as below:
<hr>
search —no-floppy —set=root --label BOOT
<hr>
set iso_path=/arch/x86_64/airootfs.sfs
<hr>
loopback loop /arch.iso
<hr>
linux (loop)/arch/boot/x86_64/vmlinuz-linux-t2 img_dev=LABEL=BOOT img_loop=/arch.iso archisobasedir=arch quite splash intel_iommu=on iommu=pt pcie_ports=compat
<hr>
initrd (loop)/arch/boot/intel-ucode.img (loop)/arch/boot/x86_64/initramfs-linux-t2.img
<hr>

You can remove all the menuentries below this

Press ctrl+c and enter :wq to write and exit

Well done you have successfully created a Live ISO partition.

Verify that by removing the ISO file from the command you passed earlier and just pass the boot partition.

Ther should be a GRUB 2 Bootloader.

[Go to table of contents](#table-of-contents)

## Boot into the LIVE ISO and connect to WLAN

Reboot your mac and hold Command + R to go into recovery mode.
Now login and select the Startup Utility and select Low security and allow boot from removable device, and external hard drives.

Run the following commands
<hr>
iwctl
<hr>
[iwd#] station list
<hr>
[iwd#] station wlan* scan
<hr>
[iwd#] station wlan* get-networks
<hr>
[iwd#] station wlan* connect SSIDNAME
<hr>
Passphrase: enter the passphrase
<hr>
ping archlinux.org
<hr>
lsblk
<hr>
mkfs.ext4 /dev/XXXXXX
<hr>
tune2fs -L "Linux" /dev/XXXXX
<hr>
tune2fs -L "BOOT" /dev/XXXX
[Top table of contents](#table-of-contents)

## Follow the guides for the your specific Linux Distros until to reboot your system
Before you follow don't run grub-install.
Go to the this site to follow the instructions and skip the steps up to the install essential pacakages and before exit the chomode follow the below instructions. 
Don't run grub-install.

## Copy the network files
exit
<hr>
cp -r /etc/systemd/network/* /mnt/etc/systemd/network/*
<hr>
check all the required kernals are in the /mnt/boot folder
<hr>
sudo useradd -m username #-m is to create the home directory
<hr>
passwd username
<hr>
enter the password for your username
<hr>
make sure you have created a user before you start any desktop manager.
<hr>

## Edit the grub configuration file to boot to the Linux system
Login to you macOS.
Your boot device is mounted in the system and goto the folders and open both grub.cfg files from the both location. Remember we are editing for the /boot/boot/grub/grub.cfg

Make sure the file of /efi/boot/bootx64.efi have a file size of around 6 - 7 MB.

Now copy the first menuentry from /boot/grub/grub.cfg and paste it 
into the file /boot/boot/grub/grub.cfg 
In this file you can remove any other unneeded entries.

To confirm it's running run it into the VM's and make some changes if required. Always remember /EFI/BOOT/

Now it will be easy if you do this by using VM and don't run any grub commands (grub-mkconfig or grub-install) when you are in VM.

Misson completed

Thanks