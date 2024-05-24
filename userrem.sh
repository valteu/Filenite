#################################################
#!/bin/bash

dirname="dir$1"

[ -d /userdirs/$dirname ] && rm -rf /userdirs/$dirname

smbpasswd -x $1
userdel -r $1

sed -i "/#dirname#/,/#end#/d" /etc/samba/smb.conf

smbcontrol smbd reload-config

