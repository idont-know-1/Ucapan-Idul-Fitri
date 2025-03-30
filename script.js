document.addEventListener("DOMContentLoaded", function() {
    const slides = {
        slide1: document.getElementById("slide1"),
        slide2: document.getElementById("slide2"),
        slide3: document.getElementById("slide3"),
        slide4: document.getElementById("slide4")
    };

    Object.values(slides).forEach(slide => {
        slide.classList.remove("active");
        slide.classList.add("hidden");
    });

    slides.slide1.classList.add("active");
    slides.slide1.classList.remove("hidden");

    [slides.slide2, slides.slide3, slides.slide4].forEach(slide => {
        slide.classList.add("hidden");
        slide.classList.remove("active");
    });
    
    const namaInput = document.getElementById("namaInput");
    const greeting = document.getElementById("greeting");
    const pesanPuasa = document.getElementById("pesanPuasa");
    const btnIya = document.getElementById("btnIya");
    const btnNggak = document.getElementById("btnNggak");
    const thankYouPopup = document.getElementById("thankYouPopup");

    namaInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Mencegah perilaku default
            window.nextSlide(); // Panggil fungsi nextSlide
        }
    });

    // Pesan respons
    const messages = {
        banyak: "Jangan sedih ya! Yang penting tetap semangat dan semoga tahun depan bisa lebih baik lagi! 💪😊",
        sedikit: "Wah, lumayan konsisten ya! Kira-kira kenapa tuh kok bisa bolong? 🤔",
        full: "MasyaAllah! Kamu luar biasa! Semoga puasamu membawa berkah dan kebaikan. 🌟"
    };

    // Fungsi transisi slide
    function showSlide(currentSlide, nextSlide) {
        currentSlide.classList.remove("active");
    currentSlide.classList.add("hidden");
    
    // Set timeout untuk memastikan animasi berjalan
    setTimeout(() => {
        nextSlide.classList.remove("hidden");
        nextSlide.classList.add("active");
        
        // Otomatis pindah ke slide 4 jika dari slide 3
        if (nextSlide.id === "slide3") {
            setTimeout(() => {
                showSlide(slides.slide3, slides.slide4);
            }, 10000); // Durasi tampilan slide 3
        }
    }, 500); // Durasi animasi transisi
}

    // Fungsi validasi input
    function validateInput(input, errorMsg) {
        if (!input.value.trim()) {
            input.style.borderColor = "#dc3545";
            input.placeholder = errorMsg;
            input.classList.add("animate__animated", "animate__headShake");
            
            setTimeout(() => {
                input.classList.remove("animate__animated", "animate__headShake");
            }, 1000);
            
            return false;
        }
        return true;
    }

    // Fungsi global untuk navigasi
    window.nextSlide = function() {
        if (!validateInput(namaInput, "Masukkan nama dulu ya 😊")) return;
        
        greeting.textContent = `Halo, ${namaInput.value.trim()}! Senang bisa menyambut Idul Fitri bersamamu! ✨`;
        showSlide(slides.slide1, slides.slide2);
    };

    window.pilihJawaban = function(jawaban) {
        pesanPuasa.textContent = messages[jawaban] || messages.full;
        showSlide(slides.slide2, slides.slide3);
        
        // Otomatis pindah ke slide 4 setelah 3 detik
        setTimeout(() => {
            showSlide(slides.slide3, slides.slide4);
        }, 3000);
    };

    if (btnIya && btnNggak) {
        btnIya.addEventListener("click", function() {
            thankYouPopup.classList.remove("hidden");
        });

        btnNggak.addEventListener("click", function() {
            // Pindahkan tombol secara random
            const containerWidth = document.querySelector('.forgiveness-buttons').offsetWidth;
            const containerHeight = document.querySelector('.forgiveness-buttons').offsetHeight;
            const btnWidth = btnNggak.offsetWidth;
            const btnHeight = btnNggak.offsetHeight;
            
            const randomX = Math.floor(Math.random() * (containerWidth - btnWidth));
            const randomY = Math.floor(Math.random() * (containerHeight - btnHeight));
            
            btnNggak.style.position = 'absolute';
            btnNggak.style.left = randomX + 'px';
            btnNggak.style.top = randomY + 'px';
        });
    }

    window.closePopup = function() {
        thankYouPopup.classList.add("hidden");
    };

    // Coba memutar musik otomatis
    function playMusic() {
        const music = document.getElementById("bgMusic");
        music.volume = 0.3;
        
        // Beberapa browser membutuhkan interaksi pengguna dulu
        const playPromise = music.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Fallback: play setelah interaksi pengguna
                document.body.addEventListener('click', () => {
                    music.play();
                }, { once: true });
            });
        }
    }

    // Coba memutar musik saat halaman dimuat
    playMusic();
});