printf "Changing context to fuel's folder"
cd /home/alexandre/fuel/
pwd
printf "Pulling latest version\n"
git pull
printf "\nBuilding front & back\n"
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up --detach
