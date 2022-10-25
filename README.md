# eAdmissions-Chatbot
This is the chatbot for the eAdmissions website.

## Svelte
It was created in svelte to fit in with the current programming language used in eAdmissions.

Svelte uses components so the chatbot can easily be imported into the current eAdmissions website.

These are the 3 main files that make up the component (only need to upload these files to update the chatbot):
- Answers.js
- Chat.svelte
- Chatbox.svelte

#### Answer.js
This contains an array of answers that we output to the user based on what they asked.

#### Chatbot.svelte
This file handles the display of the chat bubble.

#### Chat.svelte
This is the main file that handles communication between the AI and displaying the answers.

## AI
This chatbot uses AI to understand human language using NLP.

It was built on: https://wit.ai/

Login can be found (it uses a Facebook account): https://adept.eu.itglue.com/1660725694349529/passwords/2835336962228437 

**Please be careful when visiting wit.ai as this can affect how to bot thinks**

### How does it work?
It runs on 3 main components:
- Intent
- Entity
- Trait

#### Intent
This is the intent of the question, is the user trying to **view** something or **attach** a file.

#### Entity
This is the item/thing that is the user is referring to: username, password.

#### Trait
This is mainly use to identify a trait on a question, this is not used much in this chatbot apart from identify greetings and thank yous.

#### Example
How do I reset my username and password?

Intent here will be **reset**

Entity here will be **userame** and **password**


