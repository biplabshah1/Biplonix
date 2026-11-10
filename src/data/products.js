// Placeholder catalogue. Replace with your real SKUs, prices and stock (or load from an API).
export const COL = { Black: "#1a1a1a", White: "#f7f6f2", Cream: "#e8dfc9", Grey: "#8d8d8a" };
export const SIZES = ["XS", "S", "M", "L", "XL"];
export const CATS = { all: "All", tee: "T-shirts", hoodie: "Hoodies & sweatshirts", pants: "Trousers", acc: "Accessories" };
export const FREE_SHIPPING_OVER = 60;
export const SHIPPING_COST = 3.95;

export const FIT = {
  tee: "Oversized, boxy fit. Model is 180 cm and wears M.",
  hoodie: "Relaxed fit with a dropped shoulder. True to size.",
  pants: "Relaxed through the leg, elastic waist with drawcord.",
  acc: "One size.",
};
export const MATERIAL = {
  tee: "100% organic cotton, 220 gsm",
  hoodie: "80% cotton, 20% recycled polyester, 380 gsm brushed fleece",
  pants: "100% cotton twill, 300 gsm",
  acc: "100% cotton canvas",
};
export const CARE = {
  tee: "Machine wash cold, inside out. Do not tumble dry.",
  hoodie: "Machine wash cold, inside out. Line dry.",
  pants: "Machine wash 30°C. Iron on low heat.",
  acc: "Spot clean or hand wash.",
};
// Garment measurements in cm: [size, chest/waist, length]
export const SIZE_GUIDE = {
  tee: [["XS", 50, 66], ["S", 52, 68], ["M", 55, 70], ["L", 58, 72], ["XL", 61, 74]],
  hoodie: [["XS", 54, 64], ["S", 56, 66], ["M", 59, 68], ["L", 62, 70], ["XL", 65, 72]],
  pants: [["XS", 36, 98], ["S", 38, 100], ["M", 40, 102], ["L", 42, 104], ["XL", 44, 106]],
};

const raw = [
  ["tee-core", "Core Oversized Tee", "tee", 32, ["Black", "White", "Cream", "Grey"], "Heavyweight everyday tee.", true],
  ["tee-logo", "Wordmark Tee", "tee", 36, ["Black", "White"], "Chest wordmark, soft-touch print.", true],
  ["tee-box", "Boxy Pocket Tee", "tee", 34, ["Cream", "Grey"], "Cropped boxy cut with a chest pocket.", false],
  ["tee-wash", "Washed Tee", "tee", 38, ["Grey", "Black"], "Garment-washed for a worn-in feel.", false],
  ["hood-core", "Core Hoodie", "hoodie", 65, ["Black", "Grey", "Cream"], "Brushed-back fleece, double-layer hood.", true],
  ["hood-zip", "Zip Hoodie", "hoodie", 72, ["Black", "Grey"], "Full zip with hidden pocket.", false],
  ["crew-core", "Crewneck Sweatshirt", "hoodie", 55, ["Cream", "Black", "White"], "Ribbed trims, mid-weight loopback.", false],
  ["pant-jog", "Tapered Joggers", "pants", 58, ["Black", "Grey"], "Tapered leg with zip ankle.", true],
  ["pant-wide", "Wide Twill Trousers", "pants", 68, ["Cream", "Black"], "Wide leg, front pleat, twill.", false],
  ["pant-cargo", "Utility Trousers", "pants", 74, ["Grey", "Black"], "Two cargo pockets, adjustable hem.", false],
  ["cap-core", "Six-Panel Cap", "acc", 24, ["Black", "Cream"], "Unstructured, adjustable strap.", true],
  ["tote-core", "Canvas Tote", "acc", 18, ["Cream", "Black"], "Heavy canvas, inner pocket.", false],
];

export const sizesFor = (p) => (p.cat === "acc" ? ["One size"] : SIZES);
export const stockKey = (colour, size) => `${colour}|${size}`;

export const PRODUCTS = raw.map(([id, name, cat, price, colours, description, isNew]) => {
  const p = { id, name, cat, price, colours, description, isNew, stock: {} };
  colours.forEach((c, i) =>
    sizesFor(p).forEach((s, j) => {
      p.stock[stockKey(c, s)] = (i * 3 + j * 2 + id.length) % 7 === 0 ? 0 : ((i + j + id.length) % 6) + 1;
    })
  );
  return p;
});

export const findProduct = (id) => PRODUCTS.find((p) => p.id === id);
export const totalStock = (p) => Object.values(p.stock).reduce((a, b) => a + b, 0);
export const money = (n) => "£" + n.toFixed(2).replace(".00", "");
