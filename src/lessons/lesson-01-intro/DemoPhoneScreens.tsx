import React from 'react';
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {
  ArrowLeft,
  BarChart3,
  Bell,
  Calendar,
  Check,
  CheckCircle2,
  Home,
  MessageSquare,
  Phone,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
} from 'lucide-react';
import { Locale } from '../../i18n/types';
import { BRAND } from '../../theme/brand';
import { TapIndicator } from '../../components/TapIndicator';

interface DemoScreenProps {
  locale: Locale;
}

const UI_TEXTS = {
  uz: {
    // Intro screen
    welcomeBadge: 'Raqamli qarz daftari',
    welcomeTitle: "Qog'oz daftar o'rniga aqlli yechim",
    welcomeSub: "Kichik do'kon va savdo nuqtalari uchun yaratilgan",
    feat1Title: 'Tez qarz yozish',
    feat1Desc: '5 soniyada mijoz va summani kiriting',
    feat2Title: 'Avtomatik SMS eslatma',
    feat2Desc: "Muddati kelganda o'zi xabar yuboradi",
    feat3Title: 'Aniq hisobotlar',
    feat3Desc: "Har bir so'm nazorat ostida",

    // Home screen
    appName: 'Qarz Daftar',
    totalDebtLabel: 'UMUMIY QARZ MIQDORI',
    totalDebtAmount: "4 850 000 so'm",
    activeCustomers: '12 ta faol mijoz',
    addedToday: "Bugun qo'shildi",
    addedTodayValue: "+250 000 so'm",
    collectedToday: "Bugun yig'ildi",
    collectedTodayValue: "-100 000 so'm",
    tabAll: 'Hammasi',
    tabActive: 'Faol',
    tabPaid: "To'langan",
    statusOverdue: "Muddati o'tgan",
    statusPending: 'Kutilmoqda',
    statusPaid: "To'langan",
    smsSent: 'SMS yuborildi',
    detailsBtn: 'Batafsil',
    addDebtFab: "Qarz qo'shish",
    navHome: 'Asosiy',
    navCustomers: 'Mijozlar',
    navStats: 'Hisobot',
    navSettings: 'Sozlamalar',

    // Add debt screen
    addDebtHeader: "Yangi qarz qo'shish",
    sectionCustomer: "MIJOZ MA'LUMOTLARI",
    phoneLabel: 'Telefon raqami',
    nameLabel: 'Mijoz ismi',
    nameSample: 'Alisher Karimov',
    sectionDebt: 'QARZ TAFSILOTLARI',
    amountLabel: "Qarz miqdori (so'm)",
    amountSample: '1 000 000',
    currency: "so'm",
    dueDateLabel: "To'lov muddati",
    dueDateSample: '30-noyabr, 2026',
    smsToggleTitle: 'SMS orqali eslatma yuborish',
    smsToggleSub: 'Muddati kelsa avtomatik xabar yuborish',
    saveBtn: 'Saqlash',

    // SMS & Payment screen
    debtDetailHeader: 'Qarz tafsiloti',
    remainingLabel: 'Qolgan qarz',
    remainingValue: "600 000 so'm",
    paidChip: "400 000 so'm to'landi",
    sendSmsBtn: 'SMS eslatma',
    addPaymentBtn: "To'lov qo'shish",
    smsCardHeader: 'Avtomatik SMS · QarzDaftar',
    smsBody:
      "Assalomu alaykum, Alisher! Baraka do'konidan 600 000 so'm qarzingizni eslatib o'tamiz.",
    paymentHistoryTitle: "So'nggi to'lovlar",
    paymentEntryTitle: "Qisman to'lov qabul qilindi",
    paymentEntryDate: 'Bugun, 14:20',
    paymentEntryAmount: "+400 000 so'm",

    // Statistics screen
    statsHeader: 'Hisobot va statistika',
    statsPeriod: 'Noyabr 2026',
    givenLabel: 'Berilgan qarz',
    givenValue: "8 400 000 so'm",
    returnedLabel: "Yig'ilgan to'lov",
    returnedValue: "6 250 000 so'm",
    chartTitle: 'Oylik dinamika',
    months: ['Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy'],
    collectionRate: 'Qaytarilish foizi',

    // Outro screen
    outroTitle: "QarzDaftar'ni sinab ko'ring",
    outroSub: "Android telefoningizga yuklab oling va bugundan tartib o'rnating",
    playStoreLabel: "Google Play'da mavjud",
    nextLessonLabel: 'KEYINGI DARS',
    nextLessonTitle: "2-dars: Ro'yxatdan o'tish va do'kon sozlash",
  },
  ru: {
    // Intro screen
    welcomeBadge: 'Цифровая тетрадь долгов',
    welcomeTitle: 'Умная замена бумажной тетради',
    welcomeSub: 'Создано для небольших магазинов и торговых точек',
    feat1Title: 'Быстрая запись',
    feat1Desc: 'Добавляйте клиента и сумму за 5 секунд',
    feat2Title: 'Авто-SMS напоминания',
    feat2Desc: 'Отправляет уведомление в нужный срок',
    feat3Title: 'Точные отчёты',
    feat3Desc: 'Каждый сум под контролем',

    // Home screen
    appName: 'Qarz Daftar',
    totalDebtLabel: 'ОБЩАЯ СУММА ДОЛГОВ',
    totalDebtAmount: '4 850 000 сум',
    activeCustomers: '12 активных клиентов',
    addedToday: 'Добавлено сегодня',
    addedTodayValue: '+250 000 сум',
    collectedToday: 'Собрано сегодня',
    collectedTodayValue: '-100 000 сум',
    tabAll: 'Все',
    tabActive: 'Активные',
    tabPaid: 'Оплачено',
    statusOverdue: 'Просрочено',
    statusPending: 'Ожидается',
    statusPaid: 'Оплачено',
    smsSent: 'SMS отправлено',
    detailsBtn: 'Подробнее',
    addDebtFab: 'Добавить долг',
    navHome: 'Главная',
    navCustomers: 'Клиенты',
    navStats: 'Отчёты',
    navSettings: 'Настройки',

    // Add debt screen
    addDebtHeader: 'Новый долг',
    sectionCustomer: 'ДАННЫЕ КЛИЕНТА',
    phoneLabel: 'Номер телефона',
    nameLabel: 'Имя клиента',
    nameSample: 'Алишер Каримов',
    sectionDebt: 'ДЕТАЛИ ДОЛГА',
    amountLabel: 'Сумма долга (сум)',
    amountSample: '1 000 000',
    currency: 'сум',
    dueDateLabel: 'Срок возврата',
    dueDateSample: '30 ноября, 2026',
    smsToggleTitle: 'Отправлять SMS-напоминание',
    smsToggleSub: 'Автоматическое сообщение при наступлении срока',
    saveBtn: 'Сохранить',

    // SMS & Payment screen
    debtDetailHeader: 'Детали долга',
    remainingLabel: 'Остаток долга',
    remainingValue: '600 000 сум',
    paidChip: 'Оплачено 400 000 сум',
    sendSmsBtn: 'Отправить SMS',
    addPaymentBtn: 'Принять оплату',
    smsCardHeader: 'Авто-SMS · QarzDaftar',
    smsBody:
      'Здравствуйте, Алишер! Напоминаем о долге 600 000 сум в магазине Baraka.',
    paymentHistoryTitle: 'Последние оплаты',
    paymentEntryTitle: 'Частичная оплата принята',
    paymentEntryDate: 'Сегодня, 14:20',
    paymentEntryAmount: '+400 000 сум',

    // Statistics screen
    statsHeader: 'Отчёты и статистика',
    statsPeriod: 'Ноябрь 2026',
    givenLabel: 'Выдано в долг',
    givenValue: '8 400 000 сум',
    returnedLabel: 'Собрано оплат',
    returnedValue: '6 250 000 сум',
    chartTitle: 'Динамика по месяцам',
    months: ['Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя'],
    collectionRate: 'Процент возврата',

    // Outro screen
    outroTitle: 'Попробуйте QarzDaftar',
    outroSub: 'Установите приложение на Android и наведите порядок уже сегодня',
    playStoreLabel: 'Доступно в Google Play',
    nextLessonLabel: 'СЛЕДУЮЩИЙ УРОК',
    nextLessonTitle: 'Урок 2: Регистрация и настройка магазина',
  },
} as const;

