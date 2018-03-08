# Facebook Chatbot Blueprint

## Setups

### 1. Heroku

> Reference [Getting Started on Heroku with Node.js | Heroku Dev Center](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)

- Create a [Heroku](https://dashboard.heroku.com/) account, install the CLI, and log in heroku on your local machine
- Clone the Project
```shell
git clone https://github.com/uniericuni/Facebook-Chatbot-Blueprint.git
```
-  Run the starter code
```shell
cd ./Facebook-Chatbot-Blueprint
bash bin/start.sh
```
  
### 2. Chatbot

> Reference [Setting Up Your Facebook App](https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup)

> You must fullfill the 4 requirements for the listed on the guiding steps above: Facebook page, developer account, and webhook URI (if you followed the previous step, you should find the correct URI in your *.env*).

- Open messenger setup board
  - Open the Facebook developper [page](https://developers.facebook.com) and log in.
  - Choose the app you would like to create a messenger chatbot for in the **My Apps** menu.
  - Go to the **Add Product** section in the dashboard, hit **Set Up**.
  
- Update page access token
  - Go to **Token Generation** section, choose the page you'd like to register this bot on, and copy the token. (Notice that the token will be renewed every time you press the button)
  - Replace the folloiing line in *.env* with the token you just copied.
  ```bash
  PAGE_ACCESS_TOKEN='<PAGE_ACCESS_TOKEN>'
  ```
- Setup chatbot webhook and subscription for APIs
  - Hit the **Setup Webhooks** button in webhook section.
  - Paste `<WEBHOOK_HOST>/webhook` (the value is in *.env*) on Callback URL.
  - Create a Verify Token and replace your
  ```bash
  VERIFY_TOKEN='<VERIFY_TOKEN>'
  ```
  - Check messages and message_postbacks boxes to subscribe basic APIs.
  - Select the same page to subscribe.

### 3. Local Test
- Open a local webhook server on your terminal
```shell
npm start
```
- Open an additional terminal table and test use the test script
```shell
npm test
```
