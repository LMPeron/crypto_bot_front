export const environment = {
  production: false,
  mainFlask: 'http://localhost:5000/',

  mainUrl: 'http://129.0.0.221:8094/api/',
  authUrl: 'http://129.0.0.221:8080/api/',
  appVersion: require('../../package.json').version + '-dev',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error'; // Included with Angular CLI.
