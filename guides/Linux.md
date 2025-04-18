# Arch Linux Installation on MacBook pro with T2 chip (18 April 2025).

## Introduction
This guide provides an instructions to install the Linux on the Mac system using the partition to boot to the Linux OS.

## Table of Contents
1. [Disable security, download Linux and Create Partitions](#disable-security-download-linux-and-create-partitions)
2. [Install VM and create a LIVE ISO boot partition](#install-vm-and-create-a-live-iso-boot-partition)
2. [Edit the grub configuration file](#edit-the-grub-configuration-file)
4. [Connect to WLAN](#connect-to-wlan)
5. [Follow the guides from t2linux and Arch Linux wiki](#follow-the-guides-from-t2linux-and-arch-linux-wiki)
6. [Edit the grub.cfg to boot to Linux System](#edit-the-grubcfg-to-boot-to-linux-system)
6. [Configure the network](#configure-the-network)

## Disable security, download Linux and Create Partitions
Download the ISO file for you Linux Distribution as I have done this for Arch Linux. Rename that file to "arch".
<hr>
Open the diskutility and select the partition.
<hr>
<table>
    <head>
        <tr>
            <td>No</td>
            <td>Label</td>
            <td>Size</td>
            <td>File system (Format type)</td>
        </tr>
    </head>
    <body>
        <tr>
            <td>1.</td>
            <td>Arch</td>
            <td>2.5 GB min</td>
            <td>MS-DOS(FAT)</td>
        </tr>
        <tr>
            <td>2.</td>
            <td>Linux</td>
            <td>50 GB min</td>
            <td>*</td>
        </tr>
        <tr>
            <td>3.</td>
            <td>SWAP</td>
            <td>4 GB min.</td>
            <td>*</td>
        </tr>
    </body>
</table>
Note * it doesn't matter which format method you use for 2 and 3.
<hr>

Copy the ISO image file to the Arch volume.

[Go to table of contents](#table-of-contents)

## Install VM and create a Live ISO boot partition
In this process it is not required to connect to the internet. Select the iso file you downloaded earlier and pass the boot drive in the VM.

Once you are in the installation process run the following commands
<hr>
lsblk -l
<hr>
mount /dev/XXXXX /mnt
<hr>
ls /mnt  # to track what's there
<hr>
mkdir /mnt/iso
<hr>
mount -o loop /path/to/file /mnt/iso
<hr>
cp -r /mnt/iso/* /mnt/
<hr>
ls -l /mnt  # verify all files are copied
<hr>

[Go to table of contents](#table-of-contents)

## Edit the grub configuration file
vim /mnt/boot/boot/grub/grub.cfg
<hr>
i # to edit the configuration file
<hr>
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

Press Ctrl+c and enter :wq to write and exit

Verify that by removing the ISO file from the command you passed earlier and just pass the disk labeled ARCH to verify that we can boot from the IOS file.

Now, reboot your mac and hold Command + R to go into recovery mode.
Now login and select the Startup Utility and select Low security and allow boot from removable device, and external hard drives. Verify again by repeating the process to verify that you hace choosed the low security and allowed boot from removable drives and external hard drives.

[Go to table of contents](#table-of-contents)

## Connect to WLAN
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
[iwd#] known-networks SSIDNAME set-property AutoConnect yes
<hr>
q # to exit
<hr>
ping archlinux.org # to verify we are connected


## Follow the guides from t2linux and Arch Linux wiki.

lsblk
<hr>
we are formatting the remaining two
<table>
    <head>
        <tr>
            <td>No</td>
            <td>Label</td>
            <td>Run Command</td>
        </tr>
    </head>
    <body>
        <tr>
            <td>1.</td>
            <td>Linux</td>
            <td>mkfs.ext4 /dev/nvme0xxxx</td>
        </tr>
        <tr>
            <td>2.</td>
            <td>SWAP</td>
            <td>mkswap /dev/nvme0xxxx</td>
        </tr>
    </body>
</table>
<hr>
blkid # to verify all the labels are correct for each partitions
<hr>
If your patition missed label except swap partition use the following command to give it a label
<hr>
tune2fs -L "LABEL" /dev/XXXXX # replace LABEL with your label name

[Follow this guide to connect to internet](#boot-into-the-live-iso-and-connect-to-wlan)

Skip the step make partition and grub-install as we already have the bootx64.efi. Also include the <b>intel-ucode</b> and vim with <b>t2strap</b> command.

[Go to the first site to make sure your are doing what are exactly required](https://wiki.t2linux.org/distributions/arch/installation/).

[Follow this one to install to install the Arch Linux](https://wiki.archlinux.org/title/Installation_guide)

## Edit the grub.cfg to boot to Linux System
Login to you macOS.
Mount the Arch drive and goto the both folders(/boot/boot/grub/grub.cfg and boot/grub/grub.cfg) and open both grub.cfg files with text edit. Now copy the menueentry from second folder .cfg file and paste it into the first .cfg file remember not to overwrite all the texts we need the ISO Live boots for the later if we need to do troubleshootings.

Make sure the file of /efi/boot/bootx64.efi have a file size of around 6 - 7 MB.

## Configure the network
If not connected to the internet follow the step [Connect to wan](#connect-to-wlan).
<hr>
systemctl status iwd # if service is not started
<hr>
systemctl start iwd
<hr>
systemctl enable iwd # auto start when we reboot every time.
<hr>

Now let's configure some settings.

<hr>
vim /etc/iwd/main.conf
<hr>
add this line to the main.conf file
<hr>
[General]

EnableNetworkConfiguration=true
<hr>
exit the chroot and copy the network files from live ISO to your linux system
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
reboot
<hr>
You should be able to login to the Linux System now.

Thanks