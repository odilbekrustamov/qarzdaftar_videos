import React from 'react';
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  AlertTriangle,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  MessageCircle,
  MoreVertical,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  TrendingDown,
  TrendingUp,
  Truck,
  Users,
  Wallet,
} from 'lucide-react';
import { Locale } from '../../i18n/types';
import { BRAND } from '../../theme/brand';
import { TapIndicator } from '../../components/TapIndicator';

interface ScreenProps {
  locale: Locale;
}

const TEXTS = {
  uz: {
    appName: 'Qarz Daftar',
    totalDebtLabel: 'UMUMIY QARZ MIQDORI',
    totalDebtValue: "4 850 000 so'm",
    activeClients: '12 ta faol mijoz',
    addedToday: "Bugun qo'shildi",
    addedTodayVal: "+ 250 000 so'm",
    collectedToday: "Bugun yig'ildi",
    collectedTodayVal: "- 100 000 so'm",
    fabAddDebt: "Qarz qo'shish",
    menuDebtors: 'Qarzdorlar',
    menuDebtorsSub: "Qarzlar ro'yxati va holati",
    menuInstallment: 'Nasiya savdo',
    menuInstallmentSub: 'Nasiya savdolarni yuritish',
    menuSuppliers: "Ta'minotchilar",
    menuSuppliersSub: 'Yetkazib beruvchilar bilan hisob',
    menuSellers: 'Sotuvchilar',
    menuSellersSub: 'Xodimlaringizni boshqaring',
    menuSms: 'SMS',
    menuSmsSub: 'Qarzdorlarga eslatma yuboring',
    menuSubscription: 'Obuna',
    menuSubscriptionSub: "Tarif va limitlaringizni ko'ring",

    // Quick Debt Entry -> Debt Details
    addDebtTitle: "Yangi qarz qo'shish",
    secCustomer: "MIJOZ MA'LUMOTLARI",
    lblPhone: 'Telefon raqami',
    valPhone: '+998 90 123 45 67',
    lblName: 'Mijoz ismi',
    valName: 'Alisher Karimov',
    secDebt: 'QARZ TAFSILOTLARI',
    lblAmount: 'Qarz miqdori',
    valAmount: "1 000 000 so'm",
    lblDueDate: "To'lov muddati",
    valDueDate: '30-Noyabr, 2026',
    lblSmsToggle: 'SMS orqali eslatma yuborish',
    lblSmsToggleSub: 'Muddati kelganda avtomatik xabar yuborish',
    btnSave: 'Saqlash',

    // Debt Details Screen (1:1 DebtDetailsScreen.kt)
    debtDetailsTitle: 'Qarz Tafsilotlari',
    totalDebtCardLabel: 'Jami qarz',
    overdueBadge: "Muddati o'tgan",
    daysRemaining: 'Muddatiga 3 kun qoldi',
    btnDetailAddDebt: "+ Qarz qo'shish",
    secHistory: 'Barcha qarz tarixi',
    event1Title: 'SMS eslatma yuborildi',
    event1Desc: '"Assalomu alaykum, Alisher! 600,000 so\'m qarzingizni eslatamiz..."',
    event1Date: 'Bugun, 09:41',
    event2Title: "Qisman to'lov qabul qilindi",
    event2Desc: 'Naqd pul orqali · Sotuvchi',
    event2Amount: "+ 400 000 so'm",
    event2Date: 'Kecha, 14:20',
    event3Title: 'Qarz yaratildi',
    event3Desc: 'Oziq-ovqat mahsulotlari',
    event3Amount: "- 1 000 000 so'm",
    event3Date: '10-Noy, 10:00',
    btnMakePayment: "To'lov qilish",

    // Installment Card Screen (1:1 InstallmentCardScreen.kt)
    instCardTitle: 'Nasiya shartnomasi',
    instProduct: 'Muzlatkich Artel Grand 320L',
    instClientName: 'Olimjon Rahimov',
    instClientPhone: '+998 93 111 22 33',
    instSummaryStatus: "To'lov holati",
    instTotalLabel: 'Jami narx',
    instTotalVal: "6 000 000 so'm",
    instDownPaymentLabel: "Boshlang'ich",
    instDownPaymentVal: "1 000 000 so'm",
    instRemainingLabel: 'Qolgan qarz',
    instRemainingVal: "4 000 000 so'm",
    instSecSchedule: "Oylik to'lovlar jadvali (6 oy)",
    instRow1Month: '1-oylik to\'lov',
    instRow1Date: '15-Oktabr, 2026',
    instRow1Amount: "1 000 000 so'm",
    instRow1Status: "To'langan",
    instRow2Month: '2-oylik to\'lov',
    instRow2Date: 'Bugun (15-Noyabr)',
    instRow2Amount: "1 000 000 so'm",
    instRow2Status: "To'lov muddati: Bugun",
    instRow3Month: '3-oylik to\'lov',
    instRow3Date: '15-Dekabr, 2026',
    instRow3Amount: "1 000 000 so'm",
    instRow3Status: 'Kutilmoqda',
    instAlertTitle: 'Avtomatik SMS eslatma jo\'natildi',
    instAlertBody: '"Hurmatli Olimjon aka, bugun Artel muzlatkich uchun 1 000 000 so\'m oylik to\'lov kuni. QarzDaftar"',
    btnInstPay: "To'lov qabul qilish",

    // Supplier Card Screen (1:1 SupplierCardScreen.kt & SupplierHeaderSection.kt)
    suppAppBarTitle: "Ta'minotchi tafsilotlari",
    suppCardTitle: 'Coca-Cola Ichimliklari',
    suppPhone: '+998 71 200 00 00',
    suppDebtTitle: 'Qarzdorlik',
    suppStatusDebt: 'Qarz bor',
    suppDebtVal: "3 200 000 so'm",
    suppOverdueText: "Muddati o'tgan: 1 200 000 so'm",
    suppDueDateText: "To'lov muddati: 25-Noyabr, 2026",
    btnAddDelivery: '+ Tovar qabul qilish',
    suppFilterAll: 'Barchasi',
    suppFilterDeliveries: 'Tovarlar',
    suppFilterPayments: "To'lovlar",
    suppEvent1Title: 'Tovar qabul qilindi',
    suppEvent1Desc: 'Partiya #4210 · Gazli ichimliklar (50 blok)',
    suppEvent1Date: '18-Noyabr, 14:00',
    suppEvent1Amount: "+ 8 500 000 so'm",
    suppEvent2Title: "To'lov amalga oshirildi",
    suppEvent2Desc: "Bank o'tkazmasi orqali (Hisob-faktura)",
    suppEvent2Date: '19-Noyabr, 11:30',
    suppEvent2Amount: "- 5 300 000 so'm",
    btnSuppPay: "To'lov qilish",

    // Analytics Screen (1:1 AnalyticsScreen.kt)
    statsTitle: 'Hisobot va statistika',
    tabWeekly: 'Haftalik',
    tabMonthly: 'Oylik',
    tabYearly: 'Yillik',
    statsTotalBalance: 'JAMI QARZ BALANSI',
    valCurrency: "so'm",
    growthWeek: 'Haftalik +8.4%',
    growthMonth: 'Oylik +12.1%',
    growthYear: 'Yillik +15.2%',
    statsChartTitle: 'Qarzlar nisbati (Berilgan / Yig\'ilgan)',
    legendGiven: 'Berilgan',
    legendCollected: "Yig'ilgan",
    gridTotalDebt: 'Jami qarz',
    gridTotalDebtVal: '4.8 mln',
    gridTodayCollected: "Bugun yig'ildi",
    gridTodayCollectedVal: '100 ming',
    gridPeriodGiven: 'Berilgan qarz',
    gridPeriodCollected: "Yig'ilgan qarz",

    // Outro Screen
    outroTitle: 'QarzDaftar bilan boshlang!',
    outroSub: "Do'koningizdagi barcha qarz va nasiyalarni bugunoq tartibga soling.",
    outroPlayStore: "Google Play'dan yuklab oling",
    outroSecurity: '100% Xavfsiz & Bulutda saqlanadi',
  },
  ru: {
    appName: 'Qarz Daftar',
    totalDebtLabel: 'ОБЩАЯ СУММА ДОЛГА',
    totalDebtValue: '4 850 000 сум',
    activeClients: '12 активных клиентов',
    addedToday: 'Добавлено сегодня',
    addedTodayVal: '+ 250 000 сум',
    collectedToday: 'Собрано сегодня',
    collectedTodayVal: '- 100 000 сум',
    fabAddDebt: 'Добавить долг',
    menuDebtors: 'Должники',
    menuDebtorsSub: 'Список и статус долгов',
    menuInstallment: 'Продажа в рассрочку',
    menuInstallmentSub: 'Ведите продажи в рассрочку',
    menuSuppliers: 'Поставщики',
    menuSuppliersSub: 'Расчёты с поставщиками',
    menuSellers: 'Продавцы',
    menuSellersSub: 'Управляйте сотрудниками',
    menuSms: 'SMS',
    menuSmsSub: 'Отправляйте напоминания должникам',
    menuSubscription: 'Подписка',
    menuSubscriptionSub: 'Смотрите тариф и лимиты',

    // Quick Debt Entry -> Debt Details
    addDebtTitle: 'Новый долг',
    secCustomer: 'ДАННЫЕ КЛИЕНТА',
    lblPhone: 'Номер телефона',
    valPhone: '+998 90 123 45 67',
    lblName: 'Имя клиента',
    valName: 'Алишер Каримов',
    secDebt: 'ДЕТАЛИ ДОЛГА',
    lblAmount: 'Сумма долга',
    valAmount: '1 000 000 сум',
    lblDueDate: 'Срок возврата',
    valDueDate: '30-Ноября, 2026',
    lblSmsToggle: 'Отправлять SMS-напоминание',
    lblSmsToggleSub: 'Автоматическое сообщение при наступлении срока',
    btnSave: 'Сохранить',

    // Debt Details Screen
    debtDetailsTitle: 'Детали долга',
    totalDebtCardLabel: 'Остаток долга',
    overdueBadge: 'Просрочено',
    daysRemaining: 'Срок через 3 дня',
    btnDetailAddDebt: '+ Добавить долг',
    secHistory: 'Вся история долга',
    event1Title: 'Отправлено SMS-напоминание',
    event1Desc: '"Здравствуйте, Алишер! Напоминаем о долге 600,000 сум..."',
    event1Date: 'Сегодня, 09:41',
    event2Title: 'Принята частичная оплата',
    event2Desc: 'Наличными · Продавец',
    event2Amount: '+ 400 000 сум',
    event2Date: 'Вчера, 14:20',
    event3Title: 'Долг создан',
    event3Desc: 'Продукты питания',
    event3Amount: '- 1 000 000 сум',
    event3Date: '10-Ноя, 10:00',
    btnMakePayment: 'Принять оплату',

    // Installment Card Screen
    instCardTitle: 'Договор рассрочки',
    instProduct: 'Холодильник Artel Grand 320L',
    instClientName: 'Олимжон Рахимов',
    instClientPhone: '+998 93 111 22 33',
    instSummaryStatus: 'Статус оплаты',
    instTotalLabel: 'Стоимость',
    instTotalVal: '6 000 000 сум',
    instDownPaymentLabel: 'Предоплата',
    instDownPaymentVal: '1 000 000 сум',
    instRemainingLabel: 'Остаток долга',
    instRemainingVal: '4 000 000 сум',
    instSecSchedule: 'График ежемесячных платежей (6 мес)',
    instRow1Month: '1-й платеж',
    instRow1Date: '15-Октября, 2026',
    instRow1Amount: '1 000 000 сум',
    instRow1Status: 'Оплачено',
    instRow2Month: '2-й платеж',
    instRow2Date: 'Сегодня (15-Ноября)',
    instRow2Amount: '1 000 000 сум',
    instRow2Status: 'Срок: Сегодня',
    instRow3Month: '3-й платеж',
    instRow3Date: '15-Декабря, 2026',
    instRow3Amount: '1 000 000 сум',
    instRow3Status: 'Ожидается',
    instAlertTitle: 'Авто-SMS отправлено',
    instAlertBody: '"Уважаемый Олимжон ака, сегодня день платежа за холодильник: 1 000 000 сум. QarzDaftar"',
    btnInstPay: 'Принять оплату',

    // Supplier Card Screen
    suppAppBarTitle: 'Детали поставщика',
    suppCardTitle: 'ООО Coca-Cola Напитки',
    suppPhone: '+998 71 200 00 00',
    suppDebtTitle: 'Задолженность',
    suppStatusDebt: 'Есть долг',
    suppDebtVal: '3 200 000 сум',
    suppOverdueText: 'Просрочено: 1 200 000 сум',
    suppDueDateText: 'Срок оплаты: 25-Ноября, 2026',
    btnAddDelivery: '+ Принять товар',
    suppFilterAll: 'Все',
    suppFilterDeliveries: 'Товары',
    suppFilterPayments: 'Оплаты',
    suppEvent1Title: 'Товар принят',
    suppEvent1Desc: 'Партия #4210 · Напитки (50 упаковок)',
    suppEvent1Date: '18-Ноября, 14:00',
    suppEvent1Amount: '+ 8 500 000 сум',
    suppEvent2Title: 'Оплата произведена',
    suppEvent2Desc: 'Банковский перевод (Счёт-фактура)',
    suppEvent2Date: '19-Ноября, 11:30',
    suppEvent2Amount: '- 5 300 000 сум',
    btnSuppPay: 'Оплатить',

    // Analytics Screen (1:1 AnalyticsScreen.kt)
    statsTitle: 'Отчёты и статистика',
    tabWeekly: 'Неделя',
    tabMonthly: 'Месяц',
    tabYearly: 'Год',
    statsTotalBalance: 'ОБЩИЙ БАЛАНС ДОЛГОВ',
    valCurrency: 'сум',
    growthWeek: 'Неделя +8.4%',
    growthMonth: 'Месяц +12.1%',
    growthYear: 'Год +15.2%',
    statsChartTitle: 'Соотношение (Выдано / Собрано)',
    legendGiven: 'Выдано',
    legendCollected: 'Собрано',
    gridTotalDebt: 'Общий долг',
    gridTotalDebtVal: '4.8 млн',
    gridTodayCollected: 'Собрано сегодня',
    gridTodayCollectedVal: '100 тыс',
    gridPeriodGiven: 'Выдано в долг',
    gridPeriodCollected: 'Собрано долгов',

    // Outro Screen
    outroTitle: 'Начните с QarzDaftar!',
    outroSub: 'Наведите полный порядок в долгах и оплатах уже сегодня.',
    outroPlayStore: 'Доступно в Google Play',
    outroSecurity: '100% Безопасно & Облачное хранение',
  },
} as const;

