/// <reference path="WikitudePlugin.d.ts" />
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      /** Enter your Wikitude (trial) License Key here */
      WikitudePlugin._sdkKey = "1OZ/xFkCrBs2y7gmyQE087GLkIvwji0Je2HrppxuUiNRggq8yid9Gl2rtadOXOiDewRwYlqIxDbKLLJoRaxu3GowshsX+4Sutt4TY6BaLj3J9eRcQFzUqs2qiF2mrC1UT+/mEVthQThpNqmnRIf8C2z3gLzUlA2YDZsWJFxQUKtTYWx0ZWRfX8sUghsxPKflLS9e8ZLPSXsztlAqzrvRUyAFCBCAkqOfBxs58imVST+8e9OilYgavr8b9L8JMhZdeEBwnx35CEj1+kBSiIteLmvcesV6bkSXoIiQo0E0WGMaEQ8dB8033h/vo/t0LGfzBz1Wi2WHf+R9/JTPmtEVXVKGeAytyKtTPmL1LHdhpf25Hc0MCC4wZZ8CVfCGJcU+Ifw8XRvuXu96e+SCAwxef1av5X6NlZbgQFwCN/psbsscwjF1zwe9IO3FMC78yvCAe6OzvfsQF1uPt6WYNcMZJMo6pbXs75rbNvSHdEDRTTtcMXaOI/7nG/jHwgutaXAhsOgJouZh53zhUoo0dtNhlfxLTLsTFb3p2zetLgO2hD2nFwA3ebSJvbneOu30d1wB0t8zeURP7fY3XuZK54CvvrE+EJlW0i6paACBzLveCHgNDZ+ldVAJUWtWd9ouG3hJeMYlbtC1ouqmu7gMpH40OYbzhNBMGXuWlBd+qY2fZTE=";

      /** Check if your device supports AR */
      WikitudePlugin.isDeviceSupported(
          function(success) {
            console.log("Your platform supports AR/Wikitude. Have fun developing!!");
          },
          function(fail) {
            console.log("Your platform failed to run AR/Wikitude: "+fail);
          },
          [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking 
      );                  

      /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works 
       * through the function below for the direction Ionic2 app --> Wikitude SDK 
       * For calls from Wikitude SDK --> Ionic2 app see the captureScreen example in 
       * WikitudeIonic2StarterApp/www/assets/3_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
      // set the function to be called, when a "communication" is indicated from the AR View  
      WikitudePlugin.setOnUrlInvokeCallback(function(url) {

        // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic2)
        if (url.indexOf('captureScreen') > -1) {
            WikitudePlugin.captureScreen(
                (absoluteFilePath) => {
                    console.log("snapshot stored at:\n" + absoluteFilePath);

                    // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
                    WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath +"');");
                },
                (errorMessage) => {
                    console.log(errorMessage);
                },
                true, null
            );
        } else {
            alert(url + "not handled");
        }
      });

      /**
       * Define the generic ok callback
       */
      WikitudePlugin.onWikitudeOK = function() {
          console.log("Things went ok.");
      }
      
      /**
       * Define the generic failure callback
       */
      WikitudePlugin.onWikitudeError = function() {
          console.log("Something went wrong");
      }

      // Just as an example: set the location within the Wikitude SDK, if you need this (You can get the geo coordinates by using ionic native 
      // GeoLocation plugin: http://ionicframework.com/docs/v2/native/geolocation/
      //WikitudePlugin.setLocation(47, 13, 450, 1);

      /* for Android only
      WikitudePlugin.setBackButtonCallback(
          () => {
              console.log("Back button has been pressed...");
          }
      );                  
      */

    });
  }
}
