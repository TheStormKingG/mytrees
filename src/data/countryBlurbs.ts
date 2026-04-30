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

  // ── NEWLY ADDED ───────────────────────────────────────────────────────────

  'Andorra': {
    blurb: "Andorra's Pyrenean forests trap snow critical for ski-resort rivers, yet warming winters shorten snowpack each decade, stressing beech and fir. Wildfires are spreading into elevations once too cold to burn. Planting native silver fir and Scots pine strengthens elevation gradients and secures the snowmelt that feeds Andorra's entire water supply.",
    nationalAnimal: { name: 'Pyrenean Chamois',    emoji: '🐐' },
    nationalPlant:  { name: 'Tobacco Plant',       emoji: '🌿' },
  },

  'Antigua and Barbuda': {
    blurb: "Antigua has just 11% forest cover after centuries of sugarcane cleared every native hillside. Without tree roots, rainfall runs straight to sea, leaving cisterns empty between hurricanes. Planting native mahogany and white cedar stabilises eroding hillsides, recharges underground aquifers, and creates windbreaks before the next Category 5 storm arrives.",
    nationalAnimal: { name: 'Fallow Deer',         emoji: '🦌' },
    nationalPlant:  { name: 'Dagger Log',          emoji: '🌿' },
  },

  'Armenia': {
    blurb: "Armenia has lost over 85% of its original forest over three millennia of deforestation for fuel and farmland. Lake Sevan — the Caucasus' largest lake — is drying as watershed trees vanish. Planting native oak and hornbeam in degraded hillsides restores the water-cycling forest that the Armenian mouflon and leopard desperately need.",
    nationalAnimal: { name: 'Armenian Mouflon',    emoji: '🐏' },
    nationalPlant:  { name: 'Apricot',             emoji: '🌸' },
  },

  'Austria': {
    blurb: "Austria's Alps — source of fresh water for 14 million downstream Europeans — are warming three times faster than the global average. Permafrost thaw triggers rockslides onto mountain roads. Planting diverse native mountain maple, larch, and arolla pine slows soil erosion on destabilised slopes and restores habitat for the critically endangered Apollo butterfly.",
    nationalAnimal: { name: 'Barn Swallow',        emoji: '🐦' },
    nationalPlant:  { name: 'Edelweiss',           emoji: '🌼' },
  },

  'Azerbaijan': {
    blurb: "Azerbaijan's Hirkan forests — a biodiversity hotspot dating to before the Ice Age and home to the Persian leopard — are shrinking from logging and agricultural expansion. The Caspian Sea is receding rapidly, altering coastal ecosystems. Planting native Hirkan oak and iron tree restores this irreplaceable ancient woodland before its last corridors disappear.",
    nationalAnimal: { name: 'Karabakh Horse',      emoji: '🐎' },
    nationalPlant:  { name: 'Lotus Flower',        emoji: '🪷' },
  },

  'Bahamas': {
    blurb: "The Bahamas sits barely two metres above sea level — making every centimetre of sea-level rise an existential threat. Coral bleaching has destroyed the reef systems that break wave energy before storms. Planting native casuarina and mangroves along coastlines creates a living buffer and stabilises beaches against the Atlantic hurricanes intensifying each decade.",
    nationalAnimal: { name: 'Flamingo',            emoji: '🦩' },
    nationalPlant:  { name: 'Yellow Elder',        emoji: '🌼' },
  },

  'Bahrain': {
    blurb: "Bahrain's legendary Tree of Life — a 400-year-old prosopis standing alone in the desert — symbolises life in one of Earth's most water-stressed nations. Coastal mangroves protecting fishing communities have shrunk to a fraction of historical extent. Planting drought-tolerant native trees and restoring mangrove nurseries secures Bahrain's food and coastline security.",
    nationalAnimal: { name: 'Arabian Oryx',        emoji: '🦌' },
    nationalPlant:  { name: 'Date Palm',           emoji: '🌴' },
  },

  'Barbados': {
    blurb: "Barbados cleared virtually all its native forest for sugar by 1650 — one of the earliest total deforestations in history. Now, intensifying hurricanes and coral bleaching strip the island's coastal defences. Planting native bearded fig and mahogany trees on degraded inland hills restores the watershed that every Barbadian depends on for fresh water.",
    nationalAnimal: { name: 'Pelican',             emoji: '🐦' },
    nationalPlant:  { name: 'Bearded Fig',         emoji: '🌳' },
  },

  'Belarus': {
    blurb: "Belarus holds the Białowieża Primeval Forest — Europe's last lowland old-growth — yet logging of ancient trees continues under state orders, threatening European bison and wolves surviving nowhere else. Radioactive Chernobyl exclusion zones have paradoxically become wildlife refuges. Planting native oaks and limes extends buffer zones protecting this globally irreplaceable forest ecosystem.",
    nationalAnimal: { name: 'European Bison',      emoji: '🐃' },
    nationalPlant:  { name: 'Flax',               emoji: '🌸' },
  },

  'Belgium': {
    blurb: "Belgium's ancient Ardennes forest — refugium for wolves and black storks returning after centuries of absence — faces bark-beetle collapse driven by drought. The Sonian Forest around Brussels, listed as UNESCO heritage, lost 10% of its beeches in a single drought year. Planting native oak and hornbeam regenerates Europe's most densely populated country's vital green lungs.",
    nationalAnimal: { name: 'Black-headed Gull',   emoji: '🐦' },
    nationalPlant:  { name: 'Red Poppy',           emoji: '🌸' },
  },

  'Belize': {
    blurb: "Belize protects the largest intact forest block in Central America and the second-largest barrier reef in the world. Yet jaguar corridors are severed by citrus and sugarcane farms. Planting native cohune palm and ceiba trees in degraded agricultural margins reconnects jaguar territory and keeps the Mesoamerican Biological Corridor open for wildlife.",
    nationalAnimal: { name: 'Keel-billed Toucan',  emoji: '🐦' },
    nationalPlant:  { name: 'Black Orchid',        emoji: '🌺' },
  },

  'Benin': {
    blurb: "Benin's W-Arly-Pendjari transboundary park — West Africa's last lion stronghold — is surrounded by farmland expanding under pressure from population growth and crop failure. Forest cover has dropped to just 4%. Planting native shea and parkia trees in buffer zones provides food security for farmers and rebuilds the savannah corridors lions need.",
    nationalAnimal: { name: 'Leopard',             emoji: '🐆' },
    nationalPlant:  { name: 'Iroko Tree',          emoji: '🌳' },
  },

  'Bhutan': {
    blurb: "Bhutan is the world's only carbon-negative country — its forest law requires 60% forest cover perpetually. Yet warming glaciers threaten glacial lake outbursts that drown downstream valleys. Planting native blue pine and fir on degraded high-altitude slopes strengthens the forest buffer against glacial floods while protecting the endangered snow leopard and takin.",
    nationalAnimal: { name: 'Takin',               emoji: '🐂' },
    nationalPlant:  { name: 'Himalayan Cypress',   emoji: '🌲' },
  },

  'Bosnia and Herzegovina': {
    blurb: "Bosnia's Dinaric forests — some of Europe's last near-virgin temperate woodlands — harbour wolves, lynx, and rare brown bears. Post-war land mines prevent forest management while illegal logging compounds the damage. Planting native beech and fir in accessible degraded zones begins recovery and reduces soil erosion into the Neretva, Sava, and Una rivers.",
    nationalAnimal: { name: 'Brown Bear',          emoji: '🐻' },
    nationalPlant:  { name: 'Lily of the Valley',  emoji: '🌸' },
  },

  'Botswana': {
    blurb: "Botswana's Okavango Delta — the world's largest inland delta and a UNESCO World Heritage site — is fed entirely by distant Angolan highland forests now being cleared. Less water reaches the delta every decade. Planting native mopane and acacia trees in degraded Angolan headwaters sustains the elephant and lion paradise downstream Botswana cannot control.",
    nationalAnimal: { name: 'Plains Zebra',        emoji: '🦓' },
    nationalPlant:  { name: 'Mokolwane Palm',      emoji: '🌴' },
  },

  'Brunei': {
    blurb: "Brunei retains over 70% forest cover — remarkable in Southeast Asia — but logging concessions on its borders in Malaysian Borneo are eroding the Bornean pygmy elephant and orangutan corridors Brunei's reserves depend on. Planting native dipterocarp trees in degraded buffer zones keeps these transboundary wildlife corridors open and functioning.",
    nationalAnimal: { name: 'White-bellied Sea Eagle', emoji: '🦅' },
    nationalPlant:  { name: 'Simpor',             emoji: '🌸' },
  },

  'Burkina Faso': {
    blurb: "Burkina Faso is at the frontline of Saharan desertification — losing 360,000 hectares of productive land every year to advancing sand. Traditional Zaï tree-planting techniques have already rehabilitated 200,000 hectares. Planting native acacia, neem, and shea trees using Zaï pits captures scarce rainfall, rebuilds soil fertility, and feeds communities in one of Earth's most food-insecure regions.",
    nationalAnimal: { name: 'White Stallion',      emoji: '🐎' },
    nationalPlant:  { name: 'Red Sorghum',         emoji: '🌾' },
  },

  'Burundi': {
    blurb: "Burundi has one of Africa's highest deforestation rates — forest cover fell from 19% to 6% in three decades, stripping the mountain slopes above Lake Tanganyika. Naked hillsides collapse into the lake, destroying the world's second-deepest freshwater ecosystem. Planting native trees on eroding slopes restores soil, filters sediment, and protects livelihoods that depend on the lake.",
    nationalAnimal: { name: 'Hippopotamus',        emoji: '🦛' },
    nationalPlant:  { name: 'Cassava',             emoji: '🌿' },
  },

  'Cabo Verde': {
    blurb: "Cabo Verde's volcanic Atlantic islands were entirely barren of trees when Portuguese settlers arrived in the 15th century. Decades of reforestation with pine and acacia have stabilised soils and created micro-climates. Planting additional native tamarisk and dragon blood trees on bare highland slopes captures Atlantic moisture, builds aquifers, and makes islands habitable.",
    nationalAnimal: { name: 'Cape Verde Warbler',  emoji: '🐦' },
    nationalPlant:  { name: 'Purgueira',           emoji: '🌿' },
  },

  'Cambodia': {
    blurb: "Cambodia lost over half its forest in just 20 years — one of the fastest deforestation rates on Earth — eliminating wildlife corridors for the critically endangered Mekong river dolphins and Indochinese tigers. The Cardamom Mountains hold the last intact forest. Planting native trees in buffer zones around Cardamom protects both wildlife and two million people's water supply.",
    nationalAnimal: { name: 'Kouprey',             emoji: '🐂' },
    nationalPlant:  { name: 'Rumduol Flower',      emoji: '🌸' },
  },

  'Central African Republic': {
    blurb: "The Central African Republic guards the transition between Congo Basin rainforest and Sudano-Guinean savannah — critical habitat for western lowland gorillas, forest elephants, and giant pangolins. Conflict has prevented conservation enforcement. Planting native trees in community protection zones gives local communities economic alternatives to poaching and maintains the Congo Basin's vital carbon barrier.",
    nationalAnimal: { name: 'Forest Elephant',     emoji: '🐘' },
    nationalPlant:  { name: 'Sango Palm',          emoji: '🌴' },
  },

  'Comoros': {
    blurb: "The Comoros Islands have lost over 80% of their native forest to charcoal and subsistence farming. The critically endangered Livingstone's fruit bat — the world's largest bat — has lost most of its roosting trees. Planting native ylang-ylang and breadfruit trees restores bat habitat, provides community income from essential-oil exports, and stabilises volcanic soils.",
    nationalAnimal: { name: "Livingstone's Fruit Bat", emoji: '🦇' },
    nationalPlant:  { name: 'Ylang-Ylang',         emoji: '🌸' },
  },

  'Croatia': {
    blurb: "Croatia's Dalmatian coast — once covered in holm oak and Aleppo pine — has been stripped bare by millennia of charcoal burning, leaving karst limestone that bakes in summer drought. Wildfires now consume thousands of hectares of remaining pine forest annually. Planting native holm oak and maquis shrubs regenerates fire-resistant coastal forest sheltering rare endemic reptiles.",
    nationalAnimal: { name: 'Pine Marten',         emoji: '🦦' },
    nationalPlant:  { name: 'Iris croatica',       emoji: '🌸' },
  },

  'Cuba': {
    blurb: "Cuba's mogote limestone forests — towering over the Viñales Valley and packed with over 6,000 plant species — face intensifying hurricane seasons and drought cycles. The world's smallest bird, the bee hummingbird, depends entirely on flowering forest trees. Planting native mahogany, ceiba, and royal palm regenerates hurricane windbreaks and rebuilds habitat for endemic Cuban wildlife.",
    nationalAnimal: { name: 'Cuban Trogon',        emoji: '🐦' },
    nationalPlant:  { name: 'White Mariposa',      emoji: '🌸' },
  },

  'Cyprus': {
    blurb: "Cyprus faces the Mediterranean's worst water crisis — receiving 30% less rainfall per decade — while Troodos Mountain pine forests, the island's only significant watershed, burn in intensifying summer wildfires. The endemic Cyprus mouflon survives in just these highland forests. Planting native cedar and golden oak restores firebreaks and the critical water-gathering forest canopy.",
    nationalAnimal: { name: 'Cyprus Mouflon',      emoji: '🐏' },
    nationalPlant:  { name: 'Cyclamen',            emoji: '🌸' },
  },

  'Czech Republic': {
    blurb: "The Czech Republic suffered the worst forest collapse in its recorded history — 340,000 hectares of spruce killed by bark beetles unleashed by warming winters between 2017 and 2022. Monoculture spruce forests collapsed in a chain reaction. Planting mixed native oak, beech, and lime trees replaces catastrophically fragile monocultures with forests that can survive warming.",
    nationalAnimal: { name: 'Double-tailed Lion',  emoji: '🦁' },
    nationalPlant:  { name: 'Small-leaved Linden', emoji: '🌿' },
  },

  'Denmark': {
    blurb: "Denmark has just 14% forest cover — one of Europe's lowest — after Viking-era and medieval clearance left nearly bare agricultural plains. Rising sea levels now threaten low-lying farmland without coastal tree buffers. Planting native pedunculate oak, ash, and alder woodlands rebuilds Denmark's lost forest landscape and protects coasts from the North Sea storm surges intensifying each decade.",
    nationalAnimal: { name: 'Mute Swan',           emoji: '🦢' },
    nationalPlant:  { name: 'Red Clover',          emoji: '🌸' },
  },

  'Djibouti': {
    blurb: "Djibouti is one of the world's hottest countries — with temperatures reaching 45°C — and has less than 0.3% forest cover. The few Day Forest and juniper woodlands remaining are under intense pressure from charcoal cutting. Planting drought-resistant native juniper and acacia trees provides shade, halts soil erosion in this seismic volcanic landscape, and rebuilds habitat for the rare Djibouti francolin.",
    nationalAnimal: { name: 'Djibouti Francolin',  emoji: '🐦' },
    nationalPlant:  { name: 'Acacia',              emoji: '🌿' },
  },

  'Dominica': {
    blurb: "Dominica — the 'Nature Isle' — retains 65% of its original rainforest and is the last stronghold for the critically endangered Sisserou parrot found nowhere else. Hurricane Maria destroyed 90% of tree canopy in 2017 in a single night. Planting native breadnut and mountain immortelle restores parrot habitat and builds resilience to the Caribbean's worsening hurricane seasons.",
    nationalAnimal: { name: 'Sisserou Parrot',     emoji: '🦜' },
    nationalPlant:  { name: 'Bois Caribe',         emoji: '🌿' },
  },

  'Dominican Republic': {
    blurb: "The Dominican Republic's sharp ecological border with Haiti — visible from space — shows what full deforestation looks like. Haiti has 1% tree cover; the DR has 41%. Both face intensifying hurricanes. Planting native pines and mahogany in buffer zones along the border prevents landslides on Haiti's side and protects the watersheds that both countries share.",
    nationalAnimal: { name: 'Palm Chat',           emoji: '🐦' },
    nationalPlant:  { name: 'Bayahibe Rose',       emoji: '🌸' },
  },

  'El Salvador': {
    blurb: "El Salvador is the most deforested country in Central America — under 2% of its original forest remains. Without tree roots, hillsides collapse in each rainy season, burying communities alive. Planting native ceiba and oak trees on degraded hillsides anchors volcanic soil, rebuilds biodiversity for the endangered golden-cheeked warbler, and begins reversing decades of catastrophic land clearing.",
    nationalAnimal: { name: 'Turquoise-browed Motmot', emoji: '🐦' },
    nationalPlant:  { name: 'Izote Cactus',        emoji: '🌿' },
  },

  'Equatorial Guinea': {
    blurb: "Equatorial Guinea's Bioko Island holds unique endemic primates — drill monkeys and black colobus — found nowhere else, but subsistence hunting and forest clearing are eliminating their habitat. The mainland's Congo Basin forest is threatened by oil-boom road development. Planting native trees in community forest zones gives endemic primates a genuine path to continued survival.",
    nationalAnimal: { name: 'Drill Monkey',        emoji: '🐒' },
    nationalPlant:  { name: 'Ceiba Tree',          emoji: '🌲' },
  },

  'Eritrea': {
    blurb: "Eritrea's Anseba and Gash Barka highlands — once forested with juniper, olive, and giant fig — were stripped during decades of conflict. Without tree cover, monsoon rains trigger flash floods that kill people and strip topsoil. Planting native juniper and euphorbia trees on terraced highland slopes arrests erosion, restores springs, and rebuilds food security after generations of war.",
    nationalAnimal: { name: 'Arabian Camel',       emoji: '🐪' },
    nationalPlant:  { name: 'Olive Tree',          emoji: '🫒' },
  },

  'Estonia': {
    blurb: "Estonia's boreal bogs and ancient mixed forests — harbouring lynx, flying squirrels, and nesting white-tailed eagles — are among Northern Europe's last undisturbed ecosystems. Peat harvesting drains carbon-rich bogs that took thousands of years to form. Planting native black alder and downy birch in drained peatlands accelerates rewetting, locks carbon, and restores vital wetland habitat.",
    nationalAnimal: { name: 'Barn Swallow',        emoji: '🐦' },
    nationalPlant:  { name: 'Cornflower',          emoji: '💐' },
  },

  'Eswatini': {
    blurb: "Eswatini's Highveld grasslands and Lowveld acacia savannah — home to the last wild black rhinos managed entirely within a single country's borders — face invasive eucalyptus plantations replacing native vegetation. Droughts intensified by climate change are drying rivers. Planting native sycamore fig and marula trees restores water along dry river beds and rebuilds rhino habitat corridors.",
    nationalAnimal: { name: 'Purple-crested Turaco', emoji: '🐦' },
    nationalPlant:  { name: 'Swaziland Red Aloe',  emoji: '🌿' },
  },

  'Fiji': {
    blurb: "Fiji has lost over 70% of its original forest since Europeans introduced commercial logging. Coral reefs — the nurseries for Fiji's fish — are bleaching as land-cleared soils smother them with sediment. Planting native dakua (Fijian kauri) and vesi hardwoods on degraded hillsides halts erosion into reefs, restores freshwater springs, and revives Fiji's endemic crested iguana habitat.",
    nationalAnimal: { name: 'Collared Lory',       emoji: '🦜' },
    nationalPlant:  { name: 'Tagimoucia Flower',   emoji: '🌺' },
  },

  'Gambia': {
    blurb: "The Gambia — Africa's smallest mainland country — has halved its forest cover in 50 years, accelerating Saharan sand advance along its only river. Mangroves protecting fishing communities and the West African manatee are being cleared for rice farms. Planting native mangroves and savannah trees begins restoring the riparian forest that gives the Gambia River its life.",
    nationalAnimal: { name: 'West African Manatee', emoji: '🐬' },
    nationalPlant:  { name: 'African Oil Palm',    emoji: '🌴' },
  },

  'Georgia': {
    blurb: "Georgia's Colchic forests — one of Europe's last subtropical rainforests, older than the Alps and refugium of species that survived the Ice Age — are threatened by illegal logging and land conversion. The Caucasian leopard and brown bear depend on these corridors. Planting native Caucasian wingnut and chestnut trees reconnects fragmented reserves before genetic isolation imperils remaining wildlife.",
    nationalAnimal: { name: 'Georgian Stag',       emoji: '🦌' },
    nationalPlant:  { name: 'Grape Vine',          emoji: '🍇' },
  },

  'Greece': {
    blurb: "Greece lost over 100,000 hectares of native pine and oak in a single 2021 summer as record heatwaves drove catastrophic wildfires through Attica and Evia. Soil left naked by fire washes into the sea, destroying coastal fisheries. Planting native holm oak, carob, and kermes oak — fire-adapted species — begins restoring landscapes that will withstand future Mediterranean heatwaves.",
    nationalAnimal: { name: 'Dolphin',             emoji: '🐬' },
    nationalPlant:  { name: 'Acanthus',            emoji: '🌿' },
  },

  'Grenada': {
    blurb: "Grenada's Grand Etang cloud forest — the only freshwater lake in the Windward Islands and home to the Grenada dove — is shrinking from charcoal cutting and hurricane damage. Coral bleaching has killed 80% of Grenada's reefs in a decade. Planting native gommier and bois immortel trees in the buffer zones around Grand Etang protects the dove's last remaining habitat.",
    nationalAnimal: { name: 'Grenada Dove',        emoji: '🕊️' },
    nationalPlant:  { name: 'Bougainvillea',       emoji: '🌸' },
  },

  'Guinea': {
    blurb: "Guinea's Fouta Djallon highlands — the 'Water Tower of West Africa' supplying the Niger, Gambia, and Senegal rivers for 40 million downstream people — are losing forest at alarming rates. Without tree roots, seasonal rains trigger deadly landslides. Planting native trees on degraded Fouta Djallon hillsides protects the freshwater supply that West Africa's entire Sahel depends on.",
    nationalAnimal: { name: 'African Elephant',    emoji: '🐘' },
    nationalPlant:  { name: 'Rose of Sharon',      emoji: '🌸' },
  },

  'Guinea-Bissau': {
    blurb: "Guinea-Bissau's Bijagós Archipelago — a UNESCO Biosphere Reserve hosting the world's largest nesting population of saltwater hippos and critically endangered sea turtles — faces mangrove clearing for shrimp farms. Planting mangrove propagules in cleared zones restores the nurseries for both the hippos and the traditional fishing that feeds Guinea-Bissau's coastal communities.",
    nationalAnimal: { name: 'Hippopotamus',        emoji: '🦛' },
    nationalPlant:  { name: 'Kapok Tree',          emoji: '🌲' },
  },

  'Guyana': {
    blurb: "Guyana shelters 80% of its pristine Amazon rainforest — one of the world's largest intact tropical wildernesses. Gold mining and logging now threaten Rupununi wetlands and harpy eagle habitat. Planting native Greenheart and Wamara restores degraded mining zones, protects ancient waterways, and keeps Guyana's carbon wealth intact for future generations.",
    nationalAnimal: { name: 'Jaguar',              emoji: '🐆' },
    nationalPlant:  { name: 'Victoria Amazonica',  emoji: '🪷' },
  },

  'Haiti': {
    blurb: "Haiti has just 1% forest cover — the result of centuries of charcoal dependency — leaving bare mountains that collapse in every hurricane and rainy season. The 2010 earthquake killed 230,000 partly because hillsides had no root systems to resist liquefaction. Planting native trees is Haiti's most urgent infrastructure project: one tree at a time is how Haiti rebuilds.",
    nationalAnimal: { name: 'Hispaniolan Trogon',  emoji: '🐦' },
    nationalPlant:  { name: 'Roystonea Palm',      emoji: '🌴' },
  },

  'Honduras': {
    blurb: "Honduras has the second-highest deforestation rate in Central America. Pine beetle outbreaks — intensified by drought — have killed over a million hectares of native pine in a decade. Watershed deforestation leaves Tegucigalpa water-insecure. Planting diverse native trees in degraded pine zones breaks beetle monoculture cycles and protects the water catchments that Hondurans depend on.",
    nationalAnimal: { name: 'White-tailed Deer',   emoji: '🦌' },
    nationalPlant:  { name: 'Orchid',              emoji: '🌺' },
  },

  'Hungary': {
    blurb: "Hungary's Great Plain — once steppes maintained by European bison and wild horses — is drying as climate-driven drought extends each year. The country's remaining floodplain forests along the Tisza and Danube provide the only cool corridors for wildlife in a landscape now 70% farmland. Planting native pedunculate oak, poplar, and willow along river corridors restores these vital green arteries.",
    nationalAnimal: { name: 'Turul (Falcon)',       emoji: '🦅' },
    nationalPlant:  { name: 'Tulip',               emoji: '🌷' },
  },

  'Iceland': {
    blurb: "Iceland was 30% forested when Norse settlers arrived in 874 AD; they cleared it all within two centuries for fuel and grazing. Without trees, volcanic soils erode at some of the world's fastest rates. Planting native birch and willows — Iceland's only native tree species — is restoring the mossy, layered ecosystem that protects Iceland's famous freshwater springs.",
    nationalAnimal: { name: 'Gyrfalcon',           emoji: '🦅' },
    nationalPlant:  { name: 'Mountain Avens',      emoji: '🌼' },
  },

  'Iraq': {
    blurb: "Iraq's Mesopotamian Marshes — the Biblical cradle of civilisation and home to rare smooth-coated otters and Basra reed warblers — were 90% drained by Saddam Hussein. Partial restoration is underway but upstream dams in Turkey are reducing flows. Planting native poplar and tamarisk along re-flooded channels restores the marsh ecosystem that sustained human civilisation for 7,000 years.",
    nationalAnimal: { name: 'Chukar Partridge',    emoji: '🐦' },
    nationalPlant:  { name: 'Date Palm',           emoji: '🌴' },
  },

  'Ireland': {
    blurb: "Ireland has the lowest tree cover in Europe — just 11% — after centuries of English plantation-era deforestation stripped the island's ancient oak and hazel forests. Native red squirrels and pine martens are clinging to survival in fragmented patches. Planting native sessile oak, holly, and hazel reconnects Ireland's broken wildlife corridors and begins restoring 8,000 years of lost forest.",
    nationalAnimal: { name: 'Red Deer',            emoji: '🦌' },
    nationalPlant:  { name: 'Shamrock',            emoji: '🍀' },
  },

  'Israel': {
    blurb: "Israel pioneered modern reforestation with 240 million trees planted since 1900. But early pine plantations blocked native oak woodland regeneration, and climate change now threatens the planted forests with fire. Planting native Palestine oak, carob, and Atlantic pistachio — replacing monoculture pine — creates fire-resistant diverse woodland and restores habitat for the Persian fallow deer.",
    nationalAnimal: { name: 'Persian Fallow Deer', emoji: '🦌' },
    nationalPlant:  { name: 'Cyclamen',            emoji: '🌸' },
  },

  'Italy': {
    blurb: "Italy's Mediterranean maquis and Apennine forests are being devastated by drought, disease, and record summer wildfires burning hotter than ever recorded. Po Valley dust storms — unknown a decade ago — signal advancing desertification in Europe's most productive farmland. Planting native holm oak, stone pine, and manna ash restores fire-resistant forests and protects the Alpine water towers Italy depends on.",
    nationalAnimal: { name: 'Italian Wolf',        emoji: '🐺' },
    nationalPlant:  { name: 'Strawberry Tree',     emoji: '🌿' },
  },

  'Jamaica': {
    blurb: "Jamaica has lost 70% of its original rainforest, leaving the Blue Mountains — catchment for Kingston's water supply — exposed to soil erosion and drought. The critically endangered Jamaican iguana clings to a single limestone forest patch. Planting native mahoe and blue mahoe trees in degraded Blue Mountain zones restores the water supply and gives the iguana's last forest a fighting chance.",
    nationalAnimal: { name: 'Red-billed Streamertail', emoji: '🐦' },
    nationalPlant:  { name: 'Lignum Vitae',        emoji: '🌸' },
  },

  'Jordan': {
    blurb: "Jordan is among the world's five most water-scarce nations — receiving under 100mm of rain annually — yet its ancient oak and pistachio forests in Ajloun once produced enough moisture to supply springs. Those forests have shrunk to fragments. Planting native Tabor oak and kermes oak in degraded highland zones rebuilds moisture capture and protects Jordan's last wild leopard population.",
    nationalAnimal: { name: 'Arabian Oryx',        emoji: '🦌' },
    nationalPlant:  { name: 'Black Iris',          emoji: '🌸' },
  },

  'Kazakhstan': {
    blurb: "Kazakhstan lost the Aral Sea — once the world's fourth-largest lake — to Soviet irrigation schemes that stripped riverside forest. Toxic dust storms now sweep across 60,000 km² of exposed seabed. Planting native saxaul and tamarisk trees on former seabed stabilises toxic dust, while riparian forest planting along the Syr Darya restores Central Asia's most degraded watershed.",
    nationalAnimal: { name: 'Snow Leopard',        emoji: '🐆' },
    nationalPlant:  { name: 'Tulip',               emoji: '🌷' },
  },

  'Kiribati': {
    blurb: "Kiribati will be the first nation entirely submerged by rising seas — its highest point is just 3 metres above ocean level. The government has already purchased land in Fiji as a backup homeland. Planting native mangrove and native ren trees along atoll coasts buys time by absorbing wave energy, building soil, and protecting the last freshwater lenses beneath the islands.",
    nationalAnimal: { name: 'Frigatebird',         emoji: '🐦' },
    nationalPlant:  { name: 'Babai Plant',         emoji: '🌿' },
  },

  'Kuwait': {
    blurb: "Kuwait regularly records Earth's highest air temperatures — reaching 53.5°C in 2022. Only 0.4% of Kuwait is forested, and without shade trees, urban heat becomes a public health emergency. Planting native and adapted desert trees in urban Kuwait provides critical shade that reduces heat mortality, lowers air conditioning energy demand, and begins making city life survivable in a warming Gulf.",
    nationalAnimal: { name: 'Camel',               emoji: '🐪' },
    nationalPlant:  { name: 'Arfaj',              emoji: '🌿' },
  },

  'Laos': {
    blurb: "Laos lost half its forest in 30 years to logging concessions, dams, and rubber plantations. The Mekong River — feeding 60 million people — is drying as highland forests that once held monsoon water disappear. Planting native teak, yang, and dipterocarp trees in degraded hillsides restores the watershed forest that regulates Mekong flows for Laos and all downstream nations.",
    nationalAnimal: { name: 'Elephants',           emoji: '🐘' },
    nationalPlant:  { name: 'Dok Champa',          emoji: '🌸' },
  },

  'Lebanon': {
    blurb: "Lebanon's iconic Cedars of God — the remnant of forests that once blanketed all of Mount Lebanon — number just 375 ancient trees. Economic collapse and wildfires are threatening even these survivors. Planting native Lebanese cedar and Cilician fir at lower elevations than the originals allows the forest to migrate upslope as climate warms, securing its survival this century.",
    nationalAnimal: { name: 'Striped Hyena',       emoji: '🐾' },
    nationalPlant:  { name: 'Cedar of Lebanon',    emoji: '🌲' },
  },

  'Lesotho': {
    blurb: "Lesotho — the 'Kingdom in the Sky' — is entirely above 1,400 metres and supplies most of South Africa's water through the Lesotho Highlands Water Project. But overgrazing has stripped highland watersheds of their sponge-like vegetation. Planting native Afromontane trees and proteas on degraded slopes restores water retention that sustains both Lesotho and the downstream South African cities.",
    nationalAnimal: { name: 'Black-backed Jackal', emoji: '🐕' },
    nationalPlant:  { name: 'Spiral Aloe',         emoji: '🌿' },
  },

  'Liberia': {
    blurb: "Liberia holds over 40% of the Upper Guinea Forest — one of the world's most threatened hotspots and last stronghold of western chimpanzees, pygmy hippos, and forest elephants. Logging concessions cover 60% of the country. Planting native trees in degraded concession areas begins recovery of a globally irreplaceable forest that no other West African country can restore.",
    nationalAnimal: { name: 'Pygmy Hippopotamus',  emoji: '🦛' },
    nationalPlant:  { name: 'Pepper Tree',         emoji: '🌿' },
  },

  'Libya': {
    blurb: "Libya is 90% desert — one of the least forested countries on Earth — yet ancient olive and cypress forests in the Jebel Akhdar highlands are the only moisture-capturing vegetation protecting eastern Libya from complete desertification. Planting native Aleppo pine and carob in these highland forests rebuilds the green canopy that makes the Jebel Akhdar liveable.",
    nationalAnimal: { name: 'Barbary Lion',        emoji: '🦁' },
    nationalPlant:  { name: 'Olive Tree',          emoji: '🫒' },
  },

  'Liechtenstein': {
    blurb: "Liechtenstein's Rhine floodplain — historically one of Central Europe's most biodiverse river corridors — was channelised for agriculture, eliminating native black poplar and white willow forest. Beaver are returning after 150-year absence. Planting native riparian trees alongside the Rhine restores floodplain forest, provides natural flood buffering, and rebuilds the wetland corridors that returning beavers and kingfishers need.",
    nationalAnimal: { name: 'Liechtenstein Eagle', emoji: '🦅' },
    nationalPlant:  { name: 'Edelweiss',           emoji: '🌼' },
  },

  'Lithuania': {
    blurb: "Lithuania's ancient Aukštaitija forests — oak and hornbeam groves persisting since the last glaciation — are under pressure from bark-beetle collapse driven by warming summers. Wet bogs and fens that once covered a quarter of Lithuania have been drained. Planting native oak and black alder rebuilds diverse forest structure and begins re-wetting the peat bogs whose drainage releases enormous carbon.",
    nationalAnimal: { name: 'White Stork',         emoji: '🐦' },
    nationalPlant:  { name: 'Rue',                 emoji: '🌿' },
  },

  'Luxembourg': {
    blurb: "Luxembourg's Our and Alzette river valleys shelter rare freshwater pearl mussels and the last breeding Eurasian otters in Benelux. But riverside trees that shade the cold-water streams these species need are being removed for agriculture. Planting native alder, willow, and river oak along Luxembourg's waterways lowers water temperatures and keeps these critically endangered cold-water species alive.",
    nationalAnimal: { name: 'Red Lion',            emoji: '🦁' },
    nationalPlant:  { name: 'Rose',                emoji: '🌹' },
  },

  'Malawi': {
    blurb: "Malawi has one of Africa's highest deforestation rates — losing 2.8% of forest annually to charcoal and tobacco farming. Lake Malawi, harbouring more fish species than any lake on Earth, is choked with topsoil eroding from stripped catchment hills. Planting native msuku and wild loquat trees on degraded hillsides halts the sediment destroying the world's most biologically diverse lake.",
    nationalAnimal: { name: 'African Fish Eagle',  emoji: '🦅' },
    nationalPlant:  { name: 'Mulanje Cedar',       emoji: '🌲' },
  },

  'Maldives': {
    blurb: "The Maldives — 1,200 islands averaging 1.5 metres above sea level — will be uninhabitable before 2100 if sea levels rise as projected. Coastal mangroves that once buffered storm surges have been cleared for resorts. Planting native mangroves and beach-stabilising trees on every inhabited island buys decades of protection and slows the erosion threatening Maldivians' last homeland.",
    nationalAnimal: { name: 'Yellowfin Tuna',      emoji: '🐟' },
    nationalPlant:  { name: 'Coconut Palm',        emoji: '🌴' },
  },

  'Mali': {
    blurb: "Mali's Sahel is advancing southward at a devastating pace — Timbuktu is surrounded by desert that was farmland a generation ago. Shea and acacia trees that once anchored Sahelian soil have been cut for charcoal. The Farmer-Managed Natural Regeneration (FMNR) method, pioneered here, has already restored 5 million hectares. Planting native trees multiplies this proven recovery.",
    nationalAnimal: { name: 'Hippopotamus',        emoji: '🦛' },
    nationalPlant:  { name: 'Shea Tree',           emoji: '🌿' },
  },

  'Malta': {
    blurb: "Malta receives just 500mm of rain annually and has virtually no natural freshwater — all drinking water comes from energy-intensive desalination. The Maltese endemic plants, found nowhere else, survive in just a few rocky hillside patches. Planting native carob, olive, and wild fig trees on degraded hillsides captures scarce rainfall, rebuilds soil, and creates microhabitats for Malta's endemic species.",
    nationalAnimal: { name: 'Pharaoh Hound',       emoji: '🐕' },
    nationalPlant:  { name: 'Maltese Rock Centaury', emoji: '🌸' },
  },

  'Marshall Islands': {
    blurb: "The Marshall Islands average just 2 metres above sea level — making every king tide a potential catastrophe. Breadfruit trees once provided climate stability, food, and storm shelter, but storm surges have killed them with saltwater. Planting salt-tolerant native mangrove and Pemphis acidula on eroding atolls is the Marshall Islands' best strategy for buying time against irreversible sea-level rise.",
    nationalAnimal: { name: 'Manta Ray',           emoji: '🐟' },
    nationalPlant:  { name: 'Iu (Pandanus)',       emoji: '🌿' },
  },

  'Mauritania': {
    blurb: "Mauritania is 75% desert and losing an estimated 12,000 km² of usable land to desertification annually. The ancient forests of Assaba and Guidimaka in the south are the last line before bare Sahara dominates the entire country. Planting native acacia, neem, and gum arabic trees along the Great Green Wall corridor offers Mauritania its only viable path to food security.",
    nationalAnimal: { name: 'Mohor Gazelle',       emoji: '🦌' },
    nationalPlant:  { name: 'Date Palm',           emoji: '🌴' },
  },

  'Mauritius': {
    blurb: "Mauritius has lost over 98% of its native ebony and tambalacoque forests — the tree that could only germinate after passing through a dodo's digestive system. With the dodo extinct, the forest is in genetic stasis. Planting native tambalacoque, by hand-scarifying seeds in place of the dodo, is literally keeping an extinct ecosystem alive against impossible odds.",
    nationalAnimal: { name: 'Dodo (historical)',   emoji: '🐦' },
    nationalPlant:  { name: 'Trochetia Boutoniana', emoji: '🌺' },
  },

  'Micronesia': {
    blurb: "Micronesia's islands face rising seas and intensifying typhoons while their mangrove buffers are cleared for development. The Yap mangrove ecosystems, nursery for the Micronesian manta ray, are declining. Planting native mangrove and pemphis trees on exposed coastlines restores typhoon buffers, revives fish nurseries, and gives the communities on these low-lying islands a natural storm defence system.",
    nationalAnimal: { name: 'Manta Ray',           emoji: '🐟' },
    nationalPlant:  { name: 'Ylang-Ylang',         emoji: '🌸' },
  },

  'Moldova': {
    blurb: "Moldova has Europe's lowest forest cover at just 11%, leaving its rolling plains exposed to devastating summer droughts and flash floods that destroy crops each season. The Prut and Dniester riverbanks, once lined with poplar and willow forest, are eroding. Planting native oak and floodplain trees along Moldova's rivers restores the sponge that protects farmland from climate extremes.",
    nationalAnimal: { name: 'Aurochs',             emoji: '🐂' },
    nationalPlant:  { name: 'Grape Vine',          emoji: '🍇' },
  },

  'Monaco': {
    blurb: "Monaco's urban microclimate traps heat up to 8°C hotter than the surrounding sea — one of Europe's most extreme urban heat islands. Every tree planted in Monaco's parks and green corridors measurably reduces summer heat stress for residents. Planting native Mediterranean oak and holm oak in Monaco's public spaces pioneers climate-adaptive urban forestry for the world's most densely populated territory.",
    nationalAnimal: { name: 'Hedgehog',            emoji: '🦔' },
    nationalPlant:  { name: 'Carnation',           emoji: '🌸' },
  },

  'Montenegro': {
    blurb: "Montenegro's Tara Canyon — Europe's deepest gorge, draped in primeval black pine forest and listed as a UNESCO World Heritage site — faces illegal logging and climate-driven pine decline. The Tara River below is one of Europe's last class-five wild rivers. Planting native Bosnian pine and beech on cleared slopes arrests erosion into Europe's last pristine blue-flag river.",
    nationalAnimal: { name: 'Golden Eagle',        emoji: '🦅' },
    nationalPlant:  { name: 'Pomegranate',         emoji: '🌸' },
  },

  'Namibia': {
    blurb: "Namibia is one of Earth's driest countries but the Namibian bushveld — home to desert-adapted lions, elephants, and the Hartmann's mountain zebra — is being encroached by invasive thorn bush that chokes waterholes. Planting native trees in cleared buffer zones around waterholes restores biodiversity, supports communal conservancies, and keeps Namibia's wildlife tourism economy intact for future generations.",
    nationalAnimal: { name: "Hartmann's Mountain Zebra", emoji: '🦓' },
    nationalPlant:  { name: 'Welwitschia',         emoji: '🌿' },
  },

  'Nauru': {
    blurb: "Nauru is the world's smallest republic and was strip-mined of 80% of its land for phosphate — leaving a barren rocky plateau surrounded by a thin coastal strip. Now sea-level rise threatens the coast. Planting native tamanu and mangroves around Nauru's perimeter stabilises the coastline, reduces island temperatures, and begins ecological restoration of Earth's most comprehensively mined nation.",
    nationalAnimal: { name: 'Black Noddy',         emoji: '🐦' },
    nationalPlant:  { name: 'Tomano',              emoji: '🌿' },
  },

  'Netherlands': {
    blurb: "One-third of the Netherlands sits below sea level — and climate models show increasing North Sea storm risk. Rhine and Meuse floodplains were drained for agriculture, removing natural flood buffers. Planting native riparian forest along re-naturalised river floodplains reduces flood peaks, stores carbon in waterlogged soils, and rebuilds habitat for endangered European black poplar and white-tailed eagles.",
    nationalAnimal: { name: 'Lion',                emoji: '🦁' },
    nationalPlant:  { name: 'Tulip',               emoji: '🌷' },
  },

  'Nicaragua': {
    blurb: "Nicaragua lost over half its forest in 40 years to cattle ranching and agriculture — one of Central America's worst deforestation records. The Pacific slope's cloud forests, shelter for jaguars and resplendent quetzals, are especially vulnerable to drought cycles. Planting native cloud-forest trees in degraded Pacific hillsides restores moisture capture and wildlife habitat before the last corridors disappear.",
    nationalAnimal: { name: 'White-tailed Deer',   emoji: '🦌' },
    nationalPlant:  { name: 'Sacuanjoche',         emoji: '🌸' },
  },

  'Niger': {
    blurb: "Niger contains the largest population living in extreme desertification conditions in the world. Yet Niger pioneered the FMNR movement — Farmer-Managed Natural Regeneration — which regenerated 5 million hectares by simply allowing native tree stumps to regrow. Planting and protecting native acacia, gao, and ziziphus trees in Niger's depleted farmland is the model the entire Sahel is following.",
    nationalAnimal: { name: 'Addax',               emoji: '🦌' },
    nationalPlant:  { name: 'Acacia',              emoji: '🌿' },
  },

  'North Korea': {
    blurb: "North Korea has lost over 40% of its forest cover since the 1990s, primarily to famine-driven clearing for subsistence farming. Without forest watersheds, flooding and landslides kill hundreds annually. International satellite imagery shows the sharp contrast with South Korea's reforested hillsides. Planting trees on North Korea's bare slopes would prevent floods, restore soils, and help feed a food-insecure population.",
    nationalAnimal: { name: 'Chollima (mythical horse)', emoji: '🐎' },
    nationalPlant:  { name: 'Magnolia',            emoji: '🌸' },
  },

  'North Macedonia': {
    blurb: "North Macedonia's Mavrovo National Park — Balkan lynx's last stronghold with fewer than 50 individuals remaining — is threatened by hydropower dam construction that would flood core lynx territory. Deforestation has accelerated drought in the Vardar basin. Planting native beech and silver fir in cleared Mavrovo margins extends lynx habitat and slows the extinction of the rarest cat in Europe.",
    nationalAnimal: { name: 'Balkan Lynx',         emoji: '🐈' },
    nationalPlant:  { name: 'Poppy',               emoji: '🌸' },
  },

  'Norway': {
    blurb: "Norway's old-growth boreal forest — habitat for threatened capercaillie, wolverines, and rare woodland lichens — is being clear-cut for bioenergy production that Norway markets as 'renewable'. These ancient forests store more carbon than plantations ever will. Planting diverse native Norway spruce, Scots pine, and birch after clear-cutting restores structural complexity and keeps Norway's forest carbon balance intact.",
    nationalAnimal: { name: 'Lion',                emoji: '🦁' },
    nationalPlant:  { name: 'Purple Heather',      emoji: '🌸' },
  },

  'Oman': {
    blurb: "Oman's Dhofar region hosts the 'Green Mountains' — one of the Arabian Peninsula's only cloud forests, fed by the Indian Ocean monsoon — and it's collapsing under overgrazing and tourism pressure. The Arabian leopard has fewer than 200 individuals left on Earth. Planting native frankincense, dragon blood, and wild fig trees in degraded Dhofar zones protects the last Arabian leopard habitat.",
    nationalAnimal: { name: 'Arabian Oryx',        emoji: '🦌' },
    nationalPlant:  { name: 'Frankincense Tree',   emoji: '🌿' },
  },

  'Palau': {
    blurb: "Palau's Rock Islands — a UNESCO World Heritage marine sanctuary holding 60% of the world's known stony coral species — are experiencing catastrophic bleaching as Pacific sea temperatures rise. Mangrove forests that filter land runoff protecting reefs are being cleared. Planting native mangroves along Palau's coastlines reduces sediment and nutrient pollution that compounds the damage done by warming seas.",
    nationalAnimal: { name: 'Dugong',              emoji: '🐬' },
    nationalPlant:  { name: 'Palauan Breadfruit',  emoji: '🌿' },
  },

  'Palestine': {
    blurb: "Palestine's historic landscape — once forested with native olive, carob, and Palestine oak — has been stripped by conflict, land conversion, and water scarcity. The native olive tree is both an economic lifeline and a cultural identity. Planting native trees in accessible zones restores ecosystem services and supports farming communities under severe water stress in one of the world's most contested landscapes.",
    nationalAnimal: { name: 'Palestinian Sunbird', emoji: '🐦' },
    nationalPlant:  { name: 'Olive Tree',          emoji: '🫒' },
  },

  'Panama': {
    blurb: "The Panama Canal — a critical artery for 5% of world trade — depends entirely on tropical rainfall captured by the Gatun Lake watershed. Deforestation is reducing reservoir levels to the point where vessels must carry lighter loads. Planting native forest along watershed tributaries above Gatun Lake is the most cost-effective investment Panama can make in keeping global trade moving.",
    nationalAnimal: { name: 'Harpy Eagle',         emoji: '🦅' },
    nationalPlant:  { name: 'Holy Ghost Orchid',   emoji: '🌺' },
  },

  'Paraguay': {
    blurb: "Paraguay's Atlantic Forest — once the most biodiverse forest in South America — has shrunk to just 8% of its original extent, mostly in the last 20 years. The giant anteater, maned wolf, and jaguar are losing ground to soy and beef. Planting native trees in degraded agricultural buffers begins reassembling the corridors that these threatened species must have to survive.",
    nationalAnimal: { name: 'Bare-throated Bellbird', emoji: '🐦' },
    nationalPlant:  { name: 'Mburucuyá Passion Flower', emoji: '🌸' },
  },

  'Poland': {
    blurb: "Poland's Białowieża — the last primary lowland forest in Europe, shared with Belarus — hosts the world's largest surviving wild European bison herd. Logging of ancient trees under emergency decrees ignited international controversy. Planting native oak, hornbeam, and spruce in clear-cut zones adjacent to Białowieża expands the protected core and gives bison more territory as the herd slowly grows.",
    nationalAnimal: { name: 'White-tailed Eagle',  emoji: '🦅' },
    nationalPlant:  { name: 'Corn Poppy',          emoji: '🌸' },
  },

  'Portugal': {
    blurb: "Portugal suffers Europe's worst wildfire problem — flammable eucalyptus plantations planted for paper pulp now cover a quarter of the country. In 2017, wildfires killed 115 people in a single day. Planting native cork oak, stone pine, and strawberry tree replaces burn-prone monocultures with fire-resistant forests that also protect the critically endangered Iberian lynx.",
    nationalAnimal: { name: 'Iberian Wolf',        emoji: '🐺' },
    nationalPlant:  { name: 'Lavender',            emoji: '🌸' },
  },

  'Qatar': {
    blurb: "Qatar receives under 80mm of rain annually — one of the world's lowest — and temperatures regularly exceed 50°C in summer. Urban tree canopy reduces outdoor temperatures by up to 10°C, making the difference between survivable and deadly heat. Planting native ghaf, sidra, and samr trees in Qatar's new urban parks creates island ecosystems in a desert city and cools public spaces.",
    nationalAnimal: { name: 'Arabian Oryx',        emoji: '🦌' },
    nationalPlant:  { name: 'Sidra',               emoji: '🌿' },
  },

  'Romania': {
    blurb: "Romania holds the largest intact virgin forests in Europe — ancient beech and silver fir in the Carpathians — yet illegal chainsaw gangs, backed by corrupt officials, are cutting them at unprecedented scale. The European lynx and brown bear depend on these corridors. Planting native trees in buffer zones and logged margins strengthens protection for Europe's last wilderness mountain chain.",
    nationalAnimal: { name: 'Lynx',                emoji: '🐈' },
    nationalPlant:  { name: 'Dog Rose',            emoji: '🌹' },
  },

  'Saint Kitts and Nevis': {
    blurb: "Saint Kitts and Nevis cleared nearly all its native forest for sugar centuries ago, leaving steep volcanic hillsides vulnerable to hurricanes and tropical downpours. The critically endangered Saint Kitts skink survives only in forested volcanic gullies. Planting native white cedar and gommier trees in these gullies rebuilds the microhabitat protecting the island's last endemic reptile from extinction.",
    nationalAnimal: { name: 'Brown Pelican',       emoji: '🐦' },
    nationalPlant:  { name: 'Royal Poinciana',     emoji: '🌺' },
  },

  'Saint Lucia': {
    blurb: "Saint Lucia's Quilesse Forest Reserve is the only habitat on Earth for the Saint Lucia parrot — a riot of green and blue found nowhere else. Hurricane devastation and forest clearing are shrinking its range. Planting native forest trees in the reserve's damaged margins expands the parrot's territory and rebuilds the dense canopy that the island's unique biodiversity depends on.",
    nationalAnimal: { name: 'Saint Lucia Parrot',  emoji: '🦜' },
    nationalPlant:  { name: 'Sabinea carinalis',   emoji: '🌸' },
  },

  'Saint Vincent and the Grenadines': {
    blurb: "Saint Vincent's Soufrière volcano erupted in 2021, destroying forests and forcing 22,000 evacuations. The Saint Vincent parrot — found only in this island's rainforest — lost significant habitat. Planting native forest trees in volcanic ash-covered zones accelerates ecosystem recovery, rebuilds parrot canopy, and restores the watershed that provides clean water to a rebuilding community.",
    nationalAnimal: { name: 'Saint Vincent Parrot', emoji: '🦜' },
    nationalPlant:  { name: 'Soufrière Tree',      emoji: '🌿' },
  },

  'Samoa': {
    blurb: "Samoa retains about 60% of its native forest — unusually high for the Pacific — yet logging of the highlands is accelerating as economic pressures grow. The rare Samoan flying fox, essential for forest seed dispersal, is declining with its roost trees. Planting native toa and fetau hardwoods restores bat habitat and maintains the forest-regeneration cycle the entire island ecosystem depends on.",
    nationalAnimal: { name: "Samoan Flying Fox",   emoji: '🦇' },
    nationalPlant:  { name: 'Teuila',              emoji: '🌸' },
  },

  'San Marino': {
    blurb: "San Marino — the world's oldest republic — sits atop Mount Titano and has been almost completely deforested since medieval times. Winter rains wash irreplaceable topsoil off bare limestone slopes into the Marecchia River. Planting native holm oak and downy oak on San Marino's eroding hillsides rebuilds the forest cover that protected this tiny mountain republic for 1,700 years.",
    nationalAnimal: { name: 'Purple-crested Coat of Arms', emoji: '🛡️' },
    nationalPlant:  { name: 'Cyclamen',            emoji: '🌸' },
  },

  'São Tomé and Príncipe': {
    blurb: "São Tomé holds one of the world's highest concentrations of endemic species per square kilometre — birds, plants, and reptiles found nowhere else — but clearing for oil palm is fragmenting the obô forest that is their only home. Planting native obô forest trees creates ecological corridors between remaining fragments, giving endemic species the connected habitat needed to maintain viable populations.",
    nationalAnimal: { name: 'São Tomé Fiscal',     emoji: '🐦' },
    nationalPlant:  { name: 'Annona',              emoji: '🌿' },
  },

  'Saudi Arabia': {
    blurb: "Saudi Arabia's 10 Billion Trees initiative aims to green the Arabian Peninsula's most arid landscapes. Ancient cloud-forest relicts survive on the Asir highlands above 2,000 metres, sheltering the Arabian leopard. Planting native sidr, acacia, and Asir highland forest trees restores degraded mountain corridors and establishes green urban parks in cities enduring 50°C summer temperatures.",
    nationalAnimal: { name: 'Arabian Camel',       emoji: '🐪' },
    nationalPlant:  { name: 'Date Palm',           emoji: '🌴' },
  },

  'Senegal': {
    blurb: "Senegal's groundnut basin — once the Sahel's most productive farmland — has lost its acacia and neem shade trees and is declining into desert at the edge of the Sahara. Fish stocks in the mangrove-rich Saloum Delta are collapsing as deforestation sends silt into nursery waters. Planting native trees using FMNR alongside fishing communities rebuilds both Senegalese food systems simultaneously.",
    nationalAnimal: { name: 'Lion',                emoji: '🦁' },
    nationalPlant:  { name: 'Baobab',              emoji: '🌳' },
  },

  'Serbia': {
    blurb: "Serbia's iron gate gorge — the Danube canyon carved between the Carpathians and Balkans — is lined with rare endemic forest that weathered every Ice Age. Industrial logging and hydropower have fragmented these refugia. Planting native sessile oak and Hungarian oak in cleared gorge margins expands habitat for the Balkan lynx, European otter, and rare thermophilic plant communities found only here.",
    nationalAnimal: { name: 'Golden Eagle',        emoji: '🦅' },
    nationalPlant:  { name: 'Serbian Rose',        emoji: '🌹' },
  },

  'Seychelles': {
    blurb: "Seychelles has lost over 95% of its native lowland forest — replaced by vanilla and cinnamon plantations. The Seychelles paradise flycatcher and Seychelles magpie-robin were nearly extinct before habitat restoration began. Planting native takamaka, capucin, and bois rouge trees on degraded plantation land expands the critical habitat that brought both species back from the brink of extinction.",
    nationalAnimal: { name: 'Aldabra Giant Tortoise', emoji: '🐢' },
    nationalPlant:  { name: 'Coco de Mer Palm',    emoji: '🌴' },
  },

  'Sierra Leone': {
    blurb: "Sierra Leone lost 60% of its Upper Guinea forest in post-conflict logging sprees. The world's remaining pygmy hippopotamus population — fewer than 3,000 — is retreating into tiny remaining forest patches. Planting native trees in degraded buffer zones around Gola Rainforest National Park creates the corridors these hippos and chimpanzees need to maintain genetically viable populations.",
    nationalAnimal: { name: 'Chimpanzee',          emoji: '🐒' },
    nationalPlant:  { name: 'Gola Forest Tree',    emoji: '🌲' },
  },

  'Singapore': {
    blurb: "Singapore retains just 0.3% primary forest — the Bukit Timah Nature Reserve — in one of the world's most urban landscapes. Yet Singapore demonstrates that urban forests cool cities, reduce flooding, and support biodiversity at extraordinary density. Planting native Singapore cherry, tembusu, and angsana in every available urban space makes Singapore a global model for nature-based urban resilience.",
    nationalAnimal: { name: 'Lion',                emoji: '🦁' },
    nationalPlant:  { name: 'Vanda Miss Joaquim',  emoji: '🌺' },
  },

  'Slovakia': {
    blurb: "Slovakia's Tatra Mountains — the highest peaks in the Carpathians and home to brown bears, chamois, and lynx — are devastated by bark-beetle outbreaks after a 2004 windstorm killed 12,000 hectares of spruce. The government's decision to log the fallen trees sparked an international conservation controversy. Planting diverse native spruce, larch, and pine species rebuilds a beetle-resistant mountain forest.",
    nationalAnimal: { name: 'White Double Cross',  emoji: '✝️' },
    nationalPlant:  { name: 'Linden Tree',         emoji: '🌳' },
  },

  'Slovenia': {
    blurb: "Slovenia is 60% forest — one of Europe's greenest countries — yet climate change is triggering bark-beetle outbreaks and ice storms that have collapsed thousands of hectares of native beech and fir. Lynx, wolves, and bears still roam, but their forest is fragmenting. Planting climate-resilient native species maintains forest cover and connectivity between the Alpine and Dinaric wilderness corridors.",
    nationalAnimal: { name: 'Proteus (Cave Salamander)', emoji: '🦎' },
    nationalPlant:  { name: 'Carnation',           emoji: '🌸' },
  },

  'Solomon Islands': {
    blurb: "The Solomon Islands hold the third-highest marine and terrestrial biodiversity in the Pacific, yet commercial logging — controlled largely by foreign corporations — has stripped highlands that once fed pristine reef systems with clear water. Coral bleaching compounds the damage. Planting native kwila and rosewood trees in logged watersheds filters agricultural runoff and keeps the reefs beneath alive.",
    nationalAnimal: { name: 'Sea Eagle',           emoji: '🦅' },
    nationalPlant:  { name: 'Birdwing Orchid',     emoji: '🌺' },
  },

  'Somalia': {
    blurb: "Somalia contains the world's most important frankincense and myrrh forests — ancient Boswellia and Commiphora trees that have supplied these resins for 5,000 years. Tapping frankincense too intensively kills trees, and climate drought is accelerating collapse. Planting native Boswellia sacra and Commiphora trees replenishes the dying forest and secures the livelihoods of communities who have harvested frankincense for millennia.",
    nationalAnimal: { name: 'Leopard',             emoji: '🐆' },
    nationalPlant:  { name: 'Frankincense Tree',   emoji: '🌿' },
  },

  'South Sudan': {
    blurb: "South Sudan holds the Sudd — one of the world's largest freshwater wetlands — and the last great Nile lechwe migrations. But logging and conflict are destroying the Imatong and Dongotona mountain forests that feed the White Nile. Planting native trees in post-conflict communities creates economic alternatives to charcoal and begins restoring South Sudan's highland watershed.",
    nationalAnimal: { name: 'African Fish Eagle',  emoji: '🦅' },
    nationalPlant:  { name: 'Teak',               emoji: '🌿' },
  },

  'Suriname': {
    blurb: "Suriname protects 93% of its territory under tropical forest — the highest proportion in the world. But gold mining plumes are poisoning rivers with mercury, killing fish and the indigenous communities who depend on them. Planting native trees on mining-degraded riverbanks absorbs heavy metals, restores fish corridors, and gives Suriname the on-the-ground forest recovery its legal protections alone cannot deliver.",
    nationalAnimal: { name: 'Jaguar',              emoji: '🐆' },
    nationalPlant:  { name: 'Faya Lobi',           emoji: '🌸' },
  },

  'Sweden': {
    blurb: "Sweden's boreal forest holds 25,000 species — many found nowhere else — yet 70% of old-growth forests have been clear-cut, leaving monoculture spruce that burns catastrophically in droughts. The critically endangered white-backed woodpecker depends entirely on old deciduous forest. Planting native oak, birch, and aspen after clear-cuts begins restoring the biodiversity the Swedish forest industry erased in a century.",
    nationalAnimal: { name: 'Moose',               emoji: '🫎' },
    nationalPlant:  { name: 'Linnaea borealis',    emoji: '🌸' },
  },

  'Switzerland': {
    blurb: "Switzerland's Alpine forests — storing snow that feeds the Rhine, Rhône, and Danube — are warming twice as fast as the global average. Bark beetles are killing larch and spruce forests that protect towns from avalanches. Planting native mountain maple, arolla pine, and Swiss stone pine on warmer aspects rebuilds the protective forest layer that keeps Swiss Alpine valleys safe from landslides.",
    nationalAnimal: { name: 'Alpine Ibex',         emoji: '🐐' },
    nationalPlant:  { name: 'Edelweiss',           emoji: '🌼' },
  },

  'Syria': {
    blurb: "Syria's ancient pine and oak forests along the Anti-Lebanon and Coastal Mountains supplied the ancient world with timber for temples and ships. A decade of conflict destroyed what remained, and returning refugee communities are clearing forest for survival. Planting native stone pine, Syrian juniper, and coastal oak offers both ecological restoration and livelihood income for communities rebuilding after catastrophic war.",
    nationalAnimal: { name: 'Arabian Horse',       emoji: '🐎' },
    nationalPlant:  { name: 'Hyacinth',            emoji: '🌸' },
  },

  'Taiwan': {
    blurb: "Taiwan's high mountain forests — hosting over 4,000 plant species in an area smaller than Switzerland — are collapsing under typhoon devastation and climate-driven drought that kills native Taiwan cedar and silver fir. The endangered Formosan black bear needs large unbroken forest to survive. Planting native trees in typhoon-cleared highland zones maintains the forest connectivity bears depend on.",
    nationalAnimal: { name: 'Formosan Black Bear',  emoji: '🐻' },
    nationalPlant:  { name: 'Plum Blossom',        emoji: '🌸' },
  },

  'Tajikistan': {
    blurb: "Tajikistan's Pamiri highland forests — ancient walnut, juniper, and almond woodlands sheltering snow leopards and Marco Polo sheep — are severely degraded from Soviet-era fuel cutting. Glacier retreat is accelerating, threatening the 1 billion people downstream who depend on Central Asian water. Planting native trees on denuded Pamiri slopes restores moisture retention that keeps glacial-fed rivers flowing.",
    nationalAnimal: { name: 'Marco Polo Sheep',    emoji: '🐏' },
    nationalPlant:  { name: 'Tulip',               emoji: '🌷' },
  },

  'Timor-Leste': {
    blurb: "Timor-Leste lost over half its forests during the Indonesian occupation and post-independence chaos. Bare mountain slopes now collapse in monsoon floods that kill communities downstream. The Timor green python, found only in Timor's forests, is rarely sighted. Planting native teak, sandalwood, and mahogany on degraded slopes restores the forest-sponge that once slowed monsoon run-off and kept rivers clear.",
    nationalAnimal: { name: 'Saltwater Crocodile', emoji: '🐊' },
    nationalPlant:  { name: 'Sandalwood',          emoji: '🌿' },
  },

  'Togo': {
    blurb: "Togo has one of West Africa's highest deforestation rates — less than 7% forest remains of the original Guinean forests. The rare Togo slippery frog, found nowhere else, depends on cool shaded forest streams that are drying. Planting native trees along Togo's stream networks restores the shade, moisture, and leaf litter these critically endangered amphibians need to survive.",
    nationalAnimal: { name: 'Agama Lizard',        emoji: '🦎' },
    nationalPlant:  { name: 'Baobab',              emoji: '🌳' },
  },

  'Tonga': {
    blurb: "Tonga's volcanic islands face intensifying cyclones and coral bleaching that are destroying the reef systems protecting coastlines. Native forest on Tonga's islands — habitat for the endangered tooth-billed pigeon — has been cleared for agriculture. Planting native tamanu, fau, and toa trees on hillsides above reefs reduces sediment loading that smothers coral, giving both the reefs and the pigeon a chance.",
    nationalAnimal: { name: 'Tongan Whistler',     emoji: '🐦' },
    nationalPlant:  { name: 'Heliala',             emoji: '🌿' },
  },

  'Trinidad and Tobago': {
    blurb: "Trinidad holds the southernmost patch of South American rainforest, harbouring ocelots, anacondas, and the national bird — the scarlet ibis — in the Caroni Swamp mangroves. Oil and gas development fragments forest. Planting native chaconia, poui, and mangroves around the Nariva Swamp restores wetland habitat for nesting scarlet ibis before industrial expansion closes the last viable corridor.",
    nationalAnimal: { name: 'Scarlet Ibis',        emoji: '🐦' },
    nationalPlant:  { name: 'Chaconia',            emoji: '🌺' },
  },

  'Tunisia': {
    blurb: "Tunisia's Kroumirie cork oak forests — among the Mediterranean's most biodiverse — are dying from drought intensified by deforestation of the highlands that once generated cloud rainfall. The northern Barbary macaque population is one of the last in Africa. Planting native Aleppo pine, cork oak, and wild olive on degraded Kroumirie hillsides restores the rainfall-generating forest that Tunisia is losing.",
    nationalAnimal: { name: 'Barbary Stag',        emoji: '🦌' },
    nationalPlant:  { name: 'Jasmine',             emoji: '🌸' },
  },

  'Turkmenistan': {
    blurb: "Turkmenistan shares the fate of the dying Aral Sea and is 70% Karakum Desert — one of Earth's largest sand deserts. The few Kopet Dag mountain forests sheltering endemic leopards and bezoard ibex are critically stressed. Planting native pistachio, wild almond, and juniper in degraded Kopet Dag forests restores the mountain watershed and gives Central Asia's last Persian leopard population forest to survive in.",
    nationalAnimal: { name: 'Akhal-Teke Horse',    emoji: '🐎' },
    nationalPlant:  { name: 'White Grape',         emoji: '🍇' },
  },

  'Tuvalu': {
    blurb: "Tuvalu — nine coral atolls averaging 2 metres above sea level — has already begun abandoning islands to the rising Pacific. Saltwater intrusion is killing the breadfruit and pulaka gardens islanders have grown for 3,000 years. Planting salt-tolerant native te ango, sea lettuce, and coastal mangroves buys critical time against sea-level rise and maintains the food plants that give Tuvaluan culture its roots.",
    nationalAnimal: { name: 'Parrotfish',          emoji: '🐟' },
    nationalPlant:  { name: 'Pulaka',              emoji: '🌿' },
  },

  'United Arab Emirates': {
    blurb: "The UAE is one of the world's highest per-capita carbon emitters and one of the hottest urban environments on Earth. Abu Dhabi pioneered mangrove restoration — planting over 14 million mangroves in decades — creating critical habitat for the Arabian flamingo and sooty falcon. Planting native ghaf, sidr, and further mangroves expands the only ecosystems capable of cooling this desert coast.",
    nationalAnimal: { name: 'Arabian Oryx',        emoji: '🦌' },
    nationalPlant:  { name: 'Ghaf Tree',           emoji: '🌳' },
  },

  'Uruguay': {
    blurb: "Uruguay was naturally almost entirely grassland — one of the temperate world's most biodiverse grassland ecosystems. Eucalyptus and pine plantations now cover millions of hectares, replacing native pampas birds and endemic plant communities. Planting native trees along Uruguay's rivers and streams restores gallery forests that are the only tree habitat native capybaras, otters, and maned wolves can use.",
    nationalAnimal: { name: 'Southern Lapwing',    emoji: '🐦' },
    nationalPlant:  { name: 'Ceibo Flower',        emoji: '🌸' },
  },

  'Uzbekistan': {
    blurb: "Uzbekistan lost the Aral Sea in living memory — the world's greatest environmental disaster — when Soviet irrigation canals drained it to grow cotton. Toxic dust from the exposed seabed blankets Uzbek cities with cancer-causing pollutants. Planting native saxaul trees on the dried seabed traps dust, slowly rebuilds soil, and demonstrates that ecosystem recovery from total collapse is possible.",
    nationalAnimal: { name: 'Bactrian Deer',       emoji: '🦌' },
    nationalPlant:  { name: 'Tulip',               emoji: '🌷' },
  },

  'Vanuatu': {
    blurb: "Vanuatu is consistently ranked among the world's most disaster-prone nations — one of the world's most active volcanic arcs, combined with intensifying cyclones. Native tamanu and nangalat forests once buffered cyclone damage; logging has removed these protective belts. Planting native trees in coastal and volcanic slopes restores both the cyclone protection and the freshwater springs that island communities need.",
    nationalAnimal: { name: 'Green Sea Turtle',    emoji: '🐢' },
    nationalPlant:  { name: 'Star of Bethlehem',   emoji: '🌸' },
  },

  'Vatican City': {
    blurb: "Vatican City — the world's smallest state — has committed to becoming carbon neutral, replanting forests in partnership with Italy. Its iconic Vatican Gardens, with centuries-old trees, demonstrate that every square metre of green space matters in dense urban environments. Planting native Italian oak and stone pine in Vatican-partnered Italian nature reserves fulfils its symbolic and moral leadership on ecological responsibility.",
    nationalAnimal: { name: 'White-tailed Eagle',  emoji: '🦅' },
    nationalPlant:  { name: 'Rose',               emoji: '🌹' },
  },

  'Yemen': {
    blurb: "Yemen's island of Socotra — a UNESCO World Heritage 'Galápagos of the Indian Ocean' — holds 37% endemic plant species including the iconic dragon blood tree, found nowhere else on Earth. Conflict has prevented conservation enforcement while cyclones are multiplying. Planting native dragon blood, desert rose, and frankincense trees on Socotra is the only way to preserve this irreplaceable botanical world heritage.",
    nationalAnimal: { name: 'Arabian Leopard',     emoji: '🐆' },
    nationalPlant:  { name: 'Dragon Blood Tree',   emoji: '🌲' },
  },

  'Zambia': {
    blurb: "Zambia's miombo woodland — harbouring wild dogs, leopards, and sable antelope across 400 million hectares — is being cleared for charcoal at 250,000 hectares per year. The Zambezi River, feeding Victoria Falls, runs lower each decade as headwater forests disappear. Planting native miombo trees in community woodlots reduces charcoal pressure on ancient forest and rebuilds the watershed the Zambezi depends on.",
    nationalAnimal: { name: 'African Fish Eagle',  emoji: '🦅' },
    nationalPlant:  { name: 'Brachystegia',        emoji: '🌿' },
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
