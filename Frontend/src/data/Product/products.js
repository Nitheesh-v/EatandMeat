import currycut from "../../assets/chicken curry cut.webp"
import brestBL from "../../assets/brest boneles.webp"
import blCubes from "../../assets/boneles cubes.webp"
// import chikLiver from "../../assets/chik liver.webp"
// import counChik from "../../assets/country chiken.webp"
// import currycutSon from "../../assets/curry cut skin on.webp"
// import legPi from "../../assets/leg pi.webp"
// import lolipop from "../../assets/lollipop.webp"
// import minChop from "../../assets/minced chop.webp"
// import smoky from "../../assets/smoky country.webp"
import wings from "../../assets/wings.webp"
import Drumsticks from "../../assets/drumstick.webp"
import ChikLiverCombo from "../../assets/combo liv.jpg"

const products = [
  {
    id: 1,
    name: "Chicken Curry Cut",
    category: "Fresh Chicken",
    weight: "500 g",
    price: 220,
    image: currycut,
    description:"As most of the fat content in a chicken is stored in its skin, our chicken curry cut without the skin is a healthy alternative. A great source of lean, low-fat protein that is bursting with flavour and is ready to fall off the bone as soon as you cook it. Ideal for: An evergreen cut, you can make anything from Chettinadu, Mughlai, Punjabi, Tandoori to Chinese cuisine, with our chicken curry cut. Freshness Indicator: The chicken should be pink in colour and cold to touch. Tip: It is very easy to overcook this cut, leaving it dry and rubbery, so watch like a hawk while you are cooking.",
    stock: true,
  },

  {
    id: 2,
    name: "Chicken Breast",
    category: "Fresh Chicken",
    weight: "500 g",
    price: 280,
    image: brestBL,
    description:"One of the most popular and versatile parts, chicken breast is trimmed up with no bone or skin. Delicious pink meat with very little fat and an excellent source of lean protein.",
    stock: true,
  },

  {
    id: 3,
    name: "Chicken Boneless",
    category: "Fresh Chicken",
    weight: "500 g",
    price: 320,
    image: blCubes,
    description:"Fresh pack of boneless and buttery chicken pieces cut in cubes. These supple chicken await your added masalas to absorb like a sponge, and transform into tangy chicken recipes on your plates. We have carefully curated the soft, slimy breast portions cut in uniform shapes so that they get evenly cooked. Being free from bones, you can go on and eat them with zero worries. These tiny darlings will easily become everyone's favourite in your home right from kids to elders.",
    stock: true,
  },

  {
    id: 4,
    name: "Chicken Wings",
    category: "Fresh Chicken",
    weight: "500 g",
    price: 190,
    image: wings,
    description:"Chicken Wings is a mix of meaty and bone-in cut of the chicken. This cut includes bone-in pieces with skin that are succulent and flavourful.",
    stock: true,
  },

  {
    id: 5,
    name: "Chicken Drumsticks",
    category: "Fresh Chicken",
    weight: "500 g",
    price: 240,
    image: Drumsticks,
    description:"The lower quarter of the chicken’s leg, meticulously cut for even cooking. Inexpensive and easy to cook, you can drum up a culinary storm.",
    stock: true,
  },

  {
    id: 6,
    name: "Chicken Fry Masala",
    category: "Masalas",
    weight: "100 g",
    price: 120,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600",
    stock: true,
    description:"Thillais Easy Pallipalayam Mix is perhaps the only one variant in the market that makes legendary chicken recipe from the Kongu region into an easy single serve pack that replicates authentic Pallipalayam Chicken."
  },

  {
    id: 7,
    name: "Chicken 65 Masala",
    category: "Masalas",
    weight: "100 g",
    price: 140,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600",
    stock: true,
      description:"Our Easy Chicken 65 mix helps you make your favourite restaurant style chicken 65 in the comfort of your kitchen. This is a single serve pack that includes all the ingredients needed. You only need 500gms of cubed chicken pieces and edible oil.This Spice mix can also be used to make gobi 65, paneer 65, mushroom 65."
  },
   {
    id: 8,
    name: "Biryani Cut Skin Off [480Gms - 500Gms] + Chicken Liver [190Gms - 210Gms]",
    category: "Combos",
    weight: "500 g",
    price: 260,
    image: ChikLiverCombo,
    stock: true,
      description:"Fresh chicken can be cooked in a variety of ways. They can be roasted, grilled, fried, sautéed, or baked. Cooking methods depend on the size of the chicken, your preference, and the dish that is being prepared. Buying this biryani cut (skin off) + chicken liver combo will let you prepare your favourite dishes."
  },
];

export default products;