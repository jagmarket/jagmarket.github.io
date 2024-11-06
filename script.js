// Funktion zum Überwachen der Scroll-Position
 
document.addEventListener("scroll", function() {
    // Wenn der Benutzer mehr als 100px gescrollt hat
    if (window.scrollY > 100) {
        // Füge die Klasse "scrolled" hinzu, um das Logo und die Navigation zu ändern
        document.body.classList.add("scrolled");
    } else {
        // Entferne die Klasse "scrolled", wenn der Benutzer nach oben scrollt
        document.body.classList.remove("scrolled");
    }
});

// Funktion für das automatische Scrollen und Animieren der Ziel-Sektion
function scrollToSection(event, sectionId) {
    event.preventDefault(); // Verhindert das Standard-Scroll-Verhalten

    // Entfernt die Klasse "active" von allen Abschnitten, um Animation zu resetten
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Scrollt zur Ziel-Sektion und aktiviert die Animation
    const targetSection = document.getElementById(sectionId);
    targetSection.classList.add('active');

    // Scrollt sanft zur Position des Abschnitts
    targetSection.scrollIntoView({ behavior: 'smooth' });
}

// Navigation-Links für das Springen zu Abschnitten aktivieren
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.navbar a').forEach(link => {
        const sectionId = link.getAttribute('href').substring(1); // Extrahiert ID (z.B. "history")
        link.addEventListener('click', (event) => scrollToSection(event, sectionId));
    });
});

// 3D-Bildanimation
document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('mousemove', (e) => {
        const rect = img.getBoundingClientRect();
        
        // Berechne Cursor-Position relativ zur Mitte des Bildes
        const x = e.clientX - rect.left - rect.width / 2; 
        const y = e.clientY - rect.top - rect.height / 2; 

        // Skalierungsfaktor für die Rotation - je höher, desto stärker die Rotation
        const rotationFactor = 20; 

        // Berechne Rotationswinkel basierend auf der Cursor-Position
        const rotateX = (y / rect.height) * -rotationFactor; // Vertikale Drehung
        const rotateY = (x / rect.width) * rotationFactor;   // Horizontale Drehung

        // 3D-Transformieren mit Perspektive, Skalierung, und Rotation
        img.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    // Effekt zurücksetzen, wenn der Cursor das Bild verlässt
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'perspective(800px) scale(1)';
    });
});

// Intersection Observer für Abschnitte (Animiert beim Scrollen)
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, { threshold: 0.1 }); // Abschnitt muss zu 50% sichtbar sein

// Überwache alle Abschnitte
document.querySelectorAll('.content-section').forEach(section => {
    observer.observe(section);
});
// Funktion, die beim Scrollen ausgeführt wird und überprüft, ob ein Abschnitt sichtbar ist


// Funktion für "Mehr anzeigen"
function toggleMoreContent(sectionId) {
    const content = document.getElementById(sectionId);
    const button = content.nextElementSibling;

    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";  // Bilder anzeigen
        button.textContent = sectionId === "history-more" ? "Weniger lesen" : "Weniger ansehen";
    } else {
        content.style.display = "none";  // Bilder ausblenden
        button.textContent = sectionId === "history-more" ? "Mehr lesen" : "Mehr ansehen";
    }
}

function closeeverything(){
    document.getElementById('history-more').style.display = "none";
    document.getElementById('gallery-more').style.display = "none";

}

