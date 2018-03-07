# Install packages
npm install

# Show npm version and available updates
npm info -v
npm view

# Create heroku repository for deployment
heroku create

# Add webhook url to .env file
WEBHOOK_HOST=$(heroku info -s | grep web_url | cut -d= -f2)
echo "WEBHOOK_HOST='${WEBHOOK_HOST}'" >> .env

# Deploy code
git push heroku master

# View logs
heroku logs --tail
