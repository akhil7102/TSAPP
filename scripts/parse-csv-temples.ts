import { Temple } from '../src/data/temples';

// CSV data from the user's input
const csvData = `name_english,name_telugu,deity_english,deity_telugu,district,state,temple_type,address_english,address_telugu,latitude,longitude
Yadadri Lakshmi Narasimha Swamy Temple,,,,Yadadri Bhuvanagiri,TS,Hill,"Yadagirigutta, Yadadri Bhuvanagiri, Telangana",,,
Chilkur Balaji Temple,,,,Rangareddy,TS,Ancient,"Chilkur, Rangareddy, Telangana",,,
Bhadrachalam Sita Ramachandraswamy Temple,,,,Bhadradri Kothagudem,TS,River,"Bhadrachalam, Bhadradri Kothagudem, Telangana",,,
Ramappa Temple,,,,Mulugu/Warangal,TS,Ancient/Heritage,"Palampet, Mulugu district, Telangana",,,
Thousand Pillar Temple,,,,"Hanamkonda, Warangal",TS,Ancient,"Hanamkonda, Warangal, Telangana",,,
Kaleshwara Mukteswara Temple,,,,Jayashankar Bhupalpally,TS,River,"Kaleshwaram, Jayashankar Bhupalpally, Telangana",,,
Vemulawada Raja Rajeshwara Temple,,,,Rajanna Sircilla,TS,Ancient,"Vemulawada, Rajanna Sircilla, Telangana",,,
Basara Gnana Saraswathi Temple,,,,Nirmal,TS,River,"Basar, Nirmal district, Telangana",,,
Kondagattu Anjaneya Swamy Temple,,,,Karimnagar,TS,Hill,"Kondagattu, Karimnagar, Telangana",,,
Keesaragutta Ramalingeswara Temple,,,,Medchal-Malkajgiri,TS,Hill,"Keesara, Medchal-Malkajgiri, Telangana",,,
Karmanghat Hanuman Temple,,,,Hyderabad,TS,Ancient,"Karmanghat, Hyderabad, Telangana",,,
Birla Mandir Hyderabad,,,,Hyderabad,TS,Modern,"Birla Mandir, Hill Fort Road, Hyderabad, Telangana",,,
Birla Mandir Warangal,,,,Warangal,TS,Modern,"Birla Mandir, Warangal, Telangana",,,
Komuravelli Mallikarjuna Swamy Temple,,,,Sangareddy,TS,Ancient,"Komuravelli, Sangareddy, Telangana",,,
Chaya Someswara Temple,,,,Nalgonda,TS,Ancient,"Panagal (Chaya Someswara), Nalgonda, Telangana",,,
Manyamkonda Lakshmi Narasimha Temple,,,,Mulugu,TS,Hill,"Manyamkonda, Mulugu district, Telangana",,,
Sanghi Temple (Sanghi Venkateswara Swamy),,,,Ranga Reddy,TS,Hill,"Sanghi, Ranga Reddy, Telangana",,,
Ranganathaswamy Temple Jiyaguda,,,,Hyderabad,TS,Ancient,"Jiyaguda, Hyderabad, Telangana",,,
Peddamma Thalli Temple,,,,Hyderabad,TS,City/Devi,"Banjara Hills / Jubilee Hills area, Hyderabad, Telangana",,,
Jagannath Temple Secunderabad,,,,Hyderabad,TS,Modern,"Secunderabad, Hyderabad, Telangana",,,
Bhadrakali Temple Warangal,,,,Warangal,TS,Ancient,"Warangal, Telangana",,,
Kolanupaka Jain Temple (Kulpakji),,,,Bhongir / Yadadri,TS,Ancient/Jain,"Kolanupaka, Yadadri Bhuvanagiri, Telangana",,,
Devunigutta Temple,,,,Bhupalpally,TS,Archaeological,"Devunigutta, Bhupalpally, Telangana",,,
Kota Gullu (Ghanpur temples),,,,Ghanpur/Warangal,TS,Ancient,"Kota Gullu, Ghanpur, Warangal, Telangana",,,
Pachala Someswara Temple,,,,Nalgonda,TS,Ancient,"Pachala (Pachalam), Nalgonda, Telangana",,,
Pillalamarri (Erakeswara) Temples,,,,Suryapet/Nalgonda region,TS,Ancient,"Pillalamarri area, Telangana",,,
Gudem Gutta Satyanarayana Swamy Temple,,,,Medak,TS,Hill,"Gudem Gutta, Telangana",,,
Warangal Padmakshi Temple,,,,Warangal,TS,Ancient,"Padmakshi Temple, Hanamkonda, Warangal, Telangana",,,
Hemachala Lakshmi Narasimha Swamy Temple,,,,Bhadradri Kothagudem,TS,Hill,"Hemachala, Telangana",,,
Edupayala Vana Durga Bhavani Temple,,,,Nirmal,TS,Forest/Devi,"Edupayala, Nirmal, Telangana",,,
Wargal Saraswati Temple,,,,Medak / Siddipet region,TS,Modern,"Wargal, Telangana",,,
Surendrapuri Mythological Museum & Temples,,,,Yadadri Bhuvanagiri,TS,Theme/Modern,"Surendrapuri, Telangana",,,
Mallur Lakshmi Narasimha Swamy Temple,,,,Rangareddy,TS,Hill,"Mallur, Rangareddy, Telangana",,,
Nacharam Mallikarjuna Swamy Temple,,,,Hyderabad,TS,Ancient,"Nacharam area, Hyderabad, Telangana",,,
Dharmapuri Narasimha Swamy Temple,,,,Karimnagar,TS,Hill,"Dharmapuri, Telangana",,,
Alampur Jogulamba Temple,,,,Jogulamba Gadwal,TS,Ancient,"Alampur, Jogulamba Gadwal, Telangana",,,
Medaram Sammakka-Saralamma Jatara site,,,,Mulugu,TS,Tribal/Forest,"Medaram, Mulugu district, Telangana",,,
Beechupally Anjaneya Swamy Temple,,,,Nalgonda,TS,River,"Beechupally, Telangana",,,
Keesara Ramalingeswara Temple,,,,Medchal-Malkajgiri,TS,Ancient,"Keesara, Telangana",,,
Chennakesava / Veerabhadra shrines (Warangal),,,,Warangal,TS,Ancient,"Warangal region, Telangana",,,
Pakhal Temple Complex,,,,Warangal,TS,Scenic/Ancient,"Pakhal, Telangana",,,
Phanigiri Temple Cluster,,,,Siddipet/Nalgonda area,TS,Heritage,"Phanigiri area, Telangana",,,
Siddeshwara Temple (Pillalamarri),,,,Suryapet region,TS,Ancient,"Pillalamarri, Telangana",,,
Ghatgudi / hill-top temples (Telangana),,,,,TS,Hill,,,,
Kondagattu Lakshmi Narasimha Temple (complex),,,,Karimnagar,TS,Hill,"Kondagattu, Karimnagar, Telangana",,,
Manyamkonda Narasimha Swamy,,,,Mulugu,TS,Hill,"Manyamkonda, Telangana",,,
Vemulawada Temple Complex,,,,Rajanna Sircilla,TS,Ancient,"Vemulawada, Telangana",,,
Surya Narayana Temples (select),,,,,TS,Ancient,,,,
Pochamma & Konda Pochamma Temples (district centers),,,,,TS,Local/Devi,,,,
Warangal Bhadrakali / local goddess temples,,,,Warangal,TS,Devi/Ancient,,,,
Kondapochamma (local famous shrines),,,,,TS,Local,,,,
Sri Peddamma Thalli (city shrine),,,,Hyderabad,TS,Devi,"Hyderabad, Telangana",,,
Mallanna / regional temples (select),,,,,TS,Ancient,,,,
Kompally/Komuravelli Mallikarjuna (again),,,,Sangareddy,TS,Ancient,"Komuravelli, Telangana",,,
Srirangapur Rajakumari Temple,,,,Wanaparthy,TS,Ancient,"Srirangapur, Wanaparthy, Telangana",,,
Sri Ghanpur Anjaneya / local famous temples,,,,Warangal,TS,Ancient,,,,
"Narasimha Temples (Dharmapuri, Manyamkonda style)",,,,Various,TS,Hill,,,,
Additional notable district temples (TS) -  to fill,,,,,TS,Various,,,,
Tirumala Venkateswara Temple,,,,Tirupati,AP,Hill,"Tirumala, Tirupati, Andhra Pradesh",,,
Sri Padmavathi Ammavari Temple (Tiruchanur),,,,Tirupati,AP,Temple Town,"Tiruchanur, Tirupati, Andhra Pradesh",,,
Srisailam Mallikarjuna Swamy Temple,,,,Nandyal / Kurnool region,AP,Hill/River,"Srisailam, Kurnool, Andhra Pradesh",,,
Kanaka Durga Temple,,,,"Vijayawada, Krishna",AP,Hill/River,"Indrakeeladri Hill, Vijayawada, Andhra Pradesh",,,
Simhachalam Varaha Lakshmi Narasimha Temple,,,,Visakhapatnam,AP,Hill,"Simhachalam, Visakhapatnam, Andhra Pradesh",,,
Srikalahasti Temple,,,,"Srikalahasti, Tirupati",AP,Ancient,"Srikalahasti, Tirupati district, Andhra Pradesh",,,
Kanipakam Vinayaka Temple,,,,Chittoor,AP,Ancient,"Kanipakam, Chittoor, Andhra Pradesh",,,
Ahobilam Nava Narasimha Temples (main shrine),,,,Kurnool/Nandyal,AP,Hill,"Ahobilam, Andhra Pradesh",,,
Yaganti Uma Maheswara Temple,,,,Kurnool,AP,Cave/Hill,"Yaganti, Kurnool, Andhra Pradesh",,,
Dwaraka Tirumala (Chinna Tirupati),,,,West Godavari,AP,Hill,"Dwaraka Tirumala, Andhra Pradesh",,,
Annavaram Satyanarayana Swamy Temple,,,,Kakinada,AP,Hill,"Annavaram, Kakinada district, Andhra Pradesh",,,
Kapila Theertham / Kapileswara Temple,,,,Tirupati,AP,Waterfall temple,"Kapila Theertham, Tirupati, Andhra Pradesh",,,
Vedanarayana Temple Nagalapuram,,,,Tirupati district,AP,Temple,"Nagalapuram, Tirupati district, Andhra Pradesh",,,
Kotappakonda Trikutachala,,,,Guntur,AP,Hill,"Kotappakonda, Guntur district, Andhra Pradesh",,,
Mangalagiri Panakala Narasimha Temple,,,,Guntur,AP,Hill,"Mangalagiri, Guntur, Andhra Pradesh",,,
Undavalli Narasimha Temple,,,,Vijayawada/Guntur area,AP,Cave/Heritage,"Undavalli, Andhra Pradesh",,,
Paritala Anjaneya Swamy Temple (Hanuman),,,,Krishna (near Vijayawada),AP,Modern/Monument,"Paritala, Krishna district, Andhra Pradesh",,,
Draksharamam Bhimeswara Swamy Temple,,,,East Godavari,AP,Ancient,"Draksharamam, East Godavari, Andhra Pradesh",,,
Amaravati Amaralingeswara Temple,,,,Amaravati,AP,Ancient/Heritage,"Amaravati, Andhra Pradesh",,,
"Rajahmundry major temples (e.g., ISKCON, local shrines)",,,,East Godavari,AP,City temples,"Rajahmundry, Andhra Pradesh",,,
Srikurmam Vishnu Temple,,,,Srikakulam,AP,Ancient,"Srikurmam, Srikakulam, Andhra Pradesh",,,
Lepakshi Veerabhadra Swamy Temple,,,,Anantapur,AP,Heritage,"Lepakshi, Anantapur, Andhra Pradesh",,,
Narayanavanam Kalyana Venkateswara Swamy Temple,,,,Tirupati,AP,Temple,"Narayanavanam, Chittoor district, Andhra Pradesh",,,
Gudimallam Parasurameswara Temple,,,,Tirupati/Venkatagiri area,AP,Ancient,"Gudimallam, Andhra Pradesh",,,
Pithapuram Kukkuteswara Temple,,,,East Godavari,AP,Ancient,"Pithapuram, East Godavari, Andhra Pradesh",,,
Antarvedi Kodanda Rama Temple,,,,East Godavari,AP,River/Coastal,"Antarvedi, East Godavari, Andhra Pradesh",,,
Penchalakona Temple (Sri Veerabhadra),,,,Nellore,AP,Hill,"Penchalakona, Nellore district, Andhra Pradesh",,,
Appalayagunta Prasanna Venkateswara Temple,,,,Tirupati,AP,Temple town,"Appalayagunta, Tirupati, Andhra Pradesh",,,
Arasavalli Sun Temple,,,,Srikakulam,AP,Ancient/Sun,"Arasavalli, Srikakulam, Andhra Pradesh",,,
Devuni Kadapa Sri Lakshmi Venkateswara Temple,,,,Kadapa,AP,Temple,"Devuni Kadapa, Kadapa district, Andhra Pradesh",,,
Tallapaka Annamacharya sites,,,,Kadapa/Annamayya region,AP,Heritage,"Tallapaka & surrounding, Andhra Pradesh",,,
"Nandyal region temples (e.g., Yaganti)",,,,Nandyal,AP,Hill/Ancient,"Nandyal region, Andhra Pradesh",,,
Somarama Temple (Bhimavaram),,,,West Godavari,AP,Ancient,"Bhimavaram, West Godavari, Andhra Pradesh",,,
Kumararama (Samalkot),,,,East Godavari,AP,Ancient,"Samalkot, East Godavari, Andhra Pradesh",,,
Ksheerarama (Palakollu),,,,West Godavari,AP,Ancient,"Palakollu, West Godavari, Andhra Pradesh",,,
Sri Rama Temple Ontimitta,,,,Kadapa,AP,Ancient,"Ontimitta, Kadapa district, Andhra Pradesh",,,
Mypadu Beach Temples (Nellore coastal shrines),,,,Nellore,AP,Coastal,"Mypadu area, Nellore, Andhra Pradesh",,,
Veerabhadra Swamy Temple (Rayadurg),,,,Anantapur,AP,Ancient,"Rayadurg, Anantapur, Andhra Pradesh",,,
Kotilingeswara clusters (various towns),,,,,AP,Cluster,,,,
Varaha Swamy Temple (Tirumala & other spots),,,,Tirupati,AP,Ancient,"Tirumala / various, Andhra Pradesh",,,
Govindaraja Swamy Temple (Tirupati),,,,Tirupati,AP,Temple complex,"Tirupati, Andhra Pradesh",,,
Kodanda Rama Swamy Temple (Tirupati region),,,,Tirupati,AP,Temple,"Tirupati region, Andhra Pradesh",,,
Alipiri Padala Mandapam (Tirupati trek),,,,Tirupati,AP,Pilgrim access,"Alipiri, Tirupati, Andhra Pradesh",,,
Narasaraopet district temples,,,,Narasaraopet,AP,Regional,"Narasaraopet, Andhra Pradesh",,,
Ongole district temples,,,,Prakasam,AP,Regional,"Ongole, Andhra Pradesh",,,
Guntur district temples (various),,,,Guntur,AP,Regional,"Guntur, Andhra Pradesh",,,
Chittoor district heritage temples,,,,Chittoor,AP,Regional,"Chittoor, Andhra Pradesh",,,
Prakasam district Narasimha temples,,,,Prakasam,AP,Regional,"Prakasam district, Andhra Pradesh",,,
Nellore coastal shrines (multiple),,,,Nellore,AP,Coastal,"Nellore district, Andhra Pradesh",,,
East Godavari Pancharama Kshetras (Draksharamam etc.),,,,East Godavari,AP,Pancharama,"East Godavari, Andhra Pradesh",,,
"Kurnool district temples (Ahobilam, Yaganti)",,,,Kurnool,AP,Hill/Ancient,"Kurnool district, Andhra Pradesh",,,
Anantapur Lepakshi Temple (again),,,,Anantapur,AP,Heritage,"Lepakshi, Anantapur, Andhra Pradesh",,,
Sri Kalyana Venkateswara (Srinivasamangapuram),,,,Chittoor,AP,Wedding Shrine,"Srinivasamangapuram, Andhra Pradesh",,,
Kodanda Rama temples in Kadapa,,,,Kadapa,AP,Ancient,"Kadapa district, Andhra Pradesh",,,
Nallamala forest shrines (Srisailam region),,,,Nandyal/Srisailam,AP,Forest/Hill,"Nallamala forests, Andhra Pradesh",,,
Bhavanarayana Swamy Temple (Bapatla),,,,Bapatla,AP,Temple,"Bapatla, Andhra Pradesh",,,
Sri Veerabhadra Swamy Temple (Kuravi),,,,Khammam area,AP,Ancient,Kuravi area,,,
Satyanarayana Swamy Temple (Annavaram),,,,Kakinada,AP,Hill,"Annavaram, Andhra Pradesh",,,
ISKCON Temples (major cities in AP),,,,Multiple,AP,Modern/ISKCON,"Vijayawada, Visakhapatnam, Tirupati",,,
Puttaparthi Prasanthi Nilayam (Sai Baba Ashram),,,,Anantapur (Sri Sathya Sai district),AP,Ashram/Devotional,"Puttaparthi, Andhra Pradesh",,,
Narayanavanam Temples cluster,,,,Chittoor,AP,Ancient,"Narayanavanam, Andhra Pradesh",,,
Narasannapeta district temples,,,,Srikakulam,AP,Regional,"Narasannapeta, Andhra Pradesh",,,
Amalapuram temples,,,,Konaseema / East Godavari,AP,Regional,"Amalapuram, Andhra Pradesh",,,
Peddapuram temples,,,,East Godavari,AP,Regional,"Peddapuram, Andhra Pradesh",,,
Kakinada coastal temples,,,,Kakinada,AP,Coastal,"Kakinada, Andhra Pradesh",,,
Gudiwada (Gudivada) temples,,,,Krishna,AP,Regional,"Gudivada, Andhra Pradesh",,,
Jaggayyapeta temples,,,,Krishna,AP,Regional,"Jaggayyapeta, Andhra Pradesh",,,
Machilipatnam temples,,,,Krishna,AP,Coastal/Regional,"Machilipatnam, Andhra Pradesh",,,
Eluru temples,,,,Eluru,AP,Regional,"Eluru, Andhra Pradesh",,,
Bhimavaram Somarama Temple (again),,,,West Godavari,AP,Ancient,"Bhimavaram, Andhra Pradesh",,,
Rajahmundry major shrines (again),,,,East Godavari,AP,City temples,"Rajahmundry, Andhra Pradesh",,,
Vizianagaram temples,,,,Vizianagaram,AP,Regional,"Vizianagaram, Andhra Pradesh",,,
Visakhapatnam Simhachalam (again),,,,Visakhapatnam,AP,Hill,"Simhachalam, Visakhapatnam, Andhra Pradesh",,,
Araku Valley Shrines (local tribal/forest temples),,,,Vizianagaram / Araku,AP,Forest/Hill,"Araku Valley, Andhra Pradesh",,,
Ramatheertham Temple (Vizianagaram),,,,Vizianagaram,AP,Ancient,"Ramatheertham, Vizianagaram, Andhra Pradesh",,,
Devipuram (Visakhapatnam area),,,,Visakhapatnam,AP,Shakti/Temple Park,"Devipuram, Andhra Pradesh",,,
Ramalayam temples (district major ones),,,,,AP,Regional,,,,
Sri Narayanaswamy Temple (Nagari),,,,Chittoor,AP,Ancient,"Nagari, Chittoor, Andhra Pradesh",,,
Ranganatha (various smaller famous shrines),,,,,AP,Regional,,,,
Srikalahasti - Rahu Ketu shrine (detailed),,,,Srikalahasti,AP,Ancient,"Srikalahasti, Andhra Pradesh",,,
Kondareddy Buruju temples (Andhra historic forts with shrines),,,,,AP,Heritage,,,,`;

