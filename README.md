# Shorts (a Twitch Clips inspired application)

This is one of my biggest projects that I have done. I have developed this using Angular and Google's BaaS service called Firebase but there's so much more to this (E.g WebAssembly). **The main feature of this application is that the authenticated users can upload videos and choose from 3 different screenshots that have been generated from the to-be-uploaded video**.

This current version (v1.0.0) is the MVP of this project. There are some stuff that could be improved upon related to the user interface and user experience (listed in the "LIST OF POSSIBLE IMPROVEMENTS" section). 

This project is being hosted live by Vercel and [you can play around with it here (v1.0.0)](https://angular-shorts-app.vercel.app/).

## FEATURES AND TECHNOLOGY

Everyone that has access to the hosted website can view the shorts/videos but only authenticated users can upload, edit and delete their own videos. Signing in has been done with Angular's template forms and account creation has been done with Angular's reactive forms. The backend involved in this is Firebase authentication. Firebase's Firestore has been used to store users and the videos' data (data that is not personal and is only used to link users to their uploaded videos). 

To this point everything may seem basic/usual for frontend developers who are somewhat experienced but the entire video feature (uploading, editing, screenshots etc.) is pretty complex. I installed the [FFMPEG WASM](https://github.com/ffmpegwasm/ffmpeg.wasm) package, which is basically the system programmed FFMPEG compiled into WebAssembly that can be used with JavaScript. [This code](https://github.com/Kvaara/angular_shorts_app/blob/main/src/app/services/ffmpeg.service.ts) handles the screenshot generation of the to-be-uploaded videos. 

Of course all of this could have been done without the help of WebAssembly but [this process would have been much, much slower](https://www.figma.com/blog/webassembly-cut-figmas-load-time-by-3x/). And because FFMPEG has pretty system intensive processes the app uses webworkers and I had to enable the SharedArrayBuffer because FFMPEG requires it. SharedArrayBuffer is basically a gateway for the main thread and the web worker thread to transfer bytes/data between themselves, which is a much faster way of transfering data between different threads. 
* SharedArrayBuffer had some issues related to its security, which is why you need to [change your application's headers accordingly](https://github.com/Kvaara/angular_shorts_app/blob/main/vercel.json). These security issues have been recently fixed and so using them shouldn't cause major risks.  

I have used the videoJS package to add a custom video player. 

That's pretty much the gist of it. There's much more to it (for example, the whole Firestore part of the application that required the use of the UUID package) though the hardest parts were FFMPEG related.

I have used vanilla CSS but also the TailWindCSS package in styling the application. 

## LIST OF IMPROVEMENTS

So what could be improved upon (or even fixed)? **Note: The list may be long but remember that the current version of this application is the MVP and I have purposeful left these improvements from it** 

* Deleting and editing shorts (the uploaded videos) is too abrupt and doesn't inform the user of what happened, give the user a chance to undo their action or even ask the user for confirmation before executing the action. 
* The "LATEST" section on the bottom of the page doesn't correctly scale the images to a fixed height and weight. The images aren't sized the same, which is not optimal.
* On the top-right of the screen it reads "English" and hints that the application has localization but in reality there is no localization implemented. Either remove the text or implement localization.
* There is no applicable logo. At the moment the only "logo" is a text that says "SHORTS".
  - In addition, the favicon of the application is the same old boring Angular favicon, which is, well, boring.
* The "About" page is incomplete and is currently redundant.
  - I could complete the page and add an on-boarding page.
* Signing out doesn't have a "perceived delay" and is also too abrupt. There also isn't any notification to the user that they have been signed out (E.g a snackbar).
* Better loading indicator for the upload progress. It's currently only visualized by numbers, which is kind of boring and not user friendly.
* Add eye-candy microinteractions to certain flows in the application. The upload process, signing in, creating an account and editing the shorts (i.e the videos) need some spark and that spark could be added through microinteractions.
* Shorten the account creation progress, add a "remember me" checkbox and add a way to sign in with Google etc.
* Implement a way for the user to edit the length of the to-be-uploaded videos.
* Add a way for users to like/favourite certain clips and make a popular section.

## Tools

As you may have already noticed this project uses Angular 13. Angular 13 is a convention-over-configuration framework so it has pretty much everything I needed straight out of the box, which is why the list may be pretty short. 
* Angular 13 (Angular Routing, template/reactive forms, Angular Animations, etc.
* TailWindCSS (for major styling).
* UUID (for making sure that every name of video is unique in Firestore.
* videoJS (makes creating a custom video editor much more easier).
* FFMPEG (A major package that makes the whole upload and its related screenshot generation feature work).
* ngx-mask (This can be used to mask input field and I have used it to make the phone number in the account creation more readable and scannable).
* Angular Fire (Makes the communication between the frontend and Firebase pain-free and easier).
* Firebase (helps in the same ways as the Angular Fire package).
