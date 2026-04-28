/**
 * Brief (1–2 sentence) per-country statements about biodiversity/climate challenges
 * and how tree planting helps. Used on the country selection card in AddTree.
 *
 * Fallback text is used for countries without a specific entry.
 */
export const COUNTRY_BLURBS: Record<string, string> = {
  'Afghanistan':
    'Decades of conflict have stripped over 70% of Afghanistan\'s forests, accelerating desertification and topsoil loss. Planting native trees stabilises slopes, restores watersheds, and shelters communities from dust storms.',

  'Albania':
    'Albania\'s Mediterranean forests and Balkan biodiversity hotspots face illegal logging and wildfire pressure. Tree planting along river corridors and hillsides helps protect endemic species and reduce flood risk.',

  'Algeria':
    'Algeria is battling advancing Saharan desertification that threatens farmland and villages each year. Planting drought-tolerant native trees forms a green barrier, locks in carbon, and cools local temperatures.',

  'Angola':
    'Angola\'s miombo woodland — one of the world\'s largest dry-forest ecosystems — is shrinking due to charcoal production. Restoring native trees protects rare species found nowhere else on Earth.',

  'Argentina':
    'Argentina has lost more than 70% of its Atlantic Forest and continues to clear the Gran Chaco at alarming rates. Replanting native hardwoods sequesters carbon, shelters jaguars, and reduces erosion in river basins.',

  'Australia':
    'Australia is a global biodiversity hotspot, home to over 80% of species found nowhere else, yet loses forests at one of the highest rates globally. Every tree planted supports koalas, echidnas, and the water catchments that millions rely on.',

  'Bangladesh':
    'Bangladesh is among the most climate-vulnerable countries on Earth, facing intensifying cyclones and rising sea levels. Coastal mangrove and native tree planting acts as a living seawall, protecting lives and soil.',

  'Bolivia':
    'Bolivia holds a quarter of the Amazon basin and extraordinary Andean biodiversity, both threatened by agricultural expansion. Planting trees on degraded land locks in carbon, slows glacier melt run-off, and gives wildlife a corridor to survive.',

  'Brazil':
    'Brazil is home to the Amazon — the largest tropical rainforest on Earth, producing 20% of the world\'s oxygen. Every tree planted here helps offset record-high deforestation rates and protects unparalleled biodiversity.',

  'Cameroon':
    'Cameroon anchors the Congo Basin forest — the world\'s second "green lung" — which is being cleared for palm oil and logging. Planting native trees in buffer zones safeguards gorillas, forest elephants, and crucial carbon stores.',

  'Canada':
    'Canada\'s boreal forest stores more carbon per hectare than tropical rainforests, yet wildfires and logging are releasing it rapidly. Replanting after disturbances locks carbon back in and supports wolverines, woodland caribou, and clean waterways.',

  'Chile':
    'Chile\'s temperate Valdivian rainforest — among the rarest biomes on Earth — and its biodiversity-rich dryland scrub are shrinking due to pine monocultures and wildfire. Planting native species restores the unique ecosystems that alerce and pudú deer depend on.',

  'China':
    'China has lost vast swathes of subtropical and temperate forest to agriculture and urbanisation, contributing to sandstorm events and flood frequency. China\'s massive reforestation programmes show how native tree planting can reverse desertification and restore watershed health.',

  'Colombia':
    'Colombia is the world\'s second most biodiverse country, yet deforestation for cattle ranching is pushing the Amazon and Pacific forests to a tipping point. Planting trees protects spectacled bears, tapirs, and the cloud forests that supply fresh water to millions.',

  'Congo':
    'The Congo Republic guards the heart of the Congo Basin, the world\'s most important carbon-absorbing forest after the Amazon. Planting trees in degraded zones keeps this irreplaceable carbon sink intact and shelters forest elephants and bonobos.',

  'DR Congo':
    'DR Congo holds the second-largest tropical forest on Earth and the highest rate of deforestation in Africa. Restoring native trees is crucial to protecting okapis, forest elephants, and billions of tonnes of stored carbon.',

  'Costa Rica':
    'Costa Rica reversed decades of deforestation through national policy, recovering forest cover from 21% to over 52%. Adding native trees to degraded pastures continues this success story, supporting resplendent quetzals and clean water supplies.',

  'Ecuador':
    'Ecuador, including the Galápagos, contains more species per square kilometre than almost anywhere on Earth, yet Amazonian deforestation continues. Each tree planted in depleted areas protects cloud-forest orchids, Andean bears, and critical headwaters.',

  'Ethiopia':
    'Ethiopia has lost over 97% of its original forest cover to agriculture and charcoal, fuelling erosion and drought. Ethiopia\'s record-breaking tree-planting drives show that mass restoration can restore rainfall patterns and feed families.',

  'France':
    'France\'s forests are under increasing stress from bark-beetle outbreaks, drought and heatwaves linked to climate change. Planting diverse, climate-resilient tree species strengthens forest ecosystems and protects the European biodiversity corridors running through the country.',

  'Gabon':
    'Gabon retains 90% of its rainforest — one of the best-preserved in Africa — making it a crucial carbon reservoir. Supporting tree planting here protects forest buffalo, lowland gorillas, and carbon stocks the whole planet depends on.',

  'Germany':
    'Germany\'s iconic forests have seen widespread tree die-off from drought and bark beetles worsened by climate change. Planting diverse native species replaces monoculture spruce stands and helps forests adapt to a warming future.',

  'Ghana':
    'Ghana has lost over 80% of its original forest in the last century, fragmenting habitat for forest elephants and rare primates. Planting native trees alongside cocoa farms (agroforestry) restores biodiversity while boosting farmer income.',

  'Guatemala':
    'Guatemala\'s Maya Biosphere Reserve — home to jaguars, scarlet macaws, and tapirs — faces relentless agricultural encroachment. Planting native trees in buffer zones keeps wildlife corridors open and reduces the mudslide risk for highland communities.',

  'India':
    'India\'s forests — from the Western Ghats biodiversity hotspot to the Sundarbans mangroves — are shrinking under intense population pressure. Planting native species rebuilds habitat for tigers, elephants, and the countless endemic plants found nowhere else.',

  'Indonesia':
    'Indonesia has the third-largest tropical forest on Earth and more species of plants, birds, and reptiles than almost any other country, yet deforestation for palm oil and paper is relentless. Each tree planted protects Sumatran tigers, orangutans, and peatlands storing thousands of years of carbon.',

  'Iran':
    'Iran has lost vast swathes of its Hyrcanian forest — a 25-million-year-old relic of ancient temperate woodlands — to logging and agriculture. Planting trees in degraded areas restores this UNESCO-listed ecosystem and combats the desertification advancing from the south.',

  'Japan':
    'Japan\'s mountain forests play a critical role in preventing landslides, but climate-driven typhoon damage is intensifying. Planting diverse native trees alongside existing managed forests strengthens resilience and supports the rare Japanese giant salamander and flying squirrels.',

  'Kenya':
    'Kenya\'s forests, including the Mau — the largest montane forest in East Africa — are shrinking, threatening the Rift Valley\'s water towers. Planting native trees restores water catchments that feed farms and cities, while safeguarding lions, elephants, and critically endemic species.',

  'Madagascar':
    'Madagascar has lost over 90% of its original vegetation, threatening the 90% of its wildlife that lives nowhere else on Earth — from lemurs to baobabs. Every tree planted is a direct lifeline for species on the very edge of extinction.',

  'Malaysia':
    'Malaysia\'s ancient Borneo rainforest is one of the most species-rich on Earth, yet ranks among the fastest-deforested. Planting native trees in logged areas gives orangutans, pygmy elephants, and clouded leopards a path to recovery.',

  'Mexico':
    'Mexico is a megadiverse country holding 10% of Earth\'s species, but deforestation continues to fragment cloud forests and mangroves. Planting native trees restores vital habitat for monarch butterflies, jaguars, and the rare axolotl.',

  'Morocco':
    'Morocco\'s argan forests — home to a unique goat-climbing ecosystem — and its Atlas cedar woodlands are under severe drought and overgrazing pressure. Planting native and drought-adapted trees slows desertification and protects the Barbary macaque.',

  'Mozambique':
    'Mozambique\'s miombo and coastal forests are disappearing rapidly to charcoal and agriculture, leaving communities exposed to increasingly severe cyclones. Planting mangroves and native trees provides a natural buffer and restores declining wildlife habitat.',

  'Myanmar':
    'Myanmar has one of the highest deforestation rates in Southeast Asia, threatening its rich biodiversity of tigers, clouded leopards, and rare freshwater dolphins. Restoring native forest cover reduces landslide risk for rural communities and locks in vital carbon.',

  'Nepal':
    'Nepal\'s Himalayan forests regulate downstream water for over a billion people and support rare snow leopards and red pandas. Community-led tree planting on degraded hillsides protects watersheds, reduces flood risk, and provides sustainable livelihoods.',

  'New Zealand':
    'New Zealand\'s unique island biodiversity — including kiwi, tuatara, and thousands of endemic plants — evolved without land mammals and is still threatened by invasive species and habitat loss. Planting native trees alongside predator control is essential for species recovery.',

  'Nigeria':
    'Nigeria once held the richest forests in West Africa but has lost over 90% of them, driving extreme erosion and reducing rainfall. Planting trees in degraded farmland and cities reduces temperatures, filters water, and starts to rebuild habitats for threatened species.',

  'Pakistan':
    'Pakistan\'s glaciers — vital freshwater reserves — are melting at accelerating rates, and deforestation has made flooding catastrophic. Pakistan\'s Billion Tree Tsunami project shows how large-scale native tree planting can restore eroded hillsides and regulate river flow.',

  'Papua New Guinea':
    'Papua New Guinea holds one of the world\'s largest intact tropical forests, home to birds of paradise and extraordinary endemic biodiversity. Planting trees in degraded communities helps protect these globally important habitats while supporting local food security.',

  'Peru':
    'Peru contains 13% of the world\'s remaining Amazon rainforest — a critical buffer for global climate — plus unique Andean cloud forests and páramo wetlands. Planting native trees supports jaguars, giant otters, and the thousands of plant medicines still being discovered.',

  'Philippines':
    'The Philippines is a global biodiversity hotspot with 52% endemic species, yet its forests are among the most deforested in Asia. Planting native trees restores upland watershed forests, reduces landslide risk for typhoon-prone communities, and protects the Philippine eagle.',

  'Russia':
    'Russia\'s boreal taiga is the world\'s largest forest biome and a massive carbon store, but wildfires fuelled by warming are releasing centuries of stored carbon. Planting trees in burned areas accelerates recovery of Siberian tiger and Amur leopard habitat.',

  'Rwanda':
    'Rwanda has turned from one of Africa\'s most deforested nations to a model of forest restoration, with cover rising from 10% to over 30%. Continuing to plant native trees on hillsides safeguards mountain gorillas and the water supply for millions.',

  'South Africa':
    'South Africa\'s Cape Floristic Region is one of Earth\'s six floral kingdoms with extraordinary endemic plants, while its eastern forests shelter elephants, rhinos, and lions. Planting trees in degraded areas restores buffers for these threatened biomes.',

  'South Korea':
    'South Korea reforested more than two million hectares after the Korean War — one of the great forest restoration successes of the 20th century. Continuing to plant diverse native species strengthens resilience to climate extremes and supports the country\'s rich temperate biodiversity.',

  'Spain':
    'Spain is the most biodiverse country in Europe, hosting the last wild populations of Iberian lynx and imperial eagle, but its forests face devastating wildfires worsened by drought. Planting fire-resistant native species helps break the cycle of destruction.',

  'Sri Lanka':
    'Sri Lanka is a biodiversity hotspot with extraordinary species density, yet retains only a fraction of its original rainforest after centuries of clearing. Planting native rainforest trees in degraded land provides corridors for leopards, elephants, and hundreds of endemic birds.',

  'Sudan':
    'Sudan sits at the front line of Saharan desertification, losing productive land to sand at an alarming rate. Planting drought-tolerant native trees along the Sahel belt — the "Great Green Wall" — can halt advancing desert and restore degraded farmland.',

  'Tanzania':
    'Tanzania\'s diverse ecosystems — from Mount Kilimanjaro\'s cloud forests to coastal mangroves — are shrinking, threatening the wildlife of the Serengeti and beyond. Planting native trees in buffer zones around protected areas creates vital corridors for elephants, lions, and wild dogs.',

  'Thailand':
    'Thailand has lost over half its forests in 50 years, driving flash floods and threatening biodiversity-rich forests that shelter tigers and Irrawaddy dolphins. Planting native trees in degraded areas restores upstream watersheds and community water security.',

  'Turkey':
    'Turkey\'s extraordinary biodiversity — shaped by three biogeographic zones — and its ancient cedar and oak forests face destructive wildfires and overgrazing. Planting native trees rehabilitates burned landscapes and stabilises the hillsides that feed Turkey\'s rivers.',

  'Uganda':
    'Uganda contains a quarter of the world\'s remaining mountain gorilla population and extraordinary Albertine Rift biodiversity, yet forest cover is falling rapidly. Planting trees in degraded farmland creates habitat corridors that connect national parks and safeguard iconic wildlife.',

  'Ukraine':
    'Ukraine\'s steppe and Carpathian forests are critical habitats for European bison and rare raptors, under growing pressure from agriculture and conflict. Planting trees on eroded land stabilises soils, cools local climates, and restores habitat connectivity.',

  'United Kingdom':
    'The UK is one of the least-forested countries in Europe, with the lowest share of ancient woodland on the continent. Planting native broadleaf trees restores habitat for red squirrels, pine martens, and pollinators, while reducing downstream flood risk.',

  'United States':
    'The USA hosts extraordinary biodiversity from Pacific temperate rainforests to Appalachian old-growth, yet logging, development, and wildfire are depleting tree cover. Planting native trees restores salmon rivers, songbird habitats, and the carbon sinks the country urgently needs.',

  'Venezuela':
    'Venezuela holds extraordinary biodiversity in the Tepui highlands and Orinoco Delta, but economic crisis has driven rapid deforestation for subsistence and mining. Planting native trees in buffer zones around protected areas gives threatened species a chance of survival.',

  'Vietnam':
    'Vietnam has lost over half its forest cover since the mid-20th century, accelerating typhoon damage and erosion. Planting mangroves along the coastline and native trees in upland watersheds protects communities and restores habitat for the critically endangered saola.',

  'Zimbabwe':
    'Zimbabwe\'s miombo woodland — rich in birds and mammals — is cleared at scale for charcoal and agriculture, worsening drought cycles. Planting native trees alongside communities provides fuel, food, and shade while slowly rebuilding one of Africa\'s most important forest biomes.',
}

export const DEFAULT_BLURB =
  'Forests cover less than a third of Earth\'s land but host over two-thirds of all land species. Every tree you plant strengthens local biodiversity, absorbs CO₂, and helps regulate rainfall for communities that depend on healthy land.'

export function getCountryBlurb(country: string): string {
  return COUNTRY_BLURBS[country] ?? DEFAULT_BLURB
}