interface CSVRow {
  name_english: string;
  name_telugu: string;
  deity_english: string;
  deity_telugu: string;
  district: string;
  state: 'TS' | 'AP';
  temple_type: string;
  address_english: string;
  address_telugu: string;
  latitude: string;
  longitude: string;
}

function parseCSV(csv: string): CSVRow[] {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map((line, index) => {
    // Handle CSV parsing with quoted fields
    const values: string[] = [];
    let inQuotes = false;
    let currentValue = '';
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim()); // Add the last value
    
    const row: any = {};
    headers.forEach((header, i) => {
      row[header] = values[i] || '';
    });
    
    return row as CSVRow;
  });
}

function deduceDeityFromTempleName(templeName: string): { english: string; telugu: string } {
  const name = templeName.toLowerCase();
  
  if (name.includes('narasimha') || name.includes('anjaneya') || name.includes('hanuman')) {
    return { english: 'Lord Narasimha', telugu: 'నరసింహ స్వామి' };
  }
  if (name.includes('venkateswara') || name.includes('balaji') || name.includes('tirupati')) {
    return { english: 'Lord Venkateswara', telugu: 'వేంకటేశ్వర స్వామి' };
  }
  if (name.includes('shiva') || name.includes('mallikarjuna') || name.includes('someswara') || name.includes('lingeswara')) {
    return { english: 'Lord Shiva', telugu: 'శివుడు' };
  }
  if (name.includes('rama') || name.includes('ramachandraswamy')) {
    return { english: 'Lord Rama', telugu: 'శ్రీ రామ' };
  }
  if (name.includes('saraswati') || name.includes('gnana saraswathi')) {
    return { english: 'Goddess Saraswati', telugu: 'సరస్వతి దేవి' };
  }
  if (name.includes('durga') || name.includes('devi') || name.includes('amma') || name.includes('bhadrakali') || name.includes('mahankali')) {
    return { english: 'Goddess Devi', telugu: 'దేవి' };
  }
  if (name.includes('ganesha') || name.includes('vinayaka') || name.includes('ganapathi')) {
    return { english: 'Lord Ganesha', telugu: 'గణేశ స్వామి' };
  }
  if (name.includes('satyanarayana')) {
    return { english: 'Lord Satyanarayana', telugu: 'సత్యనారాయణ స్వామి' };
  }
  if (name.includes('surya') || name.includes('sun temple')) {
    return { english: 'Lord Surya', telugu: 'సూర్య దేవుడు' };
  }
  if (name.includes('vishnu') || name.includes('narayana')) {
    return { english: 'Lord Vishnu', telugu: 'విష్ణువు' };
  }
  
  // Default
  return { english: 'Divine Deity', telugu: 'దైవం' };
}

