// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Change code below this line

console.log(galleryItems);
const gallery = document.querySelector('.gallery');
const galleryMarkup = galleryItems.map((item) =>
        `<a class="gallery__item" href="${item.original}">
        <img class="gallery__image" src="${item.preview}" alt="${item.description}"/>
        </a>`).join("");

gallery.innerHTML = galleryMarkup;
const lightbox = new SimpleLightbox('.gallery a', { close: false, captionDelay: 250, captionsData: 'alt' });