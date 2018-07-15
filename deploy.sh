echo 'Building project in production environment...'
npm run build
echo 'Project built'

echo 'Compressing project files...'
tar -zcvf challenge.tar.gz dist > /dev/null 2>&1
echo 'Files compressed'

echo 'Copying project to staging server...'
scp challenge.tar.gz robson@my_server_ip:/home/robson
ssh -p 2424 robson@my_server_ip rm -Rf /var/www/challenge/current
ssh -p 2424 robson@my_server_ip mkdir /var/www/challenge/current

echo 'Extracting files...'
ssh -p 2424 robson@my_server_ip tar -xvzf /home/robson/challenge.tar.gz -C /var/www/challenge/current/ > /dev/null 2>&1
echo 'Files extracted'

echo 'Deployed successfully!'
