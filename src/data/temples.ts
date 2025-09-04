export interface Temple {
  id: string;
  name: {
    english: string;
    telugu: string;
  };
  deity: {
    english: string;
    telugu: string;
  };
  district: string;
  state: 'TS' | 'AP';
  location: {
    latitude: number;
    longitude: number;
    address: {
      english: string;
      telugu: string;
    };
  };
  description: {
    english: string;
    telugu: string;
  };
  history: {
    english: string;
    telugu: string;
  };
  timings: {
    morning: string;
    evening: string;
    pujaTimings: string[];
  };
  festivals: Array<{
    name: {
      english: string;
      telugu: string;
    };
    date: string;
    description: {
      english: string;
      telugu: string;
    };
  }>;
  images: string[];
  contact: {
    phone?: string;
    website?: string;
    email?: string;
  };
  features: string[];
  isOpen: boolean;
  popularity: number; // 1-5 rating
  templeType: 'Ancient' | 'Modern' | 'Cave' | 'Hill' | 'River';
}

export const templesData: Temple[] = [
  // TELANGANA TEMPLES (1-25)
  {
    id: "1",
    name: {
      english: "Sri Lakshmi Narasimha Swamy Temple",
      telugu: "శ్రీ లక్ష్మీ నరసింహ స్వామి ఆలయం"
    },
    deity: {
      english: "Lord Narasimha",
      telugu: "నరసింహ స్వామి"
    },
    district: "Yadadri Bhuvanagiri",
    state: "TS",
    location: {
      latitude: 17.6020,
      longitude: 78.8840,
      address: {
        english: "Yadagirigutta, Yadadri Bhuvanagiri, Telangana",
        telugu: "యాదగిరిగుట్ట, యాదాద్రి భువనగిరి, తెలంగాణ"
      }
    },
    description: {
      english: "Hill temple and major pilgrimage center dedicated to Lord Narasimha.",
      telugu: "నరసింహ స్వామికి అంకితమైన కొండ ఆలయం మరియు ప్రధాన తీర్థయాత్ర కేంద్రం."
    },
    history: {
      english: "Ancient temple with legends of Prahlada's devotion and miraculous appearances of Lord Narasimha.",
      telugu: "ప్రహ్లాద భక్తి మరియు నరసింహస్వామి అద్భుత దర్శనాల గురించిన పురాణాలతో కూడిన పురాతన ఆలయం."
    },
    timings: {
      morning: "4:00 AM - 1:00 PM",
      evening: "4:00 PM - 10:00 PM",
      pujaTimings: ["4:30 AM", "12:00 PM", "6:00 PM", "9:00 PM"]
    },
    festivals: [
      {
        name: {
          english: "Brahmotsavam",
          telugu: "బ్రహ్మోత్సవం"
        },
        date: "2024-03-15",
        description: {
          english: "Annual 9-day festival with grand celebrations",
          telugu: "వార్షిక 9 రోజుల గొప్ప వేడుకలతో కూడిన ఉత్సవం"
        }
      },
      {
        name: {
          english: "Narasimha Jayanti",
          telugu: "నరసింహ జయంతి"
        },
        date: "2024-05-22",
        description: {
          english: "Birth anniversary of Lord Narasimha",
          telugu: "నరసింహ స్వామి జన్మదిన వేడుకలు"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-8683-250000",
      website: "https://www.yadagirigutta.ap.gov.in"
    },
    features: ["Hill Temple", "Major Pilgrimage", "Accommodation", "Prasadam"],
    isOpen: true,
    popularity: 5,
    templeType: "Hill"
  },
  {
    id: "2",
    name: {
      english: "Ramappa Temple (Rudreshwara Temple)",
      telugu: "రామప్ప ఆలయం (రుద్రేశ్వర ఆలయం)"
    },
    deity: {
      english: "Lord Shiva (Rudreshwara)",
      telugu: "శివుడు (రుద్రేశ్వర)"
    },
    district: "Mulugu",
    state: "TS",
    location: {
      latitude: 18.1581,
      longitude: 79.2706,
      address: {
        english: "Palampet, Mulugu, Telangana",
        telugu: "పాలంపేట్, ములుగు, తెలంగాణ"
      }
    },
    description: {
      english: "13th-century Kakatiya architecture temple, UNESCO World Heritage Site.",
      telugu: "13వ శతాబ్దపు కాకతీయ వాస్తుశిల్పం, యునెస్కో ప్రపంచ వారసత్వ ప్రదేశం."
    },
    history: {
      english: "Built during Kakatiya dynasty, famous for floating bricks and intricate sculptures.",
      telugu: "కాకతీయ వంశం కాలంలో నిర్మించబడింది, తేలే ఇటుకలు మరియు సూక్ష్మ శిల్పాలకు ప్రసిద్ధం."
    },
    timings: {
      morning: "6:00 AM - 1:00 PM",
      evening: "3:00 PM - 8:00 PM",
      pujaTimings: ["6:30 AM", "12:00 PM", "6:00 PM"]
    },
    festivals: [
      {
        name: {
          english: "Maha Shivaratri",
          telugu: "మహా శివరాత్రి"
        },
        date: "2024-03-08",
        description: {
          english: "Great night of Lord Shiva celebration",
          telugu: "శివుని మహా రాత్రి వేడుకలు"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-8719-255555"
    },
    features: ["UNESCO Site", "Ancient Architecture", "Floating Bricks", "Heritage"],
    isOpen: true,
    popularity: 4,
    templeType: "Ancient"
  },
  {
    id: "3",
    name: {
      english: "Bhadrachalam Temple",
      telugu: "భద్రాచలం రామ మందిరం"
    },
    deity: {
      english: "Lord Rama",
      telugu: "శ్రీ రామ"
    },
    district: "Bhadradri Kothagudem",
    state: "TS",
    location: {
      latitude: 17.6698,
      longitude: 80.8931,
      address: {
        english: "Bhadrachalam, Bhadradri Kothagudem, Telangana",
        telugu: "భద్రాచలం, భద్రాద్రి కొత్తగూడెం, తెలంగాణ"
      }
    },
    description: {
      english: "Famous Rama temple on Godavari riverbank, built by devotee Ramadasu.",
      telugu: "గోదావరి నది ఒడ్డున ఉన్న ప్రసిద్ధ రామ ఆలయం, భక్తుడు రామదాసు నిర్మించారు."
    },
    history: {
      english: "Built in 17th century by Kancherla Gopanna (Ramadasu), famous for divine music.",
      telugu: "17వ శతాబ్దంలో కంచర్ల గోపన్న (రామదాసు) నిర్మించారు, దైవిక సంగీతానికి ప్రసిద్ధం."
    },
    timings: {
      morning: "4:00 AM - 1:00 PM",
      evening: "4:00 PM - 9:00 PM",
      pujaTimings: ["4:30 AM", "8:00 AM", "12:00 PM", "6:00 PM", "8:30 PM"]
    },
    festivals: [
      {
        name: {
          english: "Sri Rama Navami",
          telugu: "శ్రీ రామ నవమి"
        },
        date: "2024-04-17",
        description: {
          english: "Lord Rama's birthday celebration with grand festivities",
          telugu: "శ్రీ రామచంద్రుని జన్మదిన గొప్ప వేడుకలు"
        }
      },
      {
        name: {
          english: "Brahmotsavam",
          telugu: "బ్రహ్మోత్సవం"
        },
        date: "2024-03-20",
        description: {
          english: "Annual temple festival",
          telugu: "వార్షిక ఆలయ ఉత్సవం"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-8744-222222",
      website: "https://www.bhadrachalam.org"
    },
    features: ["River Temple", "Cultural Heritage", "Music Tradition", "Boat Services"],
    isOpen: true,
    popularity: 5,
    templeType: "River"
  },
  {
    id: "4",
    name: {
      english: "Chilkur Balaji Temple",
      telugu: "చిల్కూర్ బాలాజీ ఆలయం"
    },
    deity: {
      english: "Lord Venkateswara (Balaji)",
      telugu: "వేంకటేశ్వర స్వామి (బాలాజీ)"
    },
    district: "Vikarabad",
    state: "TS",
    location: {
      latitude: 17.2403,
      longitude: 78.1374,
      address: {
        english: "Chilkur, Near Hyderabad, Telangana",
        telugu: "చిల్కూర్, హైదరాబాద్ దగ్గర, తెలంగాణ"
      }
    },
    description: {
      english: "Popular temple for visa blessings with no donation box (hundi).",
      telugu: "వీసా అనుగ్రహాలకు ప్రసిద్ధ ఆలయం, విరాళపు పెట్టె లేదు."
    },
    history: {
      english: "Ancient temple known for fulfilling devotees' wishes, especially for foreign travel.",
      telugu: "భక్తుల కోరికలను నెరవేర్చడంలో, ముఖ్యంగా విదేశ యాత్రలకు ప్రసిద్ధ పురాతన ఆలయం."
    },
    timings: {
      morning: "4:00 AM - 1:00 PM",
      evening: "3:00 PM - 8:00 PM",
      pujaTimings: ["5:00 AM", "12:00 PM", "7:00 PM"]
    },
    festivals: [
      {
        name: {
          english: "Ramanuja Jayanti",
          telugu: "రామానుజ జయంతి"
        },
        date: "2024-04-25",
        description: {
          english: "Birth anniversary of Saint Ramanuja",
          telugu: "సంత్ రామానుజ జన్మదిన వేడుకలు"
        }
      },
      {
        name: {
          english: "Brahmotsavam",
          telugu: "బ్రహ్మోత్సవం"
        },
        date: "2024-09-15",
        description: {
          english: "Annual temple festival",
          telugu: "వార్షిక ఆలయ ఉత్సవం"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-8418-222333"
    },
    features: ["Visa Temple", "No Hundi", "Wish Fulfillment", "Peaceful Environment"],
    isOpen: true,
    popularity: 4,
    templeType: "Ancient"
  },
  {
    id: "5",
    name: {
      english: "Keesaragutta Temple",
      telugu: "కీసరగుట్ట ఆలయం"
    },
    deity: {
      english: "Lord Shiva",
      telugu: "శివుడు"
    },
    district: "Medchal-Malkajgiri",
    state: "TS",
    location: {
      latitude: 17.5589,
      longitude: 78.7456,
      address: {
        english: "Keesara, Medchal-Malkajgiri, Telangana",
        telugu: "కీసర, మెడ్చల్-మల్కాజ్‌గిరి, తెలంగాణ"
      }
    },
    description: {
      english: "Ancient hill temple associated with Lord Rama's legend and natural beauty.",
      telugu: "రామ పురాణంతో సంబంధం కలిగిన మరియు సహజ అందంతో కూడిన పురాతన కొండ ఆలయం."
    },
    history: {
      english: "Historic temple believed to be visited by Lord Rama during his exile period.",
      telugu: "వనవాస కాలంలో రామచంద్రుడు సందర్శించినట్లు నమ్మబడే చారిత్రక ఆలయం."
    },
    timings: {
      morning: "5:00 AM - 1:00 PM",
      evening: "4:00 PM - 9:00 PM",
      pujaTimings: ["6:00 AM", "12:30 PM", "7:00 PM"]
    },
    festivals: [
      {
        name: {
          english: "Maha Shivaratri",
          telugu: "మహా శివరాత్రి"
        },
        date: "2024-03-08",
        description: {
          english: "Great festival of Lord Shiva",
          telugu: "శివుడి మహోత్సవం"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-8415-299999"
    },
    features: ["Hill Temple", "Natural Beauty", "Rama Connection", "Peaceful"],
    isOpen: true,
    popularity: 3,
    templeType: "Hill"
  },
  {
    id: "6",
    name: {
      english: "Birla Mandir (Hyderabad)",
      telugu: "బిర్లా మందిర్ (హైదరాబాద్)"
    },
    deity: {
      english: "Lord Venkateswara / Vishnu",
      telugu: "వేంకటేశ్వర స్వామి / విష్ణువు"
    },
    district: "Hyderabad",
    state: "TS",
    location: {
      latitude: 17.4062,
      longitude: 78.4691,
      address: {
        english: "Naubat Pahad, Hyderabad, Telangana",
        telugu: "నౌబత్ పహాడ్, హైదరాబాద్, తెలంగాణ"
      }
    },
    description: {
      english: "Modern hilltop temple with marble structure offering panoramic city views.",
      telugu: "పట్టణ దృశ్యాలను అందించే మార్బుల్ నిర్మాణంతో కూడిన ఆధునిక కొండ శిఖర ఆలయం."
    },
    history: {
      english: "Built by Birla family in 1976, blend of South and North Indian architecture.",
      telugu: "1976లో బిర్లా కుటుంబం నిర్మించారు, దక్షిణ మరియు ఉత్తర భారతీయ వాస్తుశిల్పం కలయిక."
    },
    timings: {
      morning: "7:00 AM - 12:00 PM",
      evening: "3:00 PM - 9:00 PM",
      pujaTimings: ["8:00 AM", "12:00 PM", "7:00 PM"]
    },
    festivals: [
      {
        name: {
          english: "Vaikuntha Ekadashi",
          telugu: "వైకుంఠ ఏకాదశి"
        },
        date: "2024-12-11",
        description: {
          english: "Sacred day for Lord Vishnu devotees",
          telugu: "విష్ణు భక్తులకు పవిత్ర దినం"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-40-2339-0447",
      website: "https://www.birlamandir.org"
    },
    features: ["City Views", "Modern Architecture", "Marble Temple", "Tourist Attraction"],
    isOpen: true,
    popularity: 4,
    templeType: "Modern"
  },
  {
    id: "7",
    name: {
      english: "Thousand Pillars Temple",
      telugu: "వేయి స్తంభాల గుడి"
    },
    deity: {
      english: "Lord Shiva",
      telugu: "శివుడు"
    },
    district: "Warangal",
    state: "TS",
    location: {
      latitude: 18.0037,
      longitude: 79.5645,
      address: {
        english: "Hanamkonda, Warangal, Telangana",
        telugu: "హనుమకొండ, వరంగల్, తెలంగాణ"
      }
    },
    description: {
      english: "Kakatiya era temple famous for intricate stone pillars and stellar architecture.",
      telugu: "సూక్ష్మ రాతి స్తంభాలు మరియు అద్భుత వాస్తుశిల్పానికి ప్రసిద్ధ కాకతీయ కాలపు ఆలయం."
    },
    history: {
      english: "Built in 1163 CE by Rudra Deva, showcases pinnacle of Kakatiya architecture.",
      telugu: "1163 సీఈలో రుద్రదేవుడు నిర్మించారు, కాకతీయ వాస్తుశిల్పం యొక్క శిఖరాన్ని ప్రదర్శిస్తుంది."
    },
    timings: {
      morning: "6:00 AM - 1:00 PM",
      evening: "3:00 PM - 8:00 PM",
      pujaTimings: ["6:30 AM", "11:00 AM", "5:00 PM", "7:30 PM"]
    },
    festivals: [
      {
        name: {
          english: "Maha Shivaratri",
          telugu: "మహా శివరాత్రి"
        },
        date: "2024-03-08",
        description: {
          english: "Grand celebration at the historic temple",
          telugu: "చారిత్రక ఆలయంలో గొప్ప వేడుకలు"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-870-2566666"
    },
    features: ["Historical Architecture", "Stone Carvings", "Archaeological Importance", "Heritage Site"],
    isOpen: true,
    popularity: 4,
    templeType: "Ancient"
  },
  {
    id: "8",
    name: {
      english: "Gnana Saraswati Temple (Basar)",
      telugu: "జ్ఞాన సరస్వతి ఆలయం (బసర)"
    },
    deity: {
      english: "Goddess Saraswati",
      telugu: "సరస్వతి దేవి"
    },
    district: "Nirmal",
    state: "TS",
    location: {
      latitude: 18.8333,
      longitude: 77.9833,
      address: {
        english: "Basar, Nirmal, Telangana",
        telugu: "బసర, నిర్మల్, తెలంగాణ"
      }
    },
    description: {
      english: "Famous for vidyarambham and educational rituals, one of few Saraswati temples in India.",
      telugu: "విద్యారంభం మరియు విద్యా సంస్కారాలకు ప్రసిద్ధం, భారతదేశంలో అరుదైన సరస్వతి ఆలయాలలో ఒకటి."
    },
    history: {
      english: "Ancient temple where Sage Vyasa composed Brahma Sutras, center of learning.",
      telugu: "వ్యాసమహర్షి బ్రహ్మసూత్రాలు రచించిన పురాతన ఆలయం, విద్యా కేంద్రం."
    },
    timings: {
      morning: "4:00 AM - 1:00 PM",
      evening: "4:00 PM - 9:00 PM",
      pujaTimings: ["4:30 AM", "12:00 PM", "6:00 PM", "8:30 PM"]
    },
    festivals: [
      {
        name: {
          english: "Saraswati Puja (Vasant Panchami)",
          telugu: "సరస్వతి పూజ (వసంత పంచమి)"
        },
        date: "2024-02-14",
        description: {
          english: "Main festival celebrating Goddess of Knowledge",
          telugu: "జ్ఞాన దేవతను జరుపుకునే ప్రధాన పండుగ"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-8734-233333"
    },
    features: ["Education Temple", "Vidyarambham", "Student Pilgrimage", "Learning Center"],
    isOpen: true,
    popularity: 4,
    templeType: "Ancient"
  },
  {
    id: "9",
    name: {
      english: "Sanghi Temple",
      telugu: "సంఘి ఆలయం"
    },
    deity: {
      english: "Lord Venkateswara",
      telugu: "వేంకటేశ్వర స్వామి"
    },
    district: "Rangareddy",
    state: "TS",
    location: {
      latitude: 17.2456,
      longitude: 78.4567,
      address: {
        english: "Sanghi, Near Hyderabad, Telangana",
        telugu: "సంఘి, హైదరాబాద్ దగ్గర, తెలంగాణ"
      }
    },
    description: {
      english: "Hill temple with large Venkateswara idol offering scenic views of surroundings.",
      telugu: "పరిసర దృశ్యాలను అందించే పెద్ద వేంకటేశ్వర విగ్రహంతో కూడిన కొండ ఆలయం."
    },
    history: {
      english: "Modern temple built on hilltop, popular pilgrimage spot near Hyderabad.",
      telugu: "కొండ శిఖరంపై నిర్మించిన ఆధునిక ఆలయం, హైదరాబాద్ దగ్గర ప్రసిద్ధ తీర్థయాత్ర కేంద్రం."
    },
    timings: {
      morning: "6:00 AM - 12:00 PM",
      evening: "4:00 PM - 8:00 PM",
      pujaTimings: ["7:00 AM", "12:00 PM", "7:00 PM"]
    },
    festivals: [
      {
        name: {
          english: "Annual Brahmotsavam",
          telugu: "వార్షిక బ్రహ్మోత్సవం"
        },
        date: "2024-09-20",
        description: {
          english: "Grand annual temple festival",
          telugu: "గొప్ప వార్షిక ఆలయ ఉత్సవం"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-8413-266777"
    },
    features: ["Hill Temple", "Large Idol", "Scenic Views", "Modern Facilities"],
    isOpen: true,
    popularity: 3,
    templeType: "Hill"
  },
  {
    id: "10",
    name: {
      english: "Karmanghat Hanuman Temple",
      telugu: "కర్మంగాట్ హనుమాన్ ఆలయం"
    },
    deity: {
      english: "Lord Hanuman",
      telugu: "హనుమాన్"
    },
    district: "Hyderabad",
    state: "TS",
    location: {
      latitude: 17.3850,
      longitude: 78.5503,
      address: {
        english: "Karmanghat, Hyderabad, Telangana",
        telugu: "కర్మంగాట్, హైదరాబాద్, తెలంగాణ"
      }
    },
    description: {
      english: "Historic Hanuman temple in the city, popular among local devotees.",
      telugu: "నగరంలోని చారిత్రక హనుమాన్ ఆలయం, స్థానిక భక్తులలో ప్రసిద్ధం."
    },
    history: {
      english: "Ancient temple with strong local following and traditional worship practices.",
      telugu: "బలమైన స్థానిక అనుచరులు మరియు సాంప్రదాయ పూజా పద్ధతులతో కూడిన పురాతన ఆలయం."
    },
    timings: {
      morning: "5:00 AM - 1:00 PM",
      evening: "4:00 PM - 9:00 PM",
      pujaTimings: ["6:00 AM", "12:00 PM", "7:00 PM"]
    },
    festivals: [
      {
        name: {
          english: "Hanuman Jayanti",
          telugu: "హనుమాన్ జయంతి"
        },
        date: "2024-04-23",
        description: {
          english: "Birth anniversary celebration of Lord Hanuman",
          telugu: "హనుమాన్ జన్మదిన వేడుకలు"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-40-2401-5555"
    },
    features: ["Historic Temple", "City Location", "Traditional Worship", "Local Favorite"],
    isOpen: true,
    popularity: 3,
    templeType: "Ancient"
  },
  {
    id: "11",
    name: {
      english: "Vemulawada Rajarajeshwara Temple",
      telugu: "వేములవాడ రాజరాజేశ్వర ఆలయం"
    },
    deity: {
      english: "Lord Shiva (Raja Rajeshwara)",
      telugu: "శివుడు (రాజరాజేశ్వర)"
    },
    district: "Rajanna Sircilla",
    state: "TS",
    location: {
      latitude: 18.3167,
      longitude: 78.8500,
      address: {
        english: "Vemulawada, Rajanna Sircilla, Telangana",
        telugu: "వేములవాడ, రాజన్న సిరిసిల్లా, తెలంగాణ"
      }
    },
    description: {
      english: "Regional Shaivaite center with large following, famous for temple chariot festival.",
      telugu: "పెద్ద అనుచరులతో కూడిన ప్రాంతీయ శైవ కేంద్రం, రథోత్సవానికి ప్రసిద్ధం."
    },
    history: {
      english: "Ancient temple with rich Shaivite tradition and regional cultural significance.",
      telugu: "గొప్ప శైవ సంప్రదాయం మరియు ప్రాంతీయ సాంస్కృతిక ప్రాముఖ్యతతో కూడిన పురాతన ఆలయం."
    },
    timings: {
      morning: "4:00 AM - 1:00 PM",
      evening: "4:00 PM - 10:00 PM",
      pujaTimings: ["4:30 AM", "12:30 PM", "7:30 PM"]
    },
    festivals: [
      {
        name: {
          english: "Maha Shivaratri",
          telugu: "మహా శివరాత్రి"
        },
        date: "2024-03-08",
        description: {
          english: "Grand Shivaratri celebration",
          telugu: "గొప్ప శివరాత్రి వేడుకలు"
        }
      },
      {
        name: {
          english: "Temple Rathotsavam",
          telugu: "ఆలయ రథోత్సవం"
        },
        date: "2024-02-25",
        description: {
          english: "Temple chariot festival",
          telugu: "ఆలయ రథోత్సవం"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-8722-244444"
    },
    features: ["Shaivite Center", "Rathotsavam", "Regional Importance", "Cultural Heritage"],
    isOpen: true,
    popularity: 4,
    templeType: "Ancient"
  },
  {
    id: "12",
    name: {
      english: "Komuravelli Mallanna Temple",
      telugu: "కొమురవెల్లి మల్లన్న ఆలయం"
    },
    deity: {
      english: "Mallanna (Shiva form)",
      telugu: "మల్లన్న (శివ రూపం)"
    },
    district: "Siddipet",
    state: "TS",
    location: {
      latitude: 18.1167,
      longitude: 78.8500,
      address: {
        english: "Komuravelli, Siddipet, Telangana",
        telugu: "కొమురవెల్లి, సిద్దిపేట, తెలంగాణ"
      }
    },
    description: {
      english: "Major tribal and rural pilgrimage spot dedicated to Mallanna, a form of Shiva.",
      telugu: "శివుని రూపమైన మల్లన్నకు అంకితమైన ప్రధాన గిరిజన మరియు గ్రామీణ తీర్థయాత్ర కేంద్రం."
    },
    history: {
      english: "Folk deity temple with strong tribal connections and regional cultural importance.",
      telugu: "బలమైన గిరిజన సంబంధాలు మరియు ప్రాంతీయ సాంస్కృతిక ప్రాముఖ్యతతో కూడిన జానపద దేవత ఆలయం."
    },
    timings: {
      morning: "4:00 AM - 2:00 PM",
      evening: "4:00 PM - 10:00 PM",
      pujaTimings: ["5:00 AM", "1:00 PM", "8:00 PM"]
    },
    festivals: [
      {
        name: {
          english: "Mallanna Jatara",
          telugu: "మల్లన్న జాతర"
        },
        date: "2024-01-15",
        description: {
          english: "Annual tribal festival with grand celebrations",
          telugu: "గొప్ప వేడుకలతో కూడిన వార్షిక గిరిజన జాతర"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-8455-277777"
    },
    features: ["Tribal Temple", "Folk Deity", "Jatara Festival", "Rural Pilgrimage"],
    isOpen: true,
    popularity: 4,
    templeType: "Ancient"
  },
  {
    id: "13",
    name: {
      english: "Kondagattu Anjaneya Swamy Temple",
      telugu: "కొండగట్టు ఆంజనేయ స్వామి ఆలయం"
    },
    deity: {
      english: "Lord Hanuman",
      telugu: "హనుమాన్"
    },
    district: "Karimnagar",
    state: "TS",
    location: {
      latitude: 18.7833,
      longitude: 78.9167,
      address: {
        english: "Kondagattu, Karimnagar, Telangana",
        telugu: "కొండగట్టు, కరీంనగర్, తెలంగాణ"
      }
    },
    description: {
      english: "Famous hill temple for Hanuman devotees, known for wish fulfillment.",
      telugu: "హనుమాన్ భక్తులకు ప్రసిద్ధ కొండ ఆలయం, కోరిక నెరవేర్పుకు ప్రసిద్ధం."
    },
    history: {
      english: "Temple gained popularity for miraculous powers and divine blessings.",
      telugu: "అద్భుత శక్తులు మరియు దైవిక అనుగ్రహాలకు ప్రసిద్ధి పొందిన ఆలయం."
    },
    timings: {
      morning: "4:00 AM - 1:00 PM",
      evening: "4:00 PM - 10:00 PM",
      pujaTimings: ["4:30 AM", "12:30 PM", "6:30 PM", "9:30 PM"]
    },
    festivals: [
      {
        name: {
          english: "Hanuman Jayanti",
          telugu: "హనుమాన్ జయంతి"
        },
        date: "2024-04-23",
        description: {
          english: "Grand celebration of Lord Hanuman's birth",
          telugu: "హనుమాన్ జన్మదిన గొప్ప వేడుకలు"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-8745-244444"
    },
    features: ["Hill Temple", "Wish Fulfillment", "Miraculous Powers", "Popular Pilgrimage"],
    isOpen: true,
    popularity: 4,
    templeType: "Hill"
  },
  {
    id: "14",
    name: {
      english: "Kolanupaka Jain Temple (Kulpakji)",
      telugu: "కొలనుపాక జైన ఆలయం (కుల్పక్జీ)"
    },
    deity: {
      english: "Jain Tirthankaras",
      telugu: "జైన తీర్థంకరులు"
    },
    district: "Bhuvanagiri",
    state: "TS",
    location: {
      latitude: 17.4500,
      longitude: 79.1833,
      address: {
        english: "Kolanupaka, Bhuvanagiri, Telangana",
        telugu: "కొలనుపాక, భువనగిరి, తెలంగాణ"
      }
    },
    description: {
      english: "Historically important Jain shrine with ancient sculptures and religious significance.",
      telugu: "పురాతన శిల్పాలు మరియు మతపరమైన ప్రాముఖ్యతతో కూడిన చారిత్రకంగా ముఖ్యమైన జైన మందిరం."
    },
    history: {
      english: "Ancient Jain temple with rich history and architectural importance dating back centuries.",
      telugu: "శతాబ్దాల నాటి గొప్ప చరిత్ర మరియు వాస్తు ప్రాముఖ్యతతో కూడిన పురాతన జైన ఆలయం."
    },
    timings: {
      morning: "6:00 AM - 12:00 PM",
      evening: "4:00 PM - 8:00 PM",
      pujaTimings: ["7:00 AM", "11:00 AM", "6:00 PM"]
    },
    festivals: [
      {
        name: {
          english: "Jain festivals",
          telugu: "జైన పండుగలు"
        },
        date: "2024-04-14",
        description: {
          english: "Traditional Jain religious celebrations",
          telugu: "సాంప్రదాయ జైన మత వేడుకలు"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-8683-255555"
    },
    features: ["Jain Heritage", "Ancient Sculptures", "Religious Significance", "Historical Importance"],
    isOpen: true,
    popularity: 3,
    templeType: "Ancient"
  },
  {
    id: "15",
    name: {
      english: "Peddamma Temple",
      telugu: "పెద్దమ్మ ఆలయం"
    },
    deity: {
      english: "Goddess Peddamma (Devi)",
      telugu: "పెద్దమ్మ దేవి"
    },
    district: "Hyderabad",
    state: "TS",
    location: {
      latitude: 17.4167,
      longitude: 78.4000,
      address: {
        english: "Jubilee Hills, Hyderabad, Telangana",
        telugu: "జూబ్లీ హిల్స్, హైదరాబాద్, తెలంగాణ"
      }
    },
    description: {
      english: "Popular local goddess temple with large community festivals and cultural significance.",
      telugu: "పెద్ద సామూహిక పండుగలు మరియు సాంస్కృతిక ప్రాముఖ్యతతో కూడిన ప్రసిద్ధ స్థానిక దేవత ఆలయం."
    },
    history: {
      english: "Local deity temple with strong community bonding and traditional festival celebrations.",
      telugu: "బలమైన సామూహిక బంధం మరియు సాంప్రదాయ పండుగ వేడుకలతో కూడిన స్థానిక దేవత ఆలయం."
    },
    timings: {
      morning: "5:00 AM - 1:00 PM",
      evening: "4:00 PM - 10:00 PM",
      pujaTimings: ["6:00 AM", "12:00 PM", "8:00 PM"]
    },
    festivals: [
      {
        name: {
          english: "Bonalu (local festival)",
          telugu: "బోనాలు (స్థానిక పండుగ)"
        },
        date: "2024-07-20",
        description: {
          english: "Traditional local goddess festival",
          telugu: "సాంప్రదాయ స్థానిక దేవత పండుగ"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-40-2355-7777"
    },
    features: ["Local Goddess", "Community Festival", "Bonalu Celebrations", "Cultural Heritage"],
    isOpen: true,
    popularity: 3,
    templeType: "Ancient"
  },
  {
    id: "16",
    name: {
      english: "Mahankali Temple (Ujjaini Mahankali)",
      telugu: "మహంకాళి ఆలయం (ఉజ్జైని మహంకాళి)"
    },
    deity: {
      english: "Goddess Mahankali",
      telugu: "మహంకాళి దేవి"
    },
    district: "Hyderabad",
    state: "TS",
    location: {
      latitude: 17.4400,
      longitude: 78.4983,
      address: {
        english: "Secunderabad, Hyderabad, Telangana",
        telugu: "సికింద్రాబాద్, హైదరాబాద్, తెలంగాణ"
      }
    },
    description: {
      english: "Very popular temple for Bonalu festival celebrations, major cultural center.",
      telugu: "బోనాలు పండుగ వేడుకలకు చాలా ప్రసిద్ధ ఆలయం, ప్రధాన సాంస్కృతిక కేంద్రం."
    },
    history: {
      english: "Historic temple central to Hyderabad's Bonalu festival and cultural traditions.",
      telugu: "హైదరాబాద్ బోనాలు పండుగ మరియు సాంస్కృతిక సంప్రదాయాలకు కేంద్రమైన చారిత్రక ఆలయం."
    },
    timings: {
      morning: "5:00 AM - 1:00 PM",
      evening: "4:00 PM - 10:00 PM",
      pujaTimings: ["6:00 AM", "12:00 PM", "8:00 PM"]
    },
    festivals: [
      {
        name: {
          english: "Bonalu",
          telugu: "బోనాలు"
        },
        date: "2024-07-28",
        description: {
          english: "Grand Bonalu festival with processions and cultural programs",
          telugu: "ఊరేగింపులు మరియు సాంస్కృతిక కార్యక్రమాలతో గొప్ప బోనాలు పండుగ"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-40-2780-1234"
    },
    features: ["Bonalu Festival", "Cultural Center", "Historic Importance", "Community Celebration"],
    isOpen: true,
    popularity: 4,
    templeType: "Ancient"
  },
  {
    id: "17",
    name: {
      english: "Kaleshwaram (Kaleshwara Mukteswara Swamy)",
      telugu: "కాళేశ్వరం (కాళేశ్వర ముక్తేశ్వర స్వామి)"
    },
    deity: {
      english: "Lord Shiva",
      telugu: "శివుడు"
    },
    district: "Jayashankar Bhupalpally",
    state: "TS",
    location: {
      latitude: 18.6667,
      longitude: 79.9167,
      address: {
        english: "Kaleshwaram, Jayashankar Bhupalpally, Telangana",
        telugu: "కాళేశ్వరం, జయశంకర్ భూపాలపల్లి, తెలంగాణ"
      }
    },
    description: {
      english: "Temple complex on Godavari river, associated with Kaleshwaram project region.",
      telugu: "గోదావరి నదిపై ఆలయ సముదాయం, కాళేశ్వరం ప్రాజెక్ట్ ప్రాంతంతో సంబంధం."
    },
    history: {
      english: "Ancient Shiva temple with significance in regional irrigation and water management.",
      telugu: "ప్రాంతీయ నీటిపారుదల మరియు నీటి నిర్వహణలో ప్రాముఖ్యత కలిగిన పురాతన శివ ఆలయం."
    },
    timings: {
      morning: "5:00 AM - 1:00 PM",
      evening: "4:00 PM - 9:00 PM",
      pujaTimings: ["6:00 AM", "12:00 PM", "7:00 PM"]
    },
    festivals: [
      {
        name: {
          english: "Maha Shivaratri",
          telugu: "మహా శివరాత్రి"
        },
        date: "2024-03-08",
        description: {
          english: "Special celebration at the river temple",
          telugu: "నది ఆలయంలో ప్రత్యేక వేడుకలు"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-8748-266666"
    },
    features: ["River Temple", "Engineering Marvel", "Water Connection", "Regional Importance"],
    isOpen: true,
    popularity: 3,
    templeType: "River"
  },
  
  // ANDHRA PRADESH TEMPLES (26-50)
  {
    id: "26",
    name: {
      english: "Tirumala Venkateswara Temple (Tirupati)",
      telugu: "తిరుమల వేంకటేశ్వర స్వామి ఆలయం (తిరుపతి)"
    },
    deity: {
      english: "Lord Venkateswara",
      telugu: "వేంకటేశ్వర స్వామి"
    },
    district: "Chittoor",
    state: "AP",
    location: {
      latitude: 13.6833,
      longitude: 79.3167,
      address: {
        english: "Tirumala Hills, Tirupati, Chittoor, Andhra Pradesh",
        telugu: "తిరుమల కొండలు, తిరుపతి, చిత్తూర్, ఆంధ్రప్రదేశ్"
      }
    },
    description: {
      english: "One of the most visited and wealthiest temples in the world, dedicated to Lord Venkateswara.",
      telugu: "ప్రపంచంలో అత్యధికంగా సందర్శించే మరియు అత్యంత ధనవంతమైన ఆలయం, వేంకటేశ్వర స్వామికి అంకితం."
    },
    history: {
      english: "Ancient temple with references in Puranas, center of Vaishnavism for over 1000 years.",
      telugu: "పురాణాలలో ప్రస్తావనలతో కూడిన పురాతన ఆలయం, 1000 సంవత్సరాలకు మించి వైష్ణవ మత కేంద్రం."
    },
    timings: {
      morning: "3:00 AM - 1:00 PM",
      evening: "3:00 PM - 10:00 PM",
      pujaTimings: ["3:30 AM", "6:30 AM", "9:00 AM", "12:30 PM", "6:30 PM", "8:00 PM"]
    },
    festivals: [
      {
        name: {
          english: "Brahmotsavam",
          telugu: "బ్రహ్మోత్సవం"
        },
        date: "2024-09-15",
        description: {
          english: "Grand 9-day annual festival with millions of devotees",
          telugu: "లక్షలాది భక్తులతో 9 రోజుల గొప్ప వార్షిక ఉత్సవం"
        }
      },
      {
        name: {
          english: "Vaikunta Ekadashi",
          telugu: "వైకుంఠ ఏకాదశి"
        },
        date: "2024-12-11",
        description: {
          english: "Most sacred day for Vishnu devotees",
          telugu: "విష్ణు భక్తులకు అత్యంత పవిత్రమైన దినం"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-877-2277777",
      website: "https://www.tirumala.org"
    },
    features: ["World's Richest Temple", "Laddu Prasadam", "VIP Darshan", "Accommodation"],
    isOpen: true,
    popularity: 5,
    templeType: "Hill"
  },
  {
    id: "27",
    name: {
      english: "Srisailam Mallikarjuna Jyotirlinga Temple",
      telugu: "శ్రీశైలం మల్లికార్జున జ్యోతిర్లింగ ఆలయం"
    },
    deity: {
      english: "Lord Shiva / Mallikarjuna",
      telugu: "శివుడు / మల్లికార్జున"
    },
    district: "Nandyal",
    state: "AP",
    location: {
      latitude: 16.0730,
      longitude: 78.8682,
      address: {
        english: "Srisailam, Nandyal, Andhra Pradesh",
        telugu: "శ్రీశైలం, నంద్యాల, ఆంధ్రప్రదేశ్"
      }
    },
    description: {
      english: "Important Jyotirlinga and Shakti Peetha, one of the holiest Shiva temples.",
      telugu: "ముఖ్యమైన జ్యోతిర్లింగం మరియు శక్తిపీఠం, అత్యంత పవిత్రమైన శివ ఆలయాలలో ఒకటి."
    },
    history: {
      english: "Ancient temple mentioned in Skanda Purana, significant for both Shaivism and Shaktism.",
      telugu: "స్కంద పురాణంలో ప్రస్తావించబడిన పురాతన ఆలయం, శైవం మరియు శాక్తం రెండింటికీ ప్రాముఖ్యత."
    },
    timings: {
      morning: "4:00 AM - 1:00 PM",
      evening: "3:00 PM - 10:00 PM",
      pujaTimings: ["4:30 AM", "6:00 AM", "9:00 AM", "12:00 PM", "6:00 PM", "8:30 PM"]
    },
    festivals: [
      {
        name: {
          english: "Maha Shivaratri",
          telugu: "మహా శివరాత్రి"
        },
        date: "2024-03-08",
        description: {
          english: "Grand celebration at the Jyotirlinga",
          telugu: "జ్యోతిర్లింగంలో గొప్ప వేడుకలు"
        }
      },
      {
        name: {
          english: "Srisailam Brahmotsavam",
          telugu: "శ్రీశైలం బ్రహ్మోత్సవం"
        },
        date: "2024-03-20",
        description: {
          english: "Annual temple festival",
          telugu: "వార్షిక ఆలయ ఉత్సవం"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-8524-270777",
      website: "https://www.srisailamonline.com"
    },
    features: ["Jyotirlinga", "Shakti Peetha", "Jungle Location", "Spiritual Significance"],
    isOpen: true,
    popularity: 5,
    templeType: "Hill"
  },
  {
    id: "28",
    name: {
      english: "Kanaka Durga Temple",
      telugu: "కనక దుర్గా ఆలయం"
    },
    deity: {
      english: "Goddess Kanaka Durga",
      telugu: "కనక దుర్గమ్మ"
    },
    district: "Krishna",
    state: "AP",
    location: {
      latitude: 16.5062,
      longitude: 80.6480,
      address: {
        english: "Indrakeeladri, Vijayawada, Krishna District, Andhra Pradesh",
        telugu: "ఇంద్రకీలాద్రి, విజయవాడ, కృష్ణా జిల్లా, ఆంధ్రప్రదేశ్"
      }
    },
    description: {
      english: "Hilltop temple on Indrakeeladri overlooking Krishna river, major Shakti Peetha.",
      telugu: "కృష్ణా నదిని చూస్తూ ఇంద్రకీలాద్రి కొండపై ఉన్న ఆలయం, ప్రధాన శక్తిపీఠం."
    },
    history: {
      english: "Ancient temple with mentions in Puranas, center of Devi worship in Andhra Pradesh.",
      telugu: "పురాణాలలో ప్రస్తావనలతో కూడిన పురాతన ఆలయం, ఆంధ్రప్రదేశ్‌లో దేవి ఆరాధనా కేంద్రం."
    },
    timings: {
      morning: "4:00 AM - 12:30 PM",
      evening: "4:30 PM - 9:00 PM",
      pujaTimings: ["4:30 AM", "7:00 AM", "12:00 PM", "6:00 PM", "8:30 PM"]
    },
    festivals: [
      {
        name: {
          english: "Dussehra (Navratri)",
          telugu: "దసరా (నవరాత్రి)"
        },
        date: "2024-10-03",
        description: {
          english: "Grand 10-day festival celebrating divine feminine power",
          telugu: "దైవిక స్త్రీ శక్తిని జరుపుకునే 10 రోజుల గొప్ప పండుగ"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-866-2577777",
      website: "https://www.kanakadurgamma.ap.gov.in"
    },
    features: ["Shakti Peetha", "River View", "Cable Car", "Dussehra Celebrations"],
    isOpen: true,
    popularity: 5,
    templeType: "Hill"
  },
  {
    id: "29",
    name: {
      english: "Srikalahasti Temple",
      telugu: "శ్రీకాళహస్తి ఆలయం"
    },
    deity: {
      english: "Lord Shiva (Vayu Linga)",
      telugu: "శివుడు (వాయు లింగం)"
    },
    district: "Chittoor",
    state: "AP",
    location: {
      latitude: 13.7500,
      longitude: 79.7000,
      address: {
        english: "Srikalahasti, Near Tirupati, Chittoor, Andhra Pradesh",
        telugu: "శ్రీకాళహస్తి, తిరుపతి దగ్గర, చిత్తూర్, ఆంధ్రప్రదేశ్"
      }
    },
    description: {
      english: "Famous for Rahu-Ketu worship and Vayu Lingam, one of the Pancha Bhoota Sthalams.",
      telugu: "రాహు-కేతువుల ఆరాధన మరియు వాయు లింగానికి ప్రసిద్ధం, పంచ భూత స్థలాలలో ఒకటి."
    },
    history: {
      english: "Ancient temple representing Air element, significant for Rahu-Ketu doshas removal.",
      telugu: "వాయు తత్వాన్ని సూచించే పురాతన ఆలయం, రాహు-కేతు దోషాల నివారణకు ప్రాముఖ్యత."
    },
    timings: {
      morning: "6:00 AM - 1:00 PM",
      evening: "4:00 PM - 9:00 PM",
      pujaTimings: ["6:30 AM", "12:00 PM", "6:30 PM", "8:30 PM"]
    },
    festivals: [
      {
        name: {
          english: "Maha Shivaratri",
          telugu: "మహా శివరాత్రి"
        },
        date: "2024-03-08",
        description: {
          english: "Special Rahu-Ketu puja and celebrations",
          telugu: "రాహు-కేతు ప్రత్యేక పూజలు మరియు వేడుకలు"
        }
      },
      {
        name: {
          english: "Karthika Deepam",
          telugu: "కార్తిక దీపం"
        },
        date: "2024-11-15",
        description: {
          english: "Festival of lights at the temple",
          telugu: "ఆలయంలో దీపాల పండుగ"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-8570-222333"
    },
    features: ["Rahu-Ketu Temple", "Vayu Lingam", "Pancha Bhoota Sthalam", "Dosha Nivarana"],
    isOpen: true,
    popularity: 4,
    templeType: "Ancient"
  },
  {
    id: "30",
    name: {
      english: "Simhachalam Temple",
      telugu: "సింహాచలం ఆలయం"
    },
    deity: {
      english: "Lord Varaha Narasimha",
      telugu: "వరాహ నరసింహ స్వామి"
    },
    district: "Visakhapatnam",
    state: "AP",
    location: {
      latitude: 17.7614,
      longitude: 83.2993,
      address: {
        english: "Simhachalam, Visakhapatnam, Andhra Pradesh",
        telugu: "సింహాచలం, విశాఖపట్నం, ఆంధ్రప్రదేశ్"
      }
    },
    description: {
      english: "Prominent temple near Visakhapatnam with unique Varaha Narasimha form and special rituals.",
      telugu: "విశాఖపట్నం దగ్గర ప్రత్యేకమైన వరాహ నరసింహ రూపం మరియు ప్రత్యేక ఆచారాలతో కూడిన ప్రముఖ ఆలయం."
    },
    history: {
      english: "Ancient temple with unique deity form combining Varaha and Narasimha avatars of Vishnu.",
      telugu: "విష్ణువు యొక్క వరాహ మరియు నరసింహ అవతారాలను కలిపిన ప్రత్యేక దేవత రూపంతో కూడిన పురాతన ఆలయం."
    },
    timings: {
      morning: "4:00 AM - 1:00 PM",
      evening: "4:00 PM - 9:00 PM",
      pujaTimings: ["4:30 AM", "12:00 PM", "6:00 PM", "8:30 PM"]
    },
    festivals: [
      {
        name: {
          english: "Chandanotsavam",
          telugu: "చందనోత్సవం"
        },
        date: "2024-04-10",
        description: {
          english: "Annual sandalwood paste festival",
          telugu: "వార్షిక చందన లేపన ఉత్సవం"
        }
      },
      {
        name: {
          english: "Narasimha Jayanti",
          telugu: "నరసింహ జయంతి"
        },
        date: "2024-05-22",
        description: {
          english: "Birth anniversary of Lord Narasimha",
          telugu: "నరసింహ స్వామి జన్మదిన వేడుకలు"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-891-2789999"
    },
    features: ["Unique Deity Form", "Chandanotsavam", "Hill Location", "Ancient Architecture"],
    isOpen: true,
    popularity: 4,
    templeType: "Hill"
  },
  {
    id: "31",
    name: {
      english: "Annavaram Satyanarayana Swamy Temple",
      telugu: "అన్నవరం సత్యనారాయణ స్వామి ఆలయం"
    },
    deity: {
      english: "Lord Satyanarayana (Venkateswara form)",
      telugu: "సత్యనారాయణ స్వామి (వేంకటేశ్వర రూపం)"
    },
    district: "Kakinada",
    state: "AP",
    location: {
      latitude: 17.1272,
      longitude: 82.1108,
      address: {
        english: "Annavaram, Kakinada District, Andhra Pradesh",
        telugu: "అన్నవరం, కాకినాడ జిల్లా, ఆంధ్రప్రదేశ్"
      }
    },
    description: {
      english: "Hilltop temple attracting pilgrims for Satyanarayana vratams and spiritual blessings.",
      telugu: "సత్యనారాయణ వ్రతాలు మరియు ఆధ్యాత్మిక అనుగ్రహాలకు తీర్థయాత్రికులను ఆకర్షించే కొండ శిఖర ఆలయం."
    },
    history: {
      english: "Sacred temple known for Satyanarayana puja and fulfillment of devotees' wishes.",
      telugu: "సత్యనారాయణ పూజలు మరియు భక్తుల కోరికల నెరవేర్పుకు ప్రసిద్ధ పవిత్ర ఆలయం."
    },
    timings: {
      morning: "4:00 AM - 1:00 PM",
      evening: "4:00 PM - 10:00 PM",
      pujaTimings: ["4:30 AM", "12:30 PM", "7:00 PM", "9:00 PM"]
    },
    festivals: [
      {
        name: {
          english: "Karthika Masam",
          telugu: "కార్తిక మాసం"
        },
        date: "2024-11-01",
        description: {
          english: "Sacred month with special pujas and celebrations",
          telugu: "ప్రత్యేక పూజలు మరియు వేడుకలతో కూడిన పవిత్ర మాసం"
        }
      },
      {
        name: {
          english: "Brahmotsavam",
          telugu: "బ్రహ్మోత్సవం"
        },
        date: "2024-02-20",
        description: {
          english: "Annual temple festival",
          telugu: "వార్షిక ఆలయ ఉత్సవం"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-8856-222777"
    },
    features: ["Satyanarayana Vratam", "Hill Temple", "Spiritual Blessings", "Popular Pilgrimage"],
    isOpen: true,
    popularity: 4,
    templeType: "Hill"
  },
  {
    id: "32",
    name: {
      english: "Kanipakam Vinayaka Temple",
      telugu: "కనిపాకం వినాయక ఆలయం"
    },
    deity: {
      english: "Lord Ganesha",
      telugu: "గణేశ స్వామి"
    },
    district: "Chittoor",
    state: "AP",
    location: {
      latitude: 13.4233,
      longitude: 79.1333,
      address: {
        english: "Kanipakam, Chittoor, Andhra Pradesh",
        telugu: "కనిపాకం, చిత్తూర్, ఆంధ్రప్రదేశ్"
      }
    },
    description: {
      english: "Famous Ganesha temple known for self-manifested idol that continues to grow in size.",
      telugu: "స్వయంభు విగ్రహం దానంతట అదే పెరుగుతూ ఉండటంతో ప్రసిద్ధ గణేశ ఆలయం."
    },
    history: {
      english: "Ancient temple with legend of growing Ganesha idol and miraculous healing powers.",
      telugu: "పెరుగుతున్న గణేశ విగ్రహం మరియు అద్భుత వైద్య శక్తుల పురాణంతో కూడిన పురాతన ఆలయం."
    },
    timings: {
      morning: "4:00 AM - 1:00 PM",
      evening: "4:00 PM - 9:00 PM",
      pujaTimings: ["4:30 AM", "12:00 PM", "6:00 PM", "8:30 PM"]
    },
    festivals: [
      {
        name: {
          english: "Vinayaka Chavithi",
          telugu: "వినాయక చవితి"
        },
        date: "2024-09-07",
        description: {
          english: "Grand Ganesha festival celebration",
          telugu: "గొప్ప గణేశ పండుగ వేడుకలు"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-8585-244444"
    },
    features: ["Self-Growing Idol", "Healing Powers", "Ancient Temple", "Ganesha Devotion"],
    isOpen: true,
    popularity: 4,
    templeType: "Ancient"
  },
  {
    id: "33",
    name: {
      english: "Draksharama (Draksharama Bhimeswara Swamy)",
      telugu: "ద్రాక్షారామ (ద్రాక్షారామ భీమేశ్వర స్వామి)"
    },
    deity: {
      english: "Lord Shiva",
      telugu: "శివుడు"
    },
    district: "East Godavari",
    state: "AP",
    location: {
      latitude: 16.9833,
      longitude: 82.0500,
      address: {
        english: "Draksharamam, East Godavari, Andhra Pradesh",
        telugu: "ద్రాక్షారామం, తూర్పు గోదావరి, ఆంధ్రప్రదేశ్"
      }
    },
    description: {
      english: "One of the Pancharama Kshetras, ancient Shiva temple with rich architectural heritage.",
      telugu: "పంచరామ క్షేత్రాలలో ఒకటి, గొప్ప వాస్తు వారసత్వంతో కూడిన పురాతన శివ ఆలయం."
    },
    history: {
      english: "Part of five sacred Shiva temples in Godavari region, built during Chalukya period.",
      telugu: "గోదావరి ప్రాంతంలోని ఐదు పవిత్ర శివ ఆలయాలలో భాగం, చాళుక్య కాలంలో నిర్మించబడింది."
    },
    timings: {
      morning: "5:00 AM - 1:00 PM",
      evening: "4:00 PM - 9:00 PM",
      pujaTimings: ["5:30 AM", "12:00 PM", "6:30 PM", "8:30 PM"]
    },
    festivals: [
      {
        name: {
          english: "Maha Shivaratri",
          telugu: "మహా శివరాత్రి"
        },
        date: "2024-03-08",
        description: {
          english: "Grand Shivaratri celebration at Pancharama temple",
          telugu: "పంచరామ ఆలయంలో గొప్ప శివరాత్రి వేడుకలు"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-883-2755555"
    },
    features: ["Pancharama Kshetra", "Ancient Architecture", "Shiva Temple", "Cultural Heritage"],
    isOpen: true,
    popularity: 4,
    templeType: "Ancient"
  },
  {
    id: "34",
    name: {
      english: "Kumararama (Samalkot)",
      telugu: "కుమారారామ (సామల్కోట్)"
    },
    deity: {
      english: "Lord Shiva",
      telugu: "శివుడు"
    },
    district: "East Godavari",
    state: "AP",
    location: {
      latitude: 16.9667,
      longitude: 82.1667,
      address: {
        english: "Samalkot, East Godavari, Andhra Pradesh",
        telugu: "సామల్కోట్, తూర్పు గోదావరి, ఆంధ్రప్రదేశ్"
      }
    },
    description: {
      english: "Another Pancharama Kshetra dedicated to Lord Shiva with ancient significance.",
      telugu: "పురాతన ప్రాముఖ్యతతో కూడిన శివునికి అంకితమైన మరొక పంచరామ క్షేత్రం."
    },
    history: {
      english: "One of the five sacred temples where pieces of demon's body fell, ancient Shiva worship center.",
      telugu: "దైత్యుని శరీర భాగాలు పడిన ఐదు పవిత్ర ఆలయాలలో ఒకటి, పురాతన శివ ఆరాధనా కేంద్రం."
    },
    timings: {
      morning: "5:00 AM - 1:00 PM",
      evening: "4:00 PM - 9:00 PM",
      pujaTimings: ["5:30 AM", "12:00 PM", "6:30 PM", "8:30 PM"]
    },
    festivals: [
      {
        name: {
          english: "Maha Shivaratri",
          telugu: "మహా శివరాత్రి"
        },
        date: "2024-03-08",
        description: {
          english: "Special celebration at Pancharama shrine",
          telugu: "పంచరామ మందిరంలో ప్రత్యేక వేడుకలు"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-883-2766666"
    },
    features: ["Pancharama Kshetra", "Shiva Worship", "Ancient Heritage", "Sacred Significance"],
    isOpen: true,
    popularity: 3,
    templeType: "Ancient"
  },
  {
    id: "35",
    name: {
      english: "Ksheerarama (Palakollu)",
      telugu: "క్షీరారామ (పాలకొల్లు)"
    },
    deity: {
      english: "Lord Shiva",
      telugu: "శివుడు"
    },
    district: "West Godavari",
    state: "AP",
    location: {
      latitude: 16.5167,
      longitude: 81.7333,
      address: {
        english: "Palakollu, West Godavari, Andhra Pradesh",
        telugu: "పాలకొల్లు, పశ్చిమ గోదావరి, ఆంధ్రప్రదేశ్"
      }
    },
    description: {
      english: "One of the Pancharama shrines with ancient Shiva temple and cultural importance.",
      telugu: "పురాతన శివ ఆలయం మరియు సాంస్కృతిక ప్రాముఖ్యతతో కూడిన పంచరామ మందిరాలలో ఒకటి."
    },
    history: {
      english: "Sacred temple where milk (ksheer) was offered to Lord Shiva, part of Pancharama group.",
      telugu: "శివునికి పాలు (క్షీర) అర్పించబడిన పవిత్ర ఆలయం, పంచరామ సమూహంలో భాగం."
    },
    timings: {
      morning: "5:00 AM - 1:00 PM",
      evening: "4:00 PM - 9:00 PM",
      pujaTimings: ["5:30 AM", "12:00 PM", "6:30 PM", "8:30 PM"]
    },
    festivals: [
      {
        name: {
          english: "Maha Shivaratri",
          telugu: "మహా శివరాత్రి"
        },
        date: "2024-03-08",
        description: {
          english: "Traditional Shivaratri celebrations",
          telugu: "సాంప్రదాయ శివరాత్రి వేడుకలు"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-8814-255555"
    },
    features: ["Pancharama Temple", "Milk Offerings", "Ancient Worship", "Cultural Heritage"],
    isOpen: true,
    popularity: 3,
    templeType: "Ancient"
  },
  {
    id: "36",
    name: {
      english: "Amararama (Amaravati)",
      telugu: "అమరారామ (అమరావతి)"
    },
    deity: {
      english: "Lord Shiva",
      telugu: "శివుడు"
    },
    district: "Guntur",
    state: "AP",
    location: {
      latitude: 16.5742,
      longitude: 80.3568,
      address: {
        english: "Amaravati, Guntur Region, Andhra Pradesh",
        telugu: "అమరావతి, గుంటూరు ప్రాంతం, ఆంధ్రప్రదేశ్"
      }
    },
    description: {
      english: "Part of the Pancharama group of temples, located in the historic Amaravati region.",
      telugu: "చారిత్రక అమరావతి ప్రాంతంలో ఉన్న పంచరామ ఆలయాల సమూహంలో భాగం."
    },
    history: {
      english: "Ancient temple connected to Buddhist heritage site of Amaravati, significant Shiva shrine.",
      telugu: "అమరావతి బౌద్ధ వారసత్వ ప్రదేశంతో అనుసంధానించబడిన పురాతన ఆలయం, ముఖ్యమైన శివ మందిరం."
    },
    timings: {
      morning: "5:00 AM - 1:00 PM",
      evening: "4:00 PM - 9:00 PM",
      pujaTimings: ["5:30 AM", "12:00 PM", "6:30 PM", "8:30 PM"]
    },
    festivals: [
      {
        name: {
          english: "Local festivals",
          telugu: "స్థానిక పండుగలు"
        },
        date: "2024-03-15",
        description: {
          english: "Regional temple celebrations",
          telugu: "ప్రాంతీయ ఆలయ వేడుకలు"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-863-2777777"
    },
    features: ["Pancharama Temple", "Historic Location", "Cultural Significance", "Ancient Heritage"],
    isOpen: true,
    popularity: 3,
    templeType: "Ancient"
  },
  {
    id: "37",
    name: {
      english: "Lepakshi Veerabhadra Swamy Temple",
      telugu: "లేపాక్షి వీరభద్ర స్వామి ఆలయం"
    },
    deity: {
      english: "Lord Veerabhadra / Shiva",
      telugu: "వీరభద్రుడు / శివుడు"
    },
    district: "Anantapur",
    state: "AP",
    location: {
      latitude: 14.1272,
      longitude: 77.6117,
      address: {
        english: "Lepakshi, Anantapur, Andhra Pradesh",
        telugu: "లేపాక్షి, అనంతపురం, ఆంధ్రప్రదేశ్"
      }
    },
    description: {
      english: "Famous for monolithic Nandi, hanging pillar, and beautiful Vijayanagara architecture.",
      telugu: "ఏకశిల నంది, వేలాడే స్తంభం మరియు అందమైన విజయనగర వాస్తుశిల్పానికి ప్రసిద్ధం."
    },
    history: {
      english: "16th-century temple built during Vijayanagara period, famous for architectural marvels.",
      telugu: "విజయనగర కాలంలో నిర్మించిన 16వ శతాబ్ద ఆలయం, వాస్తు అద్భుతాలకు ప్రసిద్ధం."
    },
    timings: {
      morning: "6:00 AM - 1:00 PM",
      evening: "3:00 PM - 8:00 PM",
      pujaTimings: ["6:30 AM", "12:00 PM", "6:00 PM", "7:30 PM"]
    },
    festivals: [
      {
        name: {
          english: "Maha Shivaratri",
          telugu: "మహా శివరాత్రి"
        },
        date: "2024-03-08",
        description: {
          english: "Special celebration with cultural programs",
          telugu: "సాంస్కృతిక కార్యక్రమాలతో ప్రత్యేక వేడుకలు"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-8555-266666"
    },
    features: ["Hanging Pillar", "Monolithic Nandi", "Vijayanagara Architecture", "Mural Paintings"],
    isOpen: true,
    popularity: 4,
    templeType: "Ancient"
  },
  {
    id: "38",
    name: {
      english: "Penchalakona Sri Venkateswara Swamy Temple",
      telugu: "పెంచలకోన శ్రీ వేంకటేశ్వర స్వామి ఆలయం"
    },
    deity: {
      english: "Lord Venkateswara",
      telugu: "వేంకటేశ్వర స్వామి"
    },
    district: "Nellore",
    state: "AP",
    location: {
      latitude: 14.2833,
      longitude: 79.2333,
      address: {
        english: "Penchalakona, Nellore, Andhra Pradesh",
        telugu: "పెంచలకోన, నెల్లూర్, ఆంధ్రప్రదేశ్"
      }
    },
    description: {
      english: "Hill temple in Nellore district dedicated to Lord Venkateswara with natural beauty.",
      telugu: "సహజ అందంతో కూడిన నెల్లూర్ జిల్లాలో వేంకటేశ్వర స్వామికి అంకితమైన కొండ ఆలయం."
    },
    history: {
      english: "Ancient hill temple with legends connecting to Tirumala, sacred Vaishnavite site.",
      telugu: "తిరుమలతో అనుసంధానించే పురాణాలతో కూడిన పురాతన కొండ ఆలయం, పవిత్ర వైష్ణవ ప్రదేశం."
    },
    timings: {
      morning: "5:00 AM - 1:00 PM",
      evening: "4:00 PM - 9:00 PM",
      pujaTimings: ["5:30 AM", "12:00 PM", "6:30 PM", "8:30 PM"]
    },
    festivals: [
      {
        name: {
          english: "Annual temple festival",
          telugu: "వార్షిక ఆలయ ఉత్సవం"
        },
        date: "2024-03-25",
        description: {
          english: "Traditional temple celebration",
          telugu: "సాంప్రదాయ ఆలయ వేడుకలు"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-8623-255555"
    },
    features: ["Hill Temple", "Natural Beauty", "Venkateswara Worship", "Peaceful Environment"],
    isOpen: true,
    popularity: 3,
    templeType: "Hill"
  },
  {
    id: "39",
    name: {
      english: "Mahanandi Temple",
      telugu: "మహానంది ఆలయం"
    },
    deity: {
      english: "Lord Shiva",
      telugu: "శివుడు"
    },
    district: "Nandyal",
    state: "AP",
    location: {
      latitude: 15.2167,
      longitude: 78.4667,
      address: {
        english: "Mahanandi, Nandyal, Andhra Pradesh",
        telugu: "మహానంది, నంద్యాల, ఆంధ్రప్రదేశ్"
      }
    },
    description: {
      english: "Historic temple in Nandyal area with natural springs and Shiva worship.",
      telugu: "సహజ నీటి మడుగులు మరియు శివ ఆరాధనతో కూడిన నంద్యాల ప్రాంతంలోని చారిత్రక ఆలయం."
    },
    history: {
      english: "Ancient temple known for natural springs and traditional Shiva worship practices.",
      telugu: "సహజ నీటి మడుగులు మరియు సాంప్రదాయ శివ ఆరాధన పద్ధతులకు ప్రసిద్ధ పురాతన ఆలయం."
    },
    timings: {
      morning: "5:00 AM - 1:00 PM",
      evening: "4:00 PM - 9:00 PM",
      pujaTimings: ["5:30 AM", "12:00 PM", "6:30 PM", "8:30 PM"]
    },
    festivals: [
      {
        name: {
          english: "Maha Shivaratri",
          telugu: "మహా శివరాత్రి"
        },
        date: "2024-03-08",
        description: {
          english: "Traditional Shivaratri celebration",
          telugu: "సాంప్రదాయ శివరాత్రి వేడుకలు"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-8514-266666"
    },
    features: ["Natural Springs", "Historic Temple", "Shiva Worship", "Peaceful Location"],
    isOpen: true,
    popularity: 3,
    templeType: "Ancient"
  },
  {
    id: "40",
    name: {
      english: "Srikurmam Temple",
      telugu: "శ్రీకూర్మం ఆలయం"
    },
    deity: {
      english: "Lord Vishnu (Kurma Avatar)",
      telugu: "విష్ణువు (కూర్మ అవతారం)"
    },
    district: "Srikakulam",
    state: "AP",
    location: {
      latitude: 18.3000,
      longitude: 84.1167,
      address: {
        english: "Srikurmam, Srikakulam, Andhra Pradesh",
        telugu: "శ్రీకూర్మం, శ్రీకాకుళం, ఆంధ్రప్రదేశ్"
      }
    },
    description: {
      english: "Unique Vaishnava temple in north coastal AP dedicated to Kurma (Tortoise) avatar of Vishnu.",
      telugu: "విష్ణువు యొక్క కూర్మ (తాబేలు) అవతారానికి అంకితమైన ఉత్తర తీర ఆంధ్రప్రదేశ్‌లోని ప్రత్యేకమైన వైష్ణవ ఆలయం."
    },
    history: {
      english: "Ancient temple representing Kurma avatar, unique among Vishnu temples in the region.",
      telugu: "కూర్మ అ���తారాన్ని సూచించే పురాతన ఆలయం, ప్రాంతంలోని విష్ణు ఆలయాలలో ప్రత్యేకమైనది."
    },
    timings: {
      morning: "5:00 AM - 1:00 PM",
      evening: "4:00 PM - 9:00 PM",
      pujaTimings: ["5:30 AM", "12:00 PM", "6:30 PM", "8:30 PM"]
    },
    festivals: [
      {
        name: {
          english: "Annual brahmotsavam",
          telugu: "వార్షిక బ్రహ్మోత్సవం"
        },
        date: "2024-04-15",
        description: {
          english: "Annual temple festival celebration",
          telugu: "వార్షిక ఆలయ ఉత్సవ వేడుకలు"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-8942-266666"
    },
    features: ["Kurma Avatar", "Unique Temple", "Coastal Location", "Vishnu Worship"],
    isOpen: true,
    popularity: 3,
    templeType: "Ancient"
  },
  {
    id: "41",
    name: {
      english: "Ramatheertham Temple",
      telugu: "రామతీర్థం ఆలయం"
    },
    deity: {
      english: "Lord Rama / Shiva",
      telugu: "రామ / శివుడు"
    },
    district: "Vizianagaram",
    state: "AP",
    location: {
      latitude: 18.2500,
      longitude: 83.4167,
      address: {
        english: "Ramatheertham, Vizianagaram, Andhra Pradesh",
        telugu: "రామతీర్థం, విజయనగరం, ఆంధ్రప్రదేశ్"
      }
    },
    description: {
      english: "Ancient temple complex with scenic hills, dedicated to both Rama and Shiva worship.",
      telugu: "దృశ్యమాన కొండలతో కూడిన పురాతన ఆలయ సముదాయం, రామ మరియు శివ ఆరాధన రెండింటికీ అంకితం."
    },
    history: {
      english: "Historic temple with connections to Ramayana, beautiful natural setting in hills.",
      telugu: "రామాయణంతో అనుసంధానాలు కలిగిన చారిత్రక ఆలయం, కొండలలో అందమైన సహజ వాతావరణం."
    },
    timings: {
      morning: "5:00 AM - 1:00 PM",
      evening: "4:00 PM - 9:00 PM",
      pujaTimings: ["5:30 AM", "12:00 PM", "6:30 PM", "8:30 PM"]
    },
    festivals: [
      {
        name: {
          english: "Rama Navami",
          telugu: "రామ నవమి"
        },
        date: "2024-04-17",
        description: {
          english: "Lord Rama's birthday celebration",
          telugu: "రామచంద్రుని జన్మదిన వేడుకలు"
        }
      }
    ],
    images: [],
    contact: {
      phone: "+91-8922-255555"
    },
    features: ["Hill Temple", "Rama Connection", "Scenic Beauty", "Ancient Heritage"],
    isOpen: true,
    popularity: 3,
    templeType: "Hill"
  }
];

export const districts = {
  TS: [
    "Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Adilabad",
    "Mahbubnagar", "Rangareddy", "Nalgonda", "Medak", "Jagtial", "Nirmal",
    "Bhadradri Kothagudem", "Siddipet", "Sangareddy", "Yadadri Bhuvanagiri",
    "Mulugu", "Vikarabad", "Medchal-Malkajgiri", "Rajanna Sircilla", "Jayashankar Bhupalpally"
  ],
  AP: [
    "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati",
    "Rajahmundry", "Kakinada", "Eluru", "Ongole", "Nandyal", "Machilipatnam",
    "Tenali", "Proddatur", "Chittoor", "East Godavari", "West Godavari", "Krishna",
    "Anantapur", "Srikakulam", "Vizianagaram"
  ]
};

export const deities = [
  "Lord Vishnu", "Lord Shiva", "Lord Rama", "Lord Krishna", "Lord Hanuman",
  "Lord Ganesha", "Goddess Durga", "Goddess Lakshmi", "Goddess Saraswathi",
  "Lord Venkateswara", "Lord Narasimha", "Lord Murugan", "Goddess Mahankali",
  "Lord Mallikarjuna", "Mallanna", "Jain Tirthankaras"
];

export const templeTypes = ["Ancient", "Modern", "Cave", "Hill", "River"];