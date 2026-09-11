import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: "poradovat",
    title: "Порадовать и поднять настроение",
    subtitle: "Для тех моментов, когда улыбка важнее всего",
    description: "Настоящая забота кроется в мелочах. Эти наборы созданы, чтобы вырвать близкого человека из рутины, подарить мгновение абсолютного счастья и напомнить, как сильно он вам дорог.",
    items: [
      { 
        name: "Объятия любимого", 
        price: "от 350", 
        image: "цветы.jpeg", 
        shortDesc: "Шоколадные цветы, которые скажут всё за вас.",
        longDesc: "Нежнейший бельгийский шоколад в форме изящных бутонов. Этот набор не просто тает во рту, он растапливает сердце. Идеальная альтернатива живым цветам, которая оставит долгое сладкое послевкусие вашей заботы.",
        features: ["Тонкий аромат ванили", "Изящная детализация", "Премиум упаковка"]
      },
      { 
        name: "Просто чтобы ты улыбнулась", 
        price: "150", 
        image: "набор 4 шт.jpeg", 
        shortDesc: "Небольшой, но глубокий знак внимания.",
        longDesc: "Иногда не нужен повод. Четыре совершенных шоколадных формы, созданных для того, чтобы скрасить хмурый день. Это ваш тайный способ передать свою нежность на расстоянии.",
        features: ["Ассорти вкусов", "Лаконичный дизайн", "Идеально к кофе"]
      },
      { 
        name: "Радость для самых маленьких", 
        price: "300", 
        image: "зверушки.jpeg", 
        shortDesc: "Восторг и неподдельная детская радость.",
        longDesc: "Мы знаем, как зажечь искру в детских глазах. Игривые формы зверушек из молочного шоколада высшего качества, без вредных добавок и заменителей. Чистая эмоция в каждом кусочке.",
        features: ["Только натуральные ингредиенты", "Игровой формат", "Мягкий вкус"]
      }
    ]
  },
  {
    id: "izvinitsya",
    title: "Искренне извиниться",
    subtitle: "Когда 'прости' звучит по-особенному",
    description: "Слова даются тяжело, а гордость порой мешает сделать первый шаг. Позвольте нашему шоколаду стать мостом к примирению. Он растопит лед обиды быстрее любых оправданий.",
    items: [
      { 
        name: "Искренние извинения", 
        price: "200", 
        image: "набор 6шт.jpeg", 
        shortDesc: "Убедительный жест для восстановления гармонии.",
        longDesc: "Шесть элегантных конфет, символизирующих ваше глубокое сожаление. Когда вы преподносите этот набор, вы показываете, что отношения для вас намного важнее собственной правоты.",
        features: ["Глубокий шоколадный вкус", "Элегантная подача", "Тонкий намек"]
      },
      { 
        name: "Шаг навстречу", 
        price: "200", 
        image: "5 роз.jpeg", 
        shortDesc: "Нежный жест для красивого примирения.",
        longDesc: "Пять шоколадных роз — классика, которая говорит сама за себя. Каждая роза создана вручную, чтобы передать тепло ваших рук и чистоту намерений. Перед этим невозможно устоять.",
        features: ["Символизм", "Ручная лепка", "Безупречный вид"]
      }
    ]
  },
  {
    id: "pozdravit",
    title: "Поздравить с размахом",
    subtitle: "Создайте момент, который запомнится навсегда",
    description: "Стандартные подарки забываются на следующий день. Мы создаем шедевры, которые вызывают неподдельный трепет и заставляют получателя почувствовать себя по-настоящему особенным.",
    items: [
      { 
        name: "Восхищение недоброжелателей", 
        price: "500", 
        image: "набор 16 шт.jpeg", 
        shortDesc: "Роскошный набор, вызывающий зависть и восторг.",
        longDesc: "Наш флагман. Массивная, статусная коробка, скрывающая в себе 16 произведений шоколадного искусства. Это не просто подарок — это заявление. Это демонстрация безупречного вкуса и щедрости, о которой будут говорить.",
        features: ["VIP статус", "Богатая палитра вкусов", "Эксклюзивная коробка"]
      },
      { 
        name: "Сладкая бесконечность", 
        price: "200", 
        image: "5 сфер.jpeg", 
        shortDesc: "Космическая элегантность в каждой детали.",
        longDesc: "Шоколадные сферы с идеальным глянцем, напоминающие драгоценные камни или планеты. Этот набор создан для эстетов, ценящих современное искусство и глубокие концепции в подарках.",
        features: ["Глянцевый блеск", "Сложная текстура", "Премиальный вид"]
      }
    ]
  },
  {
    id: "priznatelnost",
    title: "Выразить признательность",
    subtitle: "Для тех, кто сделал вашу жизнь лучше",
    description: "Как часто мы забываем сказать банальное 'спасибо'? Наши наборы созданы, чтобы ваша благодарность обрела форму, вес и невероятный вкус.",
    items: [
      { 
        name: "Истинная признательность", 
        price: "400", 
        image: "шоколад плитки 4шт.jpeg", 
        shortDesc: "Глубокая благодарность без лишних слов.",
        longDesc: "Четыре увесистые мини-плитки из лучшего бельгийского шоколада. Прямолинейный, честный и очень 'дорогой' жест, который покажет ваше истинное отношение к человеку и его поступкам.",
        features: ["Плотная текстура", "Насыщенный аромат", "Строгий стиль"]
      },
      { 
        name: "Теплые слова", 
        price: "300", 
        image: "пожелания.jpeg", 
        shortDesc: "Шоколад, который буквально говорит за вас.",
        longDesc: "Набор, где каждая деталь — это ваше послание. Идеальный баланс между формой и содержанием. Когда вы хотите, чтобы ваше пожелание не только услышали, но и почувствовали на вкус.",
        features: ["Индивидуальный посыл", "Эстетика", "Глубокий смысл"]
      },
      { 
        name: "Отдых после работы", 
        price: "450", 
        image: "набор с плиткой.jpeg", 
        shortDesc: "Идеальное средство для снятия напряжения.",
        longDesc: "Стресс большого города растворяется с первым кусочком этого набора. Комбинация большой плитки и конфет — это настоящий ритуал расслабления, который вы дарите близкому человеку после тяжелого дня.",
        features: ["Терапевтический эффект", "Щедрый объем", "Идеальный вечер"]
      }
    ]
  },
  {
    id: "melkoe-spasibo",
    title: "Мелкое спасибо",
    subtitle: "Маленький жест, оставляющий теплый след",
    description: "Не обязательно ждать большого повода, чтобы сделать человеку приятно. Это ваш секретный инструмент для создания крепких связей и хорошего настроения окружающих.",
    items: [
      { 
        name: "Маленький знак внимания", 
        price: "250", 
        image: "маленькие плитки.jpeg", 
        shortDesc: "Приятный сюрприз посреди суетливого дня.",
        longDesc: "Компактный набор, который легко поместится в сумочке или на рабочем столе. Это та самая мелочь, которая способна перевернуть ход неудачного дня и заставить человека искренне улыбнуться.",
        features: ["Компактность", "Изящество", "Универсальность"]
      },
      { 
        name: "Утренняя улыбка", 
        price: "200", 
        image: "микроплитки.jpeg", 
        shortDesc: "Отличное начало любого, даже самого раннего утра.",
        longDesc: "Дополнение к чашке утреннего кофе, которое задает правильный тон всему дню. Микроплитки обладают интенсивным вкусом, способным пробудить рецепторы и вдохновить на великие дела.",
        features: ["Идеально к кофе", "Интенсивный вкус", "Миниатюрность"]
      },
      { 
        name: "Легкий комплимент", 
        price: "300", 
        image: "бруски.jpeg", 
        shortDesc: "Тонкий намек на ваши теплые чувства.",
        longDesc: "Шоколадные бруски правильной геометрической формы. Ничего лишнего, только чистый вкус Callebaut и ваше ненавязчивое внимание. Идеально для первого шага или легкого флирта.",
        features: ["Строгая геометрия", "Лаконичность", "Изысканность"]
      }
    ]
  }
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-body selection:bg-[#D4AF37] selection:text-[#0F0B0A]">
      {/* Navbar */}
      <header className="fixed w-full top-0 z-50 bg-[#0F0B0A]/80 backdrop-blur-xl border-b border-[#2A1F1A] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-xl md:text-2xl font-bold tracking-widest font-heading text-[#EBE3D5] uppercase">
              CRAFT.CHOCO.<span className="text-[#D4AF37]">KHARKIV</span>
            </div>
          </div>
          <nav className="hidden md:flex gap-8 text-[13px] tracking-widest uppercase font-semibold text-[#A89F91]">
            <a href="#philosophy" className="hover:text-[#D4AF37] transition-colors">Философия</a>
            <a href="#why-us" className="hover:text-[#D4AF37] transition-colors">Привилегия</a>
            <a href="#catalog" className="hover:text-[#D4AF37] transition-colors">Коллекции эмоций</a>
            <a href="#custom" className="hover:text-[#D4AF37] transition-colors">Корпоративным клиентам</a>
          </nav>
          <a href="#contacts" className="hidden md:block text-[#D4AF37] text-sm tracking-widest uppercase font-bold border border-[#D4AF37] px-6 py-2 hover:bg-[#D4AF37] hover:text-[#0F0B0A] transition-all duration-300">
            Связаться
          </a>
        </div>
      </header>

      <main className="flex-grow pt-20">
        {/* Elite Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2A1F1A] via-[#0F0B0A] to-[#0F0B0A]"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20"></div>
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-10">
            <div className="flex justify-center mb-8">
              <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                <Image src="/images/logo.jpg" alt="Craft Choco Kharkiv Brand" fill className="object-cover" priority />
              </div>
            </div>
            <span className="text-[#D4AF37] tracking-[0.3em] uppercase text-sm md:text-base font-semibold block mb-6">Эксклюзивно в Харькове</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading text-[#EBE3D5] tracking-tight leading-[1.1] mb-8 font-medium">
              Мы продаем <span className="text-[#D4AF37] italic font-light">эмоции.</span><br />
              Шоколад — лишь инструмент.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-[#A89F91] max-w-3xl mx-auto leading-relaxed font-light">
              Забудьте о тривиальных коробках из супермаркета. Мы создаем орудие, чтобы сказать 
              <span className="text-[#EBE3D5] font-medium"> «Люблю»</span>, 
              <span className="text-[#EBE3D5] font-medium"> «Прости»</span> или 
              <span className="text-[#EBE3D5] font-medium"> «Восхищаюсь»</span>. 
              Только премиальный бельгийский шоколад Callebaut ручной работы.
            </p>
            <div className="mt-14 flex flex-col sm:flex-row justify-center gap-6">
              <a href="#catalog" className="group relative inline-flex items-center justify-center px-10 py-4 text-sm tracking-[0.2em] uppercase font-bold text-[#0F0B0A] bg-[#D4AF37] overflow-hidden transition-all duration-500 hover:bg-[#EED57B]">
                <span className="relative z-10">Выбрать эмоцию</span>
              </a>
              <a href="#why-us" className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-[0.2em] uppercase font-bold text-[#EBE3D5] border border-[#A89F91] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-500">
                Почему мы?
              </a>
            </div>
          </div>
        </section>

        {/* Why Us / Superiority Section */}
        <section id="why-us" className="py-32 bg-[#15100E] border-t border-b border-[#2A1F1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <span className="text-[#D4AF37] tracking-[0.2em] uppercase text-sm font-semibold block mb-4">Безупречность во всем</span>
              <h2 className="text-4xl md:text-5xl font-heading text-[#EBE3D5]">Чем мы лучше других?</h2>
              <div className="w-24 h-1 bg-[#D4AF37] mx-auto mt-8 opacity-50"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
              <div className="text-center md:text-left group">
                <div className="text-5xl font-heading text-[#2A1F1A] font-bold mb-6 group-hover:text-[#D4AF37] transition-colors duration-500">01</div>
                <h3 className="text-2xl font-heading text-[#EBE3D5] mb-4">100% Callebaut</h3>
                <p className="text-[#A89F91] leading-relaxed">
                  Пока другие экономят, подмешивая дешевую глазурь и растительные жиры, мы используем исключительно премиальный бельгийский шоколад <strong className="text-[#D4AF37] font-normal">Callebaut</strong>. Это статус, который чувствуется с первого кусочка.
                </p>
              </div>
              <div className="text-center md:text-left group">
                <div className="text-5xl font-heading text-[#2A1F1A] font-bold mb-6 group-hover:text-[#D4AF37] transition-colors duration-500">02</div>
                <h3 className="text-2xl font-heading text-[#EBE3D5] mb-4">Глубокий смысл</h3>
                <p className="text-[#A89F91] leading-relaxed">
                  Вы не покупаете товар на развес. Вы приобретаете концепцию. Каждая позиция в нашем каталоге — это психологический триггер: извинение, комплимент или декларация чувств. Мы продумали всё за вас.
                </p>
              </div>
              <div className="text-center md:text-left group">
                <div className="text-5xl font-heading text-[#2A1F1A] font-bold mb-6 group-hover:text-[#D4AF37] transition-colors duration-500">03</div>
                <h3 className="text-2xl font-heading text-[#EBE3D5] mb-4">Индивидуальный, качественный подход</h3>
                <p className="text-[#A89F91] leading-relaxed">
                  Первое впечатление нельзя произвести дважды. Наши наборы упаковываются так, чтобы вызывать трепет еще до открытия коробки.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Elite Catalog */}
        <section id="catalog" className="py-32 bg-[#0F0B0A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-24">
              <span className="text-[#D4AF37] tracking-[0.2em] uppercase text-sm font-semibold block mb-4">Коллекции</span>
              <h2 className="text-4xl md:text-6xl font-heading text-[#EBE3D5]">Арсенал ваших эмоций</h2>
            </div>

            <div className="space-y-32">
              {categories.map((category) => (
                <div key={category.id} className="scroll-mt-32">
                  <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-[#2A1F1A] pb-8 gap-6">
                    <div className="max-w-2xl">
                      <h3 className="text-3xl md:text-4xl font-heading text-[#D4AF37] mb-4">{category.title}</h3>
                      <p className="text-xl text-[#EBE3D5] font-light italic mb-4">{category.subtitle}</p>
                      <p className="text-[#A89F91] leading-relaxed">{category.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {category.items.map((item, idx) => (
                      <div key={idx} className="group flex flex-col bg-[#15100E] border border-[#2A1F1A] hover:border-[#D4AF37] transition-all duration-700">
                        <div className="relative h-80 w-full overflow-hidden">
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                          <Image 
                            src={`/images/${item.image}`}
                            alt={item.name}
                            fill
                            className="object-cover object-center group-hover:scale-110 transition-transform duration-1000 ease-out"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                          />
                        </div>
                        <div className="p-8 md:p-10 flex flex-col flex-grow relative">
                          <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#0F0B0A] border border-[#D4AF37] text-[#D4AF37] px-6 py-2 text-xl font-heading font-bold tracking-widest z-20 shadow-lg">
                            {item.price} ₴
                          </div>
                          
                          <h4 className="text-2xl font-heading text-[#EBE3D5] mb-3 mt-4">{item.name}</h4>
                          <p className="text-[#D4AF37] text-sm uppercase tracking-widest font-semibold mb-6">{item.shortDesc}</p>
                          <p className="text-[#A89F91] leading-relaxed mb-8 flex-grow">{item.longDesc}</p>
                          
                          <div className="border-t border-[#2A1F1A] pt-6 mt-auto">
                            <ul className="space-y-2 mb-8">
                              {item.features.map((feature, fIdx) => (
                                <li key={fIdx} className="flex items-center text-sm text-[#A89F91]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mr-3"></span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            <a href="#contacts" className="inline-flex items-center text-[#D4AF37] font-semibold uppercase tracking-widest text-sm hover:text-[#EBE3D5] transition-colors group/btn">
                              Сделать заказ 
                              <svg className="w-5 h-5 ml-2 transform group-hover/btn:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Corporate VIP Section */}
        <section id="custom" className="py-32 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] bg-[#110D0B] relative border-t border-[#2A1F1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-[#D4AF37] tracking-[0.2em] uppercase text-sm font-semibold block mb-4">Для бизнеса и особых случаев</span>
                <h2 className="text-4xl md:text-5xl font-heading text-[#EBE3D5] mb-8">Корпоративная эстетика</h2>
                <div className="space-y-6 text-[#A89F91] text-lg font-light leading-relaxed">
                  <p>
                    Обычные корпоративные подарки отправляются в ящик стола. Наши изделия вызывают желание сделать фото и похвастаться перед коллегами.
                  </p>
                  <p>
                    Мы разрабатываем эксклюзивные решения для бизнеса: от брендирования элитной упаковки до создания уникальных форм шоколада, отражающих философию вашей компании. Ваш статус будет подчеркнут безупречным вкусом Callebaut.
                  </p>
                  <p className="text-[#D4AF37] font-medium">Любой продукт из каталога может быть адаптирован индивидуально под ваш запрос.</p>
                </div>
                <div className="mt-12">
                  <a href="#contacts" className="inline-block border border-[#D4AF37] text-[#D4AF37] px-10 py-4 tracking-[0.2em] uppercase text-sm font-bold hover:bg-[#D4AF37] hover:text-[#0F0B0A] transition-all duration-500">
                    Обсудить условия
                  </a>
                </div>
              </div>
              <div className="relative h-[600px] rounded-sm overflow-hidden border border-[#2A1F1A] shadow-2xl">
                <Image 
                  src="/images/упаковка.jpeg" 
                  alt="Премиальная упаковка" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0B0A] via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Elite Footer */}
      <footer id="contacts" className="bg-[#0A0706] pt-24 pb-12 border-t border-[#2A1F1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[#D4AF37]">
                  <Image src="/images/logo.jpg" alt="Craft Choco Kharkiv Logo" fill className="object-cover" />
                </div>
                <div className="text-3xl font-bold tracking-widest font-heading text-[#EBE3D5] uppercase">
                  Craft<span className="text-[#D4AF37]">Choco</span>
                </div>
              </div>
              <p className="text-[#A89F91] leading-relaxed max-w-sm">
                Мастерская эмоционального шоколада. Мы создаем не сладости, а искусство говорить без слов. Работаем исключительно с бельгийским сырьем премиум-класса.
              </p>
              <div className="mt-8 flex items-center gap-2 text-[#EBE3D5]">
                <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span>г. Харьков, Украина</span>
              </div>
            </div>
            
            <div className="md:col-span-4">
              <h3 className="text-lg font-heading text-[#EBE3D5] uppercase tracking-widest mb-6 border-b border-[#2A1F1A] pb-4 inline-block">Консьерж-сервис</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-[#A89F91] text-sm mb-1 uppercase tracking-wider">Телефон / Мессенджеры</p>
                  <a href="tel:0962535610" className="text-2xl font-heading text-[#D4AF37] hover:text-[#EBE3D5] transition-colors">096 253 56 10</a>
                </div>
                <div className="flex gap-6">
                  <a href="viber://chat?number=%2B380962535610" className="text-[#A89F91] hover:text-[#D4AF37] uppercase text-sm tracking-widest transition-colors font-medium">Viber</a>
                  <a href="https://wa.me/380962535610" className="text-[#A89F91] hover:text-[#D4AF37] uppercase text-sm tracking-widest transition-colors font-medium">WhatsApp</a>
                  <a href="https://t.me/+380962535610" className="text-[#A89F91] hover:text-[#D4AF37] uppercase text-sm tracking-widest transition-colors font-medium">Telegram</a>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              <h3 className="text-lg font-heading text-[#EBE3D5] uppercase tracking-widest mb-6 border-b border-[#2A1F1A] pb-4 inline-block">Медиа</h3>
              <div>
                <a href="https://www.youtube.com/@craft.choco.kharkiv" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-[#A89F91] hover:text-[#EBE3D5] transition-colors">
                  <div className="w-12 h-12 rounded-full border border-[#2A1F1A] flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
                    <svg className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </div>
                  <span className="uppercase text-sm tracking-widest">YouTube канал</span>
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-[#2A1F1A] flex flex-col md:flex-row justify-between items-center text-xs tracking-widest uppercase text-[#5C544B]">
            <p>© {new Date().getFullYear()} Craft Choco Kharkiv.</p>
            <p className="mt-2 md:mt-0">Искусство в каждом кусочке.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
