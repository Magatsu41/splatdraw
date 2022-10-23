# SplatDraweR
An app to help you create auto splatpost with linux and bluetooth

# Prerequisites

    - A Linux OS (preferably Ubuntu or Debian, but also working on Arch & CentOS)
    - Bluetooth (dongle or internal) on the machine where Linux is installed
    - A successfull and working installation of NXBT.  

## Optional (only if you want to run SplatDraweR directly on your machine)

    - Docker or NPM

# 1. Setting up your machine

To be able to create an automated splatpost with SplatDraweR you need to install NXBT first on a Linux machine.  
Follow their documentation [here](https://github.com/Brikwerk/nxbt "NXBT github")  
Be sure that your NXBT installation is working well by running `nxbt demo`.

# 2. Getting your macro file

## Preparing the image

First you need to find an image you want to reproduce. Try to use a base image with not to much colors in order to have a better dithered image in the end.  
Resize it and crop it to 320px * 120px, it's the standard size of a splatpost.  
Use a black and white dithering algorithm to convert the image. You can find sites that will do it for you online and for free. I personaly used [this one](https://planetcalc.com/9295/ "PLANETCALC"), as it proposed several algorithm.  
Finally, upload your image to an image sharing website.

## Convert your image (with SplatDraweR online)

Go to [SplatDraweR instance](https://splatdraw-prod-magatsu-prod-jogmy0.mo2.mogenius.io/home "SplatDraweR") and paste the link to your image in the input field, then click "Generate macro". If your image respect the aspect ratio and the color depth, the macro will be generated and your browser will automatically start the download of the macro.txt file.  

<p align="center">
   <img src="http://jollywood.free.fr/image1.png" alt="SplatDraweR image"/>
</p>

Save this file on your Linux machine.

### OPTIONAL - Convert the image by running SplatDraweR on your own machine :

Clone this project to your machine.  
 __With NodeJS__ : In the project folder, run `npm start` to run SplatDraweR.  
 __With Docker__ : In the project folder, run `docker build splatdrawer:1.0 .`  and then `docker run -d -p 443:443 splatdrawer:1.0`

The app is accessible at http://localhost:443/home

# 3. Preparing you Switch 

First you need to start Splatoon 3 (or 2), you have to deactivate the gyroscope in Splatoon settings because as of today NXBT does not support gyro motion emulation.  
Then go to the splatpost mailbox and chose to create a splatpost.  
In the splatpost interface, hit L to choose the smaller brush (1px) and then place the cursor to the very top left corner of the drawing area.  
Now use the home button to go back to the Switch home menu, and navigate to "change grip/order" to prepare the connexion with NXBT.  

<p align="center">
   <img src="http://jollywood.free.fr/image2.png" alt="Change grip"/>
</p>

 Now connect NXBT to your switch with `sudo nxbt webapp` . Access the NXBT webapp GUI at http://127.0.0.1:8000 and create a new controller. A Switch Pro controller should appear connected to your console.  
 With the emulated controller on the webapp, go back to the home menu of the Switch and place the cursor to highlight Splatoon.  
 Now shutdown NXBT webapp on your terminal and navigate to the macro.txt file with cd.  
 You should be ready to run the macro.

 # 4. Run the macro and create the auto splatpost

 If you have completed all the previous steps, you now only have to execute the following command :  

 `sudo nxbt macro -c "macro.txt" -r`  

 The virtual controller will reconnect, open Splatoon and start drawing your image line by line.  

 <p align="center">
   <img src="http://jollywood.free.fr/image3.PNG" alt="Splatpost example"/>
</p>
  
  
## Presentation of SplatDraweR on my Youtube channel


|   |   |   |
|---|---|---|
|   |   |  <a align="center" href="http://www.youtube.com/watch?feature=player_embedded&v=7kiwyAagJSk" target="_blank"><img align="center" src="http://img.youtube.com/vi/7kiwyAagJSk/0.jpg" alt="SplatDraweR video" width="700" height="500" border="5" /></a> |
