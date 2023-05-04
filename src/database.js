import Database from '../js/dbMethod.js'

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
  yopaaa: { visitors: new Database('visitors-yopaaa', schema) }
}

export { schema, users }
