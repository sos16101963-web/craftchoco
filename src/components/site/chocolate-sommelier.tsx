"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Heart,
  Briefcase,
  Users,
  Coffee,
  Flame,
  Award,
  Sun,
  Layers,
  ShoppingBag,
  Send,
  MessageCircle,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  Gift,
} from "lucide-react";
import { catalogFor, formatProductPrice, type Product } from "@/lib/products";
import { productPath } from "@/lib/slugs";
import { useCart } from "@/store/cart";
import { toast } from "sonner";
import { trackIntent } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type RecipientKey = "woman" | "man" | "parents" | "colleague" | "self";
type EmotionKey = "wow" | "gourmet" | "warmth" | "status";
type TasteKey = "all" | "fruits" | "dark" | "milky";
type BudgetKey = "any" | "under250" | "250to400" | "above400";

interface RecipientOption {
  key: RecipientKey;
  labelUk: string;
  labelRu: string;
  icon: typeof Heart;
  descUk: string;
  descRu: string;
}

interface EmotionOption {
  key: EmotionKey;
  labelUk: string;
  labelRu: string;
  icon: typeof Sparkles;
  descUk: string;
  descRu: string;
}

interface TasteOption {
  key: TasteKey;
  labelUk: string;
  labelRu: string;
  descUk: string;
  descRu: string;
}

interface BudgetOption {
  key: BudgetKey;
  labelUk: string;
  labelRu: string;
  descUk: string;
  descRu: string;
}

const RECIPIENTS: RecipientOption[] = [
  {
    key: "woman",
    labelUk: "Коханій / Дівчині",
    labelRu: "Любимой / Девушке",
    icon: Heart,
    descUk: "Романтика, естетика та ніжні почуття",
    descRu: "Романтика, эстетика и нежные чувства",
  },
  {
    key: "man",
    labelUk: "Чоловіку / Хлопцю",
    labelRu: "Мужчине / Парню",
    icon: Briefcase,
    descUk: "Стриманий стиль, виразні смаки",
    descRu: "Сдержанный стиль, выразительные вкусы",
  },
  {
    key: "parents",
    labelUk: "Мамі / Родині",
    labelRu: "Маме / Семье",
    icon: Users,
    descUk: "Тепло, турбота, частування для всіх",
    descRu: "Тепло, забота, угощение для всех",
  },
  {
    key: "colleague",
    labelUk: "Колезі / Керівнику",
    labelRu: "Коллеге / Шефу",
    icon: Award,
    descUk: "Діловий презент, знак високої поваги",
    descRu: "Деловой презент, знак уважения",
  },
  {
    key: "self",
    labelUk: "Собі для настрою",
    labelRu: "Себе для души",
    icon: Coffee,
    descUk: "Особистий момент затишку та насолоди",
    descRu: "Личный момент уюта и удовольствия",
  },
];

const EMOTIONS: EmotionOption[] = [
  {
    key: "wow",
    labelUk: "Естетичний Вау-ефект",
    labelRu: "Эстетический Вау-эффект",
    icon: Sparkles,
    descUk: "Шоколадні квіти, скульптури, живий мармур",
    descRu: "Шоколадные цветы, скульптуры, живой мрамор",
  },
  {
    key: "gourmet",
    labelUk: "Гастрономічне відкриття",
    labelRu: "Гастро-открытие",
    icon: Flame,
    descUk: "Маракуйя, лайм, лісові ягоди та ганаші",
    descRu: "Маракуйя, лайм, лесные ягоды и ганаши",
  },
  {
    key: "warmth",
    labelUk: "Затишок & Ніжність",
    labelRu: "Уют & Нежность",
    icon: Sun,
    descUk: "Вершковий молочний шоколад, горіхи, спокій",
    descRu: "Сливочный молочный шоколад, орехи, покой",
  },
  {
    key: "status",
    labelUk: "Солідний статус",
    labelRu: "Солидный статус",
    icon: Award,
    descUk: "Шляхетний темний Callebaut 70%, витонченість",
    descRu: "Благородный тёмный Callebaut 70%, изящество",
  },
];

const TASTES: TasteOption[] = [
  {
    key: "all",
    labelUk: "Асорті (всі смаки)",
    labelRu: "Ассорти (все вкусы)",
    descUk: "Гармонія чорного, молочного та білого",
    descRu: "Гармония тёмного, молочного и белого",
  },
  {
    key: "fruits",
    labelUk: "Ягоди & Тропіки",
    labelRu: "Ягоды & Тропики",
    descUk: "Яскрава кислинка маракуйї, малини, цитрусу",
    descRu: "Яркая кислинка маракуйи, малины, цитруса",
  },
  {
    key: "dark",
    labelUk: "Екстра-чорний 70%",
    labelRu: "Экстра-тёмный 70%",
    descUk: "Глибока какао-гірчинка, трюфелі Callebaut",
    descRu: "Глубокая какао-горчинка, трюфели Callebaut",
  },
  {
    key: "milky",
    labelUk: "Молочний & Горіхи",
    labelRu: "Молочный & Орехи",
    descUk: "М'який вершковий смак, карамель, хруст",
    descRu: "Мягкий сливочный вкус, карамель, хруст",
  },
];

const BUDGETS: BudgetOption[] = [
  {
    key: "any",
    labelUk: "Будь-який",
    labelRu: "Любой",
    descUk: "Показати найкраще за враженням",
    descRu: "Показать лучшее по впечатлению",
  },
  {
    key: "under250",
    labelUk: "До 250 ₴",
    labelRu: "До 250 ₴",
    descUk: "Міні-компліменти, медіанти, плитки",
    descRu: "Мини-комплименты, медианты, плитки",
  },
  {
    key: "250to400",
    labelUk: "250 – 400 ₴",
    labelRu: "250 – 400 ₴",
    descUk: "Подарункові хіти на 6–12 цукерок",
    descRu: "Подарочные хиты на 6–12 конфет",
  },
  {
    key: "above400",
    labelUk: "Від 400 ₴",
    labelRu: "От 400 ₴",
    descUk: "Великі набори 16 шт, букети квітів",
    descRu: "Большие наборы 16 шт, букеты цветов",
  },
];

