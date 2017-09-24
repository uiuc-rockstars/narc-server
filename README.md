# narc-server

Receives websocket connections and forwards messages to database.

## About

This repository was uploaded to a Heroku app and continually listens for WebSocket connections. When a connection is established the server listens for a message, which it then attempts to add to a Mongo database.

The file index.html is independent of the code on the server, and can be used to send a WebSocket message to the server from any machine connected to the internet.

## Notes

This is a proof-of-concept - we recognize that there are still several items that still need work. The following are some areas of focus:

* Public-facing credentials results in security vulnerability.

* The current client drops from the server after a period of inactivity, which results in a message not being sent.