function normalizeTempleType(type: string): Temple['templeType'] {
  const lowerType = type.toLowerCase();
  
  if (lowerType.includes('hill') || lowerType.includes('mountain')) {
    return 'Hill';
  }
  if (lowerType.includes('cave')) {
    return 'Cave';
  }
  if (lowerType.includes('river') || lowerType.includes('coastal')) {
    return 'River';
  }
  if (lowerType.includes('modern') || lowerType.includes('theme') || lowerType.includes('iskcon')) {
    return 'Modern';
  }
  
  return 'Ancient'; // Default
}

function getDefaultCoordinates(state: 'TS' | 'AP', district: string): { lat: number; lng: number } {
  // Default coordinates for major districts - using approximate center coordinates
  const districtCoords: Record<string, { lat: number; lng: number }> = {
    // Telangana
    'Hyderabad': { lat: 17.3850, lng: 78.4867 },
    'Warangal': { lat: 18.0037, lng: 79.5645 },
    'Karimnagar': { lat: 18.4386, lng: 79.1288 },
    'Yadadri Bhuvanagiri': { lat: 17.6020, lng: 78.8840 },
    'Rangareddy': { lat: 17.2403, lng: 78.1374 },
    'Medchal-Malkajgiri': { lat: 17.5589, lng: 78.7456 },
    'Nirmal': { lat: 19.0969, lng: 78.3428 },
    'Mulugu': { lat: 18.1912, lng: 79.8000 },
    'Rajanna Sircilla': { lat: 18.3925, lng: 78.8389 },
    'Bhadradri Kothagudem': { lat: 17.6698, lng: 80.8931 },
    'Nalgonda': { lat: 17.0540, lng: 79.2663 },
    'Sangareddy': { lat: 17.6222, lng: 78.0808 },
    'Siddipet': { lat: 18.1021, lng: 78.8473 },
    'Jayashankar Bhupalpally': { lat: 18.6667, lng: 79.9167 },
    'Jogulamba Gadwal': { lat: 16.2090, lng: 77.7993 },
    'Wanaparthy': { lat: 16.3667, lng: 78.0667 },
    'Medak': { lat: 18.0488, lng: 78.2646 },
    'Suryapet': { lat: 17.1434, lng: 79.6185 },
    'Bhongir': { lat: 17.5175, lng: 78.8877 },
    
    // Andhra Pradesh
    'Tirupati': { lat: 13.6288, lng: 79.4192 },
    'Chittoor': { lat: 13.2172, lng: 79.1003 },
    'Visakhapatnam': { lat: 17.6868, lng: 83.2185 },
    'Krishna': { lat: 16.5062, lng: 80.6480 },
    'Vijayawada': { lat: 16.5062, lng: 80.6480 },
    'Kakinada': { lat: 16.9891, lng: 82.2475 },
    'East Godavari': { lat: 17.2403, lng: 81.7816 },
    'West Godavari': { lat: 16.8500, lng: 81.2833 },
    'Guntur': { lat: 16.3067, lng: 80.4365 },
    'Nellore': { lat: 14.4426, lng: 79.9865 },
    'Kurnool': { lat: 15.8281, lng: 78.0373 },
    'Nandyal': { lat: 15.4781, lng: 78.4829 },
    'Anantapur': { lat: 14.6819, lng: 77.6006 },
    'Srikakulam': { lat: 18.2949, lng: 83.8974 },
    'Vizianagaram': { lat: 18.1167, lng: 83.4000 },
    'Kadapa': { lat: 14.4673, lng: 78.8242 },
    'Prakasam': { lat: 15.3560, lng: 79.5874 },
    'Bapatla': { lat: 15.9045, lng: 80.4676 },
    'Eluru': { lat: 16.7107, lng: 81.0955 },
    'Konaseema': { lat: 16.8833, lng: 82.0667 },
    'Narasaraopet': { lat: 16.2350, lng: 80.0500 },
    'Amaravati': { lat: 16.5419, lng: 80.5109 }
  };
  
  return districtCoords[district] || (state === 'TS' ? 
    { lat: 17.3850, lng: 78.4867 } : // Hyderabad default for TS
    { lat: 15.9129, lng: 79.7400 }    // AP center default
  );
}