/**
 * SCENE 1: REAL HOME DASHBOARD (1:1 HomeScreen.kt)
 */
export const AnimatedHomeScreen: React.FC<ScreenProps> = ({ locale }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = TEXTS[locale];

  // Rolling balance counter 0 -> 4,850,000
  const balanceProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 18, stiffness: 70 },
  });
  const currentBalance = Math.round(
    interpolate(balanceProgress, [0, 1], [0, 4850000]),
  );
  const formattedBalance = currentBalance
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  const pulse = Math.sin(frame / 6) * 0.05 + 1;

  return (
    <div
      style={{
        flex: 1,
        height: '100%',
        backgroundColor: '#F6F7F8',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top App Bar */}
      <div
        style={{
          height: 56,
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              backgroundColor: '#197FE6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: 16,
            }}
          >
            QD
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#171D1E' }}>
            {t.appName}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12, color: '#6B7280' }}>
          <Search size={20} />
          <div style={{ position: 'relative' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#EF4444', position: 'absolute', top: -1, right: -1 }} />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Total Balance Card (1:1 with HomeScreen.kt Blue Gradient Card) */}
        <div
          style={{
            background: 'linear-gradient(135deg, #197FE6 0%, #1565C0 100%)',
            borderRadius: 20,
            padding: '18px 20px',
            color: '#FFFFFF',
            boxShadow: '0 12px 28px rgba(25, 127, 230, 0.28)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.6px', color: '#E0F2FE' }}>
              {t.totalDebtLabel}
            </span>
            <span
              style={{
                padding: '3px 10px',
                borderRadius: 999,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                fontSize: 11,
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Users size={12} />
              {t.activeClients}
            </span>
          </div>

          <div style={{ fontSize: 32, fontWeight: 900, marginTop: 8, letterSpacing: '-0.5px' }}>
            {formattedBalance} <span style={{ fontSize: 20, fontWeight: 700 }}>{t.valCurrency}</span>
          </div>

          <div style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.18)', margin: '14px 0 12px' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, color: '#E0F2FE' }}>{t.addedToday}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                <TrendingUp size={14} />
                {t.addedTodayVal}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: '#E0F2FE' }}>{t.collectedToday}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2, justifyContent: 'flex-end' }}>
                <TrendingDown size={14} />
                {t.collectedTodayVal}
              </div>
            </div>
          </div>
        </div>

        {/* 6 Category Cards Grid (1:1 with Home Category Cards) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {/* Card 1: Debtors */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#EFF6FF', color: '#197FE6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <Users size={20} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#171D1E' }}>{t.menuDebtors}</div>
            <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{t.menuDebtorsSub}</div>
          </div>

          {/* Card 2: Installments */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#FAF5FF', color: '#9333EA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <CreditCard size={20} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#171D1E' }}>{t.menuInstallment}</div>
            <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{t.menuInstallmentSub}</div>
          </div>

          {/* Card 3: Suppliers */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#FFF7ED', color: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <Truck size={20} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#171D1E' }}>{t.menuSuppliers}</div>
            <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{t.menuSuppliersSub}</div>
          </div>

          {/* Card 4: Sellers */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#F0FDFA', color: '#0D9488', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <Store size={20} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#171D1E' }}>{t.menuSellers}</div>
            <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{t.menuSellersSub}</div>
          </div>

          {/* Card 5: SMS */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <MessageCircle size={20} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#171D1E' }}>{t.menuSms}</div>
            <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{t.menuSmsSub}</div>
          </div>

          {/* Card 6: Subscription */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 16, padding: '14px', border: '1px solid #E2E8F0', boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#FEFCE8', color: '#CA8A04', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <Sparkles size={20} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#171D1E' }}>{t.menuSubscription}</div>
            <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{t.menuSubscriptionSub}</div>
          </div>
        </div>
      </div>

      {/* Floating Action Button (+ Qarz qo'shish) */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          right: 20,
          backgroundColor: '#197FE6',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: 999,
          boxShadow: '0 8px 24px rgba(25, 127, 230, 0.45)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 14,
          fontWeight: 800,
          transform: `scale(${pulse})`,
        }}
      >
        <Plus size={18} />
        {t.fabAddDebt}
      </div>
    </div>
  );
};

/**
 * SCENE 2: QUICK DEBT FORM -> TRANSITIONS DIRECTLY TO REAL DEBT DETAILS SCREEN
 */
export const AnimatedQuickDebtScreen: React.FC<ScreenProps> = ({ locale }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = TEXTS[locale];

  // Stage 1: Typing and saving form (0 to 120 frames)
  // Stage 2: Real Debt Details Screen (120+ frames)
  const isDetailStage = frame >= 120;

  // Typing simulation
  const typedNameLength = Math.min(
    t.valName.length,
    Math.floor(interpolate(frame, [15, 60], [0, t.valName.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })),
  );
  const displayedName = t.valName.slice(0, typedNameLength);

  const typedAmountLength = Math.min(
    t.valAmount.length,
    Math.floor(interpolate(frame, [50, 85], [0, t.valAmount.length], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })),
  );
  const displayedAmount = t.valAmount.slice(0, typedAmountLength);

  // Transition bounce
  const detailSpring = spring({
    frame: frame - 120,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  return (
    <div
      style={{
        flex: 1,
        height: '100%',
        backgroundColor: '#F6F7F8',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {!isDetailStage ? (
        // STAGE 1: Real Quick Add Debt Form
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Top App Bar (1:1 CenterAlignedTopAppBar) */}
          <div style={{ height: 56, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
            <div style={{ width: 40, display: 'flex', alignItems: 'center' }}>
              <ArrowLeft size={22} color="#171D1E" />
            </div>
            <div style={{ flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 800, color: '#171D1E' }}>
              {t.addDebtTitle}
            </div>
            <div style={{ width: 40 }} />
          </div>

          <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Section 1: Customer */}
            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', letterSpacing: '0.5px' }}>
              {t.secCustomer}
            </div>

            {/* Phone Input Box */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, padding: '12px 14px', border: '1.5px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 10 }}>
              <Phone size={18} color="#197FE6" />
              <span style={{ fontSize: 15, fontWeight: 700, color: '#171D1E' }}>{t.valPhone}</span>
            </div>

            {/* Name Input Box */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, padding: '12px 14px', border: frame >= 15 && frame < 65 ? '2px solid #197FE6' : '1.5px solid #E2E8F0' }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: displayedName ? '#171D1E' : '#94A3B8' }}>
                {displayedName || t.lblName}
                {frame >= 15 && frame < 65 && <span style={{ color: '#197FE6' }}>|</span>}
              </span>
            </div>

            {/* Section 2: Debt Details */}
            <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', letterSpacing: '0.5px', marginTop: 4 }}>
              {t.secDebt}
            </div>

            {/* Amount Input Box */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, padding: '14px', border: frame >= 50 && frame < 90 ? '2px solid #197FE6' : '1.5px solid #E2E8F0', boxShadow: frame >= 50 && frame < 90 ? '0 0 0 3px rgba(25, 127, 230, 0.15)' : 'none' }}>
              <span style={{ fontSize: 20, fontWeight: 900, color: displayedAmount ? '#197FE6' : '#94A3B8' }}>
                {displayedAmount || t.lblAmount}
                {frame >= 50 && frame < 90 && <span style={{ color: '#197FE6' }}>|</span>}
              </span>
            </div>

            {/* Due Date */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, padding: '12px 14px', border: '1.5px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#171D1E' }}>{t.valDueDate}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>

            {/* SMS Toggle Box */}
            <div style={{ backgroundColor: '#F0FDF4', borderRadius: 14, padding: '12px 14px', border: '1.5px solid #86EFAC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#166534' }}>{t.lblSmsToggle}</div>
                <div style={{ fontSize: 11, color: '#15803D', marginTop: 2 }}>{t.lblSmsToggleSub}</div>
              </div>
              <div style={{ width: 44, height: 26, borderRadius: 999, backgroundColor: '#22C55E', padding: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: '#FFFFFF', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} />
              </div>
            </div>

            {/* Save Button */}
            <div style={{ marginTop: 'auto', paddingBottom: 10 }}>
              <div
                style={{
                  width: '100%',
                  height: 48,
                  borderRadius: 14,
                  backgroundColor: '#197FE6',
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(25, 127, 230, 0.35)',
                  transform: frame >= 95 && frame < 115 ? 'scale(0.97)' : 'scale(1)',
                }}
              >
                {t.btnSave}
              </div>
            </div>
          </div>

          {/* Tap indicator on Save button */}
          {frame >= 95 && frame < 115 && <TapIndicator x={310} y={710} startFrame={95} color="#197FE6" />}
        </div>
      ) : (
        // STAGE 2: Real Debt Details Screen (1:1 DebtDetailsScreen.kt)
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            opacity: detailSpring,
            transform: `scale(${interpolate(detailSpring, [0, 1], [0.96, 1])})`,
          }}
        >
          {/* Top App Bar (1:1 CenterAlignedTopAppBar) */}
          <div style={{ height: 56, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
            <div style={{ width: 40, display: 'flex', alignItems: 'center' }}>
              <ArrowLeft size={22} color="#171D1E" />
            </div>
            <div style={{ flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 800, color: '#171D1E' }}>
              {t.debtDetailsTitle}
            </div>
            <div style={{ width: 40, display: 'flex', justifyContent: 'flex-end' }}>
              <MoreVertical size={20} color="#6B7280" />
            </div>
          </div>

          <div style={{ flex: 1, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {/* Customer Header Info */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 18, padding: '14px 16px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: '#0D9488', color: '#FFFFFF', fontSize: 18, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  A
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#171D1E' }}>{t.valName}</div>
                  <div style={{ fontSize: 13, color: '#64748B', marginTop: 1 }}>{t.valPhone}</div>
                </div>
              </div>
              <div style={{ width: 38, height: 38, borderRadius: '50%', backgroundColor: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Phone size={18} />
              </div>
            </div>

            {/* Total Debt Banner Card */}
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 18, padding: '14px 16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#64748B' }}>{t.totalDebtCardLabel}</span>
                <span style={{ padding: '3px 10px', borderRadius: 999, backgroundColor: '#FEF2F2', color: '#EF4444', fontSize: 11, fontWeight: 800 }}>
                  {t.overdueBadge}
                </span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#171D1E', marginTop: 4 }}>
                600 000 <span style={{ fontSize: 18, fontWeight: 700 }}>{t.valCurrency}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748B', marginTop: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span>30-Noyabr, 2026</span>
                <span style={{ color: '#EF4444', fontWeight: 700 }}>· {t.daysRemaining}</span>
              </div>
            </div>

            {/* Section Header: Barcha qarz tarixi */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#171D1E' }}>{t.secHistory}</span>
              <span style={{ fontSize: 12, color: '#197FE6', fontWeight: 700 }}>3 ta amal</span>
            </div>

            {/* Event List (Ledger Rows) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* Event 1: SMS sent */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, padding: '10px 12px', border: '1px solid #E2E8F0', display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: '#EFF6FF', color: '#197FE6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MessageCircle size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#171D1E' }}>{t.event1Title}</span>
                    <span style={{ fontSize: 11, color: '#94A3B8' }}>{t.event1Date}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#64748B', fontStyle: 'italic', marginTop: 2 }}>
                    {t.event1Desc}
                  </div>
                </div>
              </div>

              {/* Event 2: Payment Received */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, padding: '10px 12px', border: '1px solid #E2E8F0', display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <TrendingDown size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#171D1E' }}>{t.event2Title}</span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#16A34A' }}>{t.event2Amount}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94A3B8', marginTop: 2 }}>
                    <span>{t.event2Desc}</span>
                    <span>{t.event2Date}</span>
                  </div>
                </div>
              </div>

              {/* Event 3: Debt Created */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, padding: '10px 12px', border: '1px solid #E2E8F0', display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: '#FEF2F2', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <TrendingUp size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#171D1E' }}>{t.event3Title}</span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#EF4444' }}>{t.event3Amount}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94A3B8', marginTop: 2 }}>
                    <span>{t.event3Desc}</span>
                    <span>{t.event3Date}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Make Payment Button */}
          <div style={{ padding: '10px 16px 16px', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
            <div style={{ width: '100%', height: 48, borderRadius: 16, backgroundColor: '#22C55E', color: '#FFFFFF', fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 6px 18px rgba(34, 197, 94, 0.35)' }}>
              <TrendingDown size={18} />
              {t.btnMakePayment}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * SCENE 3: REAL INSTALLMENT CONTRACT CARD & SCHEDULE (1:1 InstallmentCardScreen.kt)
 */
export const AnimatedInstallmentScreen: React.FC<ScreenProps> = ({ locale }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = TEXTS[locale];

  const alertSpring = spring({ frame: frame - 40, fps, config: { damping: 14 } });
  const progressSpring = spring({ frame: frame - 15, fps, config: { damping: 16 } });

  return (
    <div
      style={{
        flex: 1,
        height: '100%',
        backgroundColor: '#F6F7F8',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top App Bar (1:1 CenterAlignedTopAppBar) */}
      <div style={{ height: 56, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ width: 40, display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={22} color="#171D1E" />
        </div>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 800, color: '#171D1E' }}>
          {t.instCardTitle}
        </div>
        <div style={{ width: 40, display: 'flex', justifyContent: 'flex-end' }}>
          <MoreVertical size={20} color="#6B7280" />
        </div>
      </div>

      <div style={{ flex: 1, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Customer & Product Card (1:1 InstallmentHeaderSection.kt) */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 18, padding: '14px 16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#171D1E' }}>
                {t.instProduct}
              </div>
              <div style={{ fontSize: 13, color: '#64748B', marginTop: 3 }}>
                {t.instClientName} · {t.instClientPhone}
              </div>
            </div>
            <div style={{ width: 38, height: 38, borderRadius: '50%', backgroundColor: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Phone size={18} />
            </div>
          </div>
        </div>

        {/* Summary Card (1:1 InstallmentSummarySection.kt) */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 18, padding: '14px 16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#171D1E' }}>
              {t.instSummaryStatus}
            </span>
            <span style={{ padding: '3px 10px', borderRadius: 999, backgroundColor: '#F0FDF4', color: '#16A34A', fontSize: 12, fontWeight: 800 }}>
              33%
            </span>
          </div>
          {/* Progress Bar */}
          <div style={{ width: '100%', height: 7, borderRadius: 999, backgroundColor: '#E2E8F0', overflow: 'hidden', marginBottom: 12 }}>
            <div style={{ width: `${interpolate(progressSpring, [0, 1], [0, 33])}%`, height: '100%', backgroundColor: '#9333EA', borderRadius: 999 }} />
          </div>
          {/* 3 Metrics breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, paddingTop: 6, borderTop: '1px solid #F1F5F9' }}>
            <div>
              <div style={{ fontSize: 11, color: '#64748B' }}>{t.instTotalLabel}</div>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: '#171D1E', marginTop: 2 }}>{t.instTotalVal}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#64748B' }}>{t.instDownPaymentLabel}</div>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: '#16A34A', marginTop: 2 }}>{t.instDownPaymentVal}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#64748B' }}>{t.instRemainingLabel}</div>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: '#EF4444', marginTop: 2 }}>{t.instRemainingVal}</div>
            </div>
          </div>
        </div>

        {/* Section: Monthly Schedule (1:1 InstallmentScheduleRowCard.kt) */}
        <div style={{ fontSize: 14, fontWeight: 800, color: '#171D1E', marginTop: 2 }}>
          {t.instSecSchedule}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* Row 1: Paid */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, padding: '10px 14px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#F1F5F9', color: '#475569', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#171D1E' }}>{t.instRow1Month}</div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 1 }}>{t.instRow1Date}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#171D1E' }}>{t.instRow1Amount}</div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 10.5, fontWeight: 800, color: '#16A34A' }}>
                <CheckCircle2 size={11} /> {t.instRow1Status}
              </span>
            </div>
          </div>

          {/* Row 2: Overdue / Due Today */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, padding: '10px 14px', border: '2px solid #EF4444', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#FEF2F2', color: '#EF4444', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#171D1E' }}>{t.instRow2Month}</div>
                <div style={{ fontSize: 11, color: '#EF4444', fontWeight: 700, marginTop: 1 }}>{t.instRow2Date}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#EF4444' }}>{t.instRow2Amount}</div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 10.5, fontWeight: 800, color: '#EF4444' }}>
                <Clock size={11} /> {t.instRow2Status}
              </span>
            </div>
          </div>

          {/* Row 3: Pending */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, padding: '10px 14px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: '#F1F5F9', color: '#94A3B8', fontSize: 12, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#64748B' }}>{t.instRow3Month}</div>
                <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>{t.instRow3Date}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#64748B' }}>{t.instRow3Amount}</div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 10.5, fontWeight: 700, color: '#94A3B8' }}>
                {t.instRow3Status}
              </span>
            </div>
          </div>
        </div>

        {/* Floating SMS Alert (Slides in from bottom) */}
        {frame >= 40 && (
          <div
            style={{
              marginTop: 'auto',
              padding: '12px 14px',
              borderRadius: 16,
              backgroundColor: '#1E1B4B',
              color: '#FFFFFF',
              boxShadow: '0 16px 36px rgba(30, 27, 75, 0.45)',
              border: '1.5px solid #818CF8',
              transform: `translateY(${interpolate(alertSpring, [0, 1], [40, 0])}px)`,
              opacity: alertSpring,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 800, color: '#A5B4FC', marginBottom: 3 }}>
              <MessageCircle size={16} />
              {t.instAlertTitle}
            </div>
            <div style={{ fontSize: 11.5, color: '#E0E7FF', lineHeight: 1.4 }}>
              {t.instAlertBody}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar: Accept Payment Button (Purple) */}
      <div style={{ padding: '10px 16px 16px', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ width: '100%', height: 48, borderRadius: 16, backgroundColor: '#9333EA', color: '#FFFFFF', fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 6px 18px rgba(147, 51, 234, 0.35)' }}>
          <CreditCard size={18} />
          {t.btnInstPay}
        </div>
      </div>
    </div>
  );
};

/**
 * SCENE 4: REAL SUPPLIER CARD & TRANSACTIONS (1:1 SupplierCardScreen.kt & SupplierHeaderSection.kt)
 */
export const AnimatedSuppliersScreen: React.FC<ScreenProps> = ({ locale }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = TEXTS[locale];

  return (
    <div
      style={{
        flex: 1,
        height: '100%',
        backgroundColor: '#F6F7F8',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top App Bar (1:1 CenterAlignedTopAppBar) */}
      <div style={{ height: 56, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ width: 40, display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={22} color="#171D1E" />
        </div>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 800, color: '#171D1E' }}>
          {t.suppAppBarTitle}
        </div>
        <div style={{ width: 40, display: 'flex', justifyContent: 'flex-end' }}>
          <MoreVertical size={20} color="#6B7280" />
        </div>
      </div>

      <div style={{ flex: 1, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Supplier Identity Row (1:1 SupplierIdentityRow) */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 18, padding: '12px 14px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: '#EFF6FF', color: '#197FE6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Truck size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#171D1E' }}>{t.suppCardTitle}</div>
            <div style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>{t.suppPhone}</div>
          </div>
          <div style={{ width: 38, height: 38, borderRadius: '50%', backgroundColor: '#F1F5F9', color: '#197FE6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Phone size={18} />
          </div>
        </div>

        {/* Supplier Debt Card (1:1 SupplierDebtCard) */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 18, padding: '14px 16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#64748B' }}>{t.suppDebtTitle}</span>
            <span style={{ padding: '3px 10px', borderRadius: 999, backgroundColor: '#FEF3C7', color: '#D97706', fontSize: 11, fontWeight: 800 }}>
              {t.suppStatusDebt}
            </span>
          </div>
          <div style={{ fontSize: 26, fontWeight: 900, color: '#171D1E', marginTop: 6 }}>
            {t.suppDebtVal}
          </div>
          {/* Overdue alert line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6, fontSize: 12, fontWeight: 700, color: '#EF4444' }}>
            <AlertTriangle size={13} />
            <span>{t.suppOverdueText}</span>
          </div>
          {/* Due date */}
          <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 4 }}>
            {t.suppDueDateText}
          </div>
        </div>

        {/* Add Delivery Button (1:1 AddDeliveryButton) */}
        <div style={{ width: '100%', height: 42, borderRadius: 12, backgroundColor: 'rgba(25, 127, 230, 0.1)', color: '#197FE6', fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, border: '1px solid rgba(25, 127, 230, 0.2)' }}>
          <Plus size={16} />
          {t.btnAddDelivery}
        </div>

        {/* Filter Chips: Barchasi, Tovarlar, To'lovlar */}
        <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
          <span style={{ padding: '4px 14px', borderRadius: 999, backgroundColor: '#197FE6', color: '#FFFFFF', fontSize: 11, fontWeight: 800 }}>
            {t.suppFilterAll}
          </span>
          <span style={{ padding: '4px 14px', borderRadius: 999, backgroundColor: '#FFFFFF', color: '#64748B', fontSize: 11, fontWeight: 700, border: '1px solid #E2E8F0' }}>
            {t.suppFilterDeliveries}
          </span>
          <span style={{ padding: '4px 14px', borderRadius: 999, backgroundColor: '#FFFFFF', color: '#64748B', fontSize: 11, fontWeight: 700, border: '1px solid #E2E8F0' }}>
            {t.suppFilterPayments}
          </span>
        </div>

        {/* History Rows (1:1 DeliveryRow.kt & SupplierPaymentRow.kt) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* Delivery Row */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, padding: '10px 12px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: '#EFF6FF', color: '#197FE6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Truck size={17} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#171D1E' }}>{t.suppEvent1Title}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#171D1E' }}>{t.suppEvent1Amount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748B', marginTop: 2 }}>
                <span>{t.suppEvent1Desc}</span>
                <span>{t.suppEvent1Date}</span>
              </div>
            </div>
          </div>

          {/* Payment Row */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, padding: '10px 12px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CreditCard size={17} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#171D1E' }}>{t.suppEvent2Title}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: '#16A34A' }}>{t.suppEvent2Amount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748B', marginTop: 2 }}>
                <span>{t.suppEvent2Desc}</span>
                <span>{t.suppEvent2Date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Pay Supplier Button (Orange) */}
      <div style={{ padding: '10px 16px 16px', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ width: '100%', height: 48, borderRadius: 16, backgroundColor: '#EA580C', color: '#FFFFFF', fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 6px 18px rgba(234, 88, 12, 0.35)' }}>
          <CreditCard size={18} />
          {t.btnSuppPay}
        </div>
      </div>
    </div>
  );
};

/**
 * SCENE 5: REAL ANALYTICS SCREEN WITH 1:1 COMPOSE COMPONENTS (AnalyticsScreen.kt)
 */
export const AnimatedAnalyticsScreen: React.FC<ScreenProps> = ({ locale }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = TEXTS[locale];

  // Dynamic tab switching:
  // 0 - 80: Weekly (0s - 2.7s)
  // 80 - 160: Monthly (2.7s - 5.3s)
  // 160+: Yearly (5.3s - 9.0s)
  const activeTab: 'weekly' | 'monthly' | 'yearly' =
    frame < 80 ? 'weekly' : frame < 160 ? 'monthly' : 'yearly';

  // Bar chart configurations for each period
  const weeklyDays = ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'];
  const weeklyGiven = [65, 50, 85, 60, 52, 45, 35];
  const weeklyCollected = [52, 60, 42, 70, 58, 78, 52];

  const monthlyMonths = ['Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy'];
  const monthlyGiven = [60, 72, 80, 68, 85, 92];
  const monthlyCollected = [55, 68, 75, 74, 80, 88];

  const yearlyYears = ['2024-yil', '2025-yil', '2026-yil'];
  const yearlyGiven = [55, 78, 95];
  const yearlyCollected = [50, 72, 90];

  const tabLocalFrame =
    activeTab === 'weekly' ? frame : activeTab === 'monthly' ? frame - 80 : frame - 160;

  const barGrow = Math.max(
    0.1,
    Math.min(
      1.0,
      spring({
        frame: tabLocalFrame,
        fps,
        config: { damping: 14, stiffness: 140 },
      }),
    ),
  );

  return (
    <div
      style={{
        flex: 1,
        height: '100%',
        backgroundColor: '#F6F7F8',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top App Bar (1:1 CenterAlignedTopAppBar) */}
      <div style={{ height: 56, padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ width: 40, display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={22} color="#171D1E" />
        </div>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 800, color: '#171D1E' }}>
          {t.statsTitle}
        </div>
        <div style={{ width: 40, display: 'flex', justifyContent: 'flex-end' }}>
          <FileText size={20} color="#6B7280" />
        </div>
      </div>

      <div style={{ flex: 1, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Full-width Period Selector (1:1 PeriodSelector.kt) */}
        <div style={{ backgroundColor: '#E2E8F0', padding: 4, borderRadius: 14, display: 'flex', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: 4,
              bottom: 4,
              left: 4 + (activeTab === 'weekly' ? 0 : activeTab === 'monthly' ? 193 : 386),
              width: 194,
              backgroundColor: '#FFFFFF',
              borderRadius: 11,
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
              transition: 'left 0.25s ease',
            }}
          />
          <div style={{ flex: 1, textAlign: 'center', padding: '8px 0', fontSize: 13, fontWeight: activeTab === 'weekly' ? 800 : 600, color: activeTab === 'weekly' ? '#197FE6' : '#64748B', position: 'relative', zIndex: 2 }}>
            {t.tabWeekly}
          </div>
          <div style={{ flex: 1, textAlign: 'center', padding: '8px 0', fontSize: 13, fontWeight: activeTab === 'monthly' ? 800 : 600, color: activeTab === 'monthly' ? '#197FE6' : '#64748B', position: 'relative', zIndex: 2 }}>
            {t.tabMonthly}
          </div>
          <div style={{ flex: 1, textAlign: 'center', padding: '8px 0', fontSize: 13, fontWeight: activeTab === 'yearly' ? 800 : 600, color: activeTab === 'yearly' ? '#197FE6' : '#64748B', position: 'relative', zIndex: 2 }}>
            {t.tabYearly}
          </div>
        </div>

        {/* Tap indicator clicking between tabs */}
        {frame >= 72 && frame < 86 && <TapIndicator x={310} y={80} startFrame={72} color="#197FE6" />}
        {frame >= 152 && frame < 166 && <TapIndicator x={500} y={80} startFrame={152} color="#197FE6" />}

        {/* Total Balance Card (1:1 TotalBalanceCard.kt) */}
        <div
          style={{
            backgroundColor: '#197FE6',
            borderRadius: 18,
            padding: '16px 18px',
            color: '#FFFFFF',
            boxShadow: '0 8px 24px rgba(25, 127, 230, 0.28)',
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.5px', color: 'rgba(255, 255, 255, 0.75)' }}>
            {t.statsTotalBalance}
          </div>
          <div style={{ fontSize: 26, fontWeight: 900, marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span>
              {activeTab === 'weekly' ? '4,850,000' : activeTab === 'monthly' ? '24,700,000' : '125,400,000'}
            </span>
            <span style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255, 255, 255, 0.85)' }}>
              {t.valCurrency}
            </span>
          </div>

          {/* Divider */}
          <div style={{ width: '100%', height: 1, backgroundColor: 'rgba(255, 255, 255, 0.2)', margin: '10px 0' }} />

          {/* 3 Change stats */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700 }}>
            <span style={{ padding: '3px 8px', borderRadius: 999, backgroundColor: 'rgba(255, 255, 255, 0.18)' }}>
              {t.growthWeek}
            </span>
            <span style={{ padding: '3px 8px', borderRadius: 999, backgroundColor: 'rgba(255, 255, 255, 0.18)' }}>
              {t.growthMonth}
            </span>
            <span style={{ padding: '3px 8px', borderRadius: 999, backgroundColor: 'rgba(255, 255, 255, 0.18)' }}>
              {t.growthYear}
            </span>
          </div>
        </div>

        {/* Bar Chart Card (1:1 BarChartCard.kt) */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 18,
            padding: '12px 16px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 12.5, fontWeight: 800, color: '#171D1E' }}>
              {t.statsChartTitle}
            </span>
            <div style={{ display: 'flex', gap: 8, fontSize: 10.5, fontWeight: 700 }}>
              <span style={{ color: '#EF4444' }}>● {t.legendGiven}</span>
              <span style={{ color: '#22C55E' }}>● {t.legendCollected}</span>
            </div>
          </div>

          {/* Weekly Chart */}
          {activeTab === 'weekly' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 95, paddingBottom: 4 }}>
              {weeklyDays.map((day, idx) => (
                <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
                  <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 75 }}>
                    <div style={{ width: 10, height: Math.max(6, Math.round(weeklyGiven[idx] * 0.75 * barGrow)), backgroundColor: '#EF4444', borderRadius: '3px 3px 0 0' }} />
                    <div style={{ width: 10, height: Math.max(6, Math.round(weeklyCollected[idx] * 0.75 * barGrow)), backgroundColor: '#22C55E', borderRadius: '3px 3px 0 0' }} />
                  </div>
                  <span style={{ fontSize: 9.5, fontWeight: 700, color: '#94A3B8' }}>{day}</span>
                </div>
              ))}
            </div>
          )}

          {/* Monthly Chart */}
          {activeTab === 'monthly' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 95, paddingBottom: 4 }}>
              {monthlyMonths.map((m, idx) => (
                <div key={m} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
                  <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 75 }}>
                    <div style={{ width: 14, height: Math.max(6, Math.round(monthlyGiven[idx] * 0.75 * barGrow)), backgroundColor: '#EF4444', borderRadius: '3px 3px 0 0' }} />
                    <div style={{ width: 14, height: Math.max(6, Math.round(monthlyCollected[idx] * 0.75 * barGrow)), backgroundColor: '#22C55E', borderRadius: '3px 3px 0 0' }} />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#94A3B8' }}>{m}</span>
                </div>
              ))}
            </div>
          )}

          {/* Yearly Chart */}
          {activeTab === 'yearly' && (
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: 95, paddingBottom: 4 }}>
              {yearlyYears.map((y, idx) => (
                <div key={y} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 75 }}>
                    <div style={{ width: 28, height: Math.max(8, Math.round(yearlyGiven[idx] * 0.75 * barGrow)), backgroundColor: '#EF4444', borderRadius: '4px 4px 0 0' }} />
                    <div style={{ width: 28, height: Math.max(8, Math.round(yearlyCollected[idx] * 0.75 * barGrow)), backgroundColor: '#22C55E', borderRadius: '4px 4px 0 0' }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#94A3B8' }}>{y}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 2x2 Summary Grid (1:1 SummaryGrid.kt) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {/* Card 1: Jami qarz */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, padding: '10px 12px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: 'rgba(25, 127, 230, 0.12)', color: '#197FE6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wallet size={16} />
            </div>
            <div>
              <div style={{ fontSize: 10.5, color: '#64748B' }}>{t.gridTotalDebt}</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: '#171D1E', marginTop: 1 }}>{t.gridTotalDebtVal}</div>
            </div>
          </div>

          {/* Card 2: Bugun yig'ildi */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, padding: '10px 12px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: 'rgba(34, 197, 94, 0.12)', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowUp size={16} />
            </div>
            <div>
              <div style={{ fontSize: 10.5, color: '#64748B' }}>{t.gridTodayCollected}</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: '#16A34A', marginTop: 1 }}>{t.gridTodayCollectedVal}</div>
            </div>
          </div>

          {/* Card 3: Berilgan qarz (davr) */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, padding: '10px 12px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.12)', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowDown size={16} />
            </div>
            <div>
              <div style={{ fontSize: 10.5, color: '#64748B' }}>{t.gridPeriodGiven}</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: '#EF4444', marginTop: 1 }}>
                {activeTab === 'weekly' ? '8.4 mln' : activeTab === 'monthly' ? '24.7 mln' : '125.4 mln'}
              </div>
            </div>
          </div>

          {/* Card 4: Yig'ilgan qarz (davr) */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, padding: '10px 12px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', backgroundColor: 'rgba(34, 197, 94, 0.12)', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowUp size={16} />
            </div>
            <div>
              <div style={{ fontSize: 10.5, color: '#64748B' }}>{t.gridPeriodCollected}</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: '#16A34A', marginTop: 1 }}>
                {activeTab === 'weekly' ? '6.3 mln' : activeTab === 'monthly' ? '21.6 mln' : '118.5 mln'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * SCENE 6: REAL OUTRO SCREEN (Call to action, Google Play button, security badge)
 */
export const AnimatedOutroScreen: React.FC<ScreenProps> = ({ locale }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = TEXTS[locale];

  const scale = spring({ frame: frame - 5, fps, config: { damping: 12, stiffness: 100 } });
  const pulse = Math.sin(frame / 7) * 0.04 + 1;

  return (
    <div
      style={{
        flex: 1,
        height: '100%',
        backgroundColor: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px 24px',
        position: 'relative',
      }}
    >
      {/* Brand Icon */}
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 28,
          backgroundColor: '#FFFFFF',
          boxShadow: '0 16px 36px rgba(25, 127, 230, 0.22)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
          transform: `scale(${scale})`,
          border: '1.5px solid #E2E8F0',
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            background: 'linear-gradient(135deg, #197FE6 0%, #1565C0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 900,
            fontSize: 32,
            boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.4)',
          }}
        >
          QD
        </div>
      </div>

      {/* Main Title */}
      <div
        style={{
          fontSize: 24,
          fontWeight: 900,
          color: '#171D1E',
          textAlign: 'center',
          marginBottom: 8,
          letterSpacing: '-0.3px',
        }}
      >
        {t.outroTitle}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 14,
          color: '#64748B',
          textAlign: 'center',
          lineHeight: 1.5,
          maxWidth: 320,
          marginBottom: 28,
        }}
      >
        {t.outroSub}
      </div>

      {/* Google Play Download Button */}
      <div
        style={{
          padding: '14px 28px',
          borderRadius: 16,
          backgroundColor: '#059669',
          color: '#FFFFFF',
          fontSize: 15,
          fontWeight: 800,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          boxShadow: '0 10px 24px rgba(5, 150, 105, 0.35)',
          transform: `scale(${pulse})`,
        }}
      >
        <ShieldCheck size={20} />
        {t.outroPlayStore}
      </div>

      {/* Security and Cloud Trust Badge */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 12,
          fontWeight: 700,
          color: '#059669',
          backgroundColor: '#ECFDF5',
          padding: '8px 16px',
          borderRadius: 999,
          border: '1px solid #A7F3D0',
        }}
      >
        <Sparkles size={14} />
        {t.outroSecurity}
      </div>
    </div>
  );
};
