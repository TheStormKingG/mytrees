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

// Calculate XP from carbon coefficient
// Formula: base 30 + coeff × 14, rounded to nearest 5, capped at 200
export function calcXP(coeff: number): number {
  return Math.min(200, Math.round((30 + coeff * 14) / 5) * 5)
}

// Default XP when no species selected
export const DEFAULT_XP = 25
