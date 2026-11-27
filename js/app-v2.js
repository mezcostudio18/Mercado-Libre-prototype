/* =========================================================
   Mercado Libre — prototipo clicable: página de resultados
   Filtros rediseñados + barra sticky + selección para comparar
   ========================================================= */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var el = function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  var fmt = function (n) { return '$' + n.toLocaleString('es-CO'); };
  var short = function (n) { return '$' + (n / 1e6).toLocaleString('es-CO', { maximumFractionDigits: 1 }) + ' M'; };

  /* ---------- íconos ---------- */
  var I = {
    chevS: '<svg width="7" height="4" viewBox="0 0 7 4"><path d="M.5.5 3.5 3.5 6.5.5" fill="none" stroke-width="1.2"/></svg>',
    x: '<svg viewBox="0 0 6 6" width="6" height="6"><path d="M.5.5l5 5M5.5.5l-5 5" fill="none" stroke-width="1" stroke-linecap="round"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 11v6" stroke-linecap="round"/><circle cx="12" cy="7.5" r=".6" fill="currentColor"/></svg>',
    heart: '<svg viewBox="0 0 19 17"><path d="M9.5 16C3 11 1 8.2 1 5.4 1 3 2.9 1 5.2 1c1.6 0 3 .8 4.3 2.6C10.8 1.8 12.200 1 13.800 1 16.100 1 18 3 18 5.400c0 2.800-2 5.600-8.500 10.600z" stroke-linejoin="round"/></svg>',
    ac: '<svg class="acc-ch" width="6" height="11" viewBox="0 0 6 11" fill="none" stroke="#c8a801" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M.5.5 5.2 5.5.5 10.5"/></svg>',
    dn: '<svg viewBox="0 0 11 6" fill="none" stroke="#333" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M.7.7 5.5 5.3 10.3.7"/></svg>',
    truck: '<svg class="acc-ic" viewBox="0 0 16 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M1 1h9v8H1zM10 4h3.2L15 6.4V9h-5"/><circle cx="4.2" cy="9.6" r="1.5" fill="#ffe600"/><circle cx="12" cy="9.6" r="1.5" fill="#ffe600"/></svg>',
    star: '<svg class="acc-ic" viewBox="0 0 16 15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M8 1l2 4.2 4.600.6-3.400 3.200.9 4.600L8 11.300 3.900 13.600l.9-4.600L1.400 5.800 6 5.200z"/></svg>',
    chat: '<svg class="acc-ic" viewBox="0 0 16 15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M1.75 1.75h12.5v8.5H8.6L5.2 13.25v-3H1.75z"/></svg>',
    shop: '<svg class="acc-ic" viewBox="0 0 16 15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M1.500 5.500 2.600 1.500h10.800l1.100 4a2 2 0 0 1-3.700.700 2 2 0 0 1-3.600 0 2 2 0 0 1-3.600 0A2 2 0 0 1 1.500 5.500zM2.500 8v6h11V8"/></svg>'
  };


  /* ícono de comparar — SVG exacto exportado de Figma (703:10109), 22×16 */
  var cmpN = 0;
  function cmpIcon() {
    var id = 'cmpm' + (++cmpN);
    var stroke = 'M11.8705 0.672428C12.2418 0.0293529 13.0644 -0.190623 13.7075 0.180671L20.4943 4.09897C21.1373 4.47022 21.3578 5.29228 20.9867 5.93534L15.5643 15.3273C15.1929 15.9704 14.3703 16.191 13.7272 15.8197L11.5921 14.5867L14.7317 12.7746C15.8572 12.1249 16.2428 10.6856 15.5931 9.56016L11.166 1.89164L11.8705 0.672428Z';
    return '<svg class="cmp-ic" width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">' +
      '<path d="M7.45904 0.180363C8.10216 -0.190943 8.92454 0.0294303 9.29584 0.67255L14.7186 10.064C15.0898 10.7071 14.8694 11.5296 14.2264 11.9009L7.43907 15.8193L7.31667 15.8818C6.7364 16.1426 6.04896 15.9586 5.67692 15.4425L5.60226 15.3271L0.180389 5.93557C-0.167759 5.33256 0.00417709 4.57202 0.557125 4.17342L0.672577 4.09877L7.45904 0.180363ZM8.13004 1.33314C8.12997 1.33316 8.12789 1.33361 8.1257 1.33488L1.33924 5.25328C1.33741 5.25434 1.33604 5.25479 1.33577 5.25502V5.25588C1.33542 5.2564 1.33469 5.25783 1.33404 5.26022L1.33317 5.26543C1.33319 5.2655 1.33364 5.26671 1.3349 5.2689L6.75678 14.6604L6.75938 14.6639C6.75979 14.6642 6.7613 14.6649 6.76372 14.6656C6.76636 14.6663 6.76845 14.6665 6.76893 14.6665C6.769 14.6665 6.77036 14.6659 6.7724 14.6647L13.5597 10.7463C13.5616 10.7453 13.5621 10.7439 13.5623 10.7437C13.5626 10.7434 13.5642 10.742 13.5649 10.7394C13.5657 10.7367 13.5659 10.7346 13.5658 10.7342H13.5649C13.5649 10.7341 13.5652 10.7328 13.5641 10.7307L8.14133 1.33922L8.13959 1.33574C8.13926 1.33549 8.1371 1.33474 8.13438 1.33401C8.13224 1.33345 8.13076 1.33311 8.13004 1.33314Z" fill="#4C91FA"/>' +
      '<path d="M8.13086 1.33313C8.13086 1.33313 8.12871 1.3336 8.12652 1.33487L1.34006 5.25327C1.33823 5.25433 1.33659 5.25501 1.33659 5.25501C1.33659 5.25501 1.3355 5.25782 1.33485 5.26021L1.33398 5.26542C1.33398 5.26542 1.33446 5.2667 1.33572 5.26889L6.7576 14.6604L6.7602 14.6639C6.7602 14.6639 6.76212 14.6649 6.76454 14.6656C6.76718 14.6663 6.76975 14.6665 6.76975 14.6665C6.76975 14.6665 6.77117 14.6659 6.77322 14.6647L13.5605 10.7463C13.5624 10.7452 13.5632 10.7437 13.5632 10.7437C13.5632 10.7437 13.565 10.742 13.5658 10.7394C13.5665 10.7367 13.5666 10.7342 13.5666 10.7342C13.5666 10.7342 13.5661 10.7327 13.5649 10.7307L8.14215 1.33921L8.14041 1.33573C8.14041 1.33573 8.13792 1.33473 8.1352 1.334C8.13306 1.33344 8.13086 1.33313 8.13086 1.33313Z" fill="white"/>' +
      '<path d="' + stroke + '" fill="#4C91FA"/>' +
      '<mask id="' + id + '" fill="white"><path d="' + stroke + '"/></mask>' +
      '<path d="' + stroke + '" stroke-width="3" stroke="#4C91FA" mask="url(#' + id + ')"/></svg>';
  }

  /* ---------- laptops ilustradas (SVG propio) ---------- */
  var WALL = [
    ['#ff7a45', '#7b3fe4', '#2fb7ff'], ['#ff5f7e', '#ff2d55', '#ffb199'], ['#1e90ff', '#6a5acd', '#00d2ff'],
    ['#f6c84c', '#ef6a3b', '#7a5af8'], ['#32c4a5', '#2563eb', '#a78bfa'], ['#ff9ad5', '#845ef7', '#4cc9f0']
  ];
  var BODY = [['#c8cbd0', '#aeb2b8'], ['#d9dbde', '#b9bcc2'], ['#4a4d52', '#34363a'], ['#bfc3c9', '#a3a8af']];
  function laptop(v) {
    var w = WALL[v % WALL.length], b = BODY[v % BODY.length], id = 'g' + v + Math.random().toString(36).slice(2, 6);
    var keys = '';
    for (var r = 0; r < 4; r++) for (var c = 0; c < 13; c++) keys += '<rect x="' + (30 + c * 11.2) + '" y="' + (131 + r * 5.6) + '" width="9.2" height="3.8" rx="1" fill="' + b[1] + '"/>';
    return '<svg class="lap" viewBox="0 0 208 176" aria-hidden="true">' +
      '<defs><linearGradient id="' + id + 'a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + w[0] + '"/><stop offset=".55" stop-color="' + w[1] + '"/><stop offset="1" stop-color="' + w[2] + '"/></linearGradient>' +
      '<linearGradient id="' + id + 'b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + b[0] + '"/><stop offset="1" stop-color="' + b[1] + '"/></linearGradient>' +
      '<clipPath id="' + id + 'c"><rect x="22" y="14" width="164" height="104" rx="3"/></clipPath></defs>' +
      '<rect x="16" y="8" width="176" height="116" rx="7" fill="#15171a"/>' +
      '<g clip-path="url(#' + id + 'c)"><rect x="22" y="14" width="164" height="104" fill="url(#' + id + 'a)"/>' +
      '<path d="M22 92C58 62 88 112 124 84s46-26 62-6v40H22z" fill="#fff" opacity=".18"/>' +
      '<path d="M22 70C52 46 82 86 118 62s48-18 68 0" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="10"/>' +
      '<rect x="22" y="108" width="164" height="10" fill="#000" opacity=".28"/><rect x="26" y="111" width="4" height="4" rx="1" fill="#fff" opacity=".8"/><rect x="34" y="111" width="3" height="4" fill="#fff" opacity=".4"/></g>' +
      '<circle cx="104" cy="11" r="1.2" fill="#3a3d42"/>' +
      '<path d="M8 124h192l5 12c1 3-1 6-5 6H8c-4 0-6-3-5-6z" fill="url(#' + id + 'b)"/>' +
      '<path d="M8 124h192" stroke="#fff" stroke-opacity=".5"/>' + keys +
      '<rect x="80" y="154" width="48" height="12" rx="2" fill="' + b[1] + '" opacity=".6"/>' +
      '<path d="M3 142h202v4c0 5-4 8-9 8H12c-5 0-9-3-9-8z" fill="' + b[1] + '"/></svg>';
  }

  /* ---------- datos de tarjetas (del Figma, 16 en grilla 4×4) ---------- */
  var A = { t: 'Lenovo V14 G4 AMN – AMD Ryzen 5 7520U – SSD 512 GB / DDR5 16 GB – 14" Full HD – FreeDOS', r: '4.8 | +1000 vendidos', o: 2400000, p: 1708900, d: 28, q: '12 cuotas de $ 142.408 con 0% interés', e: 'Llega gratis el lunes · FULL', tag: ['OFERTA IMPERDIBLE', 'blue'] };
  var B = { t: 'Lenovo Ideapad Slim 3 15irh10 I5-13420h 16gb 512gb Tactil Gris', r: '4.9 | +1000 vendidos', o: 3299999, p: 2049900, d: 37, q: '12 cuotas de $ 170.825 con 0% interés', cup: 'Cupón $ 100.000 OFF', e: 'Envío gratis', tag: ['MÁS VENDIDO'] };
  var C = { t: 'Portátil Hp 200 G2a Ryzen 5-220 8gb Ddr5 512gb Ssd 16 Fhd Plateado', r: '4.9 | +100 vendidos', o: 2799989, p: 1489890, d: 46, q: '6 cuotas de $ 248.315 con 0% interés', e: 'Envío gratis' };
  var D = { t: 'Computador Portátil Lenovo Ideapad Slim 3 Intel Core i5 512gb 8gb RAM – Gris', r: '4.9 | +100 vendidos', o: 3999900, p: 2057062, d: 48, q: '12 cuotas de $ 171.422 con 0% interés', e: 'Llega gratis el lunes · FULL' };
  var PRODUCTS = [A, B, C, D, D, D, D, D, B, D, D, A, D, D, D, D].map(function (p, i) {
    var o = {}; for (var k in p) o[k] = p[k];
    o.id = i + 1; o.v = [0, 1, 2, 3, 4, 5, 2, 0, 1, 3, 5, 4, 2, 1, 0, 3][i];
    return o;
  });
  // las tarjetas repetidas del Figma son marcadores de posición: variamos el modelo para que se distingan
  var VAR = [
    ['Lenovo IdeaPad Slim 3 Core i5-13420H 8 GB 512 GB SSD 15,6" Gris', 3999900, 2057062, 48],
    ['ASUS Vivobook 15 Ryzen 7 5700U 16 GB 512 GB SSD 15,6" Full HD', 3399900, 2299900, 32],
    ['Acer Aspire 5 Core i5-1235U 16 GB 1 TB SSD 15,6" Plateado', 3599000, 2489000, 31],
    ['HP Victus 15 Ryzen 5 8645HS RTX 4050 16 GB 512 GB SSD', 4999900, 3699900, 26],
    ['Lenovo LOQ 15 Core i7-13620H RTX 4060 16 GB 1 TB SSD', 6299900, 4899900, 22],
    ['Dell Inspiron 15 Core i5-1335U 16 GB 512 GB SSD Negro', 3799900, 2749900, 28],
    ['MSI Thin 15 Core i5-12450H RTX 2050 8 GB 512 GB SSD', 3899000, 2799000, 28],
    ['Apple MacBook Air 13" M2 8 GB 256 GB SSD Medianoche', 5599000, 4799000, 14]
  ];
  var vi = 0;
  PRODUCTS.forEach(function (p) {
    if (p.t.indexOf('Core i5 512gb 8gb') > -1 || p.id === 10 || p.id === 15) {
      var x = VAR[vi++ % VAR.length]; p.t = x[0]; p.o = x[1]; p.p = x[2]; p.d = x[3];
      p.q = '12 cuotas de $ ' + Math.round(p.p / 12).toLocaleString('es-CO') + ' con 0% interés';
    }
  });
  // nombres ajustados a la marca que se ve en la foto
  var NAME_FIX = {
    4: 'ASUS Vivobook 16 Ryzen 9 270 16 GB 1 TB SSD 16" Full HD',
    7: 'ASUS TUF Gaming A15 Ryzen 5 8645HS RTX 4050 16 GB 512 GB SSD',
    8: 'ASUS TUF Gaming F15 Core i7-13620H RTX 4060 16 GB 1 TB SSD',
    14: 'ASUS Vivobook 16 Ryzen 9 270 24 GB 512 GB SSD 16" Full HD'
  };
  PRODUCTS.forEach(function (p) { if (NAME_FIX[p.id]) p.t = NAME_FIX[p.id]; });
  // fotos de producto (carpeta imagenes/)
  var PHOTO = {
    1: 'D_NQ_NP_2X_627691-MLA99521928976_122025-F.webp',
    2: 'D_NQ_NP_2X_734199-MLA109232056998_042026-F.webp',
    3: 'D_NQ_NP_2X_923273-MLA110651598514_052026-F.webp',
    4: 'D_NQ_NP_2X_804890-MCO98783244829_112025-F.webp',
    5: 'D_NQ_NP_2X_737043-MLA99986262129_112025-F.webp',
    6: 'D_NQ_NP_2X_871628-MCO118072219749_092026-F.webp',
    7: 'D_NQ_NP_2X_892802-MLA96865421043_102025-F.webp',
    8: 'D_NQ_NP_2X_672368-MLA94430505675_102025-F.webp',
    9: 'D_NQ_NP_2X_851778-MLA103262512459_122025-F.webp',
    10: 'D_NQ_NP_2X_975870-MLA109676286739_032026-F.webp',
    11: 'D_NQ_NP_2X_827966-MLA98958790099_112025-F.webp',
    12: 'D_NQ_NP_2X_937866-MLA99482225348_112025-F.webp',
    13: 'D_NQ_NP_2X_830444-MLA107336166442_032026-F.webp',
    14: 'D_NQ_NP_2X_851384-MCO98308234468_112025-F.webp',
    15: 'D_NQ_NP_2X_846259-MLA110212691036_052026-F.webp',
    16: 'D_NQ_NP_2X_981542-MLA101264439339_122025-F.webp'
  };
  function lapImg(p) { return PHOTO[p.id] ? '<img class="lap-img" src="imagenes/' + PHOTO[p.id] + '" alt="" draggable="false">' : laptop(p.v); }

  /* ---------- definición de filtros ---------- */
  var TAB = {
    env: { id: 'env', title: 'Envío y recepción', icon: I.truck, secs: ['envio'] },
    car: { id: 'car', title: 'Características', icon: I.star, layout: [['precio'], ['gama'], ['estado'], ['marca'], ['procesador', 'ram', 'disco', 'grafica', 'pantalla', 'so'], ['color']], secs: ['precio', 'gama', 'estado', 'marca', 'procesador', 'ram', 'disco', 'grafica', 'pantalla', 'so', 'color'] },
    ven: { id: 'ven', title: 'Vendedor y opiniones', icon: I.chat, secs: ['vendedor', 'opiniones'] }
  };
  var ORDER = ['env', 'car', 'ven'];

  var SEC = {
    envio: { tab: 'env', chip: 'Envío', opts: ['Gratis con Meli+', 'Gratis en carritos desde $60.000', 'Envío local', 'Envío gratis', 'Retiro gratis'] },
    precio: { tab: 'car', chip: 'Precio', price: true },
    gama: { tab: 'car', chip: 'Gama y uso', label: 'Gama y uso', sepAfter: true, opts: ['Alta', 'Media', 'Baja', 'Para diseño gráfico', 'Para modelado 3D', 'Para juegos'], extra: ['Para oficina', 'Ultrarrápidos', 'Equilibrio precio/potencia'], counts: ['2.500', '5.000', '1.520'], all: 'Todas las gamas', allCount: '9.000', info: 'Agrupa las laptops por rendimiento y precio.', optInfo: { 'Para diseño gráfico': 'Selecciona automáticamente procesador, RAM, pantalla y gráfica para Photoshop, Illustrator y similares.', 'Para modelado 3D': 'Procesador y gráfica potentes, mucha RAM y disco rápido para Blender, AutoCAD y similares.', 'Para juegos': 'Gráfica dedicada, procesador alto y pantalla de alta frecuencia.', 'Para oficina': 'Equipos livianos y económicos para documentos, correo y videollamadas.', 'Ultrarrápidos': 'Lo más potente en procesador, memoria y almacenamiento.', 'Equilibrio precio/potencia': 'Buen rendimiento sin pagar de más.', Alta: 'Para edición, diseño y juegos exigentes.', Media: 'Para estudiar, trabajar y uso diario.', Baja: 'Para tareas básicas: navegar y ofimática.' } },
    estado: { tab: 'car', chip: 'Estado', label: 'Estado', opts: ['Nuevo', 'Usado'], all: 'Todos' },
    marca: { tab: 'car', chip: 'Marca', label: 'Marca', brands: true, sepFirst: true, opts: ['Lenovo', 'HP', 'Asus', 'Dell', 'Apple', 'Acer', 'MSI', 'eMachines'], extra: ['Samsung', 'Huawei', 'Gigabyte'], other: ['Alienware', 'LG', 'Microsoft', 'Razer', 'Toshiba', 'Positivo'], all: 'Todas' },
    procesador: { tab: 'car', chip: 'Procesador', label: 'Procesador', opts: ['Core i3', 'Core i5', 'Core i7', 'Ryzen 3', 'Ryzen 5', 'Ryzen 7', 'Ryzen 9', 'M'], extra: ['Core i9', 'Core Ultra 5', 'Core Ultra 7', 'Ryzen AI 9'], other: ['Celeron', 'Pentium', 'Athlon', 'Snapdragon X', 'Intel N100'], info: 'Es el cerebro de la laptop. Permite hacer cálculos más complejos.' },
    ram: { tab: 'car', chip: 'RAM', label: 'Memoria RAM', opts: ['4 GB', '8 GB', '12 GB', '24 GB', '32 GB', '64 GB', 'Más de 64 GB'], info: 'Es la memoria de trabajo: con más RAM puedes usar varios programas a la vez sin que se trabe.' },
    disco: { tab: 'car', chip: 'Disco duro', label: 'Disco duro', opts: ['Menos de 256 GB', '1 TB', '2 TB o más'], extra: ['256 GB', '512 GB', '4 TB'], info: 'Donde se guardan tus archivos y programas. Un SSD es mucho más rápido que un disco tradicional.' },
    grafica: { tab: 'car', chip: 'Tarjeta de video', label: 'Tarjeta gráfica', opts: ['RTX 5090', 'Arc B570', 'RTX 5080', 'RX 9060', 'RX 9070', 'RTX 5050'], extra: ['RTX 4070', 'RTX 4060', 'RTX 4050'], other: ['RTX 5060', 'RTX 5070', 'RTX 5070 Ti', 'Radeon 890M', 'Intel Iris Xe', 'GTX 1650'], info: 'Procesa imágenes y video. Es clave para juegos, edición y diseño 3D.' },
    pantalla: { tab: 'car', chip: 'Pantalla', label: 'Pantalla', opts: ['HD', 'Full HD', 'QHD / 2K / WQXGA', '4K - Ultra HD'], extra: ['OLED', '120 Hz o más'], info: 'Define qué tan nítida se ve la imagen. A mayor resolución, más detalle.' },
    so: { tab: 'car', chip: 'Sistema operativo', label: 'Sistema operativo', opts: ['Windows', 'Mac OS', 'FreeDOS', 'Google Chrome', 'Linux', 'Android'], info: 'Es el programa base que hace funcionar la laptop y sus aplicaciones.' },
    color: { tab: 'car', chip: 'Color', label: 'Color', otherColors: { Rojo: '#e00000', Naranja: '#ff8a00', Morado: '#7b2fbe', 'Marrón': '#7a4a21', Beige: '#e8d8b9', Vinotinto: '#722f37' }, colors: [['Gris claro', '#e1e1e1'], ['Negro', '#000'], ['Plateado', '#cbcfd0'], ['Azul', '#1717ff'], ['Blanco', '#fff'], ['Dorado', '#ffd700'], ['Rosado', '#fcb1be'], ['Celeste', '#83ddff'], ['Verde', '#0da600'], ['Amarillo', '#ffed00']], other: ['Rojo', 'Naranja', 'Morado', 'Marrón', 'Beige', 'Vinotinto'] },
    vendedor: { tab: 'ven', chip: 'Vendedor', label: 'Experiencia de vendedor', linkLabel: 'Limpiar', all: 'Todos', opts: ['+50', '+100', '+500', '+1000', '+2000', '+3000', '+5000'] },
    opiniones: { tab: 'ven', chip: 'Opiniones', label: 'Opiniones de producto', linkLabel: 'Limpiar', all: 'Todos', stars: true, opts: ['1★', '2★', '3★', '4★', '5★'] }
  };
  var PRICE_MIN = 500000, PRICE_MAX = 8000000, PRICE_STEP = 100000;
  // el slider usa escala de raíz cuadrada (más resolución en precios bajos; así $2M queda a ~45% como en el diseño)
  function pToPos(v) { return Math.round(Math.sqrt((v - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 1000); }
  function pToVal(pos) { var r = pos / 1000; return Math.round((PRICE_MIN + (PRICE_MAX - PRICE_MIN) * r * r) / PRICE_STEP) * PRICE_STEP; }
  var PRICE_PRESETS = [['Hasta $2 M', 500000, 2000000], ['$2 M – $4 M', 2000000, 4000000], ['$4 M – $6 M', 4000000, 6000000], ['Más de $6 M', 6000000, 8000000]];
  var PRESETS = {
    'Para diseño gráfico': { gama: 'Alta', procesador: ['Core i7', 'Ryzen 7'], ram: ['24 GB', '32 GB'], disco: ['1 TB'], grafica: ['RTX 4060', 'RTX 5060'], pantalla: ['QHD / 2K / WQXGA', '4K - Ultra HD'], price: [3000000, 7000000] },
    'Para modelado 3D': { gama: 'Alta', procesador: ['Core i9', 'Ryzen 9'], ram: ['32 GB', '64 GB'], disco: ['1 TB', '2 TB o más'], grafica: ['RTX 5070', 'RTX 5070 Ti'], pantalla: ['QHD / 2K / WQXGA'], price: [4000000, 8000000] },
    'Para juegos': { gama: 'Alta', procesador: ['Core i7', 'Ryzen 7'], ram: ['24 GB', '32 GB'], disco: ['1 TB'], grafica: ['RTX 5060', 'RTX 5070', 'RX 9060'], pantalla: ['120 Hz o más'], price: [3000000, 6000000] },
    'Para oficina': { gama: 'Media', procesador: ['Core i5', 'Ryzen 5'], ram: ['8 GB', '12 GB'], disco: ['256 GB', '512 GB'], grafica: ['Intel Iris Xe'], pantalla: ['Full HD'], price: [500000, 2000000] },
    'Ultrarrápidos': { gama: 'Alta', procesador: ['Core i9', 'Core Ultra 7', 'Ryzen 9'], ram: ['32 GB', '64 GB'], disco: ['2 TB o más', '4 TB'], grafica: ['RTX 5080', 'RTX 5090'], pantalla: ['QHD / 2K / WQXGA', '120 Hz o más'], price: [5000000, 8000000] },
    'Equilibrio precio/potencia': { gama: 'Media', procesador: ['Core i5', 'Ryzen 5'], ram: ['12 GB', '24 GB'], disco: ['512 GB'], grafica: ['RTX 4050', 'Radeon 890M'], pantalla: ['Full HD'], price: [2000000, 4000000] }
  };
  var CITIES = ['Cali', 'Bogotá', 'Medellín', 'Barranquilla', 'Cartagena'];

  /* ---------- estado ---------- */
  var state = {
    open: { env: false, car: true, ven: false },
    f: { gama: ['Alta'], marca: ['Lenovo'], procesador: ['Core i7'], ram: ['24 GB'], grafica: ['RTX 5060'], disco: ['2 TB o más'] },
    price: { min: 2000000, max: 8000000, touched: false },
    more: {},
    sel: []
  };
  var MAX_CMP = 4;

  /* =========================================================
     SIDEBAR (se construye una vez; luego solo se sincroniza)
     ========================================================= */
  var sidebar = $('#sidebar');
  var refs = { acc: {}, badge: {}, opt: {}, lnk: {}, brand: {}, sw: {}, sel: {} };

  function infoIcon(text) {
    var s = el('span', 'info', I.info); s.tabIndex = 0; s.setAttribute('data-tip', text); s.setAttribute('aria-label', text); return s;
  }

  function buildOptButton(secId, value, extra) {
    var b = el('button', 'opt' + (extra && extra.info ? ' has-i' : ''));
    b.type = 'button'; b.dataset.sec = secId; b.dataset.val = value;
    var label = el('span', '', String(value).replace('★', ''));
    b.appendChild(label);
    if (extra && extra.star || /★/.test(value)) b.insertAdjacentHTML('beforeend', '<svg class="st" width="11" height="10" viewBox="0 0 11 10" aria-hidden="true"><path d="M5.5.4l1.5 3.1 3.4.5-2.5 2.4.6 3.4-3-1.6-3 1.6.6-3.4L.6 4l3.4-.5z" fill="currentColor"/></svg>');
    if (extra && extra.count) label.insertAdjacentHTML('beforeend', ' <span class="cnt">(' + extra.count + ')</span>');
    if (extra && extra.info) b.appendChild(infoIcon(extra.info));
    (refs.opt[secId] = refs.opt[secId] || []).push(b);
    return b;
  }

  function blockHeader(secId, sec) {
    var h = el('div', 'blk-h'), t = el('h3', '', '<span>' + sec.label + '</span>');
    if (sec.info) t.appendChild(infoIcon(sec.info));
    var lnk = el('button', 'lnk', sec.linkLabel || ((sec.all && secId !== 'marca') ? 'Limpiar' : 'Limpiar')); lnk.type = 'button'; lnk.dataset.clear = secId;
    refs.lnk[secId] = lnk;
    h.appendChild(t); h.appendChild(lnk);
    return h;
  }

  var LOGOS = { Lenovo: ['Lenovo', '#e2231a'], HP: ['hp', '#0096d6'], Asus: ['ASUS', '#00539b'], Dell: ['DELL', '#007db8'], Apple: ['<svg viewBox="0 0 24 24" width="18" height="18" fill="#111"><path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.100-1.600-2.800-1.800-3.400-1.800-1.400-.1-2.800.9-3.500.9-.7 0-1.900-.8-3.100-.8-1.600 0-3.100.9-3.900 2.400-1.700 2.900-.4 7.200 1.200 9.600.8 1.200 1.800 2.500 3 2.400 1.200 0 1.700-.8 3.100-.8 1.500 0 1.900.8 3.100.8 1.300 0 2.100-1.200 2.900-2.300.9-1.300 1.300-2.600 1.300-2.700-.1 0-2.700-1-2.700-4.200zM14.100 5.700c.6-.8 1.100-1.900.9-3-.9 0-2.100.6-2.700 1.400-.6.700-1.100 1.800-1 2.900 1.100.1 2.200-.5 2.800-1.300z"/></svg>', '#111'], Acer: ['acer', '#83b81a'], MSI: ['MSI', '#e60012'], eMachines: ['eMachines', '#6c2c8f'], Samsung: ['SAMSUNG', '#1428a0'], Huawei: ['HUAWEI', '#cf0a2c'], Gigabyte: ['GIGABYTE', '#1d1d1b'] };
  function brandTile(secId, o) {
    var lg = LOGOS[o] || [o, '#333'];
    var IMG = { Lenovo: 1, HP: 1, Asus: 1, Dell: 1, Apple: 1, Acer: 1, MSI: 1, eMachines: 1 };
    var inner = IMG[o] ? '<span class="lg"><img src="imagenes/' + o.toLowerCase() + '.png" alt=""></span>' : '<span class="lg" style="color:' + lg[1] + '">' + lg[0] + '</span>';
    var b = el('button', 'brand', inner + '<span class="nm">' + o + '</span>');
    b.type = 'button'; b.dataset.sec = secId; b.dataset.val = o; refs.brand[secId].push(b); return b;
  }

  function divider() { return el('hr', 'sep'); }

  /* menú desplegable "Otro" (703:9467 en Figma) */
  function buildSelect(secId) {
    var b = el('button', 'dsel', '<span class="dsel-t">Otro</span><svg class="dsel-c" viewBox="0 0 11 6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M.7.7 5.5 5.3 10.3.7"/></svg>');
    b.type = 'button'; b.dataset.sel = secId; b.setAttribute('aria-haspopup', 'listbox'); b.setAttribute('aria-expanded', 'false');
    refs.sel[secId] = b; return b;
  }

  /* una sección (título + opciones + extras + "Otro" + "Ver más") */
  function buildSection(secId, withDivider) {
    var sec = SEC[secId], root = el('div', 'sec'); root.dataset.sec = secId;

    if (sec.price) {
      var h = el('div', 'blk-h'); h.appendChild(el('h3', '', '<span>Precio</span>'));
      var q = el('button', 'lnk', 'Limpiar'); q.type = 'button'; q.dataset.clear = 'precio'; refs.lnk.precio = q; h.appendChild(q);
      root.appendChild(h);
      var wrap = el('div', 'sec-sep');
      var hist = el('div', 'hist'); hist.id = 'hist';
      [7, 7, 7, 15, 15, 15, 22, 22, 22, 22, 27, 34, 39, 48, 58].forEach(function (px) { var i = el('i'); i.style.height = px + 'px'; hist.appendChild(i); });
      var rng = el('div', 'rng', '<div class="track"></div><div class="fill" id="pfill"></div>' +
        '<input id="pmin" type="range" min="0" max="1000" step="1" aria-label="Precio mínimo">' +
        '<input id="pmax" type="range" min="0" max="1000" step="1" aria-label="Precio máximo">');
      var boxes = el('div', 'prices', '<label class="pbox"><input id="plo" type="text" inputmode="numeric" autocomplete="off" spellcheck="false" aria-label="Precio mínimo"></label><label class="pbox"><input id="phi" type="text" inputmode="numeric" autocomplete="off" spellcheck="false" aria-label="Precio máximo"></label>');
      var g = el('div'); g.appendChild(hist); g.appendChild(rng); g.appendChild(boxes);
      wrap.appendChild(g);
      var ml = el('button', 'more-link', 'Ofertas y descuentos'); ml.type = 'button'; ml.dataset.offers = '1';
      wrap.appendChild(ml);
      root.appendChild(wrap);
      return root;
    }

    root.appendChild(blockHeader(secId, sec));
    var body = el('div', 'sec-body'), ex = null;

    if (sec.brands) {
      refs.brand[secId] = [];
      var grid = el('div', 'brands');
      var all = el('button', 'brand all', '<span class="nm">' + sec.all + '</span>'); all.type = 'button'; all.dataset.sec = secId; all.dataset.val = '';
      refs.brand[secId].push(all); grid.appendChild(all);
      sec.opts.forEach(function (o) { grid.appendChild(brandTile(secId, o)); });
      body.appendChild(grid);
      if (sec.extra) {
        ex = el('div', 'extra'); var ei = el('div'), eg = el('div', 'brands');
        sec.extra.forEach(function (o) { eg.appendChild(brandTile(secId, o)); });
        ei.appendChild(eg); ex.appendChild(ei); body.appendChild(ex);
      }
    } else if (sec.colors) {
      var swr = el('div', 'swatches');
      sec.colors.forEach(function (c) {
        var sw = el('button', 'sw'); sw.type = 'button'; sw.style.background = c[1]; sw.title = c[0]; sw.setAttribute('aria-label', c[0]);
        sw.dataset.sec = secId; sw.dataset.val = c[0]; (refs.sw[secId] = refs.sw[secId] || []).push(sw); swr.appendChild(sw);
      });
      body.appendChild(swr);
    } else {
      var opts = el('div', 'opts' + (secId === 'estado' ? ' tight' : ''));
      if (sec.all) { var a = buildOptButton(secId, sec.all, { count: sec.allCount, star: sec.stars }); a.dataset.val = ''; a.dataset.all = '1'; opts.appendChild(a); }
      sec.opts.forEach(function (o, i) { opts.appendChild(buildOptButton(secId, o, { count: sec.counts && sec.counts[i], info: sec.optInfo && sec.optInfo[o] })); });
      body.appendChild(opts);
      if (sec.extra) {
        ex = el('div', 'extra'); var ei2 = el('div'), box = el('div', 'opts');
        sec.extra.forEach(function (o) { box.appendChild(buildOptButton(secId, o, { info: sec.optInfo && sec.optInfo[o] })); });
        ei2.appendChild(box); ex.appendChild(ei2); body.appendChild(ex);
      }
    }
    if (ex) ex.dataset.extra = secId;
    root.appendChild(body);

    if (sec.other) root.appendChild(buildSelect(secId));

    if (sec.extra) {
      var mw = el('div', 'more-wrap');
      var link = el('button', 'ver-mas', 'Ver más'); link.type = 'button'; link.dataset.more = secId; link.setAttribute('aria-expanded', 'false');
      if (sec.sepFirst) mw.appendChild(divider());
      mw.appendChild(link);
      if (!sec.sepFirst && (withDivider || sec.sepAfter)) mw.appendChild(divider());
      root.appendChild(mw);
    } else if (withDivider) {
      root.appendChild(divider());
    }
    return root;
  }

  function buildPanel(ids) {
    var blk = el('section', 'blk' + (ids.length > 1 ? ' grp' : '') + (ids.indexOf('precio') > -1 ? ' blk-w' : ''));
    ids.forEach(function (id, i) { blk.appendChild(buildSection(id, i < ids.length - 1)); });
    return blk;
  }

  function buildEnvio() {
    var w = el('div', 'envc'), sec = SEC.envio;
    var data = [
      ['Gratis con Meli+', '<span><span class="tag-meli">meli+</span><b>te da envío gratis</b><small>En carritos desde $60.000</small></span>', ''],
      ['Gratis en carritos desde $60.000', '<span><b>Envío gratis</b> en carritos desde $60.000</span>', '<span class="tag-full">⚡ FULL</span>'],
      ['Envío local', '<span>Envío local</span>', ''],
      ['Envío gratis', '<span>Envío gratis</span>', '']
    ];
    data.forEach(function (d) {
      var b = el('button', 'ec', d[1] + d[2]); b.type = 'button'; b.dataset.sec = 'envio'; b.dataset.val = d[0];
      (refs.opt.envio = refs.opt.envio || []).push(b); w.appendChild(b);
    });
    var r = el('div', 'ec', '<span>Retiro gratis en<div class="selbox" style="min-width:200px"><span id="cityLbl">Elige una ciudad</span>' + I.dn +
      '<select id="citySel" aria-label="Ciudad"><option value="">Elige una ciudad</option>' + CITIES.map(function (c) { return '<option>' + c + '</option>'; }).join('') + '</select></div></span>');
    r.style.cursor = 'default'; r.dataset.city = '1'; refs.cityRow = r; w.appendChild(r);
    return w;
  }

  function buildTab(tabId) {
    var t = TAB[tabId], acc = el('div', 'acc' + (tabId === 'env' ? ' env' : '')); acc.dataset.tab = tabId;
    var btn = el('button', 'acc-btn'); btn.type = 'button'; btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span class="acc-l">' + t.icon + '<span class="acc-t">' + t.title + '</span></span>' +
      '<span class="acc-r"><span class="badge zero">0</span>' + I.ac + '</span>';
    var body = el('div', 'acc-body'), inn = el('div', 'acc-in'), pad = el('div', 'acc-pad');
    if (tabId === 'env') pad.appendChild(buildEnvio());
    else (t.layout || t.secs.map(function (x) { return [x]; })).forEach(function (g) { pad.appendChild(buildPanel(Array.isArray(g) ? g : [g])); });
    inn.appendChild(pad); body.appendChild(inn);
    acc.appendChild(btn); acc.appendChild(body);
    refs.acc[tabId] = acc; refs.badge[tabId] = $('.badge', btn);
    btn.addEventListener('click', function () { state.open[tabId] = !state.open[tabId]; syncAcc(); });
    return acc;
  }

  sidebar.appendChild(el('div', 'sb-shade')); // sombra superior al desplazar los filtros
  ORDER.forEach(function (t) { sidebar.appendChild(buildTab(t)); });

  /* ---------- Publicidad (Figma 703:9741): réplicas en código; si existen img/publicidad-1.png y -2.png, se usan encima ---------- */
  var adBox = el('section', 'ads'); adBox.setAttribute('aria-label', 'Publicidad');
  adBox.innerHTML =
    '<p class="ads-t">Publicidad</p>' +
    '<a class="ad ad1" href="#" aria-label="Hot Sale Tecnología — Paga hasta en 12 cuotas 0% interés"><img src="imagenes/publicidad%201.png" alt="Hot Sale Tecnología"></a>' +
    '<a class="ad ad2" href="#" aria-label="Ventiladores muy hot — Renueva y ahorra hasta 40% off"><img src="imagenes/publicidad%202.png" alt="Ventiladores muy hot"></a>';
  sidebar.appendChild(adBox);

  /* ---------- sincronizar sidebar con el estado ---------- */
  function fv(sid) { return state.f[sid] || []; }
  function hasF(sid, v) { return fv(sid).indexOf(v) > -1; }
  function applied(secId) {
    if (secId === 'precio') return state.price.touched;
    return !!state.f[secId];
  }
  function appliedCount(tabId) { return TAB[tabId].secs.filter(applied).length; }

  function syncAcc() {
    ORDER.forEach(function (t) {
      var a = refs.acc[t], open = !!state.open[t];
      a.classList.toggle('open', open);
      $('.acc-btn', a).setAttribute('aria-expanded', open);
      // evita tabulación dentro de paneles cerrados
      if ('inert' in a) $('.acc-body', a).inert = !open;
    });
  }

  function syncSidebar() {
    Object.keys(refs.opt).forEach(function (sid) {
      refs.opt[sid].forEach(function (b) {
        var on = b.dataset.all ? (sid === 'gama' ? !fv('gama').some(function (x) { return !PRESETS[x]; }) : !state.f[sid]) : hasF(sid, b.dataset.val);
        b.classList.toggle('on', on); b.setAttribute('aria-pressed', on);
      });
    });
    Object.keys(refs.brand).forEach(function (sid) {
      refs.brand[sid].forEach(function (b) { b.classList.toggle('on', b.dataset.val ? hasF(sid, b.dataset.val) : !state.f[sid]); });
    });
    Object.keys(refs.sw).forEach(function (sid) { refs.sw[sid].forEach(function (b) { b.classList.toggle('on', hasF(sid, b.dataset.val)); }); });
    Object.keys(refs.sel).forEach(function (sid) {
      var btn = refs.sel[sid], ov = fv(sid).filter(function (x) { return SEC[sid].other.indexOf(x) > -1; }), isOther = ov.length > 0;
      $('.dsel-t', btn).textContent = isOther ? ov[0] + (ov.length > 1 ? ' +' + (ov.length - 1) : '') : 'Otro';
      btn.classList.toggle('on', isOther);
    });
    Object.keys(refs.lnk).forEach(function (sid) { refs.lnk[sid].classList.toggle('hide', !applied(sid)); });
    // tarjetas de envío
    if (refs.cityRow) {
      var cityV = fv('envio').filter(function (x) { return x.indexOf('Retiro gratis en ') === 0; })[0]; var city = cityV ? cityV.slice(17) : '';
      $('#cityLbl').textContent = city || 'Elige una ciudad';
      $('#citySel').value = city;
      refs.cityRow.classList.toggle('on', !!city);
    }
    // contadores
    ORDER.forEach(function (t) {
      var n = appliedCount(t), b = refs.badge[t], prev = +b.textContent;
      b.textContent = n; b.classList.toggle('zero', n === 0);
      if (n !== prev && n > 0) { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }
    });
    // precio
    var mn = $('#pmin'), mx = $('#pmax'), p = state.price;
    mn.value = pToPos(p.min); mx.value = pToPos(p.max);
    var lo = $('#plo'), hi = $('#phi');
    if (document.activeElement !== lo) lo.value = fmt(p.min);
    if (document.activeElement !== hi) hi.value = fmt(p.max);
    var l = pToPos(p.min) / 10, r = pToPos(p.max) / 10;
    var fill = $('#pfill'); fill.style.left = l + '%'; fill.style.width = (r - l) + '%';
    $$('#hist i').forEach(function (bar, i, all) {
      var s0 = i / all.length * 100, e0 = (i + 1) / all.length * 100;
      bar.classList.toggle('out', e0 <= l || s0 >= r);
    });
  }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  sidebar.addEventListener('scroll', function () { sidebar.classList.toggle('scrolled', sidebar.scrollTop > 2); }, { passive: true });
  /* ---------- eventos del sidebar ---------- */
  function applyPreset(name) {
    var P = PRESETS[name];
    ['procesador', 'ram', 'disco', 'grafica', 'pantalla'].forEach(function (k) {
      if (P[k]) state.f[k] = P[k].slice(); else delete state.f[k];
      var ex = $('[data-extra="' + k + '"]', sidebar), m = $('[data-more="' + k + '"]', sidebar);
      if (ex && m && SEC[k].extra && P[k] && P[k].some(function (v) { return SEC[k].extra.indexOf(v) > -1; })) {
        state.more[k] = true; ex.classList.add('show'); m.textContent = 'Ver menos'; m.setAttribute('aria-expanded', true);
      }
    });
    state.f.gama = [name];
    state.price = { min: P.price[0], max: P.price[1], touched: true };
    update();
  }
  function setFilter(secId, val) {
    if (secId === 'gama' && PRESETS[val] && !hasF('gama', val)) { applyPreset(val); return; }
    if (secId === 'gama' && !val) {
      var keep = fv('gama').filter(function (x) { return PRESETS[x]; });
      if (keep.length) state.f.gama = keep; else delete state.f.gama;
    } else if (!val) delete state.f[secId];
    else {
      var arr = fv(secId).slice(), i = arr.indexOf(val);
      if (secId === 'gama' && !PRESETS[val]) arr = arr.filter(function (x) { return !PRESETS[x]; });
      if (i > -1) arr.splice(i, 1);
      else {
        if (val.indexOf('Retiro gratis en ') === 0) arr = arr.filter(function (x) { return x.indexOf('Retiro gratis en ') !== 0; });
        arr.push(val);
      }
      if (arr.length) state.f[secId] = arr; else delete state.f[secId];
    }
    update();
  }
  sidebar.addEventListener('click', function (e) {
    if (e.target.closest('.info')) return;
    var o = e.target.closest('[data-sec][data-val]');
    if (o && !o.closest('[data-city]')) {
      var sid = o.dataset.sec, v = o.dataset.val;
      setFilter(sid, v);
      return;
    }
    var c = e.target.closest('[data-clear]');
    if (c) { clearSec(c.dataset.clear); return; }
    var d = e.target.closest('[data-sel]');
    if (d) { toggleSel(d); return; }
    var m = e.target.closest('[data-more]');
    if (m) {
      var id = m.dataset.more, on = !state.more[id]; state.more[id] = on;
      $('[data-extra="' + id + '"]', sidebar).classList.toggle('show', on);
      m.textContent = on ? 'Ver menos' : 'Ver más'; m.setAttribute('aria-expanded', on);
    }
  });
  $('#citySel', sidebar).addEventListener('change', function (e) {
    var arr = fv('envio').filter(function (x) { return x.indexOf('Retiro gratis en ') !== 0; });
    if (e.target.value) arr.push('Retiro gratis en ' + e.target.value);
    if (arr.length) state.f.envio = arr; else delete state.f.envio;
    update();
  });

  function clearSec(secId) {
    if (secId === 'precio') { state.price = { min: 2000000, max: 8000000, touched: false }; update(); return; }
    delete state.f[secId]; update();
  }

  var pmin = $('#pmin'), pmax = $('#pmax');
  function onPrice(which) {
    var a = pToVal(+pmin.value), b = pToVal(+pmax.value);
    if (which === 'min' && a > b - PRICE_STEP) a = b - PRICE_STEP;
    if (which === 'max' && b < a + PRICE_STEP) b = a + PRICE_STEP;
    state.price = { min: a, max: b, touched: true }; update();
  }
  // campos de precio editables: al confirmar (Enter o al salir) se mueve el slider
  function commitPrice(which, inp) {
    var raw = inp.value.replace(/\D/g, ''), p = state.price;
    if (raw) {
      var v = Math.max(PRICE_MIN, Math.min(PRICE_MAX, parseInt(raw, 10)));
      var a = p.min, b = p.max;
      if (which === 'min') a = Math.min(v, b - PRICE_STEP); else b = Math.max(v, a + PRICE_STEP);
      if (a !== p.min || b !== p.max) state.price = { min: a, max: b, touched: true };
    }
    update(); inp.value = fmt(which === 'min' ? state.price.min : state.price.max);
  }
  [['min', '#plo'], ['max', '#phi']].forEach(function (d) {
    var inp = $(d[1]);
    inp.addEventListener('focus', function () { inp.select(); });
    inp.addEventListener('input', function () { inp.value = inp.value.replace(/[^\d$.]/g, ''); });
    inp.addEventListener('blur', function () { commitPrice(d[0], inp); });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); inp.blur(); }
      else if (e.key === 'Escape') { inp.value = fmt(d[0] === 'min' ? state.price.min : state.price.max); inp.blur(); }
    });
  });
  pmin.addEventListener('input', function () { onPrice('min'); });
  pmax.addEventListener('input', function () { onPrice('max'); });
  // el thumb superior se coloca encima cuando se alcanzan en el extremo
  pmin.style.zIndex = 2; pmax.style.zIndex = 3;

  /* =========================================================
     CHIPS (barra sticky)
     ========================================================= */
  var chipsEl = $('#chips'), chipMap = {};

  function chipData() {
    var out = [];
    Object.keys(SEC).forEach(function (sid) {
      if (!applied(sid)) return;
      var s = SEC[sid];
      if (sid === 'precio') out.push({ id: sid, sec: s.chip, opt: short(state.price.min) + ' – ' + short(state.price.max) });
      else { var L = fv(sid).map(function (x) { return x.replace('Retiro gratis en ', 'Retiro '); }); out.push({ id: sid, sec: s.chip, opt: L[0] + (L.length > 1 ? ' +' + (L.length - 1) : '') }); }
    });
    return out;
  }

  function renderChips() {
    var data = chipData(), keep = {};
    data.forEach(function (d) {
      keep[d.id] = 1;
      var c = chipMap[d.id];
      if (!c) {
        c = el('div', 'chip'); c.dataset.id = d.id; c.tabIndex = 0;
        c.innerHTML = '<span class="c-lbl"></span><span class="c-chev">' + I.chevS + '</span><span class="c-div"></span><button class="c-x" type="button" aria-label="Quitar filtro">' + I.x + '</button>';
        chipMap[d.id] = c;
      }
      $('.c-lbl', c).innerHTML = '<span class="c-sec">' + d.sec + '</span> <span class="c-opt">' + d.opt + '</span>';
      c.classList.remove('out');
      chipsEl.appendChild(c); // mantiene el orden definido
    });
    // orden estable según SEC
    data.forEach(function (d) { chipsEl.appendChild(chipMap[d.id]); });
    Object.keys(chipMap).forEach(function (id) {
      if (keep[id]) return;
      var c = chipMap[id]; delete chipMap[id];
      if (openChip === id) closeDD(true);
      c.classList.add('out'); setTimeout(function () { c.remove(); }, 200);
    });
    var empty = $('.tb-empty', chipsEl);
    if (!data.length && !empty) chipsEl.appendChild(el('div', 'chip tb-empty', '<span class="c-lbl">Sin filtros aplicados</span>'));
    if (data.length && empty) empty.remove();
    $('#clearAll').disabled = !data.length;
  }

  chipsEl.addEventListener('click', function (e) {
    var x = e.target.closest('.c-x');
    if (x) { var id = x.closest('.chip').dataset.id; clearSec(id); }
  });

  /* ---------- dropdown al pasar el cursor ---------- */
  var dd = $('#dd'), openChip = null, ddTimer = null;
  function openDD(chip) {
    clearTimeout(ddTimer);
    var id = chip.dataset.id, s = SEC[id];
    if (openChip === id) return;
    openChip = id; $$('.chip.open').forEach(function (c) { c.classList.remove('open'); });
    chip.classList.add('open');
    dd.className = 'dd'; dd.style.width = ''; dd.style.maxHeight = '';
    dd.innerHTML = ''; dd.appendChild(el('div', 'dd-h', 'Cambiar ' + (s.label || s.chip).toLowerCase()));
    if (s.price) {
      PRICE_PRESETS.forEach(function (p) {
        var on = state.price.min === p[1] && state.price.max === p[2];
        var b = el('button', 'dd-i' + (on ? ' on' : ''), p[0]); b.type = 'button';
        b.addEventListener('click', function () { state.price = { min: p[1], max: p[2], touched: true }; update(); closeDD(true); });
        dd.appendChild(b);
      });
    } else {
      var all = s.opts.concat(s.uso || [], s.extra || [], s.other || []);
      if (id === 'envio') all = s.opts.filter(function (o) { return o !== 'Retiro gratis'; }).concat(CITIES.map(function (c) { return 'Retiro gratis en ' + c; }));
      all.forEach(function (o) {
        var on = hasF(id, o);
        var b = el('button', 'dd-i' + (on ? ' on' : ''), (id === 'envio' ? o.replace('Retiro gratis en ', 'Retiro en ') : o)); b.type = 'button'; b.setAttribute('role', 'option');
        b.addEventListener('click', function () {
          setFilter(id, o);
          if (state.f[id]) [].forEach.call(dd.querySelectorAll('.dd-i'), function (x, k) { x.classList.toggle('on', hasF(id, all[k])); });
        });
        dd.appendChild(b);
      });
    }
    dd.hidden = false;
    var r = chip.getBoundingClientRect();
    var left = Math.min(r.left, window.innerWidth - dd.offsetWidth - 12);
    dd.style.left = Math.max(8, left) + 'px'; dd.style.top = (r.bottom + 6) + 'px';
    requestAnimationFrame(function () { dd.classList.add('show'); });
  }
  var selOpen = null;
  function closeDD(now) {
    clearTimeout(ddTimer);
    if (selOpen) return;
    var run = function () {
      dd.classList.remove('show'); $$('.chip.open').forEach(function (c) { c.classList.remove('open'); });
      openChip = null;
      setTimeout(function () { if (!openChip && !selOpen) dd.hidden = true; }, 170);
    };
    if (now) run(); else ddTimer = setTimeout(run, 140);
  }
  chipsEl.addEventListener('mouseover', function (e) { var c = e.target.closest('.chip'); if (c && !c.classList.contains('out') && !c.classList.contains('tb-empty')) openDD(c); });
  chipsEl.addEventListener('mouseout', function (e) { var c = e.target.closest('.chip'); if (c && !c.contains(e.relatedTarget)) closeDD(); });
  chipsEl.addEventListener('focusin', function (e) { var c = e.target.closest('.chip'); if (c) openDD(c); });
  dd.addEventListener('mouseenter', function () { clearTimeout(ddTimer); });
  dd.addEventListener('mouseleave', function () { closeDD(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeSel(); closeDD(true); hideToast(); } });
  window.addEventListener('scroll', function () { if (openChip) closeDD(true); closeSel(); }, { passive: true });

  /* ---------- menú desplegable "Otro" del panel de filtros ---------- */
  function closeSel() {
    if (!selOpen) return;
    var b = refs.sel[selOpen]; b.classList.remove('open'); b.setAttribute('aria-expanded', 'false');
    selOpen = null; dd.classList.remove('show', 'dd-sel');
    setTimeout(function () { if (!selOpen && !openChip) dd.hidden = true; }, 170);
  }
  function toggleSel(btn) {
    var id = btn.dataset.sel;
    if (selOpen === id) { closeSel(); return; }
    closeSel(); closeDD(true);
    selOpen = id; hideTip();
    var s = SEC[id];
    btn.classList.add('open'); btn.setAttribute('aria-expanded', 'true');
    dd.innerHTML = ''; dd.className = 'dd dd-sel';
    s.other.forEach(function (o) {
      var on = hasF(id, o);
      var it = el('button', 'dd-i' + (on ? ' on' : ''), s.otherColors ? '<span class="dd-sw" style="background:' + s.otherColors[o] + '"></span><span class="dd-t">' + o + '</span>' : o); it.type = 'button'; it.setAttribute('role', 'option');
      it.addEventListener('click', function () { setFilter(id, o); it.classList.toggle('on', hasF(id, o)); });
      dd.appendChild(it);
    });
    dd.hidden = false;
    var r = btn.getBoundingClientRect();
    dd.style.width = r.width + 'px'; dd.style.left = r.left + 'px';
    var h = Math.min(dd.scrollHeight, 240), below = window.innerHeight - r.bottom;
    dd.style.maxHeight = '240px';
    dd.style.top = (below < h + 16 && r.top > h + 16 ? r.top - h - 6 : r.bottom + 6) + 'px';
    requestAnimationFrame(function () { dd.classList.add('show'); });
  }
  document.addEventListener('click', function (e) { if (selOpen && !e.target.closest('[data-sel]') && !dd.contains(e.target)) closeSel(); });
  sidebar.addEventListener('scroll', closeSel, { passive: true });
  window.addEventListener('resize', closeSel);
  chipsEl.addEventListener('scroll', function () { if (openChip) closeDD(true); }, { passive: true });

  $('#clearAll').addEventListener('click', function () {
    state.f = {}; state.price = { min: 2000000, max: 8000000, touched: false }; update();
  });

  /* =========================================================
     TOOLTIPS de info
     ========================================================= */
  var tip = $('#tip');
  function showTip(t) {
    tip.textContent = t.getAttribute('data-tip'); tip.hidden = false; tip.classList.remove('below');
    var r = t.getBoundingClientRect(), w = tip.offsetWidth, h = tip.offsetHeight;
    var left = Math.max(8, Math.min(window.innerWidth - w - 8, r.left + r.width / 2 - w / 2));
    var top = r.top - h - 10;
    if (top < 8) { top = r.bottom + 10; tip.classList.add('below'); }
    tip.style.left = left + 'px'; tip.style.top = top + 'px';
    tip.style.setProperty('--ax', (r.left + r.width / 2 - left) + 'px');
    requestAnimationFrame(function () { tip.classList.add('show'); });
  }
  function hideTip() { tip.classList.remove('show'); setTimeout(function () { if (!tip.classList.contains('show')) tip.hidden = true; }, 160); }
  sidebar.addEventListener('mouseover', function (e) { var t = e.target.closest('.info'); if (t) showTip(t); });
  sidebar.addEventListener('mouseout', function (e) { var t = e.target.closest('.info'); if (t && !t.contains(e.relatedTarget)) hideTip(); });
  sidebar.addEventListener('focusin', function (e) { var t = e.target.closest('.info'); if (t) showTip(t); });
  sidebar.addEventListener('focusout', hideTip);
  sidebar.addEventListener('scroll', hideTip, { passive: true });

  /* =========================================================
     GRILLA DE PRODUCTOS + comparar
     ========================================================= */
  var grid = $('#grid'), cards = {};

  function fmtP(n) { return '$ ' + n.toLocaleString('es-CO'); }
  function buildCard(p) {
    var c = el('article', 'card'); c.dataset.id = p.id;
    c.innerHTML =
      '<div class="c-img">' + lapImg(p) +
      (p.tag ? '<span class="c-tag ' + (p.tag[1] || '') + '">' + p.tag[0] + '</span>' : '') +
      '<button class="c-fav" type="button" aria-label="Agregar a favoritos">' + I.heart + '</button></div>' +
      '<div class="c-body"><p class="c-t">' + p.t + '</p><p class="c-r">' + p.r + '</p>' +
      '<p class="c-old">' + fmtP(p.o) + '</p>' +
      '<div class="c-price"><b>' + fmtP(p.p) + '</b><span class="c-off">' + p.d + '% OFF</span></div>' +
      '<p class="c-q">' + p.q + '</p>' + (p.cup ? '<p class="c-cup">' + p.cup + '</p>' : '') +
      '<p class="c-env">' + p.e + '</p></div>' +
      '<button class="cmp" type="button" data-tip="Quitar de la lista"><span class="lbl">Comparar</span>' + cmpIcon() + '<svg class="x" width="8" height="8" viewBox="0 0 6 6"><path d="M.5.5l5 5M5.5.5l-5 5" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg></button>';
    $('.cmp', c).addEventListener('click', function () { toggleCompare(p.id); });
    return c;
  }
  PRODUCTS.forEach(function (p) { cards[p.id] = buildCard(p); });

  var baseOrder = PRODUCTS.map(function (p) { return p.id; }), lastShuffle = 0, gridReady = false;
  function shuffleGrid() {
    var now = Date.now(); if (now - lastShuffle < 450) return; lastShuffle = now;
    var prev = baseOrder.join(), tries = 0;
    do { for (var i = baseOrder.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = baseOrder[i]; baseOrder[i] = baseOrder[j]; baseOrder[j] = t; } } while (baseOrder.join() === prev && ++tries < 5);
    renderGrid(true);
  }
  function renderGrid(animate) {
    var first = {};
    if (animate) Object.keys(cards).forEach(function (id) { first[id] = cards[id].getBoundingClientRect(); });
    var order = state.sel.concat(baseOrder.filter(function (id) { return state.sel.indexOf(id) < 0; }));
    order.forEach(function (id) {
      var c = cards[id]; grid.appendChild(c);
      var i = state.sel.indexOf(id);
      c.classList.toggle('sel', i > -1);
      var cmp = $('.cmp', c);
      cmp.setAttribute('aria-pressed', i > -1);
      cmp.setAttribute('aria-label', i > -1 ? 'Quitar de la comparación' : 'Comparar');
    });
    if (typeof renderDock === 'function') renderDock();
    if (!animate) return;
    order.forEach(function (id) {
      var c = cards[id], a = first[id], b = c.getBoundingClientRect();
      var dx = a.left - b.left, dy = a.top - b.top;
      if (!dx && !dy) return;
      c.style.transition = 'none'; c.style.transform = 'translate(' + dx + 'px,' + dy + 'px)'; c.style.zIndex = 2;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          c.style.transition = 'transform .5s cubic-bezier(.3,.7,.2,1), box-shadow .25s, border-color .2s';
          c.style.transform = '';
          setTimeout(function () { c.style.transition = ''; c.style.zIndex = ''; }, 520);
        });
      });
    });
  }

  function toggleCompare(id) {
    var i = state.sel.indexOf(id);
    if (i > -1) { state.sel.splice(i, 1); renderGrid(true); if (state.sel.length < MAX_CMP) hideToast(); else showToast(); return; }
    if (state.sel.length >= MAX_CMP) { showToast(true); return; }
    state.sel.push(id); renderGrid(true);
    if (toastEl.classList.contains('show')) hideToast();
  }


  /* =========================================================
     Mini-ventana de comparación (Figma 678:1165 miniatura · 690:1985 ventana)
     ========================================================= */
  var dock = el('div', 'cdock'); dock.hidden = true;
  dock.innerHTML =
    '<button class="cd-mini" type="button" aria-label="Lista de comparación" aria-haspopup="true">' +
      cmpIcon().replace('class="cmp-ic" width="22" height="16"', 'class="cmp-ic" width="30" height="22.68"') +
      '<span class="cd-badge">0</span></button>' +
    '<section class="cd-panel" aria-label="Lista de comparación">' +
      '<div class="cd-head"><span class="cd-title"><b>Laptop</b><span class="tl"> - Lista de comparación</span></span>' +
      '<button class="cd-link" type="button" disabled aria-disabled="true" title="Próximamente">Guardar lista</button>' +
      '<button class="cd-link cd-clear" type="button">Quitar todo</button></div>' +
      '<div class="cd-items"></div>' +
      '<button class="cd-go" type="button"><span>Comparar</span></button>' +
    '</section>';
  document.body.appendChild(dock);
  var cdItems = $('.cd-items', dock), cdBadge = $('.cd-badge', dock), cdPrev = 0, cdPeekT = null;
  function renderDock() {
    var n = state.sel.length;
    dock.hidden = n === 0;
    cdBadge.textContent = n;
    cdItems.innerHTML = state.sel.map(function (id) {
      var p = PRODUCTS.filter(function (x) { return x.id === id; })[0];
      return '<div class="cd-card" data-id="' + id + '"><div class="cd-img">' + lapImg(p) + '</div>' +
        '<p class="cd-name" data-w="' + p.t.split(' ').filter(function (w) { return !/^[–—-]$/.test(w); }).slice(0, 4).join(' ') + '"></p>' +
        '<button class="cd-x" type="button" data-rm="' + id + '" aria-label="Quitar de la lista">' +
        '<svg width="6" height="6" viewBox="0 0 6 6" aria-hidden="true"><path d="M.5.5l5 5M5.5.5l-5 5" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"/></svg></button></div>';
    }).join('') + new Array(Math.max(0, MAX_CMP - n) + 1).join(
      '<div class="cd-slot" aria-hidden="true"><svg width="105" height="130" viewBox="0 0 105 130"><rect width="105" height="130" rx="4" fill="#d7e7fe"/><path d="M52.500 53v24M40.500 65h24" stroke="#a7cafe" stroke-width="2" stroke-linecap="round" fill="none"/></svg></div>');
    // el nombre se recorta a las palabras que caben completas en 2 líneas
    $$('.cd-name', cdItems).forEach(function (pn) {
      var ws = pn.dataset.w.split(' ');
      pn.style.cssText = '-webkit-line-clamp:unset;max-height:none;overflow:visible';
      do { pn.textContent = ws.join(' '); } while (pn.offsetHeight > 31 && ws.length > 1 && ws.pop());
      pn.style.cssText = '';
    });
    if (n !== cdPrev) { dock.classList.remove('bump'); void dock.offsetWidth; if (n) dock.classList.add('bump'); }
    var go = $('.cd-go', dock); go.disabled = n < 2; go.title = ''; $('span', go).textContent = n < 2 ? 'Comparar (añade dos o más artículos)' : 'Comparar';
    // al elegir el primer artículo, la ventana asoma un momento para que el usuario sepa que está ahí
    if (cdPrev === 0 && n === 1) {
      dock.classList.add('peek'); clearTimeout(cdPeekT);
      cdPeekT = setTimeout(function () { dock.classList.remove('peek'); }, 3000);
    } else if (n === 0) { clearTimeout(cdPeekT); dock.classList.remove('peek'); }
    cdPrev = n;
    if (window.__alignPrice) window.__alignPrice();
  }
  dock.addEventListener('click', function (e) {
    var rm = e.target.closest('[data-rm]');
    if (rm) { var id = +rm.dataset.rm, i = state.sel.indexOf(id); if (i > -1) { state.sel.splice(i, 1); renderGrid(true); hideToast(); } return; }
    if (e.target.closest('.cd-clear')) { state.sel.length = 0; renderGrid(true); hideToast(); return; }
    if (e.target.closest('.cd-mini')) dock.classList.toggle('open'); // táctil: tocar abre/cierra
  });
  document.addEventListener('click', function (e) { if (!dock.contains(e.target)) dock.classList.remove('open'); });

  /* =========================================================
     Ventana de comparación (popup) — Figma 703:9823 · mini 703:8476 · hover 703:8828
     ========================================================= */
  /* especificaciones de ejemplo (dummy) por modelo; algunas filas coinciden entre equipos a propósito para poder usar "Mostrar solo diferencias" */
  var USB1 = '1 x USB Tipo-C, 2 x USB Tipo-A 3.2 Gen 1, 1 x HDMI, Jack de audio 3.5 mm.';
  var USB2 = '1 x USB Tipo-C, 2 x USB Tipo-A 3.2 Gen 1, 1 x USB 2.0, 1 x HDMI, Jack de audio 3.5 mm.';
  var USB3 = '1 x USB Tipo-C, 3 x USB Tipo-A 3.2 Gen 1, 1 x HDMI 2.1, 1 x RJ-45, Jack de audio 3.5 mm.';
  var SSD = 'Unidad de estado sólido (SSD) de ';
  var SEC1 = 'Obturador de privacidad en cámara web.', SEC2 = 'Lector de huellas dactilares y obturador de privacidad en cámara web.', SEC3 = 'Lector de huellas dactilares.';
  var FHD = ' pulgadas, resolución Full HD (1920 x 1080p)';
  function mk(ram, disco, proc, gpu, pant, so, con, pue, seg, gar) { return { ram: ram, disco: disco, proc: proc, gpu: gpu, pant: pant, so: so, con: con, pue: pue, seg: seg, gar: gar }; }
  var SPECS = [
    ['Lenovo V14 G4 AMN', 'Lenovo V14 G4 AMN', mk('16 GB DDR5.', SSD + '512 GB M.2', 'AMD Ryzen 5 7520U (hasta 4.3 GHz)', 'AMD Radeon 610M', '14' + FHD + ' y antirreflejo.', 'FreeDOS', 'Wi-Fi 6 (802.11ax) y Bluetooth 5.2', USB2, SEC1, '1 año')],
    ['Lenovo Ideapad Slim 3 15irh10', 'Lenovo Ideapad Slim 3', mk('16 GB DDR5.', SSD + '512 GB M.2', 'Intel Core i5-13420H (hasta 4.6 GHz)', 'Intel UHD Graphics', '15.6' + FHD + ' y pantalla táctil.', 'Windows 11 Home', 'Wi-Fi 6 (802.11ax) y Bluetooth 5.2', USB1, SEC1, '1 año')],
    ['Portátil Hp 200', 'Portátil Hp 200 G2a', mk('8 GB DDR5.', SSD + '512 GB M.2', 'AMD Ryzen 5 220 (hasta 4.9 GHz)', 'AMD Radeon 740M', '16' + FHD + '.', 'Windows 11 Home', 'Wi-Fi 6 (802.11ax) y Bluetooth 5.3', USB1, SEC3, '1 año')],
    ['Lenovo IdeaPad Slim 3 Core i5', null, mk('8 GB DDR5.', SSD + '512 GB M.2', 'Intel Core i5-13420H (hasta 4.6 GHz)', 'Intel UHD Graphics', '15.6' + FHD + '.', 'Windows 11 Home', 'Wi-Fi 6 (802.11ax) y Bluetooth 5.2', USB1, SEC1, '1 año')],
    ['ASUS Vivobook 15', null, mk('16 GB DDR4.', SSD + '512 GB M.2', 'AMD Ryzen 7 5700U (hasta 4.3 GHz)', 'AMD Radeon Graphics', '15.6' + FHD + ' y antirreflejo.', 'Windows 11 Home', 'Wi-Fi 6 (802.11ax) y Bluetooth 5.2', USB1, SEC3, '1 año')],
    ['Acer Aspire 5', null, mk('16 GB DDR4.', SSD + '1 TB M.2', 'Intel Core i5-1235U (hasta 4.4 GHz)', 'Intel Iris Xe', '15.6' + FHD + ' y antirreflejo.', 'Windows 11 Home', 'Wi-Fi 6 (802.11ax) y Bluetooth 5.1', USB2, SEC2, '2 años')],
    ['HP Victus 15', null, mk('16 GB DDR5.', SSD + '512 GB M.2', 'AMD Ryzen 5 8645HS (hasta 5.0 GHz)', 'NVIDIA GeForce RTX 4050 (6 GB)', '15.6' + FHD + ' y 144 Hz.', 'Windows 11 Home', 'Wi-Fi 6E (802.11ax) y Bluetooth 5.3', USB3, SEC1, '1 año')],
    ['Lenovo LOQ 15', null, mk('16 GB DDR5.', SSD + '1 TB M.2', 'Intel Core i7-13620H (hasta 4.9 GHz)', 'NVIDIA GeForce RTX 4060 (8 GB)', '15.6' + FHD + ' y 144 Hz.', 'Windows 11 Home', 'Wi-Fi 6E (802.11ax) y Bluetooth 5.2', USB3, SEC1, '1 año')],
    ['Dell Inspiron 15', null, mk('16 GB DDR4.', SSD + '512 GB M.2', 'Intel Core i5-1335U (hasta 4.6 GHz)', 'Intel Iris Xe', '15.6' + FHD + ' y antirreflejo.', 'Windows 11 Home', 'Wi-Fi 6 (802.11ax) y Bluetooth 5.2', USB2, SEC2, '1 año')],
    ['MSI Thin 15', null, mk('8 GB DDR4.', SSD + '512 GB M.2', 'Intel Core i5-12450H (hasta 4.4 GHz)', 'NVIDIA GeForce RTX 2050 (4 GB)', '15.6' + FHD + ' y 144 Hz.', 'Windows 11 Home', 'Wi-Fi 6 (802.11ax) y Bluetooth 5.2', USB1, SEC1, '1 año')],
    ['Apple MacBook Air', null, mk('8 GB de memoria unificada.', SSD + '256 GB.', 'Apple M2 de 8 núcleos', 'GPU de 8 núcleos', '13,6 pulgadas, resolución Liquid Retina (2560 x 1664p).', 'macOS', 'Wi-Fi 6 (802.11ax) y Bluetooth 5.3', '2 x Thunderbolt / USB 4, MagSafe 3, Jack de audio 3.5 mm.', 'Touch ID.', '1 año')]
  ];
  var TIPS = {
    ram: SEC.ram.info, disco: SEC.disco.info, pant: SEC.pantalla.info, so: SEC.so.info,
    proc: SEC.procesador.info || 'Es el cerebro de la laptop: define qué tan rápido abre programas y ejecuta tareas.',
    gpu: SEC.grafica.info || 'Se encarga de los gráficos: importante para juegos, edición de video y diseño.'
  };
  var ROWS = [
    { k: 'ram', l: 'RAM', info: 1, one: 1 }, { k: 'disco', l: 'Disco duro', info: 1 }, { k: 'proc', l: 'Procesador', info: 1 },
    { k: 'gpu', l: 'Tarjeta gráfica', info: 1, one: 1 }, { k: 'pant', l: 'Pantalla', info: 1, bul: 1 }, { k: 'so', l: 'Sistema operativo', info: 1, one: 1 },
    { k: 'con', l: 'Conectividad', bul: 1 }, { k: 'pue', l: 'Puertos', bul: 1 }, { k: 'seg', l: 'Seguridad' }, { k: 'gar', l: 'Garantía', one: 1 }
  ];
  var CATS = [
    { id: 'esp', t: 'Especificaciones', rows: ROWS },
    { id: 'ven', t: 'Vendedor y opiniones', rows: [{ k: 'exp', l: 'Exp. de vendedor', one: 1 }, { k: 'ops', l: 'Opiniones', one: 1 }] }
  ];
  function bul(t) {
    var parts = [], cur = '', d = 0, i, ch;
    t = String(t).replace(/\.$/, '');
    for (i = 0; i < t.length; i++) { ch = t[i]; if (ch === '(') d++; if (ch === ')') d--; if (ch === ',' && !d) { parts.push(cur); cur = ''; } else cur += ch; }
    parts.push(cur);
    var res = [];
    parts.forEach(function (p) { p.trim().split(/ y (?![^(]*\))/).forEach(function (q) { q = q.trim(); if (q) res.push(q.charAt(0).toUpperCase() + q.slice(1)); }); });
    return res;
  }
  function cwVal(it, k) {
    if (k === 'exp') { var m = /\+\d+/.exec(it.p.r || ''); return m ? m[0] : '+50'; }
    if (k === 'ops') { var rt = parseFloat(it.p.r) || 4; return 'stars:' + Math.max(1, Math.min(5, Math.floor(rt))); }
    return it.i.spec[k];
  }
  function cwStars(n) {
    var h = '<svg class="cw-stars" width="87" height="10" viewBox="0 0 87 10" aria-label="' + n + ' de 5 estrellas">';
    for (var i = 0; i < 5; i++) h += '<path transform="translate(' + (i * 19.25) + ' 0)" d="M5 0l1.4 3.4 3.600.3-2.750 2.350.85 3.550L5 7.800 1.900 9.600l.85-3.550L0 3.700l3.600-.3z" fill="' + (i < n ? '#3483fa' : '#dddddd') + '"/>';
    return h + '</svg>';
  }
  function cwInfo(p) {
    for (var n = 0; n < SPECS.length; n++) if (p.t.indexOf(SPECS[n][0]) === 0) return { name: SPECS[n][1] || p.t.split(' ').slice(0, 4).join(' '), spec: SPECS[n][2] };
    return { name: p.t.split(' ').slice(0, 4).join(' '), spec: SPECS[0][2] };
  }
  var CW_INFO = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6.6" stroke="#000" stroke-width="1.2"/><circle cx="8" cy="5" r=".85" fill="#000"/><path d="M8 7.3v4" stroke="#000" stroke-width="1.2" stroke-linecap="round"/></svg>';
  var CW_CHEV = '<svg width="7" height="4" viewBox="0 0 7 4" fill="none" aria-hidden="true"><path d="M.5.5 3.5 3.5 6.5.5" stroke="#000" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var CW_TOG = '<span class="cw-tog" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12" stroke="#000" stroke-width="1.4" stroke-linecap="round"/><path class="v" d="M7 1v12" stroke="#000" stroke-width="1.4" stroke-linecap="round"/></svg></span>';
  var CW_SPK2 = '<svg width="20.5" height="23.75" viewBox="0 0 21 24" fill="none" stroke="#f2c500" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M8 7.5c.6 4.500 2.200 6.700 6.800 7.700-4.600 1-6.200 3.200-6.800 7.700-.6-4.500-2.200-6.700-6.800-7.700C5.800 14.200 7.400 12 8 7.500z"/><path d="M16.200 1.200c.4 2.400 1.100 3.500 3.600 4-2.500.5-3.200 1.600-3.600 4-.4-2.400-1.100-3.500-3.600-4 2.500-.5 3.200-1.600 3.600-4z"/></svg>';
  var CW_X = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 1l12 12M13 1L1 13" stroke="#000" stroke-width="1.2" stroke-linecap="round"/></svg>';
  var CW_CART = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M21 5L19 12H7.38462M7.38462 12H7.37671M7.38462 12L8 16H20M7.38462 12L6 3H3M16 5.5H13.5M13.5 5.5H11M13.5 5.5V8M13.5 5.5V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"/></svg>';
  var CW_SPARK = '<svg width="17.2" height="21.1" viewBox="0 0 17 21" fill="none" stroke="#000" stroke-width="1.3" stroke-linejoin="round" aria-hidden="true"><path d="M6.6 6.3c.5 3.700 1.800 5.500 5.600 6.300-3.800.8-5.100 2.600-5.600 6.300-.5-3.700-1.800-5.500-5.600-6.300 3.800-.8 5.100-2.600 5.600-6.300z"/><path d="M13.300.9c.3 2 .9 2.900 3 3.300-2.100.4-2.700 1.300-3 3.300-.3-2-.9-2.900-3-3.300 2.100-.4 2.700-1.300 3-3.300z"/></svg>';
  var CW_STAR = '<svg width="55" height="63" viewBox="0 0 55 63" fill="none" aria-hidden="true"><path d="M20 12c1.700 12 6 18 17 21-11 3-15.300 9-17 21-1.700-12-6-18-17-21 11-3 15.300-9 17-21z" fill="#fff" opacity=".55"/><path d="M42 2c.8 6 3 9 8.500 10.500C45 14 42.800 17 42 23c-.8-6-3-9-8.500-10.500C39 11 41.200 8 42 2z" fill="#fff" opacity=".5"/></svg>';
  /* ===== v2: ventana de comparación — Figma 850:4130 ===== */
  var CX_STAR = '<svg width="15" height="14" viewBox="0 0 15 14" fill="none" aria-hidden="true"><path d="M7.5 1l1.9 4 4.3.5-3.2 3 .9 4.3-3.9-2.2-3.9 2.2.9-4.3-3.2-3 4.3-.5z" stroke="#080a18" stroke-width="1.2" stroke-linejoin="round"/></svg>';
  function cxCrown(c) { return '<svg width="14" height="11" viewBox="0 0 14 11" fill="' + c + '" aria-hidden="true"><path d="M1 2.2l3.2 3L7 .8l2.8 4.4L13 2.2l-1.2 7.6H2.2z"/><rect x="2.4" y="9.6" width="9.2" height="1.4" rx=".7"/></svg>'; }
  var CX_X = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M1 1l10 10M11 1L1 11" stroke="#000" stroke-width="1.2" stroke-linecap="round"/></svg>';
  var CX_X8 = '<svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true"><path d="M.5.5l7 7M7.5.5l-7 7" stroke="#000" stroke-width="1.2" stroke-linecap="round"/></svg>';

  function num(re, t) { var m = re.exec(t); return m ? parseFloat(m[1].replace(',', '.')) : 0; }
  function amiFeat(it) {
    var sp = it.i.spec, p = it.p;
    var ram = num(/(\d+)\s*GB/i, sp.ram);
    var d = /1 TB/i.test(sp.disco) ? 1000 : num(/(\d+)\s*GB/i, sp.disco);
    var pr = sp.proc, cpu = /i7|Ryzen 7|M2/i.test(pr) ? 4 : /i5|Ryzen 5/i.test(pr) ? 3 : 2;
    var gpu = /RTX 4060/i.test(sp.gpu) ? 5 : /RTX 4050/i.test(sp.gpu) ? 4 : /RTX 2050/i.test(sp.gpu) ? 3 : /M2|8 núcleos/i.test(sp.gpu) ? 2.5 : /Iris|Radeon 7|Radeon Graphics/i.test(sp.gpu) ? 1.5 : 1;
    var size = num(/^([\d,\.]+)/, sp.pant), hz = /144/.test(sp.pant), touch = /táctil/.test(sp.pant);
    var year = num(/(\d)/, sp.gar), mac = /macOS/.test(sp.so), dos = /FreeDOS/.test(sp.so);
    return { ram: ram, disk: d, cpu: cpu, gpu: gpu, size: size, hz: hz, touch: touch, mac: mac, dos: dos, warr: year, price: p.p };
  }
  function cxUso(f) {
    if (f.gpu >= 4) return { t: 'Juegos, diseño y modelado 3D', l: 3 };
    if (f.gpu >= 2.5 || f.cpu >= 4) return { t: 'Diseño gráfico y edición ligera', l: 2 };
    return { t: 'Oficina, estudio y navegación', l: 1 };
  }
  function cxPreset() { return (state.f.gama || []).filter(function (x) { return AMI_PROFILES[x]; })[0] || ''; }
  /* qué tan bien responde cada laptop al uso (preset) elegido: 1–3 */
  function cxFit(it, pre) {
    if (!pre) return 0;
    var f = amiFeat(it), w = AMI_PROFILES[pre].w;
    function cap(v) { return Math.max(0, Math.min(1, v)); }
    var N = { ram: cap(f.ram / 16), cpu: cap((f.cpu - 1) / 3), gpu: cap((f.gpu - 1) / 4), disk: cap(f.disk / 1000), price: cap(1 - (f.price - 1500000) / 4000000), port: f.size ? cap((17 - f.size) / 3) : .5, warr: cap(f.warr - 1) };
    var tot = 0, sum = 0; for (var k in w) { tot += w[k]; sum += w[k] * N[k]; }
    var r = sum / tot; return r >= .62 ? 3 : r >= .4 ? 2 : 1;
  }
  /* nivel 1–3 de cada fila (propuesta de umbrales, no datos oficiales) */
  function cxLv(it, k) {
    var sp = it.i.spec, f = amiFeat(it), n = 0, s;
    switch (k) {
      case 'uso': return cxFit(it, cxPreset());
      case 'ram': return f.mac ? 2 : f.ram >= 16 ? 3 : f.ram >= 12 ? 2 : 1;
      case 'disco': return f.disk >= 1000 ? 3 : f.disk >= 512 ? 2 : 1;
      case 'proc': return f.cpu >= 4 ? 3 : f.cpu === 3 ? 2 : 1;
      case 'gpu': return f.gpu >= 4 ? 3 : f.gpu >= 2.5 ? 2 : 1;
      case 'pant': return f.hz || /Liquid/.test(sp.pant) ? 3 : f.touch || f.size >= 16 ? 2 : 1;
      case 'so': return f.dos ? 1 : 3;
      case 'con': return /6E|5\.3/.test(sp.con) ? 3 : 2;
      case 'pue': String(sp.pue).replace(/(\d+) x/g, function (m, a) { n += +a; }); return n >= 6 ? 3 : n === 5 ? 2 : 1;
      case 'seg': return /huellas/.test(sp.seg) && /obturador/.test(sp.seg) ? 3 : 2;
      case 'gar': return f.warr >= 2 ? 3 : 2;
      case 'exp': s = parseInt(String(cwVal(it, 'exp')).slice(1), 10); return s >= 1000 ? 3 : s >= 100 ? 2 : 1;
      case 'ops': return parseFloat(it.p.r) >= 4.9 ? 3 : 2;
    }
    return 0;
  }
  function cxVal(it, k) { return k === 'uso' ? cxPreset() : k === 'exp' ? cwVal(it, k) + ' ventas' : cwVal(it, k); }
  var CX_ROWS = [
    { k: 'uso', l: 'Uso', info: 'Qué tan bien responde cada equipo al uso que elegiste en los filtros (Gama y uso).' },
    { k: 'ram', l: 'Memoria RAM', info: TIPS.ram }, { k: 'disco', l: 'Disco duro', info: TIPS.disco }, { k: 'proc', l: 'Procesador', info: TIPS.proc },
    { k: 'gpu', l: 'Tarjeta gráfica', info: TIPS.gpu }, { k: 'pant', l: 'Pantalla', info: TIPS.pant, bul: 1 }, { k: 'so', l: 'Sistema operativo', info: TIPS.so },
    { k: 'con', l: 'Conectividad', bul: 1 }, { k: 'pue', l: 'Puertos', bul: 1 }, { k: 'seg', l: 'Seguridad' }, { k: 'gar', l: 'Garantía' }
  ];
  var CX_CATS = [{ id: 'esp', t: 'Especificaciones', rows: CX_ROWS }, { id: 'ven', t: 'Vendedor y opiniones', rows: [{ k: 'exp', l: 'Exp. de vendedor' }, { k: 'ops', l: 'Opiniones' }] }];
  function cxMeter(n, total) { var h = ''; for (var i = 1; i <= total; i++) h += '<i' + (i <= n ? ' class="on"' : '') + '></i>'; return h; }

  var cw = el('div', 'cw-ov'); cw.hidden = true;
  cw.innerHTML =
    '<div class="cw" role="dialog" aria-modal="true" aria-label="Lista de comparación" tabindex="-1">' +
      '<header class="cw-head">' +
        '<div class="cw-bar"><div class="cw-bl">' +
          '<h2 class="cw-title">Lista de comparación</h2>' +
          '<button class="cw-lnk" type="button" disabled title="Próximamente">Guardar lista</button>' +
          '<button class="cw-lnk cw-clear" type="button">Quitar todo</button></div>' +
          '<button class="cw-close" type="button" aria-label="Cerrar">' + CW_X + '</button></div>' +
        '<div class="cw-top">' +
          '<div class="cw-side"><div class="cw-ami"><i class="cw-dots"></i><span class="cw-star">' + CW_STAR + '</span>' +
            '<p class="cw-ami-t">¿Aún no te decides?</p>' +
            '<button class="cw-ami-b" id="cwAmiGo" type="button"><span>Pregúntale a Ami</span>' + CW_SPARK + '</button></div></div>' +
          '<div class="cw-main"><div class="cw-cards" id="cwCards"></div></div>' +
        '</div>' +
        '<div class="cw-shadow"><i></i></div>' +
      '</header>' +
      '<div class="cw-scrollwrap"><div class="cw-scroll" id="cwScroll"><div class="cx-wrap"><div class="cx-recs" id="cwRecs" hidden></div><div class="cx-table" id="cwTable"></div></div></div></div>' +
    '</div>';
  document.body.appendChild(cw);
  var cwBox = $('.cw', cw), cwScroll = $('#cwScroll', cw), cwCards = $('#cwCards', cw), cwTable = $('#cwTable', cw), cwRecs = $('#cwRecs', cw), cwAmiGo = $('#cwAmiGo', cw);
  var cwOpen = false, CW_W = 1462, CW_H = 1682, CW_MINI_HEAD = 263, cwCatClosed = {}, cwDiffOn = false, cwAmiRes = null, cwAmiBusy = false, cwStepT = null;

  function cwItems() { return state.sel.map(function (id) { var p = PRODUCTS.filter(function (x) { return x.id === id; })[0]; return { p: p, i: cwInfo(p) }; }); }

  function cwRender() {
    var items = cwItems();
    var slots = items.map(function (it) {
      var p = it.p, tagc = p.tag ? (p.tag[0] === 'MÁS VENDIDO' ? ' ora' : '') : '';
      return '<article class="cw-card" data-id="' + p.id + '"><div class="cw-imgbox"><div class="cw-pic">' + lapImg(p) + '</div>' +
        (p.tag ? '<span class="cw-tag' + tagc + '">' + p.tag[0] + '</span>' : '') + '</div>' +
        '<div class="cw-body"><p class="cw-t">' + it.i.name + '</p><p class="cw-r">' + p.r + '</p>' +
        '<div class="cw-price"><b>' + fmtP(p.p) + '</b><span class="cw-off">' + p.d + '% OFF</span></div>' +
        '<p class="cw-q">' + p.q + '</p>' + (p.cup ? '<p class="cw-c">' + p.cup + '</p>' : '') + '<p class="cw-e">' + p.e + '</p></div>' +
        '<div class="cw-act"><button class="cw-buy" type="button">Comprar ahora</button>' +
        '<button class="cw-cart" type="button">' + CW_CART + '<span>Agregar al carrito</span></button></div>' +
        '<button class="cw-x" type="button" data-rm="' + p.id + '" aria-label="Quitar de la lista">' + CX_X + '</button></article>';
    });
    while (slots.length < MAX_CMP) slots.push('<div class="cw-slot" aria-hidden="true"><svg width="71" height="72" viewBox="0 0 71 72" fill="none"><path d="M35.500 1v70M1 36h69" stroke="#d7e7fe" stroke-width="2" stroke-linecap="round"/></svg></div>');
    cwCards.innerHTML = slots.join('');

    function rowHtml(r) {
      if (r.k === 'uso' && !cxPreset()) return '';
      var vals = items.map(function (it) { return cxVal(it, r.k); });
      var lv = items.map(function (it) { return cxLv(it, r.k); });
      var same = items.length >= 2 && vals.every(function (v) { return v === vals[0]; });
      var mx = Math.max.apply(0, lv), mn = Math.min.apply(0, lv), hasBest = items.length >= 2 && mx > mn;
      var gone = same && cwDiffOn;
      var h = '<div class="cx-row' + (gone ? ' gone' : '') + '" data-k="' + r.k + '" data-same="' + (same ? 1 : 0) + '"><div class="cx-inner"><div class="cx-rin">' +
        '<div class="cx-lab"><span>' + r.l + '</span>' + (r.info ? '<span class="info" tabindex="0" data-tip="' + String(r.info).replace(/"/g, '&quot;') + '" aria-label="' + String(r.info).replace(/"/g, '&quot;') + '">' + CW_INFO + '</span>' : '') + '</div><div class="cx-cells">';
      for (var c = 0; c < MAX_CMP; c++) {
        var it = items[c];
        if (!it) { h += '<div class="cx-cell empty"></div>'; continue; }
        var best = hasBest && lv[c] === mx, v = cwVal(it, r.k), body;
        if (r.k === 'ops') body = cwStars(parseInt(String(v).slice(6), 10));
        else if (r.bul) body = '<ul>' + bul(v).map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>';
        else body = '<p>' + vals[c] + '</p>';
        var nomet = r.k === 'exp' || r.k === 'ops';
        h += '<div class="cx-cell' + (best ? ' best' : '') + '">' + ((nomet && !best) ? '<div class="cx-ct"></div>' : '<div class="cx-ct">' + (nomet ? '' : '<span class="cx-meter" aria-label="Nivel ' + lv[c] + ' de 3">' + cxMeter(lv[c], 3) + '</span>') +
          (best ? '<span class="cx-bt">' + (nomet ? 'El mejor' : 'Más alta') + cxCrown('#3986fa') + '</span>' : '') + '</div>') + body + '</div>';
      }
      return h + '</div></div></div></div>';
    }
    cwTable.innerHTML = CX_CATS.map(function (cat, n) {
      var cl = !!cwCatClosed[cat.id];
      return '<section class="cx-cat' + (cl ? ' closed' : '') + '" data-cat="' + cat.id + '">' +
        '<div class="cx-cath"><button class="cx-acc" type="button" aria-expanded="' + (cl ? 'false' : 'true') + '">' + CX_STAR + '<h3>' + cat.t + '</h3></button>' +
        (n === 0 ? '<button class="cx-sw" type="button" role="switch" aria-checked="' + (cwDiffOn ? 'true' : 'false') + '"><span>Mostrar solo diferencias</span><i><b></b></i></button>' : '') + '</div>' +
        '<div class="cx-line"></div><div class="cx-rowswrap"><div class="cx-rows">' + cat.rows.map(rowHtml).join('') + '</div></div></section>';
    }).join('');
    cwRecsRender();
    if (window.__alignPrice) window.__alignPrice();
  }
  function cwFit() {
    var z = Math.min(1, (window.innerWidth - 48) / CW_W);
    cwBox.style.zoom = z;
    cwBox.style.height = Math.min(CW_H, (window.innerHeight - 48) / z) + 'px';
  }
  /* colapso progresivo: la cabecera se encoge con la rueda/gesto (t: 0 → 1) y solo después empieza el scroll de la tabla */
  var cwT = 0, CW_RANGE = 174, cwTouchY = null;
  function cwSetT(t) {
    cwT = Math.max(0, Math.min(1, t));
    cwBox.style.setProperty('--t', cwT.toFixed(4));
    cwBox.style.setProperty('--f', Math.max(0, 1 - cwT * 1.8).toFixed(4));
    cwBox.classList.toggle('mini', cwT >= 0.55);
    cwBox.classList.toggle('scrolled', cwT > 0 || cwScroll.scrollTop > 0);
  }
  function cwCanCollapse() { return cwTable.offsetHeight + 40 > cwBox.clientHeight - CW_MINI_HEAD - ((cwAmiRes || cwAmiBusy) ? cwRecs.offsetHeight + 24 : 0); }
  function cwScrollState() {
    if (cwScroll.scrollTop > 0 && cwT < 1) cwSetT(1);
    cwBox.classList.toggle('scrolled', cwT > 0 || cwScroll.scrollTop > 0);
  }
  function cwConsume(dy) {
    if (dy > 0 && cwT < 1 && cwCanCollapse()) { cwSetT(cwT + dy / CW_RANGE); return true; }
    if (dy < 0 && cwT > 0 && cwScroll.scrollTop <= 0) { cwSetT(cwT + dy / CW_RANGE); return true; }
    return false;
  }
  cwBox.addEventListener('wheel', function (e) {
    var dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * cwBox.clientHeight : e.deltaY;
    if (e.ctrlKey) return;
    if (cwConsume(dy)) e.preventDefault();
  }, { passive: false });
  cwBox.addEventListener('touchstart', function (e) { cwTouchY = e.touches[0].clientY; }, { passive: true });
  cwBox.addEventListener('touchmove', function (e) {
    if (cwTouchY == null) return;
    var y = e.touches[0].clientY, dy = cwTouchY - y; cwTouchY = y;
    if (cwConsume(dy) && e.cancelable) e.preventDefault();
  }, { passive: false });
  function openCompare() {
    if (!state.sel.length) return;
    cwCatClosed = {}; cwDiffOn = false; cwAmiRes = null; cwAmiBusy = false; clearInterval(cwStepT);
    cwRender(); cwFit();
    cw.hidden = false; cwScroll.scrollTop = 0; cwSetT(0);
    cwOpen = true; document.documentElement.classList.add('cw-lock');
    requestAnimationFrame(function () { cw.classList.add('show'); if (window.__alignPrice) window.__alignPrice(); });
    cwBox.focus({ preventScroll: true });
  }
  function closeCompare() {
    if (!cwOpen) return; cwOpen = false; cw.classList.remove('show'); document.documentElement.classList.remove('cw-lock');
    setTimeout(function () { if (!cwOpen) cw.hidden = true; }, 220);
  }
  cwScroll.addEventListener('scroll', cwScrollState, { passive: true });
  window.addEventListener('resize', function () { if (cwOpen) { cwFit(); cwScrollState(); } });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && cwOpen) closeCompare(); });

  /* ---------- Ami: botón de recomendaciones (simulación local, sin servidor) ---------- */
  var AMI_PROFILES = {
    'Para diseño gráfico': { w: { ram: 2, cpu: 2, gpu: 2, disk: 1, price: .4, port: .3, warr: .3 }, tag: 'diseñar' },
    'Para modelado 3D': { w: { ram: 2.5, cpu: 2.5, gpu: 3, disk: 1.2, price: .3, port: .1, warr: .3 }, tag: 'modelar en 3D' },
    'Para juegos': { w: { ram: 1.2, cpu: 1.8, gpu: 3.5, disk: .6, price: .4, port: .2, warr: .3 }, tag: 'jugar' },
    'Para oficina': { w: { ram: 1.2, cpu: 1, gpu: .1, disk: .5, price: 1.8, port: 1, warr: .4 }, tag: 'estudiar y trabajar' },
    'Ultrarrápidos': { w: { ram: 2, cpu: 3, gpu: 3, disk: 1.5, price: .2, port: .1, warr: .3 }, tag: 'tener la máxima potencia' },
    'Equilibrio precio/potencia': { w: { ram: 1.5, cpu: 1.5, gpu: 1, disk: .7, price: 2, port: .3, warr: .4 }, tag: 'equilibrar precio y potencia' }
  };
  function amiProfile() {
    var pre = (state.f.gama || []).filter(function (x) { return AMI_PROFILES[x]; })[0];
    return pre ? AMI_PROFILES[pre] : { w: { ram: 1.8, cpu: 1.4, gpu: .6, disk: .7, price: 1, port: .4, warr: .4 }, tag: '' };
  }
  function nb(t) { return String(t).replace(/\$ /g, '$\u00a0'); }
  function gpuNm(it) { return it.i.spec.gpu.replace(/NVIDIA GeForce /, '').replace(/\s*\(.*\)/, ''); }
  function cpuNm(it) { return it.i.spec.proc.replace(/\s*\(.*\)/, ''); }
  function amiAnalyze(items) {
    var prof = amiProfile(), w = prof.w, F = items.map(amiFeat);
    function cap(v) { return Math.max(0, Math.min(1, v)); }
    function norm(arr, inv) { var mn = Math.min.apply(0, arr), mx = Math.max.apply(0, arr); return arr.map(function (v) { var x = mx === mn ? .5 : (v - mn) / (mx - mn); return inv ? 1 - x : x; }); }
    var N = {
      ram: F.map(function (f) { return cap(f.ram / 16); }), cpu: F.map(function (f) { return cap((f.cpu - 1) / 3); }), gpu: F.map(function (f) { return cap((f.gpu - 1) / 4); }),
      disk: F.map(function (f) { return cap(f.disk / 1000); }), price: norm(F.map(function (f) { return f.price; }), true),
      port: norm(F.map(function (f) { return f.size ? -f.size : 0; })), warr: F.map(function (f) { return cap(f.warr - 1); })
    };
    var keys = ['ram', 'cpu', 'gpu', 'disk', 'price', 'port', 'warr'], tot = keys.reduce(function (a, k) { return a + w[k]; }, 0);
    var raw = F.map(function (f, i) { return keys.reduce(function (a, k) { return a + w[k] * N[k][i]; }, 0) / tot - (f.dos ? .2 : 0); });
    var mn = Math.min.apply(0, raw), mx = Math.max.apply(0, raw), best = raw.indexOf(mx), sc = raw.map(function (r) {
      var rel = mx - mn > .008 ? (r - mn) / (mx - mn) : .5, s = 1 + 3 * (.4 * cap((r - .1) / .7) + .6 * rel); return Math.max(1, Math.min(4, Math.round(s)));
    });
    var prices = F.map(function (f) { return f.price; }), minP = Math.min.apply(0, prices), maxP = Math.max.apply(0, prices);
    function strengths(i) {
      var f = F[i], it = items[i], out = [];
      var cand = [
        ['gpu', f.gpu >= 4 ? 'su gráfica ' + gpuNm(it) + ' mueve juegos y edición de video con fluidez' : f.gpu >= 2.5 ? 'su gráfica ' + gpuNm(it) + ' aguanta bien edición y juegos livianos' : 'su gráfica integrada basta para el día a día'],
        ['ram', f.ram >= 16 ? 'sus ' + f.ram + ' GB de RAM te dejan trabajar con muchas apps abiertas' : 'sus ' + f.ram + ' GB de RAM alcanzan para tareas ligeras'],
        ['cpu', f.cpu >= 4 ? 'su procesador ' + cpuNm(it) + ' es de los más veloces del grupo' : 'su procesador ' + cpuNm(it) + ' responde bien al uso diario'],
        ['disk', 'guarda hasta ' + (f.disk >= 1000 ? '1 TB' : f.disk + ' GB') + ' de archivos y programas'],
        ['price', f.price === minP && items.length > 1 ? 'es la más económica del grupo (' + fmtP(f.price) + ')' : 'cuesta ' + fmtP(f.price)],
        ['port', 'su pantalla de ' + String(f.size).replace('.', ',') + '" es cómoda de llevar a todos lados'],
        ['warr', 'trae ' + f.warr + ' años de garantía']
      ];
      cand.forEach(function (c) { var n = N[c[0]][i]; if (n >= .55 || (items.length < 2)) out.push({ s: n * w[c[0]] + (n >= .99 ? .01 : 0), t: c[1] }); });
      out.sort(function (a, b) { return b.s - a.s; });
      if (!out.length) out.push({ t: cand.sort(function (a, b) { return N[b[0]][i] * w[b[0]] - N[a[0]][i] * w[a[0]]; })[0][1] });
      return out.slice(0, 2).map(function (x) { return x.t; });
    }
    function caveat(i) {
      var f = F[i];
      if (f.dos) return 'viene sin Windows y tendrías que instalarlo';
      if (f.gpu < 2.5 && w.gpu >= 1.5) return 'su gráfica es básica para lo que buscas';
      if (f.ram <= 8 && w.ram >= 1.2 && !f.mac) return 'trae solo ' + f.ram + ' GB de RAM';
      if (f.price === maxP && items.length > 1 && w.price >= .8) return 'es la más cara del grupo';
      if (f.disk <= 256) return 'tiene poco almacenamiento';
      return '';
    }
    var res = {}, order = items.map(function (x, i) { return i; }).sort(function (a, b) { return raw[b] - raw[a]; });
    items.forEach(function (it, i) {
      var s = strengths(i), cv = caveat(i), body;
      if (i === best) body = 'Esta es mi favorita: ' + s.join(' y ') + '.' + (cv ? ' Eso sí, ' + cv + '.' : ' Es la que mejor se ajusta a lo que buscas.');
      else if (sc[i] >= 3) body = 'Muy buena opción: ' + s.join(' y ') + '.' + (cv ? ' Ojo: ' + cv + '.' : ' Quedó muy cerca de mi favorita.');
      else body = 'Podría servirte: ' + s[0] + '.' + (cv ? ' Pero ' + cv + ', así que yo miraría otra primero.' : ' Aun así, hay opciones mejores en esta lista.');
      res[it.p.id] = { s: sc[i], t: nb(body) };
    });
    var bs = strengths(best), cheap = prices.indexOf(minP), alt = cheap !== best ? cheap : order[1];
    var summary = items.length < 2 ? 'Agrega otra laptop y te ayudo a elegir la mejor.' :
      (prof.tag ? 'Para ' + prof.tag + ', te' : 'Te') + ' recomiendo la ' + items[best].i.name + ' porque ' + bs.join(' y ') + '. ' +
      (alt === cheap && cheap !== best ? 'Si prefieres ahorrar, la ' + items[cheap].i.name + ' cuesta ' + fmtP(prices[best] - minP) + ' menos y es tu mejor plan B.' : 'Como segunda opción, mira la ' + items[alt].i.name + '.');
    return { res: res, summary: nb(summary), best: best };
  }
  var AMI_STEPS = ['Comparando procesadores…', 'Revisando la memoria…', 'Mirando las pantallas…', 'Sumando el almacenamiento…', 'Revisando precios…', 'Armando mi recomendación…'];
  function cxSum(head, text, closable) {
    return '<div class="cx-sumc"><div class="cx-sumh"><span class="cx-spk">' + CW_SPK2 + '</span><b>' + head + '</b></div>' + text +
      (closable ? '<button class="cw-sx" type="button" aria-label="Cerrar resumen">' + CX_X8 + '</button>' : '') + '<i class="cx-glow"></i></div>';
  }
  function cwRecsLoading(items) {
    var h = '<div class="cx-sum loading">' + cxSum('Ami está pensando', '<div class="cx-steps" id="cwSteps" aria-live="polite"></div>', false) + '<div class="cx-panel"><i class="cx-g1"></i><i class="cx-g2"></i>';
    for (var c = 0; c < MAX_CMP; c++) {
      h += '<div class="cx-col">' + (items[c] ? '<div class="cx-mt"><span class="cx-pips">' + cxMeter(0, 4) + '</span></div><div class="cx-sk">' +
        [100, 94, 100, 82, 96, 58].map(function (x, i) { return '<i class="sk" style="width:' + x + '%;animation-delay:' + (-i * .12 - c * .2) + 's"></i>'; }).join('') + '</div>' : '') + '</div>';
    }
    cwRecs.innerHTML = h + '</div></div>'; cwRecs.hidden = false; cwBox.classList.add('has-recs');
    var box = $('#cwSteps', cwRecs), i = 0;
    function step() { var p = document.createElement('p'); p.textContent = AMI_STEPS[i % AMI_STEPS.length]; box.appendChild(p); while (box.children.length > 3) box.removeChild(box.firstChild); i++; }
    clearInterval(cwStepT); step(); cwStepT = setInterval(function () { if (!$('#cwSteps', cwRecs)) { clearInterval(cwStepT); return; } step(); }, 420);
  }
  function cwRecsRender() {
    var items = cwItems();
    if (cwAmiBusy && items.length) { cwRecsLoading(items); return; }
    if (!cwAmiRes || !items.length) { cwRecs.hidden = true; cwRecs.innerHTML = ''; cwBox.classList.remove('has-recs'); return; }
    var r = amiAnalyze(items), h = '<div class="cx-sum">' + cxSum('Resumen de Ami', '<p>' + r.summary + '</p>', true) + '<div class="cx-panel"><i class="cx-g1"></i><i class="cx-g2"></i>';
    for (var c = 0; c < MAX_CMP; c++) {
      var it = items[c];
      if (!it) { h += '<div class="cx-col"></div>'; continue; }
      var x = r.res[it.p.id], fav = c === r.best;
      h += '<div class="cx-col' + (fav ? ' fav' : '') + '"><div class="cx-mt"><span class="cx-pips" aria-label="Score ' + x.s + ' de 4">' + cxMeter(x.s, 4) + '</span>' +
        (fav ? '<span class="cx-fv">El mejor' + cxCrown('#fad201') + '</span>' : '') + '</div><p>' + x.t + '</p></div>';
    }
    cwRecs.innerHTML = h + '</div></div>'; cwRecs.hidden = false; cwBox.classList.add('has-recs');
  }
  cwAmiGo.addEventListener('click', function () {
    if (cwAmiBusy) return;
    cwAmiBusy = true; cwAmiRes = null; cwAmiGo.disabled = true; cwBox.classList.add('ami-busy');
    cwAmiGo.firstChild.textContent = 'Ami está pensando…';
    cwRecsRender(); cwScrollState();
    requestAnimationFrame(function () {
      var tgt = cwScroll.querySelector('.cx-sum') || cwRecs, sr = cwScroll.getBoundingClientRect(), tr = tgt.getBoundingClientRect();
      cwScroll.scrollTo({ top: Math.max(0, cwScroll.scrollTop + (tr.top - sr.top) - 16), behavior: 'smooth' });
    });
    setTimeout(function () {
      cwAmiBusy = false; clearInterval(cwStepT); cwAmiRes = {}; cwAmiGo.disabled = false; cwBox.classList.remove('ami-busy');
      cwAmiGo.firstChild.textContent = 'Pregúntale a Ami';
      cwRecsRender(); cwScrollState();
    }, 2400);
  });
  cwRecs.addEventListener('click', function (e) { if (e.target.closest('.cw-sx')) { cwAmiRes = null; cwRecsRender(); cwScrollState(); } });

  /* ---------- tabla: acordeón de categoría y "mostrar solo diferencias" ---------- */
  cwTable.addEventListener('click', function (e) {
    var sw = e.target.closest('.cx-sw');
    if (sw) {
      cwDiffOn = !cwDiffOn; sw.setAttribute('aria-checked', cwDiffOn ? 'true' : 'false');
      [].forEach.call(cwTable.querySelectorAll('.cx-row[data-same="1"]'), function (row) { row.classList.toggle('gone', cwDiffOn); });
      setTimeout(cwScrollState, 300); return;
    }
    var h = e.target.closest('.cx-acc'); if (!h) return;
    var cat = h.closest('.cx-cat'), cl = !cat.classList.contains('closed'); cwCatClosed[cat.getAttribute('data-cat')] = cl;
    cat.classList.toggle('closed', cl); h.setAttribute('aria-expanded', cl ? 'false' : 'true'); cwScrollState();
  });
  cwTable.addEventListener('mouseover', function (e) { var t = e.target.closest('.info'); if (t) showTip(t); });
  cwTable.addEventListener('mouseout', function (e) { var t = e.target.closest('.info'); if (t && !t.contains(e.relatedTarget)) hideTip(); });
  cwTable.addEventListener('focusin', function (e) { var t = e.target.closest('.info'); if (t) showTip(t); });
  cwTable.addEventListener('focusout', hideTip);
  cwScroll.addEventListener('scroll', hideTip, { passive: true });
  cw.addEventListener('click', function (e) {
    if (e.target === cw || e.target.closest('.cw-close')) { closeCompare(); return; }
    var rm = e.target.closest('[data-rm]');
    if (rm) {
      var id = +rm.dataset.rm, i = state.sel.indexOf(id);
      if (i > -1) { state.sel.splice(i, 1); renderGrid(true); hideToast(); }
      if (!state.sel.length) closeCompare(); else { cwRender(); cwScrollState(); }
      return;
    }
    if (e.target.closest('.cw-clear')) { state.sel.length = 0; renderGrid(true); hideToast(); closeCompare(); }
  });
  dock.addEventListener('click', function (e) { if (e.target.closest('.cd-go')) { dock.classList.remove('open'); openCompare(); } });
  // permite revisar la ventana directamente: index.html#compare
  window.__openCompare = openCompare;

  /* ---------- mensaje: lista llena (5.ª tarjeta) ---------- */
  var toastEl = $('#toast'), toastRaf = 0, TOAST_MS = 6000, toastLeft = TOAST_MS, toastLast = 0, toastPaused = false;
  var X8 = '<svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true"><path d="M.75.75l6.5 6.5M7.25.75l-6.5 6.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>';
  var X6 = '<svg width="6" height="6" viewBox="0 0 6 6" fill="none" aria-hidden="true"><path d="M.5.5l5 5M5.5.5l-5 5" stroke="currentColor" stroke-linecap="round"/></svg>';
  function toastTick(now) {
    toastRaf = requestAnimationFrame(toastTick);
    var dt = now - toastLast; toastLast = now;
    if (toastPaused) return;
    toastLeft = Math.max(0, toastLeft - dt);
    var bar = $('.bar i', toastEl); if (bar) bar.style.transform = 'scaleX(' + (toastLeft / TOAST_MS) + ')';
    if (toastLeft <= 0) hideToast();
  }
  function showToast(pulse) {
    var items = state.sel.map(function (id, n) {
      var p = PRODUCTS.filter(function (x) { return x.id === id; })[0];
      return '<div class="t-th" title="' + p.t.replace(/"/g, '&quot;') + '">' + lapImg(p) + '<span class="n">' + (n + 1) + '</span><button type="button" data-rm="' + id + '" aria-label="Quitar ' + (n + 1) + '"><span class="t-x">' + X6 + '</span></button></div>';
    }).join('');
    toastEl.innerHTML =
      '<div class="t-main"><div class="t-top"><span class="t-ic">' + cmpIcon() + '</span><button class="t-close" type="button" aria-label="Cerrar">' + X8 + '</button></div>' +
      '<div class="t-txt"><p class="t-h">Tu lista de comparación está llena</p>' +
      '<p class="t-p">Puedes comparar hasta 4 productos a la vez.<br>Quita uno para agregar otro.</p></div></div>' +
      '<div class="t-row">' + items + '</div><div class="bar"><i></i></div>';
    toastEl.hidden = false;
    toastEl.classList.remove('show'); void toastEl.offsetWidth;
    requestAnimationFrame(function () { toastEl.classList.add('show'); });
    cancelAnimationFrame(toastRaf); toastLeft = TOAST_MS; toastPaused = toastEl.matches(':hover'); toastLast = performance.now(); toastRaf = requestAnimationFrame(toastTick);
    if (pulse) $$('.card.sel .cmp').forEach(function (b) { b.classList.remove('pulse'); void b.offsetWidth; b.classList.add('pulse'); });
  }
  function hideToast() {
    cancelAnimationFrame(toastRaf); toastRaf = 0; toastEl.classList.remove('show');
    setTimeout(function () { if (!toastEl.classList.contains('show')) toastEl.hidden = true; }, 360);
  }
  toastEl.addEventListener('mouseenter', function () { toastPaused = true; });
  toastEl.addEventListener('mouseleave', function () { toastPaused = false; });
  toastEl.addEventListener('click', function (e) {
    if (e.target.closest('.t-close')) { hideToast(); return; }
    var rm = e.target.closest('[data-rm]');
    if (rm) { var id = +rm.dataset.rm; state.sel.splice(state.sel.indexOf(id), 1); renderGrid(true); hideToast(); }
  });

  /* =========================================================
     Init
     ========================================================= */
  /* contador de resultados: simulado, determinista según los filtros activos */
  var COUNT_BASE = 9347, countShown = COUNT_BASE, countRaf = 0;
  function hsh(str) { var h = 7; for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 9973; return h / 9973; }
  function calcCount() {
    var share = 1;
    Object.keys(state.f).forEach(function (sid) {
      var vals = state.f[sid]; if (!vals || !vals.length) return;
      var sum = 0; vals.forEach(function (v) { sum += .14 + hsh(sid + '|' + v) * .46; });
      share *= Math.min(.92, sum);
    });
    if (state.price && state.price.touched) share *= Math.max(.04, Math.min(1, (state.price.max - state.price.min) / 6000000)) * .9 + .02;
    return Math.max(1, Math.round(COUNT_BASE * share));
  }
  function fmtCount(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
  function updateCount() {
    var wrap = $('.count'); if (!wrap) return;
    var b = $('b', wrap), sp = $('span', wrap);
    var filtered = Object.keys(state.f).some(function (k) { return state.f[k] && state.f[k].length; }) || (state.price && state.price.touched);
    var target = filtered ? calcCount() : COUNT_BASE, from = countShown, t0 = Date.now();
    cancelAnimationFrame(countRaf);
    (function step() {
      var k = Math.min(1, (Date.now() - t0) / 450), e = 1 - Math.pow(1 - k, 3);
      countShown = Math.round(from + (target - from) * e);
      b.textContent = (filtered ? '' : '+') + fmtCount(filtered ? countShown : (k < 1 ? countShown : 9000));
      sp.textContent = countShown === 1 && k === 1 ? 'resultado' : 'resultados';
      if (k < 1) countRaf = requestAnimationFrame(step); else countShown = target;
    })();
  }
  function update() { syncSidebar(); renderChips(); updateCount(); if (gridReady) shuffleGrid(); }

  var topbar = $('#topbar');
  function measure() { document.documentElement.style.setProperty('--bar-h', topbar.offsetHeight + 'px'); }
  window.addEventListener('resize', measure);
  // sombra cuando la barra queda pegada arriba
  var sentinel = el('div'); sentinel.style.cssText = 'height:1px;margin-bottom:-1px';
  topbar.parentNode.insertBefore(sentinel, topbar);
  if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { topbar.classList.toggle('stuck', !en[0].isIntersecting); }).observe(sentinel);

  syncAcc(); update(); renderGrid(false); gridReady = true; measure();
  // permite revisar el prototipo con una lista ya llena: index.html#demo5
  if (location.hash === '#demo5') { state.sel = [2, 6, 3, 8]; renderGrid(false); }
  if (location.hash === '#compare') { state.sel = [1, 2, 3]; renderGrid(false); openCompare(); }
})();

/* centrado óptico vertical de los campos de precio: mide la fuente real del navegador
   (Myanmar Text en Windows) y centra la altura de mayúscula en la caja, sin depender de text-box */
(function(){
  function align(){
    var c=document.createElement('canvas').getContext('2d');
    document.querySelectorAll('.pbox,.cd-go,.oc').forEach(function(b){
      var sp=b.firstElementChild; if(!sp) return;
      var cs=getComputedStyle(sp); c.font=cs.fontWeight+' '+cs.fontSize+' '+cs.fontFamily;
      var m=c.measureText('0'), fa=m.fontBoundingBoxAscent, fd=m.fontBoundingBoxDescent, cap=m.actualBoundingBoxAscent;
      if(!fa||!cap) return;
      var H=b.clientHeight; if(!H) return; var base=(H-(fa+fd))/2+fa, shift=H/2-(base-cap/2);
      sp.style.transform='translateY('+shift.toFixed(2)+'px)';
    });
  }
  window.__alignPrice=align;
  (document.fonts&&document.fonts.ready?document.fonts.ready:Promise.resolve()).then(function(){align();setTimeout(align,300);});
})();
