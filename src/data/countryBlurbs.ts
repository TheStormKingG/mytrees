/**
 * Per-country data: unique 45-word climate/biodiversity blurb,
 * national animal, and national plant/flower.
 */

export interface CountryInfo {
  blurb: string
  nationalAnimal: { name: string; emoji: string }
  nationalPlant:  { name: string; emoji: string }
}

export const COUNTRY_DATA: Record<string, CountryInfo> = {

  'Afghanistan': {
    blurb: "Decades of conflict stripped 70% of Afghanistan's pistachio and juniper forests, triggering deadly landslides and summer droughts. Without tree roots, snowmelt floods valleys in spring then vanishes. Planting native pistachio restores food security, anchors eroding slopes, and rebuilds corridors for the endangered snow leopard.",
    nationalAnimal: { name: 'Snow Leopard',       emoji: '🐆' },
    nationalPlant:  { name: 'Afghan Pine',         emoji: '🌲' },
  },

  'Albania': {
    blurb: "Albania's Illyrian oak forests — sheltering Balkan lynx, wolves, and rare endemic fish — are retreating under illegal chainsaw pressure. Denuded hillsides strip topsoil into the Adriatic. Planting native oaks and willows along river banks filters runoff, restores fisheries, and reconnects fragmented forest patches.",
    nationalAnimal: { name: 'Golden Eagle',        emoji: '🦅' },
    nationalPlant:  { name: 'Olive Tree',          emoji: '🫒' },
  },

  'Algeria': {
    blurb: "The Sahara advances northward into Algeria at roughly 50,000 hectares per year, swallowing farmland and burying villages. Atlas cedar forests — refuge of the critically endangered Barbary macaque — are thinning from drought and grazing. Planting drought-tolerant native trees builds the green barrier Algeria desperately needs.",
    nationalAnimal: { name: 'Fennec Fox',          emoji: '🦊' },
    nationalPlant:  { name: 'Atlas Cedar',         emoji: '🌲' },
  },

  'Angola': {
    blurb: "Angola's miombo woodland — one of Earth's largest dry-forest ecosystems and home to the critically endangered giant sable antelope — is being razed for charcoal. Less than 1,000 giant sable remain. Planting native miombo trees rebuilds habitat corridors that no other ecosystem on Earth can replace.",
    nationalAnimal: { name: 'Giant Sable Antelope', emoji: '🦌' },
    nationalPlant:  { name: 'Welwitschia',          emoji: '🌿' },
  },

  'Argentina': {
    blurb: "Argentina has cleared over 70% of its Atlantic Forest and continues bulldozing the Gran Chaco — one of South America's most biodiverse woodlands — for soy and cattle. Jaguars and giant anteaters are losing ground daily. Planting native hardwoods sequesters carbon and restores vital wildlife corridors.",
    nationalAnimal: { name: 'Rufous Hornero',      emoji: '🐦' },
    nationalPlant:  { name: 'Ceibo Flower',        emoji: '🌸' },
  },

  'Australia': {
    blurb: "Australia loses over a million hectares of native vegetation annually — one of the highest deforestation rates globally. With 80% of species found nowhere else, every clearing permanently erases unique life. Planting native trees restores koala food corridors, filters water catchments, and rebuilds habitat for threatened birds.",
    nationalAnimal: { name: 'Red Kangaroo',        emoji: '🦘' },
    nationalPlant:  { name: 'Golden Wattle',       emoji: '🌼' },
  },

  'Bangladesh': {
    blurb: "Bangladesh ranks among Earth's most climate-vulnerable nations: one-third of its land floods annually, and cyclones are growing fiercer as sea levels rise. The Sundarbans — world's largest mangrove forest — is shrinking. Planting coastal mangroves and native trees acts as a living seawall protecting millions of lives.",
    nationalAnimal: { name: 'Royal Bengal Tiger',  emoji: '🐅' },
    nationalPlant:  { name: 'White Water Lily',    emoji: '🪷' },
  },

  'Bolivia': {
    blurb: "Bolivia's Andean glaciers — freshwater lifelines for La Paz — are losing mass faster than anywhere in the tropics. Meanwhile, Amazonian fires burn deeper each dry season, fragmenting jaguar territory. Planting trees on degraded hillsides slows meltwater run-off, rebuilds cloud-forest moisture, and gives wildlife a refuge.",
    nationalAnimal: { name: 'Llama',               emoji: '🦙' },
    nationalPlant:  { name: 'Kantuta Flower',      emoji: '🌸' },
  },

  'Brazil': {
    blurb: "Brazil's Amazon — producing roughly 20% of Earth's oxygen — lost a record 13,000 km² in a single year. Deforestation pushes the forest toward a tipping point beyond which it converts to savannah permanently. Every tree planted in degraded land delays that collapse and shelters jaguars and river dolphins.",
    nationalAnimal: { name: 'Jaguar',              emoji: '🐆' },
    nationalPlant:  { name: 'Cattleya Orchid',     emoji: '🌺' },
  },

  'Cameroon': {
    blurb: "Cameroon anchors the Congo Basin forest — Earth's second-largest carbon sink — but palm oil and industrial logging are cutting deep into buffer zones. Western lowland gorillas and forest elephants are retreating further each season. Planting native trees in cleared zones protects these irreplaceable communities of great apes.",
    nationalAnimal: { name: 'Lion',                emoji: '🦁' },
    nationalPlant:  { name: 'Raffia Palm',         emoji: '🌴' },
  },

  'Canada': {
    blurb: "Canada's boreal forest stores more carbon per hectare than tropical rainforests, yet record-breaking wildfires and clearcut logging are releasing millennia of carbon in seasons. Woodland caribou herds collapse wherever roads fragment the boreal. Replanting burned and logged zones locks carbon back and rebuilds vital caribou habitat.",
    nationalAnimal: { name: 'Beaver',              emoji: '🦫' },
    nationalPlant:  { name: 'Sugar Maple',         emoji: '🍁' },
  },

  'Chile': {
    blurb: "Chile's Valdivian temperate rainforest — one of only five such biomes on Earth — is being replaced by flammable eucalyptus and pine monocultures. Catastrophic wildfires now tear through these plantations annually, destroying native life. Planting native alerce, coigüe, and Chilean bellflower restores the unique ecosystems the pudú depends on.",
    nationalAnimal: { name: 'Andean Condor',       emoji: '🦅' },
    nationalPlant:  { name: 'Chilean Bellflower',  emoji: '🌸' },
  },

  'China': {
    blurb: "Northern China loses 3,600 km² of farmland to sandstorms annually as the Gobi desert expands. Meanwhile subtropical forest biodiversity — home to giant pandas and snow leopards — is fragmented by agriculture and roads. China's reforestation projects show how native tree planting can reverse desertification and restore watersheds.",
    nationalAnimal: { name: 'Giant Panda',         emoji: '🐼' },
    nationalPlant:  { name: 'Plum Blossom',        emoji: '🌸' },
  },

  'Colombia': {
    blurb: "Colombia holds the world's second-highest biodiversity, yet deforestation for coca and cattle is pushing the Amazon and Pacific forests to their tipping point. Nearly 200,000 hectares disappear annually. Planting trees protects spectacled bears and tapirs while restoring cloud-forest springs that supply water to over 10 million people.",
    nationalAnimal: { name: 'Andean Condor',       emoji: '🦅' },
    nationalPlant:  { name: 'Christmas Orchid',    emoji: '🌺' },
  },

  'Congo': {
    blurb: "The Republic of Congo guards the Congo Basin's core — a forest storing more carbon than all US and European forests combined. Industrial logging concessions are expanding rapidly. Planting trees in degraded logging zones keeps this irreplaceable carbon sink intact and shelters forest buffalo, bongo, and chimpanzees.",
    nationalAnimal: { name: 'Forest Buffalo',      emoji: '🐃' },
    nationalPlant:  { name: 'Raffia Palm',         emoji: '🌴' },
  },

  'DR Congo': {
    blurb: "DR Congo holds Africa's largest tropical forest and the world's highest deforestation rate on the continent. Charcoal for Kinshasa alone consumes millions of trees each year. Planting native trees around village woodlots reduces charcoal pressure on ancient forest, protecting okapis, bonobos, and billions of tonnes of stored carbon.",
    nationalAnimal: { name: 'Okapi',               emoji: '🦒' },
    nationalPlant:  { name: 'Raffia Palm',         emoji: '🌴' },
  },

  'Costa Rica': {
    blurb: "Costa Rica rescued its forests — recovering from 21% cover in 1983 to over 52% today — through innovative payment-for-ecosystem-services policy. But remaining deforestation pressure threatens the resplendent quetzal's cloud-forest nesting. Planting native trees on degraded cattle pasture continues this global success story and secures freshwater for millions.",
    nationalAnimal: { name: 'White-tailed Deer',   emoji: '🦌' },
    nationalPlant:  { name: 'Purple Orchid',       emoji: '🌸' },
  },

  'Ecuador': {
    blurb: "Ecuador packs more species per square kilometre than almost any country on Earth, but western Amazonian deforestation is eliminating that diversity faster than scientists can describe it. Cloud-forest orchid species vanish before being named. Planting native trees on degraded Andean slopes protects headwaters supplying three major river systems.",
    nationalAnimal: { name: 'Giant Tortoise',      emoji: '🐢' },
    nationalPlant:  { name: 'Rose',                emoji: '🌹' },
  },

  'Ethiopia': {
    blurb: "Ethiopia has lost over 97% of its original highland forest to agriculture and charcoal production, destabilising the entire Blue Nile watershed that Egypt and Sudan depend on. Soil erosion now costs Ethiopia an estimated $1 billion annually. Ethiopia's tree-planting drives show mass restoration can restore rainfall and reverse desertification.",
    nationalAnimal: { name: 'Lion of Judah',       emoji: '🦁' },
    nationalPlant:  { name: 'Calla Lily',          emoji: '🌸' },
  },

  'France': {
    blurb: "France's forests are collapsing from bark-beetle explosions fuelled by record-breaking droughts. In 2022 alone, over 65,000 hectares burned in a single summer. Monoculture pine plantations burn fastest. Planting diverse, drought-resistant native oak, beech, and fir strengthens Europe's most important biodiversity corridor running from Pyrenees to Alps.",
    nationalAnimal: { name: 'Gallic Rooster',      emoji: '🐓' },
    nationalPlant:  { name: 'Iris',                emoji: '🌸' },
  },

  'Gabon': {
    blurb: "Gabon protects 90% of its rainforest — storing 4 billion tonnes of carbon — making it the only carbon-negative country in Africa. But offshore oil revenue is declining, creating pressure to monetise timber. Planting native trees in community buffer zones protects lowland gorillas and the carbon wealth Gabon holds for the world.",
    nationalAnimal: { name: 'Black Panther',       emoji: '🐆' },
    nationalPlant:  { name: 'Okoumé Tree',         emoji: '🌲' },
  },

  'Germany': {
    blurb: "Germany's beloved forests — the Schwarzwald, the Harz — have suffered their worst recorded die-off. Bark beetles, liberated by warming winters, killed 285,000 hectares of spruce in five years. Planting diverse native beech, oak, and fir species replaces catastrophically fragile monocultures with forests built to survive warming.",
    nationalAnimal: { name: 'Golden Eagle',        emoji: '🦅' },
    nationalPlant:  { name: 'Cornflower',          emoji: '💐' },
  },

  'Ghana': {
    blurb: "Ghana has lost over 80% of its original forest in a century, fragmenting habitat for forest elephants and rare primates and eliminating the rainfall-generating forest that once fed Ghana's rivers. Planting native trees alongside cocoa agroforestry restores biodiversity, boosts farmer yields, and cools a rapidly warming country.",
    nationalAnimal: { name: 'Tawny Eagle',         emoji: '🦅' },
    nationalPlant:  { name: 'African Tulip',       emoji: '🌺' },
  },

  'Guatemala': {
    blurb: "Guatemala's Maya Biosphere Reserve — last refuge of scarlet macaws, jaguars, and tapirs in Central America — faces relentless encroachment by smallholders pushed off land by climate-driven crop failure. Degraded hillsides trigger lethal mudslides. Planting native trees in buffer zones keeps wildlife corridors open and stabilises highland communities.",
    nationalAnimal: { name: 'Resplendent Quetzal', emoji: '🐦' },
    nationalPlant:  { name: 'White Nun Orchid',    emoji: '🌸' },
  },

  'India': {
    blurb: "India's Western Ghats — one of Earth's eight hottest biodiversity hotspots — loses forest at over 1,400 km² per year to infrastructure and agriculture. Bengal tigers need unbroken corridors to survive genetically. Planting native species reconnects fragmented reserves, restores monsoon-generating cloud forests, and protects endemic species found nowhere else.",
    nationalAnimal: { name: 'Bengal Tiger',        emoji: '🐅' },
    nationalPlant:  { name: 'Lotus',               emoji: '🪷' },
  },

  'Indonesia': {
    blurb: "Indonesia burns more peatland than any country on Earth — releasing carbon stored for thousands of years in a single fire season. Sumatran orangutans, tigers, and elephants share shrinking forest islands surrounded by palm oil. Planting native trees in degraded peatland restores carbon storage and gives species corridors to survive.",
    nationalAnimal: { name: 'Komodo Dragon',       emoji: '🦎' },
    nationalPlant:  { name: 'White Jasmine',       emoji: '🌸' },
  },

  'Iran': {
    blurb: "Iran's Hyrcanian forest — a 25-million-year-old refugium pre-dating the last Ice Age and listed as UNESCO World Heritage — is shrinking from encroachment and drought. The critically endangered Asiatic cheetah has fewer than 50 individuals left. Planting native trees in degraded margins expands the only habitat this ancient ecosystem has.",
    nationalAnimal: { name: 'Asiatic Cheetah',     emoji: '🐆' },
    nationalPlant:  { name: 'Red Rose',            emoji: '🌹' },
  },

  'Japan': {
    blurb: "Japan's cedar and cypress plantations — planted post-war to rebuild the economy — now blanket mountains that once held diverse native forest. These monocultures trigger massive pollen allergies, store less carbon, and collapse in typhoons. Planting diverse native broadleaf trees restores habitat for the Japanese giant salamander and flying squirrel.",
    nationalAnimal: { name: 'Green Pheasant',      emoji: '🐦' },
    nationalPlant:  { name: 'Cherry Blossom',      emoji: '🌸' },
  },

  'Kenya': {
    blurb: "Kenya's Mau Forest — East Africa's largest montane forest and water tower for the Rift Valley — has lost 25% of its cover to charcoal cutting and encroachment since 1975. Rivers feeding Nairobi and farming zones are drying. Planting native trees restores the catchments that sustain lions, elephants, and Kenyans.",
    nationalAnimal: { name: 'Lion',                emoji: '🦁' },
    nationalPlant:  { name: 'African Lily',        emoji: '🌸' },
  },

  'Kyrgyzstan': {
    blurb: "Kyrgyzstan's Fergana walnut forests — ancestral home of all the world's cultivated walnuts — are collapsing under livestock grazing and illegal harvesting. Tian Shan glaciers feeding cities with fresh water are retreating at accelerating rates. Planting native walnut and juniper trees restores this irreplaceable ecosystem and safeguards snow leopard territory.",
    nationalAnimal: { name: 'Snow Leopard',        emoji: '🐆' },
    nationalPlant:  { name: 'Tulip',               emoji: '🌷' },
  },

  'Latvia': {
    blurb: "Latvia's Soviet-era clear-felling replaced ancient mixed boreal forest with monoculture pine plantations that hold a fraction of the original biodiversity. Peat bogs — Europe's most significant carbon stores outside permafrost — are still being drained for agriculture. Planting native birch, oak, and alder rebuilds Latvia's lost mixed-forest ecosystem.",
    nationalAnimal: { name: 'White Wagtail',       emoji: '🐦' },
    nationalPlant:  { name: 'Daisy',               emoji: '🌼' },
  },

  'Madagascar': {
    blurb: "Madagascar has lost over 90% of its original vegetation, leaving 90% of its wildlife — including every lemur species — with nowhere else on Earth to live. A new species goes locally extinct every two months. Every tree planted is a direct lifeline, the only way to stitch together a shattered island paradise.",
    nationalAnimal: { name: 'Ring-tailed Lemur',   emoji: '🐒' },
    nationalPlant:  { name: "Traveller's Palm",    emoji: '🌴' },
  },

  'Malaysia': {
    blurb: "Malaysia's ancient Borneo rainforest — 130 million years old, older than the Amazon — ranks among the fastest-deforested on Earth. Pygmy elephants, clouded leopards, and critically endangered Bornean orangutans are losing ground to palm oil each week. Planting native trees in logged zones gives these species a genuine path to recovery.",
    nationalAnimal: { name: 'Malayan Tiger',       emoji: '🐅' },
    nationalPlant:  { name: 'Hibiscus',            emoji: '🌺' },
  },

  'Mexico': {
    blurb: "Mexico's monarch butterfly migration — one of nature's greatest spectacles — depends entirely on overwintering oyamel fir forests that are shrinking from illegal logging and drought stress. Cloud forests sheltering jaguars and axolotls are being converted to agriculture. Planting native trees rebuilds these habitats and keeps migratory corridors intact.",
    nationalAnimal: { name: 'Golden Eagle',        emoji: '🦅' },
    nationalPlant:  { name: 'Dahlia',              emoji: '💐' },
  },

  'Morocco': {
    blurb: "Morocco's argan forests — home to a unique tree-climbing goat ecosystem and UNESCO-protected — are shrinking from drought intensified by climate change. Atlas cedar woodland, last refuge of the Barbary macaque, has lost 75% of its range this century. Planting native and drought-adapted trees halts advancing desertification across the Atlas highlands.",
    nationalAnimal: { name: 'Barbary Macaque',     emoji: '🐒' },
    nationalPlant:  { name: 'Atlas Cedar',         emoji: '🌲' },
  },

  'Mozambique': {
    blurb: "Mozambique's coastline is among Earth's most cyclone-battered: Idai and Kenneth struck within weeks of each other in 2019. Yet coastal mangroves that absorb storm surge have been cleared for agriculture. Planting mangroves and native inland trees gives communities a natural seawall and rebuilds fish nurseries wiped out by deforestation.",
    nationalAnimal: { name: 'African Fish Eagle',  emoji: '🦅' },
    nationalPlant:  { name: 'Flamboyant Tree',     emoji: '🌺' },
  },

  'Myanmar': {
    blurb: "Myanmar has the highest deforestation rate in Southeast Asia — losing forests twice the size of Singapore annually. Ancient teak and ironwood forests shelter Indochinese tigers and the critically endangered Irrawaddy dolphin. Planting native trees reduces landslide casualties in flood-prone deltas and begins reversing one of Asia's worst deforestation crises.",
    nationalAnimal: { name: 'Green Peafowl',       emoji: '🦚' },
    nationalPlant:  { name: 'Padauk Blossom',      emoji: '🌼' },
  },

  'Nepal': {
    blurb: "Nepal's Himalayan forests regulate downstream water for over 1.3 billion people in India, Bangladesh, and Pakistan. But steep hillsides cleared for farming are collapsing in monsoon floods that kill thousands annually. Community tree-planting on degraded slopes has already halved erosion rates while restoring red panda and snow leopard habitat.",
    nationalAnimal: { name: 'Cow',                 emoji: '🐄' },
    nationalPlant:  { name: 'Rhododendron',        emoji: '🌸' },
  },

  'New Zealand': {
    blurb: "New Zealand's wildlife evolved over 80 million years without mammals — making every introduced rat and stoat catastrophic. Just 6% of original forest remains, and 90% of endangered species depend on native trees for survival. Planting native kāuri, rimu, and kahikatea alongside predator traps is the only way to stop kiwi extinction.",
    nationalAnimal: { name: 'Kiwi',                emoji: '🥝' },
    nationalPlant:  { name: 'Silver Fern',         emoji: '🌿' },
  },

  'Nigeria': {
    blurb: "Nigeria has cleared over 90% of its original forest — the richest in West Africa — eliminating the rainfall-generating canopy that once fed its rivers. Without trees, extreme heat events in Lagos and Kano are becoming deadly. Planting trees in degraded farmland and cities cools temperatures, rebuilds soil, and begins habitat recovery.",
    nationalAnimal: { name: 'Eagle',               emoji: '🦅' },
    nationalPlant:  { name: 'Yellow Trumpet',      emoji: '🌼' },
  },

  'Pakistan': {
    blurb: "Pakistan's 2022 floods — made five times more likely by climate change — submerged one-third of the country, killing 1,700 people. Himalayan deforestation removed the forest sponge that once slowed rainfall runoff. Pakistan's Billion Tree programme shows how large-scale native planting can stabilise eroded hillsides and regulate catastrophic river flooding.",
    nationalAnimal: { name: 'Markhor',             emoji: '🐐' },
    nationalPlant:  { name: 'Jasmine',             emoji: '🌸' },
  },

  'Papua New Guinea': {
    blurb: "Papua New Guinea holds the world's third-largest tropical forest — home to birds of paradise, tree kangaroos, and over 5% of Earth's species on just 0.5% of land. Foreign logging concessions are expanding rapidly. Planting native trees in degraded community zones keeps this globally irreplaceable biodiversity intact for future generations.",
    nationalAnimal: { name: 'Bird of Paradise',    emoji: '🦜' },
    nationalPlant:  { name: 'Rhododendron',        emoji: '🌸' },
  },

  'Peru': {
    blurb: "Peru's Amazon holds 13% of Earth's remaining rainforest, while Andean glaciers supplying Lima's 10 million residents have lost 40% of their volume since 1970. Cloud-forest medicines are still being discovered as the forest burns. Planting native trees on degraded Andean slopes restores cloud-generating forest and slows glacial meltwater loss.",
    nationalAnimal: { name: 'Vicuña',              emoji: '🦙' },
    nationalPlant:  { name: 'Cantuta Flower',      emoji: '🌸' },
  },

  'Philippines': {
    blurb: "The Philippines retains just 7% of its original forest yet remains a global biodiversity hotspot with 52% endemic species. Typhoon Haiyan's deadly flooding was worsened by stripped watershed forests. Planting native trees in upland areas restores the water-retaining canopy that protects coastal communities and provides habitat for the Philippine eagle.",
    nationalAnimal: { name: 'Philippine Eagle',    emoji: '🦅' },
    nationalPlant:  { name: 'Sampaguita Jasmine',  emoji: '🌸' },
  },

  'Russia': {
    blurb: "Russia's Siberian taiga — the world's largest land-based carbon store — is burning at record rates. In 2021, wildfires consumed an area larger than Greece, releasing more CO₂ than Germany's annual emissions. Planting trees in burned Siberian zones accelerates boreal recovery and rebuilds Amur leopard and Siberian tiger habitat.",
    nationalAnimal: { name: 'Eurasian Brown Bear', emoji: '🐻' },
    nationalPlant:  { name: 'Chamomile',           emoji: '🌼' },
  },

  'Rwanda': {
    blurb: "Rwanda transformed from one of Africa's most deforested nations — 7% forest cover in 2000 — to a restoration model with over 30% cover today. Mountain gorillas, critically endangered and found only in Rwanda, Uganda, and DRC, are slowly recovering. Planting native trees in degraded hillside zones keeps this gorilla recovery momentum going.",
    nationalAnimal: { name: 'Mountain Gorilla',    emoji: '🦍' },
    nationalPlant:  { name: 'Indigofera',          emoji: '🌸' },
  },

  'South Africa': {
    blurb: "South Africa's Cape Floristic Region — one of Earth's six floral kingdoms — holds 9,600 plant species, 70% found nowhere else, crowded into a zone roughly the size of Portugal. Wildfires and invasive species are erasing them. Planting native fynbos and coastal trees restores buffer zones for rhinos, elephants, and irreplaceable plant life.",
    nationalAnimal: { name: 'Springbok',           emoji: '🦌' },
    nationalPlant:  { name: 'King Protea',         emoji: '🌸' },
  },

  'South Korea': {
    blurb: "South Korea lost nearly all its forests in the Korean War and by 1960 faced catastrophic landslides and flooding. A national reforestation programme restored 2 million hectares — one of history's greatest forest recoveries. Planting diverse native species now replaces aging monocultures with resilient broadleaf forest for the next generation.",
    nationalAnimal: { name: 'Siberian Tiger',      emoji: '🐅' },
    nationalPlant:  { name: 'Mugunghwa Hibiscus',  emoji: '🌺' },
  },

  'Spain': {
    blurb: "Spain has the highest wildfire risk in Europe — a direct result of rural abandonment leaving vast monoculture pine and eucalyptus plantations unmanaged. The Iberian lynx, once nearly extinct, depends on intact Mediterranean scrubland to survive. Planting fire-resistant native oak and cork trees breaks wildfire cycles and expands lynx territory.",
    nationalAnimal: { name: 'Iberian Lynx',        emoji: '🐈' },
    nationalPlant:  { name: 'Carnation',           emoji: '🌸' },
  },

  'Sri Lanka': {
    blurb: "Sri Lanka retains just 5% of its original lowland rainforest — one of Asia's most species-dense biomes — after centuries of clearing for tea and rubber. Sri Lankan leopards and over 800 endemic plant species survive in fragmented patches. Planting native rainforest species reconnects these islands of life before genetic isolation dooms them.",
    nationalAnimal: { name: 'Sri Lanka Junglefowl', emoji: '🐓' },
    nationalPlant:  { name: 'Blue Lotus',           emoji: '🪷' },
  },

  'Sudan': {
    blurb: "Sudan loses productive land to Saharan sand at 200,000 hectares per year — the world's fastest advancing desertification front. Scarce rainfall is dropping by 2mm annually. Planting drought-tolerant acacia and native sahel trees along the Great Green Wall corridor can halt advancing desert, lock soil, and restore grazing land.",
    nationalAnimal: { name: 'Secretary Bird',      emoji: '🐦' },
    nationalPlant:  { name: 'Acacia',              emoji: '🌿' },
  },

  'Tanzania': {
    blurb: "Kilimanjaro's glaciers have retreated 85% since 1912 — a visible symbol of Tanzania's accelerating climate crisis. Meanwhile forest clearing around the Serengeti shrinks the migratory corridors wildebeest and elephants have used for millennia. Planting native trees on Kilimanjaro's slopes and Serengeti borders restores both water supply and wildlife movement.",
    nationalAnimal: { name: 'Masai Giraffe',       emoji: '🦒' },
    nationalPlant:  { name: 'Clove Tree',          emoji: '🌿' },
  },

  'Thailand': {
    blurb: "Thailand lost over half its forests in just 50 years — removing the upstream sponge that once absorbed monsoon rain. Bangkok and northern cities now flood catastrophically each season. The critically endangered Indochinese tiger is down to just 130 individuals. Planting native trees in degraded highlands restores watershed protection and tiger habitat.",
    nationalAnimal: { name: 'Thai Elephant',       emoji: '🐘' },
    nationalPlant:  { name: 'Golden Shower Tree',  emoji: '🌼' },
  },

  'Turkey': {
    blurb: "Turkey sits at the intersection of three biogeographic zones, making it one of Europe and the Middle East's most biodiverse countries. Yet 2021 wildfires burned 200,000 hectares of native cedar and red pine in two weeks. Planting fire-adapted native species rehabilitates burned landscapes and rebuilds the hillside forests protecting Turkey's rivers.",
    nationalAnimal: { name: 'Grey Wolf',           emoji: '🐺' },
    nationalPlant:  { name: 'Tulip',               emoji: '🌷' },
  },

  'Uganda': {
    blurb: "Uganda holds half of the world's remaining mountain gorillas and extraordinary Albertine Rift biodiversity, but forest cover has halved since 1990 as charcoal demand grows with a rapidly expanding population. Chimpanzee corridors between national parks are critically fragmented. Planting trees on degraded farmland reconnects Uganda's parks before those wildlife links disappear.",
    nationalAnimal: { name: 'Grey Crowned Crane',  emoji: '🐦' },
    nationalPlant:  { name: 'Nile Lily',           emoji: '🌸' },
  },

  'Ukraine': {
    blurb: "Ukraine's Carpathian beech forests — UNESCO-listed as among Europe's last primeval woodlands — face illegal logging and conflict-driven habitat loss. Steppe grasslands that once stabilised Ukraine's legendary black soil are eroding. Planting trees on degraded steppe edges and burned forest zones restores European bison habitat and the watershed feeding Ukraine's rivers.",
    nationalAnimal: { name: 'White Stork',         emoji: '🐦' },
    nationalPlant:  { name: 'Sunflower',           emoji: '🌻' },
  },

  'United Kingdom': {
    blurb: "The UK has just 13% forest cover — one of Europe's lowest — with less than 2% being ancient woodland, an irreplaceable habitat that takes centuries to form. Red squirrels, dormice, and hundreds of lichen species vanish when ancient woodland is lost. Planting native broadleaf trees begins to replace what took centuries to build.",
    nationalAnimal: { name: 'Lion',                emoji: '🦁' },
    nationalPlant:  { name: 'Tudor Rose',          emoji: '🌹' },
  },

  'United States': {
    blurb: "The USA has lost one-third of its original forests, and Pacific Northwest old-growth — storing more carbon per acre than tropical rainforest — continues to be logged. Pacific salmon, dependent on river-shading forest, are crashing. Planting native trees restores salmon rivers, eastern songbird habitats, and the carbon sinks the country urgently needs.",
    nationalAnimal: { name: 'Bald Eagle',          emoji: '🦅' },
    nationalPlant:  { name: 'Rose',                emoji: '🌹' },
  },

  'Venezuela': {
    blurb: "Venezuela's tepui highlands — table-top mountains rising from Amazonian jungle — harbour thousands of endemic species found nowhere else on Earth. Economic collapse has accelerated illegal gold mining that devastates riverside forest and poisons waterways with mercury. Planting native trees in buffer zones around tepuis gives threatened species their last habitat defence.",
    nationalAnimal: { name: 'Troupial',            emoji: '🐦' },
    nationalPlant:  { name: 'May Orchid',          emoji: '🌺' },
  },

  'Vietnam': {
    blurb: "Vietnam lost half its forests between 1943 and 1990 — to war, Agent Orange, and agriculture. The critically endangered saola, discovered only in 1992, is now likely fewer than 100 individuals surviving in fragmented Annamite highland forest. Planting native trees in Annamite corridors and coastal mangroves protects the saola and community water security.",
    nationalAnimal: { name: 'Water Buffalo',       emoji: '🐃' },
    nationalPlant:  { name: 'Lotus',               emoji: '🪷' },
  },

  'Zimbabwe': {
    blurb: "Zimbabwe's miombo woodland — rich in raptors, wild dogs, and over 300 bird species — is cleared at scale for charcoal feeding Harare and Bulawayo. Worsening El Niño droughts are exposing stripped land to lethal heat. Planting native miombo trees alongside communities provides firewood, shade, and slowly rebuilds Africa's most important dry woodland.",
    nationalAnimal: { name: 'Zimbabwe Bird',       emoji: '🦅' },
    nationalPlant:  { name: 'Flame Lily',          emoji: '🌺' },
  },
}

// ── Default for unlisted countries ───────────────────────────────────────────
const DEFAULT_INFO: CountryInfo = {
  blurb: "Forests cover less than a third of Earth's land but host over two-thirds of all land species. Every tree you plant strengthens local biodiversity, absorbs CO₂, and helps regulate rainfall for communities that depend on healthy land.",
  nationalAnimal: { name: 'Local Wildlife',   emoji: '🐾' },
  nationalPlant:  { name: 'Native Flora',     emoji: '🌿' },
}

export function getCountryInfo(country: string): CountryInfo {
  return COUNTRY_DATA[country] ?? DEFAULT_INFO
}

/** Backward-compat shim for any code still calling getCountryBlurb */
export function getCountryBlurb(country: string): string {
  return getCountryInfo(country).blurb
}
