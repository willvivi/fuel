printf "Changing context to fuel's folder"
cd /home/ec2-user/fuel/
pwd
printf "\nPulling new images\n"
docker-compose -f docker-compose.prod.yml pull
printf "\nRebooting containers\n"
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up --detach
