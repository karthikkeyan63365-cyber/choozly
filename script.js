/* ================================================================
   CHOOZLY — script.js
   Features:
   - 80+ products with real images
   - Product detail modal (click → full details + qty selector)
   - Search & category filter
   - Cart system with images
   - Checkout & order placement
================================================================ */


/* ----------------------------------------------------------------
   PRODUCT DATA — 80+ real products with Unsplash images
---------------------------------------------------------------- */
const PRODUCTS = [

  // ── CHARGERS ──────────────────────────────────────────────────
  { id:1,  name:"65W GaN Fast Charger", desc:"Ultra-compact GaN technology. Charges your phone to 50% in just 20 minutes. Universal compatibility.", price:899,  original:1299, category:"charger", img:"https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop", specs:["65W GaN Technology","Universal USB-C","Folds flat for travel","Over-heat protection","Compatible with all phones"] },
  { id:2,  name:"20W USB-C Wall Charger", desc:"Compact and powerful. Apple & Android compatible fast charger with safety certification.", price:499,  original:799,  category:"charger", img:"https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=500&fit=crop", specs:["20W Power Delivery","USB-C port","BIS certified","Compact foldable pin","Auto voltage detection"] },
  { id:3,  name:"33W Dual Port Charger", desc:"Charge two devices simultaneously at full speed. Smart power distribution technology.", price:649,  original:999,  category:"charger", img:"https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop&sat=-20", specs:["33W total output","USB-A + USB-C ports","Smart power split","LED indicator","Surge protection"] },
  { id:4,  name:"120W Super Fast Charger", desc:"Flagship charging speed. 0 to 100% in under 30 minutes for supported devices.", price:1299, original:1999, category:"charger", img:"https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=500&fit=crop&hue=200", specs:["120W peak output","4-stage charging protection","Smart chip temperature control","Universal compatibility","Retail box included"] },
  { id:5,  name:"Wireless Charging Pad 15W", desc:"Sleek Qi wireless charging pad with fast 15W charging for all Qi-enabled devices.", price:799,  original:1299, category:"charger", img:"https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500&h=500&fit=crop", specs:["15W fast wireless","Qi certified","LED charging indicator","Non-slip surface","USB-C input"] },
  { id:6,  name:"3-in-1 Wireless Charger", desc:"Charge phone, earbuds and smartwatch simultaneously. Premium aluminium finish.", price:1499, original:2499, category:"charger", img:"https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500&h=500&fit=crop&sat=-30", specs:["Charges 3 devices at once","Compatible with Apple & Android","Aluminium + fabric finish","15W for phone","5W for earbuds/watch"] },
  { id:7,  name:"Car Fast Charger 30W", desc:"Dual USB car charger with Quick Charge 3.0. Never run out of battery on road trips.", price:449,  original:699,  category:"charger", img:"https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop&brightness=10", specs:["30W total output","QC 3.0 + USB-C PD","Dual port","Compact slim design","Works with 12V/24V cars"] },
  { id:8,  name:"65W Laptop & Phone Charger", desc:"One charger for everything. Powers laptops, tablets and phones with GaN efficiency.", price:1799, original:2999, category:"charger", img:"https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=500&fit=crop&sat=30", specs:["65W GaN Type-C","Charges laptops too","Foldable pin","BIS & CE certified","Comes with braided cable"] },
  { id:9,  name:"MagSafe Compatible Charger", desc:"Perfectly aligned magnetic wireless charging for iPhones with MagSafe support.", price:999,  original:1499, category:"charger", img:"https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500&h=500&fit=crop&hue=60", specs:["MagSafe compatible","15W for iPhone 12+","Magnetic alignment ring","Slim 6.6mm design","1m USB-C cable included"] },
  { id:10, name:"10W Wireless Charging Stand", desc:"Upright wireless charging stand for desk use. Charge and use your phone simultaneously.", price:599,  original:899,  category:"charger", img:"https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500&h=500&fit=crop&brightness=20", specs:["10W fast wireless","Portrait & landscape","Non-slip base","USB-C powered","Works with all Qi phones"] },

  // ── CABLES ────────────────────────────────────────────────────
  { id:11, name:"Braided Type-C Cable 1m", desc:"Military-grade nylon braiding. Rated for 30,000+ bends. 100W fast charging.", price:299,  original:499,  category:"cable", img:"https://images.unsplash.com/photo-1601524909162-ae8725290836?w=500&h=500&fit=crop", specs:["100W fast charging","480Mbps data transfer","Nylon braided","30,000 bend tested","1 metre length"] },
  { id:12, name:"Type-C to Type-C Cable 2m", desc:"Extra-long 2m cable for comfortable use in bed or at your desk.", price:399,  original:699,  category:"cable", img:"https://images.unsplash.com/photo-1601524909162-ae8725290836?w=500&h=500&fit=crop&sat=-20", specs:["100W PD charging","2 metre length","Braided nylon","USB 2.0 data","Tangle-free"] },
  { id:13, name:"Lightning Cable 2m", desc:"MFi certified Apple Lightning cable. Full compatibility with all iPhones and iPads.", price:449,  original:799,  category:"cable", img:"https://images.unsplash.com/photo-1601524909162-ae8725290836?w=500&h=500&fit=crop&hue=30", specs:["MFi certified","2 metre length","20W fast charge","Data sync","Works with iPad/iPhone"] },
  { id:14, name:"Magnetic 3-in-1 Cable", desc:"One cable for all your devices. Switch between Type-C, Lightning & Micro USB tips.", price:599,  original:999,  category:"cable", img:"https://images.unsplash.com/photo-1601524909162-ae8725290836?w=500&h=500&fit=crop&hue=180", specs:["3 magnetic tips included","USB-C + Lightning + Micro","65W charging","LED indicator","1.2m length"] },
  { id:15, name:"USB-C to USB-A Cable 1.5m", desc:"Backward compatible charging cable. Works with older charger bricks and power banks.", price:249,  original:399,  category:"cable", img:"https://images.unsplash.com/photo-1601524909162-ae8725290836?w=500&h=500&fit=crop&brightness=-10", specs:["USB-A to USB-C","1.5m length","480Mbps data","18W fast charge","Braided"] },
  { id:16, name:"100W USB-C Coiled Cable", desc:"Retractable coiled cable. Stays organized on your desk. Great for travel.", price:699,  original:999,  category:"cable", img:"https://images.unsplash.com/photo-1601524909162-ae8725290836?w=500&h=500&fit=crop&sat=40", specs:["100W PD","Coiled elastic design","Extends 1.5m","Self-retracting","Desk-friendly"] },
  { id:17, name:"Flat No-Tangle Cable 1m", desc:"Ultra-flat ribbon design. Never tangles in your bag. Fits perfectly in wallet.", price:349,  original:549,  category:"cable", img:"https://images.unsplash.com/photo-1601524909162-ae8725290836?w=500&h=500&fit=crop&hue=270", specs:["Flat ribbon design","Anti-tangle","Type-C","60W fast charge","1m length"] },
  { id:18, name:"Multi Charging Cable 4-in-1", desc:"One cable with 4 tips. Charges any device you own. Family-friendly all-in-one.", price:499,  original:799,  category:"cable", img:"https://images.unsplash.com/photo-1601524909162-ae8725290836?w=500&h=500&fit=crop&brightness=15", specs:["4 tips: USB-C x2, Lightning, Micro","1.2m cable","Fast charge 60W","Nylon braided","Dual device charging possible"] },

  // ── PHONE CASES ───────────────────────────────────────────────
  { id:21, name:"Crystal Clear Case", desc:"Ultra-transparent case with anti-yellowing coating. Showcases your phone's original design.", price:199,  original:349,  category:"case", img:"https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&h=500&fit=crop", specs:["Anti-yellow coating","Military drop test","Raised camera protection","Dustproof ports","Wireless charging compatible"] },
  { id:22, name:"Leather Flip Cover", desc:"Genuine PU leather flip case. 3 card slots + cash pocket. Premium feel.", price:449,  original:799,  category:"case", img:"https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&h=500&fit=crop", specs:["PU leather exterior","3 card slots + cash slot","Magnetic closure","Full 360° protection","Wallet case"] },
  { id:23, name:"Rugged Armored Case", desc:"Dual-layer shockproof case with military-grade drop protection. 3-metre drop tested.", price:549,  original:899,  category:"case", img:"https://images.unsplash.com/photo-1553179459-4514c0f52f41?w=500&h=500&fit=crop", specs:["3m drop tested","Dual-layer TPU+PC","Raised lip protection","Dust plug included","Non-slip grip"] },
  { id:24, name:"Matte Frosted Case", desc:"Silky smooth matte finish. Fingerprint resistant. Slim and minimal profile.", price:249,  original:399,  category:"case", img:"https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&h=500&fit=crop&sat=-50", specs:["Matte anti-fingerprint","1.2mm slim profile","Anti-scratch","Soft-touch finish","Wireless charging safe"] },
  { id:25, name:"MagSafe Silicone Case", desc:"Liquid silicone case with MagSafe ring for magnetic accessories and wireless charging.", price:699,  original:1199, category:"case", img:"https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&h=500&fit=crop&hue=200", specs:["MagSafe compatible","Microfibre inner lining","All-round protection","Accurate cutouts","5 colors available"] },
  { id:26, name:"Ring Stand Case", desc:"Built-in 360° rotating ring stand. Watch videos hands-free. Use as grip.", price:349,  original:599,  category:"case", img:"https://images.unsplash.com/photo-1553179459-4514c0f52f41?w=500&h=500&fit=crop&hue=60", specs:["360° rotating ring","Kickstand for landscape","Magnetic car mount compatible","TPU shock absorption","Wireless charging compatible"] },
  { id:27, name:"Transparent Back Cover", desc:"Simple minimal transparent hard case. 0.3mm ultra-slim. Barely-there protection.", price:149,  original:249,  category:"case", img:"https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&h=500&fit=crop&brightness=-20", specs:["0.3mm ultra thin","Hard PC shell","Anti-scratch","All buttons accessible","Transparent look"] },
  { id:28, name:"Luxury Glitter Case", desc:"Sparkly glitter liquid case with flowing shimmer particles. Stand out from the crowd.", price:299,  original:499,  category:"case", img:"https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&h=500&fit=crop&sat=60", specs:["Liquid glitter float","Shockproof TPU","Scratch-resistant back","Precise cutouts","Girls' favourite"] },
  { id:29, name:"Carbon Fibre Texture Case", desc:"Premium carbon fibre texture design. Lightweight yet extremely durable.", price:399,  original:699,  category:"case", img:"https://images.unsplash.com/photo-1553179459-4514c0f52f41?w=500&h=500&fit=crop&sat=-40", specs:["Carbon fibre look","Heat dissipation","Military drop protection","Anti-slip texture","Slim 1.5mm"] },
  { id:30, name:"Waterproof Heavy Duty Case", desc:"IP68 rated waterproof case. Protect your phone in rain, pools and dusty environments.", price:799,  original:1299, category:"case", img:"https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&h=500&fit=crop&hue=200", specs:["IP68 waterproof rated","6m drop protection","Dustproof sealed","Screen clarity maintained","For outdoor use"] },

  // ── EARPHONES ─────────────────────────────────────────────────
  { id:31, name:"Bass Boost Wired Earphones", desc:"Deep powerful bass with crystal clear highs. 14.2mm dynamic driver for immersive audio.", price:699,  original:999,  category:"earphone", img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop", specs:["14.2mm dynamic driver","Deep bass enhancement","In-line mic + remote","Tangle-free cable","3.5mm jack"] },
  { id:32, name:"True Wireless Earbuds", desc:"True wireless freedom. 30-hour total battery with ANC and IPX5 water resistance.", price:1299, original:2499, category:"earphone", img:"https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop", specs:["30hr total battery","Active Noise Cancelling","IPX5 water resistant","Touch controls","Bluetooth 5.3"] },
  { id:33, name:"Gaming Earphones RGB", desc:"Ultra-low latency gaming earphones with RGB breathing lights and powerful mic.", price:999,  original:1799, category:"earphone", img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&hue=270", specs:["<20ms low latency","RGB breathing effect","Detachable mic","Dual mode: wired/wireless","50hr battery"] },
  { id:34, name:"Noise Cancelling Headphones", desc:"Over-ear premium headphones with 40dB active noise cancellation. Perfect for travel.", price:2499, original:4999, category:"earphone", img:"https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop", specs:["40dB ANC","60hr battery","Foldable design","USB-C charging","Hi-Res audio certified"] },
  { id:35, name:"Sports Wireless Earphones", desc:"Stay-in-ear design for workouts. IPX7 waterproof, hook design for secure fit.", price:799,  original:1299, category:"earphone", img:"https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop&hue=90", specs:["IPX7 waterproof","Ear hook design","10hr playback","Magnetic snap","Fast charge 10min=1hr"] },
  { id:36, name:"Bone Conduction Headphones", desc:"Next-gen bone conduction technology. Hear music and surroundings simultaneously.", price:1999, original:3499, category:"earphone", img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&sat=-30", specs:["Bone conduction tech","Open ear design","IP68 waterproof","8hr battery","Safe for cyclists & runners"] },
  { id:37, name:"Kids Safe Volume Earphones", desc:"Volume limited to 85dB to protect children's hearing. Colourful fun design.", price:499,  original:799,  category:"earphone", img:"https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop&sat=60", specs:["85dB volume limit","Kid-safe design","Soft cushion","Durable cable","Colourful options"] },
  { id:38, name:"Premium IEM Earphones", desc:"In-ear monitors used by musicians and audiophiles. Studio-grade sound quality.", price:1799, original:3499, category:"earphone", img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&brightness=10", specs:["Dual-driver IEM","Detachable cable","Studio reference sound","Deep bass extension","Audiophile grade"] },

  // ── POWER BANKS ───────────────────────────────────────────────
  { id:41, name:"10000mAh Slim Power Bank", desc:"Ultra-slim 10000mAh power bank. Fits in your pocket. Dual output for 2 devices.", price:999,  original:1599, category:"powerbank", img:"https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop&hue=180", specs:["10000mAh capacity","Dual USB output","USB-C input+output","LED indicator 4 lights","140g lightweight"] },
  { id:42, name:"20000mAh Pro Power Bank", desc:"Massive 20000mAh with 65W PD. Powers laptops, tablets and phones on the go.", price:1799, original:2999, category:"powerbank", img:"https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop&sat=30", specs:["20000mAh","65W PD fast charge","Powers laptops","3 output ports","Digital display"] },
  { id:43, name:"5000mAh Credit Card Power Bank", desc:"Ultra thin power bank the size of a credit card. Always keep it in your wallet.", price:699,  original:999,  category:"powerbank", img:"https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop&brightness=-15", specs:["5000mAh","Credit card size","Built-in cables (C+Lightning)","9.5mm ultra thin","No cable needed"] },
  { id:44, name:"Solar Power Bank 20000mAh", desc:"Dual charging via solar panel or USB-C. Never run out of battery outdoors.", price:1499, original:2499, category:"powerbank", img:"https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&h=500&fit=crop", specs:["Solar charging panel","20000mAh","IPX6 waterproof","3 USB ports","Flashlight built-in"] },
  { id:45, name:"Wireless Power Bank 10000mAh", desc:"Charge wirelessly! No cable needed. Just place your phone on the back to charge.", price:1299, original:1999, category:"powerbank", img:"https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500&h=500&fit=crop&hue=180", specs:["Wireless charging output","10000mAh","15W wireless","USB-C + USB-A","Qi compatible"] },
  { id:46, name:"Fast Charge Power Bank 22.5W", desc:"22.5W input and output for ultra-fast recharge. Fully recharges in just 2 hours.", price:1199, original:1899, category:"powerbank", img:"https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop&hue=300", specs:["22.5W fast charge","10000mAh","2hr full recharge","LED percentage display","USB-C + USB-A"] },

  // ── PHONE HOLDERS ─────────────────────────────────────────────
  { id:51, name:"Magnetic Car Mount", desc:"Strong magnetic car phone mount. Dashboard or vent attachment. One-hand operation.", price:349,  original:599,  category:"holder", img:"https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=500&fit=crop", specs:["N52 strong magnet","Dashboard + AC vent clip","360° rotation","Universal compatibility","1-hand operation"] },
  { id:52, name:"Bike & Cycle Phone Holder", desc:"Secure your phone on handlebars. 360° rotation. Fits phones up to 6.8 inches.", price:299,  original:499,  category:"holder", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop", specs:["Fits 4.7\" to 6.8\"","Anti-vibration design","One-button release","360° adjustable","Weatherproof build"] },
  { id:53, name:"Foldable Phone Stand", desc:"Adjustable foldable aluminium desk stand. Works for phones and small tablets.", price:249,  original:399,  category:"holder", img:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop", specs:["Aluminium build","Height adjustable","Folds flat","Multiple angle support","Non-slip base"] },
  { id:54, name:"Selfie Ring Light Stand", desc:"LED ring light with adjustable phone holder. Perfect for content creation.", price:799,  original:1299, category:"holder", img:"https://images.unsplash.com/photo-1492367100610-26e68e3b8524?w=500&h=500&fit=crop", specs:["10-inch LED ring","3 light modes","10 brightness levels","Flexible arm","Bluetooth remote included"] },
  { id:55, name:"Gooseneck Flexible Phone Holder", desc:"360° flexible gooseneck arm. Clamp to bed, desk, or couch. Hands-free viewing.", price:449,  original:699,  category:"holder", img:"https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&h=500&fit=crop", specs:["Fully flexible gooseneck","Strong clamp base","360° rotation","Lazy bed holder","Fits 4.5\"-7\" phones"] },
  { id:56, name:"Magnetic Wireless Car Charger", desc:"Magnetic car mount with built-in 15W wireless charging. Charge while you drive.", price:999,  original:1799, category:"holder", img:"https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&h=500&fit=crop&hue=60", specs:["15W wireless charging","MagSafe compatible","360° rotation","AC vent attachment","USB-C powered"] },

  // ── SCREEN GUARDS ─────────────────────────────────────────────
  { id:61, name:"Tempered Glass Screen Guard", desc:"9H hardness tempered glass. Crystal clear with oleophobic coating. Anti-scratch.", price:149,  original:299,  category:"screen", img:"https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&h=500&fit=crop&hue=120", specs:["9H hardness","0.3mm thin","Oleophobic coating","Anti-scratch","Easy bubble-free install"] },
  { id:62, name:"Privacy Screen Guard", desc:"Anti-spy screen protector. Only visible from directly in front. 180° privacy filter.", price:249,  original:449,  category:"screen", img:"https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&h=500&fit=crop&hue=240", specs:["180° privacy filter","9H tempered glass","Anti-glare","Blue light filter","Full coverage"] },
  { id:63, name:"Matte Anti-Glare Screen Guard", desc:"Matte finish reduces reflections and glare. Perfect for outdoor use.", price:199,  original:349,  category:"screen", img:"https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&h=500&fit=crop&sat=-60", specs:["Anti-glare matte finish","9H hardness","Blue light filter","Fingerprint resistant","Touch sensitivity maintained"] },
  { id:64, name:"Full Coverage Curved Glass", desc:"Full curved edge-to-edge coverage for curved display phones.", price:299,  original:499,  category:"screen", img:"https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&h=500&fit=crop&brightness=-10", specs:["Full curved coverage","Self-healing edges","9H hardness","Perfect fit for curved screens","2-pack included"] },
  { id:65, name:"Camera Lens Protector Ring", desc:"Metal + glass lens protector ring for all cameras. Prevents scratches on expensive lenses.", price:199,  original:349,  category:"screen", img:"https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&h=500&fit=crop&hue=60", specs:["Aerospace grade aluminium ring","Optical glass lens cover","Easy application","Doesn't affect photos","Multiple camera support"] },
  { id:66, name:"Hydrogel Screen Protector", desc:"Flexible hydrogel film. Self-heals minor scratches automatically. Full wrap possible.", price:179,  original:299,  category:"screen", img:"https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&h=500&fit=crop&hue=300", specs:["Self-healing film","Flexible hydrogel","Full wrap compatible","Touch responsive","2-pack value deal"] },

  // ── MORE CHARGERS ─────────────────────────────────────────────
  { id:71, name:"Night Light Wireless Charger", desc:"Wireless charging pad with ambient night light. Beautiful on your bedside table.", price:899,  original:1499, category:"charger", img:"https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=500&h=500&fit=crop&hue=30", specs:["10W wireless charge","Soft night light 7 colors","Touch to change light","USB-C input","Non-slip base"] },
  { id:72, name:"4-Port USB Hub Charger", desc:"Desktop charging station for the whole family. 4 USB ports, 100W total output.", price:999,  original:1799, category:"charger", img:"https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=500&fit=crop&brightness=-10", specs:["4 USB ports","100W total output","USB-C PD 65W","Smart chip","LED indicator"] },
  { id:73, name:"Travel Adapter with USB", desc:"Universal travel adapter with 4 USB ports. Works in 150+ countries.", price:799,  original:1299, category:"charger", img:"https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop&brightness=5", specs:["150+ countries","4 USB ports","USB-C + 3x USB-A","Compact cube","Safety certified"] },

  // ── MORE CABLES ───────────────────────────────────────────────
  { id:81, name:"Glow in Dark Cable", desc:"Unique cable that glows blue while charging. Great for night use.", price:399,  original:649,  category:"cable", img:"https://images.unsplash.com/photo-1601524909162-ae8725290836?w=500&h=500&fit=crop&hue=240", specs:["Glows while charging","Type-C","60W charge","Data transfer","1m length"] },
  { id:82, name:"Short 30cm Charging Cable", desc:"Ultra-short 30cm cable. Perfect for charging from power bank in pocket.", price:199,  original:349,  category:"cable", img:"https://images.unsplash.com/photo-1601524909162-ae8725290836?w=500&h=500&fit=crop&sat=20", specs:["30cm short length","USB-C","60W fast charge","Pocket friendly","Braided"] },
  { id:83, name:"Micro USB Cable 3-Pack", desc:"Value pack of 3 micro USB cables. Great for older Android devices.", price:299,  original:499,  category:"cable", img:"https://images.unsplash.com/photo-1601524909162-ae8725290836?w=500&h=500&fit=crop&brightness=-5", specs:["3 cables in pack","Micro USB","18W charge","1m length each","Nylon braided"] },

  // ── MORE EARPHONES ────────────────────────────────────────────
  { id:91, name:"USB-C Earphones", desc:"High quality earphones with USB-C connector. For phones without headphone jack.", price:449,  original:699,  category:"earphone", img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&hue=120", specs:["USB-C connector","Hi-Res audio","In-line mic","Volume controls","For USB-C phones"] },
  { id:92, name:"Neck Band Wireless Earphones", desc:"Magnetic neckband wireless earphones. Auto-pause when magnets connect.", price:899,  original:1499, category:"earphone", img:"https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop&hue=180", specs:["Neckband design","Auto-pause on connect","15hr battery","IPX5 waterproof","Fast charge 10min=2hr"] },
  { id:93, name:"Open Ear Clip Earphones", desc:"Clip-on open ear design. No ear canal insertion. Comfortable all-day wear.", price:1299, original:1999, category:"earphone", img:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&sat=40", specs:["Clip-on open ear","No ear canal","8hr battery","Bone conduction adjacent","Bluetooth 5.2"] },
];


/* ----------------------------------------------------------------
   SHUTTER ANIMATION
---------------------------------------------------------------- */
const shutterOverlay = document.getElementById('shutterOverlay');
const shutterBody    = document.getElementById('shutterBody');
const storeWrapper   = document.getElementById('storeWrapper');

let shutterY     = 0;
let shutterOpen  = false;
const OPEN_THRESHOLD = window.innerHeight * 0.9;

document.body.classList.add('shutter-active');

window.addEventListener('wheel', handleShutterScroll, { passive: false });

let touchStartY = 0;
window.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
window.addEventListener('touchmove', e => {
  if (shutterOpen) return;
  const delta = touchStartY - e.touches[0].clientY;
  if (delta > 0) { e.preventDefault(); moveShutter(delta * 1.5); }
}, { passive: false });

function handleShutterScroll(e) {
  if (shutterOpen) return;
  e.preventDefault();
  if (e.deltaY > 0) moveShutter(e.deltaY * 1.5);
}

function moveShutter(delta) {
  shutterY = Math.min(shutterY + delta, window.innerHeight * 1.1);
  shutterBody.style.transform = `translateY(-${shutterY}px)`;
  if (shutterY >= OPEN_THRESHOLD) openStore();
}

function openStore() {
  if (shutterOpen) return;
  shutterOpen = true;
  shutterBody.style.transition = 'transform 0.55s cubic-bezier(0.4,0,0.2,1)';
  shutterBody.style.transform  = 'translateY(-110vh)';
  setTimeout(() => {
    shutterOverlay.classList.add('hidden');
    document.body.classList.remove('shutter-active');
    storeWrapper.classList.add('visible');
    window.removeEventListener('wheel', handleShutterScroll);
  }, 550);
}


/* ----------------------------------------------------------------
   RENDER PRODUCTS
---------------------------------------------------------------- */
let currentFilter = 'all';
let currentSearch = '';

function renderProducts() {
  const grid   = document.getElementById('productsGrid');
  const noRes  = document.getElementById('noResults');
  const count  = document.getElementById('productCount');

  const filtered = PRODUCTS.filter(p => {
    const matchCat    = currentFilter === 'all' || p.category === currentFilter;
    const matchSearch = p.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
                        p.desc.toLowerCase().includes(currentSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  count.textContent = `${filtered.length} products`;
  grid.innerHTML = '';

  if (filtered.length === 0) { noRes.style.display = 'block'; return; }
  noRes.style.display = 'none';

  const discount = p => Math.round((1 - p.price / p.original) * 100);

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => openProductModal(p.id);
    card.innerHTML = `
      <div style="position:relative;overflow:hidden">
        <img class="product-img" src="${p.img}" alt="${p.name}" loading="lazy"
             onerror="this.src='https://images.unsplash.com/photo-1601524909162-ae8725290836?w=500&h=500&fit=crop'"/>
        <span class="product-badge">${p.category}</span>
        <span class="discount-badge">-${discount(p)}%</span>
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-price-row">
          <span class="product-price">₹${p.price}</span>
          <span class="product-original">₹${p.original}</span>
        </div>
        <button class="product-card-btn" onclick="event.stopPropagation(); openProductModal(${p.id})">
          View Details
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

renderProducts();


/* ----------------------------------------------------------------
   SEARCH & FILTER
---------------------------------------------------------------- */
function searchProducts() {
  currentSearch = document.getElementById('searchInput').value;
  renderProducts();
}

function filterCategory(cat, btn) {
  currentFilter = cat;
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  renderProducts();
}


/* ----------------------------------------------------------------
   PRODUCT DETAIL MODAL
---------------------------------------------------------------- */
let modalCurrentProduct = null;
let modalQty = 1;

function openProductModal(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;

  modalCurrentProduct = p;
  modalQty = 1;

  const discount = Math.round((1 - p.price / p.original) * 100);

  document.getElementById('modalProductImg').src   = p.img;
  document.getElementById('modalProductImg').alt   = p.name;
  document.getElementById('modalBadge').textContent = p.category.toUpperCase();
  document.getElementById('modalCategory').textContent = p.category.toUpperCase();
  document.getElementById('modalProductName').textContent = p.name;
  document.getElementById('modalProductDesc').textContent = p.desc;
  document.getElementById('modalPrice').textContent = `₹${p.price}`;
  document.getElementById('modalOriginalPrice').textContent = `₹${p.original}`;
  document.getElementById('modalDiscount').textContent = `${discount}% OFF`;
  document.getElementById('modalQty').textContent = 1;

  // Render specs
  const specsEl = document.getElementById('modalSpecs');
  specsEl.innerHTML = (p.specs || []).map(s => `<li>${s}</li>`).join('');

  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('open');
  document.body.style.overflow = '';
}

function changeModalQty(delta) {
  modalQty = Math.max(1, Math.min(10, modalQty + delta));
  document.getElementById('modalQty').textContent = modalQty;
}

function addToCartFromModal() {
  if (!modalCurrentProduct) return;

  for (let i = 0; i < modalQty; i++) {
    addToCart(modalCurrentProduct.id, true);
  }

  // Button feedback
  const btn = document.getElementById('modalAddBtn');
  btn.textContent = `✅ ${modalQty} item${modalQty > 1 ? 's' : ''} Added!`;
  btn.style.background = 'linear-gradient(135deg, #00a844, #00c851)';
  btn.style.color = '#fff';

  setTimeout(() => {
    btn.textContent = '🛒 Add to Cart';
    btn.style.background = '';
    btn.style.color = '';
    closeProductModal();
    toggleCart();
  }, 1200);
}


/* ----------------------------------------------------------------
   CART SYSTEM
---------------------------------------------------------------- */
let cart = [];

function addToCart(productId, silent = false) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(i => i.product.id === productId);
  if (existing) { existing.qty += 1; }
  else { cart.push({ product, qty: 1 }); }

  updateCartUI();
  if (!silent) showToast(`✓ ${product.name} added!`);
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.product.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.product.id !== productId);
  updateCartUI();
}

function getCartTotal() {
  return cart.reduce((sum, i) => sum + i.product.price * i.qty, 0);
}

function updateCartUI() {
  const total = getCartTotal();
  const count = cart.reduce((s, i) => s + i.qty, 0);

  document.getElementById('cartCount').textContent = count;

  const el = document.getElementById('cartItems');

  if (cart.length === 0) {
    el.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p>Your cart is empty</p>
        <p style="font-size:0.8rem;margin-top:0.5rem;color:var(--text-muted)">Add products to get started</p>
      </div>`;
  } else {
    el.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.product.img}" alt="${item.product.name}"
             onerror="this.style.display='none'"/>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.product.name}</div>
          <div class="cart-item-price">₹${item.product.price} × ${item.qty} = ₹${item.product.price * item.qty}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.product.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.product.id}, +1)">+</button>
        </div>
      </div>`).join('');
  }

  document.getElementById('cartTotal').textContent = `₹${total}`;
}

function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}

updateCartUI();


/* ----------------------------------------------------------------
   CHECKOUT
---------------------------------------------------------------- */
function openCheckout() {
  if (cart.length === 0) { showToast('Your cart is empty!'); return; }

  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');

  const summaryEl = document.getElementById('orderSummary');
  summaryEl.innerHTML = cart.map(item => `
    <div class="summary-item">
      <span>${item.product.name} × ${item.qty}</span>
      <strong>₹${item.product.price * item.qty}</strong>
    </div>`).join('') + `
    <div class="summary-item" style="border-top:1px solid #2d2050;padding-top:0.5rem;margin-top:0.25rem">
      <span>Total</span>
      <strong style="color:var(--gold)">₹${getCartTotal()}</strong>
    </div>`;

  document.getElementById('checkoutTotal').textContent = `₹${getCartTotal()}`;
  document.getElementById('checkoutModal').classList.add('open');
}

function closeCheckout() {
  document.getElementById('checkoutModal').classList.remove('open');
}


/* ----------------------------------------------------------------
   PLACE ORDER
---------------------------------------------------------------- */
async function placeOrder() {
  const name    = document.getElementById('custName').value.trim();
  const phone   = document.getElementById('custPhone').value.trim();
  const address = document.getElementById('custAddress').value.trim();
  const payment = document.querySelector('input[name="payment"]:checked').value;

  if (!name)          { highlight('custName',    'Enter your name');    return; }
  if (!phone)         { highlight('custPhone',   'Enter phone number'); return; }
  if (phone.length < 10) { highlight('custPhone','Valid 10-digit number'); return; }
  if (!address)       { highlight('custAddress', 'Enter your address'); return; }

  const order = {
    customerName:  name,
    phone:         phone,
    address:       address,
    paymentMethod: payment,
    items: cart.map(i => ({
      id:       i.product.id,
      name:     i.product.name,
      price:    i.product.price,
      qty:      i.qty,
      subtotal: i.product.price * i.qty
    })),
    totalPrice: getCartTotal(),
    timestamp:  new Date().toISOString(),
    status:     'pending'
  };

  const btn = document.querySelector('.place-order-btn');
  btn.textContent = 'Placing order...';
  btn.disabled = true;

  try {
    const orderId = await window.saveOrder(order);
    closeCheckout();

    document.getElementById('displayOrderId').textContent = orderId;
    document.getElementById('successMessage').textContent =
      `Thank you ${name}! Your order of ₹${getCartTotal()} has been placed via ${payment}. We'll contact you at ${phone} shortly.`;
    document.getElementById('successModal').classList.add('open');

    cart = [];
    updateCartUI();
  } catch (err) {
    console.error('Order error:', err);
    alert('Order could not be placed. Please try again.');
  }

  btn.textContent = '✅ Place Order';
  btn.disabled = false;
}

function closeSuccess() {
  document.getElementById('successModal').classList.remove('open');
}

function highlight(id, msg) {
  const el = document.getElementById(id);
  el.style.borderColor = '#ff4444';
  el.placeholder = msg;
  el.focus();
  setTimeout(() => { el.style.borderColor = ''; el.placeholder = ''; }, 2500);
}

// Close product modal on overlay click
document.getElementById('productModal').addEventListener('click', function(e) {
  if (e.target === this) closeProductModal();
});


/* ----------------------------------------------------------------
   TOAST
---------------------------------------------------------------- */
function showToast(message) {
  const old = document.getElementById('toast');
  if (old) old.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position:fixed; bottom:2rem; left:50%;
    transform:translateX(-50%) translateY(16px);
    background:var(--bg-card);
    color:var(--gold);
    border:1px solid rgba(212,175,55,0.3);
    padding:0.7rem 1.5rem;
    border-radius:99px;
    font-size:0.88rem;
    z-index:9000;
    opacity:0;
    transition:all 0.3s ease;
    white-space:nowrap;
    font-weight:500;
  `;

  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '1'; toast.style.transform = 'translateX(-50%) translateY(0)'; }, 10);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(16px)';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}