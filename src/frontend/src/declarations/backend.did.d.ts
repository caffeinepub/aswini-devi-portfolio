/* eslint-disable */
// @ts-nocheck
import type { ActorMethod } from '@icp-sdk/core/agent';
import type { IDL } from '@icp-sdk/core/candid';
import type { Principal } from '@icp-sdk/core/principal';

export interface PortfolioItem {
  id: bigint;
  title: string;
  cuisine: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  sortOrder: bigint;
}
export interface Testimonial {
  id: bigint;
  clientName: string;
  restaurantName: string;
  location: string;
  quote: string;
  rating: bigint;
  avatarUrl: string;
  sortOrder: bigint;
}
export interface PricingPackage {
  id: bigint;
  name: string;
  price: string;
  description: string;
  features: Array<string>;
  highlighted: boolean;
  ctaText: string;
  sortOrder: bigint;
}
export interface ContactSubmission {
  id: bigint;
  name: string;
  email: string;
  phone: string;
  restaurantName: string;
  message: string;
  timestamp: bigint;
  isRead: boolean;
}
export interface _SERVICE {
  adminLogin: ActorMethod<[string, string], [] | [string]>;
  adminLogout: ActorMethod<[string], boolean>;
  checkSession: ActorMethod<[string], boolean>;
  getPortfolioItems: ActorMethod<[], Array<PortfolioItem>>;
  addPortfolioItem: ActorMethod<[string, string, string, string, string, string], [] | [PortfolioItem]>;
  updatePortfolioItem: ActorMethod<[string, bigint, string, string, string, string, string], boolean>;
  deletePortfolioItem: ActorMethod<[string, bigint], boolean>;
  getTestimonials: ActorMethod<[], Array<Testimonial>>;
  addTestimonial: ActorMethod<[string, string, string, string, string, bigint, string], [] | [Testimonial]>;
  updateTestimonial: ActorMethod<[string, bigint, string, string, string, string, bigint, string], boolean>;
  deleteTestimonial: ActorMethod<[string, bigint], boolean>;
  getPricingPackages: ActorMethod<[], Array<PricingPackage>>;
  addPricingPackage: ActorMethod<[string, string, string, string, Array<string>, boolean, string], [] | [PricingPackage]>;
  updatePricingPackage: ActorMethod<[string, bigint, string, string, string, Array<string>, boolean, string], boolean>;
  deletePricingPackage: ActorMethod<[string, bigint], boolean>;
  submitContact: ActorMethod<[string, string, string, string, string], bigint>;
  getContactSubmissions: ActorMethod<[string], [] | [Array<ContactSubmission>]>;
  markContactRead: ActorMethod<[string, bigint], boolean>;
  deleteContactSubmission: ActorMethod<[string, bigint], boolean>;
  _initializeAccessControlWithSecret: ActorMethod<[string], undefined>;
}
export declare const idlService: IDL.ServiceClass;
export declare const idlInitArgs: IDL.Type[];
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
