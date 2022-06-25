import icons from 'url:../../img/icons.svg'; // Parcel 2
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkupPage(page) {
    const currentPage = this._data.page;

    const newOperation = page === 'prev' ? currentPage - 1 : currentPage + 1;

    const prev = `<button data-goto="${newOperation}" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${newOperation}</span>
  </button>`;

    const next = `
  <button data-goto="${newOperation}" class="btn--inline pagination__btn--next">
  <span>Page ${newOperation}</span>
  <svg class="search__icon">
    <use href="${icons}#icon-arrow-right"></use>
  </svg>
</button>`;

    if (page === 'prev') {
      return prev;
    } else {
      return next;
    }
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupPage('next');
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupPage('prev');
    }
    // Other page
    if (currentPage < numPages) {
      return (
        this._generateMarkupPage('prev') + this._generateMarkupPage('next')
      );
    }

    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();
