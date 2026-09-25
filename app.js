const categories=['Phones & Electronics','Fashion','Vehicles','Home & Furniture','Real Estate','Jobs & Services','Other'];
const seed=[
{id:1,title:'iPhone 13 Pro',price:520000,cat:'Phones & Electronics',loc:'Lagos',icon:'📱',desc:'Clean used iPhone 13 Pro. Face ID and cameras working.',seller:'OLOJA Demo Seller'},
{id:2,title:'2-Seater Sofa',price:180000,cat:'Home & Furniture',loc:'Akute',icon:'🛋️',desc:'Neat modern sofa, ready for pickup.',seller:'OLOJA Demo Seller'},
{id:3,title:'Men’s Native Outfit',price:65000,cat:'Fashion',loc:'Ikeja',icon:'👔',desc:'Quality native outfit, size L.',seller:'OLOJA Demo Seller'},
{id:4,title:'Toyota Camry 2012',price:7800000,cat:'Vehicles',loc:'Lagos',icon:'🚗',desc:'Well maintained Camry. Inspection welcome.',seller:'OLOJA Demo Seller'},
{id:5,title:'2-Bedroom Apartment',price:2500000,cat:'Real Estate',loc:'Akute',icon:'🏠',desc:'Property listing. Contact seller for inspection details.',seller:'OLOJA Demo Seller'},
{id:6,title:'Graphic Design Service',price:15000,cat:'Jobs & Services',loc:'Lagos',icon:'🎨',desc:'Flyers, social media designs and branding.',seller:'Aries'}];
let listings=JSON.parse(localStorage.getItem('olojaListings')||'null')||seed;let saved=new Set(JSON.parse(localStorage.getItem('olojaSaved')||'[]'));
const $=s=>document.querySelector(s),money=n=>'₦'+Number(n||0).toLocaleString('en-NG');
const grid=$('#grid'),favGrid=$('#favoritesGrid'),myListings=$('#myListings'),modal=$('#modal'),content=$('#modalContent');
function persist(){localStorage.setItem('olojaListings',JSON.stringify(listings));localStorage.setItem('olojaSaved',JSON.stringify([...saved]));}
function card(x){return `<article class="card"><button class="save" onclick="toggleSave(${x.id})">${saved.has(x.id)?'♥':'♡'}</button><div class="pic">${x.icon||'🛍️'}</div><div class="info"><div class="cat">${x.cat}</div><div class="title">${esc(x.title)}</div><div class="price">${money(x.price)}</div><div class="loc">📍 ${esc(x.loc)}</div><button onclick="view(${x.id})">View listing</button></div></article>`}
function render(){let q=$('#search').value.toLowerCase(),c=$('#category').value,l=$('#location').value;let arr=listings.filter(x=>(!q||`${x.title} ${x.cat} ${x.loc} ${x.desc}`.toLowerCase().includes(q))&&(!c||x.cat===c)&&(!l||x.loc===l));grid.innerHTML=arr.length?arr.map(card).join(''):'<p class="muted">No listings found. Try another filter.</p>';favGrid.innerHTML=[...listings].filter(x=>saved.has(x.id)).map(card).join('')||'<p class="muted">No saved listings yet. Tap ♡ on any listing to save it.</p>';renderDash()}
function renderDash(){let mine=listings.filter(x=>x.owner);$('#statListings').textContent=mine.length;$('#statSaved').textContent=saved.size;$('#statValue').textContent=money(mine.reduce((a,x)=>a+Number(x.price),0));myListings.innerHTML=mine.length?mine.map(x=>`<div class="myitem"><div><h3>${esc(x.title)}</h3><p>${money(x.price)} · ${esc(x.loc)} · ${esc(x.cat)}</p></div><button class="ghost" onclick="deleteListing(${x.id})">Delete</button></div>`).join(''):'<p class="muted">You have not posted a listing on this device yet.</p>'}
function toggleSave(id){saved.has(id)?saved.delete(id):saved.add(id);persist();render()}
window.toggleSave=toggleSave;
window.view=id=>{let x=listings.find(a=>a.id===id);modal.classList.remove('hidden');content.innerHTML=`<div class="detail"><div class="detailPic">${x.icon||'🛍️'}</div><div class="cat">${esc(x.cat)}</div><h2>${esc(x.title)}</h2><h3>${money(x.price)}</h3><p>📍 ${esc(x.loc)}</p><p>${esc(x.desc)}</p><p class="muted">Seller: ${esc(x.seller||'OLOJA seller')}</p><div class="actions"><button class="primary" onclick="contactSeller(${x.id})">Contact seller</button><button class="ghost" onclick="toggleSave(${x.id});closeModal()">${saved.has(x.id)?'Unsave':'Save'}</button></div></div>`};
window.contactSeller=id=>{let x=listings.find(a=>a.id===id);location.href=`mailto:ariesmedia007@gmail.com?subject=${encodeURIComponent('OLOJA enquiry: '+x.title)}&body=${encodeURIComponent('Hello, I am interested in your OLOJA listing: '+x.title+' ('+money(x.price)+').')}`};
window.deleteListing=id=>{if(confirm('Delete this listing?')){listings=listings.filter(x=>x.id!==id);saved.delete(id);persist();render()}};
function openSell(){modal.classList.remove('hidden');content.innerHTML=`<h2>Post on OLOJA</h2><p class="notice">This MVP stores your listing on this device. The production version will store listings in a secure cloud database.</p><form class="form" id="sellForm"><input name="title" placeholder="What are you selling?" required><input name="price" type="number" min="0" placeholder="Price in naira" required><select name="cat" required><option value="">Choose category</option>${categories.map(x=>`<option>${x}</option>`).join('')}</select><input name="loc" placeholder="Location e.g. Akute" required><input name="icon" placeholder="Emoji for prototype e.g. 📱"><textarea name="desc" placeholder="Describe the item honestly: condition, size, important details…" required></textarea><button class="primary">Publish listing</button></form>`;$('#sellForm').onsubmit=async e=>{e.preventDefault();let f=new FormData(e.target);let item={id:Date.now(),title:f.get('title'),price:Number(f.get('price')),cat:f.get('cat'),loc:f.get('loc'),desc:f.get('desc'),icon:f.get('icon')||'🛍️',seller:'You',owner:true};if(!(await saveListingToSupabase(item)))return;listings.unshift(item);persist();closeModal();showPage('dashboard');render()}}
function closeModal(){$('#modal').classList.add('hidden')};function showPage(name){document.querySelectorAll('.page').forEach(x=>x.classList.add('hidden'));$(`#${name}Page`).classList.remove('hidden');if(name==='home')render();if(name==='favorites')render();if(name==='dashboard')renderDash()};
function esc(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
$('#sellTop').onclick=openSell;$('#sellBottom').onclick=openSell;$('#heroSell').onclick=openSell;$('#dashSell').onclick=openSell;$('#close').onclick=closeModal;modal.onclick=e=>{if(e.target===modal)closeModal()};$('#search').oninput=render;$('#category').onchange=render;$('#location').onchange=render;$('#clearSearch').onclick=()=>{$('#search').value='';$('#category').value='';$('#location').value='';render()};document.querySelectorAll('.navbtn').forEach(b=>b.onclick=()=>showPage(b.dataset.page));render();

// OLOJA Supabase connection test
async function testSupabaseConnection() {
  const { data, error } = await window.olojaSupabase
    .from('categories')
    .select('*')
    .limit(1);

  if (error) {
    console.error('OLOJA Supabase connection error:', error);
  } else {
    console.log('OLOJA connected to Supabase successfully!', data);
  }
}

testSupabaseConnection();


document.querySelector('#signupBtn').onclick = async function () {
  const { data: { session } } = await window.olojaSupabase.auth.getSession();

  // If already logged in, log the user out
  if (session && session.user) {
    const { error } = await window.olojaSupabase.auth.signOut();

    if (error) {
      alert('Log out failed: ' + error.message);
    } else {
      alert('You have been logged out of OLOJA.');
      document.querySelector('#loginBtn').textContent = 'Log In';
      document.querySelector('#signupBtn').textContent = 'Sign Up';
    }
    return;
  }

  // If not logged in, create a new account
  const email = prompt('Enter your email address:');
  if (!email) return;

  const password = prompt('Create a password (minimum 6 characters):');
  if (!password) return;

  const { data, error } = await window.olojaSupabase.auth.signUp({
    email: email,
    password: password
  });

  if (error) {
    alert('Sign up failed: ' + error.message);
  } else {
    alert('Account created! Please check your email to confirm your account.');
    console.log('OLOJA signup:', data);
  }
};
document.querySelector('#loginBtn').onclick = async function () {
  const { data: { session } } = await window.olojaSupabase.auth.getSession();

  // If already logged in, show account information
  if (session && session.user) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.add('hidden');
  });

  document.querySelector('#accountPage').classList.remove('hidden');
  document.querySelector('#accountEmail').textContent = session.user.email;
  return;
}

  // If not logged in, ask for login details
  const email = prompt('Enter your email address:');
  if (!email) return;

  const password = prompt('Enter your password:');
  if (!password) return;

  const { data, error } = await window.olojaSupabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    alert('Log in failed: ' + error.message);
  } else {
    alert('Welcome to OLOJA! You are now logged in.');
    document.querySelector('#loginBtn').textContent = 'My Account';
    document.querySelector('#signupBtn').textContent = 'Log Out';
    console.log('OLOJA login:', data);
  }
};
// Keep track of the currently logged-in OLOJA user
async function checkLoggedInUser() {
  const { data: { session } } = await window.olojaSupabase.auth.getSession();

  if (session && session.user) {
    console.log('OLOJA logged-in user:', session.user.email);

    document.querySelector('#loginBtn').textContent = 'My Account';
    document.querySelector('#signupBtn').textContent = 'Log Out';
  }
}

