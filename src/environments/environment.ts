// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //domain: 'http://localhost:4200',
  //baseApiUrl: 'http://localhost:3001/api',
  domain: 'https://dev-app.negociosimples.com.br',
  baseApiUrl: 'https://api-dev.negociosimples.com.br/api',
  firebase: {
    apiKey: "AIzaSyDLRyhq34BqOToXnMEn3v6fi333f4MRf1E",
    authDomain: "dev-app.negociosimples.com.br",
    projectId: "react-app-b2424",
    storageBucket: "react-app-b2424.appspot.com",
    messagingSenderId: "1044492827123",
    appId: "1:1044492827123:web:b0f4da70df5a85029d7a86",
    measurementId: "G-PRQMLTDQ2V"
  },
  stripeApiKey: 'pk_test_51IMCDlHAQVRUgetwZtjvmf2S7Gg4gB26T82WZCT8bEtAcEXvx4R9qkeKmGM40tUry0xFXIrNtv5xudUSl3YYgpOD00AurdH3mW',
  defaultPlan: 'price_1InrdHHAQVRUgetwgY2S0HDV',
  defaultPlanRole: 'premium',
  meiPlan: 'price_1InrfbHAQVRUgetwuHA3R63T',
  meiPlanRole: 'mei',
  plans: [
    'price_1InrfbHAQVRUgetwuHA3R63T',
    'price_1InrdHHAQVRUgetwgY2S0HDV',
    'price_1IWAuvHAQVRUgetw2tcahHHE',
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
