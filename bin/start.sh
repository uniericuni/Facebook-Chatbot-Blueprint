# Change git branch to master
git checkout -b master

# Install packages
npm install

# Show npm version
npm info -v

# Create heroku repository for deployment
heroku create

# Create useful files
touch .env

# Create useful directories
mkdir models
mkdir views

# Add webhook url to .env file
WEBHOOK_HOST=$(heroku info -s | grep web_url | cut -d= -f2)
echo "PORT=1337" >> .env
echo "WEBHOOK_HOST='${WEBHOOK_HOST}'" >> .env
echo "CLIENT_HOST='https://graph.facebook.com/v2.6/me/messages/'" >> .env
echo "VERIFY_TOKEN='<VERIFY_TOKEN>'" >> .env
echo "PAGE_ACCESS_TOKEN='<PAGE_ACCESS_TOKEN>'" >> .env
echo "SHOW_PSID=true" >> .env
echo "TEST_SENDER_PSID='<SENDER_PSID>'" >> .env
echo "TEST_RECIPIENT_PSID='<RECIPIENT_PSID>'" >> .env

# Save local changes
git add -A
git commit -m "[Init] A new page starts!"

# Deploy code
git push heroku master

# Open local server
npm start &
NODE_SERVER_PID=$!

# Local test 
sleep 1
npm test

# Kill background process
kill $((NODE_SERVER_PID + 3))
