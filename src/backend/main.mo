import Time "mo:base/Time";
import Array "mo:base/Array";
import Int "mo:base/Int";
import Nat "mo:base/Nat";

persistent actor {
  // ─── Types
  public type PortfolioItem = {
    id : Nat;
    title : Text;
    cuisine : Text;
    description : Text;
    imageUrl : Text;
    projectUrl : Text;
    sortOrder : Nat;
  };

  public type Testimonial = {
    id : Nat;
    clientName : Text;
    restaurantName : Text;
    location : Text;
    quote : Text;
    rating : Nat;
    avatarUrl : Text;
    sortOrder : Nat;
  };

  public type PricingPackage = {
    id : Nat;
    name : Text;
    price : Text;
    description : Text;
    features : [Text];
    highlighted : Bool;
    ctaText : Text;
    sortOrder : Nat;
  };

  public type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    restaurantName : Text;
    message : Text;
    timestamp : Int;
    isRead : Bool;
  };

  // ─── State
  stable var nextPortfolioId : Nat = 6;
  stable var portfolioItems : [PortfolioItem] = [
    { id = 1; title = "Spice Garden"; cuisine = "South Indian"; description = "A vibrant website for a traditional South Indian restaurant in Hyderabad featuring digital menu and table booking."; imageUrl = ""; projectUrl = "#"; sortOrder = 1 },
    { id = 2; title = "Royal Biryani House"; cuisine = "Mughlai"; description = "Premium landing page for a biryani specialist showcasing signature dishes with WhatsApp ordering integration."; imageUrl = ""; projectUrl = "#"; sortOrder = 2 },
    { id = 3; title = "Coastal Flavours"; cuisine = "Seafood"; description = "Elegant seafood restaurant site with animated gallery, daily specials section, and Google Maps integration."; imageUrl = ""; projectUrl = "#"; sortOrder = 3 },
    { id = 4; title = "Andhra Tadka"; cuisine = "Andhra Cuisine"; description = "Bold and spicy branding site for a local Andhra restaurant with interactive menu and customer reviews."; imageUrl = ""; projectUrl = "#"; sortOrder = 4 },
    { id = 5; title = "Chai & Chaat Corner"; cuisine = "Street Food"; description = "Fun, colorful website for a chaat and street food stall with delivery info and Instagram feed integration."; imageUrl = ""; projectUrl = "#"; sortOrder = 5 }
  ];

  stable var nextTestimonialId : Nat = 6;
  stable var testimonials : [Testimonial] = [
    { id = 1; clientName = "Ramesh Babu"; restaurantName = "Spice Garden"; location = "Hyderabad, Telangana"; quote = "Aswini built us a stunning website in just 5 days! Our online orders increased by 40% in the first month. Highly recommended for any restaurant owner."; rating = 5; avatarUrl = ""; sortOrder = 1 },
    { id = 2; clientName = "Lakshmi Devi"; restaurantName = "Andhra Tadka"; location = "Vijayawada, AP"; quote = "We had no online presence before. Now customers find us on Google and WhatsApp us directly from the website. Best investment we made!"; rating = 5; avatarUrl = ""; sortOrder = 2 },
    { id = 3; clientName = "Srinivas Rao"; restaurantName = "Royal Biryani House"; location = "Guntur, AP"; quote = "Professional, fast, and very affordable. The website looks better than restaurants 10x our size. Our footfall has doubled since launching."; rating = 5; avatarUrl = ""; sortOrder = 3 },
    { id = 4; clientName = "Priya Sharma"; restaurantName = "Coastal Flavours"; location = "Visakhapatnam, AP"; quote = "Aswini understood exactly what our restaurant needed. The mobile site is beautiful and our customers love ordering through it."; rating = 5; avatarUrl = ""; sortOrder = 4 },
    { id = 5; clientName = "Venkat Reddy"; restaurantName = "Chai & Chaat Corner"; location = "Tirupati, AP"; quote = "3x more inquiries per week since our website went live. The investment paid back within the first week!"; rating = 5; avatarUrl = ""; sortOrder = 5 }
  ];

  stable var nextPricingId : Nat = 4;
  stable var pricingPackages : [PricingPackage] = [
    { id = 1; name = "Starter"; price = "₹8,999"; description = "Perfect for small restaurants just getting started online"; features = ["5-Page Website", "Mobile Responsive", "Contact Form", "Google Maps", "WhatsApp Button", "1 Month Support"]; highlighted = false; ctaText = "Get Started"; sortOrder = 1 },
    { id = 2; name = "Professional"; price = "₹14,999"; description = "Ideal for growing restaurants wanting more features"; features = ["10-Page Website", "Digital Menu", "SEO Optimized", "Photo Gallery", "Reservation Form", "Social Media Links", "3 Months Support", "Google Analytics"]; highlighted = true; ctaText = "Most Popular"; sortOrder = 2 },
    { id = 3; name = "Premium"; price = "₹24,999"; description = "Complete online presence for established restaurants"; features = ["Unlimited Pages", "Online Ordering", "Blog/News Section", "Customer Reviews", "Priority SEO", "WhatsApp Automation", "6 Months Support", "Monthly Updates"]; highlighted = false; ctaText = "Go Premium"; sortOrder = 3 }
  ];

  stable var nextContactId : Nat = 1;
  stable var contactSubmissions : [ContactSubmission] = [];

  stable var adminSessionToken : Text = "";
  stable var adminSessionCreatedAt : Int = 0;

  // ─── Admin Auth
  public func adminLogin(username : Text, password : Text) : async ?Text {
    if (username == "aswini" and password == "admin@2024") {
      let token = "sess_" # Int.toText(Time.now());
      adminSessionToken := token;
      adminSessionCreatedAt := Time.now();
      ?token
    } else {
      null
    }
  };

  func isValidSession(token : Text) : Bool {
    if (token == "") return false;
    if (adminSessionToken == "") return false;
    if (token != adminSessionToken) return false;
    let elapsed = Time.now() - adminSessionCreatedAt;
    elapsed < 86_400_000_000_000
  };

  public func adminLogout(token : Text) : async Bool {
    if (isValidSession(token)) {
      adminSessionToken := "";
      true
    } else false
  };

  public query func checkSession(token : Text) : async Bool {
    isValidSession(token)
  };

  // ─── Portfolio
  public query func getPortfolioItems() : async [PortfolioItem] {
    portfolioItems
  };

  public func addPortfolioItem(token : Text, title : Text, cuisine : Text, description : Text, imageUrl : Text, projectUrl : Text) : async ?PortfolioItem {
    if (not isValidSession(token)) return null;
    let item : PortfolioItem = { id = nextPortfolioId; title; cuisine; description; imageUrl; projectUrl; sortOrder = nextPortfolioId };
    portfolioItems := Array.append(portfolioItems, [item]);
    nextPortfolioId += 1;
    ?item
  };

  public func updatePortfolioItem(token : Text, id : Nat, title : Text, cuisine : Text, description : Text, imageUrl : Text, projectUrl : Text) : async Bool {
    if (not isValidSession(token)) return false;
    var found = false;
    portfolioItems := Array.map<PortfolioItem, PortfolioItem>(portfolioItems, func(item) {
      if (item.id == id) { found := true; { id; title; cuisine; description; imageUrl; projectUrl; sortOrder = item.sortOrder } }
      else item
    });
    found
  };

  public func deletePortfolioItem(token : Text, id : Nat) : async Bool {
    if (not isValidSession(token)) return false;
    let before = portfolioItems.size();
    portfolioItems := Array.filter<PortfolioItem>(portfolioItems, func(item) { item.id != id });
    portfolioItems.size() < before
  };

  // ─── Testimonials
  public query func getTestimonials() : async [Testimonial] {
    testimonials
  };

  public func addTestimonial(token : Text, clientName : Text, restaurantName : Text, location : Text, quote : Text, rating : Nat, avatarUrl : Text) : async ?Testimonial {
    if (not isValidSession(token)) return null;
    let item : Testimonial = { id = nextTestimonialId; clientName; restaurantName; location; quote; rating; avatarUrl; sortOrder = nextTestimonialId };
    testimonials := Array.append(testimonials, [item]);
    nextTestimonialId += 1;
    ?item
  };

  public func updateTestimonial(token : Text, id : Nat, clientName : Text, restaurantName : Text, location : Text, quote : Text, rating : Nat, avatarUrl : Text) : async Bool {
    if (not isValidSession(token)) return false;
    var found = false;
    testimonials := Array.map<Testimonial, Testimonial>(testimonials, func(t) {
      if (t.id == id) { found := true; { id; clientName; restaurantName; location; quote; rating; avatarUrl; sortOrder = t.sortOrder } }
      else t
    });
    found
  };

  public func deleteTestimonial(token : Text, id : Nat) : async Bool {
    if (not isValidSession(token)) return false;
    let before = testimonials.size();
    testimonials := Array.filter<Testimonial>(testimonials, func(t) { t.id != id });
    testimonials.size() < before
  };

  // ─── Pricing
  public query func getPricingPackages() : async [PricingPackage] {
    pricingPackages
  };

  public func addPricingPackage(token : Text, name : Text, price : Text, description : Text, features : [Text], highlighted : Bool, ctaText : Text) : async ?PricingPackage {
    if (not isValidSession(token)) return null;
    let item : PricingPackage = { id = nextPricingId; name; price; description; features; highlighted; ctaText; sortOrder = nextPricingId };
    pricingPackages := Array.append(pricingPackages, [item]);
    nextPricingId += 1;
    ?item
  };

  public func updatePricingPackage(token : Text, id : Nat, name : Text, price : Text, description : Text, features : [Text], highlighted : Bool, ctaText : Text) : async Bool {
    if (not isValidSession(token)) return false;
    var found = false;
    pricingPackages := Array.map<PricingPackage, PricingPackage>(pricingPackages, func(p) {
      if (p.id == id) { found := true; { id; name; price; description; features; highlighted; ctaText; sortOrder = p.sortOrder } }
      else p
    });
    found
  };

  public func deletePricingPackage(token : Text, id : Nat) : async Bool {
    if (not isValidSession(token)) return false;
    let before = pricingPackages.size();
    pricingPackages := Array.filter<PricingPackage>(pricingPackages, func(p) { p.id != id });
    pricingPackages.size() < before
  };

  // ─── Contact
  public func submitContact(name : Text, email : Text, phone : Text, restaurantName : Text, message : Text) : async Nat {
    let s : ContactSubmission = { id = nextContactId; name; email; phone; restaurantName; message; timestamp = Time.now(); isRead = false };
    contactSubmissions := Array.append(contactSubmissions, [s]);
    nextContactId += 1;
    s.id
  };

  public func getContactSubmissions(token : Text) : async ?[ContactSubmission] {
    if (not isValidSession(token)) return null;
    ?contactSubmissions
  };

  public func markContactRead(token : Text, id : Nat) : async Bool {
    if (not isValidSession(token)) return false;
    var found = false;
    contactSubmissions := Array.map<ContactSubmission, ContactSubmission>(contactSubmissions, func(s) {
      if (s.id == id) { found := true; { id = s.id; name = s.name; email = s.email; phone = s.phone; restaurantName = s.restaurantName; message = s.message; timestamp = s.timestamp; isRead = true } }
      else s
    });
    found
  };

  public func deleteContactSubmission(token : Text, id : Nat) : async Bool {
    if (not isValidSession(token)) return false;
    let before = contactSubmissions.size();
    contactSubmissions := Array.filter<ContactSubmission>(contactSubmissions, func(s) { s.id != id });
    contactSubmissions.size() < before
  };
};
