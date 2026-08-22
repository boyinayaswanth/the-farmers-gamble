import prisma from './prisma'

export interface UserItem {
  id: string
  mobile: string
  name?: string | null
  role: 'FARMER' | 'BUYER' | 'ADMIN'
  language: string
  createdAt: string
  updatedAt: string
}

export interface FarmerProfileItem {
  id: string
  userId: string
  location?: string | null
  village?: string | null
  district?: string | null
  state?: string | null
  landSize?: number | null
  landUnit?: string | null
  soilType?: string | null
  soilPh?: number | null
  nitrogen?: number | null
  phosphorus?: number | null
  potassium?: number | null
  waterSource?: string | null
  irrigation?: boolean | null
  irrigationType?: string | null
  currentCrop?: string | null
  previousCrops?: string | null
  experienceYears?: number | null
  preferredCrops?: string | null
  budget?: number | null
  createdAt: string
  updatedAt: string
}

export interface BuyerProfileItem {
  id: string
  userId: string
  companyName?: string | null
  businessType?: string | null
  location?: string | null
  district?: string | null
  state?: string | null
  gstNumber?: string | null
  preferredCrops?: string | null
  createdAt: string
  updatedAt: string
}

export interface CropDataItem {
  id: string
  name: string
  teluguName?: string
  hindiName?: string
  category: string
  season: string
  soilTypes: string
  minPh: number
  maxPh: number
  nReqKgPerAcre: number
  pReqKgPerAcre: number
  kReqKgPerAcre: number
  waterReqMm: number
  durationDays: number
  avgYieldKgPerAcre: number
  basePricePerKg: number
  riskFactors: string
  description: string
}

export interface MarketPriceItem {
  id: string
  cropName: string
  marketLocation: string
  district: string
  state: string
  pricePerKg: number
  minPrice: number
  maxPrice: number
  priceTrend: 'Rising' | 'Falling' | 'Stable'
  demandLevel: 'HIGH' | 'MODERATE' | 'LOW'
  date: string
  isDemo: boolean
}

export interface MarketplaceProductItem {
  id: string
  farmerId: string
  farmerName?: string
  farmerMobile?: string
  crop: string
  variety?: string
  quantity: number
  unit: string
  price: number
  location: string
  district?: string
  state?: string
  harvestDate?: string
  description?: string
  imageUrl?: string
  status: 'ACTIVE' | 'PENDING_SALE' | 'SOLD' | 'ARCHIVED'
  createdAt: string
}

export interface BuyerRequestItem {
  id: string
  productId: string
  productTitle?: string
  buyerId: string
  buyerName?: string
  buyerMobile?: string
  farmerId: string
  quantity: number
  offeredPrice: number
  message?: string
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'NEGOTIATING' | 'COMPLETED'
  createdAt: string
}

export interface VoiceCallItem {
  id: string
  userId?: string | null
  callerMobile: string
  callSid: string
  direction: 'INBOUND' | 'OUTBOUND'
  status: string
  duration: number
  dtmfInput?: string | null
  intent?: string | null
  transcript?: string | null
  summary?: string | null
  sentiment?: string
  createdAt: string
}

export interface NotificationItem {
  id: string
  userId: string
  title: string
  message: string
  type: 'WEATHER' | 'MARKET' | 'FERTILIZER' | 'DISEASE' | 'BUYER_REQUEST' | 'VOICE_CALL'
  isRead: boolean
  link?: string
  createdAt: string
}

export interface OTPItem {
  id: string
  mobile: string
  codeHash: string
  attempts: number
  expiresAt: Date
  used: boolean
  userId?: string
  createdAt: Date
}

