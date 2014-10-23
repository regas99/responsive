rsync -avL --progress -e "ssh -i /home/tom/security/AWS_Key.pem" \
       /media/sf_share/washoecourts/wcourt/www.washoecourts.com/* \ 
       ec2-user@ec2-XX-XXX-XXX-XXX.us-west-2.compute.amazonaws.com:/var/www/html/www.washoecourts.com
