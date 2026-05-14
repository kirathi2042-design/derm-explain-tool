#!/usr/bin/env node
// Helper: print recent webhook bodies so you can find your own LINE userId.
// Two ways to get your userId:
//
// 1. Quickest — send "/whoami" to your bot once the webhook is live. The bot
//    will reply with your userId. (Available after deploy; see SETUP.md)
//
// 2. From a recent webhook log:
//    wrangler tail --format=pretty | grep userId
//
// 3. From LINE Login (if you set up LIFF):
//    Open the LIFF page on your phone, open Safari Web Inspector, run
//    `liff.getProfile().then(p => alert(p.userId))`.
//
// This file is a placeholder so the SETUP doc has somewhere to point.
console.log('See SETUP.md for how to obtain your LINE userId.');
