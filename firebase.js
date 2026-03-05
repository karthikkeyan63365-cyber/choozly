/* ================================================================
   CHOOZLY — firebase.js
   This file handles:
   1. Firebase initialization
   2. Saving orders to Firestore
   3. Exposing saveOrder() globally so script.js can call it

   HOW TO SET UP FIREBASE (Free):
   ─────────────────────────────
   1. Go to https://console.firebase.google.com
   2. Click "Add project" → name it "choozly"
   3. Disable Google Analytics (optional) → Create project
   4. Click "Firestore Database" → Create database → Start in TEST mode
   5. Click the </> icon (Web app) → Register app → name it "choozly"
   6. Copy the firebaseConfig object they give you
   7. REPLACE the firebaseConfig below with YOUR values
   ================================================================ */

import { initializeApp }           from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc }
                                   from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ----------------------------------------------------------------
   🔴 REPLACE THIS WITH YOUR FIREBASE CONFIG
   Get this from: Firebase Console → Project Settings → Your apps
---------------------------------------------------------------- */
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db  = getFirestore(app);

/* ----------------------------------------------------------------
   saveOrder(orderData) — Saves order to Firestore "orders" collection
   Returns the generated order ID (e.g. "CHZ-1703012345")
---------------------------------------------------------------- */
async function saveOrder(orderData) {
  // Add a readable order ID prefix
  const orderId = 'CHZ-' + Date.now();
  orderData.orderId = orderId;

  // Save to "orders" collection in Firestore
  await addDoc(collection(db, "orders"), orderData);

  console.log('✅ Order saved:', orderId);
  return orderId;
}

// Expose saveOrder globally so script.js can call it
// (script.js is not a module, so we use window)
window.saveOrder = saveOrder;