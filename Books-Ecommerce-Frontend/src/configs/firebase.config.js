import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

/*
  5 REQUESTs PER DAY
  All Phonenumber
*/

//phamvuong10012002@gmail.com
// ACCOUNT FOR TESTING -- PHONE: 0948908485 -- OTP: 123456
const firebaseConfig = {
  apiKey: 'AIzaSyAIakMBJ_4VUN9oVTe3A6DLU_ofYJK5WJU',
  authDomain: 'bookada-ffe4b.firebaseapp.com',
  projectId: 'bookada-ffe4b',
  storageBucket: 'bookada-ffe4b.appspot.com',
  messagingSenderId: '690299951951',
  appId: '1:690299951951:web:0e2b202760026fc1d8833a',
  measurementId: 'G-F96SNP9BQZ',
};

//pqvuong20022002@gmail.com
// ACCOUNT FOR TESTING -- PHONE: 0948908485 -- OTP: 123456
// const firebaseConfig = {
//   apiKey: 'AIzaSyBwXKZEv2U3uIZGKD7PcKXrdmanZGwXBV8',
//   authDomain: 'bookada-2baad.firebaseapp.com',
//   projectId: 'bookada-2baad',
//   storageBucket: 'bookada-2baad.appspot.com',
//   messagingSenderId: '1059889013797',
//   appId: '1:1059889013797:web:ce25bbdcbdb25845158bcc',
//   measurementId: 'G-216D849J96',
// };

//girflerpham@gmail.com
// const firebaseConfig = {
//   apiKey: 'AIzaSyDM0JUXCoSf0YUo9bb5A8hdqr3ZXwwIusk',
//   authDomain: 'bookada-c65d5.firebaseapp.com',
//   projectId: 'bookada-c65d5',
//   storageBucket: 'bookada-c65d5.appspot.com',
//   messagingSenderId: '638465788195',
//   appId: '1:638465788195:web:2230b1c435c06a2b246496',
//   measurementId: 'G-G9Z4CZX4G2',
// };

//pqvuong20@clc.fitus.edu.vn
// const firebaseConfig = {
//   apiKey: 'AIzaSyBa2Rgg387fSuz_bi0MjbI9UrQB8l7EseQ',
//   authDomain: 'bookada-52323.firebaseapp.com',
//   projectId: 'bookada-52323',
//   storageBucket: 'bookada-52323.appspot.com',
//   messagingSenderId: '493165766842',
//   appId: '1:493165766842:web:b5828fa68d36f3067fba83',
//   measurementId: 'G-FWPRBX8VW9',
// };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
