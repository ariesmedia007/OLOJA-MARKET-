const categories=['Phones & Electronics','Fashion','Vehicles','Home & Furniture','Real Estate','Jobs & Services','Pets & Animals','Health & Beauty','Babies & Kids','Sports & Fitness','Food & Agriculture','Books & Education','Business & Equipment','Other'];
const categoryIcons = {
  'Phones & Electronics': '📱',
  'Fashion': '👕',
  'Vehicles': '🚗',
  'Home & Furniture': '🛋️',
  'Real Estate': '🏠',
  'Jobs & Services': '🛠️',
  'Pets & Animals': '🐾',
  'Health & Beauty': '💄',
  'Babies & Kids': '🧸',
  'Sports & Fitness': '⚽',
  'Food & Agriculture': '🌾',
  'Books & Education': '📚',
  'Business & Equipment': '💼',
  'Other': '📦'
};
const nigeriaStates=['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara','FCT'];
const nigeriaAreas={
  'Abia':['Aba','Umuahia','Ohafia','Other area'],
  'Adamawa':['Yola','Mubi','Numan','Other area'],
  'Akwa Ibom':['Uyo','Eket','Ikot Ekpene','Oron','Other area'],
  'Anambra':['Awka','Onitsha','Nnewi','Ekwulobia','Other area'],
  'Bauchi':['Bauchi','Azare','Misau','Other area'],
  'Bayelsa':['Yenagoa','Ogbia','Brass','Other area'],
  'Benue':['Makurdi','Gboko','Otukpo','Other area'],
  'Borno':['Maiduguri','Biu','Bama','Other area'],
  'Cross River':['Calabar','Ikom','Ogoja','Other area'],
  'Delta':['Asaba','Warri','Sapele','Ughelli','Other area'],
  'Ebonyi':['Abakaliki','Afikpo','Other area'],
  'Edo':['Benin City','Auchi','Ekpoma','Other area'],
  'Ekiti':['Ado-Ekiti','Ikere-Ekiti','Other area'],
  'Enugu':['Enugu','Nsukka','Oji River','Other area'],
  'Gombe':['Gombe','Kaltungo','Other area'],
  'Imo':['Owerri','Orlu','Okigwe','Other area'],
  'Jigawa':['Dutse','Hadejia','Other area'],
  'Kaduna':['Kaduna','Zaria','Kafanchan','Other area'],
  'Kano':['Kano','Wudil','Other area'],
  'Katsina':['Katsina','Daura','Funtua','Other area'],
  'Kebbi':['Birnin Kebbi','Argungu','Other area'],
  'Kogi':['Lokoja','Okene','Anyigba','Other area'],
  'Kwara':['Ilorin','Offa','Other area'],
  'Lagos':['Ikeja','Lekki','Ajah','Yaba','Surulere','Ikorodu','Ojodu Berger','Agege','Ogba','Other area'],
  'Nasarawa':['Lafia','Keffi','Karu','Other area'],
  'Niger':['Minna','Suleja','Bida','Other area'],
  'Ogun':['Abeokuta','Akute','Ajuwon','Ota','Ibafo','Mowe','Ijebu-Ode','Sagamu','Other area'],
  'Ondo':['Akure','Ondo','Owo','Other area'],
  'Osun':['Osogbo','Ile-Ife','Ilesa','Other area'],
  'Oyo':['Ibadan','Ogbomoso','Oyo','Other area'],
  'Plateau':['Jos','Bukuru','Other area'],
  'Rivers':['Port Harcourt','Obio-Akpor','Bonny','Other area'],
  'Sokoto':['Sokoto','Tambuwal','Other area'],
  'Taraba':['Jalingo','Wukari','Other area'],
  'Yobe':['Damaturu','Potiskum','Gashua','Other area'],
  'Zamfara':['Gusau','Kaura Namoda','Other area'],
  'FCT':['Abuja','Gwagwalada','Kubwa','Kuje','Bwari','Lugbe','Other area']
};
const seed=[
{id:1,title:'iPhone 13 Pro',price:520000,cat:'Phones & Electronics',loc:'Lagos',icon:'📱',desc:'Clean used iPhone 13 Pro. Face ID and cameras working.',seller:'OLOJA Demo Seller'},
{id:2,title:'2-Seater Sofa',price:180000,cat:'Home & Furniture',loc:'Akute',icon:'🛋️',desc:'Neat modern sofa, ready for pickup.',seller:'OLOJA Demo Seller'},
{id:3,title:'Men’s Native Outfit',price:65000,cat:'Fashion',loc:'Ikeja',icon:'👔',desc:'Quality native outfit, size L.',seller:'OLOJA Demo Seller'},
{id:4,title:'Toyota Camry 2012',price:7800000,cat:'Vehicles',loc:'Lagos',icon:'🚗',desc:'Well maintained Camry. Inspection welcome.',seller:'OLOJA Demo Seller'},
{id:5,title:'2-Bedroom Apartment',price:2500000,cat:'Real Estate',loc:'Akute',icon:'🏠',desc:'Property listing. Contact seller for inspection details.',seller:'OLOJA Demo Seller'},
{id:6,title:'Graphic Design Service',price:15000,cat:'Jobs & Services',loc:'Lagos',icon:'🎨',desc:'Flyers, social media designs and branding.',seller:'Aries'}];
let listings=seed.slice();
let saved=new Set();
const $=s=>document.querySelector(s),money=n=>'₦'+Number(n||0).toLocaleString('en-NG');
const grid=$('#grid'),favGrid=$('#favoritesGrid'),myListings=$('#myListings'),modal=$('#modal'),content=$('#modalContent');
function persist(){localStorage.setItem('olojaListings',JSON.stringify(listings));localStorage.setItem('olojaSaved',JSON.stringify([...saved]));}
function card(x){return `<article class="card"><button class="save" onclick="toggleSave('${x.id}')">${saved.has(x.id)?'♥':'♡'}</button><div class="pic">${x.photoUrl?`<img src="${x.photoUrl}" style="width:100%;height:100%;object-fit:cover;">`:(x.icon||'🛍️')}</div><div class="info"><div class="cat">${x.cat}</div><div class="title">${esc(x.title)}</div><div class="price">${money(x.price)}</div><div class="loc">📍 ${esc(x.loc)}</div><button onclick="view('${x.id}')">View listing</button></div></article>`}
function render(){let q=$('#search').value.toLowerCase(),c=$('#category').value,l=$('#location').value;let arr=listings.filter(x=>(!q||`${x.title} ${x.cat} ${x.loc} ${x.desc}`.toLowerCase().includes(q))&&(!c||x.cat===c)&&(!l||x.loc===l));grid.innerHTML=arr.length?arr.map(card).join(''):'<p class="muted">No listings found. Try another filter.</p>';favGrid.innerHTML=[...listings].filter(x=>saved.has(x.id)).map(card).join('')||'<p class="muted">No saved listings yet. Tap ♡ on any listing to save it.</p>';renderDash()}
async function renderDash() {
  const { data: { session } } =
    await window.olojaSupabase.auth.getSession();

  if (!session || !session.user) {
    $('#statListings').textContent = '0';
    $('#statValue').textContent = money(0);
    myListings.innerHTML =
      '<p class="muted">Please log in to view your listings.</p>';
    return;
  }

  const { data: mine, error } = await window.olojaSupabase
    .from('listings')
    .select('id, title, price, listing_type, location')
    .eq('seller_id', session.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Could not load your listings:', error);
    myListings.innerHTML =
      '<p class="muted">Could not load your listings.</p>';
    return;
  }

  const myCloudListings = mine || [];

  $('#statListings').textContent = myCloudListings.length;
  $('#statSaved').textContent = saved.size;

  $('#statValue').textContent = money(
    myCloudListings.reduce(
      (total, item) => total + Number(item.price || 0),
      0
    )
  );

  myListings.innerHTML = myCloudListings.length
  ? myCloudListings.map(item => `
      <div class="myitem">
        <div>
          <h3>${esc(item.title)}</h3>
          <p>
            ${money(item.price)} ·
            ${esc(item.location || '')} ·
            ${esc(item.listing_type || 'Product')}
          </p>

          <div class="actions">
            <button type="button" class="ghost"
              onclick="view('${item.id}')">
              View
            </button>

            <button type="button" class="ghost"
              onclick="editCloudListing('${item.id}')">
              Edit
            </button>

            <button type="button" class="ghost"
              onclick="deleteCloudListing('${item.id}')">
              Delete
            </button>
          </div>
        </div>
      </div>
    `).join('')
  : '<p class="muted">You have not posted a listing yet.</p>';
}
window.deleteCloudListing = async function (id) {
  const ok = confirm('Delete this listing permanently from OLOJA?');
  if (!ok) return;

  const { data: { session } } =
    await window.olojaSupabase.auth.getSession();

  if (!session || !session.user) {
    alert('Please log in first.');
    return;
  }

  const { data, error } = await window.olojaSupabase
    .from('listings')
    .delete()
    .eq('id', id)
    .eq('seller_id', session.user.id)
    .select('id');

  if (error) {
    alert('Could not delete listing: ' + error.message);
    return;
  }

  if (!data || data.length === 0) {
    alert('Listing was not deleted.');
    return;
  }

  alert('Listing deleted successfully.');

  await loadCloudListings();
  await renderDash();
};
window.editCloudListing = async function (id) {
  const { data: { session } } =
    await window.olojaSupabase.auth.getSession();

  if (!session || !session.user) {
    alert('Please log in first.');
    return;
  }

  const { data: listing, error: loadError } =
    await window.olojaSupabase
      .from('listings')
      .select('id, title, price, listing_type, location, description')
      .eq('id', id)
      .eq('seller_id', session.user.id)
      .maybeSingle();

  if (loadError || !listing) {
    alert('Could not load this listing for editing.');
    return;
  }

  const title = prompt('Listing title:', listing.title || '');
  if (title === null) return;

  const priceText = prompt('Price:', listing.price ?? '');
  if (priceText === null) return;

  const location = prompt('Location:', listing.location || '');
  if (location === null) return;

  const listingType = prompt(
    'Category / type:',
    listing.listing_type || 'Product'
  );
  if (listingType === null) return;

  const description = prompt(
    'Description:',
    listing.description || ''
  );
  if (description === null) return;

  const price = Number(String(priceText).replace(/,/g, ''));

  if (!title.trim() || !Number.isFinite(price) || price < 0) {
    alert('Please enter a valid title and price.');
    return;
  }

  const { data, error } = await window.olojaSupabase
    .from('listings')
    .update({
      title: title.trim(),
      price: price,
      location: location.trim(),
      listing_type: listingType.trim() || 'Product',
      description: description.trim()
    })
    .eq('id', id)
    .eq('seller_id', session.user.id)
    .select('id');

  if (error) {
    alert('Could not update listing: ' + error.message);
    return;
  }

  if (!data || data.length === 0) {
    alert('Listing was not updated.');
    return;
  }

  alert('Listing updated successfully.');

  await loadCloudListings();
  await renderDash();
};
async function toggleSave(id) {
  const { data: { session } } =
    await window.olojaSupabase.auth.getSession();

  if (!session || !session.user) {
    alert('Please log in to save listings.');
    return;
  }

  const listing = listings.find(
    item => String(item.id) === String(id)
  );

  if (!listing || !listing.sellerId) {
    alert('Only real OLOJA listings can be saved.');
    return;
  }

  const listingId = String(id);

  if (saved.has(listingId)) {
    const { error } = await window.olojaSupabase
      .from('favorites')
      .delete()
      .eq('user_id', session.user.id)
      .eq('listing_id', listingId);

    if (error) {
      alert('Could not remove saved listing: ' + error.message);
      return;
    }

    saved.delete(listingId);
  } else {
    const { error } = await window.olojaSupabase
      .from('favorites')
      .insert({
        user_id: session.user.id,
        listing_id: listingId
      });

    if (error) {
      alert('Could not save listing: ' + error.message);
      return;
    }

    saved.add(listingId);
  }

  render();
  await renderDash();
}
window.toggleSave=toggleSave;
async function loadSavedFavorites() {
  const { data: { session } } =
    await window.olojaSupabase.auth.getSession();

  saved = new Set();

  if (!session || !session.user) {
    render();
    return;
  }

  const { data, error } = await window.olojaSupabase
    .from('favorites')
    .select('listing_id')
    .eq('user_id', session.user.id);

  if (error) {
    console.error('Could not load saved listings:', error);
    return;
  }

  saved = new Set(
    (data || []).map(row => String(row.listing_id))
  );

  render();
  await renderDash();
}
window.view=async id=>{let x=listings.find(a=>String(a.id)===String(id));
                       let photoUrls = x?.photoUrl ? [x.photoUrl] : [];

if (x?.sellerId) {
  const { data: photoRows, error: photoLoadError } =
    await window.olojaSupabase
      .from('listing_photos')
      .select('photo_url, sort_order')
      .eq('listing_id', id)
      .order('sort_order', { ascending: true });

  if (!photoLoadError && photoRows?.length) {
    photoUrls = photoRows
      .map(row => row.photo_url)
      .filter(Boolean);
  }
}
  const galleryHtml = photoUrls.length
  ? `<div class="detailPic" style="display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:8px;">
      ${photoUrls.map(url => `
        <img
          src="${esc(url)}"
          style="min-width:100%;height:100%;object-fit:cover;scroll-snap-align:start;"
        >
      `).join('')}
    </div>`
  : `<div class="detailPic">${x.icon || '🛍️'}</div>`;
    const videoHtml = x.videoUrl
  ? `<video controls playsinline
      style="width:100%;max-height:420px;border-radius:15px;margin-top:12px;background:#000;">
      <source src="${esc(x.videoUrl)}">
    </video>`
  : '';                   
modal.classList.remove('hidden');content.innerHTML=`<div class="detail">${galleryHtml}${videoHtml}<div class="cat">${esc(x.cat)}</div><h2>${esc(x.title)}</h2><h3>${money(x.price)}</h3><p>📍 ${esc(x.loc)}</p><p>${esc(x.desc)}</p><p class="muted">Seller: ${esc(x.seller||'OLOJA seller')}</p><div class="actions"><button class="primary" onclick="contactSeller('${x.id}')">Message seller</button>
<button class="ghost" onclick="viewSellerContact('${x.id}')">View seller contact</button><button class="ghost" onclick="toggleSave('${x.id}');closeModal()">${saved.has(x.id)?'Unsave':'Save'}</button></div></div>`};
window.viewSellerContact = async id => {
  const { data: { session } } =
    await window.olojaSupabase.auth.getSession();

  if (!session || !session.user) {
    alert('Please log in to view seller contact.');
    return;
  }

  const { data, error } = await window.olojaSupabase
    .rpc('get_listing_seller_contact', {
      p_listing_id: id
    });

  if (error) {
    alert('Could not load seller contact: ' + error.message);
    return;
  }

  const contact = Array.isArray(data) ? data[0] : data;

  if (!contact || (!contact.phone && !contact.whatsapp)) {
    alert('This seller has not added contact details yet.');
    return;
  }

  const phone = contact.phone || '';
  const whatsapp = contact.whatsapp || '';

  const phoneHref = phone.replace(/[^\d+]/g, '');

  let waNumber = whatsapp.replace(/\D/g, '');
  if (waNumber.startsWith('0')) {
    waNumber = '234' + waNumber.slice(1);
  }

  content.innerHTML = `
    <div class="detail">
      <h2>Seller contact</h2>

      ${phone ? `
        <p>📞 ${esc(phone)}</p>
        <a class="primary" href="tel:${phoneHref}">
          Call seller
        </a>
      ` : ''}

      ${whatsapp ? `
        <p>💬 ${esc(whatsapp)}</p>
        <a class="ghost"
           href="https://wa.me/${waNumber}"
           target="_blank"
           rel="noopener">
          Chat on WhatsApp
        </a>
      ` : ''}

      <button class="ghost" onclick="closeModal()">
        Close
      </button>
    </div>
  `;
};
window.contactSeller = async id => {
  const x = listings.find(a => String(a.id) === String(id));

  if (!x || !x.sellerId) {
    alert('Messaging is available for real OLOJA listings only.');
    return;
  }

  const { data: { session } } =
    await window.olojaSupabase.auth.getSession();

  if (!session || !session.user) {
    alert('Please log in to message the seller.');
    return;
  }

  if (session.user.id === x.sellerId) {
    alert('This is your own listing.');
    return;
  }

  let { data: conversation, error } = await window.olojaSupabase
    .from('conversations')
    .select('*')
    .eq('buyer_id', session.user.id)
    .eq('seller_id', x.sellerId)
    .eq('listing_id', x.id)
    .maybeSingle();

  if (error) {
    console.error('Could not open conversation:', error);
    alert('Could not open OLOJA chat: ' + error.message);
    return;
  }

  if (!conversation) {
    const { data, error: createError } = await window.olojaSupabase
      .from('conversations')
      .insert({
        buyer_id: session.user.id,
        seller_id: x.sellerId,
        listing_id: x.id
      })
      .select()
      .single();

    if (createError) {
      console.error('Could not create conversation:', createError);
      alert('Could not start OLOJA chat: ' + createError.message);
      return;
    }

    conversation = data;
  }

  const { data: messages, error: messageError } =
    await window.olojaSupabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversation.id)
      .order('created_at', { ascending: true });

  if (messageError) {
    alert('Could not load messages: ' + messageError.message);
    return;
  }

  modal.classList.remove('hidden');

  content.innerHTML = `
    <h2>Message seller</h2>
    <p><strong>${esc(x.title)}</strong></p>

    <div id="chatMessages">
      ${(messages || []).length
        ? messages.map(m => `
            <p>
              <strong>${m.sender_id === session.user.id ? 'You' : 'Seller'}:</strong>
              ${esc(m.message_text)}
            </p>
          `).join('')
        : '<p class="muted">No messages yet. Start the conversation.</p>'
      }
    </div>

    <textarea id="chatInput"
      placeholder="Write your message..."
      rows="4"></textarea>

    <button id="sendChatBtn" class="primary">
      Send message
    </button>
  `;

  document.querySelector('#sendChatBtn').onclick = async () => {
    const input = document.querySelector('#chatInput');
    const message = input.value.trim();

    if (!message) return;

    const { error: sendError } = await window.olojaSupabase
      .from('messages')
      .insert({
        conversation_id: conversation.id,
        sender_id: session.user.id,
        message_text: message
      });

    if (sendError) {
      alert('Could not send message: ' + sendError.message);
      return;
    }

    await window.contactSeller(id);
  };
};
window.deleteListing=id=>{if(confirm('Delete this listing?')){listings=listings.filter(x=>x.id!==id);saved.delete(id);persist();render()}};
function openSell(){modal.classList.remove('hidden');content.innerHTML=`<h2>Post on OLOJA</h2><p class="notice">This MVP stores your listing on this device. The production version will store listings in a secure cloud database.</p><form class="form" id="sellForm"><input name="title" placeholder="What are you selling?" required><input name="price" type="number" min="0" placeholder="Price in naira" required><select name="cat" required><option value="">Choose category</option>${categories.map(x=>`<option>${x}</option>`).join('')}</select><select name="state" id="sellState" required>
  <option value="">Choose state</option>
  ${nigeriaStates.map(state => `<option>${state}</option>`).join('')}
</select>

<select name="loc" id="sellArea" required disabled>
  <option value="">Choose area / city</option>
</select><input name="icon" placeholder="Emoji for prototype e.g. 📱"><textarea name="desc" placeholder="Describe the item honestly: condition, size, important details…" required></textarea><div id="photoInputs">
  <input type="file" name="photo" accept="image/*" required>
</div>
<label>Optional video (max 50MB)</label>
<input type="file" name="video" accept="video/*">
<button type="button" id="addPhotoBtn">+ Add another photo</button><button class="primary">Publish Listing</button></form>`;
                   const sellState = $('#sellState');
const sellArea = $('#sellArea');

sellState.onchange = () => {
  const areas = nigeriaAreas[sellState.value] || [];

  sellArea.innerHTML =
    '<option value="">Choose area / city</option>' +
    areas.map(area => `<option>${area}</option>`).join('');

  sellArea.disabled = areas.length === 0;
};$('#addPhotoBtn').onclick = () => {
  const box = $('#photoInputs');
  const count = box.querySelectorAll('input[type="file"]').length;

  if (count >= 6) {
    alert('You can upload up to 6 photos.');
    return;
  }

  const input = document.createElement('input');
  input.type = 'file';
  input.name = 'photo';
  input.accept = 'image/*';

  box.appendChild(input);
};$('#sellForm').onsubmit=async e=>{e.preventDefault();let f=new FormData(e.target);let item={id:Date.now(),title:f.get('title'),price:Number(f.get('price')),cat:f.get('cat'),state:f.get('state'),loc:f.get('loc'),desc:f.get('desc'),icon:f.get('icon')||'🛍️',seller:'You',owner:true};const listingId=await saveListingToSupabase(item);if(!listingId)return;const photos = f.getAll('photo').filter(file => file && file.size > 0);
                                    const video = f.get('video');

if (!photos.length) return;

let firstPhotoUrl = null;

for (let i = 0; i < photos.length; i++) {
  const photoUrl = await uploadListingPhoto(photos[i], listingId, i);

  if (!photoUrl) return;

  if (i === 0) {
    firstPhotoUrl = photoUrl;
  }
}
if (video && video.size > 0) {
  const videoUrl = await uploadListingVideo(video, listingId);

  if (videoUrl) {
    item.videoUrl = videoUrl;
  }
}
item.photoUrl = firstPhotoUrl;;listings.unshift(item);persist();closeModal();showPage('dashboard');render()}}
function closeModal(){$('#modal').classList.add('hidden')};function showPage(name)
{
  location.hash = name;
document.querySelectorAll('.page').forEach(x=>x.classList.add('hidden'));$(`#${name}Page`).classList.remove('hidden');if(name==='home')render();if(name==='favorites')render();if(name==='dashboard')renderDash();if(name==='messages')loadConversations();if(name==='account')loadProfile();};
window.addEventListener('load', () => {
  const savedPage = location.hash.replace('#', '');

  if (['home', 'favorites', 'messages', 'dashboard', 'account'].includes(savedPage)) {
    showPage(savedPage);
  }
});
async function loadProfile() {
  const { data: { session } } =
    await window.olojaSupabase.auth.getSession();

  if (!session || !session.user) return;

  const email = document.querySelector('#accountEmail');
  if (email) email.textContent = session.user.email;

  const { data: profile, error: profileError } =
    await window.olojaSupabase
      .from('profiles')
      .select('full_name, location')
      .eq('id', session.user.id)
      .maybeSingle();

  if (profileError) {
    console.error('Could not load profile:', profileError);
  }

  const { data: contact, error: contactError } =
    await window.olojaSupabase
      .from('profile_contacts')
      .select('phone, whatsapp')
      .eq('id', session.user.id)
      .maybeSingle();

  if (contactError) {
    console.error('Could not load contact details:', contactError);
  }

  document.querySelector('#profileName').value = profile?.full_name || '';
  document.querySelector('#profileLocation').value = profile?.location || '';
  document.querySelector('#profilePhone').value = contact?.phone || '';
  document.querySelector('#profileWhatsapp').value = contact?.whatsapp || '';
}
const profileForm = document.querySelector('#profileForm');