export function convertCSVToTemples(): Temple[] {
  const csvRows = parseCSV(csvData);
  const temples: Temple[] = [];
  
  csvRows.forEach((row, index) => {
    // Skip empty rows or placeholder rows
    if (!row.name_english || 
        row.name_english.includes('Additional Temple') || 
        row.name_english.includes('to fill') ||
        row.name_english.trim() === '') {
      return;
    }
    
    const deity = deduceDeityFromTempleName(row.name_english);
    const coordinates = getDefaultCoordinates(row.state, row.district);
    const templeType = normalizeTempleType(row.temple_type);
    
    // Clean up temple name
    let cleanName = row.name_english;
    if (cleanName.includes('(') && cleanName.includes(')')) {
      // Keep the part in parentheses if it's descriptive
      cleanName = cleanName.trim();
    }
    
    const temple: Temple = {
      id: `csv_${Date.now()}_${index}`,
      name: {
        english: cleanName,
        telugu: row.name_telugu || '' // Will be empty as per CSV
      },
      deity: deity,
      district: row.district.replace(/\//g, ' / '), // Clean up district format
      state: row.state,
      location: {
        latitude: parseFloat(row.latitude) || coordinates.lat,
        longitude: parseFloat(row.longitude) || coordinates.lng,
        address: {
          english: row.address_english || `${row.district}, ${row.state === 'TS' ? 'Telangana' : 'Andhra Pradesh'}`,
          telugu: row.address_telugu || ''
        }
      },
      description: {
        english: `Ancient temple dedicated to ${deity.english} located in ${row.district} district.`,
        telugu: ''
      },
      history: {
        english: `Historic temple with cultural and religious significance in ${row.district} region.`,
        telugu: ''
      },
      timings: {
        morning: '5:00 AM - 1:00 PM',
        evening: '4:00 PM - 9:00 PM',
        pujaTimings: ['6:00 AM', '12:00 PM', '7:00 PM']
      },
      festivals: [],
      images: [],
      contact: {},
      features: [templeType, 'Cultural Heritage', 'Traditional Worship'],
      isOpen: true,
      popularity: 3,
      templeType: templeType
    };
    
    temples.push(temple);
  });
  
  return temples;
}
