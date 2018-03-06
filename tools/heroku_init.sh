# Create heroku repository for deployment
heroku create

# Deploy code
git push heroku master

# View logs
heroku logs --tail