// -------------------------------------------------------------
// In-Memory Seed Storage (High availability fallback)
// -------------------------------------------------------------
const memoryStore = {
  users: [
    {
      id: 'farmer-yaswanth-1',
      mobile: '+918555864859',
      name: 'Yaswanth',
      role: 'FARMER' as const,
      language: 'en',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'buyer-srinivas-2',
      mobile: '+919123456789',
      name: 'Srinivas Reddy',
      role: 'BUYER' as const,
      language: 'en',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'admin-1',
      mobile: '+919000000000',
      name: 'Gram Panchayat Officer',
      role: 'ADMIN' as const,
      language: 'en',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ] as UserItem[],

  farmerProfiles: [
    {
      id: 'profile-yaswanth',
      userId: 'farmer-yaswanth-1',
      location: 'Anantapur, Andhra Pradesh',
      village: 'Kalyandurg',
      district: 'Anantapur',
      state: 'Andhra Pradesh',
      landSize: 3.0,
      landUnit: 'Acres',
      soilType: 'Red Sandy Loam',
      soilPh: 6.5,
      nitrogen: 210.0,
      phosphorus: 18.0,
      potassium: 140.0,
      waterSource: 'Borewell + Rainfed',
      irrigation: true,
      irrigationType: 'Drip Irrigation',
      currentCrop: 'Groundnut',
      previousCrops: 'Paddy, Maize',
      experienceYears: 12,
      preferredCrops: 'Groundnut, Cotton, Chilli',
      budget: 45000.0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ] as FarmerProfileItem[],

  buyerProfiles: [
    {
      id: 'profile-srinivas',
      userId: 'buyer-srinivas-2',
      companyName: 'Sri Venkateswara Agro Commodities',
      businessType: 'Wholesale Mandi Trader & Processor',
      location: 'Guntur & Anantapur APMC',
      district: 'Guntur',
      state: 'Andhra Pradesh',
      gstNumber: '37AAAAA0000A1Z5',
      preferredCrops: 'Groundnut, Red Chilli, Cotton, Maize, Bengal Gram',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ] as BuyerProfileItem[],

  crops: [
    {
      id: 'crop-groundnut',
      name: 'Groundnut',
      teluguName: 'వేరుశనగ (Verusanaga)',
      hindiName: 'मूंगफली (Mungphali)',
      category: 'Oilseeds',
      season: 'Kharif / Rabi',
      soilTypes: 'Red Sandy Loam, Well-drained Light Soils',
      minPh: 6.0,
      maxPh: 7.2,
      nReqKgPerAcre: 15,
      pReqKgPerAcre: 30,
      kReqKgPerAcre: 35,
      waterReqMm: 450,
      durationDays: 105,
      avgYieldKgPerAcre: 950,
      basePricePerKg: 85.0,
      riskFactors: 'Tikka leaf spot, pod borer, dry spell during pegging',
      description: 'Major cash crop with excellent drought tolerance in red soils. High domestic oil and confectionery export demand.'
    },
    {
      id: 'crop-maize',
      name: 'Maize',
      teluguName: 'మొక్కజొన్న (Mokkajnna)',
      hindiName: 'मक्का (Makka)',
      category: 'Cereals',
      season: 'Kharif / Rabi',
      soilTypes: 'Well-drained Loam, Silt Loam',
      minPh: 5.8,
      maxPh: 7.5,
      nReqKgPerAcre: 48,
      pReqKgPerAcre: 24,
      kReqKgPerAcre: 20,
      waterReqMm: 500,
      durationDays: 110,
      avgYieldKgPerAcre: 2400,
      basePricePerKg: 24.5,
      riskFactors: 'Fall armyworm, waterlogging at early vegetative stage',
      description: 'High yielding cereal crop with steady feed industry and starch processing demand.'
    },
    {
      id: 'crop-cotton',
      name: 'Cotton',
      teluguName: 'ప్రత్తి (Pratti)',
      hindiName: 'कपास (Kapas)',
      category: 'Cash Crops',
      season: 'Kharif',
      soilTypes: 'Black Cotton Soil, Deep Loamy',
      minPh: 6.2,
      maxPh: 8.0,
      nReqKgPerAcre: 40,
      pReqKgPerAcre: 20,
      kReqKgPerAcre: 20,
      waterReqMm: 700,
      durationDays: 160,
      avgYieldKgPerAcre: 850,
      basePricePerKg: 74.0,
      riskFactors: 'Pink bollworm, excess rain during boll opening',
      description: 'White gold commercial fiber crop. High market returns if pest management is maintained.'
    },
    {
      id: 'crop-chilli',
      name: 'Red Chilli',
      teluguName: 'ఎర్ర మిరప (Erra Mirapa)',
      hindiName: 'लाल मिर्च (Lal Mirch)',
      category: 'Spices & Cash Crops',
      season: 'Kharif / Rabi',
      soilTypes: 'Well-drained Sandy Loam, Clay Loam',
      minPh: 6.0,
      maxPh: 7.0,
      nReqKgPerAcre: 50,
      pReqKgPerAcre: 25,
      kReqKgPerAcre: 30,
      waterReqMm: 650,
      durationDays: 150,
      avgYieldKgPerAcre: 1800,
      basePricePerKg: 195.0,
      riskFactors: 'Thrips, leaf curl virus, damping off',
      description: 'High-value spice crop with exceptional market upside in Guntur and Khammam markets.'
    },
    {
      id: 'crop-paddy',
      name: 'Paddy / Rice',
      teluguName: 'వరి (Vari)',
      hindiName: 'धान (Dhan)',
      category: 'Cereals',
      season: 'Kharif / Rabi',
      soilTypes: 'Clayey Loam, Alluvial Soil',
      minPh: 5.5,
      maxPh: 7.0,
      nReqKgPerAcre: 45,
      pReqKgPerAcre: 22,
      kReqKgPerAcre: 22,
      waterReqMm: 1200,
      durationDays: 130,
      avgYieldKgPerAcre: 2600,
      basePricePerKg: 23.0,
      riskFactors: 'Stem borer, blast, requires heavy irrigation',
      description: 'Staple food grain requiring assured canal or heavy borewell water availability.'
    },
    {
      id: 'crop-redgram',
      name: 'Red Gram / Pigeon Pea',
      teluguName: 'కందులు (Kandulu)',
      hindiName: 'अरहर / तूर (Tur Dal)',
      category: 'Pulses',
      season: 'Kharif',
      soilTypes: 'Red Soil, Black Loam',
      minPh: 6.0,
      maxPh: 7.5,
      nReqKgPerAcre: 10,
      pReqKgPerAcre: 20,
      kReqKgPerAcre: 10,
      waterReqMm: 400,
      durationDays: 170,
      avgYieldKgPerAcre: 650,
      basePricePerKg: 102.0,
      riskFactors: 'Pod borer, wilt in poorly drained soil',
      description: 'High protein pulse crop that enriches soil nitrogen and thrives in rainfed conditions.'
    }
  ] as CropDataItem[],

  marketPrices: [
    {
      id: 'mp-1',
      cropName: 'Groundnut',
      marketLocation: 'Anantapur Mandi',
      district: 'Anantapur',
      state: 'Andhra Pradesh',
      pricePerKg: 86.5,
      minPrice: 78.0,
      maxPrice: 91.0,
      priceTrend: 'Rising' as const,
      demandLevel: 'HIGH' as const,
      date: new Date().toISOString(),
      isDemo: true,
    },
    {
      id: 'mp-2',
      cropName: 'Groundnut',
      marketLocation: 'Adoni Mandi',
      district: 'Kurnool',
      state: 'Andhra Pradesh',
      pricePerKg: 88.0,
      minPrice: 80.0,
      maxPrice: 93.5,
      priceTrend: 'Rising' as const,
      demandLevel: 'HIGH' as const,
      date: new Date().toISOString(),
      isDemo: true,
    },
    {
      id: 'mp-3',
      cropName: 'Cotton',
      marketLocation: 'Guntur APMC',
      district: 'Guntur',
      state: 'Andhra Pradesh',
      pricePerKg: 76.0,
      minPrice: 70.0,
      maxPrice: 79.5,
      priceTrend: 'Stable' as const,
      demandLevel: 'MODERATE' as const,
      date: new Date().toISOString(),
      isDemo: true,
    },
    {
      id: 'mp-4',
      cropName: 'Red Chilli',
      marketLocation: 'Guntur Yard',
      district: 'Guntur',
      state: 'Andhra Pradesh',
      pricePerKg: 205.0,
      minPrice: 185.0,
      maxPrice: 225.0,
      priceTrend: 'Rising' as const,
      demandLevel: 'HIGH' as const,
      date: new Date().toISOString(),
      isDemo: true,
    },
    {
      id: 'mp-5',
      cropName: 'Maize',
      marketLocation: 'Khammam Mandi',
      district: 'Khammam',
      state: 'Telangana',
      pricePerKg: 25.2,
      minPrice: 23.0,
      maxPrice: 27.0,
      priceTrend: 'Falling' as const,
      demandLevel: 'MODERATE' as const,
      date: new Date().toISOString(),
      isDemo: true,
    },
    {
      id: 'mp-6',
      cropName: 'Red Gram',
      marketLocation: 'Tandur Mandi',
      district: 'Vikarabad',
      state: 'Telangana',
      pricePerKg: 104.0,
      minPrice: 96.0,
      maxPrice: 110.0,
      priceTrend: 'Rising' as const,
      demandLevel: 'HIGH' as const,
      date: new Date().toISOString(),
      isDemo: true,
    }
  ] as MarketPriceItem[],

  marketplaceProducts: [
    {
      id: 'prod-1',
      farmerId: 'farmer-ravi-1',
      farmerName: 'Ravi Kumar',
      farmerMobile: '+91 98765 43210',
      crop: 'Groundnut (K-6 Variety)',
      variety: 'Kadiri-6 (High Oil Content)',
      quantity: 800,
      unit: 'kg',
      price: 85.0,
      location: 'Kalyandurg, Anantapur, AP',
      district: 'Anantapur',
      state: 'Andhra Pradesh',
      harvestDate: new Date(Date.now() + 86400000 * 7).toISOString(),
      description: 'Sun-dried, high pod quality Groundnut harvest. Cleaned and graded, 48% oil content.',
      imageUrl: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=600&q=80',
      status: 'ACTIVE' as const,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'prod-2',
      farmerId: 'farmer-ravi-1',
      farmerName: 'Ravi Kumar',
      farmerMobile: '+91 98765 43210',
      crop: 'Organic Red Gram (Tur Dal)',
      variety: 'LRG-41 Variety',
      quantity: 450,
      unit: 'kg',
      price: 105.0,
      location: 'Kalyandurg, Anantapur, AP',
      district: 'Anantapur',
      state: 'Andhra Pradesh',
      harvestDate: new Date(Date.now() + 86400000 * 14).toISOString(),
      description: 'Organically grown pigeon pea with no chemical pesticide sprays. Excellent dhal recovery.',
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
      status: 'ACTIVE' as const,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    }
  ] as MarketplaceProductItem[],

  buyerRequests: [
    {
      id: 'req-1',
      productId: 'prod-1',
      productTitle: 'Groundnut (K-6 Variety)',
      buyerId: 'buyer-srinivas-2',
      buyerName: 'Sri Venkateswara Agro Commodities',
      buyerMobile: '+91 91234 56789',
      farmerId: 'farmer-ravi-1',
      quantity: 800,
      offeredPrice: 84.5,
      message: 'Ready for immediate procurement at farmgate. Will arrange transport truck upon acceptance.',
      status: 'PENDING' as const,
      createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    }
  ] as BuyerRequestItem[],

  voiceCalls: [
    {
      id: 'vc-1',
      userId: 'farmer-ravi-1',
      callerMobile: '+91 98765 43210',
      callSid: 'CA_SIM_987162819',
      direction: 'INBOUND' as const,
      status: 'COMPLETED',
      duration: 52,
      dtmfInput: '1',
      intent: 'MARKET_PRICE',
      transcript: 'Farmer pressed 1. AgriAI replied: "Namaskaram Ravi Kumar garu. Groundnut price in Anantapur Mandi today is ₹86.50 per kg, trending Rising with HIGH buyer demand."',
      summary: 'Caller inquired about Groundnut mandi rates in Anantapur.',
      sentiment: 'Positive',
      createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    },
    {
      id: 'vc-2',
      userId: 'farmer-ravi-1',
      callerMobile: '+91 98765 43210',
      callSid: 'CA_SIM_987162820',
      direction: 'OUTBOUND' as const,
      status: 'COMPLETED',
      duration: 38,
      dtmfInput: null,
      intent: 'WEATHER_ALERT',
      transcript: 'AgriAI automated alert: "Alert for Ravi Kumar: Heavy rain (42mm) expected tomorrow in Anantapur district. Please inspect drainage channels in your 3-acre Groundnut field to prevent root rot."',
      summary: 'Proactive weather alert for 42mm rain in Anantapur.',
      sentiment: 'Urgent',
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    }
  ] as VoiceCallItem[],

  notifications: [
    {
      id: 'notif-1',
      userId: 'farmer-ravi-1',
      title: '📈 Groundnut Price Surge Alert',
      message: 'Groundnut prices rose by +₹3.50/kg in Anantapur Mandi today. Demand is currently HIGH.',
      type: 'MARKET' as const,
      isRead: false,
      link: '/market',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'notif-2',
      userId: 'farmer-ravi-1',
      title: '⛈️ Heavy Rain Forecast for Anantapur',
      message: 'Rain probability is 85% tomorrow. Check drainage in your 3-acre Groundnut field.',
      type: 'WEATHER' as const,
      isRead: false,
      link: '/dashboard',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      id: 'notif-3',
      userId: 'farmer-ravi-1',
      title: '🛒 New Purchase Request for 800 kg Groundnut',
      message: 'Sri Venkateswara Agro Commodities offered ₹84.50/kg for your listing.',
      type: 'BUYER_REQUEST' as const,
      isRead: false,
      link: '/marketplace',
      createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    }
  ] as NotificationItem[],

  otps: [] as OTPItem[]
}

// -------------------------------------------------------------
// Unified Data Access API
// -------------------------------------------------------------
export const db = {
  // Users
  async findUserByMobile(mobile: string): Promise<UserItem | null> {
    try {
      const user = await prisma.user.findUnique({ where: { mobile } })
      if (user) return user as unknown as UserItem
    } catch (e) {
      // fallback to memory
    }
    const found = memoryStore.users.find(u => u.mobile === mobile || u.mobile.replace(/\s+/g, '') === mobile.replace(/\s+/g, ''))
    return found || null
  },

  async findUserById(id: string): Promise<UserItem | null> {
    try {
      const user = await prisma.user.findUnique({ where: { id } })
      if (user) return user as unknown as UserItem
    } catch (e) {}
    return memoryStore.users.find(u => u.id === id) || null
  },

  async createUser(data: { mobile: string; name?: string; role?: 'FARMER' | 'BUYER' | 'ADMIN'; language?: string }): Promise<UserItem> {
    try {
      const created = await prisma.user.create({
        data: {
          mobile: data.mobile,
          name: data.name || null,
          role: data.role || 'FARMER',
          language: data.language || 'en',
        }
      })
      return created as unknown as UserItem
    } catch (e) {}
    const newUser: UserItem = {
      id: 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      mobile: data.mobile,
      name: data.name || (data.role === 'BUYER' ? 'Agro Buyer' : 'Farmer Friend'),
      role: data.role || 'FARMER',
      language: data.language || 'en',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    memoryStore.users.push(newUser)
    return newUser
  },

  async updateUser(id: string, data: Partial<UserItem>): Promise<UserItem | null> {
    try {
      const updated = await prisma.user.update({ where: { id }, data })
      if (updated) return updated as unknown as UserItem
    } catch (e) {}
    const idx = memoryStore.users.findIndex(u => u.id === id)
    if (idx !== -1) {
      memoryStore.users[idx] = { ...memoryStore.users[idx], ...data, updatedAt: new Date().toISOString() }
      return memoryStore.users[idx]
    }
    return null
  },

  // OTP Verification
  async saveOtp(mobile: string, codeHash: string, expiresAt: Date, userId?: string) {
    try {
      await prisma.oTPVerification.create({
        data: { mobile, codeHash, expiresAt, userId: userId || null }
      })
      return
    } catch (e) {}
    memoryStore.otps.push({
      id: 'otp-' + Date.now(),
      mobile,
      codeHash,
      attempts: 0,
      expiresAt,
      used: false,
      userId,
      createdAt: new Date()
    })
  },

  async findRecentOtp(mobile: string): Promise<OTPItem | null> {
    const cleanDigits = mobile.replace(/[^\d]/g, '').slice(-10)
    try {
      const rec = await prisma.oTPVerification.findFirst({
        where: { 
          OR: [
            { mobile },
            { mobile: { contains: cleanDigits } }
          ],
          used: false, 
          expiresAt: { gt: new Date() } 
        },
        orderBy: { createdAt: 'desc' }
      })
      if (rec) return rec as unknown as OTPItem
    } catch (e) {}
    const now = new Date()
    const found = [...memoryStore.otps]
      .reverse()
      .find(o => {
        const oDigits = o.mobile.replace(/[^\d]/g, '').slice(-10)
        return oDigits === cleanDigits && !o.used && o.expiresAt > now
      })
    return found || null
  },

  async markOtpUsed(id: string) {
    try {
      await prisma.oTPVerification.update({ where: { id }, data: { used: true } })
    } catch (e) {}
    const o = memoryStore.otps.find(x => x.id === id)
    if (o) o.used = true
  },

  async incrementOtpAttempts(id: string) {
    try {
      await prisma.oTPVerification.update({ where: { id }, data: { attempts: { increment: 1 } } })
    } catch (e) {}
    const o = memoryStore.otps.find(x => x.id === id)
    if (o) o.attempts += 1
  },

  // Farmer Profiles
  async getFarmerProfile(userId: string): Promise<FarmerProfileItem | null> {
    try {
      const prof = await prisma.farmerProfile.findUnique({ where: { userId } })
      if (prof) return prof as unknown as FarmerProfileItem
    } catch (e) {}
    return memoryStore.farmerProfiles.find(p => p.userId === userId) || null
  },

  async upsertFarmerProfile(userId: string, data: Partial<FarmerProfileItem>): Promise<FarmerProfileItem> {
    try {
      const prof = await prisma.farmerProfile.upsert({
        where: { userId },
        update: data as any,
        create: { userId, ...data } as any,
      })
      return prof as unknown as FarmerProfileItem
    } catch (e) {}
    const idx = memoryStore.farmerProfiles.findIndex(p => p.userId === userId)
    if (idx !== -1) {
      memoryStore.farmerProfiles[idx] = { ...memoryStore.farmerProfiles[idx], ...data, updatedAt: new Date().toISOString() }
      return memoryStore.farmerProfiles[idx]
    }
    const newProf: FarmerProfileItem = {
      id: 'fp-' + Date.now(),
      userId,
      location: data.location || 'Anantapur, Andhra Pradesh',
      village: data.village || 'Kalyandurg',
      district: data.district || 'Anantapur',
      state: data.state || 'Andhra Pradesh',
      landSize: data.landSize ?? 3.0,
      landUnit: data.landUnit || 'Acres',
      soilType: data.soilType || 'Red Sandy Loam',
      soilPh: data.soilPh ?? 6.5,
      nitrogen: data.nitrogen ?? 210.0,
      phosphorus: data.phosphorus ?? 18.0,
      potassium: data.potassium ?? 140.0,
      waterSource: data.waterSource || 'Borewell + Rainfed',
      irrigation: data.irrigation ?? true,
      irrigationType: data.irrigationType || 'Drip Irrigation',
      currentCrop: data.currentCrop || 'Groundnut',
      previousCrops: data.previousCrops || 'Paddy, Maize',
      experienceYears: data.experienceYears ?? 10,
      preferredCrops: data.preferredCrops || 'Groundnut, Cotton, Chilli',
      budget: data.budget ?? 45000.0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    memoryStore.farmerProfiles.push(newProf)
    return newProf
  },

  // Buyer Profile
  async getBuyerProfile(userId: string): Promise<BuyerProfileItem | null> {
    try {
      const bp = await prisma.buyerProfile.findUnique({ where: { userId } })
      if (bp) return bp as unknown as BuyerProfileItem
    } catch (e) {}
    return memoryStore.buyerProfiles.find(b => b.userId === userId) || null
  },

  async upsertBuyerProfile(userId: string, data: Partial<BuyerProfileItem>): Promise<BuyerProfileItem> {
    try {
      const bp = await prisma.buyerProfile.upsert({
        where: { userId },
        update: data as any,
        create: { userId, ...data } as any,
      })
      return bp as unknown as BuyerProfileItem
    } catch (e) {}
    const idx = memoryStore.buyerProfiles.findIndex(b => b.userId === userId)
    if (idx !== -1) {
      memoryStore.buyerProfiles[idx] = { ...memoryStore.buyerProfiles[idx], ...data, updatedAt: new Date().toISOString() }
      return memoryStore.buyerProfiles[idx]
    }
    const newBp: BuyerProfileItem = {
      id: 'bp-' + Date.now(),
      userId,
      companyName: data.companyName || 'Agro Wholesale Corp',
      businessType: data.businessType || 'Mandi Trader',
      location: data.location || 'Guntur APMC',
      district: data.district || 'Guntur',
      state: data.state || 'Andhra Pradesh',
      gstNumber: data.gstNumber || '37AAAAA0000A1Z5',
      preferredCrops: data.preferredCrops || 'Groundnut, Cotton, Chilli',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    memoryStore.buyerProfiles.push(newBp)
    return newBp
  },

  // Crops & Market
  async getCrops(): Promise<CropDataItem[]> {
    return memoryStore.crops
  },

  async getMarketPrices(cropName?: string, district?: string): Promise<MarketPriceItem[]> {
    let list = memoryStore.marketPrices
    if (cropName && cropName !== 'ALL') {
      list = list.filter(m => m.cropName.toLowerCase().includes(cropName.toLowerCase()))
    }
    if (district && district !== 'ALL') {
      list = list.filter(m => m.district.toLowerCase().includes(district.toLowerCase()))
    }
    return list
  },

  async updateMarketPrice(id: string, pricePerKg: number, trend: 'Rising' | 'Falling' | 'Stable'): Promise<MarketPriceItem | null> {
    const item = memoryStore.marketPrices.find(m => m.id === id)
    if (item) {
      item.pricePerKg = pricePerKg
      item.priceTrend = trend
      item.date = new Date().toISOString()
      return item
    }
    return null
  },

  // Marketplace Products
  async getMarketplaceProducts(filter?: { crop?: string; district?: string; status?: string }): Promise<MarketplaceProductItem[]> {
    let list = memoryStore.marketplaceProducts
    if (filter?.status) {
      list = list.filter(p => p.status === filter.status)
    }
    if (filter?.crop && filter.crop !== 'ALL') {
      list = list.filter(p => p.crop.toLowerCase().includes(filter.crop!.toLowerCase()))
    }
    if (filter?.district && filter.district !== 'ALL') {
      list = list.filter(p => p.district?.toLowerCase().includes(filter.district!.toLowerCase()))
    }
    return list
  },

  async createMarketplaceProduct(data: Omit<MarketplaceProductItem, 'id' | 'createdAt'>): Promise<MarketplaceProductItem> {
    const newProd: MarketplaceProductItem = {
      ...data,
      id: 'prod-' + Date.now(),
      createdAt: new Date().toISOString(),
    }
    memoryStore.marketplaceProducts.unshift(newProd)
    return newProd
  },

  // Buyer Requests
  async getBuyerRequests(userId: string, role: 'FARMER' | 'BUYER'): Promise<BuyerRequestItem[]> {
    if (role === 'FARMER') {
      return memoryStore.buyerRequests.filter(r => r.farmerId === userId)
    }
    return memoryStore.buyerRequests.filter(r => r.buyerId === userId)
  },

  async createBuyerRequest(data: Omit<BuyerRequestItem, 'id' | 'createdAt'>): Promise<BuyerRequestItem> {
    const newReq: BuyerRequestItem = {
      ...data,
      id: 'req-' + Date.now(),
      createdAt: new Date().toISOString(),
    }
    memoryStore.buyerRequests.unshift(newReq)
    return newReq
  },

  async updateBuyerRequestStatus(id: string, status: BuyerRequestItem['status']): Promise<BuyerRequestItem | null> {
    const r = memoryStore.buyerRequests.find(x => x.id === id)
    if (r) {
      r.status = status
      return r
    }
    return null
  },

  // Voice Calls
  async logVoiceCall(data: Omit<VoiceCallItem, 'id' | 'createdAt'>): Promise<VoiceCallItem> {
    const call: VoiceCallItem = {
      ...data,
      id: 'vc-' + Date.now(),
      createdAt: new Date().toISOString(),
    }
    memoryStore.voiceCalls.unshift(call)
    return call
  },

  async getVoiceCalls(userId?: string): Promise<VoiceCallItem[]> {
    if (userId) {
      return memoryStore.voiceCalls.filter(c => c.userId === userId || c.callerMobile === userId)
    }
    return memoryStore.voiceCalls
  },

  // Notifications
  async getNotifications(userId: string): Promise<NotificationItem[]> {
    return memoryStore.notifications.filter(n => n.userId === userId || n.userId === 'ALL')
  },

  async createNotification(data: Omit<NotificationItem, 'id' | 'createdAt'>): Promise<NotificationItem> {
    const notif: NotificationItem = {
      ...data,
      id: 'notif-' + Date.now(),
      createdAt: new Date().toISOString(),
    }
    memoryStore.notifications.unshift(notif)
    return notif
  },

  async markNotificationRead(id: string) {
    const n = memoryStore.notifications.find(x => x.id === id)
    if (n) n.isRead = true
  }
}

export default db
