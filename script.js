/**
 * Construction Company One-Page Website
 * Modern, Mobile-First JavaScript
 */

(function () {
  'use strict';

  // --- 1. Theme Management (Light Mode as Default) ---
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlElement = document.documentElement;

  // Retrieve stored theme or default strictly to light mode
  function getPreferredTheme() {
    const userSelected = localStorage.getItem('theme_user_selected');
    if (userSelected) {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) return storedTheme;
    }
    // Default is strictly light mode
    return 'light';
  }

  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
      themeToggleBtn.setAttribute(
        'title',
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }
  }

  // Initialize theme with light mode default
  applyTheme(getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme_user_selected', 'true');
      applyTheme(newTheme);
    });
  }

  // --- 2. Mobile Navigation Drawer ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMobileNavBtn = document.getElementById('closeMobileNavBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileNav() {
    if (!mobileNav) return;
    mobileNav.removeAttribute('hidden');
    // slight RAF delay for CSS transform animation
    requestAnimationFrame(function () {
      mobileNav.classList.add('open');
      if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
      }
      document.body.style.overflow = 'hidden'; // prevent background scroll
    });
  }

  function closeMobileNav() {
    if (!mobileNav) return;
    mobileNav.classList.remove('open');
    if (mobileMenuBtn) {
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
    setTimeout(function () {
      if (!mobileNav.classList.contains('open')) {
        mobileNav.setAttribute('hidden', '');
      }
    }, 280);
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function () {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (closeMobileNavBtn) {
    closeMobileNavBtn.addEventListener('click', closeMobileNav);
  }

  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', closeMobileNav);
  }

  // Close drawer when any mobile nav link is clicked
  mobileNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMobileNav();
    });
  });

  // Close on Escape key press
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileNav && !mobileNav.hasAttribute('hidden')) {
      closeMobileNav();
    }
  });

  // --- 3. Sticky Navbar & Active Link Spy ---
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('main section[id]');

  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;

    // Navbar scrolled shadow class
    if (navbar) {
      if (scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll spy for navigation highlighting
    let currentSectionId = '';
    const scrollOffset = 180;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - scrollOffset;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + currentSectionId) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 4. FAQ Accordion ---
  const faqButtons = document.querySelectorAll('.faq-question-btn');

  faqButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const targetPanelId = btn.getAttribute('aria-controls');
      const targetPanel = document.getElementById(targetPanelId);

      // Close all other panels (clean accordion behavior)
      faqButtons.forEach(function (otherBtn) {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherPanelId = otherBtn.getAttribute('aria-controls');
          const otherPanel = document.getElementById(otherPanelId);
          if (otherPanel) {
            otherPanel.setAttribute('hidden', '');
          }
        }
      });

      // Toggle current panel
      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        if (targetPanel) {
          targetPanel.setAttribute('hidden', '');
        }
      } else {
        btn.setAttribute('aria-expanded', 'true');
        if (targetPanel) {
          targetPanel.removeAttribute('hidden');
        }
      }
    });
  });

  // --- 5. Quote Form & WhatsApp Direct Integration ---
  const quoteForm = document.getElementById('quoteForm');
  const waModal = document.getElementById('waModal');
  const modalMsgPreview = document.getElementById('modalMsgPreview');
  const modalConfirmBtn = document.getElementById('modalConfirmBtn');
  const modalCopyBtn = document.getElementById('modalCopyBtn');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  // Placeholder for target phone number (replace or sanitize digits for wa.me)
  const defaultWhatsAppNumber = '[number]';

  function validateField(input, errorElement, errorMessage) {
    if (!input.value.trim()) {
      input.classList.add('is-invalid');
      if (errorElement) errorElement.textContent = errorMessage;
      return false;
    } else {
      input.classList.remove('is-invalid');
      if (errorElement) errorElement.textContent = '';
      return true;
    }
  }

  if (quoteForm) {
    const nameInput = document.getElementById('clientName');
    const phoneInput = document.getElementById('clientPhone');
    const locationInput = document.getElementById('projectLocation');
    const typeSelect = document.getElementById('projectType');
    const budgetSelect = document.getElementById('roughBudget');
    const notesInput = document.getElementById('projectNotes');

    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const locationError = document.getElementById('locationError');
    const typeError = document.getElementById('typeError');
    const budgetError = document.getElementById('budgetError');

    // Live validation cleanup on input
    [nameInput, phoneInput, locationInput].forEach(function (inp) {
      if (inp) {
        inp.addEventListener('input', function () {
          inp.classList.remove('is-invalid');
          const err = inp.parentElement.nextElementSibling;
          if (err && err.classList.contains('field-error')) err.textContent = '';
        });
      }
    });

    [typeSelect, budgetSelect].forEach(function (sel) {
      if (sel) {
        sel.addEventListener('change', function () {
          sel.classList.remove('is-invalid');
          const err = sel.parentElement.nextElementSibling;
          if (err && err.classList.contains('field-error')) err.textContent = '';
        });
      }
    });

    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;
      isValid = validateField(nameInput, nameError, 'Please enter your name.') && isValid;
      isValid = validateField(phoneInput, phoneError, 'Please enter your contact phone number.') && isValid;
      isValid = validateField(locationInput, locationError, 'Please enter your project location or city.') && isValid;
      isValid = validateField(typeSelect, typeError, 'Please select a project type.') && isValid;
      isValid = validateField(budgetSelect, budgetError, 'Please select your rough budget range.') && isValid;

      if (!isValid) {
        // Focus first invalid element
        const firstInvalid = quoteForm.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Format WhatsApp Message in clean, professional plain text
      const clientName = nameInput.value.trim();
      const clientPhone = phoneInput.value.trim();
      const projectLoc = locationInput.value.trim();
      const projectType = typeSelect.value;
      const roughBudget = budgetSelect.value;
      const notes = notesInput ? notesInput.value.trim() : '';

      let messageText = `*CONSTRUCTION QUOTE REQUEST*\n`;
      messageText += `---------------------------------\n`;
      messageText += `*Name:* ${clientName}\n`;
      messageText += `*Phone:* ${clientPhone}\n`;
      messageText += `*Location:* ${projectLoc}\n`;
      messageText += `*Project Type:* ${projectType}\n`;
      messageText += `*Rough Budget:* ${roughBudget}\n`;
      if (notes) {
        messageText += `*Notes & Timeline:* ${notes}\n`;
      }
      messageText += `---------------------------------\n`;
      messageText += `Sent via [Company Name] Website`;

      // Build WhatsApp URL
      // If defaultWhatsAppNumber has digits, extract them; otherwise fallback to wa.me with text
      const cleanPhone = defaultWhatsAppNumber.replace(/[^0-9]/g, '');
      const waUrl = cleanPhone.length > 5
        ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`
        : `https://wa.me/[number]?text=${encodeURIComponent(messageText)}`;

      // Show Confirmation Modal
      if (waModal && modalMsgPreview && modalConfirmBtn) {
        modalMsgPreview.textContent = messageText;
        modalConfirmBtn.setAttribute('href', waUrl);
        waModal.removeAttribute('hidden');
        modalConfirmBtn.focus();
      } else {
        // Direct open fallback if modal elements missing
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }
    });
  }

  // Modal actions
  if (modalCloseBtn && waModal) {
    modalCloseBtn.addEventListener('click', function () {
      waModal.setAttribute('hidden', '');
    });
  }

  if (waModal) {
    waModal.addEventListener('click', function (e) {
      if (e.target === waModal) {
        waModal.setAttribute('hidden', '');
      }
    });
  }

  if (modalCopyBtn && modalMsgPreview) {
    modalCopyBtn.addEventListener('click', function () {
      const textToCopy = modalMsgPreview.textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(function () {
          modalCopyBtn.textContent = 'Copied to Clipboard!';
          setTimeout(function () {
            modalCopyBtn.textContent = 'Copy Message Text';
          }, 2500);
        }).catch(function () {
          alert('Could not auto-copy. You can highlight and copy the text preview above.');
        });
      } else {
        alert('Copying not supported on this browser. You can select the text directly.');
      }
    });
  }

  // --- 6. Set Dynamic Copyright Year ---
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // --- 7. Direct Photo Upload & Owner Photo Manager ---
  const DB_NAME = 'ConstructionPhotosDB';
  const STORE_NAME = 'photos';

  function openPhotoDB() {
    return new Promise(function (resolve) {
      if (!window.indexedDB) {
        resolve(null);
        return;
      }
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = function (e) {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = function () {
        resolve(request.result);
      };
      request.onerror = function () {
        resolve(null); // fallback gracefully if private browsing restricts IndexedDB
      };
    });
  }

  async function savePhoto(slotId, dataUrl) {
    try {
      const db = await openPhotoDB();
      if (db) {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put(dataUrl, slotId);
      } else {
        localStorage.setItem('slot_photo_' + slotId, dataUrl);
      }
    } catch (e) {
      console.warn('Could not persist photo in IndexedDB:', e);
      try {
        localStorage.setItem('slot_photo_' + slotId, dataUrl);
      } catch (err) {}
    }
  }

  async function getPhoto(slotId) {
    try {
      const db = await openPhotoDB();
      if (db) {
        return new Promise(function (resolve) {
          const tx = db.transaction(STORE_NAME, 'readonly');
          const req = tx.objectStore(STORE_NAME).get(slotId);
          req.onsuccess = function () {
            resolve(req.result || localStorage.getItem('slot_photo_' + slotId));
          };
          req.onerror = function () {
            resolve(localStorage.getItem('slot_photo_' + slotId));
          };
        });
      }
      return localStorage.getItem('slot_photo_' + slotId);
    } catch (e) {
      return localStorage.getItem('slot_photo_' + slotId);
    }
  }

  async function getAllPhotos() {
    const photos = {};
    try {
      const db = await openPhotoDB();
      if (db) {
        await new Promise(function (resolve) {
          const tx = db.transaction(STORE_NAME, 'readonly');
          const store = tx.objectStore(STORE_NAME);
          const req = store.openCursor();
          req.onsuccess = function (e) {
            const cursor = e.target.result;
            if (cursor) {
              photos[cursor.key] = cursor.value;
              cursor.continue();
            } else {
              resolve();
            }
          };
          req.onerror = function () {
            resolve();
          };
        });
      }
    } catch (e) {}

    // Check localStorage fallback keys as well
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('slot_photo_')) {
        const slotId = key.replace('slot_photo_', '');
        if (!photos[slotId]) {
          photos[slotId] = localStorage.getItem(key);
        }
      }
    }
    return photos;
  }

  async function deletePhoto(slotId) {
    try {
      const db = await openPhotoDB();
      if (db) {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).delete(slotId);
      }
      localStorage.removeItem('slot_photo_' + slotId);
    } catch (e) {
      localStorage.removeItem('slot_photo_' + slotId);
    }
  }

  async function clearAllPhotos() {
    try {
      const db = await openPhotoDB();
      if (db) {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).clear();
      }
    } catch (e) {}
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith('slot_photo_')) {
        localStorage.removeItem(key);
      }
    }
  }

  // Client-side image resize & compression using Canvas
  function compressImage(file, maxDimension = 1600, quality = 0.85) {
    return new Promise(function (resolve, reject) {
      if (!file || !file.type.match(/^image\//i)) {
        reject(new Error('Please select a valid image file.'));
        return;
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          let width = img.naturalWidth || img.width;
          let height = img.naturalHeight || img.height;

          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          const dataUrl = canvas.toDataURL(mimeType, quality);
          resolve(dataUrl);
        };
        img.onerror = function () {
          reject(new Error('Failed to load image file.'));
        };
        img.src = e.target.result;
      };
      reader.onerror = function () {
        reject(new Error('Failed to read file.'));
      };
      reader.readAsDataURL(file);
    });
  }

  // UI Slot Rendering (Updates both on-page cards and studio modal)
  function renderSlotUI(slotId, dataUrl) {
    // 1. Update On-Page Live Card
    const slotEl = document.querySelector(`.photo-slot[data-slot-id="${slotId}"]`);
    if (slotEl) {
      const placeholder = slotEl.querySelector('.photo-placeholder-box, .team-photo-placeholder, .hero-blueprint-view');
      const liveWrap = slotEl.querySelector('.project-live-wrap, .team-live-wrap, .hero-live-wrap');
      const img = slotEl.querySelector('.slot-img');

      if (img && liveWrap && placeholder) {
        img.src = dataUrl;
        placeholder.setAttribute('hidden', '');
        liveWrap.removeAttribute('hidden');
      }
    }

    // 2. Update Studio Modal Item
    const studioItem = document.querySelector(`.studio-slot-item[data-studio-slot="${slotId}"]`);
    if (studioItem) {
      const thumbImg = studioItem.querySelector('.studio-thumb-img');
      const thumbPlaceholder = studioItem.querySelector('.studio-thumb-placeholder');
      const resetBtn = studioItem.querySelector('.btn-studio-slot-reset');
      const uploadText = studioItem.querySelector('.btn-text-upload');

      if (thumbImg && thumbPlaceholder) {
        thumbImg.src = dataUrl;
        thumbImg.removeAttribute('hidden');
        thumbPlaceholder.setAttribute('hidden', '');
      }
      if (resetBtn) resetBtn.removeAttribute('hidden');
      if (uploadText) uploadText.textContent = 'Change';
    }
  }

  function resetSlotUI(slotId) {
    // 1. Reset On-Page Live Card
    const slotEl = document.querySelector(`.photo-slot[data-slot-id="${slotId}"]`);
    if (slotEl) {
      const placeholder = slotEl.querySelector('.photo-placeholder-box, .team-photo-placeholder, .hero-blueprint-view');
      const liveWrap = slotEl.querySelector('.project-live-wrap, .team-live-wrap, .hero-live-wrap');
      const img = slotEl.querySelector('.slot-img');

      if (img && liveWrap && placeholder) {
        img.src = '';
        liveWrap.setAttribute('hidden', '');
        placeholder.removeAttribute('hidden');
      }
    }

    // 2. Reset Studio Modal Item
    const studioItem = document.querySelector(`.studio-slot-item[data-studio-slot="${slotId}"]`);
    if (studioItem) {
      const thumbImg = studioItem.querySelector('.studio-thumb-img');
      const thumbPlaceholder = studioItem.querySelector('.studio-thumb-placeholder');
      const resetBtn = studioItem.querySelector('.btn-studio-slot-reset');
      const uploadText = studioItem.querySelector('.btn-text-upload');

      if (thumbImg && thumbPlaceholder) {
        thumbImg.src = '';
        thumbImg.setAttribute('hidden', '');
        thumbPlaceholder.removeAttribute('hidden');
      }
      if (resetBtn) resetBtn.setAttribute('hidden', '');
      if (uploadText) uploadText.textContent = 'Choose Photo';
    }
  }

  // Toast Notification System
  const ownerToast = document.getElementById('ownerToast');
  const ownerToastText = document.getElementById('ownerToastText');
  let toastTimer = null;
  function showToast(message) {
    if (!ownerToast || !ownerToastText) return;
    ownerToastText.textContent = message;
    ownerToast.removeAttribute('hidden');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      ownerToast.setAttribute('hidden', '');
    }, 3500);
  }

  // Badge & Status Elements
  const TOTAL_SLOTS = 8;
  const ownerPhotoBar = document.getElementById('ownerPhotoBar');
  const ownerPhotoCount = document.getElementById('ownerPhotoCount');
  const headerPhotoCount = document.getElementById('headerPhotoCount');
  const mobilePhotoCount = document.getElementById('mobilePhotoCount');
  const topPhotoCount = document.getElementById('topPhotoCount');
  const floatingPhotoCount = document.getElementById('floatingPhotoCount');
  const studioModalBadge = document.getElementById('studioModalBadge');

  async function updateOwnerBar() {
    const photos = await getAllPhotos();
    const count = Object.keys(photos).length;
    const ratioText = `${count}/${TOTAL_SLOTS}`;

    if (headerPhotoCount) headerPhotoCount.textContent = ratioText;
    if (mobilePhotoCount) mobilePhotoCount.textContent = ratioText;
    if (topPhotoCount) topPhotoCount.textContent = ratioText;
    if (floatingPhotoCount) floatingPhotoCount.textContent = ratioText;
    if (studioModalBadge) studioModalBadge.textContent = `${count} / ${TOTAL_SLOTS} Photos Added`;

    if (ownerPhotoBar && ownerPhotoCount) {
      if (count > 0) {
        ownerPhotoCount.textContent = `${count} photo${count === 1 ? '' : 's'} inserted`;
        ownerPhotoBar.removeAttribute('hidden');
      } else {
        ownerPhotoBar.setAttribute('hidden', '');
      }
    }
  }

  // Owner Studio Modal Controls
  const ownerStudioModal = document.getElementById('ownerStudioModal');
  const openOwnerStudioBtn = document.getElementById('openOwnerStudioBtn');
  const mobileOwnerStudioBtn = document.getElementById('mobileOwnerStudioBtn');
  const topSpecOwnerBtn = document.getElementById('topSpecOwnerBtn');
  const floatingOwnerBtn = document.getElementById('floatingOwnerBtn');
  const barOpenStudioBtn = document.getElementById('barOpenStudioBtn');
  const closeStudioBtn = document.getElementById('closeStudioBtn');
  const closeStudioFooterBtn = document.getElementById('closeStudioFooterBtn');

  function openStudio() {
    if (!ownerStudioModal) return;
    ownerStudioModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeStudio() {
    if (!ownerStudioModal) return;
    ownerStudioModal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  [openOwnerStudioBtn, topSpecOwnerBtn, floatingOwnerBtn, barOpenStudioBtn].forEach(function (btn) {
    if (btn) btn.addEventListener('click', openStudio);
  });

  if (mobileOwnerStudioBtn) {
    mobileOwnerStudioBtn.addEventListener('click', function () {
      if (mobileNav) {
        mobileNav.setAttribute('hidden', '');
        if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
      openStudio();
    });
  }

  [closeStudioBtn, closeStudioFooterBtn].forEach(function (btn) {
    if (btn) btn.addEventListener('click', closeStudio);
  });

  if (ownerStudioModal) {
    ownerStudioModal.addEventListener('click', function (e) {
      if (e.target === ownerStudioModal) closeStudio();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && ownerStudioModal && !ownerStudioModal.hasAttribute('hidden')) {
      closeStudio();
    }
  });

  // Handle direct file upload from <input type="file" class="slot-file-input">
  // Handles inputs on project cards, hero card, team card, AND studio modal!
  document.addEventListener('change', async function (e) {
    const input = e.target;
    if (!input || !input.classList.contains('slot-file-input')) return;

    const file = input.files && input.files[0];
    if (!file) return;

    const slotId = input.getAttribute('data-slot');
    if (!slotId) return;

    try {
      const compressedDataUrl = await compressImage(file);
      renderSlotUI(slotId, compressedDataUrl);
      await savePhoto(slotId, compressedDataUrl);
      await updateOwnerBar();
      const prettyName = slotId.replace('-', ' ').toUpperCase();
      showToast(`Photo saved for ${prettyName}!`);
    } catch (err) {
      alert('Could not load image: ' + err.message);
    } finally {
      input.value = ''; // reset so same file can be re-selected
    }
  });

  // Handle Batch Upload in Studio
  const batchPhotoInput = document.getElementById('batchPhotoInput');
  if (batchPhotoInput) {
    batchPhotoInput.addEventListener('change', async function (e) {
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;

      const slotsOrder = [
        'project-1',
        'project-2',
        'project-3',
        'project-4',
        'project-5',
        'project-6',
        'hero-photo',
        'team-photo'
      ];

      let uploadedCount = 0;
      for (let i = 0; i < files.length && i < slotsOrder.length; i++) {
        const file = files[i];
        const slotId = slotsOrder[i];
        try {
          const compressedDataUrl = await compressImage(file);
          renderSlotUI(slotId, compressedDataUrl);
          await savePhoto(slotId, compressedDataUrl);
          uploadedCount++;
        } catch (err) {
          console.error('Batch upload error for ' + slotId, err);
        }
      }

      await updateOwnerBar();
      batchPhotoInput.value = '';
      showToast(`Batch uploaded ${uploadedCount} photo${uploadedCount === 1 ? '' : 's'} successfully!`);
    });
  }

  // Handle View on Page (Jump with visual spotlight)
  document.addEventListener('click', function (e) {
    const jumpBtn = e.target.closest('[data-jump-section]');
    if (jumpBtn) {
      const selector = jumpBtn.getAttribute('data-jump-section');
      if (selector) {
        closeStudio();
        setTimeout(function () {
          const targetEl = document.querySelector(selector);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetEl.style.transition = 'outline 0.3s ease';
            targetEl.style.outline = '4px solid #f97316';
            setTimeout(function () {
              targetEl.style.outline = '';
            }, 2500);
          }
        }, 150);
      }
    }
  });

  // Handle reset single slot button
  document.addEventListener('click', async function (e) {
    const resetBtn = e.target.closest('[data-reset-slot]');
    if (resetBtn) {
      const slotId = resetBtn.getAttribute('data-reset-slot');
      if (slotId && confirm('Reset this photo back to the blueprint placeholder?')) {
        resetSlotUI(slotId);
        await deletePhoto(slotId);
        await updateOwnerBar();
        const prettyName = slotId.replace('-', ' ').toUpperCase();
        showToast(`Reset ${prettyName} to blueprint.`);
      }
    }
  });

  // Handle Drag-and-Drop onto photo slots on page
  const photoSlots = document.querySelectorAll('.photo-slot');
  photoSlots.forEach(function (slot) {
    const slotId = slot.getAttribute('data-slot-id');

    ['dragenter', 'dragover'].forEach(function (eventName) {
      slot.addEventListener(eventName, function (e) {
        e.preventDefault();
        e.stopPropagation();
        slot.classList.add('drag-over');
      });
    });

    ['dragleave', 'drop'].forEach(function (eventName) {
      slot.addEventListener(eventName, function (e) {
        e.preventDefault();
        e.stopPropagation();
        slot.classList.remove('drag-over');
      });
    });

    slot.addEventListener('drop', async function (e) {
      const dt = e.dataTransfer;
      const file = dt && dt.files && dt.files[0];
      if (file && slotId) {
        try {
          const compressedDataUrl = await compressImage(file);
          renderSlotUI(slotId, compressedDataUrl);
          await savePhoto(slotId, compressedDataUrl);
          await updateOwnerBar();
          const prettyName = slotId.replace('-', ' ').toUpperCase();
          showToast(`Photo saved for ${prettyName}!`);
        } catch (err) {
          alert('Could not load dropped image: ' + err.message);
        }
      }
    });
  });

  // Reset All Custom Photos (Both bottom bar and studio button)
  async function handleResetAll() {
    if (confirm('Are you sure you want to reset all custom photos back to blueprint placeholders?')) {
      await clearAllPhotos();
      const allSlots = ['hero-photo', 'project-1', 'project-2', 'project-3', 'project-4', 'project-5', 'project-6', 'team-photo'];
      allSlots.forEach(function (id) {
        resetSlotUI(id);
      });
      await updateOwnerBar();
      showToast('All photos reset to blueprints.');
    }
  }

  const resetAllPhotosBtn = document.getElementById('resetAllPhotosBtn');
  const studioResetAllBtn = document.getElementById('studioResetAllBtn');
  if (resetAllPhotosBtn) resetAllPhotosBtn.addEventListener('click', handleResetAll);
  if (studioResetAllBtn) studioResetAllBtn.addEventListener('click', handleResetAll);

  // Download updated HTML with photos embedded (Both bottom bar and studio button)
  function handleDownloadHtml() {
    const docClone = document.documentElement.cloneNode(true);

    // Clean up temporary UI elements in exported file
    const barInClone = docClone.querySelector('#ownerPhotoBar');
    if (barInClone) barInClone.setAttribute('hidden', '');
    const modalInClone = docClone.querySelector('#ownerStudioModal');
    if (modalInClone) modalInClone.setAttribute('hidden', '');
    const toastInClone = docClone.querySelector('#ownerToast');
    if (toastInClone) toastInClone.setAttribute('hidden', '');

    const htmlContent = '<!DOCTYPE html>\n' + docClone.outerHTML;
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(downloadUrl);
    showToast('Downloaded index.html with all photos embedded!');
  }

  const downloadHtmlBtn = document.getElementById('downloadHtmlBtn');
  const studioDownloadBtn = document.getElementById('studioDownloadBtn');
  if (downloadHtmlBtn) downloadHtmlBtn.addEventListener('click', handleDownloadHtml);
  if (studioDownloadBtn) studioDownloadBtn.addEventListener('click', handleDownloadHtml);

  // Restore saved photos on page load
  async function initSavedPhotos() {
    try {
      const photos = await getAllPhotos();
      for (const [slotId, dataUrl] of Object.entries(photos)) {
        if (dataUrl) {
          renderSlotUI(slotId, dataUrl);
        }
      }
      await updateOwnerBar();
    } catch (e) {
      console.warn('Could not restore photos:', e);
    }
  }

  initSavedPhotos();

})();

