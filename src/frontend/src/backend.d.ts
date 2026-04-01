import type { Principal } from "@icp-sdk/core/principal";
import type { PortfolioItem, Testimonial, PricingPackage, ContactSubmission } from "./declarations/backend.did";
export type { PortfolioItem, Testimonial, PricingPackage, ContactSubmission };
export interface Some<T> { __kind__: "Some"; value: T; }
export interface None { __kind__: "None"; }
export type Option<T> = Some<T> | None;
export interface backendInterface {
  adminLogin(username: string, password: string): Promise<[] | [string]>;
  adminLogout(token: string): Promise<boolean>;
  checkSession(token: string): Promise<boolean>;
  getPortfolioItems(): Promise<Array<PortfolioItem>>;
  addPortfolioItem(token: string, title: string, cuisine: string, description: string, imageUrl: string, projectUrl: string): Promise<[] | [PortfolioItem]>;
  updatePortfolioItem(token: string, id: bigint, title: string, cuisine: string, description: string, imageUrl: string, projectUrl: string): Promise<boolean>;
  deletePortfolioItem(token: string, id: bigint): Promise<boolean>;
  getTestimonials(): Promise<Array<Testimonial>>;
  addTestimonial(token: string, clientName: string, restaurantName: string, location: string, quote: string, rating: bigint, avatarUrl: string): Promise<[] | [Testimonial]>;
  updateTestimonial(token: string, id: bigint, clientName: string, restaurantName: string, location: string, quote: string, rating: bigint, avatarUrl: string): Promise<boolean>;
  deleteTestimonial(token: string, id: bigint): Promise<boolean>;
  getPricingPackages(): Promise<Array<PricingPackage>>;
  addPricingPackage(token: string, name: string, price: string, description: string, features: string[], highlighted: boolean, ctaText: string): Promise<[] | [PricingPackage]>;
  updatePricingPackage(token: string, id: bigint, name: string, price: string, description: string, features: string[], highlighted: boolean, ctaText: string): Promise<boolean>;
  deletePricingPackage(token: string, id: bigint): Promise<boolean>;
  submitContact(name: string, email: string, phone: string, restaurantName: string, message: string): Promise<bigint>;
  getContactSubmissions(token: string): Promise<[] | [Array<ContactSubmission>]>;
  markContactRead(token: string, id: bigint): Promise<boolean>;
  deleteContactSubmission(token: string, id: bigint): Promise<boolean>;
  _initializeAccessControlWithSecret(secret: string): Promise<undefined>;
}