if (profileForm) {
  profileForm.onsubmit = async e => {
    e.preventDefault();

    const { data: { session } } =
      await window.olojaSupabase.auth.getSession();

    if (!session || !session.user) {
      alert('Please log in first.');
      return;
    }

    const fullName = document.querySelector('#profileName').value.trim();
    const location = document.querySelector('#profileLocation').value.trim();
    const phone = document.querySelector('#profilePhone').value.trim();
    const whatsapp = document.querySelector('#profileWhatsapp').value.trim();
    const now = new Date().toISOString();

    const { error: profileError } = await window.olojaSupabase
      .from('profiles')
      .upsert({
        id: session.user.id,
        full_name: fullName,
        location: location || null,
        updated_at: now
      });

    if (profileError) {
      alert('Could not save profile: ' + profileError.message);
      return;
    }

    const { error: contactError } = await window.olojaSupabase
      .from('profile_contacts')
      .upsert({
        id: session.user.id,
        phone: phone || null,
        whatsapp: whatsapp || null,
        updated_at: now
      });

    if (contactError) {
      alert('Could not save contact details: ' + contactError.message);
      return;
    }

    alert('Profile saved successfully!');
    await loadProfile();
  };
}
async function loadConversations() {
  const list = document.querySelector('#conversationsList');
  if (!list) return;

  const { data: { session } } =
    await window.olojaSupabase.auth.getSession();

  if (!session || !session.user) {
    list.innerHTML = '<p class="muted">Please log in to see your messages.</p>';
    return;
  }

  list.innerHTML = '<p class="muted">Loading messages...</p>';

  const { data: conversations, error } = await window.olojaSupabase
    .from('conversations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Could not load conversations:', error);
    list.innerHTML =
      '<p class="muted">Could not load your messages.</p>';
    return;
  }

  if (!conversations || conversations.length === 0) {
    list.innerHTML =
      '<p class="muted">No OLOJA conversations yet.</p>';
    return;
  }

  const rows = await Promise.all(
    conversations.map(async conversation => {

      const { data: listing } = await window.olojaSupabase
        .from('listings')
        .select('title')
        .eq('id', conversation.listing_id)
        .maybeSingle();
      const otherUserId =
  conversation.buyer_id === session.user.id
    ? conversation.seller_id
    : conversation.buyer_id;

const { data: otherProfile } = await window.olojaSupabase
  .from('profiles')
  .select('full_name')
  .eq('id', otherUserId)
  .maybeSingle();

const otherName = otherProfile?.full_name || 'OLOJA User';

      const { data: latest } = await window.olojaSupabase
        .from('messages')
        .select('message_text, sender_id, created_at')
        .eq('conversation_id', conversation.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      let who = 'Message';

      if (latest) {
        if (latest.sender_id === session.user.id) {
          who = 'You';
        } else if (conversation.seller_id === session.user.id) {
          who = otherName;
        } else {
          who = otherName;
        }
      }

      return `
        <div class="myitem" onclick="window.openConversation('${conversation.id}')">
          <div>
            <strong>${esc(listing?.title || 'OLOJA Listing')}</strong>
            <p>
              ${who}: ${esc(latest?.message_text || 'No messages yet')}
            </p>
          </div>
        </div>
      `;
    })
  );

  list.innerHTML = rows.join('');
}
async function updateUnreadBadge() {
  const badge = document.querySelector('#messageBadge');
  if (!badge) return;

  const { data: { session } } =
    await window.olojaSupabase.auth.getSession();

  if (!session || !session.user) {
    badge.classList.add('hidden');
    return;
  }

  const { count, error } = await window.olojaSupabase
    .from('messages')
    .select('id', { count: 'exact', head: true })
    .neq('sender_id', session.user.id)
    .is('read_at', null);

  if (error) {
    console.error('Could not count unread messages:', error);
    return;
  }

  if (count > 0) {
    badge.textContent = count;
    badge.classList.remove('hidden');
  } else {
    badge.textContent = '0';
    badge.classList.add('hidden');
  }
}
updateUnreadBadge();
window.openConversation = async conversationId => {
  const { data: { session } } =
    await window.olojaSupabase.auth.getSession();

  if (!session || !session.user) {
    alert('Please log in to open this conversation.');
    return;
  }

  const { data: conversation, error: conversationError } =
    await window.olojaSupabase
      .from('conversations')
      .select('*')
      .eq('id', conversationId)
      .single();

  if (conversationError || !conversation) {
    alert('Could not open this conversation.');
    return;
  }

  const { data: listing } = await window.olojaSupabase
    .from('listings')
    .select('title')
    .eq('id', conversation.listing_id)
    .maybeSingle();

  const { data: messages, error: messageError } =
    await window.olojaSupabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

  if (messageError) {
    alert('Could not load messages: ' + messageError.message);
    return;
  }
const { error: readError } = await window.olojaSupabase
  .rpc('mark_conversation_read', {
    p_conversation_id: conversationId
  });

if (readError) {
  console.error('Could not mark messages as read:', readError);
}

await updateUnreadBadge();
  modal.classList.remove('hidden');
const chatOtherUserId =
  conversation.buyer_id === session.user.id
    ? conversation.seller_id
    : conversation.buyer_id;

const { data: chatOtherProfile } = await window.olojaSupabase
  .from('profiles')
  .select('full_name')
  .eq('id', chatOtherUserId)
  .maybeSingle();

const chatOtherName = chatOtherProfile?.full_name || 'OLOJA User';
  content.innerHTML = `
    <h2>${esc(listing?.title || 'OLOJA Chat')}</h2>

    <div id="chatMessages">
      ${(messages || []).length
        ? messages.map(m => `
            <p>
              <strong>${m.sender_id === session.user.id ? 'You' : chatOtherName}:</strong>
              ${esc(m.message_text)}
            </p>
          `).join('')
        : '<p class="muted">No messages yet.</p>'
      }
    </div>

    <textarea id="chatInput"
      placeholder="Write your reply..."
      rows="4"></textarea>

    <button id="sendChatBtn" class="primary">
      Send message
    </button>
  `;

  document.querySelector('#sendChatBtn').onclick = async () => {
    const input = document.querySelector('#chatInput');
    const message = input.value.trim();

    if (!message) return;

    const { error: sendError } = await window.olojaSupabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: session.user.id,
        message_text: message
      });

    if (sendError) {
      alert('Could not send message: ' + sendError.message);
      return;
    }

    await window.openConversation(conversationId);
  };
};
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
  const fullName = prompt('Enter your full name:');
