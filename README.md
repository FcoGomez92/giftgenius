Side project in progress. Developed by [@FcoGomez92\_](https://twitter.com/fcogomez92_) to test OpenAI and Twitter APIs. It is inspired by [abbrevia.me](https://abbrevia.me) project developed by [@itortv](https://twitter.com/itortv)

GiftGenius is an assistance tool that helps you choose the perfect gift for anyone. It utilizes artificial intelligence to analyze the Twitter profile of the person in question and returns a brief report with their description, likes, and needs. Additionally, it presents a list of five specially selected products for that person, allowing you to surprise them with a personalized and fitting gift.

The ultimate idea is to monetize through the Amazon affiliate API, enabling search results to be displayed as complete product cards with the option for direct purchase.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Config your .env.local file with your twitter token and openAI api key. Example:

TWITTER_TOKEN=XXXXXXXXXXXXXXXXXX
OPENAI_API_KEY=XXXXXXXXXXXXXXX

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## PENDING WORK AND NEXT FEATURES:

1. Finish the design and add save user queries result into local storage to preview later if needed.

2. Include advanced prompt options from the front end. For example: Selecting the relationship with the person, occasion for the gift (birthday, Christmas, Valentine's Day, anniversary, etc.), maximum budget.

3. Clean up the URLs of the tweets. Either remove them directly or replace them with the indicator "(url, image, or video)". This action reduce the number of token sent to OpenAI. Example of implementation:

- OPT 1:

```javascript
let textWithoutUrls = textWithUrls.replace(/https:\/\/[\n\S]+/gi, '');
```

4. Isolate the list of products in an array and then use the Amazon Affiliate API to search for those products. Implementation examples:

- OPT 1:

```javascript
const str = "...";
const productsArray = str.split("\n").splice(-5);
```

- OPT 2:

```javascript
let startIndex = str.indexOf("PRODUCTOS:") + 11;
let endIndex = str.length;
let products = str.slice(startIndex, endIndex).trim();
let productsArray = products.split(/\d+\./).slice(1).map((product) => product.trim());
```

5. Isolate the used token count and maximum token count when calling OpenAI. In case the prompt is too long, then trim the necessary tweets and restart the request. Implementation examples:

- OPT 1:

```javascript
const numbers = str.split(" ").filter(w=>!isNaN(w))
```

- OPT 2:

```javascript
const str = "This model's maximum context length is 4097 tokens. However, your messages resulted in 5137 tokens. Please reduce the   length of the messages.";
const regex = /\d+/g;
const numbers = str.match(regex);
```