const BottomNav: React.FC<{ active: 'home' | 'stats'; locale: Locale }> = ({
  active,
  locale,
}) => {
  const t = UI_TEXTS[locale];
  const items = [
    { id: 'home', label: t.navHome, Icon: Home },
    { id: 'customers', label: t.navCustomers, Icon: Users },
    { id: 'stats', label: t.navStats, Icon: BarChart3 },
    { id: 'settings', label: t.navSettings, Icon: Settings },
  ] as const;

  return (
    <div
      style={{
        height: 82,
        backgroundColor: '#FFFFFF',
        borderTop: `1px solid ${BRAND.colors.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 10px',
        flexShrink: 0,
      }}
    >
      {items.map(({ id, label, Icon }) => {
        const isCurrent = id === active;
        return (
          <div
            key={id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <div
              style={{
                width: 48,
                height: 32,
                borderRadius: 12,
                backgroundColor: isCurrent ? BRAND.colors.primarySoft : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon
                size={22}
                color={isCurrent ? BRAND.colors.primary : BRAND.colors.textMuted}
              />
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: isCurrent ? 700 : 500,
                color: isCurrent ? BRAND.colors.primary : BRAND.colors.textMuted,
              }}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

/* ==================== SCENE 1: WELCOME / INTRO ==================== */
export const WelcomeAppScreen: React.FC<DemoScreenProps> = ({ locale }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = UI_TEXTS[locale];

  const logoPop = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const features = [
    { icon: Wallet, title: t.feat1Title, desc: t.feat1Desc, bg: '#DBEAFE', color: BRAND.colors.primary },
    { icon: MessageSquare, title: t.feat2Title, desc: t.feat2Desc, bg: '#DCFCE7', color: BRAND.colors.accent },
    { icon: TrendingUp, title: t.feat3Title, desc: t.feat3Desc, bg: '#FEF3C7', color: BRAND.colors.warning },
  ];

  return (
    <div
      style={{
        flex: 1,
        background: 'linear-gradient(180deg, #F8FBFF 0%, #EEF4FD 100%)',
        padding: '44px 32px 44px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 142,
          height: 142,
          borderRadius: 36,
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
          boxShadow: '0 24px 50px rgba(26, 86, 219, 0.24)',
          transform: `scale(${interpolate(logoPop, [0, 1], [0.75, 1])})`,
          opacity: logoPop,
          marginBottom: 26,
        }}
      >
        <Img
          src={staticFile('common/logo.png')}
          style={{ width: '100%', height: '100%', transform: 'scale(1.42)', objectFit: 'contain' }}
        />
      </div>

      <div
        style={{
          padding: '8px 20px',
          borderRadius: 999,
          backgroundColor: BRAND.colors.primarySoft,
          color: BRAND.colors.primary,
          fontSize: 17,
          fontWeight: 700,
          marginBottom: 18,
        }}
      >
        {t.welcomeBadge}
      </div>

      <h2
        style={{
          margin: 0,
          fontSize: 34,
          lineHeight: 1.2,
          fontWeight: 800,
          color: BRAND.colors.navy,
          letterSpacing: -0.6,
        }}
      >
        {t.welcomeTitle}
      </h2>

      <p
        style={{
          margin: '14px 0 34px',
          fontSize: 19,
          lineHeight: 1.4,
          color: BRAND.colors.textSecondary,
        }}
      >
        {t.welcomeSub}
      </p>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {features.map((feat, idx) => {
          const itemPop = spring({
            frame: frame - 16 - idx * 12,
            fps,
            config: { damping: 16, stiffness: 120 },
          });
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 22,
                padding: '20px 22px',
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                textAlign: 'left',
                boxShadow: '0 10px 26px rgba(15, 23, 42, 0.06)',
                transform: `translateY(${interpolate(itemPop, [0, 1], [24, 0])}px)`,
                opacity: itemPop,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  backgroundColor: feat.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={28} color={feat.color} />
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: BRAND.colors.textPrimary }}>
                  {feat.title}
                </div>
                <div style={{ fontSize: 16, color: BRAND.colors.textSecondary, marginTop: 3 }}>
                  {feat.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ==================== SCENE 2: HOME DASHBOARD ==================== */
export const HomeDashboardScreen: React.FC<DemoScreenProps> = ({ locale }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = UI_TEXTS[locale];

  const cardPop = spring({ frame: frame - 4, fps, config: { damping: 16 } });

  const customers = [
    {
      name: locale === 'uz' ? 'Alisher Karimov' : 'Алишер Каримов',
      phone: '+998 90 123 45 67',
      amount: locale === 'uz' ? "1 200 000 so'm" : '1 200 000 сум',
      status: t.statusOverdue,
      statusBg: BRAND.colors.problemSoft,
      statusColor: BRAND.colors.problem,
      initials: 'AK',
    },
    {
      name: locale === 'uz' ? 'Malika Abduvafoyeva' : 'Малика Абдувафоева',
      phone: '+998 93 505 11 22',
      amount: locale === 'uz' ? "550 000 so'm" : '550 000 сум',
      status: t.statusPending,
      statusBg: BRAND.colors.warningSoft,
      statusColor: BRAND.colors.warning,
      initials: 'MA',
    },
    {
      name: locale === 'uz' ? 'Jasur Jumayev' : 'Жасур Жумаев',
      phone: '+998 91 777 88 99',
      amount: locale === 'uz' ? "2 100 000 so'm" : '2 100 000 сум',
      status: t.statusPaid,
      statusBg: BRAND.colors.accentSoft,
      statusColor: BRAND.colors.accent,
      initials: 'JJ',
    },
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* App Header */}
      <div
        style={{
          padding: '14px 24px',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${BRAND.colors.border}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Img
            src={staticFile('common/logo.png')}
            style={{ width: 40, height: 40, borderRadius: 10 }}
          />
          <span style={{ fontSize: 22, fontWeight: 800, color: BRAND.colors.textPrimary }}>
            {t.appName}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <Search size={24} color={BRAND.colors.textSecondary} />
          <Bell size={24} color={BRAND.colors.textSecondary} />
        </div>
      </div>

      {/* Scrollable Body */}
      <div style={{ flex: 1, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Blue Total Summary Card */}
        <div
          style={{
            borderRadius: 24,
            padding: '22px 24px',
            background: 'linear-gradient(135deg, #1A56DB 0%, #2563EB 60%, #1D4ED8 100%)',
            color: '#FFFFFF',
            boxShadow: '0 16px 32px rgba(26, 86, 219, 0.28)',
            transform: `scale(${interpolate(cardPop, [0, 1], [0.95, 1])})`,
            opacity: cardPop,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, fontWeight: 700, opacity: 0.85, letterSpacing: 0.6 }}>
              {t.totalDebtLabel}
            </span>
            <span
              style={{
                padding: '6px 12px',
                borderRadius: 999,
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {t.activeCustomers}
            </span>
          </div>

          <div style={{ fontSize: 38, fontWeight: 800, marginTop: 10, letterSpacing: -0.8 }}>
            {t.totalDebtAmount}
          </div>

          <div
            style={{
              marginTop: 18,
              paddingTop: 14,
              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: 13, opacity: 0.8 }}>{t.addedToday}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#FCA5A5', marginTop: 3 }}>
                {t.addedTodayValue}
              </div>
            </div>
            <div style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.2)' }} />
            <div>
              <div style={{ fontSize: 13, opacity: 0.8 }}>{t.collectedToday}</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#86EFAC', marginTop: 3 }}>
                {t.collectedTodayValue}
              </div>
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#E8EEF7',
            borderRadius: 16,
            padding: 5,
            gap: 6,
          }}
        >
          {[t.tabAll, t.tabActive, t.tabPaid].map((label, idx) => (
            <div
              key={label}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '10px 0',
                borderRadius: 12,
                backgroundColor: idx === 0 ? '#FFFFFF' : 'transparent',
                color: idx === 0 ? BRAND.colors.primary : BRAND.colors.textSecondary,
                fontSize: 16,
                fontWeight: 700,
                boxShadow: idx === 0 ? '0 3px 8px rgba(15,23,42,0.06)' : 'none',
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Customer cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {customers.map((c, idx) => {
            const rowPop = spring({
              frame: frame - 14 - idx * 8,
              fps,
              config: { damping: 16 },
            });
            return (
              <div
                key={c.name}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 20,
                  padding: '16px 18px',
                  boxShadow: '0 6px 18px rgba(15, 23, 42, 0.05)',
                  transform: `translateY(${interpolate(rowPop, [0, 1], [18, 0])}px)`,
                  opacity: rowPop,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        backgroundColor: '#DBEAFE',
                        color: BRAND.colors.primary,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 16,
                        fontWeight: 800,
                      }}
                    >
                      {c.initials}
                    </div>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: BRAND.colors.textPrimary }}>
                        {c.name}
                      </div>
                      <div style={{ fontSize: 14, color: BRAND.colors.textMuted, marginTop: 2 }}>
                        {c.phone}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        borderRadius: 8,
                        backgroundColor: c.statusBg,
                        color: c.statusColor,
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {c.status}
                    </span>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: BRAND.colors.primary,
                        marginTop: 5,
                      }}
                    >
                      {c.amount}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 12,
                    paddingTop: 10,
                    borderTop: `1px solid ${BRAND.colors.surfaceMuted}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 600, color: BRAND.colors.accent }}>
                    ● {t.smsSent}
                  </span>
                  <span
                    style={{
                      padding: '5px 14px',
                      borderRadius: 10,
                      backgroundColor: '#EFF6FF',
                      color: BRAND.colors.primary,
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {t.detailsBtn}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating + Add Debt Button */}
      <div
        style={{
          position: 'absolute',
          right: 22,
          bottom: 102,
          padding: '15px 24px',
          borderRadius: 999,
          backgroundColor: BRAND.colors.primary,
          color: '#FFFFFF',
          fontSize: 18,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          boxShadow: '0 14px 28px rgba(26, 86, 219, 0.40)',
        }}
      >
        <Plus size={22} />
        {t.addDebtFab}
      </div>

      <TapIndicator x={470} y={985} startFrame={58} color={BRAND.colors.primary} />

      <BottomNav active="home" locale={locale} />
    </div>
  );
};

/* ==================== SCENE 3: ADD DEBT ==================== */
export const AddDebtScreen: React.FC<DemoScreenProps> = ({ locale }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = UI_TEXTS[locale];

  const typedNameLen = Math.floor(
    interpolate(frame, [10, 48], [0, t.nameSample.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  const toggleOn = spring({ frame: frame - 55, fps, config: { damping: 14, stiffness: 160 } });

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF' }}>
      {/* Header */}
      <div
        style={{
          padding: '16px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          borderBottom: `1px solid ${BRAND.colors.border}`,
        }}
      >
        <ArrowLeft size={26} color={BRAND.colors.textPrimary} />
        <span style={{ fontSize: 22, fontWeight: 800, color: BRAND.colors.textPrimary }}>
          {t.addDebtHeader}
        </span>
      </div>

      <div style={{ flex: 1, padding: '26px 26px 28px', display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: BRAND.colors.textSecondary, letterSpacing: 0.8 }}>
          {t.sectionCustomer}
        </div>

        {/* Phone input */}
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: BRAND.colors.textPrimary, marginBottom: 8 }}>
            {t.phoneLabel}
          </div>
          <div
            style={{
              height: 62,
              borderRadius: 16,
              border: `1.8px solid ${BRAND.colors.border}`,
              padding: '0 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 20,
              fontWeight: 600,
              color: BRAND.colors.textPrimary,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Phone size={20} color={BRAND.colors.textMuted} />
              +998 90 123 45 67
            </div>
            <UserPlus size={22} color={BRAND.colors.primary} />
          </div>
        </div>

        {/* Name input */}
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: BRAND.colors.textPrimary, marginBottom: 8 }}>
            {t.nameLabel}
          </div>
          <div
            style={{
              height: 62,
              borderRadius: 16,
              border: `2px solid ${BRAND.colors.primary}`,
              backgroundColor: '#F8FBFF',
              padding: '0 18px',
              display: 'flex',
              alignItems: 'center',
              fontSize: 20,
              fontWeight: 700,
              color: BRAND.colors.textPrimary,
            }}
          >
            {t.nameSample.slice(0, typedNameLen)}
          </div>
        </div>

        <div
          style={{
            marginTop: 8,
            fontSize: 14,
            fontWeight: 800,
            color: BRAND.colors.textSecondary,
            letterSpacing: 0.8,
          }}
        >
          {t.sectionDebt}
        </div>

        {/* Amount input */}
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: BRAND.colors.textPrimary, marginBottom: 8 }}>
            {t.amountLabel}
          </div>
          <div
            style={{
              height: 66,
              borderRadius: 16,
              border: `1.8px solid ${BRAND.colors.border}`,
              padding: '0 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 26,
              fontWeight: 800,
              color: BRAND.colors.primary,
            }}
          >
            <span>{t.amountSample}</span>
            <span style={{ fontSize: 18, fontWeight: 700, color: BRAND.colors.textMuted }}>
              {t.currency}
            </span>
          </div>
        </div>

        {/* Due date */}
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: BRAND.colors.textPrimary, marginBottom: 8 }}>
            {t.dueDateLabel}
          </div>
          <div
            style={{
              height: 62,
              borderRadius: 16,
              border: `1.8px solid ${BRAND.colors.border}`,
              padding: '0 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 19,
              fontWeight: 600,
              color: BRAND.colors.textPrimary,
            }}
          >
            <span>{t.dueDateSample}</span>
            <Calendar size={22} color={BRAND.colors.primary} />
          </div>
        </div>

        {/* SMS Reminder Switch */}
        <div
          style={{
            marginTop: 4,
            padding: '16px 18px',
            borderRadius: 18,
            backgroundColor: '#F4F8FF',
            border: `1.5px solid ${BRAND.colors.primarySoft}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 14,
          }}
        >
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: BRAND.colors.textPrimary }}>
              {t.smsToggleTitle}
            </div>
            <div style={{ fontSize: 14, color: BRAND.colors.textSecondary, marginTop: 3 }}>
              {t.smsToggleSub}
            </div>
          </div>
          <div
            style={{
              width: 62,
              height: 36,
              borderRadius: 999,
              backgroundColor: toggleOn > 0.5 ? BRAND.colors.primary : '#CBD5E1',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                transform: `translateX(${interpolate(toggleOn, [0, 1], [0, 26])}px)`,
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              }}
            />
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* Save button */}
        <div
          style={{
            height: 66,
            borderRadius: 18,
            backgroundColor: BRAND.colors.primary,
            color: '#FFFFFF',
            fontSize: 21,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            boxShadow: '0 14px 28px rgba(26, 86, 219, 0.34)',
          }}
        >
          <Check size={24} />
          {t.saveBtn}
        </div>
      </div>

      <TapIndicator x={295} y={1035} startFrame={82} color={BRAND.colors.primary} />
    </div>
  );
};

/* ==================== SCENE 4: SMS & PAYMENT ==================== */
export const SmsAndPaymentScreen: React.FC<DemoScreenProps> = ({ locale }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = UI_TEXTS[locale];

  const smsSlide = spring({ frame: frame - 26, fps, config: { damping: 15, stiffness: 120 } });
  const paySlide = spring({ frame: frame - 58, fps, config: { damping: 15, stiffness: 120 } });

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '22px 24px', gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <ArrowLeft size={26} color={BRAND.colors.textPrimary} />
        <span style={{ fontSize: 22, fontWeight: 800, color: BRAND.colors.textPrimary }}>
          {t.debtDetailHeader}
        </span>
      </div>

      {/* Balance Card */}
      <div
        style={{
          borderRadius: 26,
          padding: 26,
          background: `linear-gradient(135deg, ${BRAND.colors.navy} 0%, ${BRAND.colors.primary} 100%)`,
          color: '#FFFFFF',
          boxShadow: '0 18px 36px rgba(18, 53, 91, 0.25)',
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 700 }}>{t.nameSample}</div>
        <div style={{ fontSize: 15, opacity: 0.78, marginTop: 14 }}>{t.remainingLabel}</div>
        <div style={{ fontSize: 40, fontWeight: 800, marginTop: 4 }}>{t.remainingValue}</div>
        <div
          style={{
            marginTop: 16,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 16px',
            borderRadius: 999,
            backgroundColor: 'rgba(34, 197, 94, 0.24)',
            color: '#86EFAC',
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          <CheckCircle2 size={18} />
          {t.paidChip}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 14 }}>
        <div
          style={{
            flex: 1,
            height: 62,
            borderRadius: 18,
            backgroundColor: '#FFFFFF',
            border: `2px solid ${BRAND.colors.primary}`,
            color: BRAND.colors.primary,
            fontSize: 17,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 9,
          }}
        >
          <Bell size={20} />
          {t.sendSmsBtn}
        </div>
        <div
          style={{
            flex: 1,
            height: 62,
            borderRadius: 18,
            backgroundColor: BRAND.colors.accent,
            color: '#FFFFFF',
            fontSize: 17,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 9,
            boxShadow: '0 12px 24px rgba(22, 163, 74, 0.28)',
          }}
        >
          <Check size={20} />
          {t.addPaymentBtn}
        </div>
      </div>

      {/* Live SMS Preview Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 22,
          padding: 22,
          border: `2px solid ${BRAND.colors.accentLight}`,
          boxShadow: '0 14px 30px rgba(22, 163, 74, 0.14)',
          transform: `translateY(${interpolate(smsSlide, [0, 1], [28, 0])}px)`,
          opacity: smsSlide,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 15,
            fontWeight: 800,
            color: BRAND.colors.accent,
            marginBottom: 10,
          }}
        >
          <MessageSquare size={18} />
          {t.smsCardHeader}
        </div>
        <div style={{ fontSize: 18, lineHeight: 1.45, color: BRAND.colors.textPrimary, fontWeight: 500 }}>
          {t.smsBody}
        </div>
      </div>

      {/* Payment Confirmation Entry */}
      <div
        style={{
          transform: `translateY(${interpolate(paySlide, [0, 1], [24, 0])}px)`,
          opacity: paySlide,
        }}
      >
        <div style={{ fontSize: 15, fontWeight: 700, color: BRAND.colors.textSecondary, marginBottom: 10 }}>
          {t.paymentHistoryTitle}
        </div>
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 8px 20px rgba(15, 23, 42, 0.05)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                backgroundColor: BRAND.colors.accentSoft,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Check size={24} color={BRAND.colors.accent} />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: BRAND.colors.textPrimary }}>
                {t.paymentEntryTitle}
              </div>
              <div style={{ fontSize: 14, color: BRAND.colors.textMuted, marginTop: 2 }}>
                {t.paymentEntryDate}
              </div>
            </div>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: BRAND.colors.accent }}>
            {t.paymentEntryAmount}
          </span>
        </div>
      </div>

      <TapIndicator x={155} y={335} startFrame={14} color={BRAND.colors.primary} />
    </div>
  );
};

/* ==================== SCENE 5: STATISTICS ==================== */
export const StatisticsScreen: React.FC<DemoScreenProps> = ({ locale }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = UI_TEXTS[locale];

  const bars = [
    { given: 58, paid: 46 },
    { given: 70, paid: 54 },
    { given: 62, paid: 52 },
    { given: 82, paid: 68 },
    { given: 76, paid: 66 },
    { given: 94, paid: 80 },
  ];

  const rateProgress = interpolate(frame, [15, 65], [0, 74], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          padding: '16px 24px',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${BRAND.colors.border}`,
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 800, color: BRAND.colors.textPrimary }}>
          {t.statsHeader}
        </span>
        <span
          style={{
            padding: '7px 14px',
            borderRadius: 12,
            backgroundColor: BRAND.colors.primarySoft,
            color: BRAND.colors.primary,
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          {t.statsPeriod}
        </span>
      </div>

      <div style={{ flex: 1, padding: '22px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* KPI Cards */}
        <div style={{ display: 'flex', gap: 14 }}>
          <div
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              borderRadius: 22,
              padding: 20,
              boxShadow: '0 8px 22px rgba(15, 23, 42, 0.05)',
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 600, color: BRAND.colors.textSecondary }}>
              {t.givenLabel}
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: BRAND.colors.primary, marginTop: 10 }}>
              {t.givenValue}
            </div>
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              borderRadius: 22,
              padding: 20,
              boxShadow: '0 8px 22px rgba(15, 23, 42, 0.05)',
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 600, color: BRAND.colors.textSecondary }}>
              {t.returnedLabel}
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: BRAND.colors.accent, marginTop: 10 }}>
              {t.returnedValue}
            </div>
          </div>
        </div>

        {/* Bar Chart Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 24,
            padding: 24,
            boxShadow: '0 8px 22px rgba(15, 23, 42, 0.05)',
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 800, color: BRAND.colors.textPrimary, marginBottom: 24 }}>
            {t.chartTitle}
          </div>
          <div
            style={{
              height: 280,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              padding: '0 10px',
              gap: 14,
            }}
          >
            {bars.map((bar, idx) => {
              const grow = spring({
                frame: frame - 8 - idx * 6,
                fps,
                config: { damping: 16, stiffness: 100 },
              });
              return (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 10,
                    height: '100%',
                    justifyContent: 'flex-end',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 230 }}>
                    <div
                      style={{
                        width: 22,
                        height: `${bar.given * grow}%`,
                        borderRadius: '8px 8px 4px 4px',
                        backgroundColor: BRAND.colors.primary,
                      }}
                    />
                    <div
                      style={{
                        width: 22,
                        height: `${bar.paid * grow}%`,
                        borderRadius: '8px 8px 4px 4px',
                        backgroundColor: BRAND.colors.accent,
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: BRAND.colors.textMuted }}>
                    {t.months[idx]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Collection rate */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 22,
            padding: 22,
            boxShadow: '0 8px 22px rgba(15, 23, 42, 0.05)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: BRAND.colors.textPrimary }}>
              {t.collectionRate}
            </span>
            <span style={{ fontSize: 26, fontWeight: 800, color: BRAND.colors.accent }}>
              {Math.round(rateProgress)}%
            </span>
          </div>
          <div
            style={{
              marginTop: 14,
              height: 14,
              borderRadius: 999,
              backgroundColor: '#E2E8F0',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${rateProgress}%`,
                height: '100%',
                borderRadius: 999,
                background: `linear-gradient(90deg, ${BRAND.colors.primary} 0%, ${BRAND.colors.accent} 100%)`,
              }}
            />
          </div>
        </div>
      </div>

      <BottomNav active="stats" locale={locale} />
    </div>
  );
};

/* ==================== SCENE 6: OUTRO / CTA ==================== */
export const OutroAppScreen: React.FC<DemoScreenProps> = ({ locale }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = UI_TEXTS[locale];

  const pop = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const nextPop = spring({ frame: frame - 18, fps, config: { damping: 16 } });

  return (
    <div
      style={{
        flex: 1,
        background: 'linear-gradient(180deg, #F8FBFF 0%, #E8F1FD 100%)',
        padding: '64px 32px 42px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: 38,
            backgroundColor: '#FFFFFF',
            overflow: 'hidden',
            boxShadow: '0 24px 50px rgba(26, 86, 219, 0.24)',
            transform: `scale(${interpolate(pop, [0, 1], [0.78, 1])})`,
            opacity: pop,
            marginBottom: 28,
          }}
        >
          <Img
            src={staticFile('common/logo.png')}
            style={{ width: '100%', height: '100%', transform: 'scale(1.42)', objectFit: 'contain' }}
          />
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: 36,
            fontWeight: 800,
            color: BRAND.colors.navy,
            letterSpacing: -0.7,
          }}
        >
          {t.outroTitle}
        </h2>

        <p
          style={{
            margin: '16px 0 32px',
            fontSize: 19,
            lineHeight: 1.45,
            color: BRAND.colors.textSecondary,
          }}
        >
          {t.outroSub}
        </p>

        <div
          style={{
            padding: '18px 34px',
            borderRadius: 20,
            background: `linear-gradient(135deg, ${BRAND.colors.accent} 0%, ${BRAND.colors.accentLight} 100%)`,
            color: '#FFFFFF',
            fontSize: 21,
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 16px 32px rgba(22, 163, 74, 0.34)',
          }}
        >
          <ShieldCheck size={24} />
          {t.playStoreLabel}
        </div>
      </div>

      {/* Next lesson card */}
      <div
        style={{
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: 24,
          padding: '22px 24px',
          textAlign: 'left',
          boxShadow: '0 12px 28px rgba(18, 53, 91, 0.08)',
          border: `1.5px solid ${BRAND.colors.primarySoft}`,
          transform: `translateY(${interpolate(nextPop, [0, 1], [24, 0])}px)`,
          opacity: nextPop,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 13,
            fontWeight: 800,
            color: BRAND.colors.primary,
            letterSpacing: 0.8,
            marginBottom: 8,
          }}
        >
          <Sparkles size={16} />
          {t.nextLessonLabel}
        </div>
        <div style={{ fontSize: 19, fontWeight: 700, color: BRAND.colors.navy, lineHeight: 1.35 }}>
          {t.nextLessonTitle}
        </div>
      </div>
    </div>
  );
};
