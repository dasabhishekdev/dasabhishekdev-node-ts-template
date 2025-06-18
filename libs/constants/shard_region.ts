export class ShardRegion {
  private static readonly regions = Object.freeze<{ [key: string]: string }>({
    CANADA: "CA",
    INDIA: "IN",
    UNITED_STATES: "US",
    EUROPE: "EU",
    AUSTRALIA: "AU",
    UNITED_KINGDOM: "UK",
    JAPAN: "JP",
    CHINA: "CN",
    BRAZIL: "BR",
    SOUTH_AFRICA: "ZA",
    MIDDLE_EAST: "ME",
    SOUTHEAST_ASIA: "SEA",
    GLOBAL: "GLOBAL",
    ASIA_PACIFIC: "APAC",
    LATIN_AMERICA: "LATAM",
    AFRICA: "AF",
    RUSSIA: "RU",
    MEXICO: "MX",
    ARGENTINA: "AR",
    GERMANY: "DE",
    FRANCE: "FR",
    ITALY: "IT",
    SPAIN: "ES",
    NETHERLANDS: "NL",
    SWEDEN: "SE",
    NORWAY: "NO",
    DENMARK: "DK",
    POLAND: "PL",
    SWITZERLAND: "CH",
    BELGIUM: "BE",
    AUSTRIA: "AT",
    FINLAND: "FI",
    IRELAND: "IE",
    PORTUGAL: "PT",
    TURKEY: "TR",
    ISRAEL: "IL",
  });

  static all() {
    return this.regions;
  }

  static isValidRegion(user_region: string, region: TShardRegion): boolean {
    const validRegions = Object.values(this.regions);
    return validRegions.includes(user_region) && validRegions.includes(region);
  }
}

export type TShardRegion = (typeof ShardRegion)["all"] extends () => infer R
  ? R extends Record<string, infer V>
    ? V
    : never
  : never;

export default ShardRegion;