if (!fullName || !fullName.trim()) return;
  const email = prompt('Enter your email address:');
  if (!email) return;

  const password = prompt('Create a password (minimum 6 characters):');
  if (!password) return;

  const { data, error } = await window.olojaSupabase.auth.signUp({
  email: email,
password: password,
options: {
  data: {
    full_name: fullName.trim()
  }
}
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

  const { data, error } = await window.olojaSupabase
    .from('listings')
    .insert({
      title: item.title,
      price: item.price,
      listing_type: item.cat,
      state: item.state,
      location: item.loc,
      description: item.desc,
      seller_id: session.user.id
    })
.select('id')
.single();

  if (error) {
    console.error('Could not save listing:', error);
    alert('Could not post your listing: ' + error.message);
    return false;
  }

  console.log('OLOJA listing saved to Supabase!');
  return data.id;
}

// Upload a listing photo to Supabase Storage
async function uploadListingPhoto(file, listingId, sortOrder = 0) {
  if (!file || !listingId) return false;

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const filePath = `${listingId}/${Date.now()}-${safeName}`;

  const { error: uploadError } = await window.olojaSupabase.storage
    .from('listing-images')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Could not upload listing photo:', uploadError);
    alert('Could not upload photo: ' + uploadError.message);
    return false;
  }

  const { data: urlData } = window.olojaSupabase.storage
    .from('listing-images')
    .getPublicUrl(filePath);

  const { error: photoError } = await window.olojaSupabase
    .from('listing_photos')
    .insert({
      listing_id: listingId,
      photo_url: urlData.publicUrl,
      sort_order: sortOrder
    });

  if (photoError) {
    console.error('Could not save photo record:', photoError);
    alert('Photo uploaded, but could not attach it to the listing: ' + photoError.message);
    return false;
  }

  console.log('OLOJA listing photo uploaded!');
  return urlData.publicUrl;
}
async function uploadListingVideo(file, listingId) {
  if (!file || !listingId) return false;

  if (!file.type.startsWith('video/')) {
    alert('Please choose a valid video file.');
    return false;
  }

  if (file.size > 50 * 1024 * 1024) {
    alert('Video must be 50MB or smaller.');
    return false;
  }

  const { data: { session } } =
    await window.olojaSupabase.auth.getSession();

  if (!session || !session.user) {
    alert('Please log in first.');
    return false;
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
  const filePath =
    `${session.user.id}/${listingId}/${Date.now()}-${safeName}`;

  const { error: uploadError } =
    await window.olojaSupabase.storage
      .from('listing-videos')
      .upload(filePath, file);

  if (uploadError) {
    alert('Could not upload video: ' + uploadError.message);
    return false;
  }

  const { data: urlData } =
    window.olojaSupabase.storage
      .from('listing-videos')
      .getPublicUrl(filePath);

  const { error: updateError } =
    await window.olojaSupabase
      .from('listings')
      .update({ video_url: urlData.publicUrl })
      .eq('id', listingId)
      .eq('seller_id', session.user.id);

  if (updateError) {
    alert('Video uploaded but could not attach to listing: ' + updateError.message);
    return false;
  }

  return urlData.publicUrl;
}
// Add real Supabase listings to the Marketplace
async function loadCloudListings() {
  const { data, error } = await window.olojaSupabase
    .from('listings')
    .select('*, listing_photos(photo_url, sort_order)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Could not load cloud listings:', error);
    return;
  }
const sellerIds = [...new Set(
  (data || []).map(item => item.seller_id).filter(Boolean)
)];

let sellerNames = {};

if (sellerIds.length) {
  const { data: sellerProfiles, error: sellerProfileError } =
    await window.olojaSupabase
      .from('profiles')
      .select('id, full_name')
      .in('id', sellerIds);

  if (sellerProfileError) {
    console.error('Could not load seller names:', sellerProfileError);
  } else {
    sellerNames = Object.fromEntries(
      (sellerProfiles || []).map(profile => [
        profile.id,
        profile.full_name || 'OLOJA User'
      ])
    );
  }
}
  const cloudListings = (data || []).map(item => ({
    id: item.id,
    sellerId: item.seller_id,
    title: item.title,
    price: item.price,
    cat: item.listing_type || 'Product',
    loc: item.location || '',
    desc: item.description || '',
    photoUrl: item.listing_photos && item.listing_photos.length ? item.listing_photos[0].photo_url : null,
    videoUrl: item.video_url || null,
    icon: '🛍️',
    seller: sellerNames[item.seller_id] || 'OLOJA User',
    owner: false
  }));

  listings = [...cloudListings, ...seed];
  render();
}

loadCloudListings();
loadSavedFavorites();

const myAccountButton = document.querySelector('#loginBtn');

if (myAccountButton) {
  myAccountButton.addEventListener('click', async () => {
    const { data: { session } } =
      await window.olojaSupabase.auth.getSession();

    if (session && session.user) {
      await loadProfile();
    }
  });
}
