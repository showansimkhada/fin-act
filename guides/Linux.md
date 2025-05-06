# Install Kali Linux on MacBook Pro with T2 chip without external keyboard, mouse and usb (4 May 2025).

## Introduction
This guide provides an instructions to install the Linux on the Macbook Pro with T2 chip with out external keyboard, mouse and usb.

## Table of Contents
1. [Disable security, download Kali Linux and Create Partitions](#disable-security-download-linux-and-create-partitions)
2. [Install QEMU VM and boot into the Live System](#2-install-qemu-vm-and-boot-into-the-live-system)
3. [Select Start Installer](#3-select-start-installer)
4. [Adding Linux Kernel for T2](#4-adding-linux-kernel-for-t2)
5. [Install WIFI and Bluetooth firmware](#5-install-wifi-and-bluetooth-firmware)
6. [Edit fstab, grub.cfg and add kernel parameters](#6-edit-fstab-grubcfg-and-add-kernel-parameters)


## 1. Disable security, download Kali Linux and Create Partitions
Download the ISO file for [Kali Linux](#https://www.kali.org/get-kali/#kali-live).Get the [WIFI and Bluetooth drivers](#https://wiki.t2linux.org/guides/wifi-bluetooth/).

<hr>
Open the diskutility and create the required partitions.

If you need a separate BOOT and EFI partitions create 3 partitions as follow.
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
            <td>BOOT</td>
            <td>1 GB</td>
            <td>MS-DOS(FAT)</td>
        </tr>
        <tr>
            <td>2.</td>
            <td>LINUX</td>
            <td>Allocate min size as required by your distros.</td>
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

You can do this with a single partiton as well if you are using dual boot with macOS.
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
            <td>LINUX</td>
            <td>Allocate min size as required by your distros.</td>
            <td>*</td>
        </tr>
    </body>
</table>

Note * it doesn't matter which format method you use.
<hr>

[Go to table of contents](#table-of-contents)

## 2. Install QEMU VM and boot into the Live System
Choose either brew or ports to install QEMU. You can follow this [link](#https://www.qemu.org/download/#macos) to install QEMU.

The command to run the QEMU VM is as follow if it didn't work please go to this [site](#https://www.qemu.org) for more information. Add the command -drive file=/dev/diskXXX,if=virtio,format=raw \ per partitions.

sudo qemu-system-x86_64 \
-accel hvf \
-cpu Penryn \
-m 4G \
-smp 4 \
-boot d \
-drive file=/users/showan/Desktop/Linux/kali.iso,media=cdrom \
-drive file=/dev/diskXXX,if=virtio,format=raw \
-drive file=/usr/local/opt/qemu/share/qemu/edk2-x86_64-code.fd,if=pflash,readonly=on \
-vga std

** Note you need to pass the EFI partition of your mac if you did not create separate BOOT partition.

Select live system and run the following commands in the terminal.

<hr>
<table>
    <head>
        <tr>
            <td>Commands</td>
            <td>Info</td>
        </tr>
    </head>
    <body>
        <tr>
            <td>lsblk -f</td>
            <td>List all avialable disks</td>
        </tr>
        <tr>
            <td>mkfs.ext4 /dev/XXXX</td>
            <td>Creating a root partiton.</td>
        </tr>
        <tr>
            <td>tune2fs -L LINUX /dev/XXX</td>
            <td>Labeling the root system</td>
        </tr>
        <tr>
            <td>mkswap /dev/XXXX</td>
            <td>If you have choose partition to create swap partition</td>
        </tr>
        <tr>
            <td>lsblk -f</td>
            <td>Make sure all partition as listed as you have created for your LINUX system</td>
        </tr>
    </body>
</table>

[Go to table of contents](#table-of-contents)

## 3. Select Start Installer
Continue until Partition Disks appear in the steps. Now select the manual and the result could be as follows
<table>
    <head>
        <tr>
            <th>Virtual disk 1 (vda) -***MB Virtio Device Block</th>
            <td>Size</td>
            <td>File system</td>
        </tr>
    </head>
    <body>
        <tr>
            <td>#1</td>
            <td>***</td>
            <td>fat32</td>
        </tr>
    </body>
</table>

<table>
    <head>
        <tr><th>Virtual disk 2 (vdb) -***GB Virtio Device Block</th></tr>
    </head>
    <body>
        <tr>
            <td>#1</td>
            <td>***</td>
            <td>swap</td>
        </tr>
    </body>
</table>

<table>
    <head>
        <tr><th>Virtual disk 3 (vdc) -***GB Virtio Device Block</th></tr>
    </head>
    <body>
        <tr>
            <td>#1</td>
            <td>***</td>
            <td>ext4</td>
        </tr>
    </body>
</table>

Now select the each file system either fat32, swap or ext4 and select use as option and select correct file system for each partition and select mount point as /boot/efi and / for fat32 and ext4 respectively then select finish partitioning and write changes to disk and start Install the system. Reboot and boot into the Kali GNU/Linux GNU/Linux.

[Go to table of contents](#table-of-contents)

## 4. Adding Linux Kernel for T2
Follow the steps Adding the Common apt repo and Adding the Release specific apt repo and use CODENAME=testing from this [link](#https://github.com/AdityaGarg8/t2-ubuntu-repo?tab=readme-ov-file#apt-repository-for-t2-macs).

Now run the command

sudo apt install linux-t2 apple-t2-audio-config

[Go to table of contents](#table-of-contents)

## 5. Install WIFI and Bluetooth firmware
Follow the steps from this [link](#https://wiki.t2linux.org/guides/wifi-bluetooth/).

[Go to table of contents](#table-of-contents)

## 6. Edit fstab, grub.cfg and add kernel parameters
Run the command in macOS terminal 

diskutil list

Now identify your partitions number by your allocated sizes is it's disk0s1 then replace the nvme0n1p[X] by 1 that is nvme0n1p1. Do this for each partition that you have created.

Edit the fstab and replacing /dev/XXX by nvme0n1pX where XXX and X varies for each partition.

sudo vim /etc/fstab

Look for the lines and press i
<table>
    <head>
        <tr>
            <td>Previous Line</td>
            <td>After Edit</td>
            <td>Next Line</td>
        </tr>
    </head>
    <body>
        <tr>
            <td># / was on /dev/XXX during installation</td>
            <td># / was on /dev/nvme0n1pX during installation</td>
            <td>UUID=XXXXXXXXXXXXXXXXXX /               ext4    errors=remount-ro 0       1</td>
        </tr>
        <tr>
            <td># /boot/efi was on /dev/XXX during installation</td>
            <td># /boot/efi was on /dev/nvme0n1pX during installation</td>
            <td>UUID=XXXXXXXX /boot/efi           vfat    defaults        0       2</td>
        </tr>
        <tr>
            <td># swap was on /dev/XXX during installation</td>
            <td># swap was on /dev/nvme0n1pX during installation</td>
            <td>UUID=XXXXXXXXX            swap    sw              0       0</td>
        </tr>
    </body>
</table>

Remove the lines if it exists in fstab
/dev/sr0        /media/cdrom0   udf,iso9660 user,noauto     0       0
/dev/sr1        /media/cdrom1   udf,iso9660 user,noauto     0       0

Once you have done this press escape and follow the following to save and exit the vim

:wq

Now let's confirm our folder structure for the /boot/efi. The folder structure should look like this as follow

<table>
    <head>
        <tr>
            <td>Command</td>
            <td>Output</td>
        </tr>
    </head>
    <body>
        <tr>
            <td>ls /boot/efi</td>
            <td>boot efi grub</td>
        </tr>
    </body>
</table>

Now edit the grub.cfg using sudo vim /boot/efi/boot/grub/grub.cfg.

Add the kernel parameters for in the line that begins with

linux	/boot/vmlinuz-6.14.4-1-t2-trixie root=UUID=XXXXXXXXX ro

add line at the end of the line above by pressing i

intel_iommu=on iommu=pt pcie_ports=native quiet splash

now press esc and write :wq to save and exit.