import { getFirestore, collection, addDoc, getDocs} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
const db = getFirestore();
const dbRef = collection(db, "userInfo");


const btnLatestSermon = document.querySelector('#latestSermon');
console.log(btnLatestSermon)
const btnLivestream = document.querySelector('#livestream');
const LatestSermon = document.querySelector('#section--3');
const liveStreaming = document.querySelector('#section--2');
const section1 = document.querySelector('#section--1');
const footer = document.querySelector('.footer');
const nav = document.querySelector('.nav');
const scrollToTop = document.querySelector('.scroll');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
let userFirstName = document.getElementById('first--name');
let userLastName = document.getElementById('last--name');
let userEmail = document.getElementById('email--address');
let userPassword = document.getElementById('password');
let userConfirmedPassword = document.getElementById('cpassword');
let btnRegisterUser = document.getElementById('register--user');
let btnLoginUser = document.getElementById('login-user');
let messageSignUp = document.getElementById('message--sign--up');
let messageSignIn = document.getElementById('message--sign--in');
const signUp = document.querySelectorAll('#sign--up');
const btncloseModal = document.querySelectorAll('#close--modal');
const sigIn = document.querySelectorAll('#sign--in');
let userLoginEmail = document.getElementById('user-login-email');
let userLoginPassword = document.getElementById('user-login-password');

  

function toggleSidebar() {
  const nav__responsive = document.querySelector('.nav__responsive');
  nav__responsive.classList.add('active');
  nav__responsive.style.display = 'flex';
}

function closeSidebar() {
  const nav__responsive = document.querySelector('.nav__responsive');
  nav__responsive.classList.remove('active');
  nav__responsive.style.display = 'none';
}

// Check screen size on load
window.addEventListener('load', function() {
  checkScreenSize();
});

// Check screen size on resize
window.addEventListener('resize', function() {
  checkScreenSize();
});

function checkScreenSize() {
  const screenWidth = window.innerWidth;
  const nav__responsive = document.querySelector('.nav__responsive');
  const toggleIcon = document.querySelector('.bi-justify-left');

  if (screenWidth < 600) {
    toggleIcon.style.display = 'block'; // Show toggle button
    nav__responsive.style.justifyContent = 'center';
    nav__responsive.style.alignItems = 'center';
  } else {
    toggleIcon.style.display = 'none'; // Hide toggle button
    nav__responsive.style.display = 'none'; // Hide responsive nav
  }
}

document.querySelector('.bi-justify-left').addEventListener('click', toggleSidebar);
document.querySelector('#close--menu').addEventListener('click', closeSidebar);









  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal('signUp');
      closeModal('sigIn');
    }
  });



const openModal = function (modalId) {
  const modal = document.getElementById(modalId);
  
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};


