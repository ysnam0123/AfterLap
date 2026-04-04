export interface teamDriver {
  driver_number: number;
  full_name: string;
  kr_name: string;
  driver_id: number;
  headshot: string;
  flag: string;
}
export interface Team2026 {
  team_name: string;
  team_kr_name: string;
  team_slug: string;
  team_colour: string;
  year: number;
  main_logo: string;
  car_img: string;
  drivers: teamDriver[];
}

export interface teamDriver {
  driver_number: number;
  full_name: string;
  kr_name: string;
  driver_id: number;
  headshot: string;
  flag: string;
}

export interface Team2026 {
  team_name: string;
  team_kr_name: string;
  team_slug: string;
  team_colour: string;
  year: number;
  main_logo: string;
  car_img: string;
  drivers: teamDriver[];
}

export const teams2026: Team2026[] = [
  {
    team_name: 'McLaren',
    team_kr_name: '맥라렌',
    team_slug: 'mclaren',
    team_colour: '#F47600',
    year: 2026,
    main_logo: '/team_main_logo/mclaren.webp',
    car_img: '/cars/2026/mclaren.svg',
    drivers: [
      {
        driver_number: 1,
        full_name: 'Lando Norris',
        kr_name: '랜도 노리스',
        driver_id: 462,
        headshot: '/driversImg/2026/landonorris.webp',
        flag: '/flag/uk.svg',
      },
      {
        driver_number: 81,
        full_name: 'Oscar Piastri',
        kr_name: '오스카 피아스트리',
        driver_id: 531,
        headshot: '/driversImg/2026/oscarpiastri.webp',
        flag: '/flag/australia.svg',
      },
    ],
  },

  {
    team_name: 'Red Bull Racing',
    team_kr_name: '레드불 레이싱',
    team_slug: 'red-bull-racing',
    team_colour: '#3671C6',
    year: 2026,
    main_logo: '/team_main_logo/redbullracing.webp',
    car_img: '/cars/2026/redbullracing.svg',
    drivers: [
      {
        driver_number: 3,
        full_name: 'Max Verstappen',
        kr_name: '막스 베르스타펜',
        driver_id: 469,
        headshot: '/driversImg/2026/maxverstappen.webp',
        flag: '/flag/netherlands.svg',
      },
      {
        driver_number: 6,
        full_name: 'Isack Hadjar',
        kr_name: '아이작 하자르',
        driver_id: 448,
        headshot: '/driversImg/2026/isackhadjar.webp',
        flag: '/flag/france.svg',
      },
    ],
  },

  {
    team_name: 'Ferrari',
    team_kr_name: '페라리',
    team_slug: 'ferrari',
    team_colour: '#ED1131',
    year: 2026,
    main_logo: '/team_main_logo/ferrari.webp',
    car_img: '/cars/2026/ferrari.svg',
    drivers: [
      {
        driver_number: 16,
        full_name: 'Charles Leclerc',
        kr_name: '샤를 르클레르',
        driver_id: 454,
        headshot: '/driversImg/2026/charlesleclerc.webp',
        flag: '/flag/monaco.svg',
      },
      {
        driver_number: 44,
        full_name: 'Lewis Hamilton',
        kr_name: '루이스 해밀턴',
        driver_id: 453,
        headshot: '/driversImg/2026/lewishamilton.webp',
        flag: '/flag/uk.svg',
      },
    ],
  },

  {
    team_name: 'Mercedes',
    team_kr_name: '메르세데스',
    team_slug: 'mercedes',
    team_colour: '#00D7B6',
    year: 2026,
    main_logo: '/team_main_logo/mercedes.webp',
    car_img: '/cars/2026/mercedes.svg',
    drivers: [
      {
        driver_number: 12,
        full_name: 'Kimi Antonelli',
        kr_name: '키미 안토넬리',
        driver_id: 507,
        headshot: '/driversImg/2026/kimiantonelli.webp',
        flag: '/flag/italy.svg',
      },
      {
        driver_number: 63,
        full_name: 'George Russell',
        kr_name: '조지 러셀',
        driver_id: 445,
        headshot: '/driversImg/2026/georgerussell.webp',
        flag: '/flag/uk.svg',
      },
    ],
  },

  {
    team_name: 'Aston Martin',
    team_kr_name: '애스턴 마틴',
    team_slug: 'aston-martin',
    team_colour: '#229971',
    year: 2026,
    main_logo: '/team_main_logo/astonmartin.webp',
    car_img: '/cars/2026/astonmartin.svg',
    drivers: [
      {
        driver_number: 14,
        full_name: 'Fernando Alonso',
        kr_name: '페르난도 알론소',
        driver_id: 446,
        headshot: '/driversImg/2026/fernandoalonso.webp',
        flag: '/flag/spain.svg',
      },
      {
        driver_number: 18,
        full_name: 'Lance Stroll',
        kr_name: '랜스 스트롤',
        driver_id: 492,
        headshot: '/driversImg/2026/lancestroll.webp',
        flag: '/flag/canada.svg',
      },
    ],
  },

  {
    team_name: 'Audi',
    team_kr_name: '아우디',
    team_slug: 'audi',
    team_colour: '#9E001C',
    year: 2026,
    main_logo: '/team_main_logo/audi.webp',
    car_img: '/cars/2026/audi.svg',
    drivers: [
      {
        driver_number: 5,
        full_name: 'Gabriel Bortoleto',
        kr_name: '가브리엘 보르톨레토',
        driver_id: 459,
        headshot: '/driversImg/2026/gabrielbortoleto.webp',
        flag: '/flag/brazil.svg',
      },
      {
        driver_number: 27,
        full_name: 'Nico Hulkenberg',
        kr_name: '니코 휠켄베르크',
        driver_id: 472,
        headshot: '/driversImg/2026/nicohulkenberg.webp',
        flag: '/flag/germany.svg',
      },
    ],
  },

  {
    team_name: 'Cadillac',
    team_kr_name: '캐딜락',
    team_slug: 'cadillac',
    team_colour: '#5A5A5A',
    year: 2026,
    main_logo: '/team_main_logo/cadillac.webp',
    car_img: '/cars/2026/cadillac.svg',
    drivers: [
      {
        driver_number: 11,
        full_name: 'Sergio Perez',
        kr_name: '세르히오 페레스',
        driver_id: 480,
        headshot: '/driversImg/2026/sergioperez.webp',
        flag: '/flag/mexico.svg',
      },
      {
        driver_number: 77,
        full_name: 'Valtteri Bottas',
        kr_name: '발테리 보타스',
        driver_id: 447,
        headshot: '/driversImg/2026/valtteribottas.webp',
        flag: '/flag/finland.svg',
      },
    ],
  },

  {
    team_name: 'Alpine',
    team_kr_name: '알핀',
    team_slug: 'alpine',
    team_colour: '#00A1E8',
    year: 2026,
    main_logo: '/team_main_logo/alpine.webp',
    car_img: '/cars/2026/alpine.svg',
    drivers: [
      {
        driver_number: 10,
        full_name: 'Pierre Gasly',
        kr_name: '피에르 가슬리',
        driver_id: 461,
        headshot: '/driversImg/2026/pierregasly.webp',
        flag: '/flag/france.svg',
      },
      {
        driver_number: 43,
        full_name: 'Franco Colapinto',
        kr_name: '프랑코 콜라핀토',
        driver_id: 451,
        headshot: '/driversImg/2026/francocolapinto.webp',
        flag: '/flag/argentina.svg',
      },
    ],
  },

  {
    team_name: 'Haas F1 Team',
    team_kr_name: '하스',
    team_slug: 'haas',
    team_colour: '#9C9FA2',
    year: 2026,
    main_logo: '/team_main_logo/haas.webp',
    car_img: '/cars/2026/haas.svg',
    drivers: [
      {
        driver_number: 31,
        full_name: 'Esteban Ocon',
        kr_name: '에스테반 오콘',
        driver_id: 483,
        headshot: '/driversImg/2026/estebanocon.webp',
        flag: '/flag/france.svg',
      },
      {
        driver_number: 87,
        full_name: 'Oliver Bearman',
        kr_name: '올리버 베어먼',
        driver_id: 484,
        headshot: '/driversImg/2026/oliverbearman.webp',
        flag: '/flag/uk.svg',
      },
    ],
  },

  {
    team_name: 'Racing Bulls',
    team_kr_name: '레이싱 불스',
    team_slug: 'racing-bulls',
    team_colour: '#6C98FF',
    year: 2026,
    main_logo: '/team_main_logo/racing_bulls.webp',
    car_img: '/cars/2026/racingbulls.svg',
    drivers: [
      {
        driver_number: 30,
        full_name: 'Liam Lawson',
        kr_name: '리암 로슨',
        driver_id: 471,
        headshot: '/driversImg/2026/liamlawson.webp',
        flag: '/flag/newzealand.svg',
      },
      {
        driver_number: 41,
        full_name: 'Arvid Lindblad',
        kr_name: '아르비드 린드블라드',
        driver_id: 460,
        headshot: '/driversImg/2026/arvidlindblad.webp',
        flag: '/flag/uk.svg',
      },
    ],
  },

  {
    team_name: 'Williams',
    team_kr_name: '윌리엄스',
    team_slug: 'williams',
    team_colour: '#1868DB',
    year: 2026,
    main_logo: '/team_main_logo/williams.webp',
    car_img: '/cars/2026/williams.svg',
    drivers: [
      {
        driver_number: 23,
        full_name: 'Alexander Albon',
        kr_name: '알렉산더 알본',
        driver_id: 525,
        headshot: '/driversImg/2026/alexanderalbon.webp',
        flag: '/flag/thailand.svg',
      },
      {
        driver_number: 55,
        full_name: 'Carlos Sainz',
        kr_name: '카를로스 사인츠',
        driver_id: 489,
        headshot: '/driversImg/2026/carlossainz.webp',
        flag: '/flag/spain.svg',
      },
    ],
  },
];
