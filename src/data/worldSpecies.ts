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
  { common_name: 'Mango',             scientific_name: 'Mangifera indica',          carbon_coeff: 4.0,  native_countries: ['India','Bangladesh','Myanmar','Thailand','Malaysia','Indonesia','Philippines','Sri Lanka','Nepal','Pakistan','Vietnam','Laos','Cambodia','Guyana','Suriname','Trinidad and Tobago','Jamaica','Barbados','Dominican Republic','Haiti','Belize','Panama','Costa Rica','Nicaragua','Honduras','Guatemala','El Salvador','Cuba','Colombia','Venezuela','Brazil','Peru','Ecuador','Bolivia','Nigeria','Ghana','Kenya','Tanzania','Uganda','Ethiopia','Senegal','Cameroon','Ivory Coast','Mozambique','Zimbabwe','South Africa','Madagascar','Fiji','Samoa','Papua New Guinea','Philippines'], family: 'Anacardiaceae' },
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

  // ── CRITICAL OMISSIONS: SOUTH AMERICA / GUYANA ───────────────────────
  // Pineapple — native to southern Brazil/Paraguay; spread by Amerindians across SA incl. Guyana pre-contact
  { common_name: 'Pineapple',          scientific_name: 'Ananas comosus',            carbon_coeff: 0.4,  native_countries: ['Guyana','Suriname','Venezuela','Colombia','Brazil','Bolivia','Paraguay','Peru','Ecuador','Trinidad and Tobago'], family: 'Bromeliaceae' },
  { common_name: 'Ice Cream Bean',     scientific_name: 'Inga edulis',               carbon_coeff: 3.5,  native_countries: ['Guyana','Suriname','Venezuela','Colombia','Brazil','Peru','Ecuador','Bolivia','Panama','Costa Rica','Nicaragua'], family: 'Fabaceae' },
  { common_name: 'Tonka Bean',         scientific_name: 'Dipteryx odorata',          carbon_coeff: 6.0,  native_countries: ['Guyana','Suriname','Venezuela','Brazil','Colombia','Trinidad and Tobago'], family: 'Fabaceae' },
  { common_name: 'Annatto / Achiote',  scientific_name: 'Bixa orellana',             carbon_coeff: 1.8,  native_countries: ['Guyana','Suriname','Venezuela','Colombia','Brazil','Trinidad and Tobago','Panama','Mexico','Belize','Costa Rica','Nicaragua','Peru','Ecuador','Bolivia'], family: 'Bixaceae' },
  { common_name: 'Acerola / Barbados Cherry', scientific_name: 'Malpighia emarginata', carbon_coeff: 1.2, native_countries: ['Guyana','Suriname','Trinidad and Tobago','Venezuela','Colombia','Brazil','Panama','Mexico','Belize','Jamaica','Dominican Republic','Haiti'], family: 'Malpighiaceae' },
  { common_name: 'Camu Camu',          scientific_name: 'Myrciaria dubia',           carbon_coeff: 1.5,  native_countries: ['Guyana','Suriname','Venezuela','Colombia','Brazil','Peru','Ecuador','Bolivia'], family: 'Myrtaceae' },
  { common_name: 'Bacuri',             scientific_name: 'Platonia insignis',         carbon_coeff: 5.5,  native_countries: ['Guyana','Suriname','Brazil','Venezuela'],               family: 'Clusiaceae' },
  { common_name: 'Murici',             scientific_name: 'Byrsonima crassifolia',     carbon_coeff: 2.5,  native_countries: ['Guyana','Suriname','Venezuela','Colombia','Brazil','Panama','Mexico','Belize','Trinidad and Tobago'], family: 'Malpighiaceae' },
  { common_name: 'Mammee Apple',       scientific_name: 'Mammea americana',          carbon_coeff: 4.0,  native_countries: ['Guyana','Suriname','Trinidad and Tobago','Venezuela','Colombia','Panama','Jamaica','Dominican Republic','Haiti','Belize'], family: 'Calophyllaceae' },
  { common_name: 'Surinam Cherry',     scientific_name: 'Eugenia uniflora',          carbon_coeff: 1.5,  native_countries: ['Guyana','Suriname','Brazil','Venezuela','Colombia','Trinidad and Tobago','Paraguay','Uruguay','Argentina'], family: 'Myrtaceae' },
  { common_name: 'Custard Apple',      scientific_name: 'Annona reticulata',         carbon_coeff: 1.8,  native_countries: ['Guyana','Suriname','Trinidad and Tobago','Venezuela','Colombia','Brazil','Panama','Mexico','Belize','Jamaica','Dominican Republic','Haiti'], family: 'Annonaceae' },
  { common_name: 'Pitanga',            scientific_name: 'Eugenia pitanga',           carbon_coeff: 1.2,  native_countries: ['Brazil','Guyana','Suriname','Venezuela','Colombia','Paraguay','Argentina','Uruguay'], family: 'Myrtaceae' },
  { common_name: 'Wild Mango (Imbe)',  scientific_name: 'Garcinia humilis',          carbon_coeff: 3.5,  native_countries: ['Guyana','Suriname','Brazil','Venezuela','Trinidad and Tobago'], family: 'Clusiaceae' },
  { common_name: 'Tucuma Palm',        scientific_name: 'Astrocaryum aculeatum',     carbon_coeff: 2.8,  native_countries: ['Guyana','Suriname','Brazil','Venezuela','Colombia'],   family: 'Arecaceae' },
  { common_name: 'Buriti / Aguaje',    scientific_name: 'Mauritia flexuosa',         carbon_coeff: 3.2,  native_countries: ['Guyana','Suriname','Venezuela','Brazil','Colombia','Peru','Bolivia','Ecuador','Trinidad and Tobago'], family: 'Arecaceae' },
  { common_name: 'Peach Palm / Pejibaye', scientific_name: 'Bactris gasipaes',       carbon_coeff: 2.5,  native_countries: ['Guyana','Suriname','Venezuela','Colombia','Brazil','Panama','Costa Rica','Nicaragua','Belize','Ecuador','Peru','Bolivia'], family: 'Arecaceae' },
  { common_name: 'Passion Fruit Tree', scientific_name: 'Passiflora edulis',         carbon_coeff: 0.5,  native_countries: ['Brazil','Guyana','Suriname','Venezuela','Colombia','Paraguay','Argentina','Bolivia','Peru','Ecuador'], family: 'Passifloraceae' },
  { common_name: 'Araçá / Cattley Guava', scientific_name: 'Psidium cattleianum',   carbon_coeff: 1.2,  native_countries: ['Brazil','Guyana','Suriname','Uruguay','Argentina','Paraguay'], family: 'Myrtaceae' },
  { common_name: 'Velvet Tamarind',    scientific_name: 'Dialium guianense',         carbon_coeff: 5.5,  native_countries: ['Guyana','Suriname','Venezuela','Colombia','Brazil','Panama','Mexico','Belize'], family: 'Fabaceae' },
  { common_name: 'Cocoplum',           scientific_name: 'Chrysobalanus icaco',       carbon_coeff: 1.5,  native_countries: ['Guyana','Suriname','Trinidad and Tobago','Venezuela','Colombia','Brazil','Panama','Mexico','Belize','Jamaica','Dominican Republic','Haiti'], family: 'Chrysobalanaceae' },

  // ── AFRICA — INDIGENOUS FRUIT & FOOD TREES ──────────────────────────
  { common_name: 'Kola Nut',           scientific_name: 'Cola nitida',               carbon_coeff: 3.8,  native_countries: ['Nigeria','Ghana','Ivory Coast','Sierra Leone','Liberia','Guinea','Cameroon'], family: 'Malvaceae' },
  { common_name: 'African Pear / Ube', scientific_name: 'Dacryodes edulis',          carbon_coeff: 3.5,  native_countries: ['Nigeria','Cameroon','Ghana','Gabon','DR Congo','Congo','Equatorial Guinea','Angola'], family: 'Burseraceae' },
  { common_name: 'Bitter Kola',        scientific_name: 'Garcinia kola',             carbon_coeff: 3.2,  native_countries: ['Nigeria','Cameroon','Ghana','Ivory Coast','Liberia','Sierra Leone'], family: 'Clusiaceae' },
  { common_name: 'African Breadfruit', scientific_name: 'Treculia africana',         carbon_coeff: 5.0,  native_countries: ['Nigeria','Ghana','Cameroon','Ivory Coast','DR Congo','Uganda','Kenya','Tanzania','Sierra Leone','Liberia'], family: 'Moraceae' },
  { common_name: 'Wild / Bush Mango',  scientific_name: 'Irvingia gabonensis',       carbon_coeff: 4.5,  native_countries: ['Nigeria','Cameroon','Ghana','Gabon','DR Congo','Congo','Equatorial Guinea','Ivory Coast'], family: 'Irvingiaceae' },
  { common_name: 'Tamarind (Africa)',  scientific_name: 'Tamarindus indica',         carbon_coeff: 3.5,  native_countries: ['Sudan','Ethiopia','Kenya','Tanzania','Senegal','Mali','Niger','Burkina Faso','Nigeria','Ghana','Cameroon','Mozambique','Zimbabwe','South Africa'], family: 'Fabaceae' },
  { common_name: 'Soursop (Africa)',   scientific_name: 'Annona muricata',           carbon_coeff: 2.2,  native_countries: ['Nigeria','Ghana','Cameroon','Kenya','Tanzania','Uganda','Rwanda','Ethiopia','Senegal'], family: 'Annonaceae' },
  { common_name: 'Monkey Bread / Baobab Fruit', scientific_name: 'Adansonia gregorii', carbon_coeff: 7.5, native_countries: ['Australia'],                                          family: 'Malvaceae' },
  { common_name: 'Monkey Orange',      scientific_name: 'Strychnos spinosa',         carbon_coeff: 2.5,  native_countries: ['South Africa','Zimbabwe','Mozambique','Tanzania','Kenya','Uganda','Zambia','Malawi','Botswana'], family: 'Loganiaceae' },
  { common_name: 'African Velvet Tamarind', scientific_name: 'Dialium guineense',    carbon_coeff: 4.5,  native_countries: ['Nigeria','Ghana','Senegal','Gambia','Guinea','Sierra Leone','Liberia','Ivory Coast','Cameroon'], family: 'Fabaceae' },
  { common_name: 'Agbalumo / African Star Apple', scientific_name: 'Chrysophyllum albidum', carbon_coeff: 4.0, native_countries: ['Nigeria','Ghana','Cameroon','Ivory Coast','Senegal','Guinea','Sierra Leone','Liberia','Benin','Togo'], family: 'Sapotaceae' },
  { common_name: 'Neem (W. Africa)',   scientific_name: 'Azadirachta indica',        carbon_coeff: 3.5,  native_countries: ['Mali','Burkina Faso','Niger','Senegal','Gambia','Guinea','Guinea-Bissau','Chad','Sudan'], family: 'Meliaceae' },
  { common_name: 'Ackee',              scientific_name: 'Blighia sapida',            carbon_coeff: 3.0,  native_countries: ['Ghana','Nigeria','Ivory Coast','Liberia','Sierra Leone','Guinea','Cameroon','Gabon'], family: 'Sapindaceae' },
  { common_name: 'Lemon / Lemon Tree',  scientific_name: 'Citrus limon',             carbon_coeff: 1.2,  native_countries: ['India','Pakistan','Myanmar','China','Thailand','Vietnam','Malaysia','Indonesia'], family: 'Rutaceae' },

  // ── SOUTH-EAST ASIA — MISSING FRUITS & CROPS ────────────────────────
  { common_name: 'Banana / Plantain',  scientific_name: 'Musa acuminata',            carbon_coeff: 0.8,  native_countries: ['Malaysia','Indonesia','Philippines','Thailand','Myanmar','Vietnam','Laos','Cambodia','Papua New Guinea','India','Sri Lanka','Bangladesh','Guyana','Suriname','Trinidad and Tobago','Jamaica','Barbados','Dominican Republic','Haiti','Belize','Panama','Costa Rica','Nicaragua','Honduras','Guatemala','Cuba','Colombia','Venezuela','Brazil','Peru','Ecuador','Bolivia','Nigeria','Ghana','Kenya','Tanzania','Uganda','Ethiopia','Rwanda','Cameroon','Ivory Coast','DR Congo','Mozambique','Madagascar','Fiji','Samoa','Tonga'], family: 'Musaceae' },
  { common_name: 'Starfruit / Carambola', scientific_name: 'Averrhoa carambola',     carbon_coeff: 1.5,  native_countries: ['Malaysia','Indonesia','Philippines','Thailand','Vietnam','Laos','Cambodia','Myanmar','China','India','Sri Lanka'], family: 'Oxalidaceae' },
  { common_name: 'Jackfruit (SE Asia)',scientific_name: 'Artocarpus integer',        carbon_coeff: 3.5,  native_countries: ['Malaysia','Indonesia','Philippines','Thailand','Vietnam','Laos','Cambodia','Myanmar','Papua New Guinea'], family: 'Moraceae' },
  { common_name: 'Langsat / Duku',     scientific_name: 'Lansium domesticum',        carbon_coeff: 2.5,  native_countries: ['Malaysia','Indonesia','Philippines','Thailand','Myanmar','Vietnam'], family: 'Meliaceae' },
  { common_name: 'Malay Apple',        scientific_name: 'Syzygium malaccense',       carbon_coeff: 2.8,  native_countries: ['Malaysia','Indonesia','Philippines','Thailand','Vietnam','Papua New Guinea','Guyana','Suriname','Trinidad and Tobago','Jamaica'], family: 'Myrtaceae' },
  { common_name: 'Java Apple / Wax Jambu', scientific_name: 'Syzygium samarangense', carbon_coeff: 2.2,  native_countries: ['Malaysia','Indonesia','Philippines','Thailand','Vietnam','Laos','Cambodia','Myanmar'], family: 'Myrtaceae' },
  { common_name: 'Noni',               scientific_name: 'Morinda citrifolia',        carbon_coeff: 1.5,  native_countries: ['Philippines','Indonesia','Malaysia','Thailand','Vietnam','Papua New Guinea','Fiji','Samoa','Tonga','Kiribati'], family: 'Rubiaceae' },
  { common_name: 'Dragon Fruit',       scientific_name: 'Selenicereus undatus',      carbon_coeff: 0.5,  native_countries: ['Mexico','Guatemala','Belize','Honduras','Nicaragua','Costa Rica','Colombia','Venezuela','Ecuador'], family: 'Cactaceae' },
  { common_name: 'Tamarillo / Tree Tomato', scientific_name: 'Solanum betaceum',     carbon_coeff: 0.8,  native_countries: ['Ecuador','Colombia','Peru','Bolivia','Venezuela','Guyana','Suriname'], family: 'Solanaceae' },

  // ── INDIA / SOUTH ASIA — ADDITIONAL FRUITS ───────────────────────────
  { common_name: 'Wood Apple',         scientific_name: 'Limonia acidissima',        carbon_coeff: 2.0,  native_countries: ['India','Sri Lanka','Bangladesh','Myanmar','Thailand','Malaysia'], family: 'Rutaceae' },
  { common_name: 'Bael / Bengal Quince', scientific_name: 'Aegle marmelos',          carbon_coeff: 2.5,  native_countries: ['India','Sri Lanka','Bangladesh','Nepal','Myanmar','Thailand'], family: 'Rutaceae' },
  { common_name: 'Indian Gooseberry / Amla', scientific_name: 'Emblica officinalis', carbon_coeff: 1.8,  native_countries: ['India','Sri Lanka','Bangladesh','Nepal','Myanmar','China','Thailand'], family: 'Phyllanthaceae' },
  { common_name: 'Kokum',              scientific_name: 'Garcinia indica',           carbon_coeff: 2.2,  native_countries: ['India','Sri Lanka'],                                  family: 'Clusiaceae' },
  { common_name: 'Karanda',            scientific_name: 'Carissa carandas',          carbon_coeff: 0.8,  native_countries: ['India','Sri Lanka','Pakistan','Bangladesh','Nepal','Myanmar','Thailand'], family: 'Apocynaceae' },
  { common_name: 'Elephant Apple',     scientific_name: 'Dillenia indica',           carbon_coeff: 3.5,  native_countries: ['India','Sri Lanka','Bangladesh','Myanmar','Thailand','Malaysia','Indonesia','Vietnam','Laos','China'], family: 'Dilleniaceae' },

  // ── AUSTRALIA — NATIVE FRUITS & PLANTS ───────────────────────────────
  { common_name: 'Macadamia Nut',      scientific_name: 'Macadamia integrifolia',    carbon_coeff: 3.2,  native_countries: ['Australia'],                                          family: 'Proteaceae' },
  { common_name: 'Finger Lime',        scientific_name: 'Citrus australasica',       carbon_coeff: 0.8,  native_countries: ['Australia'],                                          family: 'Rutaceae' },
  { common_name: 'Quandong',           scientific_name: 'Santalum acuminatum',       carbon_coeff: 1.5,  native_countries: ['Australia'],                                          family: 'Santalaceae' },
  { common_name: 'Lemon Myrtle',       scientific_name: 'Backhousia citriodora',     carbon_coeff: 1.8,  native_countries: ['Australia'],                                          family: 'Myrtaceae' },
  { common_name: 'Davidson\'s Plum',   scientific_name: 'Davidsonia jerseyana',      carbon_coeff: 2.0,  native_countries: ['Australia'],                                          family: 'Cunoniaceae' },
  { common_name: 'Illawarra Plum',     scientific_name: 'Podocarpus elatus',         carbon_coeff: 3.5,  native_countries: ['Australia'],                                          family: 'Podocarpaceae' },
  { common_name: 'Bunya Pine',         scientific_name: 'Araucaria bidwillii',       carbon_coeff: 5.0,  native_countries: ['Australia'],                                          family: 'Araucariaceae' },
  { common_name: 'Kakadu Plum',        scientific_name: 'Terminalia ferdinandiana',  carbon_coeff: 2.0,  native_countries: ['Australia'],                                          family: 'Combretaceae' },

  // ── USA / NORTH AMERICA — MISSING FRUIT & NATIVE TREES ───────────────
  { common_name: 'Pecan',              scientific_name: 'Carya illinoinensis',       carbon_coeff: 3.8,  native_countries: ['United States','Mexico'],                             family: 'Juglandaceae' },
  { common_name: 'American Persimmon', scientific_name: 'Diospyros virginiana',      carbon_coeff: 2.0,  native_countries: ['United States'],                                      family: 'Ebenaceae' },
  { common_name: 'Pawpaw',             scientific_name: 'Asimina triloba',           carbon_coeff: 1.8,  native_countries: ['United States'],                                      family: 'Annonaceae' },
  { common_name: 'Wild Plum',          scientific_name: 'Prunus americana',          carbon_coeff: 1.2,  native_countries: ['United States','Canada'],                             family: 'Rosaceae' },
  { common_name: 'Serviceberry',       scientific_name: 'Amelanchier arborea',       carbon_coeff: 1.2,  native_countries: ['United States','Canada'],                             family: 'Rosaceae' },
  { common_name: 'Chokecherry',        scientific_name: 'Prunus virginiana',         carbon_coeff: 1.0,  native_countries: ['United States','Canada'],                             family: 'Rosaceae' },
  { common_name: 'American Hazelnut',  scientific_name: 'Corylus americana',         carbon_coeff: 0.8,  native_countries: ['United States','Canada'],                             family: 'Betulaceae' },

  // ── NEW ZEALAND — ADDITIONAL ──────────────────────────────────────────
  { common_name: 'Kowhai',             scientific_name: 'Sophora microphylla',       carbon_coeff: 1.8,  native_countries: ['New Zealand'],                                        family: 'Fabaceae' },
  { common_name: 'Manuka',             scientific_name: 'Leptospermum scoparium',    carbon_coeff: 1.2,  native_countries: ['New Zealand','Australia'],                            family: 'Myrtaceae' },
  { common_name: 'Cabbage Tree',       scientific_name: 'Cordyline australis',       carbon_coeff: 1.5,  native_countries: ['New Zealand'],                                        family: 'Asparagaceae' },

  // ── PACIFIC ISLANDS ───────────────────────────────────────────────────
  { common_name: 'Breadfruit (Pacific)',scientific_name: 'Artocarpus altilis',       carbon_coeff: 4.5,  native_countries: ['Papua New Guinea','Fiji','Samoa','Tonga','Vanuatu','Solomon Islands','Kiribati','Micronesia','Tuvalu','Palau','Marshall Islands','Nauru'], family: 'Moraceae' },
  { common_name: 'Pandanus / Screw Pine', scientific_name: 'Pandanus tectorius',    carbon_coeff: 2.0,  native_countries: ['Fiji','Samoa','Tonga','Vanuatu','Solomon Islands','Kiribati','Micronesia','Tuvalu','Palau','Marshall Islands','Papua New Guinea','Philippines','Indonesia','Malaysia','Thailand'], family: 'Pandanaceae' },

  // ── EUROPE — ADDITIONAL FRUIT & FLOWERING TREES ──────────────────────
  { common_name: 'Medlar',             scientific_name: 'Mespilus germanica',        carbon_coeff: 1.0,  native_countries: ['Turkey','Iran','Greece','Bulgaria','Romania','France','Germany','Spain'], family: 'Rosaceae' },
  { common_name: 'Quince',             scientific_name: 'Cydonia oblonga',           carbon_coeff: 1.2,  native_countries: ['Iran','Turkey','Greece','Bulgaria','Romania','Spain','Portugal'], family: 'Rosaceae' },
  { common_name: 'Cornelian Cherry',   scientific_name: 'Cornus mas',                carbon_coeff: 1.0,  native_countries: ['Turkey','Greece','Bulgaria','Romania','Germany','France','Spain','Italy','Poland'], family: 'Cornaceae' },
  { common_name: 'Wild Service Tree',  scientific_name: 'Sorbus torminalis',         carbon_coeff: 1.5,  native_countries: ['United Kingdom','France','Germany','Spain','Italy','Czech Republic','Romania'], family: 'Rosaceae' },
  { common_name: 'Spindle Tree',       scientific_name: 'Euonymus europaeus',        carbon_coeff: 0.8,  native_countries: ['United Kingdom','Ireland','France','Germany','Spain','Italy','Poland'], family: 'Celastraceae' },
  { common_name: 'Strawberry Tree',    scientific_name: 'Arbutus unedo',             carbon_coeff: 1.5,  native_countries: ['Ireland','United Kingdom','France','Spain','Portugal','Italy','Greece','Turkey','Morocco'], family: 'Ericaceae' },
  { common_name: 'Mastic Tree',        scientific_name: 'Pistacia lentiscus',        carbon_coeff: 1.2,  native_countries: ['Greece','Turkey','Spain','Portugal','Italy','Morocco','Algeria','Tunisia','Libya'], family: 'Anacardiaceae' },

  // ── CHINA / EAST ASIA — ADDITIONAL ───────────────────────────────────
  { common_name: 'Jujube / Chinese Date', scientific_name: 'Ziziphus jujuba',        carbon_coeff: 1.5,  native_countries: ['China','Japan','South Korea','Taiwan','Vietnam','India','Pakistan','Iran','Turkey'], family: 'Rhamnaceae' },
  { common_name: 'Asian Pear',         scientific_name: 'Pyrus pyrifolia',           carbon_coeff: 1.8,  native_countries: ['China','Japan','South Korea','Taiwan','Vietnam'],     family: 'Rosaceae' },
  { common_name: 'Persimmon',          scientific_name: 'Diospyros kaki',            carbon_coeff: 1.8,  native_countries: ['China','Japan','South Korea','Taiwan','Vietnam'],     family: 'Ebenaceae' },
  { common_name: 'Yuzu',               scientific_name: 'Citrus junos',              carbon_coeff: 0.8,  native_countries: ['China','Japan','South Korea'],                        family: 'Rutaceae' },
  { common_name: 'Buddha\'s Hand Citron', scientific_name: 'Citrus medica',          carbon_coeff: 0.8,  native_countries: ['China','India','Bangladesh','Myanmar'],               family: 'Rutaceae' },
  { common_name: 'Camphor Tree',       scientific_name: 'Cinnamomum camphora',       carbon_coeff: 4.5,  native_countries: ['China','Japan','South Korea','Taiwan','Vietnam'],     family: 'Lauraceae' },

  // ── CARIBBEAN — ADDITIONAL MISSING SPECIES ────────────────────────────
  { common_name: 'Ackee (Jamaica)',     scientific_name: 'Blighia sapida',           carbon_coeff: 3.0,  native_countries: ['Jamaica','Trinidad and Tobago','Guyana','Suriname'],  family: 'Sapindaceae' },
  { common_name: 'June Plum / Ambarella', scientific_name: 'Spondias dulcis',        carbon_coeff: 3.5,  native_countries: ['Trinidad and Tobago','Jamaica','Guyana','Suriname','Venezuela','Colombia','Panama','Belize'], family: 'Anacardiaceae' },
  { common_name: 'Tamarind (Caribbean)', scientific_name: 'Tamarindus indica',       carbon_coeff: 3.5,  native_countries: ['Trinidad and Tobago','Jamaica','Guyana','Dominican Republic','Haiti','Belize','Panama'], family: 'Fabaceae' },
  { common_name: 'Poui (Yellow)',       scientific_name: 'Handroanthus chrysanthus', carbon_coeff: 3.8,  native_countries: ['Trinidad and Tobago','Guyana','Suriname','Venezuela','Colombia','Panama','Brazil'], family: 'Bignoniaceae' },

  // ── CENTRAL AMERICA / MEXICO — ADDITIONAL ────────────────────────────
  { common_name: 'Mamey Colorado',     scientific_name: 'Pouteria campechiana',      carbon_coeff: 3.0,  native_countries: ['Mexico','Guatemala','Belize','Honduras','Nicaragua','Costa Rica','Panama','Colombia','Venezuela'], family: 'Sapotaceae' },
  { common_name: 'Nance / Golden Berry', scientific_name: 'Byrsonima crassifolia',   carbon_coeff: 2.5,  native_countries: ['Mexico','Guatemala','Belize','Honduras','Nicaragua','Costa Rica','Panama','Colombia','Venezuela','Guyana','Suriname'], family: 'Malpighiaceae' },
  { common_name: 'Chico Zapote',       scientific_name: 'Manilkara chicle',          carbon_coeff: 4.0,  native_countries: ['Mexico','Guatemala','Belize'],                        family: 'Sapotaceae' },
  { common_name: 'Cacao Blanco',       scientific_name: 'Theobroma bicolor',         carbon_coeff: 2.5,  native_countries: ['Mexico','Guatemala','Belize','Honduras','Nicaragua','Costa Rica','Panama','Colombia','Venezuela','Guyana','Brazil','Ecuador','Peru'], family: 'Malvaceae' },

  // ── EAST AFRICA / HORN OF AFRICA — ADDITIONAL ────────────────────────
  { common_name: 'Enset / Ethiopian Banana', scientific_name: 'Ensete ventricosum',  carbon_coeff: 1.5,  native_countries: ['Ethiopia','Kenya','Uganda','Tanzania','Rwanda'],     family: 'Musaceae' },
  { common_name: 'Gesho / Hop Plant',  scientific_name: 'Rhamnus prinoides',         carbon_coeff: 1.0,  native_countries: ['Ethiopia','Kenya','Uganda','Tanzania','Rwanda','South Africa','Zimbabwe'], family: 'Rhamnaceae' },
  { common_name: 'Anchote',            scientific_name: 'Coccinia abyssinica',       carbon_coeff: 0.5,  native_countries: ['Ethiopia','Kenya','Uganda'],                          family: 'Cucurbitaceae' },
  { common_name: 'Wanza / Cordia',     scientific_name: 'Cordia africana',           carbon_coeff: 3.5,  native_countries: ['Ethiopia','Kenya','Uganda','Tanzania','Sudan','Eritrea'], family: 'Boraginaceae' },

  // ── SOUTH ASIA — ADDITIONAL FLOWERING TREES ──────────────────────────
  { common_name: 'Kadamba',            scientific_name: 'Neolamarckia cadamba',      carbon_coeff: 5.0,  native_countries: ['India','Sri Lanka','Bangladesh','Nepal','Myanmar','Thailand','Malaysia','Indonesia','Vietnam','China'], family: 'Rubiaceae' },
  { common_name: 'Mahua / Indian Butter Tree', scientific_name: 'Madhuca longifolia', carbon_coeff: 4.0, native_countries: ['India','Sri Lanka','Bangladesh','Nepal','Myanmar'], family: 'Sapotaceae' },
  { common_name: 'Silk Cotton (India)', scientific_name: 'Bombax ceiba',             carbon_coeff: 6.0,  native_countries: ['India','Sri Lanka','Bangladesh','Myanmar','Thailand','Malaysia','Indonesia','Philippines','Vietnam','China'], family: 'Malvaceae' },
  { common_name: 'Palash / Flame of Forest', scientific_name: 'Butea monosperma',    carbon_coeff: 2.5,  native_countries: ['India','Sri Lanka','Bangladesh','Nepal','Pakistan','Myanmar','Thailand'], family: 'Fabaceae' },

  // ── WEST AFRICA — ADDITIONAL ─────────────────────────────────────────
  { common_name: 'Prekese / Aridan',   scientific_name: 'Tetrapleura tetraptera',    carbon_coeff: 4.5,  native_countries: ['Nigeria','Ghana','Cameroon','Ivory Coast','Sierra Leone','Liberia','Senegal','Guinea','Gabon','DR Congo'], family: 'Fabaceae' },
  { common_name: 'Oha / Ora Tree',     scientific_name: 'Pterocarpus mildbraedii',   carbon_coeff: 5.0,  native_countries: ['Nigeria','Cameroon','DR Congo','Gabon'],              family: 'Fabaceae' },
  { common_name: 'Garden Egg Tree',    scientific_name: 'Solanum aethiopicum',       carbon_coeff: 0.5,  native_countries: ['Nigeria','Ghana','Cameroon','Ivory Coast','DR Congo','Uganda','Tanzania','Kenya','Ethiopia'], family: 'Solanaceae' },
  { common_name: 'Uziza / False Cubeb',scientific_name: 'Piper guineense',           carbon_coeff: 0.5,  native_countries: ['Nigeria','Ghana','Cameroon','Ivory Coast','DR Congo','Gabon'],      family: 'Piperaceae' },
  { common_name: 'Locust Bean (African)', scientific_name: 'Parkia biglobosa',       carbon_coeff: 4.5,  native_countries: ['Nigeria','Ghana','Senegal','Gambia','Mali','Burkina Faso','Niger','Ivory Coast','Guinea','Sierra Leone','Liberia','Cameroon','Chad','Sudan'], family: 'Fabaceae' },

  // ── CITRUS FAMILY — widespread cultivated across tropical/subtropical ─
  { common_name: 'Sweet Orange',       scientific_name: 'Citrus sinensis',           carbon_coeff: 1.5,  native_countries: ['China','Vietnam','Thailand','Malaysia','Indonesia','India','Bangladesh','Myanmar','Guyana','Suriname','Trinidad and Tobago','Jamaica','Barbados','Dominican Republic','Haiti','Belize','Panama','Costa Rica','Nicaragua','Honduras','Guatemala','Cuba','Colombia','Venezuela','Brazil','Peru','Ecuador','Bolivia','Nigeria','Ghana','South Africa','Kenya','Tanzania','Morocco','Algeria','Spain','Italy','Greece','Turkey','Egypt','Israel'], family: 'Rutaceae' },
  { common_name: 'Lime',               scientific_name: 'Citrus aurantifolia',       carbon_coeff: 1.0,  native_countries: ['Malaysia','Indonesia','India','Sri Lanka','Bangladesh','Myanmar','Thailand','Vietnam','Philippines','Guyana','Suriname','Trinidad and Tobago','Jamaica','Barbados','Dominican Republic','Haiti','Belize','Panama','Costa Rica','Nicaragua','Honduras','Guatemala','Cuba','Colombia','Venezuela','Brazil','Peru','Ecuador','Bolivia','Nigeria','Ghana','Kenya','Tanzania','Mozambique','South Africa','Morocco','Egypt'], family: 'Rutaceae' },
  { common_name: 'Mandarin / Tangerine',scientific_name: 'Citrus reticulata',        carbon_coeff: 1.2,  native_countries: ['China','Japan','South Korea','Taiwan','Vietnam','Thailand','Malaysia','Indonesia','Philippines','India','Bangladesh','Guyana','Suriname','Trinidad and Tobago','Jamaica','Brazil','Colombia','Venezuela','Peru','Ecuador','Bolivia','Morocco','Algeria','Spain','Italy','Greece','Turkey','South Africa'], family: 'Rutaceae' },
  { common_name: 'Grapefruit',         scientific_name: 'Citrus × paradisi',         carbon_coeff: 1.5,  native_countries: ['Barbados','Jamaica','Trinidad and Tobago','Guyana','Suriname','Dominican Republic','Haiti','Belize','Panama','Costa Rica','Cuba','Colombia','Venezuela','Brazil','South Africa','Israel','Spain','USA'], family: 'Rutaceae' },
  { common_name: 'Guava (India)',       scientific_name: 'Psidium guajava',           carbon_coeff: 1.8,  native_countries: ['India','Sri Lanka','Bangladesh','Nepal','Myanmar','Thailand','Malaysia','Indonesia','Philippines','Vietnam','China','Nigeria','Ghana','Kenya','Tanzania','Uganda','Ethiopia','South Africa','Mozambique','Zimbabwe'], family: 'Myrtaceae' },
  { common_name: 'Papaya (Asia/Africa)',scientific_name: 'Carica papaya',             carbon_coeff: 1.2,  native_countries: ['India','Sri Lanka','Bangladesh','Myanmar','Thailand','Malaysia','Indonesia','Philippines','Vietnam','China','Nigeria','Ghana','Kenya','Tanzania','Uganda','Ethiopia','Rwanda','DR Congo','Cameroon','South Africa','Mozambique','Zimbabwe','Madagascar','Fiji','Samoa','Papua New Guinea'], family: 'Caricaceae' },
  { common_name: 'Tamarind (Americas)',scientific_name: 'Tamarindus indica',          carbon_coeff: 3.5,  native_countries: ['Guyana','Suriname','Trinidad and Tobago','Jamaica','Barbados','Dominican Republic','Haiti','Belize','Panama','Costa Rica','Nicaragua','Honduras','Guatemala','Cuba','Colombia','Venezuela','Brazil','Peru','Mexico','El Salvador'], family: 'Fabaceae' },
  { common_name: 'Coconut (Asia-Pacific)',scientific_name:'Cocos nucifera',           carbon_coeff: 2.5,  native_countries: ['Solomon Islands','Vanuatu','Papua New Guinea','Fiji','Samoa','Tonga','Kiribati','Nauru','Tuvalu','Palau','Marshall Islands','Micronesia','Timor-Leste','Maldives'], family: 'Arecaceae' },
  { common_name: 'Jackfruit (S. Asia)', scientific_name: 'Artocarpus heterophyllus', carbon_coeff: 3.8,  native_countries: ['Guyana','Suriname','Trinidad and Tobago','Jamaica','Barbados','Dominican Republic','Haiti','Belize','Panama','Costa Rica','Cuba','Colombia','Venezuela','Brazil','Peru','Nigeria','Ghana','Kenya','Tanzania','Uganda','Cameroon','DR Congo','Rwanda','Ethiopia','Madagascar'], family: 'Moraceae' },

  // ── CARIBBEAN / CENTRAL AMERICA — NATIONAL & ICONIC TREES ────────────
  { common_name: 'Blue Mahoe',         scientific_name: 'Talipariti elatum',         carbon_coeff: 4.5,  native_countries: ['Jamaica','Cuba','Barbados','Dominican Republic','Haiti','Trinidad and Tobago','Guyana','Belize','Panama'], family: 'Malvaceae' },
  { common_name: 'Royal Palm',         scientific_name: 'Roystonea regia',           carbon_coeff: 3.0,  native_countries: ['Cuba','Jamaica','Barbados','Dominican Republic','Haiti','Trinidad and Tobago','Guyana','Suriname','Colombia','Venezuela','Panama','Costa Rica','Belize'], family: 'Arecaceae' },
  { common_name: 'Cuban Mahogany',     scientific_name: 'Swietenia mahagoni',        carbon_coeff: 5.5,  native_countries: ['Cuba','Jamaica','Barbados','Dominican Republic','Haiti','Bahamas','Belize','Panama','Colombia','Venezuela','Guyana','Suriname','Trinidad and Tobago'], family: 'Meliaceae' },
  { common_name: 'Lignum Vitae',       scientific_name: 'Guaiacum officinale',       carbon_coeff: 4.5,  native_countries: ['Jamaica','Bahamas','Cuba','Dominican Republic','Haiti','Trinidad and Tobago','Guyana','Suriname','Venezuela','Colombia','Panama'], family: 'Zygophyllaceae' },
  { common_name: 'Pride of Barbados',  scientific_name: 'Caesalpinia pulcherrima',   carbon_coeff: 1.2,  native_countries: ['Barbados','Trinidad and Tobago','Guyana','Suriname','Venezuela','Colombia','Panama','Costa Rica','Nicaragua','Honduras','Guatemala','Belize','Cuba','Jamaica','Dominican Republic','Haiti','Mexico'], family: 'Fabaceae' },
  { common_name: 'Guanacaste',         scientific_name: 'Enterolobium cyclocarpum',  carbon_coeff: 7.5,  native_countries: ['Costa Rica','Nicaragua','Honduras','Guatemala','Belize','Panama','Mexico','Colombia','Venezuela','Guyana','Suriname','Trinidad and Tobago','Brazil'], family: 'Fabaceae' },
  { common_name: 'Ziricote',           scientific_name: 'Cordia dodecandra',         carbon_coeff: 4.5,  native_countries: ['Belize','Mexico','Guatemala','Honduras','Nicaragua'], family: 'Boraginaceae' },
  { common_name: 'Bay Rum Tree',       scientific_name: 'Pimenta racemosa',          carbon_coeff: 2.0,  native_countries: ['Trinidad and Tobago','Guyana','Suriname','Venezuela','Colombia','Jamaica','Dominican Republic','Barbados','Belize','Panama'], family: 'Myrtaceae' },
  { common_name: 'Horseradish Tree (Caribbean)', scientific_name: 'Moringa oleifera', carbon_coeff: 1.5, native_countries: ['Guyana','Suriname','Trinidad and Tobago','Jamaica','Barbados','Dominican Republic','Haiti','Belize','Panama','Colombia','Venezuela','Cuba'], family: 'Moringaceae' },
  { common_name: 'Sugar Cane (tree-form)', scientific_name: 'Saccharum officinarum', carbon_coeff: 0.5, native_countries: ['Guyana','Suriname','Trinidad and Tobago','Jamaica','Barbados','Dominican Republic','Haiti','Belize','Panama','Cuba','Colombia','Venezuela','Brazil','India','Indonesia','Philippines','Papua New Guinea'], family: 'Poaceae' },

  // ── SPECIFIC COUNTRY NATIONAL TREES ──────────────────────────────────
  { common_name: 'Honduran Pine',      scientific_name: 'Pinus caribaea',            carbon_coeff: 3.2,  native_countries: ['Honduras','Nicaragua','Guatemala','Belize','Cuba','Bahamas','Trinidad and Tobago','Guyana','Suriname'], family: 'Pinaceae' },
  { common_name: 'Flor de Mayo / Mayflower', scientific_name: 'Plumeria alba',       carbon_coeff: 1.2,  native_countries: ['Dominican Republic','Haiti','Cuba','Puerto Rico','Jamaica','Barbados','Trinidad and Tobago','Guyana'], family: 'Apocynaceae' },
  { common_name: 'Yagua Palm',         scientific_name: 'Roystonea oleracea',        carbon_coeff: 2.8,  native_countries: ['Trinidad and Tobago','Guyana','Suriname','Venezuela','Colombia','Barbados','Grenada','Saint Lucia','Dominica','Saint Vincent and the Grenadines','Antigua and Barbuda','Saint Kitts and Nevis'], family: 'Arecaceae' },
  { common_name: 'Bwa Kwaib / Cabreuva', scientific_name: 'Myrocarpus frondosus',    carbon_coeff: 5.0,  native_countries: ['Saint Lucia','Dominica','Saint Vincent and the Grenadines','Grenada','Trinidad and Tobago','Guyana','Suriname','Brazil','Paraguay','Argentina'], family: 'Fabaceae' },

  // ── SOUTH / CENTRAL AMERICA — MORE GAPS ──────────────────────────────
  { common_name: 'Balsa Wood',         scientific_name: 'Ochroma pyramidale',        carbon_coeff: 5.5,  native_countries: ['Ecuador','Colombia','Venezuela','Guyana','Suriname','Brazil','Peru','Bolivia','Panama','Costa Rica','Nicaragua','Honduras','Guatemala','Belize','Mexico'], family: 'Malvaceae' },
  { common_name: 'Cedrela / Cedro',    scientific_name: 'Cedrela fissilis',          carbon_coeff: 5.0,  native_countries: ['Brazil','Guyana','Suriname','Venezuela','Colombia','Peru','Ecuador','Bolivia','Paraguay','Argentina'], family: 'Meliaceae' },
  { common_name: 'Açaí (Amazon)',      scientific_name: 'Euterpe oleracea',          carbon_coeff: 3.5,  native_countries: ['Brazil','Guyana','Suriname','Venezuela','Colombia','Peru','Ecuador','Bolivia','Trinidad and Tobago'], family: 'Arecaceae' },
  { common_name: 'Yerba Mate',         scientific_name: 'Ilex paraguariensis',       carbon_coeff: 2.2,  native_countries: ['Brazil','Paraguay','Argentina','Uruguay','Bolivia'], family: 'Aquifoliaceae' },
  { common_name: 'Carnauba Wax Palm',  scientific_name: 'Copernicia prunifera',      carbon_coeff: 2.5,  native_countries: ['Brazil'],                                             family: 'Arecaceae' },
  { common_name: 'Murumuru Palm',      scientific_name: 'Astrocaryum murumuru',      carbon_coeff: 2.5,  native_countries: ['Brazil','Guyana','Suriname','Venezuela','Colombia','Peru','Ecuador','Bolivia'], family: 'Arecaceae' },
  { common_name: 'Macaúba Palm',       scientific_name: 'Acrocomia aculeata',        carbon_coeff: 3.0,  native_countries: ['Brazil','Paraguay','Bolivia','Argentina','Venezuela','Colombia','Guyana','Suriname','Panama','Mexico'], family: 'Arecaceae' },
  { common_name: 'Imbaúba / Trumpet Tree', scientific_name: 'Cecropia obtusa',       carbon_coeff: 3.5,  native_countries: ['Brazil','Guyana','Suriname','Venezuela','Colombia','Peru','Ecuador','Bolivia','Panama'], family: 'Urticaceae' },
  { common_name: 'Andiroba',           scientific_name: 'Carapa guianensis',         carbon_coeff: 6.2,  native_countries: ['Brazil','Guyana','Suriname','Venezuela','Colombia','Peru','Ecuador','Bolivia','Trinidad and Tobago','Panama'], family: 'Meliaceae' },

  // ── HAWAII (USA) ──────────────────────────────────────────────────────
  { common_name: 'Koa',                scientific_name: 'Acacia koa',                carbon_coeff: 5.5,  native_countries: ['United States'],                                      family: 'Fabaceae' },
  { common_name: 'Ohia Lehua',         scientific_name: 'Metrosideros polymorpha',   carbon_coeff: 3.5,  native_countries: ['United States'],                                      family: 'Myrtaceae' },
  { common_name: 'Kukui / Candlenut',  scientific_name: 'Aleurites moluccanus',      carbon_coeff: 4.0,  native_countries: ['United States','Philippines','Indonesia','Malaysia','Thailand','Myanmar','Papua New Guinea','Fiji','Samoa','Tonga'], family: 'Euphorbiaceae' },

  // ── ADDITIONAL AFRICA — FLOWERING & FRUIT ────────────────────────────
  { common_name: 'Flamboyant (Africa)',scientific_name: 'Delonix regia',             carbon_coeff: 4.0,  native_countries: ['Nigeria','Ghana','Kenya','Tanzania','Uganda','Ethiopia','Rwanda','Cameroon','Senegal','DR Congo','South Africa','Mozambique','Zimbabwe','Zambia','Malawi','Madagascar'], family: 'Fabaceae' },
  { common_name: 'Jacaranda (Africa)', scientific_name: 'Jacaranda mimosifolia',     carbon_coeff: 3.2,  native_countries: ['South Africa','Zimbabwe','Kenya','Tanzania','Uganda','Ethiopia','Mozambique','Zambia','Malawi','Botswana','Namibia'], family: 'Bignoniaceae' },
  { common_name: 'Avocado (Africa)',   scientific_name: 'Persea americana',          carbon_coeff: 3.0,  native_countries: ['Kenya','Tanzania','Uganda','Ethiopia','Rwanda','DR Congo','Cameroon','Nigeria','Ghana','South Africa','Mozambique','Zimbabwe','Zambia','Malawi','Madagascar'], family: 'Lauraceae' },
  { common_name: 'Passion Fruit (Africa)', scientific_name: 'Passiflora edulis',     carbon_coeff: 0.5,  native_countries: ['Kenya','Tanzania','Uganda','Ethiopia','Rwanda','South Africa','Zimbabwe','Zambia','Malawi','Mozambique','DR Congo','Cameroon'], family: 'Passifloraceae' },
  { common_name: 'Wild Custard Apple', scientific_name: 'Annona senegalensis',       carbon_coeff: 2.0,  native_countries: ['Nigeria','Ghana','Senegal','Gambia','Mali','Burkina Faso','Niger','Ivory Coast','Cameroon','DR Congo','Kenya','Tanzania','Uganda','Ethiopia','Zimbabwe','Zambia','Malawi','Mozambique','South Africa'], family: 'Annonaceae' },
  { common_name: 'African Pear Palm',  scientific_name: 'Elaeis guineensis',         carbon_coeff: 3.5,  native_countries: ['Nigeria','Ghana','Cameroon','Ivory Coast','DR Congo','Gabon','Congo','Liberia','Sierra Leone','Guinea','Guinea-Bissau','Senegal','Angola','Uganda','Tanzania','Kenya'], family: 'Arecaceae' },
  { common_name: 'Waterberry',         scientific_name: 'Syzygium cordatum',         carbon_coeff: 3.0,  native_countries: ['South Africa','Zimbabwe','Mozambique','Tanzania','Kenya','Uganda','Zambia','Malawi','Botswana','Namibia','Eswatini'], family: 'Myrtaceae' },
  { common_name: 'Forest Bush Willow', scientific_name: 'Combretum caffrum',         carbon_coeff: 2.5,  native_countries: ['South Africa','Zimbabwe','Mozambique','Tanzania','Kenya','Uganda','Zambia','Malawi','Botswana'], family: 'Combretaceae' },
  { common_name: 'Marjoram / Wild Oregano Tree', scientific_name: 'Lippia javanica', carbon_coeff: 0.8,  native_countries: ['South Africa','Zimbabwe','Mozambique','Tanzania','Kenya','Uganda','Zambia','Malawi','Botswana','Namibia','Eswatini','Ethiopia'], family: 'Verbenaceae' },

  // ── INDIA / SOUTH ASIA — MORE GAPS ───────────────────────────────────
  { common_name: 'Guava (S. Asia)',    scientific_name: 'Psidium guajava',           carbon_coeff: 1.8,  native_countries: ['Pakistan','Nepal','Afghanistan'],                     family: 'Myrtaceae' },
  { common_name: 'Areca / Betel Nut Palm', scientific_name: 'Areca catechu',         carbon_coeff: 2.0,  native_countries: ['India','Sri Lanka','Bangladesh','Myanmar','Thailand','Malaysia','Indonesia','Philippines','Vietnam','Papua New Guinea'], family: 'Arecaceae' },
  { common_name: 'Coconut (S. Asia)', scientific_name: 'Cocos nucifera',             carbon_coeff: 2.5,  native_countries: ['Bangladesh','Nepal','Pakistan','Afghanistan'],        family: 'Arecaceae' },
  { common_name: 'Papaya (S. Asia)',  scientific_name: 'Carica papaya',              carbon_coeff: 1.2,  native_countries: ['Pakistan','Nepal','Afghanistan'],                     family: 'Caricaceae' },
  { common_name: 'Indian Laburnum / Amaltas', scientific_name: 'Cassia fistula',     carbon_coeff: 2.5,  native_countries: ['India','Sri Lanka','Bangladesh','Nepal','Myanmar','Thailand','Malaysia','Indonesia','Philippines','Vietnam','Laos','Cambodia','China'], family: 'Fabaceae' },
  { common_name: 'Tulsi / Holy Basil Tree', scientific_name: 'Ocimum tenuiflorum',   carbon_coeff: 0.3,  native_countries: ['India','Sri Lanka','Bangladesh','Nepal','Myanmar','Thailand','Malaysia','Indonesia'], family: 'Lamiaceae' },
  { common_name: 'Sandal Wood',       scientific_name: 'Santalum album',             carbon_coeff: 2.5,  native_countries: ['India','Sri Lanka','Indonesia','Australia'],          family: 'Santalaceae' },
  { common_name: 'Margosa / Nim',     scientific_name: 'Azadirachta indica',         carbon_coeff: 3.5,  native_countries: ['Nepal','Afghanistan','Pakistan'],                     family: 'Meliaceae' },

  // ── SOUTHEAST ASIA — MORE GAPS ────────────────────────────────────────
  { common_name: 'Pandan / Screwpine', scientific_name: 'Pandanus amaryllifolius',   carbon_coeff: 0.8,  native_countries: ['Malaysia','Indonesia','Philippines','Thailand','Vietnam','Laos','Cambodia','Myanmar','Sri Lanka','India','Bangladesh','Papua New Guinea','Guyana','Suriname','Trinidad and Tobago'], family: 'Pandanaceae' },
  { common_name: 'Ylang-Ylang (extended)', scientific_name: 'Cananga odorata',       carbon_coeff: 3.5,  native_countries: ['Guyana','Suriname','Trinidad and Tobago','Colombia','Venezuela','Brazil','Panama'], family: 'Annonaceae' },
  { common_name: 'Breadnut / Ramon',  scientific_name: 'Brosimum alicastrum',        carbon_coeff: 5.5,  native_countries: ['Mexico','Guatemala','Belize','Honduras','Nicaragua','Costa Rica','Panama','Colombia','Venezuela','Guyana','Suriname','Trinidad and Tobago','Cuba','Jamaica','Dominican Republic','Haiti'], family: 'Moraceae' },

  // ── OCEANIA — GAPS ────────────────────────────────────────────────────
  { common_name: 'Pacific Banyan',    scientific_name: 'Ficus prolixa',              carbon_coeff: 5.0,  native_countries: ['Fiji','Samoa','Tonga','Vanuatu','Solomon Islands','Papua New Guinea'], family: 'Moraceae' },
  { common_name: 'Tamanu',            scientific_name: 'Calophyllum inophyllum',     carbon_coeff: 4.0,  native_countries: ['Fiji','Samoa','Tonga','Vanuatu','Solomon Islands','Papua New Guinea','Kiribati','Micronesia','Philippines','Indonesia','Malaysia','Thailand','India','Sri Lanka','Madagascar','Mozambique','Tanzania','Kenya'], family: 'Calophyllaceae' },

  // ── RUSSIA / CENTRAL ASIA — GAPS ─────────────────────────────────────
  { common_name: 'Siberian Elm',      scientific_name: 'Ulmus pumila',               carbon_coeff: 2.0,  native_countries: ['Russia','China','Mongolia','Kazakhstan','Kyrgyzstan','Tajikistan','Uzbekistan'], family: 'Ulmaceae' },
  { common_name: 'Apricot',          scientific_name: 'Prunus armeniaca',            carbon_coeff: 1.5,  native_countries: ['China','Russia','Kazakhstan','Kyrgyzstan','Tajikistan','Uzbekistan','Turkmenistan','Afghanistan','Iran','Turkey','Armenia','Azerbaijan','Georgia'], family: 'Rosaceae' },
  { common_name: 'Sour Cherry',      scientific_name: 'Prunus cerasus',              carbon_coeff: 1.2,  native_countries: ['Turkey','Armenia','Azerbaijan','Georgia','Russia','Ukraine','Poland','Germany','France','Italy','Greece','Romania','Bulgaria'], family: 'Rosaceae' },

  // ── MIDDLE EAST / CENTRAL ASIA — GAPS ────────────────────────────────
  { common_name: 'Jujube (Middle East)', scientific_name: 'Ziziphus spina-christi',  carbon_coeff: 1.8,  native_countries: ['Israel','Palestine','Jordan','Lebanon','Syria','Iraq','Iran','Saudi Arabia','Yemen','Oman','Egypt','Sudan','Ethiopia','Kenya'], family: 'Rhamnaceae' },
  { common_name: 'Prickly Pear',      scientific_name: 'Opuntia ficus-indica',       carbon_coeff: 0.5,  native_countries: ['Mexico','Israel','Palestine','Morocco','Algeria','Tunisia','Libya','Spain','Italy','Greece','Turkey','South Africa','Ethiopia'], family: 'Cactaceae' },
  { common_name: 'Frankincense',      scientific_name: 'Boswellia sacra',            carbon_coeff: 2.0,  native_countries: ['Oman','Yemen','Somalia','Ethiopia','Sudan'],          family: 'Burseraceae' },
  { common_name: 'Myrrh',             scientific_name: 'Commiphora myrrha',          carbon_coeff: 1.5,  native_countries: ['Somalia','Ethiopia','Eritrea','Sudan','Yemen','Oman'], family: 'Burseraceae' },
]

// Calculate XP from carbon coefficient
// Formula: base 30 + coeff × 14, rounded to nearest 5, capped at 200
export function calcXP(coeff: number): number {
  return Math.min(200, Math.round((30 + coeff * 14) / 5) * 5)
}

// Default XP when no species selected
export const DEFAULT_XP = 25