const closeModal = function (modalId) {
  const modal = document.getElementById(modalId);
  
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

signUp.forEach(function(signup){
  signup.addEventListener('click', function(e){
    e.preventDefault();
    openModal('signUp');
    closeSidebar()
  });
})
// sigIn.forEach(function(signin){
//   signin.addEventListener('click', function(e){
//     e.preventDefault();
//     openModal('signIn');
//     closeSidebar()
//   });
// })



for(const modal of btncloseModal){
  modal.addEventListener('click', function(e){
    closeModal('signUp');
    closeModal('signIn');
  })
}

const userInputs = function(inputs) {
  let isValid = true;
  inputs.forEach(function(input) {
    if (input.value.trim() === "") {
      input.style.border = "2px solid red";
      isValid = false;
    } else {
      input.style.border = "2px solid green"; 
    }
  });
  return isValid;
}

function isEmailValid(emailInput) {
  const email = emailInput.value.trim();
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

const registerUser = async function() {
  btnRegisterUser.addEventListener('click', async function() {
    const areInputsValid = userInputs([userFirstName, userLastName, userEmail, userPassword, userConfirmedPassword]);
    const isEmailValidFlag = isEmailValid(userEmail);

    if (!areInputsValid) {
      messageSignUp.innerHTML = "Please fill out all fields.";
      messageSignUp.style.color = "red";
      messageSignUp.style.fontSize = "1.5rem";
    } else if (!isEmailValidFlag) {
      messageSignUp.innerHTML = "Please input a valid email.";
      messageSignUp.style.color = "red";
      messageSignUp.style.fontSize = "1.5rem";
    } else {
      if (!navigator.onLine) {
        messageSignUp.innerHTML = "No internet connection. Please check your connection and try again.";
        messageSignUp.style.color = "red";
        messageSignUp.style.fontSize = "1.5rem";
        return;
      }
      try {
        messageSignUp.innerHTML = "Please wait..........";
        messageSignUp.style.color = "white";
        messageSignUp.style.fontSize = "1.5rem";
        await addDoc(dbRef, {
          firstName: userFirstName.value,
          lastName: userLastName.value,
          email: userEmail.value,
          password: userPassword.value,
        });
        messageSignUp.innerHTML = "User registered successfully.";
        messageSignUp.style.color = "green";
        messageSignUp.style.fontSize = "1.5rem";
      
        setTimeout(() =>{
          closeModal('signUp');
          messageSignUp.innerHTML = "";
          userFirstName.value = "",
          userLastName.value = "",
          userConfirmedPassword.value = "",
          userEmail.value = "",
          userPassword.value = ""
        },2000)
      } catch (error) {
        console.error("Error adding document: ", error);
        if (error.message.includes('network')) {
          messageSignUp.innerHTML = "Error registering user. Please check your internet connection.";
        } else {
          messageSignUp.innerHTML = "Error registering user. Please try again.";
        }
        messageSignUp.style.color = "red";
        messageSignUp.style.fontSize = "1.5rem";
      }
    }
  });
};
registerUser();



// const loginUser = async function() {
//   btnLoginUser.addEventListener("click", async function() {
//     const areInputsValid = userInputs([userLoginEmail, userLoginPassword]);
//     const isEmailValidFlag = isEmailValid(userLoginEmail);

//     if (!areInputsValid) {
//       messageSignIn.innerHTML = "Please fill out all fields.";
//       messageSignIn.style.color = "red";
//       messageSignIn.style.fontSize = "1.5rem";
//     } else if (!isEmailValidFlag) {
//       messageSignIn.innerHTML = "Please input a valid email.";
//       messageSignIn.style.color = "red";
//       messageSignIn.style.fontSize = "1.5rem";
//     } else {
//       if (!navigator.onLine) {
//         messageSignIn.innerHTML = "No internet connection. Please check your connection and try again.";
//         messageSignIn.style.color = "red";
//         messageSignIn.style.fontSize = "1.5rem";
//         return;
//       }

//       try {
//         messageSignIn.innerHTML = "Please wait..........";
//         messageSignIn.style.color = "white";
//         messageSignIn.style.fontSize = "1.5rem";

//         const docsnap = await getDocs(dbRef);
//         let userFound = false;

//         docsnap.forEach(function(doc) {
//           const userData = doc.data();
//           if (userData.email === userLoginEmail.value) {
//             userFound = true;
//             if (userData.password === userLoginPassword.value) {
//               messageSignIn.innerHTML = "Login successful.";
//               messageSignIn.style.color = "green";
//               messageSignIn.style.fontSize = "1.5rem";
//               setTimeout(function() {
//                 closeModal('signIn');
//                 messageSignIn.innerHTML = '';
//                 userLoginEmail.value = '';
//                 userLoginPassword.value = '';
//               }, 2000);
//             } else {
//               messageSignIn.innerHTML = "Incorrect password.";
//               messageSignIn.style.color = "red";
//               messageSignIn.style.fontSize = "1.5rem";
//             }
//           }
//         });

//         if (!userFound) {
//           messageSignIn.innerHTML = "There is no account associated with this email.";
//           messageSignIn.style.color = "red";
//           messageSignIn.style.fontSize = "1.5rem";
//         }
//       } catch (error) {
//         messageSignIn.innerHTML = "Error logging in. Please check your internet connection.";
//         messageSignIn.style.color = "red";
//         messageSignIn.style.fontSize = "1.5rem";
//         console.log(error);
//       }
//     }
//   });
// };

// loginUser();




 btnLatestSermon.addEventListener('click', function(e){
    e.preventDefault()
  LatestSermon.scrollIntoView({behavior: 'smooth'});
  });

  btnLivestream.addEventListener('click', function(e){
    e.preventDefault()
    liveStreaming.scrollIntoView({behavior: 'smooth'});
  });

  //PAGE NAVIAGTOr
  document.querySelectorAll('.nav__link').forEach(function(el){
    el.addEventListener('click', function(e){
      e.preventDefault();
      const id = this.getAttribute('href');
      document.querySelector(id).scrollIntoView({behavior: 'smooth'});
      closeSidebar()
    })
  })
  

  const initialCoords = section1.getBoundingClientRect();
  window.addEventListener('scroll', function(){
    if(window.scrollY >= initialCoords.top) {
        nav.classList.add('sticky')
        // console.log('TRUE');
    }
        
      else nav.classList.remove('sticky')
  })

  const lastCoords = footer.getBoundingClientRect();
  window.addEventListener('scroll', ()=>{
  if(window.scrollY >= lastCoords.top) scrollToTop.classList.remove('scroll--hidden')
  else scrollToTop.classList.add('scroll--hidden')
  })
  scrollToTop.addEventListener('click', function(){
        document.querySelector('#head').scrollIntoView({behavior: 'smooth'});
  });

const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root:null,
  threshold: 0.15,
})


allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})
const imgTarget = document.querySelectorAll('img[data-src]');

const loading = function(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting)  return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  })
observer.unobserve(entry.target);

}
const imgObserver = new IntersectionObserver(loading, {
  root:null,
  threshold:0,
  // rootMargin:'-200px',
})

imgTarget.forEach(img => imgObserver.observe(img));

  



const API_KEY = 'AIzaSyC4r98u1CX6XzzOVezT1iEnGkyIg3mJzaY';
const CHANNEL_ID = 'UCuNDY-MatvVCSYe2TjpKbmQ';

// Fetch the live stream