// Product traits scoring map
interface ProductTraits {
  recipients: Record<RecipientKey, number>;
  emotions: Record<EmotionKey, number>;
  tastes: Record<TasteKey, number>;
  sommelierNotesUk: Record<RecipientKey, string>;
  sommelierNotesRu: Record<RecipientKey, string>;
}

const PRODUCT_TRAITS: Record<string, ProductTraits> = {
  "flowers-six": {
    recipients: { woman: 100, parents: 75, colleague: 50, self: 30, man: 10 },
    emotions: { wow: 100, warmth: 80, status: 70, gourmet: 50 },
    tastes: { all: 80, milky: 90, fruits: 70, dark: 40 },
    sommelierNotesUk: {
      woman: "Неймовірний букет шоколадних троянд вражає миттєво: виглядає як живі квіти, але дарує справжній бельгійський шоколад замість в'янучого листя.",
      man: "Незвичайний візуальний презент, що демонструє майстерність кондитера.",
      parents: "Розкішне частування для мами, яке викличе щирі сльози радості та захвату.",
      colleague: "Вражаючий статусний комплімент для жінки-керівника або колеги.",
      self: "Справжнє свято естетики та натхнення на вашому столі.",
    },
    sommelierNotesRu: {
      woman: "Потрясающий букет шоколадных роз поражает мгновенно: выглядит как живые цветы, но дарит бельгийский шоколад вместо увядающих лепестков.",
      man: "Необычный визуальный презент, демонстрирующий мастерство кондитера.",
      parents: "Роскошное угощение для мамы, которое вызовет искренние слёзы радости и восторга.",
      colleague: "Впечатляющий статусный комплимент для женщины-руководителя или коллеги.",
      self: "Настоящий праздник эстетики и вдохновения на вашем столе.",
    },
  },
  "roses-marble": {
    recipients: { woman: 95, parents: 80, colleague: 60, self: 50, man: 15 },
    emotions: { wow: 95, warmth: 90, status: 60, gourmet: 65 },
    tastes: { all: 85, milky: 95, fruits: 60, dark: 45 },
    sommelierNotesUk: {
      woman: "Ніжні мармурові троянди з витонченим сяйвом какао-масла — промовистий жест любові без зайвих слів.",
      man: "Символічний красивий комплімент високої кондитерської якості.",
      parents: "Зворушливий подарунок з теплим посилом безмежної турботи.",
      colleague: "Витончений естетичний жест вдячності.",
      self: "Естетична насолода, щоб порадувати себе у затишний вечір.",
    },
    sommelierNotesRu: {
      woman: "Нежные мраморные розы с утончённым сиянием какао-масла — красноречивый жест любви без лишних слов.",
      man: "Символичный красивый комплимент высокого кондитерского качества.",
      parents: "Трогательный подарок с тёплым посылом безграничной заботы.",
      colleague: "Изящный эстетичный жест благодарности.",
      self: "Эстетическое удовольствие, чтобы порадовать себя в уютный вечер.",
    },
  },
  "flowers-four": {
    recipients: { woman: 90, parents: 85, colleague: 70, self: 60, man: 20 },
    emotions: { wow: 90, warmth: 85, status: 75, gourmet: 60 },
    tastes: { all: 80, milky: 90, fruits: 70, dark: 50 },
    sommelierNotesUk: {
      woman: "Гармонійна четвірка реалістичних квітів — розкішний комплімент від щирого серця.",
      man: "Акуратний крафтовий презент з бездоганним смаком.",
      parents: "Зворушлива увага до найрідніших людей.",
      colleague: "Стриманий та витончений подарунок у святковій коробці.",
      self: "Солодка естетична пауза посеред насиченого робочого тижня.",
    },
    sommelierNotesRu: {
      woman: "Гармоничная четвёрка реалистичных цветов — роскошный комплимент от чистого сердца.",
      man: "Аккуратный крафтовый презент с безупречным вкусом.",
      parents: "Трогательное внимание к самым родным людям.",
      colleague: "Сдержанный и утончённый подарок в праздничной коробке.",
      self: "Сладкая эстетическая пауза посреди насыщенной рабочей недели.",
    },
  },
  "set-sixteen": {
    recipients: { woman: 90, man: 85, colleague: 95, parents: 90, self: 70 },
    emotions: { status: 100, gourmet: 95, wow: 85, warmth: 80 },
    tastes: { all: 95, fruits: 95, dark: 80, milky: 80 },
    sommelierNotesUk: {
      woman: "Флагманський набір: 16 конфет ручного розпису з 4 різними фруктовими ганашами. Дарує відчуття справжнього королівського свята.",
      man: "Солідний масштаб і багата гама смаків — подарунок, що виглядає переконливо та дорого.",
      parents: "Великий сімейний бокс, де кожен знайде свій улюблений смак: від освіжаючого лайма до оксамитової малини.",
      colleague: "Ідеальний вибір для керівника або ключового партнера: бездоганний бізнес-етикет та найвища оцінка смаку.",
      self: "Колекція шедеврів ручної роботи для тих, хто цінує найвищий рівень кондитерського мистецтва.",
    },
    sommelierNotesRu: {
      woman: "Флагманский набор: 16 конфет ручной росписи с 4 фруктовыми ганашами. Дарит ощущение настоящего королевского праздника.",
      man: "Солидный масштаб и богатая гамма вкусов — подарок, который выглядит убедительно и дорого.",
      parents: "Большой семейный бокс, где каждый найдёт свой любимый вкус: от освежающего лайма до бархатной малины.",
      colleague: "Идеальный выбор для руководителя или ключевого партнера: безупречный бизнес-этикет и высшая проба качества.",
      self: "Коллекция шедевров ручной работы для тех, кто ценит наивысший уровень кондитерского искусства.",
    },
  },
  "set-twelve": {
    recipients: { woman: 95, man: 70, parents: 85, colleague: 75, self: 65 },
    emotions: { warmth: 95, wow: 90, gourmet: 85, status: 80 },
    tastes: { all: 90, fruits: 90, milky: 85, dark: 70 },
    sommelierNotesUk: {
      woman: "Справжня романтична симфонія: шоколадні троянди, серця та вибухові фруктові ганаші з маракуйї та лісових ягід.",
      man: "Витончений набір з насиченими гастрономічними акцентами.",
      parents: "Зворушливе визнання у теплих почуттях, оформлене з особливою ніжністю.",
      colleague: "Елегантний подарунок, що запам'ятовується своїм делікатним виконанням.",
      self: "12 приводів посміхнутися під час ранкової кави.",
    },
    sommelierNotesRu: {
      woman: "Настоящая романтическая симфония: шоколадные розы, сердца и взрывные фруктовые ганаши из маракуйи и лесных ягод.",
      man: "Утончённый набор с насыщенными гастрономическими акцентами.",
      parents: "Трогательное признание в тёплых чувствах, оформленное с особой нежностью.",
      colleague: "Элегантный подарок, запоминающийся деликатным исполнением.",
      self: "12 поводов улыбнуться за утренней чашкой кофе.",
    },
  },
  "set-combo": {
    recipients: { woman: 80, man: 85, parents: 95, colleague: 80, self: 85 },
    emotions: { warmth: 95, gourmet: 85, wow: 75, status: 80 },
    tastes: { all: 95, milky: 90, fruits: 80, dark: 85 },
    sommelierNotesUk: {
      woman: "Подвійне задоволення: і ніжні корпусні цукерки з ганашами, і велика плитка ремісничого шоколаду з ягодами.",
      man: "Ситний та щедрий формат: 9 цукерок + шоколадна плитка відмінно підійдуть до чаю або міцної кави.",
      parents: "Найкращий набір до родинного чаювання: вистачить кожному, щоб спробувати різні текстури Callebaut.",
      colleague: "Універсальний, багатий презентаційний набір без переплат.",
      self: "Ідеальний дует: цукерки на десерт зараз, плитка — для приємних перерв протягом тижня.",
    },
    sommelierNotesRu: {
      woman: "Двойное удовольствие: и нежные корпусные конфеты с ганашами, и большая плитка крафтового шоколада с ягодами.",
      man: "Сытный и щедрый формат: 9 конфет + шоколадная плитка отлично подойдут к чаю или крепкому кофе.",
      parents: "Лучший набор к семейному чаепитию: хватит каждому, чтобы оценить разные текстуры Callebaut.",
      colleague: "Универсальный, богатый презентационный набор без переплат.",
      self: "Идеальный дуэт: конфеты на десерт сейчас, плитка — для приятных пауз в течение недели.",
    },
  },
  "bars-fruit": {
    recipients: { man: 95, colleague: 90, woman: 75, self: 90, parents: 80 },
    emotions: { status: 95, gourmet: 95, warmth: 75, wow: 80 },
    tastes: { dark: 95, all: 85, fruits: 75, milky: 65 },
    sommelierNotesUk: {
      man: "Мужній та виразний вибір: 10 шоколадних брусків з благородним какао та сублімованими фруктами. Справжній релакс після робочого дня.",
      woman: "Стильний мінімалізм для дівчини, яка віддає перевагу натуральному чистому шоколаду без приторності.",
      colleague: "Лаконічний, респектабельний презент для чоловіка-колеги або керівника.",
      parents: "Багатий запас корисного натурального шоколаду на якісному какао-маслі.",
      self: "Кращий компаньйон до улюбленого еспресо або вечірньої книжки.",
    },
    sommelierNotesRu: {
      man: "Мужественный и выразительный выбор: 10 шоколадных брусков с благородным какао и сублимированными фруктами. Настоящий релакс после рабочего дня.",
      woman: "Стильный минимализм для девушки, предпочитающей натуральный чистый шоколад без приторности.",
      colleague: "Лаконичный, респектабельный презент для мужчины-коллеги или руководителя.",
      parents: "Богатый запас полезного натурального шоколада на качественном какао-масле.",
      self: "Лучший компаньон к любимому эспрессо или вечерней книге.",
    },
  },
  "art-bars": {
    recipients: { man: 90, colleague: 85, woman: 80, self: 85, parents: 70 },
    emotions: { status: 90, gourmet: 90, wow: 85, warmth: 70 },
    tastes: { dark: 90, all: 85, milky: 75, fruits: 70 },
    sommelierNotesUk: {
      man: "Геометричний дизайн, щільна текстура та чистий смак бельгійського какао-бобу. Жодного зайвого цукру.",
      woman: "Сучасне арт-виконання плиток — для поціновувачів естетичної гастрономії.",
      colleague: "Стриманий, стильний жест високого смаку.",
      parents: "Класичний бельгійський шоколад преміум-класу.",
      self: "Витончене частування, яке піднімає настрій після робочих завдань.",
    },
    sommelierNotesRu: {
      man: "Геометричный дизайн, плотная текстура и чистый вкус бельгийского какао-боба. Никакого лишнего сахара.",
      woman: "Современное арт-исполнение плиток — для ценителей эстетической гастрономии.",
      colleague: "Сдержанный, стильный жест высокого вкуса.",
      parents: "Классический бельгийский шоколад премиум-класса.",
      self: "Утончённое угощение, поднимающее настроение после рабочих задач.",
    },
  },
  "wishes-bars": {
    recipients: { colleague: 90, parents: 85, woman: 80, man: 80, self: 75 },
    emotions: { warmth: 95, status: 80, gourmet: 75, wow: 75 },
    tastes: { all: 90, milky: 85, dark: 80, fruits: 75 },
    sommelierNotesUk: {
      colleague: "Презент-побажання з теплими словами на кожному брусочку. Ідеально піднімає настрій у команді.",
      parents: "Душевні слова турботи у поєднанні з найніжнішим бельгійським шоколадом.",
      woman: "Зворушливий солодкий комплімент із щирим посилом.",
      man: "Приємний щоденний запас якісного крафтового шоколаду.",
      self: "Позитивний настрій до кожного ковтка кави.",
    },
    sommelierNotesRu: {
      colleague: "Презент-пожелание с тёплыми словами на каждом брусочке. Идеально поднимает настроение в команде.",
      parents: "Душевные слова заботы в сочетании с нежнейшим бельгийским шоколадом.",
      woman: "Трогательный сладкий комплимент с искренним посылом.",
      man: "Приятный ежедневный запас качественного крафтового шоколада.",
      self: "Позитивный заряд к каждому глотку кофе.",
    },
  },
  "mini-tiles": {
    recipients: { parents: 90, woman: 85, man: 80, colleague: 85, self: 80 },
    emotions: { warmth: 95, gourmet: 85, status: 75, wow: 70 },
    tastes: { all: 95, milky: 90, fruits: 80, dark: 75 },
    sommelierNotesUk: {
      parents: "«Розмова по душах»: затишне асорті міні-плиток з ягодами малини, фісташками та добірними горіхами.",
      woman: "Чарівна коробочка, повна затишку, відкриваючи яку відчуваєш справжню турботу.",
      man: "Зручний формат снеків до чаювання з натуральними горіховими добавками.",
      colleague: "Приємний, ненав'язливий та дуже смачний знак поваги.",
      self: "Ідеальний компаньйон для вечірніх розмов або серіалу.",
    },
    sommelierNotesRu: {
      parents: "«Разговор по душам»: уютное ассорти мини-плиток с ягодами малины, фисташками и отборными орехами.",
      woman: "Очаровательная коробочка, полная уюта, открывая которую чувствуешь настоящую заботу.",
      man: "Удобный формат снеков к чаепитию с натуральными ореховыми добавками.",
      colleague: "Приятный, ненавязчивый и очень вкусный знак уважения.",
      self: "Идеальный компаньон для душевных вечерних бесед или сериала.",
    },
  },
  "set-six": {
    recipients: { woman: 90, self: 85, colleague: 80, man: 75, parents: 75 },
    emotions: { warmth: 90, wow: 85, gourmet: 85, status: 70 },
    tastes: { all: 90, fruits: 90, milky: 85, dark: 70 },
    sommelierNotesUk: {
      woman: "Компактний хіт «Перше побачення»: 6 цукерок ручної роботи з яскравими начинками. Легкий та дуже зворушливий комплімент.",
      self: "Оптимальна порція насолоди для приємного вечора.",
      colleague: "Акуратний і свіжий подарунок колезі без зайвого пафосу.",
      man: "Делікатний смаковий презент з натуральними фруктовими нотами.",
      parents: "Милий жест любові, що зігріває душу.",
    },
    sommelierNotesRu: {
      woman: "Компактный хит «Первое свидание»: 6 конфет ручной работы с яркими начинками. Лёгкий и очень трогательный комплимент.",
      self: "Оптимальная порция удовольствия для приятного вечера.",
      colleague: "Аккуратный и свежий подарок коллеге без лишнего пафоса.",
      man: "Деликатный вкусовой презент с натуральными фруктовыми нотами.",
      parents: "Милый жест любви, согревающий душу.",
    },
  },
  "set-four": {
    recipients: { self: 95, colleague: 85, woman: 80, man: 75, parents: 75 },
    emotions: { warmth: 85, gourmet: 80, wow: 75, status: 65 },
    tastes: { all: 85, fruits: 85, milky: 80, dark: 75 },
    sommelierNotesUk: {
      self: "«Чотири настрої»: найдоступніший спосіб познайомитися з фірмовими начинками майстерні за чесну ціну.",
      colleague: "Швидкий та смачний знак уваги до будь-якої події.",
      woman: "Чарівний міні-комплімент, що гарантовано підніме настрій.",
      man: "Лаконічний десерт до чашки кави.",
      parents: "Маленький приємний сюрприз до повсякденного чаю.",
    },
    sommelierNotesRu: {
      self: "«Четыре настроения»: самый доступный способ познакомиться с фирменными начинками мастерской по честной цене.",
      colleague: "Быстрый и вкусный знак внимания к любому событию.",
      woman: "Очаровательный мини-комплимент, гарантированно поднимающий настроение.",
      man: "Лаконичный десерт к чашке кофе.",
      parents: "Маленький приятный сюрприз к повседневному чаю.",
    },
  },
  "mediants-friends": {
    recipients: { parents: 95, woman: 85, self: 80, colleague: 75, man: 65 },
    emotions: { warmth: 95, wow: 85, gourmet: 75, status: 60 },
    tastes: { milky: 95, all: 85, fruits: 80, dark: 60 },
    sommelierNotesUk: {
      parents: "«Маленькі друзі»: ніжні шоколадні медіанти з фігурками звірят та ягодами — улюбленець дітей та всієї родини.",
      woman: "Милі та неймовірно смачні шоколадні диски з хрусткими горішками та сублімованими ягодами.",
      self: "Ностальгічне частування, яке повертає у щасливе дитинство.",
      colleague: "Добрий та позитивний презент, який викликає щиру посмішку.",
      man: "Легкий та смачний десерт на справжньому какао-маслі.",
    },
    sommelierNotesRu: {
      parents: "«Маленькие друзья»: нежные шоколадные медианты с фигурками зверят и ягодами — любимец детей и всей семьи.",
      woman: "Милые и невероятно вкусные шоколадные диски с хрустящими орешками и сублимированными ягодами.",
      self: "Ностальгическое угощение, возвращающее в счастливое детство.",
      colleague: "Добрый и позитивный презент, вызывающий искреннюю улыбку.",
      man: "Лёгкий и вкусный десерт на настоящем какао-масле.",
    },
  },
  "mediants-four": {
    recipients: { parents: 90, self: 90, woman: 80, colleague: 80, man: 65 },
    emotions: { warmth: 90, wow: 80, gourmet: 70, status: 60 },
    tastes: { milky: 90, all: 85, fruits: 75, dark: 60 },
    sommelierNotesUk: {
      parents: "Корисні дитячі ласощі на бельгійському Callebaut без шкідливих домішок та пальмової олії.",
      self: "Компактний набір медіантів для швидкого солодкого перекусу.",
      colleague: "Милий комплімент для колеги з дитиною.",
      woman: "Ніжний та легкий шоколадний жест уваги.",
      man: "Якісний десерт з натуральними горішками.",
    },
    sommelierNotesRu: {
      parents: "Полезное детское лакомство на бельгийском Callebaut без вредных примесей и пальмового масла.",
      self: "Компактный набор медиантов для быстрого сладкого перекуса.",
      colleague: "Милый комплимент для коллеги с ребёнком.",
      woman: "Нежный и лёгкий шоколадный жест внимания.",
      man: "Качественный десерт с натуральными орешками.",
    },
  },
  "spheres-marble": {
    recipients: { woman: 90, self: 85, colleague: 80, parents: 75, man: 70 },
    emotions: { wow: 95, gourmet: 90, status: 80, warmth: 70 },
    tastes: { fruits: 90, all: 90, dark: 80, milky: 80 },
    sommelierNotesUk: {
      woman: "«Галактика бажань»: космічний мармуровий розпис сфер та незвичайні фруктові ганаші — знахідка для естеток та фото у соцмережах.",
      self: "Маленька галактика особистого натхнення на вашому столі.",
      colleague: "Оригінальний подарунок людині з творчим мисленням.",
      parents: "Незвичайне сучасне виконання класичного шоколаду.",
      man: "Футуристичний дизайн і висока якість темперування.",
    },
    sommelierNotesRu: {
      woman: "«Галактика желаний»: космическая мраморная роспись сфер и необычные фруктовые ганаши — находка для эстеток и ярких фото.",
      self: "Маленькая галактика личного вдохновения на вашем столе.",
      colleague: "Оригинальный подарок человеку с творческим мышлением.",
      parents: "Необычное современное исполнение классического шоколада.",
      man: "Футуристичный дизайн и высокое качество темперирования.",
    },
  },
  "envelope-gift": {
    recipients: { colleague: 95, parents: 90, woman: 85, man: 80, self: 75 },
    emotions: { warmth: 95, status: 85, wow: 75, gourmet: 75 },
    tastes: { all: 90, milky: 85, dark: 80, fruits: 75 },
    sommelierNotesUk: {
      colleague: "«Дякую, що ти є»: ідеальна форма вираження щирої вдячності партнеру, лікарю, вчителю чи наставнику.",
      parents: "Зворушливі слова, які батьки перечитуватимуть з теплотою у серці.",
      woman: "Ніжний та красномовний подарунок коханій дівчині.",
      man: "Стриманий та вишуканий жест подяки.",
      self: "Приємне нагадування про любов до себе.",
    },
    sommelierNotesRu: {
      colleague: "«Спасибо, что ты есть»: идеальная форма выражения искренней благодарности партнёру, врачу, учителю или наставнику.",
      parents: "Трогательные слова, которые родители будут перечитывать с теплотой в сердце.",
      woman: "Нежный и красноречивый подарок любимой девушке.",
      man: "Сдержанный и изысканный жест благодарности.",
      self: "Приятное напоминание о любви к себе.",
    },
  },
  "micro-tiles": {
    recipients: { self: 90, colleague: 85, man: 80, woman: 75, parents: 70 },
    emotions: { gourmet: 80, warmth: 75, status: 70, wow: 65 },
    tastes: { all: 85, dark: 85, milky: 80, fruits: 70 },
    sommelierNotesUk: {
      self: "Компактний набір брусочків із насиченим смаком — смачна підзарядка для продуктивного дня.",
      colleague: "Швидкий комплімент до професійного свята.",
      man: "Зручний кишеньковий формат справжнього бельгійського шоколаду.",
      woman: "Свіжий десерт для легкого кавування.",
      parents: "Приємний щоденний знак турботи.",
    },
    sommelierNotesRu: {
      self: "Компактный набор брусочков с насыщенным вкусом — вкусная подзарядка для продуктивного дня.",
      colleague: "Быстрый комплимент к профессиональному празднику.",
      man: "Удобный карманный формат настоящего бельгийского шоколада.",
      woman: "Свежий десерт для лёгкого кофепития.",
      parents: "Приятный ежедневный знак заботы.",
    },
  },
};

