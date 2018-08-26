// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    firebase: {
	    apiKey: "AIzaSyCw3ERgkz5Fp68x0n6D0W8UWwf5rOwNbD0",
	    authDomain: "fir-fotos-9e5e0.firebaseapp.com",
	    databaseURL: "https://fir-fotos-9e5e0.firebaseio.com",
	    projectId: "fir-fotos-9e5e0",
	    storageBucket: "fir-fotos-9e5e0.appspot.com",
	    messagingSenderId: "420962703802"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
