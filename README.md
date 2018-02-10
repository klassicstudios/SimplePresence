---
# SimplePresence
SimplePresence is an Electron app for macOS, Windows, and Linux that allows users to easily set their Discord Rich Presence Status.
It has a config for default strings, which can then be changed through the app at any time.

I have forked the SimplePresence project for the diabetes community to include CGM support displaying data from the Nightscout CGM in the cloud service.

Running any integration will open a status window telling you the variables being changed. For instance, the nightscout integration will pop a window that looks like this:

[![Example](https://i.imgur.com/RA2Oj5k.png)]()

In discord, your Rich Presence status will look like this once the values have loaded:

[![Example2](https://i.imgur.com/pAjokj6.png)]()

The trend arrow in the large image location will change based on the trend direction from Nightscout. You can also hover over the image to get a description of the speed of change (these values are pulled from the Deexcom "What do the arrows mean?" documentation provided with the Dexcom welcome package).

## Main
SimplePresence's main/normal usage is for a custom rich presence. It supports images, captions, timestamps, and regular text. Start off by [following the setup guide](https://github.com/justdotJS/SimplePresence/wiki/setup).

## Services
SimplePresence has support for many service integrations - get your currently playing song, video, or movie in your Rich Presence. We currently support:
- Nightscout: CGM In The Cloud [npm run nightscout]
- Apple Music [npm run apple]
- FooBar2000 [npm run foobar]
- Google Play Music [npm run google]
- IMDB [npm run imdb]
- lastFM [npm run lastfm]
- Spotify [npm run spotify]
- YouTube [npm run youtube]

Get information on using these service [here](https://github.com/justdotJS/SimplePresence/wiki/Services) after following the [setup guide](https://github.com/justdotJS/SimplePresence/wiki/setup).

## Wiki
All instructions for setup, customization, and usage of SimplePresence are in our Wiki. [Press here to see it.](https://github.com/justdotJS/SimplePresence/wiki/)

## Thanks
Thanks to **[devsnek](https://github.com/devsnek)** for his original Rich Presence example, which helped with much of the base code used for EasyRPC.

Thanks to **Rung#9946** for the `Changing Images` section on the wiki.

Thanks to **Ardia#7038** for the initial FooBar2000 integration code and FooBar2000 setup page (on the wiki).