async function fetchLiveStream() {
  try{
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&eventType=live&key=${API_KEY}`);
    
    const data = await response.json()
        console.log(data) 
    if (data.items && data.items.length > 0) {
        const liveVideoId = data.items[0].id.videoId
        console.log(liveVideoId) 
        displayLiveStream(liveVideoId);
        document.getElementById('live--stream--text').innerHTML = '<i class="bi bi-broadcast"></i> We are Live';
    } else {
        document.getElementById('live--stream--text').innerHTML = '<i class="bi bi-broadcast"></i> No live stream available';
    }
  }catch(error){
    console.log(error, 'Error');
  }
    
}

// Display the live stream
function displayLiveStream(videoId) {
    const liveStreamContainer = document.getElementById('live-stream');
    liveStreamContainer.innerHTML = `
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;
}

// Fetch past videos
async function fetchPastVideos() {
  try{
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=date&key=${API_KEY}`);
    const data = await response.json();
    console.log(data)
    if (data.items) {
        displayPastVideos(data.items);
    }
  }catch(err){
    console.log(err, 'Ello');
  }
}

async function fetchAllVideos(pageToken = '') {
    let videos = [];
    let nextPageToken = pageToken;

    do {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=date&pageToken=${nextPageToken}&key=${API_KEY}`);
        const data = await response.json();
        console.log(data);
        videos = videos.concat(data.items);
        nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    return videos;
}

function displayPastVideos(videos) {
    const pastVideosContainer = document.getElementById('past-videos');
    pastVideosContainer.innerHTML = videos.map(video => `
        <div class="video">
            <iframe src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p>${video.snippet.title}</p>
        </div>
    `).join('');
}

async function init() {
    const videos = await fetchAllVideos();
    displayPastVideos(videos);
}

init();

// Initialize the fetching of videos
fetchLiveStream();




// const API_KEY = 'AIzaSyC4r98u1CX6XzzOVezT1iEnGkyIg3mJzaY';
// const CHANNEL_ID = 'UCuNDY-MatvVCSYe2TjpKbmQ';
// const CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour

// // Fetch live stream
// async function fetchLiveStream() {
//   try {
//     const cachedLiveStream = localStorage.getItem('liveStream');
//     const cacheTime = localStorage.getItem('liveStreamCacheTime');

//     if (cachedLiveStream && (Date.now() - cacheTime < CACHE_EXPIRY)) {
//       displayLiveStream(JSON.parse(cachedLiveStream));
//       return;
//     }

//     const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&eventType=live&key=${API_KEY}`);
//     const data = await response.json();

//     if (data.items && data.items.length > 0) {
//       const liveVideo = data.items[0];
//       localStorage.setItem('liveStream', JSON.stringify(liveVideo));
//       localStorage.setItem('liveStreamCacheTime', Date.now());
//       displayLiveStream(liveVideo);
//     } else {
//       document.getElementById('live-stream').innerHTML = '<p>No live stream currently available.</p>';
//     }
//   } catch (error) {
//     console.error('Error fetching live stream:', error);
//   }
// }

// // Display live stream
// function displayLiveStream(video) {
//   const liveStreamContainer = document.getElementById('live-stream');
//   liveStreamContainer.innerHTML = `
//     <iframe width="560" height="315" src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//     <p>${video.snippet.title}</p>
//   `;
// }

// // Fetch past videos
// async function fetchPastVideos() {
//   try {
//     const cachedPastVideos = localStorage.getItem('pastVideos');
//     const cacheTime = localStorage.getItem('pastVideosCacheTime');

//     if (cachedPastVideos && (Date.now() - cacheTime < CACHE_EXPIRY)) {
//       displayPastVideos(JSON.parse(cachedPastVideos));
//       return;
//     }

//     const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=date&key=${API_KEY}`);
//     const data = await response.json();

//     if (data.items) {
//       localStorage.setItem('pastVideos', JSON.stringify(data.items));
//       localStorage.setItem('pastVideosCacheTime', Date.now());
//       displayPastVideos(data.items);
//     }
//   } catch (err) {
//     console.error('Error fetching past videos:', err);
//   }
// }

// // Fetch all videos with pagination
// async function fetchAllVideos(pageToken = '') {
//   let videos = [];
//   let nextPageToken = pageToken;

//   try {
//     do {
//       const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&order=date&pageToken=${nextPageToken}&key=${API_KEY}`);
//       const data = await response.json();
//       videos = videos.concat(data.items);
//       nextPageToken = data.nextPageToken;
//     } while (nextPageToken);

//     return videos;
//   } catch (error) {
//     console.error('Error fetching all videos:', error);
//     return videos;
//   }
// }

// // Display past videos
// function displayPastVideos(videos) {
//   const pastVideosContainer = document.getElementById('past-videos');
//   pastVideosContainer.innerHTML = videos.map(video => `
//     <div class="video">
//       <iframe src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//       <p>${video.snippet.title}</p>
//     </div>
//   `).join('');
// }

// // Initialize the fetching of videos
// async function init() {
//   await fetchLiveStream();
//   await fetchPastVideos();
// }

// init();