export function ChocolateSommelier({
  locale,
  initialRecipient = "woman",
  standalone = false,
}: {
  locale: Locale;
  initialRecipient?: RecipientKey;
  standalone?: boolean;
}) {
  const uk = locale === "uk";
  const [recipient, setRecipient] = useState<RecipientKey>(initialRecipient);
  const [emotion, setEmotion] = useState<EmotionKey>("wow");
  const [taste, setTaste] = useState<TasteKey>("all");
  const [budget, setBudget] = useState<BudgetKey>("any");

  const add = useCart((s) => s.add);
  const allProducts = useMemo(() => catalogFor(locale), [locale]);

  // Matching algorithm
  const recommendations = useMemo(() => {
    const scored = allProducts.map((p) => {
      const traits = PRODUCT_TRAITS[p.id];
      if (!traits) {
        return { product: p, score: 50, sommelierReason: p.character, matchBadge: "Хіт вибору" };
      }

      let score = 0;
      // 1. Recipient score (0 - 40 pts)
      score += (traits.recipients[recipient] || 50) * 0.4;

      // 2. Emotion score (0 - 30 pts)
      score += (traits.emotions[emotion] || 50) * 0.3;

      // 3. Taste score (0 - 20 pts)
      score += (traits.tastes[taste] || 60) * 0.2;

      // 4. Budget filter / boost (0 - 10 pts)
      let budgetMatch = true;
      if (budget === "under250") {
        budgetMatch = p.price <= 250;
      } else if (budget === "250to400") {
        budgetMatch = p.price >= 200 && p.price <= 400;
      } else if (budget === "above400") {
        budgetMatch = p.price >= 350;
      }

      if (budgetMatch) {
        score += 10;
      } else {
        score -= 25; // penalize if outside selected budget
      }

      // Percentage normalized to 85-99%
      const matchPercent = Math.min(99, Math.max(82, Math.round(score)));

      const sommelierReason = uk
        ? traits.sommelierNotesUk[recipient] || p.character
        : traits.sommelierNotesRu[recipient] || p.character;

      let matchBadge = uk ? "Фаворит сомельє" : "Фаворит сомелье";
      if (matchPercent >= 96) {
        matchBadge = uk ? "100% Влучність" : "100% Точность";
      } else if (matchPercent >= 92) {
        matchBadge = uk ? "Ідеальний збіг" : "Идеальное совпадение";
      } else if (budget !== "any" && budgetMatch) {
        matchBadge = uk ? "Топ у вашому бюджеті" : "Топ в вашем бюджете";
      }

      return {
        product: p,
        score,
        matchPercent,
        sommelierReason,
        matchBadge,
      };
    });

    // Sort descending by score
    scored.sort((a, b) => b.score - a.score);

    // Return top 3 products
    return scored.slice(0, 3);
  }, [allProducts, recipient, emotion, taste, budget, uk]);

  const handleAddToCart = (product: Product) => {
    add(product.id);
    trackIntent("sommelier_add_to_cart", {
      product: product.id,
      recipient,
      emotion,
      taste,
    });
    toast.success(uk ? "Додано до кошика!" : "Добавлено в корзину!", {
      description: `«${product.name}» — ${formatProductPrice(product, locale)}`,
    });
  };

  const getMessengerLink = (product: Product, messenger: "telegram" | "viber") => {
    const recObj = RECIPIENTS.find((r) => r.key === recipient);
    const emoObj = EMOTIONS.find((e) => e.key === emotion);
    const recLabel = uk ? recObj?.labelUk : recObj?.labelRu;
    const emoLabel = uk ? emoObj?.labelUk : emoObj?.labelRu;

    const message = uk
      ? `Доброго дня! Пройшов тест «Шоколадний сомельє» на сайті:\n` +
        `• Одержувач: ${recLabel}\n` +
        `• Бажаний ефект: ${emoLabel}\n` +
        `• Рекомендований набір: ${product.name} (${product.price} ₴)\n` +
        `• Промокод сомельє: SOMELIER10 (-10%)\n\n` +
        `Хочу замовити зі знижкою або уточнити наявність!`
      : `Здравствуйте! Прошёл тест «Шоколадный сомелье» на сайте:\n` +
        `• Получатель: ${recLabel}\n` +
        `• Желаемый эффект: ${emoLabel}\n` +
        `• Рекомендованный набор: ${product.name} (${product.price} ₴)\n` +
        `• Промокод сомелье: SOMELIER10 (-10%)\n\n` +
        `Хочу заказать со скидкой или уточнить наличие!`;

    if (messenger === "telegram") {
      return `https://t.me/craftchococomua?text=${encodeURIComponent(message)}`;
    }
    return `viber://chat?number=%2B380633190460`;
  };

  const handleReset = () => {
    setRecipient("woman");
    setEmotion("wow");
    setTaste("all");
    setBudget("any");
  };

  return (
    <section
      id="sommelier"
      className={cn(
        "scroll-mt-24",
        standalone ? "py-10" : "bg-gradient-to-b from-cream-100 via-cream-50 to-white py-20 lg:py-28"
      )}
      aria-label={uk ? "Шоколадний сомельє — інтерактивний підбір подарунка" : "Шоколадный сомелье — интерактивный подбор подарка"}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-gold-800 shadow-sm">
            <Sparkles className="h-4 w-4 text-gold-600 animate-pulse" />
            {uk ? "Інтерактивний помічник · CraftChoco" : "Интерактивный помощник · CraftChoco"}
          </div>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-choco-950 sm:text-4xl lg:text-5xl">
            {uk ? "Шоколадний сомельє" : "Шоколадный сомелье"}
          </h2>
          <p className="mt-3 text-base sm:text-lg leading-relaxed text-choco-700">
            {uk
              ? "Не знаєте, що подарувати? Оберіть привід та настрій за 20 секунд — алгоритм підбере ідеальний набір з обґрунтуванням смаку та дарує знижку 10%!"
              : "Не знаете, что подарить? Выберите повод и настроение за 20 секунд — алгоритм подберёт идеальный набор с обоснованием вкуса и подарит скидку 10%!"}
          </p>
        </div>

        {/* Интерактивная панель параметров */}
        <div className="mt-12 rounded-3xl border border-gold-500/30 bg-white p-6 shadow-xl shadow-choco-950/5 sm:p-8 lg:p-10">
          <div className="space-y-8">
            {/* ШАГ 1: КОМУ ДАРУЄМО */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-700">
                  {uk ? "Крок 1 із 4" : "Шаг 1 из 4"}
                </span>
                <span className="text-xs text-choco-400">
                  {uk ? "Оберіть одержувача" : "Выберите получателя"}
                </span>
              </div>
              <h3 className="mt-1 font-display text-lg font-bold text-choco-900 sm:text-xl">
                {uk ? "1. Для кого обираємо подарунок?" : "1. Для кого выбираем подарок?"}
              </h3>
              <div className="mt-3.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
                {RECIPIENTS.map((r) => {
                  const Icon = r.icon;
                  const active = recipient === r.key;
                  return (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => setRecipient(r.key)}
                      className={cn(
                        "group relative flex flex-col items-center justify-center rounded-2xl border p-3.5 text-center transition-all duration-200",
                        active
                          ? "border-choco-900 bg-choco-900 text-gold-300 shadow-md scale-[1.02]"
                          : "border-border/80 bg-cream-50/60 text-choco-800 hover:border-gold-500/50 hover:bg-cream-100"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5 mb-1.5 transition-transform duration-200 group-hover:scale-110",
                          active ? "text-gold-400" : "text-choco-500"
                        )}
                      />
                      <span className="text-xs font-bold sm:text-sm">
                        {uk ? r.labelUk : r.labelRu}
                      </span>
                      <span
                        className={cn(
                          "mt-1 hidden text-[11px] leading-tight sm:block",
                          active ? "text-gold-200/80" : "text-choco-400"
                        )}
                      >
                        {uk ? r.descUk : r.descRu}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ШАГ 2: БАЖАНА ЕМОЦІЯ */}
            <div className="border-t border-border/60 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-700">
                  {uk ? "Крок 2 із 4" : "Шаг 2 из 4"}
                </span>
                <span className="text-xs text-choco-400">
                  {uk ? "Ефект та настрій" : "Эффект и настроение"}
                </span>
              </div>
              <h3 className="mt-1 font-display text-lg font-bold text-choco-900 sm:text-xl">
                {uk ? "2. Яку емоцію має викликати презент?" : "2. Какую эмоцию должен вызвать презент?"}
              </h3>
              <div className="mt-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                {EMOTIONS.map((e) => {
                  const Icon = e.icon;
                  const active = emotion === e.key;
                  return (
                    <button
                      key={e.key}
                      type="button"
                      onClick={() => setEmotion(e.key)}
                      className={cn(
                        "group relative flex items-start gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200",
                        active
                          ? "border-choco-900 bg-choco-900 text-gold-300 shadow-md scale-[1.01]"
                          : "border-border/80 bg-cream-50/60 text-choco-800 hover:border-gold-500/50 hover:bg-cream-100"
                      )}
                    >
                      <div
                        className={cn(
                          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors",
                          active ? "bg-white/10 text-gold-400" : "bg-white text-choco-600 shadow-sm"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold sm:text-sm">
                          {uk ? e.labelUk : e.labelRu}
                        </div>
                        <div
                          className={cn(
                            "mt-0.5 text-[11px] leading-snug",
                            active ? "text-gold-200/80" : "text-choco-500"
                          )}
                        >
                          {uk ? e.descUk : e.descRu}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ШАГ 3 & 4: СМАК + БЮДЖЕТ В ОДИН РЯДОК */}
            <div className="grid grid-cols-1 gap-6 border-t border-border/60 pt-6 lg:grid-cols-2">
              {/* СМАК */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-700">
                    {uk ? "Крок 3 із 4" : "Шаг 3 из 4"}
                  </span>
                  <span className="text-xs text-choco-400">{uk ? "Смаковий профіль" : "Вкусовой профиль"}</span>
                </div>
                <h3 className="mt-1 font-display text-base font-bold text-choco-900 sm:text-lg">
                  {uk ? "3. Вподобання за смаком:" : "3. Предпочтения по вкусу:"}
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {TASTES.map((t) => {
                    const active = taste === t.key;
                    return (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => setTaste(t.key)}
                        className={cn(
                          "rounded-xl border p-2.5 text-left transition-all",
                          active
                            ? "border-choco-900 bg-choco-900 text-gold-300 shadow-sm font-semibold"
                            : "border-border/80 bg-cream-50/60 text-choco-800 hover:bg-cream-100"
                        )}
                      >
                        <div className="text-xs font-bold">{uk ? t.labelUk : t.labelRu}</div>
                        <div
                          className={cn(
                            "text-[10px] truncate",
                            active ? "text-gold-200/75" : "text-choco-400"
                          )}
                        >
                          {uk ? t.descUk : t.descRu}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* БЮДЖЕТ */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-700">
                    {uk ? "Крок 4 із 4" : "Шаг 4 из 4"}
                  </span>
                  <span className="text-xs text-choco-400">{uk ? "Діапазон цін" : "Диапазон цен"}</span>
                </div>
                <h3 className="mt-1 font-display text-base font-bold text-choco-900 sm:text-lg">
                  {uk ? "4. Бажаний бюджет:" : "4. Желаемый бюджет:"}
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {BUDGETS.map((b) => {
                    const active = budget === b.key;
                    return (
                      <button
                        key={b.key}
                        type="button"
                        onClick={() => setBudget(b.key)}
                        className={cn(
                          "rounded-xl border p-2.5 text-left transition-all",
                          active
                            ? "border-choco-900 bg-choco-900 text-gold-300 shadow-sm font-semibold"
                            : "border-border/80 bg-cream-50/60 text-choco-800 hover:bg-cream-100"
                        )}
                      >
                        <div className="text-xs font-bold">{uk ? b.labelUk : b.labelRu}</div>
                        <div
                          className={cn(
                            "text-[10px] truncate",
                            active ? "text-gold-200/75" : "text-choco-400"
                          )}
                        >
                          {uk ? b.descUk : b.descRu}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Панель сброса и бонус промокод */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gold-500/10 p-3.5 border border-gold-500/25">
              <div className="flex items-center gap-2">
                <Gift className="h-4 w-4 text-gold-700 shrink-0" />
                <span className="text-xs font-medium text-choco-900">
                  {uk ? (
                    <>
                      Спеціальний бонус: промокод{" "}
                      <strong className="rounded bg-gold-500/20 px-1.5 py-0.5 text-choco-950 font-bold">
                        SOMELIER10
                      </strong>{" "}
                      (-10% на будь-який підібраний набір при замовленні у месенджері)
                    </>
                  ) : (
                    <>
                      Специальный бонус: промокод{" "}
                      <strong className="rounded bg-gold-500/20 px-1.5 py-0.5 text-choco-950 font-bold">
                        SOMELIER10
                      </strong>{" "}
                      (-10% на любой подобранный набор при заказе в мессенджере)
                    </>
                  )}
                </span>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-choco-500 hover:text-choco-800 transition-colors ml-auto"
              >
                <RefreshCw className="h-3 w-3" />
                {uk ? "Скинути фільтри" : "Сбросить фильтры"}
              </button>
            </div>
          </div>
        </div>

        {/* РЕЗУЛЬТАТЫ: РЕКОМЕНДАЦИИ СОМЕЛЬЕ */}
        <div className="mt-12">
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">
                {uk ? "Персональний вердикт" : "Персональный вердикт"}
              </p>
              <h3 className="font-display text-2xl font-bold text-choco-950 sm:text-3xl">
                {uk
                  ? "Найкращі варіанти під ваш запит"
                  : "Лучшие варианты под ваш запрос"}
              </h3>
            </div>
            <p className="text-xs text-choco-500 sm:text-right">
              {uk
                ? "Знайдено 3 ідеальних збіги за смаком та психотипом"
                : "Найдено 3 идеальных совпадения по вкусу и психотипу"}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((rec, index) => {
              const p = rec.product;
              const isBest = index === 0;

              return (
                <article
                  key={p.id}
                  className={cn(
                    "relative flex flex-col overflow-hidden rounded-3xl border bg-white shadow-lg transition-all duration-300 hover:shadow-xl",
                    isBest
                      ? "border-gold-500/80 ring-2 ring-gold-500/30"
                      : "border-border/80 hover:border-gold-400/50"
                  )}
                >
                  {/* Бейдж совпадения */}
                  <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-bold shadow-sm backdrop-blur",
                        isBest
                          ? "bg-gold-500 text-choco-950"
                          : "bg-choco-900/90 text-gold-300"
                      )}
                    >
                      {rec.matchBadge} · {rec.matchPercent}%
                    </span>
                  </div>

                  {/* Фото товара */}
                  <Link
                    href={productPath(p.id, locale)}
                    className="group relative block aspect-[4/3] w-full overflow-hidden bg-cream-100"
                  >
                    <Image
                      src={p.image}
                      alt={p.alt || p.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-choco-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-xs font-semibold text-cream flex items-center gap-1">
                        {uk ? "Відкрити сторінку набору" : "Открыть страницу набора"}
                        <ChevronRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>

                  {/* Тело карточки */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-medium uppercase tracking-wider text-gold-700">
                        {p.categoryLabel}
                      </span>
                      <span className="text-xs text-choco-400">{p.weight}</span>
                    </div>

                    <h4 className="mt-1 font-display text-xl font-bold text-choco-950">
                      <Link
                        href={productPath(p.id, locale)}
                        className="hover:text-gold-700 transition-colors"
                      >
                        {p.name}
                      </Link>
                    </h4>

                    {/* Вердикт сомелье (цитата) */}
                    <div className="mt-3 rounded-2xl bg-cream-50/80 p-3.5 border border-gold-500/20">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gold-800">
                        <Sparkles className="h-3.5 w-3.5 text-gold-600" />
                        {uk ? "Чому саме цей набір:" : "Почему именно этот набор:"}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-choco-800">
                        {rec.sommelierReason}
                      </p>
                    </div>

                    {/* Вкусовые ноты */}
                    {p.flavorNotes && p.flavorNotes.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {p.flavorNotes.slice(0, 2).map((note, idx) => (
                          <span
                            key={idx}
                            className="inline-block rounded-md bg-cream-100 px-2 py-0.5 text-[10px] text-choco-700"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Цена и кнопки действия */}
                    <div className="mt-auto pt-5">
                      <div className="flex items-baseline justify-between border-t border-border/70 pt-3">
                        <div>
                          <span className="text-xs text-choco-400 block">
                            {uk ? "Ціна" : "Цена"}
                          </span>
                          <span className="font-display text-2xl font-black text-choco-950">
                            {formatProductPrice(p, locale)}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200">
                            {uk ? "Зі знижкою:" : "Со скидкой:"}{" "}
                            {Math.round(p.price * 0.9)} ₴
                          </span>
                        </div>
                      </div>

                      {/* Кнопки */}
                      <div className="mt-4 space-y-2">
                        {/* Telegram быстрая покупка со скидкой */}
                        <a
                          href={getMessengerLink(p, "telegram")}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold-600 px-4 py-2.5 text-xs font-bold text-choco-950 shadow-sm transition-all hover:bg-gold-500 hover:shadow-md"
                        >
                          <Send className="h-3.5 w-3.5" />
                          {uk
                            ? "Замовити зі знижкою 10% в Telegram"
                            : "Заказать со скидкой 10% в Telegram"}
                        </a>

                        {/* В корзину + Детали */}
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => handleAddToCart(p)}
                            className="flex items-center justify-center gap-1.5 rounded-xl border border-choco-900 bg-choco-900 px-3 py-2 text-xs font-semibold text-gold-300 transition-colors hover:bg-choco-800"
                          >
                            <ShoppingBag className="h-3.5 w-3.5" />
                            {uk ? "В кошик" : "В корзину"}
                          </button>

                          <Link
                            href={productPath(p.id, locale)}
                            className="flex items-center justify-center gap-1 rounded-xl border border-border bg-cream-50 px-3 py-2 text-xs font-semibold text-choco-700 transition-colors hover:bg-cream-100"
                          >
                            {uk ? "Детальніше" : "Подробнее"}
                            <ChevronRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Дополнительный блок доверия */}
          <div className="mt-10 rounded-2xl border border-border/80 bg-white/70 p-5 text-center sm:text-left sm:flex sm:items-center sm:justify-between sm:gap-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-700">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-choco-900">
                  {uk
                    ? "Усі смаки та колір узгоджуються особисто перед відправкою"
                    : "Все вкусы и оформление согласуются лично перед отправкой"}
                </p>
                <p className="text-xs text-choco-500">
                  {uk
                    ? "Шоколатьє Олександр готує свіжу партію щойно після вашого підтвердження."
                    : "Шоколатье Александр готовит свежую партию сразу после вашего подтверждения."}
                </p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 flex shrink-0 items-center justify-center gap-2">
              <a
                href="viber://chat?number=%2B380633190460"
                className="inline-flex items-center gap-1.5 rounded-lg border border-purple-200 bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700 hover:bg-purple-100 transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Viber
              </a>
              <a
                href="https://t.me/craftchococomua"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-100 transition-colors"
              >
                <Send className="h-3.5 w-3.5" />
                Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
