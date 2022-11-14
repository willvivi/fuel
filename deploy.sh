printf "Changing context to fuel's folder"
cd /home/alexandre/fuel/
pwd
printf "Pulling latest version\n"
git pull
printf "\nBuilding front & back\n"
sudo docker-compose -f docker-compose.prod.yml build
sudo docker-compose -f docker-compose.prod.yml down
sudo docker-compose -f docker-compose.prod.yml up --detach
