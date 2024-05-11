##################################################################
#!/bin/bash

dirname="dir$1"

# make a folder if it doesn't exist
[ ! -d /userdirs/$dirname ] && mkdir -p /userdirs/$dirname

# append these lines at the end of the /etc/samba/smb.conf file
tee -a /etc/samba/smb.conf << EOF
[$dirname]

	comment	= $dirname
	path = /userdirs/$dirname
	browsable = yes
	valid users = $1
	read only = no
	browsable = yes
EOF

useradd -m $1
(echo $2; sleep 1; echo $2;) | passwd $1
(echo $2; sleep 1; echo $2 ) | sudo smbpasswd -s -a $1

smbcontrol smbd reload-config
