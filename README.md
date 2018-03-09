# Facebook Chatbot Blueprint

<a target="_blank" href="https://opensource.org/licenses/MIT" title="License: MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>

This is a blueprint for building facebook chatbot. You may fork this repo to start your project.

The blueprint contains basic webhook event handlers, logging mechanism, dialogue management mechanism, etc. It also provides simple deployment process on Heroku. Please refer to the following bullet points for more details.

Go to <a href="https://github.com/uniericuni/Facebook-Chatbot-Blueprint#cheat"><b>Cheat Sheet</b></a> for less detailed set-up steps.

## Setups

### Heroku

  If you haven't got a Heroku account, create one, [install CLI](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up) and login on your local machine. Also, make sure that your application number hasn't surpass your limitation.
  
### Facebook App

  Before starting on your cahtbot, you must own a Facebook page and a Facebook developer account. Open your [developer page](https://developers.facebook.com) and login. Choose or create an app on `My Apps` menu. Go to *Add Product* section on the dashboard, and hit `Set Up` on *Messenger* card.

### Local Setup and Deployment

  Clone the Project and run the starter code.
  
  ```shell
  git clone https://github.com/uniericuni/Facebook-Chatbot-Blueprint.git
  cd ./Facebook-Chatbot-Blueprint
  bash bin/start.sh
  ```
  
  Don't worry about `Invalid OAuth token access` error. We will fix it in the next step.

### Webhook Setup
  
  Go to *Token Generation* section on the messenger setup page, choose a page, and copy the token generated (Notice that the token will be renewed every time you press the button). Replace `<PAGE_ACCESS_TOKEN>` in `.env` with the token.
  
  Hit the `Setup Webhooks` in webhook section. Paste `<WEBHOOK_HOST>/webhook` (check the value in `.env`). Enter your verify token and replace `<VERIFY_TOKEN>` with it. Check `messages` and `message_postbacks` to subscribe basic APIs. Select the same page to subscribe.
  
  Don't forget to commit and push your local change. You can use the aliased git command `ezpush` to avoid redundant commits (Check `bin/start.sh` for more details).

### Local Test

  You may now send message to the chatbot. Check log messages on Heroku app with
  
  ```shell
  heroku logs --tail
  ```
  
  Replace `<SENDER_PSID>` and `<RECIPIENT_PSID>` with the log messages you received for better test experience. We also suggest you to turn `SHOW_PSID` false after this. Again, don't forget to push the local changes.

  You may start a local webhook server on your terminal
  
  ```shell
  npm start
  ```

  Then, open another terminal tab and start the test
  
  ```shell
  npm test
  ```
  
<h2 id="cheat">Cheat Sheet</h2>

  - Make sure you have Heroku account and logged in locally
  - Make sure you have a Facebook app and page
  - Run this `git clone https://github.com/uniericuni/Facebook-Chatbot-Blueprint.git`
  - Run this `cd ./Facebook-Chatbot-Blueprint`
  - Run this `bash bin/start.sh`
  - Open the messenger setup page in the app
  - Replace variable in `.env` with corresponding values on the setup page
  - Check `message` and `message_postbacks` during setup
  - Run this `ezpush`

## FAQ

### Why do I received *EADDRINUSE* Error?

  Check if there are running node processes in background with `ps -al`. If there is any persistent node process, kill it with `kill <PID>`. Check [this link](https://github.com/Unitech/pm2/issues/1583) for more detailed about why there are two node processes.