checkLoggedInUser();
// Load listings belonging to the currently logged-in user
async function loadMyListings() {
  const { data: { session } } = await window.olojaSupabase.auth.getSession();

  if (!session || !session.user) return;

  const { data, error } = await window.olojaSupabase
    .from('listings')
    .select('*')
    .eq('seller_id', session.user.id);

  if (error) {
    console.error('Could not load My Listings:', error);
    return;
  }

  console.log('My OLOJA listings:', data);
  const grid = document.querySelector('#myListingsGrid');
const emptyMessage = document.querySelector('#noMyListings');

if (data && data.length > 0) {
  emptyMessage.classList.add('hidden');

  grid.innerHTML = data.map(item => `
    <article class="card">
      <h3>${item.title || 'Untitled listing'}</h3>
      <p>${item.description || ''}</p>
    </article>
  `).join('');
} else {
  emptyMessage.classList.remove('hidden');
}
}

loadMyListings();
// Save a new OLOJA listing to Supabase
async function saveListingToSupabase(item) {
  const { data: { session } } = await window.olojaSupabase.auth.getSession();

  if (!session || !session.user) {
    alert('Please log in before posting a listing.');
    return false;
  }

  const { error } = await window.olojaSupabase
    .from('listings')
    .insert({
      title: item.title,
      price: item.price,
      listing_type: item.cat,
      location: item.loc,
      description: item.desc,
      seller_id: session.user.id
    });

  if (error) {
    console.error('Could not save listing:', error);
    alert('Could not post your listing: ' + error.message);
    return false;
  }

  console.log('OLOJA listing saved to Supabase!');
  return true;
}

