/* Brasa Alta | modelo demonstrativo de hamburgueria desenvolvido pela Upzen.
   Projeto estático: nenhum dado de pedido é enviado a contatos externos. */
(() => {
  'use strict';

  const config = window.UPZEN_CONFIG || {};
  const formatMoney = value => Number(value).toLocaleString('pt-BR', { style:'currency', currency:'BRL' });
  const $ = selector => document.querySelector(selector);
  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const images = {
    burger1:'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=85',
    burger2:'https://images.unsplash.com/photo-1595531172949-30922c28a240?auto=format&fit=crop&w=900&q=85',
    burger3:'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=900&q=85',
    burger4:'https://images.unsplash.com/photo-1615297928064-24977384d0da?auto=format&fit=crop&w=900&q=85',
    burger5:'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=85',
    burger6:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85',
    fries:'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=900&q=85',
    drink:'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85',
    dessert:'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=85'

  };

  // Demonstration catalogue. Replace with the client's real menu, values and photos.
  const products = [
    {id:'b1',name:'Brasa Clássico',category:'burgers',price:27.9,image:images.burger1,tag:'Mais pedido',description:'Pão macio, burger artesanal, queijo, alface, tomate e molho da casa.',customizable:true},
    {id:'b2',name:'Brasa Bacon',category:'burgers',price:31.9,image:images.burger2,tag:'Favorito',description:'Burger artesanal, queijo derretido, bacon crocante e molho especial.',customizable:true},
    {id:'b3',name:'Duplo da Casa',category:'burgers',price:36.9,image:images.burger3,tag:'Brabo',description:'Dois burgers, queijo em dobro, cebola crispy e maionese da casa.',customizable:true},
    {id:'b4',name:'Cheddar Alto',category:'burgers',price:30.9,image:images.burger4,tag:'',description:'Burger artesanal com cheddar cremoso e toque da casa.',customizable:true},
    {id:'b5',name:'Salad Burger',category:'burgers',price:29.9,image:images.burger5,tag:'',description:'Burger, queijo, alface, tomate e picles em equilíbrio perfeito.',customizable:true},
    {id:'b6',name:'Supreme BBQ',category:'burgers',price:33.9,image:images.burger6,tag:'Novo',description:'Burger artesanal, bacon, queijo e molho barbecue marcante.',customizable:true},
    {id:'c1',name:'Combo Clássico',category:'combos',price:39.9,image:images.burger1,tag:'Combo',description:'Brasa Clássico + batata + refrigerante.',customizable:false},
    {id:'c2',name:'Combo Bacon',category:'combos',price:44.9,image:images.burger2,tag:'Combo',description:'Brasa Bacon + batata + refrigerante.',customizable:false},
    {id:'c3',name:'Combo Duplo',category:'combos',price:49.9,image:images.burger3,tag:'Combo',description:'Duplo da Casa + batata + refrigerante.',customizable:false},
    {id:'a1',name:'Batata da Casa',category:'sides',price:12.9,image:images.fries,tag:'',description:'Batata crocante e sequinha, perfeita pra acompanhar.',customizable:false},
    {id:'a2',name:'Batata Cheddar & Bacon',category:'sides',price:19.9,image:images.fries,tag:'Mais pedido',description:'Batata com cheddar cremoso e bacon em cubos.',customizable:false},
    {id:'a3',name:'Onion Rings',category:'sides',price:16.9,image:images.fries,tag:'',description:'Anéis de cebola empanados e crocantes.',customizable:false},
    {id:'d1',name:'Refrigerante Lata',category:'drinks',price:6.5,image:images.drink,tag:'',description:'Lata 350ml bem gelada.',customizable:false},
    {id:'d2',name:'Limonada',category:'drinks',price:8.9,image:images.drink,tag:'Novo',description:'Bebida cítrica e refrescante.',customizable:false},
    {id:'d3',name:'Água Mineral',category:'drinks',price:4.5,image:images.drink,tag:'',description:'Água mineral 500ml.',customizable:false},
    {id:'s1',name:'Brownie Cremoso',category:'desserts',price:14.9,image:images.dessert,tag:'Doce final',description:'Brownie com cobertura de chocolate.',customizable:false}
  ];
  const categories = [
    { id:'all',name:'Todos',symbol:'✳',headline:'OS FAVORITOS DA BRASA' },
    { id:'burgers',name:'Hambúrgueres',symbol:'🍔',headline:'BURGERS ARTESANAIS' },
    { id:'combos',name:'Combos',symbol:'🍟',headline:'COMBOS DA CASA' },
    { id:'sides',name:'Acompanhamentos',symbol:'✦',headline:'PRA ACOMPANHAR' },
    { id:'drinks',name:'Bebidas',symbol:'◉',headline:'PRA REFRESCAR' },
    { id:'desserts',name:'Sobremesas',symbol:'✳',headline:'UM DOCE FINAL' }
  ];
  const customGroups = [
    {name:'Escolha seu queijo',helper:'Selecione 1 opção',multiple:false,items:[{name:'Cheddar',price:0},{name:'Muçarela',price:0},{name:'Prato',price:0}]},
    {name:'Adicionais',helper:'Escolha quantos quiser',multiple:true,items:[{name:'Bacon',price:4},{name:'Ovo',price:3},{name:'Cebola crispy',price:2.5},{name:'Picles extra',price:2}]},
    {name:'Molho',helper:'Selecione 1 opção',multiple:false,items:[{name:'Molho da casa',price:0},{name:'Barbecue',price:1.5},{name:'Maionese verde',price:1.5}]},
    {name:'Acompanhamento',helper:'Selecione 1 opção',multiple:false,items:[{name:'Sem acompanhamento',price:0},{name:'Batata da casa',price:8}]}
  ];

  const STORAGE_KEY = 'upzen-brasa-alta-demo-cart-v1';
  let activeCategory = 'all';
  let searchTerm = '';
  let cart = loadCart();
  let currentProduct = null;
  let selectedOptions = new Map();
  let beforeDialogFocus = null;
  let currentDialog = null;
  let toastTimeout;
  const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold:.14, rootMargin:'0px 0px -40px 0px' }) : null;
  const productGrid = $('#productGrid');
  const categoryBar = $('#categories');

  function loadCart() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (!Array.isArray(raw)) return [];
      return raw.slice(0,80).flatMap(item => {
        const product = products.find(p => p.id === item.id);
        if (!product || !Number.isInteger(item.qty) || item.qty < 1 || item.qty > 99 || !Array.isArray(item.options)) return [];
        const valid = item.options.slice(0,15).filter(option =>
          option && Number.isInteger(option.group) && typeof option.name === 'string' &&
          customGroups[option.group]?.items.some(o => o.name === option.name && o.price === option.price)
        ).map(option => ({group:option.group,name:option.name,price:Number(option.price)}));
        return [{product,options:valid,qty:item.qty}];
      });
    } catch { return []; }
  }
  function saveCart() {
    try { localStorage.setItem(STORAGE_KEY,JSON.stringify(cart.map(item => ({id:item.product.id,qty:item.qty,options:item.options})))); } catch { /* private mode */ }
  }
  function cartItemPrice(item) { return item.product.price + item.options.reduce((sum,option) => sum+option.price,0); }
  function cartTotal() { return cart.reduce((sum,item) => sum + cartItemPrice(item)*item.qty,0); }
  function cartQuantity() { return cart.reduce((sum,item) => sum+item.qty,0); }
  function normalizeSearch(text) { return text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim(); }
  function showToast(message) {
    const toast = $('#toast'); clearTimeout(toastTimeout);
    toast.textContent = message; toast.classList.add('show');
    toastTimeout = setTimeout(() => toast.classList.remove('show'),3400);
  }

  function setupReveal(scope=document) {
    const targets = scope.querySelectorAll('.section-topline, .section-head, .menu-toolbar, .menu-results, .product-card, .combo-head, .combo-cards .product-card, .story-image, .story-copy, .how-grid article, .last-cta-inner, .footer-main > div, .intro-feature, .intro-message');
    targets.forEach((element, index) => {
      if (element.dataset.revealReady === 'true') return;
      element.dataset.revealReady = 'true';
      element.classList.add('reveal-up');
      element.style.transitionDelay = `${Math.min(index * 45, 240)}ms`;
      if (revealObserver) revealObserver.observe(element);
      else element.classList.add('is-visible');
    });
  }

  function cardMarkup(product) {
    return `<article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${escapeHTML(product.name)}" loading="lazy" decoding="async">
        ${product.tag ? `<span class="tag">${escapeHTML(product.tag)}</span>` : ''}
      </div>
      <div class="product-info">
        <h3>${escapeHTML(product.name)}</h3>
        <p>${escapeHTML(product.description)}</p>
        <div class="product-bottom">
          <div class="product-price"><small>${product.customizable ? 'A PARTIR DE' : 'VALOR'}</small><strong>${formatMoney(product.price)}</strong></div>
          <button class="add-btn" type="button" data-product="${product.id}" aria-label="${product.customizable?'Personalizar':'Adicionar'} ${escapeHTML(product.name)}">${product.customizable?'PERSONALIZAR':'ADICIONAR'}<span aria-hidden="true">+</span></button>
        </div>
      </div>
    </article>`;
  }
  function renderCategories() {
    categoryBar.innerHTML = categories.map(c => `<button type="button" data-cat="${c.id}" class="${c.id===activeCategory?'active':''}" aria-pressed="${c.id===activeCategory}">${c.symbol} ${c.name}</button>`).join('');
  }
  function renderProducts() {
    const matches = products.filter(product => (activeCategory==='all' || product.category===activeCategory) &&
      normalizeSearch(`${product.name} ${product.description}`).includes(normalizeSearch(searchTerm)));
    $('#categoryTitle').textContent = searchTerm ? 'RESULTADOS DA BUSCA' : categories.find(c => c.id===activeCategory).headline;
    $('#productCount').textContent = `${matches.length} ${matches.length===1?'item':'itens'}`;
    productGrid.innerHTML = matches.length ? matches.map(cardMarkup).join('') : `<div class="no-results reveal-up is-visible"><span aria-hidden="true">🍔</span><h3>NÃO ENCONTRAMOS ESSE ITEM.</h3><p>Não encontramos esse item. Tente outra busca ou categoria.</p><button type="button" id="clearFilters">VER CARDÁPIO COMPLETO</button></div>`;
    setupReveal(productGrid);
  }
  function setCategory(id, scroll = false) {
    if (!categories.some(c => c.id === id)) return;
    activeCategory = id;
    searchTerm = '';
    $('#menuSearch').value = '';
    renderCategories(); renderProducts();
    if (scroll) $('#cardapio').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  }
  function renderFeaturedCombos() { $('#comboHighlight').innerHTML = products.filter(p => p.category==='combos').map(cardMarkup).join(''); setupReveal($('#comboHighlight')); }

  function syncDialogScroll() { document.body.classList.toggle('no-scroll',Boolean(currentDialog)); }
  function focusableIn(root) {
    return [...root.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')]
      .filter(node => node.getClientRects().length);
  }
  function openDialog(root, focusTarget) {
    if (currentDialog) closeDialog(false);
    beforeDialogFocus = document.activeElement;
    currentDialog = root;
    root.classList.add('open'); root.setAttribute('aria-hidden','false');
    if (root === $('#cartDrawer')) $('#drawerBackdrop').classList.add('open');
    syncDialogScroll();
    (focusTarget || root).focus({preventScroll:true});
  }
  function closeDialog(returnFocus=true) {
    if (!currentDialog) return;
    const root = currentDialog;
    root.classList.remove('open'); root.setAttribute('aria-hidden','true');
    if (root === $('#cartDrawer')) $('#drawerBackdrop').classList.remove('open');
    currentDialog = null; syncDialogScroll();
    if (returnFocus && beforeDialogFocus?.isConnected) beforeDialogFocus.focus({preventScroll:true});
  }

  function renderOptions() {
    $('#customOptions').innerHTML = customGroups.map((group,gi) => `<div class="option-group">
      <h4>${escapeHTML(group.name)}</h4><span class="option-helper">${escapeHTML(group.helper)}</span>
      <div class="option-list">${group.items.map((item,ii) => {
        const key = `${gi}-${ii}`;
        const checked = selectedOptions.has(key);
        return `<button type="button" class="option${checked?' selected':''}" data-option="${key}" data-group="${gi}" data-multi="${group.multiple}" aria-pressed="${checked}">
          <span class="option-name">${escapeHTML(item.name)}</span><small>${item.price ? `+ ${formatMoney(item.price)}` : 'GRÁTIS'}</small>
        </button>`;
      }).join('')}</div></div>`).join('');
  }
  function selectedOptionsList() {
    return [...selectedOptions.values()].sort((a,b) => a.group-b.group || a.name.localeCompare(b.name));
  }
  function updateModalPrice() {
    if (currentProduct) $('#modalTotal').textContent = formatMoney(currentProduct.price + selectedOptionsList().reduce((sum,o) => sum+o.price,0));
  }
  function openProduct(product) {
    if (!product) return;
    if (!product.customizable) { addToCart(product,[]); openCart(); return; }
    currentProduct = product;
    selectedOptions = new Map([
      ['0-0',{group:0,...customGroups[0].items[0]}],
      ['2-0',{group:2,...customGroups[2].items[0]}],
      ['3-0',{group:3,...customGroups[3].items[0]}]
    ]);
    $('#modalImage').src = product.image; $('#modalImage').alt = product.name;
    $('#modalName').textContent = product.name;
    $('#modalDescription').textContent = product.description;
    $('#modalTag').textContent = product.tag || 'MONTE DO SEU JEITO';
    renderOptions(); updateModalPrice();
    openDialog($('#productModal'),document.querySelector('[data-close]'));
  }
  function selectOption(key) {
    const [g,i] = key.split('-').map(Number);
    const group = customGroups[g];
    const option = group?.items[i];
    if (!option) return;
    if (group.multiple) {
      if (selectedOptions.has(key)) selectedOptions.delete(key);
      else selectedOptions.set(key,{group:g,...option});
    } else {
      for (const [existingKey,item] of selectedOptions) if (item.group===g) selectedOptions.delete(existingKey);
      selectedOptions.set(key,{group:g,...option});
    }
    renderOptions(); updateModalPrice();
    document.querySelector(`[data-option="${key}"]`)?.focus({preventScroll:true});
  }

  function addToCart(product,options) {
    const ordered = [...options].sort((a,b) => a.group-b.group || a.name.localeCompare(b.name));
    const signature = JSON.stringify(ordered.map(o => [o.group,o.name,o.price]));
    const existing = cart.find(item => item.product.id===product.id && JSON.stringify(item.options.map(o => [o.group,o.name,o.price]))===signature);
    if (existing) existing.qty = Math.min(99,existing.qty+1);
    else cart.push({product,options:ordered,qty:1});
    updateCart(); saveCart();
  }
  function updateCart() {
    const qty = cartQuantity();
    $('#cartCount').textContent = qty;
    $('#cartButton').setAttribute('aria-label',`Abrir sacola com ${qty} ${qty===1?'item':'itens'}`);
    $('#mobileCartQty').textContent = `${qty} ${qty===1?'item':'itens'}`;
    $('#mobileCartTotal').textContent = formatMoney(cartTotal());
    $('#mobileCartBar').classList.toggle('visible',qty>0);
    $('#cartItems').innerHTML = cart.length ? cart.map((item,index) => `<div class="cart-item">
      <img src="${item.product.image}" alt="" loading="lazy">
      <div class="cart-item-main"><b>${escapeHTML(item.product.name)}</b>
      ${item.options.filter(o => o.group!==3 || o.name!=='Sem acompanhamento').map(o=>`<small>• ${escapeHTML(o.name)}${o.price?` (+${formatMoney(o.price)})`:''}</small>`).join('')}
      <strong>${formatMoney(cartItemPrice(item)*item.qty)}</strong>
      <div class="qty"><button type="button" data-qty="${index}" data-change="-1" aria-label="Diminuir quantidade de ${escapeHTML(item.product.name)}">−</button><span>${item.qty}</span><button type="button" data-qty="${index}" data-change="1" aria-label="Aumentar quantidade de ${escapeHTML(item.product.name)}">+</button><button type="button" class="remove" data-remove="${index}" aria-label="Remover ${escapeHTML(item.product.name)}">Remover</button></div></div>
    </div>`).join('') : `<div class="empty-cart"><span aria-hidden="true">🍔</span><h3>A SACOLA TÁ VAZIA.</h3><p>O próximo burger favorito tá no nosso cardápio.</p><button type="button" id="goToMenu">EXPLORAR CARDÁPIO ↗</button></div>`;
    $('#cartTotal').textContent = formatMoney(cartTotal());
    $('#simulateOrder').disabled = cart.length===0;
  }
  function openCart() { openDialog($('#cartDrawer'),$('#closeCart')); }
  function changeQuantity(index,diff) {
    if (!cart[index]) return;
    cart[index].qty += diff;
    if (cart[index].qty <= 0) cart.splice(index,1);
    else cart[index].qty = Math.min(99,cart[index].qty);
    updateCart(); saveCart();
  }

  function externalURL(value) {
    if (typeof value !== 'string') return '';
    try {
      const url = new URL(value);
      return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
    } catch { return ''; }
  }
  function configureLinks() {
    const anchor = $('#upzenLink');
    const url = externalURL(config.UPZEN_URL);
    if (url) anchor.href = url;
    else {
      anchor.removeAttribute('href');
      anchor.removeAttribute('target');
      anchor.addEventListener('click', () => showToast('Link da Upzen ainda não configurado neste modelo.'));
    }
  }

  function buildOrderPayload() {
    const customerName = $('#customerName').value.trim();
    const customerAddress = $('#customerAddress').value.trim();
    const notes = $('#notes').value.trim();
    const qty = cartQuantity();
    const total = cartTotal();

    const lines = [
      'BRASA ALTA — RESUMO DO PEDIDO (DEMONSTRAÇÃO)',
      '─────────────────────────',
      `Nome: ${customerName}`,
      `Endereço: ${customerAddress}`,
      '',
      'ITENS DO PEDIDO'
    ];
    cart.forEach(item => {
      lines.push(`• ${item.qty}x ${item.product.name} — ${formatMoney(cartItemPrice(item) * item.qty)}`);
      item.options
        .filter(option => option.group !== 3 || option.name !== 'Sem acompanhamento')
        .forEach(option => {
          const extra = option.price ? ` (+${formatMoney(option.price)})` : '';
          lines.push(`   ↳ ${option.name}${extra}`);
        });
    });
    lines.push('', '─────────────────────────', `Total estimado: ${formatMoney(total)}`);
    if (notes) lines.push('', `Observações: ${notes}`);
    lines.push('', 'Modelo fictício Upzen: itens e preços ilustrativos. Nenhum pedido real foi enviado.');

    return { customerName, customerAddress, notes, qty, total, message: lines.join('\n') };
  }

  function fillConfirmModal(payload) {
    $('#confirmCustomerName').textContent = payload.customerName;
    $('#confirmCustomerAddress').textContent = payload.customerAddress;
    $('#confirmItemCount').textContent = `${payload.qty} ${payload.qty === 1 ? 'item' : 'itens'}`;
    $('#confirmTotal').textContent = formatMoney(payload.total);
    $('#confirmItems').innerHTML = cart.map(item => {
      const options = item.options.filter(o => o.group !== 3 || o.name !== 'Sem acompanhamento')
        .map(option => `<li>${escapeHTML(option.name)}${option.price ? ` <span>(+${formatMoney(option.price)})</span>` : ''}</li>`).join('');
      return `<div class="confirm-item"><div class="confirm-item-top"><strong>${item.qty}x ${escapeHTML(item.product.name)}</strong><b>${formatMoney(cartItemPrice(item) * item.qty)}</b></div>${options ? `<ul>${options}</ul>` : ''}</div>`;
    }).join('');
    $('#confirmNotes').textContent = payload.notes;
    $('#confirmNotesWrap').hidden = !payload.notes;
    $('#copyOrderBtn').dataset.message = payload.message;
  }

  function sendOrder() {
    if (!cart.length) return showToast('Adicione pelo menos um produto à sacola.');
    const customerName = $('#customerName').value.trim();
    const customerAddress = $('#customerAddress').value.trim();
    if (!customerName) {
      $('#customerName').focus();
      return showToast('Informe o nome do cliente antes de finalizar.');
    }
    if (!customerAddress) {
      $('#customerAddress').focus();
      return showToast('Informe o endereço de entrega antes de finalizar.');
    }

    const payload = buildOrderPayload();
    fillConfirmModal(payload);
    openDialog($('#confirmModal'), $('#copyOrderBtn'));
  }

  async function copyOrderSummary() {
    const message = $('#copyOrderBtn').dataset.message || '';
    if (!message) return showToast('Não foi possível preparar o resumo.');
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard API indisponível');
      await navigator.clipboard.writeText(message);
    } catch {
      const field = document.createElement('textarea');
      field.value = message;
      field.setAttribute('readonly', '');
      field.style.cssText = 'position:fixed;top:-9999px;left:-9999px;';
      document.body.appendChild(field);
      field.focus(); field.select();
      let copied = false;
      try { copied = document.execCommand('copy'); } catch { /* unsupported browser */ }
      field.remove();
      if (!copied) return showToast('Cópia não disponível neste navegador.');
    }
    closeDialog(false);
    showToast('Resumo copiado! Este pedido é apenas uma simulação.');
  }

  // Delegated actions survive card/category re-renders.
  document.addEventListener('click', event => {
    const cat = event.target.closest('[data-cat]');
    if (cat) return setCategory(cat.dataset.cat);
    const preset = event.target.closest('[data-category]');
    if (preset) { event.preventDefault(); return setCategory(preset.dataset.category,true); }
    const productButton = event.target.closest('[data-product]');
    if (productButton) return openProduct(products.find(p => p.id===productButton.dataset.product));
    const optionButton = event.target.closest('[data-option]');
    if (optionButton) return selectOption(optionButton.dataset.option);
    const qtyButton = event.target.closest('[data-qty]');
    if (qtyButton) return changeQuantity(Number(qtyButton.dataset.qty),Number(qtyButton.dataset.change));
    const remove = event.target.closest('[data-remove]');
    if (remove) return changeQuantity(Number(remove.dataset.remove),-100);
    if (event.target.closest('#clearFilters')) return setCategory('all');
    if (event.target.closest('#goToMenu')) { closeDialog(); $('#cardapio').scrollIntoView({behavior:'smooth'}); }
  });
  $('#menuSearch').addEventListener('input',e => {searchTerm=e.target.value;renderProducts();});
  $('#heroBuild').addEventListener('click', () => openProduct(products[0]));
  $('#addCustomized').addEventListener('click', () => {
    if (!currentProduct) return;
    addToCart(currentProduct,selectedOptionsList());
    closeDialog(false); openCart();
  });
  document.querySelector('[data-close]').addEventListener('click', () => closeDialog());
  $('#productModal').addEventListener('click',event => {if(event.target===$('#productModal'))closeDialog();});
  $('#cartButton').addEventListener('click',openCart);
  $('#mobileCartBar').addEventListener('click',openCart);
  $('#closeCart').addEventListener('click',() => closeDialog());
  $('#drawerBackdrop').addEventListener('click',() => closeDialog());
  $('#simulateOrder').addEventListener('click',sendOrder);
  $('#copyOrderBtn').addEventListener('click',copyOrderSummary);
  $('#editOrderBtn').addEventListener('click',() => { closeDialog(false); openCart(); });
  $('#closeConfirmModal').addEventListener('click',() => closeDialog());
  $('#confirmModal').addEventListener('click',event => { if (event.target === $('#confirmModal')) closeDialog(); });
  document.addEventListener('keydown',event => {
    if (!currentDialog) return;
    if (event.key==='Escape') { event.preventDefault(); closeDialog(); return; }
    if (event.key!=='Tab') return;
    const dialog = currentDialog === $('#productModal') ? $('#productModal .product-modal') : currentDialog;
    const focusable = focusableIn(dialog);
    if (!focusable.length) return;
    const first=focusable[0],last=focusable[focusable.length-1];
    if (event.shiftKey && document.activeElement===first) {event.preventDefault();last.focus();}
    else if (!event.shiftKey && document.activeElement===last) {event.preventDefault();first.focus();}
  });
  const toggle = $('#menuToggle');
  function closeMobileMenu() { toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');$('#navLinks').classList.remove('open'); }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
    $('#navLinks').classList.toggle('open',open);
  });
  $('#navLinks').querySelectorAll('a').forEach(anchor => anchor.addEventListener('click',closeMobileMenu));
  document.addEventListener('click',event => {if(!event.target.closest('.nav-inner')) closeMobileMenu();});
  document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click',() => {
    document.querySelectorAll('.nav-link').forEach(item => item.classList.remove('active'));
    link.classList.add('active');
  }));

  renderCategories();renderProducts();renderFeaturedCombos();updateCart();configureLinks();setupReveal();
})();
