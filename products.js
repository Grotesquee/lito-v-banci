// Product list. To add a new jar: copy one block, change the text, put the label image into img/.
// Later this list can come from a Google Sheet, so Vita can edit it from her phone.
// Descriptions are drafts written from the labels. Vita must check them.

const SHOP = {
  instagram: "cook_and_gossip",
  tiktok: "cook_and_gossip",
  youtube: "cook_and_gossip",
  threads: "cook_and_gossip",
  // Where orders are sent (Telegram bot via a small Google Apps Script). Empty = test mode.
  orderEndpoint: "https://script.google.com/macros/s/AKfycbw3ImrBQ6JxI1WmM7dTuBG7_AgJomNBSxn8wR04yGm8VMoluZop2HPJfk67dsU9NGAs/exec",
  prices: [
    { size: "100 мл", price: 99 },
    { size: "200 мл", price: 199 },
  ],
  // size = index in prices
  sets: [
    { size: 0, count: 6, title: "Набір 6 × 100 мл", text: "6 смаків по 100 мл", price: 549, old: 594 },
    { size: 1, count: 6, title: "Набір 6 × 200 мл", text: "6 смаків по 200 мл", price: 1149, old: 1194 },
  ],
};

const PRODUCTS = [
  { id: "strawberry", name: "Полуничний джем", cat: "jam", img: "img/strawberry.jpg",
    text: "Стигла полуниця, зварена по-домашньому. Смак червня в кожній ложці." },
  { id: "raspberry", name: "Малиновий джем", cat: "jam", img: "img/raspberry.jpg",
    text: "Ароматна малина. До чаю, млинців і сирників." },
  { id: "cherry", name: "Вишневий джем", cat: "jam", img: "img/cherry.jpg",
    text: "Соковита вишня з легкою кислинкою." },
  { id: "plum", name: "Сливовий джем", cat: "jam", img: "img/plum.jpg",
    text: "Густий джем із темної сливи." },
  { id: "plum-orange", name: "Джем слива-апельсин", cat: "jam", img: "img/plum-orange.jpg",
    text: "Слива і апельсин: солодко, свіжо, з цитрусовою ноткою." },
  { id: "peach-lemon-vanilla", name: "Персик-лимон-ваніль", cat: "jam", img: "img/peach-lemon-vanilla.jpg",
    text: "Ніжний персик, лимон і ваніль." },
  { id: "pear", name: "Грушевий джем", cat: "jam", img: "img/pear.jpg",
    text: "М'яка солодка груша." },
  { id: "pear-vanilla-cinnamon", name: "Груша, ваніль і кориця", cat: "jam", img: "img/pear-vanilla-cinnamon.jpg",
    text: "Груша з ваніллю та корицею. Теплий осінній смак." },
  { id: "apple", name: "Яблучний джем", cat: "jam", img: "img/apple.jpg",
    text: "Класика з домашніх яблук." },
  { id: "apple-vanilla-cinnamon", name: "Яблуко-ваніль-кориця", cat: "jam", img: "img/apple-vanilla-cinnamon.jpg",
    text: "Як шарлотка, тільки в банці." },
  { id: "apple-pear", name: "Джем яблуко-груша", cat: "jam", img: "img/apple-pear.jpg",
    text: "Яблуко і груша в одній банці." },
  { id: "pineapple-zucchini", name: "Ананасовий кабачок", cat: "jam", img: "img/pineapple-zucchini.jpg",
    text: "Кабачок, який смакує як ананас. Спробуйте вгадати!" },
  { id: "salted-caramel", name: "Солона карамель", cat: "sweet", img: "img/salted-caramel.jpg",
    text: "Тягуча карамель з дрібкою солі. До морозива, кави і млинців." },
  { id: "tkemali", name: "Сливовий соус Ткемалі", cat: "sauce", img: "img/tkemali.jpg",
    text: "Кисло-пряний соус зі сливи, часнику і зелені. До м'яса і картоплі." },
  { id: "satsebeli", name: "Сацебелі", cat: "sauce", img: "img/satsebeli.jpg",
    text: "Грузинський соус з томатів, перцю і зелені." },
  { id: "sweet-chili", name: "Солодкий чилі", cat: "sauce", img: "img/sweet-chili.jpg",
    text: "Солодкий і трохи гострий. До курки, креветок і роллів." },
];
