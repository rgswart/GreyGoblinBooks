// src/data/booksData.js

// Imports //

//Import images

//The Black and white (greyscale) Image was acquired here: https://svg.io/download/bd35eeee-ca0b-43f6-8f76-28878baa07b8.
//The images were then colored by hand in Inkscape (https://inkscape.org/)
//import images
import color1Image from "../images/hardcoverColor1Org.png";
import color2Image from "../images/hardcoverColor2Org.png";
import color3Image from "../images/hardcoverColor3Org.png";

//Export arrays//

//Export the colors array
export const colors = ["green", "purple", "brown"];
//Export the images array
export const images = [color1Image, color2Image, color3Image];

//Export constructor function for booksData
export function Book(
  id,
  title,
  author,
  description,
  price,
  colorIndex,
  quantity,
  total,
  purchaseState
) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.description = description;
  this.price = price;
  this.colorIndex = colorIndex;
  this.quantity = quantity;
  this.total = total;
  this.purchaseState = purchaseState;
}

//Create the booksData array using the "Book" constructor function
export const booksData = [
  new Book(
    0,
    "The Fellowship of the Ring",
    "J.R.R. Tolkien",
    "An epic The first volume of The Lord of the Rings trilogy, this epic tale introduces Middle-earth—a world of magic, myth, and danger. When the Dark Lord Sauron seeks to reclaim a powerful ring, Frodo Baggins, a humble hobbit, must embark on a perilous quest to destroy it. With a fellowship of men, elves, dwarves, and hobbits, he begins a journey that will decide the fate of the world.",
    600,
    0,
    0,
    0,
    0
  ),
  new Book(
    1,
    "Dune",
    "Frank Herbert",
    "Set on the desert planet Arrakis, Dune is the epic tale of Paul Atreides, heir to a noble family tasked with overseeing the most valuable resource in the universe—melange, a powerful spice that grants psychic abilities and extends life. As rival factions vie for control, Paul is thrust into a world of betrayal, prophecy, and revolution. Blending politics, religion, and environmentalism, Frank Herbert's Dune is a sweeping saga of survival and destiny.",
    630,
    2,
    0,
    0,
    0
  ),
  new Book(
    2,
    "Complete Tales of H.P. Lovecraft",
    "H.P. Lovecraft",
    "This comprehensive volume compiles all of H.P. Lovecraft's major works, including his novel, four novellas, and fifty-three short stories. Written between 1917 and 1935, these tales delve into Lovecraft's signature themes of cosmic horror, forbidden knowledge, and the insignificance of humanity in the vast universe.",
    850,
    1,
    0,
    0,
    0
  ),
  new Book(
    3,
    "Lord of Light",
    "Roger Zelazny",
    "Set in a distant future where technology allows humans to assume the roles of Hindu gods, Lord of Light follows the story of Sam, a man who rebels against the established pantheon to free humanity from divine oppression. Blending science fiction with Hindu mythology, the novel explores themes of identity, power, and the nature of divinity.",
    550,
    1,
    0,
    0,
    0
  ),
  new Book(
    4,
    "Harry Potter and the Philosopher's Stone",
    "J.K. Rowling",
    "On his eleventh birthday, Harry Potter discovers he is a wizard and is invited to attend Hogwarts School of Witchcraft and Wizardry. There, he finds friendship, adventure, and the first real sense of belonging he's ever known. But as he explores the secrets of the school, Harry uncovers a hidden world of danger—and a connection to a dark force rising once again. The book that launched a global phenomenon and introduced readers to the magic of Hogwarts.",
    400,
    1,
    0,
    0,
    0
  ),
  new Book(
    5,
    "Last Days",
    "Brian Evenson",
    "When detective Kline is abducted by a secretive cult that believes amputation brings one closer to God, he is coerced into solving a murder within their ranks. As Kline delves deeper into the cult's twisted beliefs and practices, he uncovers unsettling truths that challenge his perception of reality. In a world where pain and faith intertwine, Kline must navigate a labyrinth of deception and violence to uncover the truth.",
    1000,
    2,
    0,
    0,
    0
  ),
  new Book(
    6,
    "Nine Princes in Amber",
    "Roger Zelazny",
    "The Chronicles of Amber Book 1. He wakes in a hospital with no memory, only a nagging sense that something is terribly wrong. As fragments of his past return, Corwin discovers he is no ordinary man, but a prince of Amber, the one true world from which all others, Earth included, are but shadows. Caught in a brutal struggle among his immortal siblings for the throne, Corwin must reclaim his past and navigate a reality shaped by power and will. His journey will take him across worlds, through betrayal and war, in a bid to rule or survive.",
    1100,
    0,
    0,
    0,
    0
  ),
  new Book(
    7,
    "Roadside Picnic",
    "Arkady and Boris Strugatsky",
    `Roadside Picnic is a seminal work of science fiction that delves into the aftermath of an extraterrestrial visitation. The novel follows Redrick "Red" Schuhart, a "stalker" who illegally ventures into the mysterious Zone to collect alien artifacts. In the Zone, the laws of physics are warped, and the remnants of the visitors are as wondrous as they are deadly. As Red risks deeper incursions, he confronts haunting questions about humanity's place in an uncaring universe.`,
    720,
    0,
    0,
    0,
    0
  ),
  new Book(
    8,
    "Monday Begins on Saturday",
    "Arkady and Boris Strugatsky",
    "In a quiet Soviet town that doesn't appear on any map, programmer Sasha Privalov stumbles upon a secret institute devoted not to science, but to magic. Here, researchers study spells, time loops, and immortal beings with the same bureaucratic inefficiency that defines the rest of the Soviet system. Blending absurdist humor, fantasy, and sharp satire, Monday Begins on Saturday is a whimsical critique of life under late socialism.",
    600,
    2,
    0,
    0,
    0
  ),
  new Book(
    9,
    "Dead Space: Martyr",
    "B.K. Evenson",
    `When geophysicist Michael Altman discovers a strange signal emanating from deep beneath the Yucatán Peninsula, he unwittingly uncovers an ancient alien artifact, "the Black Marker". As Altman and his team investigate, inexplicable visions, madness, and violence begin to spread, hinting at a terrifying power beyond comprehension. Torn between scientific discovery and survival, Altman is thrust into a conspiracy that will echo for centuries. The events he sets in motion will lay the foundation for a dangerous religion and an interstellar nightmare.`,
    950,
    1,
    0,
    0,
    0
  ),
].sort((a, b) => {
  //sort alphabetically first by author first.
  const authorCompare = a.author.localeCompare(b.author);
  //if the author is not the same then return authorCompare (only sort by author)
  if (authorCompare !== 0) return authorCompare;
  //if the author is the same then sort by title additionally
  return a.title.localeCompare(b.title);
});
