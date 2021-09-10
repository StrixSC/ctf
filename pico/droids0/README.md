To solve this challenge, first we need to see what the app looks like. Android reverse engineer tends to be pretty straight forward. Install the apk, check through the app for vulnerabilities, look at manifests and other files within the apk (An apk is essentially just a zipped file), etc.
For this challenge, I used android studio's device manager to download an android image easily and get a fast-working emulator. Once I ran the emulator, the application showed up and all it was is a button and a text saying: 
`where else can output go [PICO]`

A quick google search shows me that `logcat` is the "console" of android applications. 
After looking through how to access logcat, I found the `adb` tool, which is a very powerful and extensible android tool used for debugging. Adb can attach itself onto emulators and real devices. In my case, using adb -l only shows my emulator and thus it instantly attached itself onto it.
I used the adb -e install -r zero.apk to install the apk onto the emulator, then used adb logcat to access the logs. 

Once the logs were accessible, I clicked on the button in the app to find the following output in logcat:

```txt
09-10 02:26:16.175  1995  3791 I ChmraDebugLogger: [73] 1801
09-10 02:26:16.178  1995  3791 I ChmraDebugLogger: [30] [VisionOcr.optional:201817000700] permitMetered=true,
09-10 02:26:16.182  1995  3791 W ChimeraConfigService: Retry attempt was throttled.
09-10 02:26:18.673  3752  3752 I PICO    : picoCTF{a.moose.once.bit.my.sister}
```

And there we have the flag.