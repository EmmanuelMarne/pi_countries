// helpers
import { cardsForPage, numberPages } from "../helpers/Paginated.helpers";
import { functionFilterCards } from "../helpers/Filter.helpers";

// actionTypes
import {
  ADD_CARD,
  REMOVE_CARD,
  NEXT_PAGE,
  PREVIOUS_PAGE,
  ORDER_CARDS,
  FILTER_CARDS,
  ADD_ACTIVITIES,
  START_COUNTRIES,
  ALL_COUNTRIES,
  DELETE_COUNTRIES,
} from "./actionTypes";

const initialState = {
  allCards: [],
  cards: [],
  currentCards: [],
  page: 1,
  currentPage: 1,
  activities: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case START_COUNTRIES:
      if (payload) {
        const length = payload.length;
        const page = numberPages(length);
        return {
          ...state,
          allCards: payload,
          cards: payload,
          currentCards: payload,
          page,
          currentPage: page,
        };
      }
      return {
        ...state,
      };

    case ADD_ACTIVITIES:
      return {
        ...state,
        activities: payload,
      };

    case ALL_COUNTRIES:
      if (payload) {
        const length = payload.length;
        const page = numberPages(length);
        const res = cardsForPage(1, payload);
        return {
          ...state,
          allCards: payload,
          cards: payload,
          currentCards: res,
          page,
          currentPage: 1,
        };
      }

      return {
        ...state,
      };

    case DELETE_COUNTRIES:
      return {
        ...state,
        allCards: [],
        cards: [],
        currentCards: [],
        page: 1,
        currentPage: 1,
      };

    case ADD_CARD:
      for (let card of state.allCards) {
        if (payload.id === card.id) {
          const length = state.allCards.indexOf(card) + 1;
          const page = numberPages(length);
          const res = cardsForPage(page, state.allCards);
          return {
            ...state,
            currentCards: res,
            currentPage: page,
          };
        }
      }

      if (payload) {
        const length = state.allCards.length + 1;
        const page = numberPages(length);
        const res = cardsForPage(page, state.allCards);
        return {
          ...state,
          allCards: [...state.allCards, payload],
          cards: [...state.allCards, payload],
          currentCards: [...res, payload],
          page,
          currentPage: page,
        };
      }

      return {
        ...state,
      };

    case REMOVE_CARD:
      if (payload) {
        const newCards = state.allCards.filter((card) => {
          return card.id !== payload;
        });

        const page = numberPages(newCards.length);
        const res = cardsForPage(state.currentPage, newCards);

        if (state.page === state.currentPage) {
          const res = cardsForPage(page, newCards);
          return {
            ...state,
            allCards: newCards,
            cards: newCards,
            currentCards: res,
            page,
            currentPage: page,
          };
        }
        return {
          ...state,
          allCards: newCards,
          cards: newCards,
          currentCards: res,
          page,
        };
      }
      return {
        ...state,
      };

    case NEXT_PAGE:
      if (state.currentPage < state.page) {
        const page = state.currentPage + 1;
        const res = cardsForPage(page, state.cards);
        return {
          ...state,
          currentCards: res,
          currentPage: page,
        };
      }

      return {
        ...state,
      };

    case PREVIOUS_PAGE:
      if (state.currentPage <= state.page && state.currentPage > 1) {
        const page = state.currentPage - 1;
        const res = cardsForPage(page, state.cards);
        return {
          ...state,
          currentCards: res,
          currentPage: page,
        };
      }

      return {
        ...state,
      };

    case ORDER_CARDS:
      if (payload) {
        const cardsOrdenadas = state.cards.sort((cardA, cardB) => {
          if (payload === "A-Z true") {
            return cardA.name.localeCompare(cardB.name);
          }

          if (payload === "A-Z false") {
            return cardB.name.localeCompare(cardA.name);
          }

          if (payload === "poblacion true") {
            return cardA.poblacion - cardB.poblacion;
          }

          if (payload === "poblacion false") {
            return cardB.poblacion - cardA.poblacion;
          }
        });

        const page = 1;
        const res = cardsForPage(page, state.cards);
        return {
          ...state,
          cards: cardsOrdenadas,
          currentCards: res,
          currentPage: page,
        };
      }

      return {
        ...state,
      };

    case FILTER_CARDS:
      if (payload) {
        const cardsFiltradas = functionFilterCards(state.allCards, payload);
        const page = numberPages(cardsFiltradas.length);
        const res = cardsForPage(1, cardsFiltradas);
        return {
          ...state,
          cards: cardsFiltradas,
          currentCards: res,
          currentPage: 1,
          page,
        };
      }
      return {
        ...state,
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
