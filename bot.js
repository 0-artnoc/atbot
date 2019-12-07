'use strict'

const config = require('./config')

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand

// Export bot as global variable
global.tg = new Telegram.Telegram(config.token)

// Exports all handlers
require('fs').readdirSync(__dirname + '/handlers/').forEach(function (file) {
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
        var name = file.replace('.js', '');
        exports[name] = require('./handlers/' + file);
    }
});

// Routes
tg.router
    .when(
        new TextCommand('/dump', 'dumpHandler', 'Pushes ROM dump to https://github.com/AndroidDumps'),
        new exports["dump"]()
    )
    .when(
        new TextCommand('/ddump', 'ddumpHandler', 'Pushes ROM dump to https://github.com/AndroidDumps'),
        new exports["ddump"]()
    )
    .when(
        new TextCommand('/kernel', 'kernelHandler', 'Rebase OEM compressed kernel source to its best CAF base'),
        new exports["kernel"]()
    )
    .when(
        new TextCommand('/bloblist', 'bloblistHandler', 'Generates proprietary-files.txt'),
        new exports["bloblist"]()
    )
    .when(
        new TextCommand('/start', 'botstartHandler', 'Help'),
        new exports["botstart"]()
    )
    .when(
        new TextCommand('/gdrive', 'gdriveFilterHandler', 'Generates direct download link for gdrive'),
        new exports["gdrive"]()
    )
    .when(
        new TextCommand('/caf', 'cafHandler', 'Find latest caf tag'),
        new exports["caf"]()
    )
    .when(
        new TextCommand('/deviceinfos', 'deviceInfosHandler', 'Show device information'),
        new exports["deviceinfos"]()
    )
    .when(
        new TextCommand('/specs', 'deviceSpecsHandler', 'Shows device specs'),
        new exports["deviceinfos"]()
    )
    .when(
        new TextCommand('/codename', 'codenameHandler', 'Shows device codename'),
        new exports["deviceinfos"]()
    )
    .when(
        new TextCommand('/gapps', 'gappsHandler', 'Various latest gapps links'),
        new exports["gapps"]()
    )
    .when(
        new TextCommand('/oneplus', 'oneplusOTAHandler', 'OnePlus OTA links'),
        new exports["oneplus"]()
    )
    .when(
        new TextCommand('/twrp', 'twrpHandler', 'TWRP links'),
        new exports["twrp"]()
    )
    .when(
        new TextCommand('/getdump', 'dumpHandler', 'Searches any existing ROM dump'),
        new exports["github"]()
    )
    .when(
        new TextCommand('/getdt', 'dtHandler', 'Searches any existing device tree'),
        new exports["getdt"]()
    )
    .when(
        new TextCommand('/getblob', 'blobHandler', 'Searches any existing vendor tree'),
        new exports["getblob"]()
    )
    .when(
        new TextCommand('/realme', 'realmeHandler', 'Realme OTA links'),
        new exports["realme"]()
    )
    .when(
        new TextCommand('/oppo', 'oppoHandler', 'Oppo OTA links'),
        new exports["oppo"]()
    )
