# Translator Bot
## Goal: To translate a tweet from any language to a new language when mentioned.

### Steps:
1. Find any mentions of bot
2. Look at last tweet made by bot
3. Look at only mentions unreplied mentions
4. Take mention text and translate
5. Reply to mention with translated text

__Example:__

@randomUser: "Hello! This is my tweet." <br/>
 | @randumUser2: "@randomUser @translatorBot en to es"<br/>
 |  | @translatorBot: "@randumUser @randomUser2 Hola! Este es mi tweet."<br/>

Api necessary:
- [Twitter API](https://developer.twitter.com/en/)
Packages Used: 
- [Twit](https://www.npmjs.com/package/twit)
- [Google Translate API](https://www.npmjs.com/package/google-translate-api)

__Known Issues__
- No conditional if text is wrong
- Tweet response is async
- Runs on a time interval and not on every mention
- Doesn't thread tweets
- I don't know non romance language 'space' characters