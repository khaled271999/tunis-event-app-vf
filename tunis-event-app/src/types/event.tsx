export interface Event {
  key: string;
  id: string;
  isExt: boolean;
  name: string;
  description: string;
  organization: {
    id: string;
    name: string;
    description: string | null;
    additionalInformation: {
      infoPhone?: string;
      resaPhone?: string;
      adminPhone?: string;
      afterSalePhone?: string;
      facebookPageUrl?: string;
      instagramProfileUrl?: string;
      publicEmail?: string;
    };
    image: {
      width: number;
      height: number;
      blurhash: string;
      filename: string;
    };
    subdomain: string;
    published: boolean;
    umamiSettings: {
      umamiWebsite: string;
      umamiShareUrl: string;
    };
    approved: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  startDate: string;
  endDate: string;
  venue: {
    name: string;
    rating?: number;
    latitude: number;
    longitude: number;
    formatted_address: string;
    address_components: Array<{
      types: string[];
      long_name: string;
      short_name: string;
    }>;
  };
  hiddenVenue: boolean;
  image: {
    path: string;
    size: number;
    width: number;
    height: number;
    blurhash: string;
    encoding: string;
    filename: string;
    mimetype: string;
    fieldname: string;
    destination: string;
    originalname: string;
  };
  link: string;
  tags: string;
  type: string;
  theme: Record<string, unknown>;
  badges: {
    approvalRequired: boolean;
    noTickets: boolean;
    hiddenTickets: boolean;
    prices: number[];
    cashless: boolean;
    almostFull: boolean;
    completelySold: boolean;
  };
  hasProjections?: boolean;
  projections?: Array<{
    id: string;
    date: string;
    tags: string[];
    eventId: string;
    organizationId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }>;
  //a changer ...
  status?: "pending" | "approved" | "rejected";
}
