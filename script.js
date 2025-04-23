// Add this after the auth state listener
async function loadThreads() {
    const threadsContainer = document.querySelector('.row.g-4');
    threadsContainer.innerHTML = '';
  
    const snapshot = await db.collection('threads')
      .orderBy('createdAt', 'desc')
      .limit(4)
      .get();
  
    snapshot.forEach(doc => {
      const thread = doc.data();
      threadsContainer.innerHTML += `
        <div class="col-md-6">
          <div class="card h-100 shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-between mb-2">
                <span class="badge bg-${getCategoryColor(thread.category)}" style="font-size: 0.75rem;">
                  ${thread.category}
                </span>
                <small class="text-muted">${formatDate(thread.createdAt?.toDate())}</small>
              </div>
              <h3 class="h5 card-title">${thread.title}</h3>
              <p class="card-text">${thread.content}</p>
              <div class="d-flex align-items-center">
                <img src="https://i.pravatar.cc/150?u=${thread.authorId}" alt="User" 
                     class="rounded-circle me-2" style="width:30px; height:30px;">
                <span>${thread.author}</span>
                <span class="ms-auto">
                  <i class="bi bi-chat-square-text"></i> ${thread.replies} replies
                </span>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  }
  
  function getCategoryColor(category) {
    const colors = {
      'technical': 'info',
      'ethics': 'success',
      'future': 'warning',
      'policy': 'primary'
    };
    return colors[category] || 'secondary';
  }
  
  function formatDate(date) {
    if (!date) return 'Just now';
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'short'
    }).format(date);
  }
  
  // Call this when auth state changes
  auth.onAuthStateChanged(user => {
    // ... existing code ...
    loadThreads();
  });
// Call this on page load
document.addEventListener('DOMContentLoaded', () => {
    loadThreads();
  });
  
  // Add this to your existing auth state listener
  auth.onAuthStateChanged(user => {
    if (user) {
      // User is signed in, load threads
      loadThreads();
    } else {
      // User is signed out, clear threads
      document.querySelector('.row.g-4').innerHTML = '';
    }
  });
// Initialize Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
  