import { COL } from "../data/products.js";

const PATHS = {
  tee: "M60 20 L90 8 Q110 26 130 8 L160 20 L190 56 L164 72 L158 60 L158 190 L62 190 L62 60 L56 72 L30 56Z",
  hoodie: "M62 24 Q110 -6 158 24 L196 62 L190 150 L162 150 L162 192 L58 192 L58 150 L30 150 L24 62Z",
  pants: "M62 8 L158 8 L172 196 L120 196 L110 70 L100 196 L48 196Z",
  cap: "M30 130 Q30 40 110 40 Q190 40 190 130 L210 140 L200 150 L30 150Z",
  tote: "M62 70 L158 70 L170 192 L50 192Z",
};

// Placeholder artwork. Swap for <img src={product.image} /> once you have real photography.
export default function Garment({ product, colour }) {
  const kind = product.cat === "acc" ? (product.id.startsWith("cap") ? "cap" : "tote") : product.cat;
  const line = { stroke: "#00000033", strokeWidth: 2, strokeLinejoin: "round" };
  return (
    <svg viewBox="0 0 220 200" role="img" aria-label={`${product.name} in ${colour}`}>
      <path d={PATHS[kind]} fill={COL[colour]} {...line} />
      {kind === "tote" && <path d="M82 70 Q82 20 110 20 Q138 20 138 70" fill="none" {...line} />}
    </svg>
  );
}
