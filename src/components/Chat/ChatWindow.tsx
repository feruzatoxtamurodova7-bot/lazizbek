import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Camera,
  RotateCcw,
  Bot,
  User,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Store,
  Package,
  Factory,
  Truck,
  ArrowRight,
  Info,
} from 'lucide-react';
import {
  ChatMessage,
  UserProfile,
  UserRole,
  RegistrationStep,
  ProductData,
} from '../../types';
import { BASE_PRODUCTS, formatSum } from '../../data/marketData';
import { PriceCard } from './PriceCard';
import { TrendCard } from './TrendCard';
import { BasketCard } from './BasketCard';
import { GroupOrderCard } from './GroupOrderCard';
import { ReceiptCard } from './ReceiptCard';
import { PhotoScanModal } from './PhotoScanModal';
import { AccuracyModal } from '../AccuracyModal';

interface ChatWindowProps {
  onHeightChange?: () => void;
  externalSearch?: string | null;
  onClearExternalSearch?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  externalSearch,
  onClearExternalSearch,
}) => {
  // Registration & User state
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [regStep, setRegStep] = useState<RegistrationStep>('idle');
  const [tempProfile, setTempProfile] = useState<Partial<UserProfile>>({});

  // Messages state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  // Modals state
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isAccuracyModalOpen, setIsAccuracyModalOpen] = useState(false);

  // Selected product in discussion
  const [selectedProduct, setSelectedProduct] = useState<ProductData>(BASE_PRODUCTS[0]);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  // Handle external search from ticker
  useEffect(() => {
    if (externalSearch) {
      handleUserText(externalSearch);
      onClearExternalSearch?.();
    }
  }, [externalSearch]);

  const addBotMessage = (
    text?: string,
    type: ChatMessage['type'] = 'text',
    data?: any,
    quickReplies?: ChatMessage['quickReplies']
  ) => {
    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      sender: 'bot',
      text,
      timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      type,
      data,
      quickReplies,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const addUserMessage = (text: string) => {
    const newMsg: ChatMessage = {
      id: 'msg-u-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  // Start Registration Flow
  const startRegistration = () => {
    setRegStep('ask_name');
    setTempProfile({});
    setMessages([]);
    setIsBotTyping(true);

    setTimeout(() => {
      setIsBotTyping(false);
      addBotMessage(
        'Assalomu alaykum! Men Bozorchi — Toshkent ulgurji bozorining aqlli dallolisiman. 🤝\nBozor Narxlaridan foydalanish uchun forma toʻldirish shart emas, atigi 4–5 ta savolga javob bering (~1 daqiqa).\n\nAvvalo, ismingiz nima?',
        'text',
        undefined,
        [
          { label: 'Dilshod', action: 'input_name', payload: 'Dilshod' },
          { label: 'Jasur', action: 'input_name', payload: 'Jasur' },
          { label: 'Aziza', action: 'input_name', payload: 'Aziza' },
        ]
      );
    }, 400);
  };

  // Handle user inputs through text or chips
  const handleUserText = (text: string) => {
    if (!text.trim()) return;
    const cleanText = text.trim();
    addUserMessage(cleanText);
    setInputText('');

    // If not registered yet, guide through registration
    if (!profile) {
      processRegistrationInput(cleanText);
      return;
    }

    // If registered, process market commands or queries
    processMarketInput(cleanText);
  };

  // Registration step processor (Branching tree)
  const processRegistrationInput = (input: string) => {
    setIsBotTyping(true);

    setTimeout(() => {
      setIsBotTyping(false);

      if (regStep === 'idle') {
        startRegistration();
        return;
      }

      if (regStep === 'ask_name') {
        const name = input;
        setTempProfile((p) => ({ ...p, name }));
        setRegStep('ask_role');
        addBotMessage(
          `Tanishganimdan xursandman, ${name}! Bozor platformasida qaysi rolda faoliyat yuritasiz?`,
          'text',
          undefined,
          [
            { label: '🏪 Doʻkon egasi', action: 'select_role', payload: 'shop' },
            { label: '📦 Optomchi', action: 'select_role', payload: 'wholesaler' },
            { label: '🏭 Ishlab chiqaruvchi', action: 'select_role', payload: 'manufacturer' },
            { label: '🚚 Logistika', action: 'select_role', payload: 'logistics' },
          ]
        );
        return;
      }

      if (regStep === 'ask_role') {
        let role: UserRole = 'shop';
        if (input.includes('Optomchi') || input === 'wholesaler') role = 'wholesaler';
        else if (input.includes('Ishlab chiqaruvchi') || input === 'manufacturer') role = 'manufacturer';
        else if (input.includes('Logistika') || input === 'logistics') role = 'logistics';

        setTempProfile((p) => ({ ...p, role }));

        if (role === 'shop') {
          setRegStep('shop_biz_type');
          addBotMessage(
            `Ajoyib! Biznesingiz qaysi yoʻnalishda?`,
            'text',
            undefined,
            [
              { label: '🍏 Oziq-ovqat doʻkoni', action: 'shop_biz', payload: 'Oziq-ovqat doʻkoni' },
              { label: '☕ Kafe yoki restoran', action: 'shop_biz', payload: 'Kafe yoki restoran' },
              { label: '🧺 Uy-roʻzgʻor mollari', action: 'shop_biz', payload: 'Uy-roʻzgʻor mollari' },
            ]
          );
        } else if (role === 'wholesaler') {
          setRegStep('wholesaler_category');
          addBotMessage(
            `Xush kelibsiz! Asosan qaysi tovarlar guruhini ulgurji sotasiz?`,
            'text',
            undefined,
            [
              { label: 'Oziq-ovqat (un, shakar, yogʻ)', action: 'wh_cat', payload: 'Oziq-ovqat' },
              { label: 'Ichimliklar va sharbatlar', action: 'wh_cat', payload: 'Ichimliklar' },
              { label: 'Xoʻjalik mollari', action: 'wh_cat', payload: 'Xoʻjalik mollari' },
            ]
          );
        } else if (role === 'manufacturer') {
          setRegStep('manufacturer_product');
          addBotMessage(
            `Salom hurmatli ishlab chiqaruvchi! Korxonangizda nima ishlab chiqariladi? (Qisqa yozing yoki tanlang)`,
            'text',
            undefined,
            [
              { label: 'Makaron va qandolat mahsulotlari', action: 'mf_prod', payload: 'Makaron va qandolat' },
              { label: 'Oʻsimlik yogʻi va yogʻ-moy', action: 'mf_prod', payload: 'Yogʻ-moy' },
              { label: 'Sut va qatiq mahsulotlari', action: 'mf_prod', payload: 'Sut mahsulotlari' },
            ]
          );
        } else if (role === 'logistics') {
          setRegStep('logistics_vehicle');
          addBotMessage(
            `Salom logistika hamkori! Asosiy yuk transport vositangiz qanday?`,
            'text',
            undefined,
            [
              { label: 'Labo (kichik yuk, 1 tonnagacha)', action: 'lg_veh', payload: 'Labo' },
              { label: 'Isuzu / Gazel (3-5 tonna)', action: 'lg_veh', payload: 'Isuzu' },
              { label: 'Fura / Ogʻir yuk mashinasi (10+ tonna)', action: 'lg_veh', payload: 'Fura' },
            ]
          );
        }
        return;
      }

      // SHOP BRANCH
      if (regStep === 'shop_biz_type') {
        const bizType = input;
        setTempProfile((p) => ({ ...p, businessType: bizType }));
        setRegStep('shop_district');
        addBotMessage(
          `Doʻkoningiz Toshkentning qaysi tumanida joylashgan? (Eng yaqin yetkazuvchilar va guruhli buyurtmalar shu tuman boʻyicha tuziladi)`,
          'text',
          undefined,
          [
            { label: 'Chilonzor', action: 'shop_dist', payload: 'Chilonzor' },
            { label: 'Uchtepa', action: 'shop_dist', payload: 'Uchtepa' },
            { label: 'Yunusobod', action: 'shop_dist', payload: 'Yunusobod' },
            { label: 'Sergeli', action: 'shop_dist', payload: 'Sergeli' },
            { label: 'Yashnobod', action: 'shop_dist', payload: 'Yashnobod' },
          ]
        );
        return;
      }

      if (regStep === 'shop_district') {
        const district = input;
        setTempProfile((p) => ({ ...p, district }));
        setRegStep('shop_top_products');
        const isCafe = tempProfile.businessType?.includes('Kafe');
        addBotMessage(
          isCafe
            ? `Oshxona uchun haftada eng koʻp oladigan 3 ta mahsulotingizni belgilang:`
            : `Doʻkoningiz uchun eng koʻp aylanadigan 3 ta tovar qaysilar?`,
          'text',
          undefined,
          isCafe
            ? [
                { label: 'Goʻsht, pista yogʻi, guruch', action: 'shop_top', payload: 'Goʻsht, pista yogʻi, guruch' },
                { label: 'Un, sabzavotlar, shakar', action: 'shop_top', payload: 'Un, sabzavotlar, shakar' },
              ]
            : [
                { label: 'Shakar, un 50 kg, yogʻ 20 l', action: 'shop_top', payload: 'Shakar, un, yogʻ' },
                { label: 'Guruch, choy, makaron', action: 'shop_top', payload: 'Guruch, choy, makaron' },
              ]
        );
        return;
      }

      if (regStep === 'shop_top_products') {
        setTempProfile((p) => ({ ...p, topProducts: [input] }));
        setRegStep('shop_frequency');
        addBotMessage(
          `Ulgurji bozorlardan haftasiga necha marta xarid qilasiz?`,
          'text',
          undefined,
          [
            { label: 'Haftada 1 marta', action: 'freq', payload: 'Haftada 1 marta' },
            { label: 'Haftada 2–3 marta', action: 'freq', payload: 'Haftada 2–3 marta' },
            { label: 'Deyarli har kuni', action: 'freq', payload: 'Har kuni' },
          ]
        );
        return;
      }

      if (regStep === 'shop_frequency') {
        const fullProf: UserProfile = {
          name: tempProfile.name || 'Dilshod',
          role: 'shop',
          businessType: tempProfile.businessType || 'Oziq-ovqat doʻkoni',
          district: tempProfile.district || 'Chilonzor',
          topProducts: tempProfile.topProducts || ['Shakar', 'Un', 'Yogʻ'],
          purchaseFrequency: input,
          isVerified: true,
          registeredAt: new Date().toLocaleDateString('uz-UZ'),
        };
        finishRegistration(fullProf);
        return;
      }

      // WHOLESALER BRANCH
      if (regStep === 'wholesaler_category') {
        setTempProfile((p) => ({ ...p, productGroup: input }));
        setRegStep('wholesaler_warehouse');
        addBotMessage(
          `Omboringiz yoki asosiy savdo doʻkoningiz qaysi bozorda/hududda joylashgan?`,
          'text',
          undefined,
          [
            { label: 'Abu Saxiy ulgurji', action: 'wh_loc', payload: 'Abu Saxiy' },
            { label: 'Qoʻyliq markaziy ombor', action: 'wh_loc', payload: 'Qoʻyliq' },
            { label: 'Chilonzor ulgurji', action: 'wh_loc', payload: 'Chilonzor' },
            { label: 'Bek Baraka', action: 'wh_loc', payload: 'Bek Baraka' },
          ]
        );
        return;
      }

      if (regStep === 'wholesaler_warehouse') {
        setTempProfile((p) => ({ ...p, warehouseLocation: input }));
        setRegStep('wholesaler_min_order');
        addBotMessage(
          `Yetkazib berish yoki sotish uchun minimal buyurtma hajmi qancha?`,
          'text',
          undefined,
          [
            { label: '10 qop (yoki 500 kg)', action: 'wh_min', payload: '10 qop / 500 kg' },
            { label: 'Kamida 3 000 000 soʻm', action: 'wh_min', payload: '3 000 000 soʻm' },
            { label: 'Cheklovsiz (har qanday hajm)', action: 'wh_min', payload: 'Cheklovsiz' },
          ]
        );
        return;
      }

      if (regStep === 'wholesaler_min_order') {
        setTempProfile((p) => ({ ...p, minOrder: input }));
        setRegStep('wholesaler_delivery');
        addBotMessage(
          `Doʻkonlarga oʻzingiz yetkazib berasizmi yoki xaridor olib ketadimi?`,
          'text',
          undefined,
          [
            { label: 'Ha, oʻzimiz yetkazamiz', action: 'wh_del', payload: 'ha' },
            { label: 'Yoʻq, xaridor oʻzi olib ketadi', action: 'wh_del', payload: 'yoʻq' },
          ]
        );
        return;
      }

      if (regStep === 'wholesaler_delivery') {
        const hasDel = input.toLowerCase().includes('ha');
        setTempProfile((p) => ({ ...p, hasDelivery: hasDel }));
        setRegStep('wholesaler_stir');
        addBotMessage(
          hasDel
            ? `Yaxshi. Tashkilotingiz STIR (INN) raqamini yuboring — "✓ Tasdiqlangan sotuvchi" belgisini olasiz va ishonch ballingizga +20 ball qoʻshiladi:`
            : `Tushunarli! Yetkazib berish boʻlmasa, tizimdagi logistika hamkorlarimiz doʻkonlarga yetkazib berishni oʻz zimmalariga oladi.\n\nTashkilotingiz STIR (INN) raqamini yuboring — "✓ Tasdiqlangan sotuvchi" belgisini olasiz:`,
          'text',
          undefined,
          [
            { label: 'STIR: 309 845 210', action: 'stir', payload: '309845210' },
            { label: 'Keyinroq kiritaman', action: 'stir_later', payload: 'Keyinroq' },
          ]
        );
        return;
      }

      if (regStep === 'wholesaler_stir') {
        const isVerified = input !== 'Keyinroq' && input.length >= 7;
        const fullProf: UserProfile = {
          name: tempProfile.name || 'Optomchi',
          role: 'wholesaler',
          productGroup: tempProfile.productGroup || 'Oziq-ovqat',
          warehouseLocation: tempProfile.warehouseLocation || 'Abu Saxiy',
          minOrder: tempProfile.minOrder || '10 qop',
          hasDelivery: tempProfile.hasDelivery ?? true,
          stir: isVerified ? input : undefined,
          isVerified,
          registeredAt: new Date().toLocaleDateString('uz-UZ'),
        };
        finishRegistration(fullProf);
        return;
      }

      // MANUFACTURER BRANCH
      if (regStep === 'manufacturer_product') {
        setTempProfile((p) => ({ ...p, manufacturesWhat: input }));
        setRegStep('manufacturer_factory');
        addBotMessage(
          `Ishlab chiqarish korxonangiz yoki sexingiz qaysi hududda?`,
          'text',
          undefined,
          [
            { label: 'Sergeli sanoat zonasi', action: 'mf_loc', payload: 'Sergeli' },
            { label: 'Yangiyoʻl tumani', action: 'mf_loc', payload: 'Yangiyoʻl' },
            { label: 'Chirchiq shahri', action: 'mf_loc', payload: 'Chirchiq' },
            { label: 'Toshkent viloyati', action: 'mf_loc', payload: 'Toshkent vil.' },
          ]
        );
        return;
      }

      if (regStep === 'manufacturer_factory') {
        setTempProfile((p) => ({ ...p, factoryLocation: input }));
        setRegStep('manufacturer_volume');
        addBotMessage(
          `Oʻrtacha oylik ishlab chiqarish hajmingiz qancha?`,
          'text',
          undefined,
          [
            { label: '50–100 tonna/oy', action: 'mf_vol', payload: '50-100 tonna' },
            { label: '20–50 tonna/oy', action: 'mf_vol', payload: '20-50 tonna' },
            { label: '10–20 tonna/oy', action: 'mf_vol', payload: '10-20 tonna' },
          ]
        );
        return;
      }

      if (regStep === 'manufacturer_volume') {
        setTempProfile((p) => ({ ...p, monthlyVolume: input }));
        setRegStep('manufacturer_direct');
        addBotMessage(
          `Chakana doʻkonlarga toʻgʻridan-toʻgʻri sotasizmi yoki faqat yirik dilerlar orqalimi?`,
          'text',
          undefined,
          [
            { label: 'Ha, toʻgʻridan-toʻgʻri doʻkonlarga', action: 'mf_dir', payload: 'ha' },
            { label: 'Faqat yirik optomchilar orqali', action: 'mf_dir', payload: 'yoʻq' },
          ]
        );
        return;
      }

      if (regStep === 'manufacturer_direct') {
        const isDirect = input.toLowerCase().includes('ha');
        setTempProfile((p) => ({ ...p, directSales: isDirect }));
        setRegStep('manufacturer_stir');
        addBotMessage(
          `Korxona STIR (INN) raqamini kiriting ("✓ Tasdiqlangan ishlab chiqaruvchi" maqomi uchun):`,
          'text',
          undefined,
          [
            { label: 'STIR: 301 294 812', action: 'stir', payload: '301294812' },
            { label: 'Keyinroq', action: 'stir_later', payload: 'Keyinroq' },
          ]
        );
        return;
      }

      if (regStep === 'manufacturer_stir') {
        const isVerified = input !== 'Keyinroq' && input.length >= 7;
        const fullProf: UserProfile = {
          name: tempProfile.name || 'Zavod vakili',
          role: 'manufacturer',
          manufacturesWhat: tempProfile.manufacturesWhat || 'Makaron mahsulotlari',
          factoryLocation: tempProfile.factoryLocation || 'Sergeli',
          monthlyVolume: tempProfile.monthlyVolume || '50 tonna',
          directSales: tempProfile.directSales ?? true,
          stir: isVerified ? input : undefined,
          isVerified,
          registeredAt: new Date().toLocaleDateString('uz-UZ'),
        };
        finishRegistration(fullProf);
        return;
      }

      // LOGISTICS BRANCH
      if (regStep === 'logistics_vehicle') {
        const vehicle = input;
        setTempProfile((p) => ({ ...p, vehicleType: vehicle }));
        setRegStep('logistics_trip_or_fridge');

        if (vehicle.includes('Labo')) {
          addBotMessage(
            `Labo uchun Toshkent shahri ichida 1 ta reys narxi qancha (oʻrtacha)?`,
            'text',
            undefined,
            [
              { label: '100 000 soʻm/reys', action: 'lg_price', payload: '100 000 soʻm' },
              { label: '120 000 soʻm/reys', action: 'lg_price', payload: '120 000 soʻm' },
              { label: '150 000 soʻm/reys', action: 'lg_price', payload: '150 000 soʻm' },
            ]
          );
        } else {
          addBotMessage(
            `Yuk mashinangizda sovutgich (refrijerator) bormi?`,
            'text',
            undefined,
            [
              { label: 'Ha, sovutgich bor (muzlatilgan yuklar uchun)', action: 'lg_fridge', payload: 'ha' },
              { label: 'Yoʻq, oddiy tent/bort', action: 'lg_fridge', payload: 'yoʻq' },
            ]
          );
        }
        return;
      }

      if (regStep === 'logistics_trip_or_fridge') {
        if (tempProfile.vehicleType?.includes('Labo')) {
          setTempProfile((p) => ({ ...p, tripPrice: input }));
        } else {
          setTempProfile((p) => ({ ...p, hasRefrigeration: input.includes('ha') }));
        }
        setRegStep('logistics_area');
        addBotMessage(
          `Asosan qaysi hududlarda yuk tashishga tayyorsiz?`,
          'text',
          undefined,
          [
            { label: 'Toshkent shahri (barcha tumanlar)', action: 'lg_area', payload: 'Toshkent shahri' },
            { label: 'Toshkent shahri va viloyati', action: 'lg_area', payload: 'Toshkent shahri va vil.' },
            { label: 'Butun Oʻzbekiston boʻylab', action: 'lg_area', payload: 'Respublika' },
          ]
        );
        return;
      }

      if (regStep === 'logistics_area') {
        setTempProfile((p) => ({ ...p, serviceArea: input }));
        setRegStep('logistics_stir');
        addBotMessage(
          `Haydovchi / Logistika kompaniyasi STIR yoki Guvohnoma raqami:`,
          'text',
          undefined,
          [
            { label: 'STIR: 304 991 432', action: 'stir', payload: '304991432' },
            { label: 'Keyinroq', action: 'stir_later', payload: 'Keyinroq' },
          ]
        );
        return;
      }

      if (regStep === 'logistics_stir') {
        const isVerified = input !== 'Keyinroq' && input.length >= 7;
        const fullProf: UserProfile = {
          name: tempProfile.name || 'Haydovchi',
          role: 'logistics',
          vehicleType: tempProfile.vehicleType || 'Labo',
          tripPrice: tempProfile.tripPrice,
          hasRefrigeration: tempProfile.hasRefrigeration,
          serviceArea: tempProfile.serviceArea || 'Toshkent shahri',
          stir: isVerified ? input : undefined,
          isVerified,
          registeredAt: new Date().toLocaleDateString('uz-UZ'),
        };
        finishRegistration(fullProf);
        return;
      }
    }, 450);
  };

  // Complete registration and present role dashboard in chat
  const finishRegistration = (userProfile: UserProfile) => {
    setProfile(userProfile);
    setRegStep('completed');

    // Build role description badge
    let roleText = 'Doʻkon egasi';
    let extraDetail = `${userProfile.district || 'Toshkent'} tumani`;
    if (userProfile.role === 'wholesaler') {
      roleText = 'Ulgurji sotuvchi (Optomchi)';
      extraDetail = `${userProfile.warehouseLocation} ombori`;
    } else if (userProfile.role === 'manufacturer') {
      roleText = 'Ishlab chiqaruvchi';
      extraDetail = `${userProfile.factoryLocation} zavodi`;
    } else if (userProfile.role === 'logistics') {
      roleText = 'Logistika va yetkazib berish';
      extraDetail = `${userProfile.vehicleType} • ${userProfile.serviceArea}`;
    }

    addBotMessage(
      `🎉 Tabriklayman, ${userProfile.name}! Profilingiz muvaffaqiyatli yaratildi.\n\n` +
        `👤 Ism: ${userProfile.name}\n` +
        `🏷️ Rol: ${roleText}\n` +
        `📍 Manzil: ${extraDetail}\n` +
        `🛡️ Holat: ${userProfile.isVerified ? '✓ Tasdiqlangan yuridik ishtirokchi' : 'Oddiy ishtirokchi (STIR kiritilmagan)'}\n\n` +
        (userProfile.role === 'shop'
          ? 'Endi Toshkent ulgurji bozorlaridagi real narxlarni solishtirishingiz va guruhli buyurtma qilishingiz mumkin! Qaysi tovar narxini koʻramiz?'
          : userProfile.role === 'wholesaler' || userProfile.role === 'manufacturer'
          ? 'Endi oʻz ulgurji narxingizni kiritib, bozordagi real talab signallarini koʻrishingiz mumkin. Xabar ichida kamida 4 xonali narx yozing (masalan "shakar 495000") yoki pastdagi tugmani bosing:'
          : 'Guruhli buyurtmalar boʻyicha yangi yuk marshrutlari va soʻrovlarni qabul qilishga tayyorsiz! Pastdagi namunaviy soʻrovni koʻring:'),
      'text',
      undefined,
      userProfile.role === 'shop'
        ? [
            { label: 'shakar 50 kg', action: 'search_shakar', payload: 'shakar 50 kg' },
            { label: 'un 50 kg', action: 'search_un', payload: 'un 50 kg' },
            { label: 'yogʻ 20 l', action: 'search_yog', payload: 'yogʻ 20 l' },
            { label: 'guruch 25 kg', action: 'search_guruch', payload: 'guruch 25 kg' },
          ]
        : userProfile.role === 'wholesaler' || userProfile.role === 'manufacturer'
        ? [
            { label: 'Narx joylashtirish (Shakar 495 000)', action: 'post_price', payload: 'Shakar 50 kg narxi: 495 000 soʻm' },
            { label: 'Bozor talabi signalini koʻrish', action: 'view_demand', payload: 'talab' },
          ]
        : [
            { label: 'Namunaviy soʻrovni koʻrish', action: 'logistics_sample', payload: 'soʻrov' },
            { label: 'Qabul qilaman', action: 'logistics_accept', payload: 'qabul' },
          ]
    );
  };

  // Main AI / Rule-based Market Chat Processor
  const processMarketInput = (text: string) => {
    const lower = text.toLowerCase();
    setIsBotTyping(true);

    setTimeout(() => {
      setIsBotTyping(false);

      // Check for price queries (shakar, un, yog, guruch, choy, makaron)
      if (lower.includes('shakar')) {
        const prod = BASE_PRODUCTS.find((p) => p.id === 'shakar-50')!;
        setSelectedProduct(prod);
        addBotMessage(
          `🔎 Toshkent ulgurji bozorlarida "${prod.name}" boʻyicha eng soʻnggi narxlar topildi:`,
          'price_card',
          prod
        );
        return;
      }

      if (lower.includes('un')) {
        const prod = BASE_PRODUCTS.find((p) => p.id === 'un-50')!;
        setSelectedProduct(prod);
        addBotMessage(
          `🔎 "${prod.name}" boʻyicha eng soʻnggi narxlar tahlili:`,
          'price_card',
          prod
        );
        return;
      }

      if (lower.includes('yog') || lower.includes("yogʻ")) {
        const prod = BASE_PRODUCTS.find((p) => p.id === 'yog-20')!;
        setSelectedProduct(prod);
        addBotMessage(
          `🔎 "${prod.name}" boʻyicha 5 ta yetkazuvchi narxi:`,
          'price_card',
          prod
        );
        return;
      }

      if (lower.includes('guruch')) {
        const prod = BASE_PRODUCTS.find((p) => p.id === 'guruch-25')!;
        setSelectedProduct(prod);
        addBotMessage(
          `🔎 "${prod.name}" boʻyicha 5 ta yetkazuvchi narxi:`,
          'price_card',
          prod
        );
        return;
      }

      if (lower.includes('choy')) {
        const prod = BASE_PRODUCTS.find((p) => p.id === 'choy-10')!;
        setSelectedProduct(prod);
        addBotMessage(
          `🔎 "${prod.name}" boʻyicha narxlar tahlili:`,
          'price_card',
          prod
        );
        return;
      }

      if (lower.includes('makaron')) {
        const prod = BASE_PRODUCTS.find((p) => p.id === 'makaron-20')!;
        setSelectedProduct(prod);
        addBotMessage(
          `🔎 "${prod.name}" boʻyicha narxlar tahlili:`,
          'price_card',
          prod
        );
        return;
      }

      // Step 2: Narx oshadimi?
      if (lower.includes('oshadimi') || lower.includes('trend') || lower.includes('prognoz')) {
        addBotMessage(
          `📈 "${selectedProduct.name}" boʻyicha 7 kunlik trend hisobi va prognoz:`,
          'trend_card',
          selectedProduct
        );
        return;
      }

      // Step 3: 20 ta tovarlik roʻyxat yuborish
      if (
        lower.includes('20') ||
        lower.includes('roʻyxat') ||
        lower.includes('royxat') ||
        lower.includes('savatcha')
      ) {
        addBotMessage(
          `📋 Kichik biznes uchun haftalik 20 ta asosiy tovar savatchasi shakllantirildi. BozorNarx orqali optimallashtirilgan eng arzon takliflar solishtirildi:`,
          'basket_card'
        );
        return;
      }

      // Step 4: Guruhli buyurtma
      if (lower.includes('guruh') || lower.includes('birlashish') || lower.includes('chegirma')) {
        addBotMessage(
          `🤝 ${profile?.district || 'Chilonzor'} tumanidagi qoʻshni doʻkonlar bilan guruhli buyurtma taklifi:`,
          'group_order',
          { district: profile?.district || 'Chilonzor' }
        );
        return;
      }

      // Step 5: Yetkazildi, narx toʻgʻri
      if (lower.includes('yetkazildi') || lower.includes('toʻgʻri') || lower.includes('togri') || lower.includes('chek')) {
        addBotMessage(
          `🎉 Ajoyib! Tovarlar qabul qilindi va narx toʻgʻriligi tasdiqlandi. Rasmiy tejamkorlik kvitansiyasi:`,
          'receipt'
        );
        return;
      }

      // Wholesaler / Manufacturer: Price submission (requires at least 4 digits)
      const fourDigitMatch = lower.match(/\d{4,}/);
      if (fourDigitMatch && (profile?.role === 'wholesaler' || profile?.role === 'manufacturer')) {
        const extractedPrice = parseInt(fourDigitMatch[0], 10);
        addBotMessage(
          `✅ Yangi narx qabul qilindi: ${formatSum(extractedPrice)}.\n` +
            `🛡️ Tizim tekshiruvi: Narx median diapazonga mos keladi, anomaliya aniqlanmadi.\n\n` +
            `📡 Ayni paytdagi bozor talabi signali:\n` +
            `• ${profile.district || 'Chilonzor'} va Uchtepa tumanlarida 14 ta doʻkon bugun ayni ushbu tovar boʻyicha arzon taklif qidirmoqda.\n` +
            `• Sizning taklifingiz doʻkonlarning navbatdagi guruhli buyurtmasiga birinchi oʻrinda tavsiya etildi!`,
          'text',
          undefined,
          [
            { label: 'shakar 50 kg narxlarini koʻrish', action: 'shakar', payload: 'shakar 50 kg' },
            { label: 'Guruhli buyurtmalar holati', action: 'guruh', payload: 'guruh' },
          ]
        );
        return;
      }

      // Logistics: sample request
      if (lower.includes('soʻrov') || lower.includes('namunaviy') || lower.includes('yuk')) {
        addBotMessage(
          `🚚 Yangi guruhli logistika soʻrovi:\n` +
            `📦 Marshrut: Abu Saxiy ulgurji ombori → Chilonzor tumani (10 ta oziq-ovqat doʻkoni)\n` +
            `⚖️ Umumiy ogʻirlik: 1.8 tonna (un, shakar, yogʻ)\n` +
            `⏱️ Qabul vaqti: Ertaga soat 08:30–09:00\n` +
            `💰 Belgilangan reys toʻlovi: 180 000 soʻm (kafolatlangan naqd/hisob)\n\n` +
            `Ushbu reysni qabul qilasizmi?`,
          'text',
          undefined,
          [
            { label: '✅ Qabul qilaman', action: 'accept_trip', payload: 'qabul qilaman' },
            { label: 'Boshqa marshrutlarni koʻrish', action: 'other_trip', payload: 'boshqa marshrut' },
          ]
        );
        return;
      }

      if (lower.includes('qabul qilaman') || lower.includes('qabul')) {
        addBotMessage(
          `✅ Marshrut biriktirildi! Chilonzordagi 10 ta doʻkonga yetkazish marshruti va aloqa raqamlari haydovchi kabinetiga yuborildi. Reys narxi: 180 000 soʻm.`,
          'text',
          undefined,
          [{ label: 'Boshidan boshlash', action: 'restart', payload: 'restart' }]
        );
        return;
      }

      // Accuracy explanation request
      if (lower.includes('aniqlik') || lower.includes('ishonch') || lower.includes('formula')) {
        setIsAccuracyModalOpen(true);
        addBotMessage(
          `BozorNarx aniqlik (ishonch) bali 0 dan 100 gacha hisoblanadi: Yangilik (40 ball) + Tasdiqlar (40 ball) + Yuridik STIR (20 ball). 60 balldan past takliflar tavsiya etilmaydi! Batafsil maʼlumot ekranda ochildi.`,
          'text'
        );
        return;
      }

      // Fallback helpful response
      addBotMessage(
        `Kechirasiz, "${text}" soʻrovini toʻliq tushunmadim. Bozorchi boti orqali quyidagi amallarni bajarishingiz mumkin:\n\n` +
          `• Tovar narxini bilish: "shakar 50 kg", "un 50 kg", "yogʻ 20 l", "guruch 25 kg"\n` +
          `• 7 kunlik trend va prognoz: "Narx oshadimi?"\n` +
          `• Savatcha taqqoslash: "20 ta tovarlik roʻyxat yuborish"\n` +
          `• Guruhli xarid: "Guruhli buyurtma taklifi"\n` +
          `• Yoki pastdagi tezkor tugmalardan birini bosing:`,
        'text',
        undefined,
        [
          { label: 'shakar 50 kg', action: 'shakar', payload: 'shakar 50 kg' },
          { label: 'Narx oshadimi?', action: 'trend', payload: 'Narx oshadimi?' },
          { label: '20 ta tovarlik roʻyxat', action: 'basket', payload: '20 ta tovarlik roʻyxat yuborish' },
          { label: 'Guruhli buyurtma', action: 'group', payload: 'Guruhli buyurtma' },
        ]
      );
    }, 400);
  };

  // Restart flow
  const handleRestart = () => {
    setProfile(null);
    setRegStep('idle');
    setTempProfile({});
    setMessages([]);
  };

  // Handle Quick Reply Click
  const handleQuickClick = (reply: { label: string; action: string; payload?: any }) => {
    handleUserText(reply.payload || reply.label);
  };

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#141a38] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden h-[min(680px,86vh)] transition-colors">
      {/* Chat Top Header */}
      <div className="px-4 py-3 bg-[#1c2456] text-white flex items-center justify-between shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#12a198] to-teal-700 flex items-center justify-center font-bold text-amber-300 shadow-xs">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#1c2456]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base tracking-tight">
                Bozorchi
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#12a198]/30 text-teal-200 border border-[#12a198]/40">
                Aqlli dallol
              </span>
            </div>
            <div className="text-[11px] text-slate-300 flex items-center gap-1.5">
              {profile ? (
                <span>
                  {profile.name} ({profile.role === 'shop' ? 'Doʻkon' : profile.role}) • {profile.district || 'Toshkent'}
                </span>
              ) : (
                <span className="text-amber-300 font-medium">Roʻyxatdan oʻtish kutilmoqda</span>
              )}
            </div>
          </div>
        </div>

        {/* Top actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsAccuracyModalOpen(true)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Aniqlik qanday hisoblanadi?"
          >
            <HelpCircle className="w-4 h-4 text-teal-300" />
          </button>
          <button
            onClick={handleRestart}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Boshidan boshlash"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Stream Container */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 custom-scrollbar bg-[#f8fafc]/50 dark:bg-[#0c1024]/40"
      >
        {/* Onboarding Screen when not started or idle */}
        {!profile && regStep === 'idle' && messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-4 max-w-md mx-auto space-y-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1c2456] to-[#12a198] flex items-center justify-center text-amber-300 shadow-lg shadow-[#12a198]/20">
              <Bot className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#12a198] bg-[#12a198]/10 px-2.5 py-1 rounded-full">
                1 daqiqalik qulay start
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                Avval roʻyxatdan oʻtamiz
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Hech qanday murakkab forma yoʻq! Botimiz atigi <strong>4–5 ta qisqa savol</strong> beradi (~1 daqiqa). Shundan soʻng barcha ulgurji bozor narxlari va guruhli xaridlar ochiladi.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 w-full text-left text-[11px] text-slate-600 dark:text-slate-300 pt-1">
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#141a38] border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <Store className="w-4 h-4 text-[#12a198] shrink-0" />
                <span>Doʻkonlar uchun bepul narx</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-[#141a38] border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#f0a22e] shrink-0" />
                <span>Ishonch bali ≥95%</span>
              </div>
            </div>

            <button
              onClick={startRegistration}
              className="w-full py-3 px-5 bg-gradient-to-r from-[#1c2456] via-indigo-900 to-[#12a198] text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-950/20 hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <span>Chatda roʻyxatdan oʻtish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Dynamic Messages */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1 animate-in fade-in duration-200`}
          >
            <div className="flex items-end gap-2 max-w-[92%] sm:max-w-[85%]">
              {msg.sender === 'bot' && (
                <div className="w-7 h-7 rounded-lg bg-[#12a198] text-white flex items-center justify-center shrink-0 mb-1">
                  <Bot className="w-4 h-4 text-amber-200" />
                </div>
              )}

              <div
                className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#1c2456] text-white rounded-br-xs shadow-xs'
                    : 'bg-white dark:bg-[#141a38] text-slate-800 dark:text-slate-100 rounded-bl-xs border border-slate-200/90 dark:border-slate-800 shadow-xs'
                }`}
              >
                {msg.text && (
                  <div className="whitespace-pre-line font-medium">{msg.text}</div>
                )}

                {/* Rich Component Types */}
                {msg.type === 'price_card' && (
                  <PriceCard
                    product={msg.data || selectedProduct}
                    onAskTrend={() => handleUserText('Narx oshadimi?')}
                    onAskBasket={() => handleUserText('20 ta tovarlik roʻyxat yuborish')}
                    onOpenAccuracyModal={() => setIsAccuracyModalOpen(true)}
                  />
                )}

                {msg.type === 'trend_card' && (
                  <TrendCard
                    product={msg.data || selectedProduct}
                    onSendBasket={() => handleUserText('20 ta tovarlik roʻyxat yuborish')}
                  />
                )}

                {msg.type === 'basket_card' && (
                  <BasketCard
                    onJoinGroupOrder={() => handleUserText('Guruhli buyurtma taklifi')}
                  />
                )}

                {msg.type === 'group_order' && (
                  <GroupOrderCard
                    district={profile?.district || 'Chilonzor'}
                    onConfirmDelivered={() => handleUserText('Yetkazildi, narx toʻgʻri')}
                  />
                )}

                {msg.type === 'receipt' && (
                  <ReceiptCard
                    onRestart={handleRestart}
                    onPhotoScan={() => setIsPhotoModalOpen(true)}
                    onOpenAccuracy={() => setIsAccuracyModalOpen(true)}
                  />
                )}
              </div>
            </div>

            <span className="text-[10px] text-slate-400 font-mono px-1">
              {msg.timestamp}
            </span>

            {/* Quick Replies Buttons (Chips) */}
            {msg.quickReplies && msg.quickReplies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1.5 max-w-[92%] sm:max-w-[85%] pl-9">
                {msg.quickReplies.map((qr, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickClick(qr)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-white dark:bg-[#141a38] text-[#1c2456] dark:text-teal-200 border border-slate-200 dark:border-slate-700/80 hover:border-[#12a198] hover:text-[#12a198] shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-95 flex items-center gap-1"
                  >
                    <span>{qr.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isBotTyping && (
          <div className="flex items-center gap-2 pl-1 animate-in fade-in duration-200">
            <div className="w-7 h-7 rounded-lg bg-[#12a198] text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-amber-200" />
            </div>
            <div className="bg-white dark:bg-[#141a38] border border-slate-200 dark:border-slate-800 px-3.5 py-2.5 rounded-2xl rounded-bl-xs flex items-center gap-1.5 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#12a198] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#12a198] animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#12a198] animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>

      {/* Input / Action Bar */}
      <div className="p-3 bg-white dark:bg-[#141a38] border-t border-slate-200 dark:border-slate-800 shrink-0 space-y-2">
        {/* Quick Suggestion Chips if registered */}
        {profile && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            <span className="text-[10px] text-slate-400 font-bold uppercase shrink-0">
              Tezkor:
            </span>
            <button
              onClick={() => handleUserText('shakar 50 kg')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap cursor-pointer transition-colors"
            >
              Shakar 50 kg
            </button>
            <button
              onClick={() => handleUserText('Narx oshadimi?')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap cursor-pointer transition-colors"
            >
              Narx oshadimi?
            </button>
            <button
              onClick={() => handleUserText('20 ta tovarlik roʻyxat yuborish')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap cursor-pointer transition-colors"
            >
              20 tovar savati
            </button>
            <button
              onClick={() => handleUserText('Guruhli buyurtma taklifi')}
              className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-medium whitespace-nowrap cursor-pointer"
            >
              Guruhli buyurtma (-3%)
            </button>
          </div>
        )}

        {/* Input box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUserText(inputText);
          }}
          className="flex items-center gap-2"
        >
          {/* Photo Scan Button */}
          <button
            type="button"
            onClick={() => setIsPhotoModalOpen(true)}
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
            title="📷 Chek suratini yuklash va Vision AI orqali tekshirish"
          >
            <Camera className="w-5 h-5 text-[#12a198]" />
          </button>

          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              !profile
                ? 'Javobingizni yozing...'
                : 'Tovar nomi (masalan: "shakar 50 kg") yoki savol yozing...'
            }
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-[#0c1024] border border-transparent focus:border-[#12a198] focus:bg-white dark:focus:bg-[#0c1024] text-xs sm:text-sm text-slate-900 dark:text-white outline-hidden transition-all"
          />

          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-xl bg-[#1c2456] dark:bg-[#12a198] hover:opacity-90 disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-all cursor-pointer disabled:cursor-not-allowed shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Modals */}
      <PhotoScanModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        onVerified={() => {
          addBotMessage(
            `📷 Chek fotosurati Vision AI modeli tomonidan tasdiqlandi!\n` +
              `• Tovar: Shakar 50 kg\n` +
              `• Narx: 498 000 soʻm\n` +
              `• Sotuvchi: Chilonzor ulgurji\n` +
              `✅ Tizim ishonch balliga +5 ball qoʻshildi!`,
            'text',
            undefined,
            [{ label: 'shakar 50 kg narxlarini koʻrish', action: 'shakar', payload: 'shakar 50 kg' }]
          );
        }}
      />

      <AccuracyModal
        isOpen={isAccuracyModalOpen}
        onClose={() => setIsAccuracyModalOpen(false)}
      />
    </div>
  );
};
