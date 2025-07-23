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
    id: 'logic_mid_2021_1',
    subject: 'Logic',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'What is a syllogism?',
    options: ['A type of fallacy', 'A form of deductive reasoning', 'An inductive argument', 'A statistical method'],
    correctAnswer: 1
  },
  {
    id: 'logic_mid_2021_2',
    subject: 'Logic',
    field: 'natural',
    year: 2021,
    type: 'mid',
    question: 'Which of the following is an example of modus ponens?',
    options: ['If P then Q, not Q, therefore not P', 'If P then Q, P, therefore Q', 'P or Q, not P, therefore Q', 'P and Q, therefore P'],
    correctAnswer: 1
  },
  {
    id: 'logic_mid_2022_1',
    subject: 'Logic',
    field: 'natural',
    year: 2022,
    type: 'mid',
    question: 'What is the law of non-contradiction?',
    options: ['Something cannot be both true and false', 'Everything must have a cause', 'All events are determined', 'Truth is relative'],
    correctAnswer: 0
  },
  {
    id: 'logic_mid_2023_1',
    subject: 'Logic',
    field: 'natural',
    year: 2023,
    type: 'mid',
    question: 'Which logical fallacy involves attacking the person rather than their argument?',
    options: ['Straw man', 'Ad hominem', 'False dilemma', 'Circular reasoning'],
    correctAnswer: 1
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