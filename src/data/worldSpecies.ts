// Comprehensive world native species database
// carbon_coeff: kg CO2 absorbed per meter of height per year (allometric estimate)
// Higher tropical hardwoods: 6–9 | Tropical mid: 3–6 | Temperate: 1.5–3.5 | Small/shrub: 0.5–1.5

export interface LocalSpecies {
  common_name: string
  scientific_name: string
  carbon_coeff: number       // used for XP + CarbonLedger
  native_countries: string[] // country names matching countries.ts
  family?: string
}

export const WORLD_SPECIES: LocalSpecies[] = [
  // ── GUYANA (default country) ─────────────────────────────────────────
  { common_name: 'Greenheart',         scientific_name: 'Chlorocardium rodiei',      carbon_coeff: 9.0,  native_countries: ['Guyana','Suriname','Venezuela'],                       family: 'Lauraceae' },
  { common_name: 'Mora',               scientific_name: 'Mora excelsa',              carbon_coeff: 8.2,  native_countries: ['Guyana','Trinidad and Tobago','Venezuela','Suriname'],  family: 'Fabaceae' },
  { common_name: 'Purple Heart',       scientific_name: 'Peltogyne venosa',          carbon_coeff: 7.5,  native_countries: ['Guyana','Suriname','Brazil','Venezuela'],               family: 'Fabaceae' },
  { common_name: 'Bullet Wood',        scientific_name: 'Manilkara bidentata',       carbon_coeff: 7.8,  native_countries: ['Guyana','Trinidad and Tobago','Brazil','Suriname','Venezuela','Colombia'], family: 'Sapotaceae' },
  { common_name: 'Wallaba',            scientific_name: 'Eperua falcata',            carbon_coeff: 6.8,  native_countries: ['Guyana','Suriname','Venezuela'],                       family: 'Fabaceae' },
  { common_name: 'Crabwood',           scientific_name: 'Carapa guianensis',         carbon_coeff: 6.2,  native_countries: ['Guyana','Suriname','Brazil','Trinidad and Tobago','Venezuela','Colombia'], family: 'Meliaceae' },
  { common_name: 'Wamara',             scientific_name: 'Swartzia leiocalycina',     carbon_coeff: 7.0,  native_countries: ['Guyana','Suriname','Brazil'],                          family: 'Fabaceae' },
  { common_name: 'Letterwood',         scientific_name: 'Piratinera guianensis',     carbon_coeff: 5.8,  native_countries: ['Guyana','Suriname','Brazil'],                          family: 'Moraceae' },
  { common_name: 'Tauroniro',          scientific_name: 'Humiria balsamifera',       carbon_coeff: 5.0,  native_countries: ['Guyana','Suriname','Brazil','Venezuela','Trinidad and Tobago'], family: 'Humiriaceae' },
  { common_name: 'Simarupa',           scientific_name: 'Simarouba amara',           carbon_coeff: 4.2,  native_countries: ['Guyana','Suriname','Brazil','Venezuela','Colombia','Trinidad and Tobago'], family: 'Simaroubaceae' },
  { common_name: 'Sandbox Tree',       scientific_name: 'Hura crepitans',            carbon_coeff: 5.2,  native_countries: ['Guyana','Suriname','Venezuela','Colombia','Brazil','Trinidad and Tobago','Belize','Mexico','Panama'], family: 'Euphorbiaceae' },
  { common_name: 'Manicole Palm',      scientific_name: 'Euterpe oleracea',          carbon_coeff: 3.5,  native_countries: ['Guyana','Suriname','Brazil','Venezuela','Trinidad and Tobago','Colombia'], family: 'Arecaceae' },
  { common_name: 'Troolie Palm',       scientific_name: 'Manicaria saccifera',       carbon_coeff: 2.8,  native_countries: ['Guyana','Suriname','Brazil','Colombia','Venezuela'],   family: 'Arecaceae' },
  { common_name: 'Courida (Mangrove)', scientific_name: 'Avicennia germinans',       carbon_coeff: 3.8,  native_countries: ['Guyana','Suriname','Venezuela','Trinidad and Tobago','Belize','Colombia','Panama','Brazil'], family: 'Acanthaceae' },
  { common_name: 'Cuyapo',             scientific_name: 'Pachira aquatica',          carbon_coeff: 4.0,  native_countries: ['Guyana','Suriname','Venezuela','Colombia','Brazil','Panama','Mexico'], family: 'Malvaceae' },
  { common_name: 'Locust Tree',        scientific_name: 'Hymenaea courbaril',        carbon_coeff: 6.5,  native_countries: ['Guyana','Suriname','Brazil','Venezuela','Trinidad and Tobago','Jamaica','Mexico','Panama','Colombia'], family: 'Fabaceae' },
  { common_name: 'Iteballi',           scientific_name: 'Macrolobium acaciifolium',  carbon_coeff: 4.8,  native_countries: ['Guyana','Suriname','Brazil','Venezuela'],               family: 'Fabaceae' },
  { common_name: 'Baboen',             scientific_name: 'Virola surinamensis',       carbon_coeff: 5.5,  native_countries: ['Guyana','Suriname','Brazil','Venezuela','Colombia'],   family: 'Myristicaceae' },

  // ── BRAZIL ───────────────────────────────────────────────────────────
  { common_name: 'Brazil Nut',         scientific_name: 'Bertholletia excelsa',      carbon_coeff: 8.8,  native_countries: ['Brazil','Guyana','Suriname','Venezuela','Bolivia','Peru','Colombia','Ecuador'], family: 'Lecythidaceae' },
  { common_name: 'Rubber Tree',        scientific_name: 'Hevea brasiliensis',        carbon_coeff: 5.5,  native_countries: ['Brazil','Guyana','Suriname','Venezuela','Bolivia','Peru'], family: 'Euphorbiaceae' },
  { common_name: 'Cacao',              scientific_name: 'Theobroma cacao',           carbon_coeff: 2.8,  native_countries: ['Brazil','Guyana','Suriname','Colombia','Venezuela','Peru','Ecuador','Bolivia','Panama','Mexico'], family: 'Malvaceae' },
  { common_name: 'Jacaranda',          scientific_name: 'Jacaranda mimosifolia',     carbon_coeff: 3.2,  native_countries: ['Brazil','Argentina','Bolivia'],                        family: 'Bignoniaceae' },
  { common_name: 'Ipê Amarelo',        scientific_name: 'Handroanthus albus',        carbon_coeff: 4.0,  native_countries: ['Brazil','Paraguay','Argentina','Bolivia'],             family: 'Bignoniaceae' },
  { common_name: 'Angelim',            scientific_name: 'Dinizia excelsa',           carbon_coeff: 9.2,  native_countries: ['Brazil','Guyana','Suriname'],                          family: 'Fabaceae' },
  { common_name: 'Cupuassu',           scientific_name: 'Theobroma grandiflorum',    carbon_coeff: 2.5,  native_countries: ['Brazil','Peru','Ecuador','Colombia'],                  family: 'Malvaceae' },

  // ── VENEZUELA / COLOMBIA ─────────────────────────────────────────────
  { common_name: 'Araguaney',          scientific_name: 'Handroanthus chrysanthus',  carbon_coeff: 3.8,  native_countries: ['Venezuela','Colombia','Ecuador','Peru'],              family: 'Bignoniaceae' },
  { common_name: 'Moriche Palm',       scientific_name: 'Mauritia flexuosa',         carbon_coeff: 3.0,  native_countries: ['Venezuela','Guyana','Suriname','Brazil','Colombia','Peru','Bolivia'], family: 'Arecaceae' },
  { common_name: 'Wax Palm',           scientific_name: 'Ceroxylon quindiuense',     carbon_coeff: 2.5,  native_countries: ['Colombia','Venezuela','Ecuador','Peru'],              family: 'Arecaceae' },
  { common_name: 'Nogal',              scientific_name: 'Cordia alliodora',          carbon_coeff: 4.5,  native_countries: ['Colombia','Venezuela','Ecuador','Peru','Panama','Costa Rica','Guatemala','Mexico'], family: 'Boraginaceae' },
  { common_name: 'Samán',              scientific_name: 'Samanea saman',             carbon_coeff: 5.0,  native_countries: ['Venezuela','Colombia','Trinidad and Tobago','Panama','Mexico','Brazil','Guyana'], family: 'Fabaceae' },
  { common_name: 'Spanish Cedar',      scientific_name: 'Cedrela odorata',           carbon_coeff: 5.5,  native_countries: ['Colombia','Venezuela','Guyana','Suriname','Brazil','Bolivia','Peru','Ecuador','Panama','Costa Rica','Mexico','Belize'], family: 'Meliaceae' },

  // ── PERU / ECUADOR / BOLIVIA ─────────────────────────────────────────
  { common_name: 'Quinine (Cinchona)', scientific_name: 'Cinchona officinalis',      carbon_coeff: 2.2,  native_countries: ['Peru','Ecuador','Colombia','Bolivia'],                family: 'Rubiaceae' },
  { common_name: 'Tornillo',           scientific_name: 'Cedrelinga cateniformis',   carbon_coeff: 6.0,  native_countries: ['Peru','Brazil','Ecuador','Colombia'],                 family: 'Fabaceae' },
  { common_name: 'Quebracho Colorado', scientific_name: 'Schinopsis balansae',       carbon_coeff: 5.5,  native_countries: ['Argentina','Paraguay','Bolivia'],                     family: 'Anacardiaceae' },
  { common_name: 'Monkey Puzzle',      scientific_name: 'Araucaria araucana',        carbon_coeff: 4.5,  native_countries: ['Chile','Argentina'],                                  family: 'Araucariaceae' },
  { common_name: 'Alerce',             scientific_name: 'Fitzroya cupressoides',     carbon_coeff: 3.8,  native_countries: ['Chile','Argentina'],                                  family: 'Cupressaceae' },

  // ── TRINIDAD AND TOBAGO / CARIBBEAN ──────────────────────────────────
  { common_name: 'Poui (Pink)',         scientific_name: 'Handroanthus roseus',      carbon_coeff: 3.5,  native_countries: ['Trinidad and Tobago','Guyana','Venezuela','Suriname','Colombia'], family: 'Bignoniaceae' },
  { common_name: 'Immortelle',         scientific_name: 'Erythrina micropteryx',     carbon_coeff: 3.0,  native_countries: ['Trinidad and Tobago','Guyana','Venezuela','Colombia'], family: 'Fabaceae' },
  { common_name: 'Silk Cotton',        scientific_name: 'Ceiba pentandra',           carbon_coeff: 6.5,  native_countries: ['Trinidad and Tobago','Guyana','Suriname','Venezuela','Colombia','Panama','Mexico','Belize','Ghana','Nigeria','Cameroon','Ivory Coast'], family: 'Malvaceae' },

  // ── MEXICO / CENTRAL AMERICA ─────────────────────────────────────────
  { common_name: 'Oyamel Fir',         scientific_name: 'Abies religiosa',           carbon_coeff: 3.5,  native_countries: ['Mexico'],                                             family: 'Pinaceae' },
  { common_name: 'Mexican Mahogany',   scientific_name: 'Swietenia macrophylla',     carbon_coeff: 5.8,  native_countries: ['Mexico','Belize','Guatemala','Honduras','Nicaragua','Panama','Colombia','Venezuela','Brazil','Peru','Bolivia'], family: 'Meliaceae' },

  // ── UNITED STATES ────────────────────────────────────────────────────
  { common_name: 'Coast Redwood',      scientific_name: 'Sequoia sempervirens',      carbon_coeff: 9.5,  native_countries: ['United States'],                                      family: 'Cupressaceae' },
  { common_name: 'Douglas Fir',        scientific_name: 'Pseudotsuga menziesii',     carbon_coeff: 5.5,  native_countries: ['United States','Canada'],                             family: 'Pinaceae' },
  { common_name: 'Sugar Maple',        scientific_name: 'Acer saccharum',            carbon_coeff: 3.2,  native_countries: ['United States','Canada'],                             family: 'Sapindaceae' },
  { common_name: 'Northern Red Oak',   scientific_name: 'Quercus rubra',             carbon_coeff: 3.8,  native_countries: ['United States','Canada'],                             family: 'Fagaceae' },
  { common_name: 'White Oak',          scientific_name: 'Quercus alba',              carbon_coeff: 3.5,  native_countries: ['United States'],                                      family: 'Fagaceae' },
  { common_name: 'Tulip Poplar',       scientific_name: 'Liriodendron tulipifera',   carbon_coeff: 4.2,  native_countries: ['United States'],                                      family: 'Magnoliaceae' },
  { common_name: 'Loblolly Pine',      scientific_name: 'Pinus taeda',              carbon_coeff: 3.0,  native_countries: ['United States'],                                      family: 'Pinaceae' },
  { common_name: 'Black Walnut',       scientific_name: 'Juglans nigra',             carbon_coeff: 3.5,  native_countries: ['United States'],                                      family: 'Juglandaceae' },
  { common_name: 'Bald Cypress',       scientific_name: 'Taxodium distichum',        carbon_coeff: 4.0,  native_countries: ['United States'],                                      family: 'Cupressaceae' },
  { common_name: 'American Sycamore',  scientific_name: 'Platanus occidentalis',     carbon_coeff: 4.5,  native_countries: ['United States'],                                      family: 'Platanaceae' },

  // ── CANADA ───────────────────────────────────────────────────────────
  { common_name: 'Black Spruce',       scientific_name: 'Picea mariana',             carbon_coeff: 2.0,  native_countries: ['Canada','United States'],                             family: 'Pinaceae' },
  { common_name: 'Balsam Fir',         scientific_name: 'Abies balsamea',            carbon_coeff: 2.5,  native_countries: ['Canada','United States'],                             family: 'Pinaceae' },
  { common_name: 'Trembling Aspen',    scientific_name: 'Populus tremuloides',       carbon_coeff: 2.8,  native_countries: ['Canada','United States'],                             family: 'Salicaceae' },
  { common_name: 'White Birch',        scientific_name: 'Betula papyrifera',         carbon_coeff: 2.2,  native_countries: ['Canada','United States'],                             family: 'Betulaceae' },
  { common_name: 'Western Red Cedar',  scientific_name: 'Thuja plicata',             carbon_coeff: 4.0,  native_countries: ['Canada','United States'],                             family: 'Cupressaceae' },

  // ── UNITED KINGDOM ───────────────────────────────────────────────────
  { common_name: 'English Oak',        scientific_name: 'Quercus robur',             carbon_coeff: 2.8,  native_countries: ['United Kingdom','Ireland','France','Germany','Spain','Italy','Poland','Romania'], family: 'Fagaceae' },
  { common_name: 'Common Ash',         scientific_name: 'Fraxinus excelsior',        carbon_coeff: 2.5,  native_countries: ['United Kingdom','Ireland','France','Germany','Poland','Scandinavia'], family: 'Oleaceae' },
  { common_name: 'European Beech',     scientific_name: 'Fagus sylvatica',           carbon_coeff: 3.0,  native_countries: ['United Kingdom','France','Germany','Switzerland','Austria','Italy','Czech Republic','Poland'], family: 'Fagaceae' },
  { common_name: 'Silver Birch',       scientific_name: 'Betula pendula',            carbon_coeff: 2.0,  native_countries: ['United Kingdom','Ireland','Germany','France','Poland','Russia','Sweden','Norway','Finland'], family: 'Betulaceae' },
  { common_name: 'Scots Pine',         scientific_name: 'Pinus sylvestris',          carbon_coeff: 2.5,  native_countries: ['United Kingdom','Scotland','Sweden','Norway','Finland','Russia','Germany','Poland','Spain'], family: 'Pinaceae' },
  { common_name: 'Common Alder',       scientific_name: 'Alnus glutinosa',           carbon_coeff: 2.2,  native_countries: ['United Kingdom','Ireland','France','Germany','Italy','Spain','Poland'], family: 'Betulaceae' },
  { common_name: 'Hawthorn',           scientific_name: 'Crataegus monogyna',        carbon_coeff: 1.2,  native_countries: ['United Kingdom','Ireland','France','Germany','Spain','Italy'], family: 'Rosaceae' },
  { common_name: 'Rowan',              scientific_name: 'Sorbus aucuparia',          carbon_coeff: 1.5,  native_countries: ['United Kingdom','Ireland','France','Germany','Sweden','Norway','Finland'], family: 'Rosaceae' },

  // ── GERMANY / CENTRAL EUROPE ─────────────────────────────────────────
  { common_name: 'Norway Spruce',      scientific_name: 'Picea abies',               carbon_coeff: 2.8,  native_countries: ['Germany','Austria','Switzerland','Czech Republic','Slovakia','Poland','Sweden','Norway','Finland','Russia'], family: 'Pinaceae' },
  { common_name: 'European Larch',     scientific_name: 'Larix decidua',             carbon_coeff: 2.5,  native_countries: ['Germany','Austria','Switzerland','Italy','Poland','Czech Republic'], family: 'Pinaceae' },
  { common_name: 'Silver Fir',         scientific_name: 'Abies alba',                carbon_coeff: 3.2,  native_countries: ['Germany','France','Switzerland','Austria','Italy','Spain','Poland'], family: 'Pinaceae' },
  { common_name: 'Small-leaved Lime',  scientific_name: 'Tilia cordata',             carbon_coeff: 2.0,  native_countries: ['Germany','France','United Kingdom','Poland','Czech Republic','Sweden'], family: 'Malvaceae' },

  // ── FRANCE / SPAIN / ITALY ───────────────────────────────────────────
  { common_name: 'Maritime Pine',      scientific_name: 'Pinus pinaster',            carbon_coeff: 2.8,  native_countries: ['France','Spain','Portugal','Morocco'],                family: 'Pinaceae' },
  { common_name: 'Cork Oak',           scientific_name: 'Quercus suber',             carbon_coeff: 2.5,  native_countries: ['Spain','Portugal','France','Italy','Morocco','Algeria','Tunisia'], family: 'Fagaceae' },
  { common_name: 'Stone Pine',         scientific_name: 'Pinus pinea',               carbon_coeff: 2.2,  native_countries: ['Spain','Portugal','Italy','France','Turkey'],          family: 'Pinaceae' },
  { common_name: 'Italian Cypress',    scientific_name: 'Cupressus sempervirens',    carbon_coeff: 2.0,  native_countries: ['Italy','Spain','France','Greece','Turkey','Israel','Iran','Syria'], family: 'Cupressaceae' },
  { common_name: 'Chestnut',           scientific_name: 'Castanea sativa',           carbon_coeff: 2.8,  native_countries: ['France','Italy','Spain','Portugal','Greece','Turkey'], family: 'Fagaceae' },

  // ── RUSSIA / SIBERIA ─────────────────────────────────────────────────
  { common_name: 'Siberian Larch',     scientific_name: 'Larix sibirica',            carbon_coeff: 2.8,  native_countries: ['Russia','Kazakhstan','Mongolia'],                     family: 'Pinaceae' },
  { common_name: 'Siberian Pine',      scientific_name: 'Pinus sibirica',            carbon_coeff: 3.0,  native_countries: ['Russia','Mongolia','Kazakhstan'],                     family: 'Pinaceae' },

  // ── INDIA ────────────────────────────────────────────────────────────
  { common_name: 'Teak',               scientific_name: 'Tectona grandis',           carbon_coeff: 5.5,  native_countries: ['India','Myanmar','Thailand','Laos','Vietnam','Indonesia','Bangladesh'], family: 'Lamiaceae' },
  { common_name: 'Banyan',             scientific_name: 'Ficus benghalensis',        carbon_coeff: 4.8,  native_countries: ['India','Sri Lanka','Bangladesh','Nepal','Pakistan'],  family: 'Moraceae' },
  { common_name: 'Neem',               scientific_name: 'Azadirachta indica',        carbon_coeff: 3.5,  native_countries: ['India','Sri Lanka','Bangladesh','Nepal','Pakistan','Myanmar','Thailand'], family: 'Meliaceae' },
  { common_name: 'Peepal / Sacred Fig',scientific_name: 'Ficus religiosa',           carbon_coeff: 4.2,  native_countries: ['India','Sri Lanka','Nepal','Bangladesh','Myanmar','Thailand','Laos','Vietnam'], family: 'Moraceae' },
  { common_name: 'Indian Rosewood',    scientific_name: 'Dalbergia latifolia',       carbon_coeff: 4.5,  native_countries: ['India','Sri Lanka','Indonesia'],                      family: 'Fabaceae' },
  { common_name: 'Sal',                scientific_name: 'Shorea robusta',            carbon_coeff: 5.0,  native_countries: ['India','Nepal','Bangladesh','Bhutan'],                family: 'Dipterocarpaceae' },
  { common_name: 'Deodar Cedar',       scientific_name: 'Cedrus deodara',            carbon_coeff: 4.5,  native_countries: ['India','Pakistan','Nepal','Afghanistan'],             family: 'Pinaceae' },

  // ── CHINA / JAPAN / KOREA ────────────────────────────────────────────
  { common_name: 'Ginkgo',             scientific_name: 'Ginkgo biloba',             carbon_coeff: 3.0,  native_countries: ['China'],                                              family: 'Ginkgoaceae' },
  { common_name: 'Dawn Redwood',       scientific_name: 'Metasequoia glyptostroboides',carbon_coeff:5.2, native_countries: ['China'],                                              family: 'Cupressaceae' },
  { common_name: 'Chinese Fir',        scientific_name: 'Cunninghamia lanceolata',   carbon_coeff: 4.5,  native_countries: ['China','Vietnam','Laos'],                             family: 'Cupressaceae' },
  { common_name: 'Moso Bamboo',        scientific_name: 'Phyllostachys edulis',      carbon_coeff: 3.5,  native_countries: ['China','Japan','Taiwan','Vietnam'],                   family: 'Poaceae' },
  { common_name: 'Japanese Cedar',     scientific_name: 'Cryptomeria japonica',      carbon_coeff: 4.0,  native_countries: ['Japan','China'],                                      family: 'Cupressaceae' },
  { common_name: 'Japanese Cypress',   scientific_name: 'Chamaecyparis obtusa',      carbon_coeff: 3.5,  native_countries: ['Japan','Taiwan'],                                     family: 'Cupressaceae' },
  { common_name: 'Japanese Cherry',    scientific_name: 'Prunus serrulata',          carbon_coeff: 1.5,  native_countries: ['Japan','China','South Korea','Taiwan'],               family: 'Rosaceae' },
  { common_name: 'Japanese Maple',     scientific_name: 'Acer palmatum',             carbon_coeff: 1.2,  native_countries: ['Japan','South Korea','China'],                        family: 'Sapindaceae' },

  // ── AUSTRALIA / NEW ZEALAND ──────────────────────────────────────────
  { common_name: 'Tasmanian Blue Gum', scientific_name: 'Eucalyptus globulus',       carbon_coeff: 6.0,  native_countries: ['Australia'],                                          family: 'Myrtaceae' },
  { common_name: 'Blackwood Acacia',   scientific_name: 'Acacia melanoxylon',        carbon_coeff: 3.5,  native_countries: ['Australia'],                                          family: 'Fabaceae' },
  { common_name: 'Hoop Pine',          scientific_name: 'Araucaria cunninghamii',    carbon_coeff: 4.2,  native_countries: ['Australia','Papua New Guinea'],                       family: 'Araucariaceae' },
  { common_name: 'Moreton Bay Fig',    scientific_name: 'Ficus macrophylla',         carbon_coeff: 5.5,  native_countries: ['Australia'],                                          family: 'Moraceae' },
  { common_name: 'Golden Wattle',      scientific_name: 'Acacia pycnantha',          carbon_coeff: 1.5,  native_countries: ['Australia'],                                          family: 'Fabaceae' },
  { common_name: 'Kauri',              scientific_name: 'Agathis australis',         carbon_coeff: 6.5,  native_countries: ['New Zealand'],                                        family: 'Araucariaceae' },
  { common_name: 'Rimu',               scientific_name: 'Dacrydium cupressinum',     carbon_coeff: 4.8,  native_countries: ['New Zealand'],                                        family: 'Podocarpaceae' },
  { common_name: 'Pohutukawa',         scientific_name: 'Metrosideros excelsa',      carbon_coeff: 3.0,  native_countries: ['New Zealand'],                                        family: 'Myrtaceae' },
  { common_name: 'Totara',             scientific_name: 'Podocarpus totara',         carbon_coeff: 4.2,  native_countries: ['New Zealand'],                                        family: 'Podocarpaceae' },

  // ── INDONESIA / MALAYSIA / PHILIPPINES ───────────────────────────────
  { common_name: 'Meranti',            scientific_name: 'Shorea leprosula',          carbon_coeff: 7.5,  native_countries: ['Indonesia','Malaysia'],                               family: 'Dipterocarpaceae' },
  { common_name: 'Merbau',             scientific_name: 'Intsia palembanica',        carbon_coeff: 7.0,  native_countries: ['Indonesia','Malaysia','Philippines','Papua New Guinea'], family: 'Fabaceae' },
  { common_name: 'Ironwood',           scientific_name: 'Eusideroxylon zwageri',     carbon_coeff: 8.0,  native_countries: ['Indonesia','Malaysia'],                               family: 'Lauraceae' },
  { common_name: 'Narra',              scientific_name: 'Pterocarpus indicus',       carbon_coeff: 5.5,  native_countries: ['Philippines','Indonesia','Malaysia','Papua New Guinea','Vietnam'], family: 'Fabaceae' },
  { common_name: 'Molave',             scientific_name: 'Vitex parviflora',          carbon_coeff: 5.0,  native_countries: ['Philippines','Indonesia','Malaysia'],                 family: 'Lamiaceae' },
  { common_name: 'Durian',             scientific_name: 'Durio zibethinus',          carbon_coeff: 4.0,  native_countries: ['Indonesia','Malaysia','Thailand','Philippines'],      family: 'Malvaceae' },

  // ── SOUTH-EAST ASIA / VIETNAM / THAILAND / MYANMAR ───────────────────
  { common_name: 'Padauk',             scientific_name: 'Pterocarpus macrocarpus',   carbon_coeff: 5.8,  native_countries: ['Myanmar','Thailand','Laos','Vietnam','Cambodia'],    family: 'Fabaceae' },
  { common_name: 'Pyinkado',           scientific_name: 'Xylia xylocarpa',           carbon_coeff: 6.0,  native_countries: ['Myanmar','Thailand','Laos','India'],                  family: 'Fabaceae' },

  // ── SRI LANKA ─────────────────────────────────────────────────────────
  { common_name: 'Ceylon Ebony',       scientific_name: 'Diospyros ebenum',          carbon_coeff: 5.5,  native_countries: ['Sri Lanka','India'],                                  family: 'Ebenaceae' },
  { common_name: 'Ironwood (Na)',       scientific_name: 'Mesua ferrea',              carbon_coeff: 5.0,  native_countries: ['Sri Lanka','India','Myanmar','Thailand','Malaysia'],  family: 'Calophyllaceae' },

  // ── AFRICA (WEST/CENTRAL) ────────────────────────────────────────────
  { common_name: 'African Mahogany',   scientific_name: 'Khaya anthotheca',          carbon_coeff: 6.5,  native_countries: ['Nigeria','Ghana','Cameroon','Ivory Coast','DR Congo','Gabon','Congo','Sierra Leone','Liberia','Equatorial Guinea'], family: 'Meliaceae' },
  { common_name: 'Iroko',              scientific_name: 'Milicia excelsa',           carbon_coeff: 7.0,  native_countries: ['Nigeria','Ghana','Cameroon','Ivory Coast','DR Congo','Tanzania','Uganda','Kenya','Sierra Leone'], family: 'Moraceae' },
  { common_name: 'Sapele',             scientific_name: 'Entandrophragma cylindricum',carbon_coeff:6.8, native_countries: ['Cameroon','Nigeria','DR Congo','Gabon','Congo','Ivory Coast','Ghana','Uganda'], family: 'Meliaceae' },
  { common_name: 'Wenge',              scientific_name: 'Millettia laurentii',       carbon_coeff: 6.5,  native_countries: ['DR Congo','Congo','Cameroon','Gabon','Equatorial Guinea'], family: 'Fabaceae' },
  { common_name: 'African Teak',       scientific_name: 'Pericopsis elata',          carbon_coeff: 6.2,  native_countries: ['DR Congo','Cameroon','Nigeria','Ghana','Ivory Coast'],family: 'Fabaceae' },
  { common_name: 'Ebony',              scientific_name: 'Diospyros crassiflora',     carbon_coeff: 5.5,  native_countries: ['Cameroon','Nigeria','Gabon','Equatorial Guinea','DR Congo'], family: 'Ebenaceae' },
  { common_name: 'Obeche',             scientific_name: 'Triplochiton scleroxylon',  carbon_coeff: 5.0,  native_countries: ['Nigeria','Ghana','Cameroon','Ivory Coast','DR Congo'], family: 'Malvaceae' },
  { common_name: 'Oil Palm',           scientific_name: 'Elaeis guineensis',         carbon_coeff: 3.5,  native_countries: ['Nigeria','Ghana','Cameroon','Ivory Coast','DR Congo','Gabon','Liberia','Sierra Leone'], family: 'Arecaceae' },
  { common_name: 'Baobab',             scientific_name: 'Adansonia digitata',        carbon_coeff: 8.5,  native_countries: ['Nigeria','Senegal','Gambia','Mali','Niger','Chad','Sudan','Ethiopia','Kenya','Tanzania','Mozambique','Zimbabwe','Botswana','South Africa','Namibia','Madagascar'], family: 'Malvaceae' },

  // ── AFRICA (EAST) ────────────────────────────────────────────────────
  { common_name: 'Mninga / Bloodwood', scientific_name: 'Pterocarpus angolensis',    carbon_coeff: 5.5,  native_countries: ['Tanzania','Mozambique','Zambia','Zimbabwe','Malawi','Angola','South Africa'], family: 'Fabaceae' },
  { common_name: 'Pencil Cedar',       scientific_name: 'Juniperus procera',         carbon_coeff: 3.5,  native_countries: ['Kenya','Ethiopia','Tanzania','Uganda','Rwanda'],     family: 'Cupressaceae' },
  { common_name: 'Croton Tree',        scientific_name: 'Croton megalocarpus',       carbon_coeff: 4.0,  native_countries: ['Kenya','Tanzania','Uganda','Ethiopia'],              family: 'Euphorbiaceae' },
  { common_name: 'Coffee Tree',        scientific_name: 'Coffea arabica',            carbon_coeff: 1.5,  native_countries: ['Ethiopia','Kenya','Tanzania','Uganda'],              family: 'Rubiaceae' },

  // ── SOUTH AFRICA / ZIMBABWE ──────────────────────────────────────────
  { common_name: 'Real Yellowwood',    scientific_name: 'Podocarpus latifolius',     carbon_coeff: 4.5,  native_countries: ['South Africa','Eswatini','Zimbabwe','Mozambique'],  family: 'Podocarpaceae' },
  { common_name: 'Marula',             scientific_name: 'Sclerocarya birrea',        carbon_coeff: 3.8,  native_countries: ['South Africa','Botswana','Namibia','Zimbabwe','Mozambique','Tanzania','Malawi','Zambia'], family: 'Anacardiaceae' },
  { common_name: 'Mopane',             scientific_name: 'Colophospermum mopane',     carbon_coeff: 4.2,  native_countries: ['Zimbabwe','Botswana','Namibia','South Africa','Mozambique','Zambia','Malawi'], family: 'Fabaceae' },
  { common_name: 'Zimbabwe Teak',      scientific_name: 'Baikiaea plurijuga',        carbon_coeff: 6.0,  native_countries: ['Zimbabwe','Zambia','Botswana','Namibia','Angola'], family: 'Fabaceae' },

  // ── MOROCCO / NORTH AFRICA ───────────────────────────────────────────
  { common_name: 'Atlas Cedar',        scientific_name: 'Cedrus atlantica',          carbon_coeff: 4.5,  native_countries: ['Morocco','Algeria'],                                  family: 'Pinaceae' },
  { common_name: 'Argan Tree',         scientific_name: 'Argania spinosa',           carbon_coeff: 2.5,  native_countries: ['Morocco'],                                            family: 'Sapotaceae' },
  { common_name: 'Date Palm',          scientific_name: 'Phoenix dactylifera',       carbon_coeff: 2.2,  native_countries: ['Egypt','Morocco','Algeria','Tunisia','Libya','Sudan','Saudi Arabia','Iraq','Iran','Oman'], family: 'Arecaceae' },

  // ── TURKEY / MIDDLE EAST ─────────────────────────────────────────────
  { common_name: 'Oriental Plane',     scientific_name: 'Platanus orientalis',       carbon_coeff: 4.0,  native_countries: ['Turkey','Greece','Albania','Iran','Lebanon'],         family: 'Platanaceae' },
  { common_name: 'Cedar of Lebanon',   scientific_name: 'Cedrus libani',             carbon_coeff: 4.5,  native_countries: ['Lebanon','Syria','Turkey'],                           family: 'Pinaceae' },
  { common_name: 'Olive',              scientific_name: 'Olea europaea',             carbon_coeff: 1.8,  native_countries: ['Israel','Palestine','Lebanon','Jordan','Turkey','Greece','Italy','Spain','Portugal','Morocco','Algeria','Tunisia','Egypt'], family: 'Oleaceae' },
  { common_name: 'Carob',              scientific_name: 'Ceratonia siliqua',         carbon_coeff: 2.0,  native_countries: ['Israel','Palestine','Lebanon','Turkey','Greece','Italy','Spain','Portugal','Morocco'], family: 'Fabaceae' },

  // ── NEPAL / BHUTAN ────────────────────────────────────────────────────
  { common_name: 'Rhododendron',       scientific_name: 'Rhododendron arboreum',     carbon_coeff: 2.0,  native_countries: ['Nepal','Bhutan','India','Sri Lanka','Myanmar'],      family: 'Ericaceae' },
  { common_name: 'Blue Pine',          scientific_name: 'Pinus wallichiana',         carbon_coeff: 3.0,  native_countries: ['Nepal','Bhutan','India','Pakistan','Afghanistan'],   family: 'Pinaceae' },

  // ── MADAGASCAR ────────────────────────────────────────────────────────
  { common_name: 'Traveller\'s Palm',  scientific_name: 'Ravenala madagascariensis', carbon_coeff: 3.5,  native_countries: ['Madagascar'],                                         family: 'Strelitziaceae' },
  { common_name: 'Rosewood',           scientific_name: 'Dalbergia maritima',        carbon_coeff: 5.5,  native_countries: ['Madagascar'],                                         family: 'Fabaceae' },

  // ── PAPUA NEW GUINEA ──────────────────────────────────────────────────
  { common_name: 'PNG Kauri',          scientific_name: 'Agathis robusta',           carbon_coeff: 6.5,  native_countries: ['Papua New Guinea','Australia'],                       family: 'Araucariaceae' },

  // ── IRELAND / SCANDINAVIA ────────────────────────────────────────────
  { common_name: 'Sessile Oak',        scientific_name: 'Quercus petraea',           carbon_coeff: 2.8,  native_countries: ['Ireland','United Kingdom','France','Germany','Spain','Norway','Sweden'], family: 'Fagaceae' },
  { common_name: 'Norway Maple',       scientific_name: 'Acer platanoides',          carbon_coeff: 2.2,  native_countries: ['Norway','Sweden','Finland','Germany','Poland','Czech Republic','Austria'], family: 'Sapindaceae' },
]

  // ── FRUIT TREES — TROPICAL AMERICAS (inc. GUYANA) ───────────────────
  { common_name: 'Soursop',            scientific_name: 'Annona muricata',           carbon_coeff: 2.2,  native_countries: ['Guyana','Suriname','Trinidad and Tobago','Venezuela','Colombia','Brazil','Panama','Nicaragua','Costa Rica','Jamaica','Dominican Republic','Haiti'], family: 'Annonaceae' },
  { common_name: 'Sugar Apple',        scientific_name: 'Annona squamosa',           carbon_coeff: 1.8,  native_countries: ['Guyana','Suriname','Trinidad and Tobago','Venezuela','Colombia','Brazil','Jamaica','Dominican Republic','Haiti','Mexico','Belize'], family: 'Annonaceae' },
  { common_name: 'Cannonball Tree',    scientific_name: 'Couroupita guianensis',     carbon_coeff: 5.0,  native_countries: ['Guyana','Suriname','Venezuela','Colombia','Brazil','Trinidad and Tobago'], family: 'Lecythidaceae' },
  { common_name: 'Genip / Guinep',     scientific_name: 'Melicoccus bijugatus',      carbon_coeff: 3.5,  native_countries: ['Guyana','Suriname','Trinidad and Tobago','Venezuela','Colombia','Panama','Jamaica','Dominican Republic','Haiti','Belize'], family: 'Sapindaceae' },
  { common_name: 'Hog Plum',          scientific_name: 'Spondias mombin',           carbon_coeff: 3.2,  native_countries: ['Guyana','Suriname','Trinidad and Tobago','Venezuela','Colombia','Brazil','Panama','Mexico','Belize','Costa Rica','Nicaragua','Jamaica'], family: 'Anacardiaceae' },
  { common_name: 'Calabash Tree',     scientific_name: 'Crescentia cujete',         carbon_coeff: 2.5,  native_countries: ['Guyana','Suriname','Venezuela','Colombia','Panama','Mexico','Belize','Costa Rica','Nicaragua'], family: 'Bignoniaceae' },
  { common_name: 'Cashew',            scientific_name: 'Anacardium occidentale',    carbon_coeff: 2.8,  native_countries: ['Brazil','Guyana','Suriname','Venezuela','Colombia','Trinidad and Tobago','Panama','Mexico'], family: 'Anacardiaceae' },
  { common_name: 'Guava',             scientific_name: 'Psidium guajava',           carbon_coeff: 1.8,  native_countries: ['Guyana','Suriname','Trinidad and Tobago','Venezuela','Colombia','Brazil','Jamaica','Dominican Republic','Haiti','Mexico','Belize','Panama','Costa Rica'], family: 'Myrtaceae' },
  { common_name: 'Papaya',            scientific_name: 'Carica papaya',             carbon_coeff: 1.2,  native_countries: ['Guyana','Suriname','Venezuela','Colombia','Brazil','Trinidad and Tobago','Panama','Mexico','Belize','Costa Rica','Nicaragua'], family: 'Caricaceae' },
  { common_name: 'Avocado',           scientific_name: 'Persea americana',          carbon_coeff: 3.0,  native_countries: ['Mexico','Guatemala','Belize','Honduras','Nicaragua','Costa Rica','Panama','Colombia','Venezuela','Guyana','Suriname','Brazil','Peru','Ecuador'], family: 'Lauraceae' },
  { common_name: 'Sapodilla',         scientific_name: 'Manilkara zapota',          carbon_coeff: 3.5,  native_countries: ['Mexico','Belize','Guatemala','Honduras','Nicaragua','Costa Rica','Panama','Colombia','Venezuela','Guyana','Trinidad and Tobago'], family: 'Sapotaceae' },
  { common_name: 'Mamey Sapote',      scientific_name: 'Pouteria sapota',           carbon_coeff: 3.2,  native_countries: ['Mexico','Guatemala','Belize','Honduras','Nicaragua','Costa Rica','Panama','Colombia','Venezuela','Guyana','Trinidad and Tobago','Jamaica','Dominican Republic'], family: 'Sapotaceae' },
  { common_name: 'Star Apple',        scientific_name: 'Chrysophyllum cainito',     carbon_coeff: 3.8,  native_countries: ['Trinidad and Tobago','Jamaica','Guyana','Suriname','Venezuela','Panama','Nicaragua','Costa Rica','Colombia'], family: 'Sapotaceae' },
  { common_name: 'Breadfruit',        scientific_name: 'Artocarpus altilis',        carbon_coeff: 4.5,  native_countries: ['Guyana','Trinidad and Tobago','Jamaica','Dominican Republic','Haiti','Belize','Panama'], family: 'Moraceae' },
  { common_name: 'Coconut Palm',      scientific_name: 'Cocos nucifera',            carbon_coeff: 2.5,  native_countries: ['Guyana','Suriname','Trinidad and Tobago','Venezuela','Colombia','Brazil','Panama','Costa Rica','Nicaragua','Belize','Jamaica','Dominican Republic','Haiti','India','Sri Lanka','Indonesia','Malaysia','Philippines','Thailand','Myanmar','Vietnam','Papua New Guinea','Fiji','Samoa','Tonga','Kiribati'], family: 'Arecaceae' },

  // ── FLOWERING TREES — TROPICAL AMERICAS ──────────────────────────────
  { common_name: 'Royal Poinciana',   scientific_name: 'Delonix regia',             carbon_coeff: 4.0,  native_countries: ['Madagascar'],                                          family: 'Fabaceae' },
  { common_name: 'Frangipani',        scientific_name: 'Plumeria rubra',            carbon_coeff: 1.5,  native_countries: ['Mexico','Guatemala','Nicaragua','Costa Rica','Panama','Colombia','Venezuela','Guyana','Trinidad and Tobago'], family: 'Apocynaceae' },
  { common_name: 'African Tulip Tree',scientific_name: 'Spathodea campanulata',     carbon_coeff: 4.2,  native_countries: ['Uganda','Kenya','Tanzania','Nigeria','Ghana','Cameroon','DR Congo','Gabon','Ivory Coast'], family: 'Bignoniaceae' },
  { common_name: 'Yellow Trumpet Tree',scientific_name:'Handroanthus impetiginosus',carbon_coeff: 3.5,  native_countries: ['Argentina','Bolivia','Paraguay','Brazil','Peru','Ecuador','Colombia','Venezuela','Guyana','Suriname'], family: 'Bignoniaceae' },
  { common_name: 'Pink Trumpet Tree', scientific_name: 'Tabebuia rosea',            carbon_coeff: 3.2,  native_countries: ['Panama','Colombia','Venezuela','Guyana','Suriname','Trinidad and Tobago','Costa Rica','Nicaragua','Mexico'], family: 'Bignoniaceae' },

  // ── FRUIT TREES — INDIA / SOUTH ASIA ─────────────────────────────────
  { common_name: 'Mango',             scientific_name: 'Mangifera indica',          carbon_coeff: 4.0,  native_countries: ['India','Bangladesh','Myanmar','Thailand','Malaysia','Indonesia','Philippines','Sri Lanka','Nepal','Pakistan','Vietnam','Laos','Cambodia'], family: 'Anacardiaceae' },
  { common_name: 'Jackfruit',         scientific_name: 'Artocarpus heterophyllus',  carbon_coeff: 3.8,  native_countries: ['India','Sri Lanka','Bangladesh','Myanmar','Thailand','Malaysia','Indonesia','Philippines','Vietnam'], family: 'Moraceae' },
  { common_name: 'Jamun / Java Plum', scientific_name: 'Syzygium cumini',           carbon_coeff: 3.2,  native_countries: ['India','Sri Lanka','Bangladesh','Nepal','Pakistan','Myanmar','Thailand','Malaysia','Indonesia'], family: 'Myrtaceae' },
  { common_name: 'Amla / Indian Gooseberry',scientific_name:'Phyllanthus emblica',  carbon_coeff: 1.8,  native_countries: ['India','Sri Lanka','Bangladesh','Nepal','Pakistan','Myanmar','Thailand','China'], family: 'Phyllanthaceae' },
  { common_name: 'Moringa',           scientific_name: 'Moringa oleifera',          carbon_coeff: 1.5,  native_countries: ['India','Sri Lanka','Pakistan','Nepal','Bangladesh','Ethiopia','Kenya','Tanzania','Nigeria','Ghana','Senegal','Cameroon'], family: 'Moringaceae' },
  { common_name: 'Curry Leaf Tree',   scientific_name: 'Murraya koenigii',          carbon_coeff: 0.8,  native_countries: ['India','Sri Lanka','Bangladesh','Nepal','Myanmar'], family: 'Rutaceae' },
  { common_name: 'Tamarind',          scientific_name: 'Tamarindus indica',         carbon_coeff: 3.5,  native_countries: ['India','Sri Lanka','Bangladesh','Myanmar','Thailand','Malaysia','Indonesia','Nigeria','Ghana','Senegal','Kenya','Tanzania','Ethiopia'], family: 'Fabaceae' },
  { common_name: 'Indian Plum / Ber', scientific_name: 'Ziziphus mauritiana',       carbon_coeff: 1.5,  native_countries: ['India','Pakistan','Sri Lanka','Bangladesh','Nepal','Myanmar','Thailand','Kenya','Ethiopia','Nigeria'], family: 'Rhamnaceae' },

  // ── FLOWERING TREES — INDIA / SOUTH ASIA ─────────────────────────────
  { common_name: 'Flame of the Forest',scientific_name:'Butea monosperma',          carbon_coeff: 2.5,  native_countries: ['India','Sri Lanka','Bangladesh','Nepal','Myanmar','Thailand'], family: 'Fabaceae' },
  { common_name: 'Gulmohar / Flamboyant',scientific_name:'Delonix regia',           carbon_coeff: 4.0,  native_countries: ['Madagascar'],                                          family: 'Fabaceae' },
  { common_name: 'Indian Coral Tree', scientific_name: 'Erythrina variegata',       carbon_coeff: 2.2,  native_countries: ['India','Sri Lanka','Bangladesh','Myanmar','Thailand','Malaysia','Indonesia','Philippines'], family: 'Fabaceae' },
  { common_name: 'Champak',           scientific_name: 'Magnolia champaca',         carbon_coeff: 3.0,  native_countries: ['India','Sri Lanka','Bangladesh','Myanmar','Thailand','Malaysia','Indonesia','Vietnam','China'], family: 'Magnoliaceae' },
  { common_name: 'Ashoka Tree',       scientific_name: 'Saraca asoca',              carbon_coeff: 2.5,  native_countries: ['India','Sri Lanka','Bangladesh','Nepal','Myanmar'], family: 'Fabaceae' },

  // ── FRUIT TREES — AFRICA ─────────────────────────────────────────────
  { common_name: 'African Star Apple',scientific_name: 'Chrysophyllum albidum',     carbon_coeff: 4.2,  native_countries: ['Nigeria','Ghana','Cameroon','Ivory Coast','Senegal','Guinea','Sierra Leone','Liberia','Benin','Togo'], family: 'Sapotaceae' },
  { common_name: 'Shea Tree',         scientific_name: 'Vitellaria paradoxa',       carbon_coeff: 3.8,  native_countries: ['Nigeria','Ghana','Senegal','Mali','Burkina Faso','Niger','Ivory Coast','Cameroon','Uganda','Kenya','Tanzania'], family: 'Sapotaceae' },
  { common_name: 'African Locust Bean',scientific_name:'Parkia biglobosa',          carbon_coeff: 4.5,  native_countries: ['Nigeria','Ghana','Senegal','Mali','Burkina Faso','Niger','Ivory Coast','Guinea','Sierra Leone','Liberia','Cameroon'], family: 'Fabaceae' },
  { common_name: 'Wild Fig (Africa)', scientific_name: 'Ficus sycomorus',           carbon_coeff: 4.0,  native_countries: ['Ethiopia','Kenya','Tanzania','Uganda','Nigeria','Ghana','Cameroon','Sudan','Egypt','Mozambique','Zimbabwe','South Africa'], family: 'Moraceae' },
  { common_name: 'Sausage Tree',      scientific_name: 'Kigelia africana',          carbon_coeff: 4.5,  native_countries: ['Nigeria','Ghana','Cameroon','Kenya','Tanzania','Uganda','Zimbabwe','Zambia','Mozambique','South Africa','Malawi','Botswana','Namibia'], family: 'Bignoniaceae' },
  { common_name: 'Desert Date',       scientific_name: 'Balanites aegyptiaca',      carbon_coeff: 2.2,  native_countries: ['Nigeria','Senegal','Mali','Burkina Faso','Niger','Chad','Sudan','Ethiopia','Kenya','Tanzania','Egypt'], family: 'Zygophyllaceae' },
  { common_name: 'Neem (Africa)',      scientific_name: 'Azadirachta indica',        carbon_coeff: 3.5,  native_countries: ['Nigeria','Ghana','Senegal','Mali','Burkina Faso','Niger','Cameroon','Kenya','Tanzania','Ethiopia','Uganda'], family: 'Meliaceae' },

  // ── FLOWERING TREES — AFRICA ──────────────────────────────────────────
  { common_name: 'Nandi Flame',       scientific_name: 'Markhamia lutea',           carbon_coeff: 2.5,  native_countries: ['Kenya','Uganda','Tanzania','Rwanda','Ethiopia'], family: 'Bignoniaceae' },
  { common_name: 'Cape Chestnut',     scientific_name: 'Calodendrum capense',       carbon_coeff: 3.0,  native_countries: ['South Africa','Zimbabwe','Mozambique','Tanzania','Kenya'], family: 'Rutaceae' },
  { common_name: 'Coral Tree',        scientific_name: 'Erythrina lysistemon',      carbon_coeff: 2.0,  native_countries: ['South Africa','Zimbabwe','Mozambique','Tanzania','Kenya','Eswatini'], family: 'Fabaceae' },
  { common_name: 'Lucky Bean Tree',   scientific_name: 'Erythrina caffra',          carbon_coeff: 2.5,  native_countries: ['South Africa','Eswatini','Mozambique'],              family: 'Fabaceae' },

  // ── FRUIT TREES — SOUTH-EAST ASIA ────────────────────────────────────
  { common_name: 'Rambutan',          scientific_name: 'Nephelium lappaceum',       carbon_coeff: 3.0,  native_countries: ['Malaysia','Indonesia','Thailand','Philippines','Vietnam','Laos','Cambodia','Myanmar'], family: 'Sapindaceae' },
  { common_name: 'Mangosteen',        scientific_name: 'Garcinia mangostana',       carbon_coeff: 2.8,  native_countries: ['Malaysia','Indonesia','Thailand','Philippines'],     family: 'Clusiaceae' },
  { common_name: 'Longan',            scientific_name: 'Dimocarpus longan',         carbon_coeff: 2.5,  native_countries: ['China','Thailand','Vietnam','Malaysia','Indonesia','Philippines','Laos','Myanmar'], family: 'Sapindaceae' },
  { common_name: 'Lychee',            scientific_name: 'Litchi chinensis',          carbon_coeff: 2.2,  native_countries: ['China','Vietnam','Thailand','Malaysia','Indonesia','Philippines'], family: 'Sapindaceae' },
  { common_name: 'Pomelo',            scientific_name: 'Citrus maxima',             carbon_coeff: 1.8,  native_countries: ['Malaysia','Indonesia','Thailand','Philippines','Vietnam','China'], family: 'Rutaceae' },
  { common_name: 'Salak / Snake Fruit',scientific_name:'Salacca zalacca',           carbon_coeff: 1.2,  native_countries: ['Indonesia','Malaysia'],                               family: 'Arecaceae' },

  // ── FLOWERING TREES — SOUTH-EAST ASIA ────────────────────────────────
  { common_name: 'Ylang-ylang',       scientific_name: 'Cananga odorata',           carbon_coeff: 3.5,  native_countries: ['Philippines','Indonesia','Malaysia','Thailand','Myanmar','Vietnam'], family: 'Annonaceae' },
  { common_name: 'Temple Tree',       scientific_name: 'Plumeria obtusa',           carbon_coeff: 1.2,  native_countries: ['Philippines','Indonesia','Malaysia','Thailand','Myanmar','Vietnam','Laos','Cambodia'], family: 'Apocynaceae' },

  // ── FRUIT TREES — UK / EUROPE ─────────────────────────────────────────
  { common_name: 'Crab Apple',        scientific_name: 'Malus sylvestris',          carbon_coeff: 1.2,  native_countries: ['United Kingdom','Ireland','France','Germany','Spain','Italy','Poland','Czech Republic','Romania'], family: 'Rosaceae' },
  { common_name: 'Wild Cherry',       scientific_name: 'Prunus avium',              carbon_coeff: 2.0,  native_countries: ['United Kingdom','Ireland','France','Germany','Spain','Italy','Poland','Czech Republic','Romania','Turkey'], family: 'Rosaceae' },
  { common_name: 'Blackthorn / Sloe', scientific_name: 'Prunus spinosa',            carbon_coeff: 0.8,  native_countries: ['United Kingdom','Ireland','France','Germany','Spain','Italy','Poland','Czech Republic'], family: 'Rosaceae' },
  { common_name: 'Elder',             scientific_name: 'Sambucus nigra',            carbon_coeff: 0.8,  native_countries: ['United Kingdom','Ireland','France','Germany','Spain','Italy','Poland','Sweden','Norway'], family: 'Adoxaceae' },
  { common_name: 'Wild Pear',         scientific_name: 'Pyrus communis',            carbon_coeff: 1.5,  native_countries: ['France','Germany','Spain','Italy','Czech Republic','Romania','Turkey','Iran'], family: 'Rosaceae' },
  { common_name: 'Sweet Chestnut',    scientific_name: 'Castanea sativa',           carbon_coeff: 2.8,  native_countries: ['United Kingdom','France','Germany','Spain','Portugal','Italy','Greece','Turkey'], family: 'Fagaceae' },
  { common_name: 'Walnut',            scientific_name: 'Juglans regia',             carbon_coeff: 2.5,  native_countries: ['France','Germany','Spain','Italy','Greece','Turkey','Iran','Romania','Serbia'], family: 'Juglandaceae' },

  // ── FLOWERING TREES — EUROPE ──────────────────────────────────────────
  { common_name: 'Common Lilac',      scientific_name: 'Syringa vulgaris',          carbon_coeff: 0.8,  native_countries: ['Serbia','North Macedonia','Albania','Greece','Romania','Bulgaria'], family: 'Oleaceae' },
  { common_name: 'Judas Tree',        scientific_name: 'Cercis siliquastrum',       carbon_coeff: 1.5,  native_countries: ['Turkey','Greece','Italy','Spain','Lebanon','Israel'], family: 'Fabaceae' },
  { common_name: 'Common Laburnum',   scientific_name: 'Laburnum anagyroides',      carbon_coeff: 1.0,  native_countries: ['France','Germany','Switzerland','Austria','Italy','Czech Republic'], family: 'Fabaceae' },
  { common_name: 'Cherry Plum',       scientific_name: 'Prunus cerasifera',         carbon_coeff: 1.0,  native_countries: ['Turkey','Romania','Bulgaria','Serbia','Greece'], family: 'Rosaceae' },

  // ── FRUIT TREES — MIDDLE EAST / MEDITERRANEAN ─────────────────────────
  { common_name: 'Fig',               scientific_name: 'Ficus carica',              carbon_coeff: 1.5,  native_countries: ['Turkey','Greece','Italy','Spain','Portugal','Israel','Palestine','Lebanon','Jordan','Iran','Morocco','Algeria','Tunisia'], family: 'Moraceae' },
  { common_name: 'Pomegranate',       scientific_name: 'Punica granatum',           carbon_coeff: 1.2,  native_countries: ['Iran','Turkey','Greece','Israel','Palestine','Lebanon','Jordan','Afghanistan','Pakistan','India'], family: 'Lythraceae' },
  { common_name: 'Almond',            scientific_name: 'Prunus dulcis',             carbon_coeff: 1.2,  native_countries: ['Iran','Turkey','Israel','Jordan','Spain','Italy','Morocco','Algeria'], family: 'Rosaceae' },
  { common_name: 'Pistachio',         scientific_name: 'Pistacia vera',             carbon_coeff: 1.0,  native_countries: ['Iran','Turkey','Syria','Lebanon','Afghanistan','Pakistan'], family: 'Anacardiaceae' },
  { common_name: 'Mulberry',          scientific_name: 'Morus alba',                carbon_coeff: 2.0,  native_countries: ['China','Japan','South Korea','Turkey','Iran','India','Pakistan'], family: 'Moraceae' },

  // ── FRUIT TREES — CHINA / EAST ASIA ──────────────────────────────────
  { common_name: 'Loquat',            scientific_name: 'Eriobotrya japonica',       carbon_coeff: 1.5,  native_countries: ['China','Japan','South Korea','Taiwan','Vietnam'], family: 'Rosaceae' },
  { common_name: 'Wampee',            scientific_name: 'Clausena lansium',          carbon_coeff: 1.2,  native_countries: ['China','Vietnam','Laos','Thailand','Malaysia'], family: 'Rutaceae' },

  // ── FLOWERING TREES — CHINA / JAPAN ───────────────────────────────────
  { common_name: 'Empress Tree',      scientific_name: 'Paulownia tomentosa',       carbon_coeff: 6.5,  native_countries: ['China'],                                              family: 'Paulowniaceae' },
  { common_name: 'Golden Chain Tree', scientific_name: 'Koelreuteria paniculata',   carbon_coeff: 1.5,  native_countries: ['China','Japan','South Korea','Taiwan'],               family: 'Sapindaceae' },
  { common_name: 'Chinese Redbud',    scientific_name: 'Cercis chinensis',          carbon_coeff: 1.2,  native_countries: ['China'],                                              family: 'Fabaceae' },
  { common_name: 'Magnolia',          scientific_name: 'Magnolia sieboldii',        carbon_coeff: 1.5,  native_countries: ['Japan','South Korea','China'],                        family: 'Magnoliaceae' },
  { common_name: 'Wisteria Tree',     scientific_name: 'Wisteria floribunda',       carbon_coeff: 0.8,  native_countries: ['Japan','China'],                                      family: 'Fabaceae' },

  // ── PALMS ─────────────────────────────────────────────────────────────
  { common_name: 'Açaí Palm',         scientific_name: 'Euterpe precatoria',        carbon_coeff: 3.0,  native_countries: ['Brazil','Colombia','Venezuela','Peru','Ecuador','Bolivia','Guyana','Suriname'], family: 'Arecaceae' },
  { common_name: 'Sabal Palm',        scientific_name: 'Sabal palmetto',            carbon_coeff: 1.8,  native_countries: ['United States'],                                      family: 'Arecaceae' },
  { common_name: 'African Fan Palm',  scientific_name: 'Borassus aethiopum',        carbon_coeff: 3.5,  native_countries: ['Senegal','Gambia','Guinea','Guinea-Bissau','Mali','Burkina Faso','Nigeria','Ghana','Cameroon','Ethiopia','Kenya','Tanzania','Uganda','DR Congo'], family: 'Arecaceae' },
  { common_name: 'Coco de Mer',       scientific_name: 'Lodoicea maldivica',        carbon_coeff: 3.0,  native_countries: ['Seychelles'],                                         family: 'Arecaceae' },
  { common_name: 'Talipot Palm',      scientific_name: 'Corypha umbraculifera',     carbon_coeff: 2.5,  native_countries: ['Sri Lanka','India','Myanmar','Thailand','Malaysia'],  family: 'Arecaceae' },

  // ── MEDICINAL / SPECIAL TREES ─────────────────────────────────────────
  { common_name: 'Cinnamon',          scientific_name: 'Cinnamomum verum',          carbon_coeff: 1.8,  native_countries: ['Sri Lanka','India'],                                  family: 'Lauraceae' },
  { common_name: 'Clove Tree',        scientific_name: 'Syzygium aromaticum',       carbon_coeff: 2.5,  native_countries: ['Indonesia'],                                          family: 'Myrtaceae' },
  { common_name: 'Nutmeg',            scientific_name: 'Myristica fragrans',        carbon_coeff: 2.2,  native_countries: ['Indonesia'],                                          family: 'Myristicaceae' },
  { common_name: 'Allspice',          scientific_name: 'Pimenta dioica',            carbon_coeff: 2.0,  native_countries: ['Jamaica','Mexico','Guatemala','Belize'],              family: 'Myrtaceae' },
  { common_name: 'Cacao (Medicinal)', scientific_name: 'Theobroma cacao',           carbon_coeff: 2.8,  native_countries: ['Colombia','Ecuador','Peru','Bolivia','Venezuela','Guyana','Suriname','Brazil','Panama','Costa Rica','Nicaragua','Mexico'], family: 'Malvaceae' },
  { common_name: 'Fever Tree',        scientific_name: 'Vachellia xanthophloea',    carbon_coeff: 3.5,  native_countries: ['Kenya','Tanzania','Uganda','South Africa','Mozambique','Zimbabwe','Zambia'], family: 'Fabaceae' },
  { common_name: 'Dragon Blood Tree', scientific_name: 'Dracaena cinnabari',        carbon_coeff: 1.5,  native_countries: ['Yemen'],                                              family: 'Asparagaceae' },

// Calculate XP from carbon coefficient
// Formula: base 30 + coeff × 14, rounded to nearest 5, capped at 200
export function calcXP(coeff: number): number {
  return Math.min(200, Math.round((30 + coeff * 14) / 5) * 5)
}

// Default XP when no species selected
export const DEFAULT_XP = 25
