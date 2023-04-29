import Database from '../../js/dbMethod.js'

/*
{
  "_id": "A0QeW4cQ0YseEmn0Up-OT",
  "ua": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
  "browser": {
    "name": "Chrome",
    "version": "112.0.0.0",
    "major": "112"
  },
  "engine": {
    "name": "Blink",
    "version": "112.0.0.0"
  },
  "os": {
    "name": "Linux",
    "version": "x86_64"
  },
  "cpu": {
    "architecture": "amd64"
  },
  "visitor": {
    "ip": "36.77.113.85",
    "network": "36.77.112.0/21",
    "version": "IPv4",
    "city": "Bandung",
    "region": "West Java",
    "region_code": "JB",
    "country": "ID",
    "country_name": "Indonesia",
    "country_code": "ID",
    "country_code_iso3": "IDN",
    "country_capital": "Jakarta",
    "country_tld": ".id",
    "continent_code": "AS",
    "in_eu": false,
    "postal": null,
    "latitude": -6.9217,
    "longitude": 107.6071,
    "timezone": "Asia/Jakarta",
    "utc_offset": "+0700",
    "country_calling_code": "+62",
    "currency": "IDR",
    "currency_name": "Rupiah",
    "languages": "id,en,nl,jv",
    "country_area": 1919440,
    "country_population": 267663435,
    "asn": "AS7713",
    "org": "PT Telekomunikasi Indonesia"
  },
}
*/
// const schema = {
//   ua: String,
//   browser: { type: Object, default: {} },
//   engine: Object,
//   os: Object,
//   device: Object,
//   cpu: {
//     type: {
//       architecture: "amd64",
//     },
//   },
//   _id: String,
//   visitor: Object,
// };

const schema = {
  _id: String,
  ua: {
    type: String,
    required: true
  },
  browser: {
    name: {
      type: String,
      default: null
    },
    version: {
      type: String,
      default: null
    },
    major: {
      type: String,
      default: null
    }
  },
  engine: {
    name: {
      type: String,
      default: null
    },
    version: {
      type: String,
      default: null
    }
  },
  device: {
    name: {
      type: String,
      default: null
    },
    version: {
      type: String,
      default: null
    }
  },
  os: {
    name: {
      type: String,
      default: null
    },
    version: {
      type: String,
      default: null
    }
  },
  cpu: {
    architecture: {
      type: String,
      default: null
    }
  },
  visitor: {
    ip: {
      type: String,
      default: null
    },
    network: {
      type: String,
      default: null
    },
    version: {
      type: String,
      default: null
    },
    city: {
      type: String,
      default: null
    },
    region: {
      type: String,
      default: null
    },
    region_code: {
      type: String,
      default: null
    },
    country: {
      type: String,
      default: null
    },
    country_name: {
      type: String,
      default: null
    },
    country_code: {
      type: String,
      default: null
    },
    country_code_iso3: {
      type: String,
      default: null
    },
    country_capital: {
      type: String,
      default: null
    },
    country_tld: {
      type: String,
      default: null
    },
    continent_code: {
      type: String,
      default: null
    },
    in_eu: {
      type: Boolean,
      default: null
    },
    postal: {
      type: String,
      required: false
    },
    timezone: {
      type: String,
      default: null
    },
    utc_offset: {
      type: String,
      default: null
    },
    country_calling_code: {
      type: String,
      default: null
    },
    currency: {
      type: String,
      default: null
    },
    currency_name: {
      type: String,
      default: null
    },
    languages: {
      type: String,
      default: null
    },
    org: {
      type: String,
      default: null
    }
  }
}
const users = {
  yopaaa: new Database('visitors-yopaaa', schema)
}

export { schema, users }
