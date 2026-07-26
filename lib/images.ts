// Unsplash imagery (free to use). Each is wrapped in a gradient-backed
// container in the UI so the design degrades gracefully if an image fails.
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const img = {
  heroFood: u("1414235077428-338989a2e8c0", 1600),
  interior: u("1517248135467-4c7edcad34c4", 1400),
  ribs: u("1544025162-d76694265947"),
  steak: u("1546241072-48010ad2862c"),
  salad: u("1546069901-ba9599a7e63c"),
  seafood: u("1559737558-2f5a35f4523b"),
  pasta: u("1621996346565-e3dbc646d9a9"),
  dessert: u("1551024601-bec78aea704b"),
  cooler: u("1536935338788-846bb9981813"),
  plating: u("1600891964599-f61ba0e24092"),
  chef: u("1577219491135-ce391730fb2c"),
  ambiance: u("1552566626-52f8b828add9", 1400),
  grill: u("1529193591184-b1d58069ecdd"),
  swing: u("1533777857889-4be7c70b33f7", 1400),
  gallery1: u("1504674900247-0877df9cc836"),
  gallery2: u("1565958011703-44f9829ba187"),
  gallery3: u("1414235077428-338989a2e8c0"),
  gallery4: u("1559339352-11d035aa65de"),
  gallery5: u("1540189549336-e6e99c3679fe"),
  gallery6: u("1550547660-d9450f859349"),
};
