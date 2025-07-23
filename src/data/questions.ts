import { Question } from '../types';

// Easy format for adding questions:
// 1. Find the subject section
// 2. Add questions under the appropriate year and type
// 3. Follow the format: question, 4 options, correct answer index (0-3)

export const questions: Question[] = [
  // ==================== GEOGRAPHY QUESTIONS ====================
  // Geography Mid Collection 2021-2023
  {
    id: 'geo_mid_2021_1',
    subject: 'Geography',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'What is the largest desert in the world?',
    options: ['Sahara Desert', 'Antarctic Desert', 'Arabian Desert', 'Gobi Desert'],
    correctAnswer: 1,
    explanation: 'Antarctica is technically the largest desert in the world as it receives very little precipitation.'
  },
  {
    id: 'geo_mid_2021_2',
    subject: 'Geography',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'Which mountain range separates Europe from Asia?',
    options: ['Alps', 'Himalayas', 'Ural Mountains', 'Carpathians'],
    correctAnswer: 2
  },
  {
    id: 'geo_mid_2021_3',
    subject: 'Geography',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'Which river is the longest in the world?',
    options: ['Amazon River', 'Yangtze River', 'Mississippi River', 'Nile River'],
    correctAnswer: 3,
    explanation: 'The Nile River is generally considered the longest, though some debate exists with the Amazon.'
  },
  {
    id: 'geo_mid_2021_4',
    subject: 'Geography',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'What is the tallest mountain in Africa?',
    options: ['Mount Kenya', 'Mount Kilimanjaro', 'Ras Dashen', 'Mount Elgon'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2021_5',
    subject: 'Geography',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'Which layer of the Earth is liquid?',
    options: ['Inner core', 'Mantle', 'Outer core', 'Crust'],
    correctAnswer: 2,
    explanation: 'The outer core is the only liquid layer and is responsible for Earth’s magnetic field.'
  },
  {
    id: 'geo_mid_2021_6',
    subject: 'Geography',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'Which continent has the highest average elevation?',
    options: ['Asia', 'Antarctica', 'South America', 'Africa'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2021_7',
    subject: 'Geography',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'Which ocean is the smallest?',
    options: ['Arctic Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Southern Ocean'],
    correctAnswer: 0
  },
  {
    id: 'geo_mid_2021_8',
    subject: 'Geography',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'What is the most active volcano in the world?',
    options: ['Mount Fuji', 'Mount Etna', 'Mauna Loa', 'Kīlauea'],
    correctAnswer: 3
  },
  {
    id: 'geo_mid_2021_9',
    subject: 'Geography',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'Which continent has no permanent rivers?',
    options: ['Antarctica', 'Australia', 'Europe', 'North America'],
    correctAnswer: 0
  },
  {
    id: 'geo_mid_2021_10',
    subject: 'Geography',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'Which of these is a rift valley?',
    options: ['Great Dividing Range', 'East African Rift', 'Rocky Mountains', 'Ural Mountains'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2021_11',
    subject: 'Geography',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'What causes earthquakes?',
    options: ['Volcanoes', 'Plate tectonics', 'Ocean currents', 'Erosion'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2021_12',
    subject: 'Geography',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'Which country has the most natural lakes?',
    options: ['Russia', 'Brazil', 'Canada', 'USA'],
    correctAnswer: 2
  },
  {
    id: 'geo_mid_2021_13',
    subject: 'Geography',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'What is the term for molten rock beneath the Earth’s surface?',
    options: ['Lava', 'Ash', 'Magma', 'Crust'],
    correctAnswer: 2
  },
  {
    id: 'geo_mid_2021_14',
    subject: 'Geography',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'Which part of the Earth contains tectonic plates?',
    options: ['Mantle', 'Crust', 'Outer core', 'Inner core'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2021_15',
    subject: 'Geography',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'Which river flows through the Grand Canyon?',
    options: ['Colorado River', 'Missouri River', 'Rio Grande', 'Columbia River'],
    correctAnswer: 0
  },
  {
    id: 'geo_mid_2021_16',
    subject: 'Geography',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'Which type of rock is formed from cooled lava or magma?',
    options: ['Igneous', 'Sedimentary', 'Metamorphic', 'Basaltic'],
    correctAnswer: 0
  },
  {
    id: 'geo_mid_2021_17',
    subject: 'Geography',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'Where is the Great Barrier Reef located?',
    options: ['Caribbean Sea', 'Red Sea', 'Indian Ocean', 'Coral Sea'],
    correctAnswer: 3
  },
  {
    id: 'geo_mid_2021_18',
    subject: 'Geography',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'What is the driest place on Earth?',
    options: ['Sahara', 'Atacama Desert', 'Gobi', 'Namib'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2021_19',
    subject: 'Geography',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'What is the ring of volcanoes around the Pacific Ocean called?',
    options: ['Ring of Fire', 'Volcanic Circle', 'Tectonic Belt', 'Pacific Flame'],
    correctAnswer: 0
  },
  {
    id: 'geo_mid_2021_20',
    subject: 'Geography',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'Which waterfall is the world’s tallest?',
    options: ['Niagara Falls', 'Angel Falls', 'Victoria Falls', 'Iguazu Falls'],
    correctAnswer: 1
  },
 {
    id: 'geo_mid_2022_1',
    subject: 'Geography',
    field: 'natural',
    year: 2022,
    type: 'mid',
    question: 'What is the deepest ocean trench?',
    options: ['Puerto Rico Trench', 'Mariana Trench', 'Java Trench', 'Peru-Chile Trench'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2022_2',
    subject: 'Geography',
    field: 'natural',
    year: 2022,
    type: 'mid',
    question: 'Which mountain is the tallest in the world?',
    options: ['K2', 'Mount Everest', 'Kangchenjunga', 'Makalu'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2022_3',
    subject: 'Geography',
    field: 'natural',
    year: 2022,
    type: 'mid',
    question: 'Which is the smallest continent?',
    options: ['Europe', 'Australia', 'Antarctica', 'South America'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2022_4',
    subject: 'Geography',
    field: 'natural',
    year: 2022,
    type: 'mid',
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean', 'Arctic Ocean'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2022_5',
    subject: 'Geography',
    field: 'natural',
    year: 2022,
    type: 'mid',
    question: 'Which river flows through Egypt?',
    options: ['Amazon', 'Nile', 'Congo', 'Zambezi'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2022_6',
    subject: 'Geography',
    field: 'natural',
    year: 2022,
    type: 'mid',
    question: 'Which desert is the hottest in the world?',
    options: ['Kalahari Desert', 'Gobi Desert', 'Sahara Desert', 'Sonoran Desert'],
    correctAnswer: 2
  },
  {
    id: 'geo_mid_2022_7',
    subject: 'Geography',
    field: 'natural',
    year: 2022,
    type: 'mid',
    question: 'What is the primary cause of tides on Earth?',
    options: ['Wind', 'Sunlight', 'Moon’s gravity', 'Ocean currents'],
    correctAnswer: 2
  },
  {
    id: 'geo_mid_2022_8',
    subject: 'Geography',
    field: 'natural',
    year: 2022,
    type: 'mid',
    question: 'Which is the longest river in South America?',
    options: ['Orinoco', 'Amazon', 'Paraná', 'São Francisco'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2022_9',
    subject: 'Geography',
    field: 'natural',
    year: 2022,
    type: 'mid',
    question: 'Which country has the most volcanoes?',
    options: ['Indonesia', 'Japan', 'USA', 'Chile'],
    correctAnswer: 0
  },
  {
    id: 'geo_mid_2022_10',
    subject: 'Geography',
    field: 'natural',
    year: 2022,
    type: 'mid',
    question: 'Which river is sacred in India?',
    options: ['Brahmaputra', 'Indus', 'Yamuna', 'Ganges'],
    correctAnswer: 3
  },
  {
    id: 'geo_mid_2022_11',
    subject: 'Geography',
    field: 'natural',
    year: 2022,
    type: 'mid',
    question: 'Which lake is the deepest in the world?',
    options: ['Lake Superior', 'Lake Baikal', 'Lake Victoria', 'Caspian Sea'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2022_12',
    subject: 'Geography',
    field: 'natural',
    year: 2022,
    type: 'mid',
    question: 'What is the name of the imaginary line that divides Earth into Northern and Southern Hemispheres?',
    options: ['Tropic of Cancer', 'Prime Meridian', 'Equator', 'Tropic of Capricorn'],
    correctAnswer: 2
  },
  {
    id: 'geo_mid_2022_13',
    subject: 'Geography',
    field: 'natural',
    year: 2022,
    type: 'mid',
    question: 'What type of rock is formed from sediment?',
    options: ['Igneous', 'Metamorphic', 'Sedimentary', 'Granite'],
    correctAnswer: 2
  },
  {
    id: 'geo_mid_2022_14',
    subject: 'Geography',
    field: 'natural',
    year: 2022,
    type: 'mid',
    question: 'Which gas is most abundant in the Earth’s atmosphere?',
    options: ['Oxygen', 'Carbon Dioxide', 'Hydrogen', 'Nitrogen'],
    correctAnswer: 3
  },
  {
    id: 'geo_mid_2022_15',
    subject: 'Geography',
    field: 'natural',
    year: 2022,
    type: 'mid',
    question: 'Which African lake is known for its large size and biodiversity?',
    options: ['Lake Victoria', 'Lake Chad', 'Lake Albert', 'Lake Turkana'],
    correctAnswer: 0
  },
  {
    id: 'geo_mid_2022_16',
    subject: 'Geography',
    field: 'natural',
    year: 2022,
    type: 'mid',
    question: 'Which part of the Earth is solid iron and nickel?',
    options: ['Mantle', 'Outer core', 'Crust', 'Inner core'],
    correctAnswer: 3
  },
  {
    id: 'geo_mid_2022_17',
    subject: 'Geography',
    field: 'natural',
    year: 2022,
    type: 'mid',
    question: 'What is the name of the supercontinent that existed millions of years ago?',
    options: ['Laurasia', 'Pangaea', 'Gondwana', 'Atlantis'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2022_18',
    subject: 'Geography',
    field: 'natural',
    year: 2022,
    type: 'mid',
    question: 'Which phenomenon causes seasons on Earth?',
    options: ['Earth’s rotation', 'Earth’s tilt', 'Sun’s movement', 'Moon’s orbit'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2022_19',
    subject: 'Geography',
    field: 'natural',
    year: 2022,
    type: 'mid',
    question: 'Which mountain range is the longest in the world?',
    options: ['Andes', 'Rockies', 'Himalayas', 'Alps'],
    correctAnswer: 0
  },
  {
    id: 'geo_mid_2022_20',
    subject: 'Geography',
    field: 'natural',
    year: 2022,
    type: 'mid',
    question: 'What is the name for a narrow strip of land connecting two larger landmasses?',
    options: ['Isthmus', 'Peninsula', 'Delta', 'Cape'],
    correctAnswer: 0
  },
  {
    id: 'geo_mid_2023_1',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which African country is completely surrounded by South Africa?',
    options: ['Swaziland', 'Lesotho', 'Botswana', 'Malawi'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2023_2',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which country has the most natural lakes?',
    options: ['Russia', 'Brazil', 'Canada', 'USA'],
    correctAnswer: 2
  },
  {
    id: 'geo_mid_2023_3',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which river flows through the Grand Canyon?',
    options: ['Colorado River', 'Missouri River', 'Rio Grande', 'Columbia River'],
    correctAnswer: 0
  },
  {
    id: 'geo_mid_2023_4',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which continent has the most countries?',
    options: ['Africa', 'Asia', 'Europe', 'South America'],
    correctAnswer: 0
  },
  {
    id: 'geo_mid_2023_5',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which is the world’s second-largest continent?',
    options: ['Asia', 'Africa', 'Europe', 'North America'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2023_6',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Where is the Great Victoria Desert located?',
    options: ['Australia', 'South Africa', 'USA', 'Chile'],
    correctAnswer: 0
  },
  {
    id: 'geo_mid_2023_7',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which ocean surrounds the Maldives?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2023_8',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'What is the capital city with the highest altitude?',
    options: ['La Paz', 'Quito', 'Kathmandu', 'Thimphu'],
    correctAnswer: 0
  },
  {
    id: 'geo_mid_2023_9',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which is the smallest ocean?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Southern Ocean', 'Arctic Ocean'],
    correctAnswer: 3
  },
  {
    id: 'geo_mid_2023_10',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which river is sacred in Hinduism?',
    options: ['Brahmaputra', 'Ganges', 'Indus', 'Yamuna'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2023_11',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which desert covers much of Botswana and parts of Namibia?',
    options: ['Namib', 'Sahara', 'Kalahari', 'Thar'],
    correctAnswer: 2
  },
  {
    id: 'geo_mid_2023_12',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Where are the Drakensberg Mountains located?',
    options: ['South Africa', 'Tanzania', 'Morocco', 'Kenya'],
    correctAnswer: 0
  },
  {
    id: 'geo_mid_2023_13',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which lake lies between Tanzania and Uganda?',
    options: ['Lake Malawi', 'Lake Victoria', 'Lake Turkana', 'Lake Tanganyika'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2023_14',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which waterfall borders Zambia and Zimbabwe?',
    options: ['Victoria Falls', 'Niagara Falls', 'Angel Falls', 'Iguazu Falls'],
    correctAnswer: 0
  },
  {
    id: 'geo_mid_2023_15',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which is the largest island in the world?',
    options: ['Greenland', 'Madagascar', 'Borneo', 'New Guinea'],
    correctAnswer: 0
  },
  {
    id: 'geo_mid_2023_16',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'What type of landform is formed by magma cooling below the Earth’s surface?',
    options: ['Igneous rock', 'Sedimentary rock', 'Valley', 'Glacier'],
    correctAnswer: 0
  },
  {
    id: 'geo_mid_2023_17',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which is the longest continental mountain range?',
    options: ['Andes', 'Himalayas', 'Rockies', 'Alps'],
    correctAnswer: 0
  },
  {
    id: 'geo_mid_2023_18',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Where is the Sea of Galilee located?',
    options: ['Israel', 'Egypt', 'Turkey', 'Jordan'],
    correctAnswer: 0
  },
  {
    id: 'geo_mid_2023_19',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which country has the longest coastline?',
    options: ['USA', 'Australia', 'Russia', 'Canada'],
    correctAnswer: 3
  },
  {
    id: 'geo_mid_2023_20',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which two continents are located entirely in the Southern Hemisphere?',
    options: ['Africa and Oceania', 'Australia and Antarctica', 'Asia and South America', 'Europe and Australia'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2023_21',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which tectonic plate is the largest?',
    options: ['African Plate', 'Eurasian Plate', 'Pacific Plate', 'North American Plate'],
    correctAnswer: 2
  },
  {
    id: 'geo_mid_2023_22',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which African lake is shrinking due to climate change?',
    options: ['Lake Victoria', 'Lake Albert', 'Lake Tanganyika', 'Lake Chad'],
    correctAnswer: 3
  },
  {
    id: 'geo_mid_2023_23',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which desert lies along the coast of Peru and Chile?',
    options: ['Atacama Desert', 'Sonoran Desert', 'Kalahari Desert', 'Sahara Desert'],
    correctAnswer: 0
  },
  {
    id: 'geo_mid_2023_24',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which sea has the highest salinity?',
    options: ['Red Sea', 'Dead Sea', 'Black Sea', 'Baltic Sea'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2023_25',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which region is known as the “Roof of the World”?',
    options: ['Tibetan Plateau', 'Rocky Mountains', 'Alps', 'Andes'],
    correctAnswer: 0
  },
  {
    id: 'geo_mid_2023_26',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which ocean current warms the western coast of Europe?',
    options: ['Gulf Stream', 'Humboldt Current', 'Kuroshio Current', 'Canary Current'],
    correctAnswer: 0
  },
  {
    id: 'geo_mid_2023_27',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which part of Earth receives the most direct sunlight?',
    options: ['Poles', 'Equator', 'Tropics', 'Temperate zones'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2023_28',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'What is the name of the chain of islands formed by volcanic activity in the Pacific Ocean?',
    options: ['Canary Islands', 'Hawaiian Islands', 'Galápagos Islands', 'Azores'],
    correctAnswer: 1
  },
  {
    id: 'geo_mid_2023_29',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which continent has the lowest population density?',
    options: ['Antarctica', 'Australia', 'Africa', 'Europe'],
    correctAnswer: 0
  },
  {
    id: 'geo_mid_2023_30',
    subject: 'Geography',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'What natural event is measured on the Richter scale?',
    options: ['Hurricanes', 'Earthquakes', 'Tornadoes', 'Floods'],
    correctAnswer: 1
  },
  // Geography Final Questions 2021-2024
  {
    id: 'geo_final_2021_1',
    subject: 'Geography',
    field: 'natural',
    year: 2021,
    type: 'final',
    question: 'The Tropic of Cancer passes through how many countries?',
    options: ['14', '16', '18', '20'],
    correctAnswer: 1
  },

  // ==================== LOGIC QUESTIONS ====================
  // Logic Mid Collection 2021-2023
   {
    "id": "logic_mid_2021_1",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "What is a syllogism?",
    "options": [
      "A type of fallacy",
      "A form of deductive reasoning",
      "An inductive argument",
      "A statistical method"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2021_2",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "Which of the following is an example of modus ponens?",
    "options": [
      "If P then Q, not Q, therefore not P",
      "If P then Q, P, therefore Q",
      "P or Q, not P, therefore Q",
      "P and Q, therefore P"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2021_3",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "What is the law of non-contradiction?",
    "options": [
      "Something cannot be both true and false",
      "Everything must have a cause",
      "All events are determined",
      "Truth is relative"
    ],
    "correctAnswer": 0
  },
  {
    "id": "logic_mid_2021_4",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "Which logical fallacy involves attacking the person rather than their argument?",
    "options": [
      "Straw man",
      "Ad hominem",
      "False dilemma",
      "Circular reasoning"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2021_5",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "What is a necessary condition?",
    "options": [
      "A condition that must be present for an event to occur",
      "A condition that guarantees an event",
      "A condition that is irrelevant",
      "A condition that prevents an event"
    ],
    "correctAnswer": 0
  },
  {
    "id": "logic_mid_2021_6",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "Which term describes an argument with true premises and a false conclusion?",
    "options": [
      "Valid",
      "Invalid",
      "Sound",
      "Cogent"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2021_7",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "Which statement is always true in a valid deductive argument?",
    "options": [
      "Conclusion is true",
      "Premises are true",
      "Conclusion follows necessarily if premises are true",
      "Premises are false"
    ],
    "correctAnswer": 2
  },
  {
    "id": "logic_mid_2021_8",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "What is a fallacy?",
    "options": [
      "A sound argument",
      "An invalid form of reasoning",
      "A logical theorem",
      "A scientific theory"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2021_9",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "What is modus tollens?",
    "options": [
      "If P then Q, P, therefore Q",
      "If P then Q, not Q, therefore not P",
      "P or Q, not P, therefore Q",
      "P and Q, therefore P"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2021_10",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "What is a sufficient condition?",
    "options": [
      "It is necessary for an event",
      "It guarantees the event",
      "It always prevents the event",
      "It is unrelated to the event"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2021_11",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "What is a syllogism?",
    "options": [
      "A type of fallacy",
      "A form of deductive reasoning",
      "An inductive argument",
      "A statistical method"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2021_12",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "Which of the following is an example of modus ponens?",
    "options": [
      "If P then Q, not Q, therefore not P",
      "If P then Q, P, therefore Q",
      "P or Q, not P, therefore Q",
      "P and Q, therefore P"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2021_13",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "What is the law of non-contradiction?",
    "options": [
      "Something cannot be both true and false",
      "Everything must have a cause",
      "All events are determined",
      "Truth is relative"
    ],
    "correctAnswer": 0
  },
  {
    "id": "logic_mid_2021_14",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "Which logical fallacy involves attacking the person rather than their argument?",
    "options": [
      "Straw man",
      "Ad hominem",
      "False dilemma",
      "Circular reasoning"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2021_15",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "What is a necessary condition?",
    "options": [
      "A condition that must be present for an event to occur",
      "A condition that guarantees an event",
      "A condition that is irrelevant",
      "A condition that prevents an event"
    ],
    "correctAnswer": 0
  },
  {
    "id": "logic_mid_2021_16",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "Which term describes an argument with true premises and a false conclusion?",
    "options": [
      "Valid",
      "Invalid",
      "Sound",
      "Cogent"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2021_17",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "Which statement is always true in a valid deductive argument?",
    "options": [
      "Conclusion is true",
      "Premises are true",
      "Conclusion follows necessarily if premises are true",
      "Premises are false"
    ],
    "correctAnswer": 2
  },
  {
    "id": "logic_mid_2021_18",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "What is a fallacy?",
    "options": [
      "A sound argument",
      "An invalid form of reasoning",
      "A logical theorem",
      "A scientific theory"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2021_19",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "What is modus tollens?",
    "options": [
      "If P then Q, P, therefore Q",
      "If P then Q, not Q, therefore not P",
      "P or Q, not P, therefore Q",
      "P and Q, therefore P"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2021_20",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "What is a sufficient condition?",
    "options": [
      "It is necessary for an event",
      "It guarantees the event",
      "It always prevents the event",
      "It is unrelated to the event"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2021_21",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "What is a syllogism?",
    "options": [
      "A type of fallacy",
      "A form of deductive reasoning",
      "An inductive argument",
      "A statistical method"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2021_22",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "Which of the following is an example of modus ponens?",
    "options": [
      "If P then Q, not Q, therefore not P",
      "If P then Q, P, therefore Q",
      "P or Q, not P, therefore Q",
      "P and Q, therefore P"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2021_23",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "What is the law of non-contradiction?",
    "options": [
      "Something cannot be both true and false",
      "Everything must have a cause",
      "All events are determined",
      "Truth is relative"
    ],
    "correctAnswer": 0
  },
  {
    "id": "logic_mid_2021_24",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "Which logical fallacy involves attacking the person rather than their argument?",
    "options": [
      "Straw man",
      "Ad hominem",
      "False dilemma",
      "Circular reasoning"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2021_25",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "What is a necessary condition?",
    "options": [
      "A condition that must be present for an event to occur",
      "A condition that guarantees an event",
      "A condition that is irrelevant",
      "A condition that prevents an event"
    ],
    "correctAnswer": 0
  },
  {
    "id": "logic_mid_2021_26",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "Which term describes an argument with true premises and a false conclusion?",
    "options": [
      "Valid",
      "Invalid",
      "Sound",
      "Cogent"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2021_27",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "Which statement is always true in a valid deductive argument?",
    "options": [
      "Conclusion is true",
      "Premises are true",
      "Conclusion follows necessarily if premises are true",
      "Premises are false"
    ],
    "correctAnswer": 2
  },
  {
    "id": "logic_mid_2021_28",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "What is a fallacy?",
    "options": [
      "A sound argument",
      "An invalid form of reasoning",
      "A logical theorem",
      "A scientific theory"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2021_29",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "What is modus tollens?",
    "options": [
      "If P then Q, P, therefore Q",
      "If P then Q, not Q, therefore not P",
      "P or Q, not P, therefore Q",
      "P and Q, therefore P"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2021_30",
    "subject": "Logic",
    "field": "natural",
    "year": 2021,
    "type": "mid",
    "question": "What is a sufficient condition?",
    "options": [
      "It is necessary for an event",
      "It guarantees the event",
      "It always prevents the event",
      "It is unrelated to the event"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2022_1",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "What is a syllogism?",
    "options": [
      "A type of fallacy",
      "A form of deductive reasoning",
      "An inductive argument",
      "A statistical method"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2022_2",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "Which of the following is an example of modus ponens?",
    "options": [
      "If P then Q, not Q, therefore not P",
      "If P then Q, P, therefore Q",
      "P or Q, not P, therefore Q",
      "P and Q, therefore P"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2022_3",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "What is the law of non-contradiction?",
    "options": [
      "Something cannot be both true and false",
      "Everything must have a cause",
      "All events are determined",
      "Truth is relative"
    ],
    "correctAnswer": 0
  },
  {
    "id": "logic_mid_2022_4",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "Which logical fallacy involves attacking the person rather than their argument?",
    "options": [
      "Straw man",
      "Ad hominem",
      "False dilemma",
      "Circular reasoning"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2022_5",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "What is a necessary condition?",
    "options": [
      "A condition that must be present for an event to occur",
      "A condition that guarantees an event",
      "A condition that is irrelevant",
      "A condition that prevents an event"
    ],
    "correctAnswer": 0
  },
  {
    "id": "logic_mid_2022_6",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "Which term describes an argument with true premises and a false conclusion?",
    "options": [
      "Valid",
      "Invalid",
      "Sound",
      "Cogent"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2022_7",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "Which statement is always true in a valid deductive argument?",
    "options": [
      "Conclusion is true",
      "Premises are true",
      "Conclusion follows necessarily if premises are true",
      "Premises are false"
    ],
    "correctAnswer": 2
  },
  {
    "id": "logic_mid_2022_8",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "What is a fallacy?",
    "options": [
      "A sound argument",
      "An invalid form of reasoning",
      "A logical theorem",
      "A scientific theory"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2022_9",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "What is modus tollens?",
    "options": [
      "If P then Q, P, therefore Q",
      "If P then Q, not Q, therefore not P",
      "P or Q, not P, therefore Q",
      "P and Q, therefore P"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2022_10",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "What is a sufficient condition?",
    "options": [
      "It is necessary for an event",
      "It guarantees the event",
      "It always prevents the event",
      "It is unrelated to the event"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2022_11",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "What is a syllogism?",
    "options": [
      "A type of fallacy",
      "A form of deductive reasoning",
      "An inductive argument",
      "A statistical method"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2022_12",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "Which of the following is an example of modus ponens?",
    "options": [
      "If P then Q, not Q, therefore not P",
      "If P then Q, P, therefore Q",
      "P or Q, not P, therefore Q",
      "P and Q, therefore P"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2022_13",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "What is the law of non-contradiction?",
    "options": [
      "Something cannot be both true and false",
      "Everything must have a cause",
      "All events are determined",
      "Truth is relative"
    ],
    "correctAnswer": 0
  },
  {
    "id": "logic_mid_2022_14",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "Which logical fallacy involves attacking the person rather than their argument?",
    "options": [
      "Straw man",
      "Ad hominem",
      "False dilemma",
      "Circular reasoning"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2022_15",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "What is a necessary condition?",
    "options": [
      "A condition that must be present for an event to occur",
      "A condition that guarantees an event",
      "A condition that is irrelevant",
      "A condition that prevents an event"
    ],
    "correctAnswer": 0
  },
  {
    "id": "logic_mid_2022_16",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "Which term describes an argument with true premises and a false conclusion?",
    "options": [
      "Valid",
      "Invalid",
      "Sound",
      "Cogent"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2022_17",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "Which statement is always true in a valid deductive argument?",
    "options": [
      "Conclusion is true",
      "Premises are true",
      "Conclusion follows necessarily if premises are true",
      "Premises are false"
    ],
    "correctAnswer": 2
  },
  {
    "id": "logic_mid_2022_18",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "What is a fallacy?",
    "options": [
      "A sound argument",
      "An invalid form of reasoning",
      "A logical theorem",
      "A scientific theory"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2022_19",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "What is modus tollens?",
    "options": [
      "If P then Q, P, therefore Q",
      "If P then Q, not Q, therefore not P",
      "P or Q, not P, therefore Q",
      "P and Q, therefore P"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2022_20",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "What is a sufficient condition?",
    "options": [
      "It is necessary for an event",
      "It guarantees the event",
      "It always prevents the event",
      "It is unrelated to the event"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2022_21",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "What is a syllogism?",
    "options": [
      "A type of fallacy",
      "A form of deductive reasoning",
      "An inductive argument",
      "A statistical method"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2022_22",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "Which of the following is an example of modus ponens?",
    "options": [
      "If P then Q, not Q, therefore not P",
      "If P then Q, P, therefore Q",
      "P or Q, not P, therefore Q",
      "P and Q, therefore P"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2022_23",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "What is the law of non-contradiction?",
    "options": [
      "Something cannot be both true and false",
      "Everything must have a cause",
      "All events are determined",
      "Truth is relative"
    ],
    "correctAnswer": 0
  },
  {
    "id": "logic_mid_2022_24",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "Which logical fallacy involves attacking the person rather than their argument?",
    "options": [
      "Straw man",
      "Ad hominem",
      "False dilemma",
      "Circular reasoning"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2022_25",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "What is a necessary condition?",
    "options": [
      "A condition that must be present for an event to occur",
      "A condition that guarantees an event",
      "A condition that is irrelevant",
      "A condition that prevents an event"
    ],
    "correctAnswer": 0
  },
  {
    "id": "logic_mid_2022_26",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "Which term describes an argument with true premises and a false conclusion?",
    "options": [
      "Valid",
      "Invalid",
      "Sound",
      "Cogent"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2022_27",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "Which statement is always true in a valid deductive argument?",
    "options": [
      "Conclusion is true",
      "Premises are true",
      "Conclusion follows necessarily if premises are true",
      "Premises are false"
    ],
    "correctAnswer": 2
  },
  {
    "id": "logic_mid_2022_28",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "What is a fallacy?",
    "options": [
      "A sound argument",
      "An invalid form of reasoning",
      "A logical theorem",
      "A scientific theory"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2022_29",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "What is modus tollens?",
    "options": [
      "If P then Q, P, therefore Q",
      "If P then Q, not Q, therefore not P",
      "P or Q, not P, therefore Q",
      "P and Q, therefore P"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2022_30",
    "subject": "Logic",
    "field": "natural",
    "year": 2022,
    "type": "mid",
    "question": "What is a sufficient condition?",
    "options": [
      "It is necessary for an event",
      "It guarantees the event",
      "It always prevents the event",
      "It is unrelated to the event"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2023_1",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "What is a syllogism?",
    "options": [
      "A type of fallacy",
      "A form of deductive reasoning",
      "An inductive argument",
      "A statistical method"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2023_2",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "Which of the following is an example of modus ponens?",
    "options": [
      "If P then Q, not Q, therefore not P",
      "If P then Q, P, therefore Q",
      "P or Q, not P, therefore Q",
      "P and Q, therefore P"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2023_3",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "What is the law of non-contradiction?",
    "options": [
      "Something cannot be both true and false",
      "Everything must have a cause",
      "All events are determined",
      "Truth is relative"
    ],
    "correctAnswer": 0
  },
  {
    "id": "logic_mid_2023_4",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "Which logical fallacy involves attacking the person rather than their argument?",
    "options": [
      "Straw man",
      "Ad hominem",
      "False dilemma",
      "Circular reasoning"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2023_5",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "What is a necessary condition?",
    "options": [
      "A condition that must be present for an event to occur",
      "A condition that guarantees an event",
      "A condition that is irrelevant",
      "A condition that prevents an event"
    ],
    "correctAnswer": 0
  },
  {
    "id": "logic_mid_2023_6",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "Which term describes an argument with true premises and a false conclusion?",
    "options": [
      "Valid",
      "Invalid",
      "Sound",
      "Cogent"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2023_7",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "Which statement is always true in a valid deductive argument?",
    "options": [
      "Conclusion is true",
      "Premises are true",
      "Conclusion follows necessarily if premises are true",
      "Premises are false"
    ],
    "correctAnswer": 2
  },
  {
    "id": "logic_mid_2023_8",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "What is a fallacy?",
    "options": [
      "A sound argument",
      "An invalid form of reasoning",
      "A logical theorem",
      "A scientific theory"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2023_9",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "What is modus tollens?",
    "options": [
      "If P then Q, P, therefore Q",
      "If P then Q, not Q, therefore not P",
      "P or Q, not P, therefore Q",
      "P and Q, therefore P"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2023_10",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "What is a sufficient condition?",
    "options": [
      "It is necessary for an event",
      "It guarantees the event",
      "It always prevents the event",
      "It is unrelated to the event"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2023_11",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "What is a syllogism?",
    "options": [
      "A type of fallacy",
      "A form of deductive reasoning",
      "An inductive argument",
      "A statistical method"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2023_12",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "Which of the following is an example of modus ponens?",
    "options": [
      "If P then Q, not Q, therefore not P",
      "If P then Q, P, therefore Q",
      "P or Q, not P, therefore Q",
      "P and Q, therefore P"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2023_13",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "What is the law of non-contradiction?",
    "options": [
      "Something cannot be both true and false",
      "Everything must have a cause",
      "All events are determined",
      "Truth is relative"
    ],
    "correctAnswer": 0
  },
  {
    "id": "logic_mid_2023_14",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "Which logical fallacy involves attacking the person rather than their argument?",
    "options": [
      "Straw man",
      "Ad hominem",
      "False dilemma",
      "Circular reasoning"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2023_15",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "What is a necessary condition?",
    "options": [
      "A condition that must be present for an event to occur",
      "A condition that guarantees an event",
      "A condition that is irrelevant",
      "A condition that prevents an event"
    ],
    "correctAnswer": 0
  },
  {
    "id": "logic_mid_2023_16",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "Which term describes an argument with true premises and a false conclusion?",
    "options": [
      "Valid",
      "Invalid",
      "Sound",
      "Cogent"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2023_17",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "Which statement is always true in a valid deductive argument?",
    "options": [
      "Conclusion is true",
      "Premises are true",
      "Conclusion follows necessarily if premises are true",
      "Premises are false"
    ],
    "correctAnswer": 2
  },
  {
    "id": "logic_mid_2023_18",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "What is a fallacy?",
    "options": [
      "A sound argument",
      "An invalid form of reasoning",
      "A logical theorem",
      "A scientific theory"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2023_19",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "What is modus tollens?",
    "options": [
      "If P then Q, P, therefore Q",
      "If P then Q, not Q, therefore not P",
      "P or Q, not P, therefore Q",
      "P and Q, therefore P"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2023_20",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "What is a sufficient condition?",
    "options": [
      "It is necessary for an event",
      "It guarantees the event",
      "It always prevents the event",
      "It is unrelated to the event"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2023_21",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "What is a syllogism?",
    "options": [
      "A type of fallacy",
      "A form of deductive reasoning",
      "An inductive argument",
      "A statistical method"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2023_22",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "Which of the following is an example of modus ponens?",
    "options": [
      "If P then Q, not Q, therefore not P",
      "If P then Q, P, therefore Q",
      "P or Q, not P, therefore Q",
      "P and Q, therefore P"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2023_23",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "What is the law of non-contradiction?",
    "options": [
      "Something cannot be both true and false",
      "Everything must have a cause",
      "All events are determined",
      "Truth is relative"
    ],
    "correctAnswer": 0
  },
  {
    "id": "logic_mid_2023_24",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "Which logical fallacy involves attacking the person rather than their argument?",
    "options": [
      "Straw man",
      "Ad hominem",
      "False dilemma",
      "Circular reasoning"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2023_25",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "What is a necessary condition?",
    "options": [
      "A condition that must be present for an event to occur",
      "A condition that guarantees an event",
      "A condition that is irrelevant",
      "A condition that prevents an event"
    ],
    "correctAnswer": 0
  },
  {
    "id": "logic_mid_2023_26",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "Which term describes an argument with true premises and a false conclusion?",
    "options": [
      "Valid",
      "Invalid",
      "Sound",
      "Cogent"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2023_27",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "Which statement is always true in a valid deductive argument?",
    "options": [
      "Conclusion is true",
      "Premises are true",
      "Conclusion follows necessarily if premises are true",
      "Premises are false"
    ],
    "correctAnswer": 2
  },
  {
    "id": "logic_mid_2023_28",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "What is a fallacy?",
    "options": [
      "A sound argument",
      "An invalid form of reasoning",
      "A logical theorem",
      "A scientific theory"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2023_29",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "What is modus tollens?",
    "options": [
      "If P then Q, P, therefore Q",
      "If P then Q, not Q, therefore not P",
      "P or Q, not P, therefore Q",
      "P and Q, therefore P"
    ],
    "correctAnswer": 1
  },
  {
    "id": "logic_mid_2023_30",
    "subject": "Logic",
    "field": "natural",
    "year": 2023,
    "type": "mid",
    "question": "What is a sufficient condition?",
    "options": [
      "It is necessary for an event",
      "It guarantees the event",
      "It always prevents the event",
      "It is unrelated to the event"
    ],
    "correctAnswer": 1
  },
  // Logic Final Questions 2021-2024
  {
    id: 'logic_final_2021_1',
    subject: 'Logic',
    field: 'natural',
    year: 2021,
    type: 'final',
    question: 'What is the principle of explosion in logic?',
    options: ['From a contradiction, anything follows', 'Complex arguments are invalid', 'Truth values explode', 'Logic has limits'],
    correctAnswer: 0
  },
  {
  id: 'logic_final_2021_1',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'What is the principle of explosion in logic?',
  options: ['From a contradiction, anything follows', 'Complex arguments are invalid', 'Truth values explode', 'Logic has limits'],
  correctAnswer: 0
},
{
  id: 'logic_final_2021_2',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'Which of these is NOT a valid rule of inference in propositional logic?',
  options: ['Modus Ponens', 'Modus Tollens', 'Affirming the Consequent', 'Disjunctive Syllogism'],
  correctAnswer: 2
},
{
  id: 'logic_final_2021_3',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'In predicate logic, what does the universal quantifier (∀) represent?',
  options: ['There exists at least one', 'For all', 'There exists exactly one', 'For some'],
  correctAnswer: 1
},
{
  id: 'logic_final_2021_4',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'Which logical connective represents "if and only if"?',
  options: ['→', '∧', '∨', '↔'],
  correctAnswer: 3
},
{
  id: 'logic_final_2021_5',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'What is the negation of the statement "All birds can fly"?',
  options: ['No birds can fly', 'Some birds cannot fly', 'All birds cannot fly', 'Some birds can fly'],
  correctAnswer: 1
},
{
  id: 'logic_final_2021_6',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'Which of these is a tautology?',
  options: ['P ∧ ¬P', 'P ∨ ¬P', 'P → Q', 'P ∧ Q'],
  correctAnswer: 1
},
{
  id: 'logic_final_2021_7',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'What is the contrapositive of "If it rains, then the ground gets wet"?',
  options: [
    'If the ground gets wet, then it rains',
    'If the ground does not get wet, then it does not rain',
    'If it does not rain, then the ground does not get wet',
    'The ground gets wet only if it rains'
  ],
  correctAnswer: 1
},
{
  id: 'logic_final_2021_8',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'Which logical fallacy occurs when one assumes that because something is popular, it is correct?',
  options: ['Straw man', 'Ad hominem', 'Appeal to authority', 'Bandwagon fallacy'],
  correctAnswer: 3
},
{
  id: 'logic_final_2021_9',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'In modal logic, what does □P typically represent?',
  options: ['Possibly P', 'Necessarily P', 'Not P', 'P is contingent'],
  correctAnswer: 1
},
{
  id: 'logic_final_2021_10',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'Which of these is an example of De Morgan\'s Law?',
  options: [
    '¬(P ∧ Q) ≡ ¬P ∨ ¬Q',
    'P → Q ≡ ¬Q → ¬P',
    'P ∨ (Q ∧ R) ≡ (P ∨ Q) ∧ (P ∨ R)',
    'P ∧ P ≡ P'
  ],
  correctAnswer: 0
},
{
  id: 'logic_final_2021_11',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'What is the main connective in the formula (P ∧ Q) → (R ∨ S)?',
  options: ['∧', '∨', '→', '¬'],
  correctAnswer: 2
},
{
  id: 'logic_final_2021_12',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'Which of these is NOT a valid logical equivalence?',
  options: [
    'P → Q ≡ ¬P ∨ Q',
    'P ↔ Q ≡ (P → Q) ∧ (Q → P)',
    'P ∨ Q ≡ ¬(¬P ∧ ¬Q)',
    'P ∧ Q ≡ ¬(P ∨ Q)'
  ],
  correctAnswer: 3
},
{
  id: 'logic_final_2021_13',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'What is the term for a statement that is always false?',
  options: ['Tautology', 'Contingency', 'Contradiction', 'Equivalence'],
  correctAnswer: 2
},
{
  id: 'logic_final_2021_14',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'Which rule allows you to infer P ∧ Q from P and Q?',
  options: ['Simplification', 'Conjunction', 'Addition', 'Disjunctive Syllogism'],
  correctAnswer: 1
},
{
  id: 'logic_final_2021_15',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'In first-order logic, what is a term?',
  options: [
    'A predicate applied to arguments',
    'A variable, constant, or function applied to terms',
    'A quantified expression',
    'A logical connective'
  ],
  correctAnswer: 1
},
{
  id: 'logic_final_2021_16',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'Which of these is NOT a valid inference in propositional logic?',
  options: [
    'From P → Q and Q, infer P',
    'From P ∨ Q and ¬P, infer Q',
    'From P → Q and P, infer Q',
    'From P → Q and ¬Q, infer ¬P'
  ],
  correctAnswer: 0
},
{
  id: 'logic_final_2021_17',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'What is the term for replacing a bound variable in a logical expression with another variable?',
  options: ['Substitution', 'Alpha conversion', 'Beta reduction', 'Universal instantiation'],
  correctAnswer: 1
},
{
  id: 'logic_final_2021_18',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'Which of these best describes the law of excluded middle?',
  options: [
    'A statement cannot be both true and false',
    'Every statement is either true or false',
    'If a statement implies a contradiction, it is false',
    'A statement must be either true or not true'
  ],
  correctAnswer: 3
},
{
  id: 'logic_final_2021_19',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'What does the completeness theorem for propositional logic state?',
  options: [
    'All true statements are provable',
    'All provable statements are true',
    'The system is consistent',
    'The system is decidable'
  ],
  correctAnswer: 0
},
{
  id: 'logic_final_2021_20',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'Which of these is NOT a standard axiom in modal logic?',
  options: ['□(P → Q) → (□P → □Q)', '□P → P', 'P → □P', '□P → ◇P'],
  correctAnswer: 2
},
{
  id: 'logic_final_2021_21',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'What is the term for a proof that demonstrates a statement by showing its negation leads to a contradiction?',
  options: ['Direct proof', 'Constructive proof', 'Proof by contrapositive', 'Proof by contradiction'],
  correctAnswer: 3
},
{
  id: 'logic_final_2021_22',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'Which of these is NOT a type of categorical proposition in traditional logic?',
  options: ['Universal affirmative', 'Universal negative', 'Particular affirmative', 'Conditional negative'],
  correctAnswer: 3
},
{
  id: 'logic_final_2021_23',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'In intuitionistic logic, which of these principles is NOT valid?',
  options: [
    'The law of non-contradiction',
    'The law of excluded middle',
    'Modus ponens',
    'The principle of explosion'
  ],
  correctAnswer: 1
},
{
  id: 'logic_final_2021_24',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'What is the term for a logical system where statements have more than two truth values?',
  options: ['Intuitionistic logic', 'Modal logic', 'Many-valued logic', 'Paraconsistent logic'],
  correctAnswer: 2
},
{
  id: 'logic_final_2021_25',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'Which of these is NOT a standard quantifier in predicate logic?',
  options: ['∀', '∃', '∃!', '∃*'],
  correctAnswer: 3
},
{
  id: 'logic_final_2021_26',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'What is the term for a logical argument where the conclusion is guaranteed by the premises?',
  options: ['Inductive', 'Deductive', 'Abductive', 'Analogical'],
  correctAnswer: 1
},
{
  id: 'logic_final_2021_27',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'Which of these is NOT a standard rule of replacement in propositional logic?',
  options: ['Double negation', 'Distribution', 'Exportation', 'Simplification'],
  correctAnswer: 3
},
{
  id: 'logic_final_2021_28',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'What is the term for a function that takes propositions as input and returns a proposition as output?',
  options: ['Predicate', 'Connective', 'Quantifier', 'Operator'],
  correctAnswer: 1
},
{
  id: 'logic_final_2021_29',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'Which of these is NOT a standard method of proof?',
  options: ['Diagonalization', 'Enumeration', 'Induction', 'Contraposition'],
  correctAnswer: 1
},
{
  id: 'logic_final_2021_30',
  subject: 'Logic',
  field: 'natural',
  year: 2021,
  type: 'final',
  question: 'What is the term for a logical system that rejects the principle of explosion?',
  options: ['Intuitionistic logic', 'Modal logic', 'Paraconsistent logic', 'Relevant logic'],
  correctAnswer: 2
},
{
  id: 'logic_final_2022_1',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'What is the principle of explosion in logic?',
  options: ['From a contradiction, anything follows', 'Complex arguments are invalid', 'Truth values explode', 'Logic has limits'],
  correctAnswer: 0
},
{
  id: 'logic_final_2022_2',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'Which of these is a valid form of argument in propositional logic?',
  options: ['Affirming the consequent', 'Denying the antecedent', 'Hypothetical syllogism', 'Begging the question'],
  correctAnswer: 2
},
{
  id: 'logic_final_2022_3',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'What is the term for a statement that is true in every possible interpretation?',
  options: ['Contingent', 'Valid', 'Satisfiable', 'Tautology'],
  correctAnswer: 3
},
{
  id: 'logic_final_2022_4',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'Which of these is NOT a standard logical connective?',
  options: ['NAND', 'XOR', 'NOR', 'AND'],
  correctAnswer: 0
},
{
  id: 'logic_final_2022_5',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'What is the term for the study of correct reasoning?',
  options: ['Epistemology', 'Ontology', 'Logic', 'Semiotics'],
  correctAnswer: 2
},
{
  id: 'logic_final_2022_6',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'Which of these is NOT a standard quantifier in first-order logic?',
  options: ['Universal', 'Existential', 'Uniqueness', 'Plural'],
  correctAnswer: 3
},
{
  id: 'logic_final_2022_7',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'What is the term for a variable that is not bound by a quantifier?',
  options: ['Free variable', 'Open variable', 'Unbound variable', 'Literal'],
  correctAnswer: 0
},
{
  id: 'logic_final_2022_8',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'Which of these is NOT a standard method of proving validity in propositional logic?',
  options: ['Truth tables', 'Natural deduction', 'Axiomatic proof', 'Empirical verification'],
  correctAnswer: 3
},
{
  id: 'logic_final_2022_9',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'What is the term for a set of sentences from which no contradiction can be derived?',
  options: ['Complete', 'Consistent', 'Sound', 'Decidable'],
  correctAnswer: 1
},
{
  id: 'logic_final_2022_10',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'Which of these is NOT a standard axiom system for propositional logic?',
  options: ['Hilbert system', 'Frege system', 'Russell system', 'Łukasiewicz system'],
  correctAnswer: 2
},
{
  id: 'logic_final_2022_11',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'What is the term for the principle that identicals are substitutable in all contexts?',
  options: [
    'Leibniz\'s Law',
    'De Morgan\'s Law',
    'Occam\'s Razor',
    'Russell\'s Paradox'
  ],
  correctAnswer: 0
},
{
  id: 'logic_final_2022_12',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'Which of these is NOT a standard rule of inference in natural deduction?',
  options: ['Modus Ponens', 'Universal Generalization', 'Existential Instantiation', 'Biconditional Elimination'],
  correctAnswer: 3
},
{
  id: 'logic_final_2022_13',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'What is the term for a logical system that includes operators for "necessarily" and "possibly"?',
  options: ['Predicate logic', 'Modal logic', 'Temporal logic', 'Deontic logic'],
  correctAnswer: 1
},
{
  id: 'logic_final_2022_14',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'Which of these is NOT a standard semantic for modal logic?',
  options: ['Kripke semantics', 'Possible world semantics', 'Neighborhood semantics', 'Tarski semantics'],
  correctAnswer: 3
},
{
  id: 'logic_final_2022_15',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'What is the term for a formula with no free variables?',
  options: ['Open formula', 'Closed formula', 'Ground formula', 'Atomic formula'],
  correctAnswer: 1
},
{
  id: 'logic_final_2022_16',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'Which of these is NOT a standard property of a logical system?',
  options: ['Soundness', 'Completeness', 'Decidability', 'Relativity'],
  correctAnswer: 3
},
{
  id: 'logic_final_2022_17',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'What is the term for a proof that proceeds by proving a sequence of intermediate statements?',
  options: ['Direct proof', 'Constructive proof', 'Proof by cases', 'Proof by exhaustion'],
  correctAnswer: 0
},
{
  id: 'logic_final_2022_18',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'Which of these is NOT a standard type of categorical syllogism?',
  options: ['Barbara', 'Celarent', 'Darii', 'Socrates'],
  correctAnswer: 3
},
{
  id: 'logic_final_2022_19',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'What is the term for the study of the meaning of logical connectives?',
  options: ['Syntax', 'Semantics', 'Pragmatics', 'Proof theory'],
  correctAnswer: 1
},
{
  id: 'logic_final_2022_20',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'Which of these is NOT a standard logical constant?',
  options: ['Truth', 'Falsity', 'And', 'Therefore'],
  correctAnswer: 3
},
{
  id: 'logic_final_2022_21',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'What is the term for a function that returns a truth value?',
  options: ['Predicate', 'Connective', 'Quantifier', 'Operator'],
  correctAnswer: 0
},
{
  id: 'logic_final_2022_22',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'Which of these is NOT a standard method of proving invalidity?',
  options: ['Counterexample', 'Truth tables', 'Natural deduction', 'Venn diagrams'],
  correctAnswer: 2
},
{
  id: 'logic_final_2022_23',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'What is the term for a logical system that rejects the law of excluded middle?',
  options: ['Classical logic', 'Intuitionistic logic', 'Modal logic', 'Paraconsistent logic'],
  correctAnswer: 1
},
{
  id: 'logic_final_2022_24',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'Which of these is NOT a standard type of logical paradox?',
  options: ['Russell\'s paradox', 'Liar paradox', 'Sorites paradox', 'Plato\'s paradox'],
  correctAnswer: 3
},
{
  id: 'logic_final_2022_25',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'What is the term for a statement that must be true if the premises are true?',
  options: ['Conclusion', 'Consequent', 'Antecedent', 'Conditional'],
  correctAnswer: 0
},
{
  id: 'logic_final_2022_26',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'Which of these is NOT a standard type of logical opposition?',
  options: ['Contradictory', 'Contrary', 'Subcontrary', 'Subaltern'],
  correctAnswer: 3
},
{
  id: 'logic_final_2022_27',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'What is the term for a logical system that extends propositional logic with quantifiers?',
  options: ['Modal logic', 'Predicate logic', 'Temporal logic', 'Deontic logic'],
  correctAnswer: 1
},
{
  id: 'logic_final_2022_28',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'Which of these is NOT a standard method of logical analysis?',
  options: ['Truth tables', 'Venn diagrams', 'Natural deduction', 'Empirical observation'],
  correctAnswer: 3
},
{
  id: 'logic_final_2022_29',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'What is the term for a logical argument where the conclusion is probably true given the premises?',
  options: ['Deductive', 'Inductive', 'Abductive', 'Analogical'],
  correctAnswer: 1
},
{
  id: 'logic_final_2022_30',
  subject: 'Logic',
  field: 'natural',
  year: 2022,
  type: 'final',
  question: 'Which of these is NOT a standard property of relations in logic?',
  options: ['Reflexivity', 'Symmetry', 'Transitivity', 'Duality'],
  correctAnswer: 3
},
{
  id: 'logic_final_2023_1',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'What is the principle of explosion in logic?',
  options: ['From a contradiction, anything follows', 'Complex arguments are invalid', 'Truth values explode', 'Logic has limits'],
  correctAnswer: 0
},
{
  id: 'logic_final_2023_2',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'Which of these is NOT a standard truth-functional connective?',
  options: ['And', 'Or', 'If...then', 'Because'],
  correctAnswer: 3
},
{
  id: 'logic_final_2023_3',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'What is the term for a logical system that allows for vague predicates?',
  options: ['Fuzzy logic', 'Modal logic', 'Temporal logic', 'Deontic logic'],
  correctAnswer: 0
},
{
  id: 'logic_final_2023_4',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'Which of these is NOT a standard type of logical equivalence?',
  options: ['Material equivalence', 'Logical equivalence', 'Semantic equivalence', 'Syntactic equivalence'],
  correctAnswer: 2
},
{
  id: 'logic_final_2023_5',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'What is the term for a statement that is false in every possible interpretation?',
  options: ['Contingent', 'Valid', 'Unsatisfiable', 'Tautology'],
  correctAnswer: 2
},
{
  id: 'logic_final_2023_6',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'Which of these is NOT a standard method of proof in predicate logic?',
  options: ['Universal generalization', 'Existential instantiation', 'Universal instantiation', 'Existential generalization'],
  correctAnswer: 3
},
{
  id: 'logic_final_2023_7',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'What is the term for a logical system that studies obligations and permissions?',
  options: ['Modal logic', 'Temporal logic', 'Deontic logic', 'Epistemic logic'],
  correctAnswer: 2
},
{
  id: 'logic_final_2023_8',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'Which of these is NOT a standard type of logical constant?',
  options: ['Truth', 'Falsity', 'And', 'Therefore'],
  correctAnswer: 3
},
{
  id: 'logic_final_2023_9',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'What is the term for a logical system that studies knowledge and belief?',
  options: ['Modal logic', 'Temporal logic', 'Deontic logic', 'Epistemic logic'],
  correctAnswer: 3
},
{
  id: 'logic_final_2023_10',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'Which of these is NOT a standard type of logical diagram?',
  options: ['Venn diagram', 'Truth table', 'Carroll diagram', 'Euler diagram'],
  correctAnswer: 2
},
{
  id: 'logic_final_2023_11',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'What is the term for a logical system that studies time and temporal relationships?',
  options: ['Modal logic', 'Temporal logic', 'Deontic logic', 'Epistemic logic'],
  correctAnswer: 1
},
{
  id: 'logic_final_2023_12',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'Which of these is NOT a standard type of logical fallacy?',
  options: ['Straw man', 'Ad hominem', 'False dilemma', 'Valid inference'],
  correctAnswer: 3
},
{
  id: 'logic_final_2023_13',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'What is the term for a logical system that extends classical logic with additional operators?',
  options: ['Non-classical logic', 'Extended logic', 'Supplemental logic', 'Enhanced logic'],
  correctAnswer: 0
},
{
  id: 'logic_final_2023_14',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'Which of these is NOT a standard type of logical quantifier?',
  options: ['Universal', 'Existential', 'Uniqueness', 'Plural'],
  correctAnswer: 3
},
{
  id: 'logic_final_2023_15',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'What is the term for a logical system that rejects certain classical principles?',
  options: ['Non-classical logic', 'Extended logic', 'Supplemental logic', 'Enhanced logic'],
  correctAnswer: 0
},
{
  id: 'logic_final_2023_16',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'Which of these is NOT a standard type of logical operator?',
  options: ['Truth-functional', 'Non-truth-functional', 'Modal', 'Quantificational'],
  correctAnswer: 1
},
{
  id: 'logic_final_2023_17',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'What is the term for a logical system that studies conditional statements?',
  options: ['Modal logic', 'Temporal logic', 'Relevance logic', 'Epistemic logic'],
  correctAnswer: 2
},
{
  id: 'logic_final_2023_18',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'Which of these is NOT a standard type of logical proof?',
  options: ['Direct proof', 'Indirect proof', 'Constructive proof', 'Speculative proof'],
  correctAnswer: 3
},
{
  id: 'logic_final_2023_19',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'What is the term for a logical system that allows for truth value gaps?',
  options: ['Paraconsistent logic', 'Many-valued logic', 'Partial logic', 'Free logic'],
  correctAnswer: 2
},
{
  id: 'logic_final_2023_20',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'Which of these is NOT a standard type of logical semantics?',
  options: ['Model-theoretic', 'Proof-theoretic', 'Algebraic', 'Empirical'],
  correctAnswer: 3
},
{
  id: 'logic_final_2023_21',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'What is the term for a logical system that studies the logic of questions?',
  options: ['Erotetic logic', 'Deontic logic', 'Epistemic logic', 'Temporal logic'],
  correctAnswer: 0
},
{
  id: 'logic_final_2023_22',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'Which of these is NOT a standard type of logical calculus?',
  options: ['Propositional calculus', 'Predicate calculus', 'Modal calculus', 'Algebraic calculus'],
  correctAnswer: 3
},
{
  id: 'logic_final_2023_23',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'What is the term for a logical system that studies the logic of commands?',
  options: ['Deontic logic', 'Imperative logic', 'Directive logic', 'Command logic'],
  correctAnswer: 1
},
{
  id: 'logic_final_2023_24',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'Which of these is NOT a standard type of logical validity?',
  options: ['Deductive', 'Inductive', 'Abductive', 'Speculative'],
  correctAnswer: 3
},
{
  id: 'logic_final_2023_25',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'What is the term for a logical system that studies the logic of fiction?',
  options: ['Fictional logic', 'Narrative logic', 'Story logic', 'None of the above'],
  correctAnswer: 3
},
{
  id: 'logic_final_2023_26',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'Which of these is NOT a standard type of logical relation?',
  options: ['Entailment', 'Equivalence', 'Contradiction', 'Juxtaposition'],
  correctAnswer: 3
},
{
  id: 'logic_final_2023_27',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'What is the term for a logical system that studies the logic of preference?',
  options: ['Preference logic', 'Deontic logic', 'Epistemic logic', 'Temporal logic'],
  correctAnswer: 0
},
{
  id: 'logic_final_2023_28',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'Which of these is NOT a standard type of logical form?',
  options: ['Syllogistic', 'Propositional', 'Predicate', 'Narrative'],
  correctAnswer: 3
},
{
  id: 'logic_final_2023_29',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'What is the term for a logical system that studies the logic of action?',
  options: ['Deontic logic', 'Dynamic logic', 'Epistemic logic', 'Temporal logic'],
  correctAnswer: 1
},
{
  id: 'logic_final_2023_30',
  subject: 'Logic',
  field: 'natural',
  year: 2023,
  type: 'final',
  question: 'Which of these is NOT a standard type of logical theory?',
  options: ['Proof theory', 'Model theory', 'Recursion theory', 'Narrative theory'],
  correctAnswer: 3
},

  // ==================== CIVIC QUESTIONS ====================
  // Civic Final Questions 2021-2024
  {
    id: 'civic_final_2021_1',
    subject: 'Civic',
    field: 'natural',
    year: 2021,
    type: 'final',
    question: 'What is the main purpose of separation of powers?',
    options: ['To create confusion', 'To prevent abuse of power', 'To slow down government', 'To create multiple leaders'],
    correctAnswer: 1
  },
  {
    id: 'civic_final_2021_2',
    subject: 'Civic',
    field: 'natural',
    year: 2021,
    type: 'final',
    question: 'Which branch of government interprets laws?',
    options: ['Executive', 'Legislative', 'Judicial', 'Administrative'],
    correctAnswer: 2
  },
  {
    id: 'civic_final_2022_1',
    subject: 'Civic',
    field: 'natural',
    year: 2022,
    type: 'final',
    question: 'What is civil disobedience?',
    options: ['Breaking any law', 'Peaceful resistance to unjust laws', 'Violent protest', 'Ignoring elections'],
    correctAnswer: 1
  },
  {
    id: 'civic_final_2023_1',
    subject: 'Civic',
    field: 'natural',
    year: 2023,
    type: 'final',
    question: 'What is the primary function of a constitution?',
    options: ['To list all laws', 'To establish government structure and limits', 'To elect officials', 'To collect taxes'],
    correctAnswer: 1
  },
  {
    id: 'civic_final_2024_1',
    subject: 'Civic',
    field: 'natural',
    year: 2024,
    type: 'final',
    question: 'What does "rule of law" mean?',
    options: ['Lawyers rule society', 'Laws are suggestions', 'Everyone is equal under the law', 'Laws change daily'],
    correctAnswer: 2
  },

  // ==================== ANTHROPOLOGY QUESTIONS (FREE) ====================
  // Anthropology questions for both Natural and Social fields
  {
    id: 'anthro_mid_2021_1',
    subject: 'Anthropology',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'What is cultural anthropology primarily concerned with?',
    options: ['Human evolution', 'Cultural practices and beliefs', 'Language development', 'Archaeological artifacts'],
    correctAnswer: 1
  },
  {
    id: 'anthro_mid_2021_1_social',
    subject: 'Anthropology',
    field: 'social',
    year: 2021,
    type: 'mid',
    question: 'What is cultural anthropology primarily concerned with?',
    options: ['Human evolution', 'Cultural practices and beliefs', 'Language development', 'Archaeological artifacts'],
    correctAnswer: 1
  },
  {
    id: 'anthro_mid_2022_1',
    subject: 'Anthropology',
    field: 'natural',
    year: 2022,
    type: 'mid',
    question: 'Who is considered the father of American anthropology?',
    options: ['Claude Lévi-Strauss', 'Franz Boas', 'Margaret Mead', 'Bronisław Malinowski'],
    correctAnswer: 1
  },
  {
    id: 'anthro_mid_2022_1_social',
    subject: 'Anthropology',
    field: 'social',
    year: 2022,
    type: 'mid',
    question: 'Who is considered the father of American anthropology?',
    options: ['Claude Lévi-Strauss', 'Franz Boas', 'Margaret Mead', 'Bronisław Malinowski'],
    correctAnswer: 1
  },

  // ==================== ENGLISH QUESTIONS ====================
  // English questions for Natural Sciences
  {
    id: 'eng_mid_2021_1_nat',
    subject: 'English',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'What is the past tense of "go"?',
    options: ['goed', 'went', 'gone', 'going'],
    correctAnswer: 1
  },
  {
    id: 'eng_mid_2022_1_nat',
    subject: 'English',
    field: 'natural',
    year: 2022,
    type: 'mid',
    question: 'Which of the following is a compound sentence?',
    options: ['I went to the store.', 'I went to the store, and I bought milk.', 'When I went to the store.', 'Going to the store.'],
    correctAnswer: 1
  },

  // English questions for Social Sciences
  {
    id: 'eng_mid_2021_1_soc',
    subject: 'English',
    field: 'social',
    year: 2021,
    type: 'mid',
    question: 'What is a metaphor?',
    options: ['A direct comparison using like or as', 'An indirect comparison without using like or as', 'A sound repetition', 'A question without an answer'],
    correctAnswer: 1
  },
  {
    id: 'eng_mid_2022_1_soc',
    subject: 'English',
    field: 'social',
    year: 2022,
    type: 'mid',
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
    correctAnswer: 1
  },

  // ==================== PSYCHOLOGY QUESTIONS ====================
  // Psychology questions for both fields
  {
    id: 'psych_mid_2021_1_nat',
    subject: 'Psychology',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'Who is known as the father of psychoanalysis?',
    options: ['Carl Jung', 'Sigmund Freud', 'B.F. Skinner', 'Ivan Pavlov'],
    correctAnswer: 1
  },
  {
    id: 'psych_mid_2021_1_soc',
    subject: 'Psychology',
    field: 'social',
    year: 2021,
    type: 'mid',
    question: 'Who is known as the father of psychoanalysis?',
    options: ['Carl Jung', 'Sigmund Freud', 'B.F. Skinner', 'Ivan Pavlov'],
    correctAnswer: 1
  },

  // ==================== ECONOMICS QUESTIONS ====================
  // Economics questions for both fields
  {
    id: 'econ_mid_2021_1_nat',
    subject: 'Economics',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'What is the law of demand?',
    options: ['Price and quantity are unrelated', 'As price increases, quantity demanded decreases', 'As price increases, quantity demanded increases', 'Demand is always constant'],
    correctAnswer: 1
  },
  {
    id: 'econ_mid_2021_1_soc',
    subject: 'Economics',
    field: 'social',
    year: 2021,
    type: 'mid',
    question: 'What is the law of demand?',
    options: ['Price and quantity are unrelated', 'As price increases, quantity demanded decreases', 'As price increases, quantity demanded increases', 'Demand is always constant'],
    correctAnswer: 1
  },

  // ==================== C++ QUESTIONS ====================
  // C++ questions for both fields
  {
    id: 'cpp_mid_2021_1_nat',
    subject: 'C++',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'What is the correct syntax to output "Hello World" in C++?',
    options: ['cout << "Hello World";', 'System.out.println("Hello World");', 'print("Hello World")', 'printf("Hello World");'],
    correctAnswer: 0
  },
  {
    id: 'cpp_mid_2021_1_soc',
    subject: 'C++',
    field: 'social',
    year: 2021,
    type: 'mid',
    question: 'What is the correct syntax to output "Hello World" in C++?',
    options: ['cout << "Hello World";', 'System.out.println("Hello World");', 'print("Hello World")', 'printf("Hello World");'],
    correctAnswer: 0
  },
{
    id: 'cpp_mid_2021_1_soc',
    subject: 'C++',
    field: 'social',
    year: 2021,
    type: 'mid',
    question: 'What is the correct syntax to output "Hello World" in C++?',
    options: ['cout << "Hello World";', 'System.out.println("Hello World");', 'print("Hello World")', 'printf("Hello World");'],
    correctAnswer: 0
  },


  {
    id: 'ent_mid_2021_1_soc',
    subject: 'Entrepreneurship',
    field: 'social',
    year: 2021,
    type: 'mid',
    question: 'What is the correct syntax to output "Hello World" in C++?',
    options: ['cout << "Hello World";', 'System.out.println("Hello World");', 'print("Hello World")', 'printf("Hello World");'],
    correctAnswer: 0
  },

  {
    id: 'ent_mid_2021_1_nat',
    subject: 'Entrepreneurship',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'What is the correct syntax to output "Hello World" in C++?',
    options: ['cout << "Hello World";', 'System.out.println("Hello World");', 'print("Hello World")', 'printf("Hello World");'],
    correctAnswer: 0
  },
{
    id: 'ent_final_2021_1_soc',
    subject: 'Entrepreneurship',
    field: 'social',
    year: 2021,
    type: 'final',
    question: 'What is the correct syntax to output "Hello World" in C++?',
    options: ['cout << "Hello World";', 'System.out.println("Hello World");', 'print("Hello World")', 'printf("Hello World");'],
    correctAnswer: 0
  },

  // ==================== More subjects can be added following the same pattern ====================
  // COC Health (Natural), COC Law (Social), Entrepreneurship, Inclusive Education, Emerging


];

// Helper function to get questions by filters
export const getQuestionsBySubject = (subject: string, field: 'natural' | 'social') => {
  return questions.filter(q => q.subject === subject && q.field === field);
};

export const getQuestionsByYear = (year: number, field: 'natural' | 'social') => {
  return questions.filter(q => q.year === year && q.field === field);
};

export const getQuestionsByType = (type: 'mid' | 'final', field: 'natural' | 'social') => {
  return questions.filter(q => q.type === type && q.field === field);
};

export const getQuestionsBySubjectAndYear = (subject: string, year: number, type: 'mid' | 'final', field: 'natural' | 'social') => {
  return questions.filter(q => 
    q.subject === subject && 
    q.year === year && 
    q.type === type && 
    q.field === field
  );
};