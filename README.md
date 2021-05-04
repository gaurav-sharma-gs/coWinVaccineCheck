# cowin-vaccine-check
Script to check if vaccine is available for a certain age for certain districts and notifies for Windows, Mac and Linux (Native Notifications. Script runs at customizable intervals


The only thing hard coded are the district ids and district names. It can run for multiple districts at the same time. 
To change the districts as well as add districts, add values to the array districts on Line 4 of cowinCheck.js


How to install 

1. Clone the repository
2. Open terminal/powershell/command prompt and go to the project folder 
3. run
``` 
npm install
```

4. Once all dependencies are install, you can run it as 

```
node coWinCheck.js
```


By default, this program will run every 60 seconds for slots for people who are of age 18 - 45
To run for 45+ slots, give following argument : -age 45

example

```
node coWinCheck.js -age 18
node coWinCheck.js -age 45
```

The change the frequency of running thr script , you can give the following arguments (in seconds) : -interva 60

example

```
node coWinCheck.js -interval 20
node coWinCheck.js -interval 60
node coWinCheck.js -interval 3600
```


You can give arguments together as well (for age & interval) example

```
node coWinCheck.js -age 18 -interval 20
node coWinCheck.js -age 45 -interval 60
```


Thanks :) 


